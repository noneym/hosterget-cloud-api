import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
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
        {/* Hero */}
        <div className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white" data-testid="text-pricing-title">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Start free, scale as you grow. All plans include access to our complete API suite.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              <PricingCard
                name="Free"
                price="$0"
                description="Perfect for testing and side projects"
                features={[
                  '1,000 API calls/month',
                  'Access to all APIs',
                  'Community support',
                  'Basic analytics',
                  'Rate limit: 10 req/min'
                ]}
                ctaText="Get Started Free"
                onSelect={() => handleSelectPlan('Free')}
              />
              <PricingCard
                name="Pro"
                price="$25"
                description="For growing businesses"
                features={[
                  '100,000 API calls/month',
                  'Access to all APIs',
                  'Priority email support',
                  'Advanced analytics',
                  'Custom webhooks',
                  'Rate limit: 100 req/min',
                  '99.9% uptime SLA'
                ]}
                recommended={true}
                ctaText="Start Free Trial"
                onSelect={() => handleSelectPlan('Pro')}
              />
              <PricingCard
                name="Enterprise"
                price="Custom"
                description="For mission-critical apps"
                features={[
                  'Unlimited API calls',
                  'Access to all APIs',
                  '24/7 phone support',
                  'Custom analytics',
                  'Dedicated account manager',
                  'Custom rate limits',
                  '99.99% uptime SLA',
                  'Custom contracts'
                ]}
                ctaText="Contact Sales"
                onSelect={() => handleSelectPlan('Enterprise')}
              />
            </div>

            {/* Pay as you go */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Pay as you go</h2>
                <p className="text-muted-foreground text-lg">
                  Need more? Purchase additional credits starting from $12
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { amount: '$12', calls: '10K calls' },
                  { amount: '$25', calls: '25K calls' },
                  { amount: '$50', calls: '60K calls' },
                  { amount: '$100', calls: '150K calls' }
                ].map((pkg) => (
                  <button
                    key={pkg.amount}
                    onClick={() => console.log(`Selected ${pkg.amount}`)}
                    className="p-6 border rounded-lg hover-elevate active-elevate-2 text-center transition-all bg-card"
                    data-testid={`button-credit-${pkg.amount.replace('$', '')}`}
                  >
                    <div className="text-3xl font-bold mb-2">{pkg.amount}</div>
                    <div className="text-sm text-muted-foreground">{pkg.calls}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
