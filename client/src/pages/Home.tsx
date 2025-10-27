import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Cpu, Scan, Shield, Zap, Lock, Globe, Brain, TrendingUp, Check, Users, ArrowRight } from "lucide-react";

export default function Home() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechVision Inc",
      content: "HosterGet's GPU API has completely transformed our ML pipeline. The response times are incredible and the pricing is unbeatable. We've scaled from prototype to production seamlessly.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      company: "DataFlow Solutions",
      content: "The face analysis API is remarkably accurate. We integrated it into our security system in just a few hours. The documentation is crystal clear and support is outstanding.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Product Manager",
      company: "SecureAuth",
      content: "Identity verification has never been easier. HosterGet's API helped us reduce fraud by 87% in the first month. The free tier was perfect for testing before we scaled up.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Founder",
      company: "AI Startup Labs",
      content: "As a startup, budget matters. HosterGet gave us enterprise-grade APIs at startup-friendly prices. Their platform has been rock solid since day one.",
      rating: 5
    },
    {
      name: "Amanda Foster",
      role: "Engineering Manager",
      company: "CloudScale",
      content: "We migrated from three different providers to HosterGet. The unified API made our codebase cleaner and our bills 40% lower. Absolutely worth it.",
      rating: 5
    },
    {
      name: "James Martinez",
      role: "Senior Architect",
      company: "FinTech Global",
      content: "The uptime and reliability are exceptional. In 8 months, we've had zero outages. The API rate limits are generous and the response times consistently under 100ms.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section - DigitalOcean inspired */}
      <section className="relative bg-primary py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight max-w-5xl mx-auto" data-testid="text-hero-title">
            Simple, complete cloud APIs for even the most complex demands
          </h1>
          
          {/* Video Container */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://www.digitalocean.com/videos/GradientAI_1920x1080.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            GPU acceleration, AI-powered analysis, and identity verification. Build faster with enterprise-grade infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-base px-8 bg-white text-primary hover:bg-white/90"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-hero-signup"
            >
              Sign up with email
            </Button>
            <span className="text-white/70 text-sm">or</span>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 border-white/30 text-white hover:bg-white/10"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-hero-github"
            >
              Sign up with GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Trusted by developers at
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-xl font-bold">TechVision</div>
            <div className="text-xl font-bold">DataFlow</div>
            <div className="text-xl font-bold">SecureAuth</div>
            <div className="text-xl font-bold">CloudScale</div>
            <div className="text-xl font-bold">FinTech Global</div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-ecosystem-title">
              See our products in action
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              HosterGet's suite of APIs is designed to be with you on every step of your journey, whether you want to do it yourself or get help from our support team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Cpu}
              title="GPU Services"
              description="Set up powerful GPU-accelerated models in seconds to power your next AI project."
              status="Live"
              metric="Sub-second response"
              tags={['GPU', 'AI', 'ML']}
              href="/services/gpu"
            />
            <ServiceCard
              icon={Scan}
              title="Face Analyzer"
              description="Advanced facial recognition with 95%+ accuracy for emotion detection and demographics."
              status="Beta"
              metric="95%+ accuracy"
              tags={['Computer Vision', 'AI']}
              href="/services/face-analyzer"
            />
            <ServiceCard
              icon={Shield}
              title="Identity Verification"
              description="Comprehensive email and IP verification with fraud detection built-in."
              status="Live"
              metric="1K free requests/day"
              tags={['Security', 'Free']}
              href="/services/identity"
            />
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Developers growing with HosterGet
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              See how 10,000+ developers and startups around the globe are building and scaling their applications on HosterGet while saving money.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Keep more of your money—and more of your sanity
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With the simple, scalable cloud APIs built for developers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Build and ship faster</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our cloud is built to be simple and powerful, so you can spend your time focusing on building apps, not pulling your hair out.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Stay on budget</h3>
              <p className="text-muted-foreground leading-relaxed">
                With predictable pricing and generous free tiers, there are never any surprises about what you will pay for our products.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Real support from real people</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get free, personalized support or upgrade to paid plans to receive dedicated help and faster response times.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Reliable infrastructure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our globally distributed data centers and 99.99% uptime SLA help you consistently deliver experiences your customers will love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get started for free</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers building the future. All plans include generous free tiers so you can start building immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-base px-8 bg-primary"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-cta-signup"
            >
              Sign up now
            </Button>
            <Link href="/docs" className="inline-block">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8"
                data-testid="button-cta-docs"
              >
                Read documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
