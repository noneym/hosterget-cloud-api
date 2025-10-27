import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    console.log(`Selected plan: ${plan}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Pricing Plans</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-pricing-title">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Start free, scale as you grow. All plans include access to our complete API suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            <PricingCard
              name="Free"
              price="$0"
              description="Perfect for testing and side projects"
              features={[
                '1,000 API calls/month',
                'Access to all APIs',
                'Community support',
                'Basic analytics dashboard',
                'Rate limit: 10 req/min',
                '99% uptime SLA'
              ]}
              ctaText="Get Started Free"
              onSelect={() => handleSelectPlan('Free')}
            />
            <PricingCard
              name="Pro"
              price="$25"
              description="For growing businesses and teams"
              features={[
                '100,000 API calls/month',
                'Access to all APIs',
                'Priority email support',
                'Advanced analytics & insights',
                'Custom webhooks',
                'Rate limit: 100 req/min',
                '99.9% uptime SLA',
                'Team collaboration tools'
              ]}
              recommended={true}
              ctaText="Start Pro Trial"
              onSelect={() => handleSelectPlan('Pro')}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              description="For mission-critical applications"
              features={[
                'Unlimited API calls',
                'Access to all APIs',
                '24/7 phone & email support',
                'Custom analytics & reporting',
                'Dedicated account manager',
                'Custom rate limits',
                '99.99% uptime SLA',
                'Custom contract & invoicing',
                'Advanced security features'
              ]}
              ctaText="Contact Sales"
              onSelect={() => handleSelectPlan('Enterprise')}
            />
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-8 md:p-12 border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Pay As You Go Credits</h2>
              <p className="text-muted-foreground text-lg">
                Need more API calls? Purchase additional credits starting from just $12 USD.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { amount: '$12', calls: '10,000 calls', popular: false },
                { amount: '$25', calls: '25,000 calls', popular: true },
                { amount: '$50', calls: '60,000 calls', popular: false },
                { amount: '$100', calls: '150,000 calls', popular: false }
              ].map((pkg) => (
                <button
                  key={pkg.amount}
                  onClick={() => console.log(`Selected ${pkg.amount} credit package`)}
                  className={`relative p-6 border rounded-lg hover-elevate active-elevate-2 text-center transition-all ${
                    pkg.popular ? 'border-primary bg-primary/5' : 'bg-card'
                  }`}
                  data-testid={`button-credit-${pkg.amount.replace('$', '')}`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Popular
                    </Badge>
                  )}
                  <div className="text-3xl font-bold mb-2">{pkg.amount}</div>
                  <div className="text-sm text-muted-foreground">{pkg.calls}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    ${(parseFloat(pkg.amount.replace('$', '')) / parseFloat(pkg.calls.replace(/,/g, '')) * 1000).toFixed(2)}/1K calls
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Never expires</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>All APIs included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Instant activation</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
