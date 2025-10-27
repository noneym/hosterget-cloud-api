import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Cpu, Scan, Shield, Zap, Lock, Globe, Brain, TrendingUp, Check, Users, Star } from "lucide-react";
import heroImage from '@assets/generated_images/Futuristic_cloud_computing_hero_background_b2b189f4.png';

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
      
      <section 
        className="relative py-24 md:py-40 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 backdrop-blur" data-testid="badge-trusted">
            <Users className="h-3 w-3 mr-1" />
            Trusted by 10,000+ developers
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" data-testid="text-hero-title">
            Enterprise <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Cloud APIs</span>
            <br />
            Built for Scale
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            GPU acceleration, AI-powered face analysis, and identity verification APIs. Build faster, secure smarter, scale infinitely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/signup">
              <a data-testid="link-hero-signup">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-lg px-8">
                  Start Free Trial
                </Button>
              </a>
            </Link>
            <Link href="/services">
              <a data-testid="link-hero-explore">
                <Button size="lg" variant="outline" className="bg-background/20 backdrop-blur border-white/30 text-white hover:bg-background/30 text-lg px-8">
                  Explore APIs
                </Button>
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-400" />
              <span>Free tier included</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-ecosystem-title">
              Complete API Ecosystem
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to build intelligent, secure applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Cpu}
              title="GPU Services"
              description="Access powerful GPU-accelerated models for image generation, video processing, and deep learning tasks."
              status="Live"
              metric="GPU-accelerated"
              tags={['GPU', 'AI', 'Machine Learning']}
              href="/services/gpu"
            />
            <ServiceCard
              icon={Scan}
              title="Face Analyzer"
              description="Advanced facial recognition with emotion detection, age estimation, and 10+ attribute analysis."
              status="Beta"
              metric="95%+ accuracy"
              tags={['Computer Vision', 'Detection']}
              href="/services/face-analyzer"
            />
            <ServiceCard
              icon={Shield}
              title="Identity Check"
              description="Email & IP verification with VPN/Proxy detection and comprehensive fraud prevention."
              status="Live"
              metric="1K requests/day"
              tags={['Security', 'Verification', 'Free']}
              href="/services/identity"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Why HosterGet</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Developers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enterprise features with developer-friendly pricing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Sub-100ms response times globally. Optimized infrastructure ensures your users get instant results."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Enterprise Scale"
              description="99.9%+ uptime SLA. Built on battle-tested infrastructure serving billions of requests monthly."
            />
            <FeatureCard
              icon={Lock}
              title="Security First"
              description="End-to-end encryption, SOC 2 compliant, and GDPR ready. Your data security is our priority."
            />
            <FeatureCard
              icon={Brain}
              title="AI-Powered"
              description="State-of-the-art ML models continuously trained on diverse datasets for maximum accuracy."
            />
            <FeatureCard
              icon={Globe}
              title="Global CDN"
              description="Multi-region deployment across 15+ data centers. Low latency access from anywhere."
            />
            <FeatureCard
              icon={Check}
              title="Generous Free Tier"
              description="Start building for free. Scale seamlessly as you grow without surprise bills."
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
              10,000+ Happy Customers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Developers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what our customers have to say about HosterGet
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future with HosterGet. Get instant access to all APIs with our generous free tier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <a data-testid="link-cta-signup">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-lg px-8">
                  Start Building Now
                </Button>
              </a>
            </Link>
            <Link href="/pricing">
              <a data-testid="link-cta-pricing">
                <Button size="lg" variant="outline" className="text-lg px-8">View Pricing</Button>
              </a>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free tier includes all features • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
