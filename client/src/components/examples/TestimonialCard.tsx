import { TestimonialCard } from '../TestimonialCard'
import { ThemeProvider } from '../ThemeProvider'

export default function TestimonialCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-md">
        <TestimonialCard
          name="Sarah Johnson"
          role="CTO"
          company="TechCorp"
          content="HosterGet's GPU API has transformed our ML pipeline. The response times are incredible and the pricing is unbeatable."
          rating={5}
        />
      </div>
    </ThemeProvider>
  )
}
