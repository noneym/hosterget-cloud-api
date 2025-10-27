import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Cpu, Scan, Shield, Database, Fingerprint, Cloud } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-services-title">Our Services</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive suite of AI-powered APIs to accelerate your development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Cpu}
              title="GPU Services"
              description="Access powerful GPU-accelerated models for advanced AI tasks including image generation, video processing, and deep learning."
              status="Live"
              metric="GPU-accelerated"
              tags={['GPU', 'AI', 'Machine Learning']}
              href="/docs/gpu"
            />
            <ServiceCard
              icon={Scan}
              title="Face Analyzer"
              description="Advanced facial recognition and analysis with emotion detection, age estimation, and demographic insights."
              status="Beta"
              metric="95%+ accuracy"
              tags={['Computer Vision', 'Detection', 'AI']}
              href="/docs/face-analyzer"
            />
            <ServiceCard
              icon={Shield}
              title="Identity Verification"
              description="Comprehensive identity checks with email verification, IP geolocation, and fraud detection capabilities."
              status="Live"
              metric="1K requests/day"
              tags={['Security', 'Verification', 'Free']}
              href="/docs/identity"
            />
            <ServiceCard
              icon={Database}
              title="Cloud Storage API"
              description="Scalable cloud storage with real-time folder intelligence and content management."
              status="Live"
              metric="15K requests/30min"
              tags={['Storage', 'Real-time', 'Free']}
              href="/docs/storage"
            />
            <ServiceCard
              icon={Fingerprint}
              title="Username Intelligence"
              description="AI-powered username validation, classification, and availability checking across platforms."
              status="Beta"
              metric="<100ms response"
              tags={['AI', 'Validation']}
              href="/docs/username"
            />
            <ServiceCard
              icon={Cloud}
              title="Link Validator"
              description="Quickly check if cloud storage links are valid and accessible with comprehensive metadata."
              status="Free Tool"
              tags={['Validation', 'Tools']}
              href="/docs/validator"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
