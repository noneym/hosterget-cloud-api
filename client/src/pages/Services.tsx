import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Cpu, Scan, Shield, Database, Fingerprint, Cloud } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" data-testid="text-services-title">
                Powerful APIs for every need
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Enterprise-grade cloud APIs to accelerate your development. From GPU acceleration to identity verification, we've got you covered.
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <ServiceCard
                icon={Cpu}
                title="GPU Services"
                description="Access powerful GPU-accelerated models for advanced AI tasks including image generation, video processing, and deep learning."
                status="Live"
                metric="Sub-second response"
                tags={['GPU', 'AI', 'ML']}
                href="/docs"
              />
              <ServiceCard
                icon={Scan}
                title="Face Analyzer"
                description="Advanced facial recognition and analysis with emotion detection, age estimation, and demographic insights with 95%+ accuracy."
                status="Beta"
                metric="95%+ accuracy"
                tags={['Computer Vision', 'AI']}
                href="/docs"
              />
              <ServiceCard
                icon={Shield}
                title="Identity Verification"
                description="Comprehensive identity checks with email verification, IP geolocation, VPN/Proxy detection and fraud prevention."
                status="Live"
                metric="1K free/day"
                tags={['Security', 'Free']}
                href="/docs"
              />
              <ServiceCard
                icon={Database}
                title="Cloud Storage API"
                description="Scalable cloud storage with real-time folder intelligence, content management, and metadata extraction."
                status="Live"
                metric="15K req/30min"
                tags={['Storage', 'Real-time']}
                href="/docs"
              />
              <ServiceCard
                icon={Fingerprint}
                title="Username Intelligence"
                description="AI-powered username validation, classification, availability checking and sentiment analysis across platforms."
                status="Beta"
                metric="<100ms response"
                tags={['AI', 'Validation']}
                href="/docs"
              />
              <ServiceCard
                icon={Cloud}
                title="Link Validator"
                description="Quickly check if cloud storage links are valid and accessible with comprehensive metadata and security analysis."
                status="Free Tool"
                tags={['Validation', 'Tools']}
                href="/docs"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
