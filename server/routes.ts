import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import passport from "passport";
import bcrypt from "bcryptjs";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

if (!process.env.PAYTREE_API_KEY) {
  throw new Error('Missing required Paytree secret: PAYTREE_API_KEY');
}
if (!process.env.PAYTREE_API_HOST) {
  throw new Error('Missing required Paytree secret: PAYTREE_API_HOST');
}

const PAYTREE_API_KEY = process.env.PAYTREE_API_KEY;
const PAYTREE_API_HOST = process.env.PAYTREE_API_HOST;

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // ========== AUTH ROUTES ==========
  
  // Get current user (public endpoint - returns null if not authenticated)
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.id) {
        return res.json(null);
      }

      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.json(null);
      }
      
      // Don't send password to frontend
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.json(null);
    }
  });

  // Register with email/password
  app.post('/api/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        authProvider: 'local',
        firstName: firstName || null,
        lastName: lastName || null,
        profileImageUrl: null,
      });

      // Create free subscription
      await storage.createSubscription({
        userId: user.id,
        plan: 'free',
        status: 'active',
      });

      // Log the user in
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Registration successful but login failed' });
        }
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  // Login with email/password
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: 'Authentication error' });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || 'Invalid credentials' });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ error: 'Login failed' });
        }
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // Google OAuth
  app.get('/api/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // GitHub OAuth
  app.get('/api/auth/github', passport.authenticate('github', {
    scope: ['user:email'],
  }));

  app.get('/api/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  // Logout
  app.post('/api/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ success: true });
    });
  });

  // ========== STRIPE SUBSCRIPTION ROUTES ==========
  app.post('/api/create-checkout-session', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { plan } = req.body;

      if (!['pro', 'enterprise'].includes(plan)) {
        return res.status(400).json({ error: 'Invalid plan' });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if user already has an active PAID subscription
      const existingSubscription = await storage.getSubscription(userId);
      if (existingSubscription?.status === 'active' && existingSubscription.plan !== 'free') {
        return res.status(400).json({ error: 'You already have an active paid subscription. Please cancel your current subscription first.' });
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
              unit_amount: plan === 'pro' ? 2400 : 9900, // $24 or $99 in cents
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
            // Downgrade to active free plan when subscription is canceled
            await storage.updateSubscriptionByStripeId(subscription.id, {
              plan: 'free',
              status: 'active',
              stripeSubscriptionId: null,
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
      const userId = req.user.id;
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

  // ========== PAYTREE PAYMENT ROUTES ==========
  app.post('/api/paytree/create-payment-intent', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { plan } = req.body;

      if (!['pro', 'enterprise'].includes(plan)) {
        return res.status(400).json({ error: 'Invalid plan' });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if user already has an active PAID subscription
      const existingSubscription = await storage.getSubscription(userId);
      if (existingSubscription?.status === 'active' && existingSubscription.plan !== 'free') {
        return res.status(400).json({ error: 'You already have an active paid subscription. Please cancel your current subscription first.' });
      }

      // Generate unique transaction reference
      const transactionRef = `hosterget_${userId}_${Date.now()}`;
      const clientRef = user.email || userId;

      // Determine amount based on plan
      const amount = plan === 'pro' ? '24.00' : '99.00';

      // Get origin for callback URLs
      const origin = req.headers.origin || 'http://localhost:5000';

      // Create Paytree payment intent
      const paymentData = {
        transaction_ref: transactionRef,
        client_ref: clientRef,
        amount: amount,
        amount_currency: 'USD',
        method: 'card',
        force_route: 'f14a717b-2f9a-4f13-bca2-da0497abef33',
        customer: {
          first_name: user.firstName || 'John',
          last_name: user.lastName || 'Doe',
          email: user.email,
          phone: '+1234567890',
        },
        address: {
          street: '123 Main Street',
          city: 'Istanbul',
          state: 'Turkey',
          zip: '34000',
          country: 'TR',
        },
        session: {
          ip_address: req.ip || req.connection.remoteAddress || '0.0.0.0',
          user_agent: req.headers['user-agent'] || 'Unknown',
        },
        callback: {
          notification_url: `${origin}/api/paytree-webhook`,
          return_url: `${origin}/dashboard?payment=success`,
          cancel_url: `${origin}/pricing?payment=cancelled`,
        },
        metadata: {
          userId: userId,
          plan: plan,
        },
      };

      const apiUrl = `${PAYTREE_API_HOST}/v1/transaction/payment_intent/`;
      
      console.log('=== PAYTREE API REQUEST ===');
      console.log('URL:', apiUrl);
      console.log('Method: POST');
      console.log('Headers:', {
        'Authorization': `Token ${PAYTREE_API_KEY.substring(0, 10)}...`,
        'Content-Type': 'application/json',
      });
      console.log('Request Body:', JSON.stringify(paymentData, null, 2));
      console.log('===========================');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${PAYTREE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      console.log('=== PAYTREE API RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('============================');

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Paytree API error response:', errorText);
        throw new Error(`Paytree API error: ${response.status}`);
      }

      const result = await response.json();
      
      // Store transaction reference and set subscription to pending status
      if (existingSubscription) {
        await storage.updateSubscription(existingSubscription.id, {
          paytreeTransactionRef: transactionRef,
          status: 'active',
        });
      } else {
        // Create subscription record in free plan (will be upgraded upon successful payment)
        await storage.createSubscription({
          userId,
          plan: 'free',
          status: 'active',
          paytreeTransactionRef: transactionRef,
        });
      }

      res.json({
        paymentLink: result.payment_link,
        paymentId: result.id,
        transactionRef: transactionRef,
      });
    } catch (error: any) {
      console.error('Error creating Paytree payment intent:', error);
      res.status(500).json({ error: error.message || 'Failed to create payment intent' });
    }
  });

  // Paytree webhook endpoint for payment notifications
  app.post('/api/paytree-webhook', async (req, res) => {
    try {
      console.log('Paytree webhook received:', req.body);
      
      // TODO: Implement webhook signature verification when Paytree provides signature headers
      // For now, we're logging webhook data and processing cautiously
      // In production, you should validate the webhook signature to prevent unauthorized requests
      
      const { transaction_ref, status, payment, metadata } = req.body;

      if (!transaction_ref) {
        console.error('Webhook missing transaction_ref');
        return res.status(400).json({ error: 'Missing transaction_ref' });
      }

      // Find subscription by transaction reference
      const subscription = await storage.getSubscriptionByPaytreeRef(transaction_ref);
      
      if (!subscription) {
        console.error('No subscription found for transaction_ref:', transaction_ref);
        return res.status(404).json({ error: 'Subscription not found' });
      }

      // Extract plan from metadata
      const plan = metadata?.plan || 'pro';

      // Update subscription based on payment status
      const paymentStatus = payment?.[0]?.status || status;
      
      if (paymentStatus === 'completed' || paymentStatus === 'success') {
        await storage.updateSubscription(subscription.id, {
          plan: plan,
          status: 'active',
          paytreePaymentId: req.body.id || payment?.[0]?.id,
        });
        console.log('Subscription upgraded to', plan, 'for user', subscription.userId);
      } else if (paymentStatus === 'failed') {
        console.log('Payment failed for transaction:', transaction_ref);
        // Keep subscription as-is (free plan)
      } else if (paymentStatus === 'pending') {
        console.log('Payment pending for transaction:', transaction_ref);
        // Wait for final status
      } else {
        console.log('Unknown payment status:', paymentStatus, 'for transaction:', transaction_ref);
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error('Error handling Paytree webhook:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // API Key management routes
  app.get('/api/keys', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const keys = await storage.getApiKeys(userId);
      res.json(keys);
    } catch (error: any) {
      console.error('Error fetching API keys:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/keys', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
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
      const userId = req.user.id;
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

  // Usage tracking and stats routes
  app.get('/api/usage/logs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit as string) || 100;
      const logs = await storage.getUserUsageLogs(userId, limit);
      res.json(logs);
    } catch (error: any) {
      console.error('Error fetching usage logs:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/usage/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const days = parseInt(req.query.days as string) || 30;
      const stats = await storage.getUserUsageStats(userId, days);
      res.json(stats);
    } catch (error: any) {
      console.error('Error fetching usage stats:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Middleware for API key authentication
  const authenticateApiKey = async (req: any, res: any, next: any) => {
    const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');

    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    try {
      const key = await storage.getApiKey(apiKey as string);
      if (!key) {
        return res.status(401).json({ error: 'Invalid API key' });
      }

      // Get user's subscription to check limits
      const subscription = await storage.getSubscription(key.userId);
      const plan = subscription?.plan || 'free';
      
      // Check rate limits based on plan
      const stats = await storage.getUserUsageStats(key.userId, 30);
      const limits = {
        free: Infinity, // Unlimited for testing
        pro: 10000,
        enterprise: Infinity,
      };

      if (stats.totalRequests >= limits[plan as keyof typeof limits]) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded', 
          limit: limits[plan as keyof typeof limits],
          used: stats.totalRequests 
        });
      }

      // Attach user info to request
      req.apiUser = {
        userId: key.userId,
        apiKeyId: key.id,
        plan,
      };

      // Update last used timestamp
      await storage.updateApiKeyUsage(apiKey as string);

      next();
    } catch (error: any) {
      console.error('Error authenticating API key:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  };

  // Helper to log API usage
  const logApiUsage = async (req: any, service: string, endpoint: string, statusCode: number, responseTime: number) => {
    if (!req.apiUser) return;

    try {
      await storage.createUsageLog({
        userId: req.apiUser.userId,
        apiKeyId: req.apiUser.apiKeyId,
        service,
        endpoint,
        method: req.method,
        statusCode,
        responseTime,
        requestMetadata: {
          plan: req.apiUser.plan,
          ip: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });
    } catch (error) {
      console.error('Error logging API usage:', error);
    }
  };

  // GPU Rental API
  app.post('/api/v1/gpu/create', authenticateApiKey, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const { instance_type, duration_hours } = req.body;

      if (!instance_type || !duration_hours) {
        const responseTime = Date.now() - startTime;
        await logApiUsage(req, 'gpu', '/api/v1/gpu/create', 400, responseTime);
        return res.status(400).json({ error: 'instance_type and duration_hours are required' });
      }

      // Simulate GPU instance creation
      const instance = {
        id: `gpu_${Date.now()}`,
        instance_type,
        duration_hours,
        status: 'active',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + duration_hours * 60 * 60 * 1000).toISOString(),
      };

      const responseTime = Date.now() - startTime;
      await logApiUsage(req, 'gpu', '/api/v1/gpu/create', 200, responseTime);

      res.json(instance);
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      await logApiUsage(req, 'gpu', '/api/v1/gpu/create', 500, responseTime);
      res.status(500).json({ error: error.message });
    }
  });

  // Face Analysis API
  app.post('/api/v1/face/analyze', authenticateApiKey, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const { image_url } = req.body;

      if (!image_url) {
        const responseTime = Date.now() - startTime;
        await logApiUsage(req, 'face_analysis', '/api/v1/face/analyze', 400, responseTime);
        return res.status(400).json({ error: 'image_url is required' });
      }

      // Simulate face analysis
      const analysis = {
        face_detected: true,
        confidence: 0.98,
        attributes: {
          age: Math.floor(Math.random() * 50) + 20,
          gender: Math.random() > 0.5 ? 'male' : 'female',
          emotion: ['happy', 'neutral', 'sad', 'angry'][Math.floor(Math.random() * 4)],
        },
        processed_at: new Date().toISOString(),
      };

      const responseTime = Date.now() - startTime;
      await logApiUsage(req, 'face_analysis', '/api/v1/face/analyze', 200, responseTime);

      res.json(analysis);
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      await logApiUsage(req, 'face_analysis', '/api/v1/face/analyze', 500, responseTime);
      res.status(500).json({ error: error.message });
    }
  });

  // Identity Verification API
  app.post('/api/v1/identity/verify', authenticateApiKey, async (req: any, res) => {
    const startTime = Date.now();
    try {
      const { document_type, document_image_url } = req.body;

      if (!document_type || !document_image_url) {
        const responseTime = Date.now() - startTime;
        await logApiUsage(req, 'identity_verification', '/api/v1/identity/verify', 400, responseTime);
        return res.status(400).json({ error: 'document_type and document_image_url are required' });
      }

      // Simulate identity verification
      const verification = {
        verified: Math.random() > 0.3,
        confidence: 0.95,
        document_type,
        extracted_data: {
          name: 'John Doe',
          document_number: 'ABC123456',
          expiry_date: '2030-12-31',
        },
        verified_at: new Date().toISOString(),
      };

      const responseTime = Date.now() - startTime;
      await logApiUsage(req, 'identity_verification', '/api/v1/identity/verify', 200, responseTime);

      res.json(verification);
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      await logApiUsage(req, 'identity_verification', '/api/v1/identity/verify', 500, responseTime);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
