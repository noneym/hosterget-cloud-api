import { CodeSnippet } from '../CodeSnippet'
import { ThemeProvider } from '../ThemeProvider'

export default function CodeSnippetExample() {
  const examples = [
    {
      language: 'JavaScript',
      code: `const response = await fetch('https://api.aicloud.com/v1/gpu', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});`
    },
    {
      language: 'Python',
      code: `import requests

response = requests.get(
    'https://api.aicloud.com/v1/gpu',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)`
    },
    {
      language: 'cURL',
      code: `curl -X GET https://api.aicloud.com/v1/gpu \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ];

  return (
    <ThemeProvider>
      <div className="p-8 max-w-2xl">
        <CodeSnippet examples={examples} title="Example Request" />
      </div>
    </ThemeProvider>
  )
}
