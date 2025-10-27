import { ServiceCard } from '../ServiceCard'
import { ThemeProvider } from '../ThemeProvider'
import { Cpu } from 'lucide-react'

export default function ServiceCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <ServiceCard
          icon={Cpu}
          title="GPU Services"
          description="Access powerful GPU-accelerated models for advanced AI tasks."
          status="Live"
          metric="GPU-accelerated"
          tags={['GPU', 'AI', 'Machine Learning']}
          href="/services/gpu"
        />
      </div>
    </ThemeProvider>
  )
}
