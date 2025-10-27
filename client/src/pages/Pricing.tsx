import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/PricingCard";
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
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-pricing-title">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include access to all APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <PricingCard
              name="Free"
              price="$0"
              description="Perfect for testing and small projects"
              features={[
                '1,000 API calls/month',
                'All API access',
                'Community support',
                'Basic analytics',
                'Rate limiting: 10 req/min'
              ]}
              ctaText="Get Started"
              onSelect={() => handleSelectPlan('Free')}
            />
            <PricingCard
              name="Pro"
              price="$49"
              description="For growing businesses and developers"
              features={[
                '100,000 API calls/month',
                'All API access',
                'Priority email support',
                'Advanced analytics',
                'Custom webhooks',
                'Rate limiting: 100 req/min',
                'SLA: 99.9% uptime'
              ]}
              recommended={true}
              ctaText="Start Pro Trial"
              onSelect={() => handleSelectPlan('Pro')}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              description="For large-scale applications"
              features={[
                'Unlimited API calls',
                'All API access',
                '24/7 phone support',
                'Custom analytics',
                'Dedicated account manager',
                'Custom rate limits',
                'SLA: 99.99% uptime',
                'Custom contract terms'
              ]}
              ctaText="Contact Sales"
              onSelect={() => handleSelectPlan('Enterprise')}
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Credits</h2>
            <p className="text-muted-foreground text-center mb-8">
              Need more API calls? Purchase additional credits starting from $12 USD.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['$12', '$25', '$50', '$100'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => console.log(`Selected ${amount} credit package`)}
                  className="p-4 border rounded-md hover-elevate active-elevate-2 text-center"
                  data-testid={`button-credit-${amount.replace('$', '')}`}
                >
                  <div className="text-2xl font-bold mb-1">{amount}</div>
                  <div className="text-xs text-muted-foreground">
                    {amount === '$12' && '10K calls'}
                    {amount === '$25' && '25K calls'}
                    {amount === '$50' && '50K calls'}
                    {amount === '$100' && '120K calls'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
