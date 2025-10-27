import { PricingCard } from '../PricingCard'
import { ThemeProvider } from '../ThemeProvider'

export default function PricingCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-sm">
        <PricingCard
          name="Pro"
          price="$49"
          description="Perfect for growing businesses"
          features={[
            '100,000 API calls/month',
            'Priority support',
            'Advanced analytics',
            'Custom webhooks'
          ]}
          recommended={true}
          onSelect={() => console.log('Pro plan selected')}
        />
      </div>
    </ThemeProvider>
  )
}
