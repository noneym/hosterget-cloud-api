import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { Cpu, Scan, Shield, Database, Fingerprint, Cloud } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">API Services</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-services-title">
              Powerful APIs for Every Need
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Enterprise-grade cloud APIs to accelerate your development. From GPU acceleration to identity verification, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
              description="Advanced facial recognition and analysis with emotion detection, age estimation, and demographic insights with 95%+ accuracy."
              status="Beta"
              metric="95%+ accuracy"
              tags={['Computer Vision', 'Detection', 'AI']}
              href="/docs/face-analyzer"
            />
            <ServiceCard
              icon={Shield}
              title="Identity Verification"
              description="Comprehensive identity checks with email verification, IP geolocation, VPN/Proxy detection and fraud prevention."
              status="Live"
              metric="1K requests/day"
              tags={['Security', 'Verification', 'Free']}
              href="/docs/identity"
            />
            <ServiceCard
              icon={Database}
              title="Cloud Storage API"
              description="Scalable cloud storage with real-time folder intelligence, content management, and metadata extraction."
              status="Live"
              metric="15K requests/30min"
              tags={['Storage', 'Real-time', 'Free']}
              href="/docs/storage"
            />
            <ServiceCard
              icon={Fingerprint}
              title="Username Intelligence"
              description="AI-powered username validation, classification, availability checking and sentiment analysis across platforms."
              status="Beta"
              metric="<100ms response"
              tags={['AI', 'Validation']}
              href="/docs/username"
            />
            <ServiceCard
              icon={Cloud}
              title="Link Validator"
              description="Quickly check if cloud storage links are valid and accessible with comprehensive metadata and security analysis."
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
