import { FeatureCard } from '../FeatureCard'
import { ThemeProvider } from '../ThemeProvider'
import { Zap } from 'lucide-react'

export default function FeatureCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <FeatureCard
          icon={Zap}
          title="Lightning Fast"
          description="Sub-second response times for real-time applications and instant user feedback."
        />
      </div>
    </ThemeProvider>
  )
}
