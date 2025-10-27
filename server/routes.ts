import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes - public endpoint that returns user or null
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Return null if not authenticated instead of 401
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.json(null);
      }

      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.json(null);
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.json(null);
    }
  });

  // Stripe subscription routes
  app.post('/api/create-checkout-session', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { plan } = req.body;

      if (!['pro', 'enterprise'].includes(plan)) {
        return res.status(400).json({ error: 'Invalid plan' });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if user already has an active subscription
      const existingSubscription = await storage.getSubscription(userId);
      if (existingSubscription?.status === 'active') {
        return res.status(400).json({ error: 'User already has an active subscription' });
      }

      // Create or retrieve Stripe customer
      let customerId = existingSubscription?.stripeCustomerId;
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          metadata: {
            userId: user.id,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
          },
        });
        customerId = customer.id;
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: plan === 'pro' ? 'Pro Plan' : 'Enterprise Plan',
                description: plan === 'pro' 
                  ? '10,000 API requests/month' 
                  : 'Unlimited API requests',
              },
              unit_amount: plan === 'pro' ? 2500 : 9900, // $25 or $99 in cents
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin || 'http://localhost:5000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'http://localhost:5000'}/pricing`,
        metadata: {
          userId,
          plan,
        },
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Webhook endpoint for Stripe events
  app.post('/api/stripe-webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
      return res.status(400).send('No signature');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not set');
      return res.status(500).send('Webhook secret not configured');
    }

    let event: Stripe.Event;

    try {
      // Verify the webhook signature using the raw body
      const rawBody = (req as any).rawBody;
      if (!rawBody) {
        throw new Error('Raw body not available for signature verification');
      }
      
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        webhookSecret
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          const plan = session.metadata?.plan;

          if (!userId || !plan) {
            console.error('Missing metadata in checkout session');
            break;
          }

          // Get or create subscription record
          let subscription = await storage.getSubscription(userId);
          
          if (subscription) {
            await storage.updateSubscription(subscription.id, {
              plan,
              status: 'active',
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
            });
          } else {
            await storage.createSubscription({
              userId,
              plan,
              status: 'active',
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
            });
          }
          break;
        }

        case 'customer.subscription.updated': {
          const subscription = event.data.object as any;
          const dbSubscription = await storage.getSubscriptionByStripeId(subscription.id);

          if (dbSubscription && subscription.current_period_end) {
            await storage.updateSubscriptionByStripeId(subscription.id, {
              status: subscription.status === 'active' ? 'active' : 
                     subscription.status === 'past_due' ? 'past_due' : 'canceled',
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            });
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as any;
          const dbSubscription = await storage.getSubscriptionByStripeId(subscription.id);

          if (dbSubscription) {
            await storage.updateSubscriptionByStripeId(subscription.id, {
              status: 'canceled',
            });
          }
          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get user's subscription
  app.get('/api/subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscription = await storage.getSubscription(userId);
      
      if (!subscription) {
        // Return free plan if no subscription exists
        return res.json({ plan: 'free', status: 'active' });
      }

      res.json(subscription);
    } catch (error: any) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // API Key management routes
  app.get('/api/keys', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const keys = await storage.getApiKeys(userId);
      res.json(keys);
    } catch (error: any) {
      console.error('Error fetching API keys:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/keys', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { name } = req.body;

      if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const apiKey = await storage.createApiKey({
        userId,
        name: name.trim(),
      });

      res.json(apiKey);
    } catch (error: any) {
      console.error('Error creating API key:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/keys/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;

      // Verify the key belongs to the user
      const keys = await storage.getApiKeys(userId);
      const keyExists = keys.some(k => k.id === id);

      if (!keyExists) {
        return res.status(404).json({ error: 'API key not found' });
      }

      await storage.deleteApiKey(id);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error deleting API key:', error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
