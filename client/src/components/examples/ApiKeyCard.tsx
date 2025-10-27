import { ApiKeyCard } from '../ApiKeyCard'
import { ThemeProvider } from '../ThemeProvider'

export default function ApiKeyCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-2xl">
        <ApiKeyCard
          name="Production API Key"
          keyPreview="sk_live_••••••••••••3x9z"
          fullKey="sk_live_1234567890abcdef3x9z"
          createdAt="Jan 15, 2024"
          lastUsed="2 hours ago"
          onCopy={() => console.log('Key copied')}
          onDelete={() => console.log('Key deleted')}
        />
      </div>
    </ThemeProvider>
  )
}
