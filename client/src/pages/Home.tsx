import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Cpu, Scan, Shield, Zap, Lock, Globe, Brain, TrendingUp, Check } from "lucide-react";
import heroImage from '@assets/generated_images/AI_cloud_technology_hero_background_9f605e5a.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white" data-testid="text-hero-title">
            AI Cloud <span className="text-primary">Platform APIs</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Enterprise-grade APIs for cloud intelligence, identity verification, and AI-powered analysis. Build faster, secure smarter, scale infinitely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <a data-testid="link-hero-explore">
                <Button size="lg" variant="default">
                  Explore APIs
                </Button>
              </a>
            </Link>
            <Link href="/signup">
              <a data-testid="link-hero-signup">
                <Button size="lg" variant="outline" className="bg-background/20 backdrop-blur border-white/30 text-white hover:bg-background/30">
                  Get Started Free
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-ecosystem-title">API Ecosystem</h2>
            <p className="text-muted-foreground text-lg">All your intelligence needs in one platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Cpu}
              title="GPU Services"
              description="Access powerful GPU-accelerated models for advanced AI tasks."
              status="Live"
              metric="GPU-accelerated"
              tags={['GPU', 'AI', 'Machine Learning']}
              href="/services/gpu"
            />
            <ServiceCard
              icon={Scan}
              title="Face Analyzer"
              description="Face detection with 10+ attribute analysis"
              status="Beta"
              metric="95%+ accuracy"
              tags={['Computer Vision', 'Detection']}
              href="/services/face-analyzer"
            />
            <ServiceCard
              icon={Shield}
              title="Identity Check"
              description="Email & IP verification with VPN/Proxy detection"
              status="Live"
              metric="1K requests/day"
              tags={['Security', 'Verification', 'Free']}
              href="/services/identity"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AI Cloud</h2>
            <p className="text-muted-foreground text-lg">Everything you need for modern API development</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Sub-second response times for real-time applications and instant user feedback."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Enterprise Grade"
              description="Built for scale with 99.9%+ uptime SLA and production-ready infrastructure."
            />
            <FeatureCard
              icon={Lock}
              title="Security First"
              description="End-to-end encryption, API key authentication, and compliance with industry standards."
            />
            <FeatureCard
              icon={Brain}
              title="AI-Powered"
              description="State-of-the-art machine learning models trained on millions of data points."
            />
            <FeatureCard
              icon={Globe}
              title="Global Coverage"
              description="Distributed infrastructure across multiple regions for low-latency access worldwide."
            />
            <FeatureCard
              icon={Check}
              title="Always Free"
              description="Generous free tiers on all products. Scale without surprise bills as you grow."
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Building Today</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers building with AI Cloud APIs. Get instant access to all production APIs with generous free tiers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <a data-testid="link-cta-signup">
                <Button size="lg">Get Your API Keys</Button>
              </a>
            </Link>
            <Link href="/pricing">
              <a data-testid="link-cta-pricing">
                <Button size="lg" variant="outline">View Pricing</Button>
              </a>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free tier includes all features • Scale as you grow
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
