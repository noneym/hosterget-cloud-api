import { StatsCard } from '../StatsCard'
import { ThemeProvider } from '../ThemeProvider'
import { Activity } from 'lucide-react'

export default function StatsCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <StatsCard
          title="Total API Calls"
          value="12,543"
          icon={Activity}
          trend="+12% from last month"
          trendUp={true}
        />
      </div>
    </ThemeProvider>
  )
}
