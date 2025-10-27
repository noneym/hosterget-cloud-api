import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Documentation() {
  const authExamples = [
    {
      language: 'JavaScript',
      code: `const response = await fetch('https://api.hosterget.com/v1/endpoint', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`
    },
    {
      language: 'Python',
      code: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.hosterget.com/v1/endpoint',
    headers=headers
)

data = response.json()
print(data)`
    },
    {
      language: 'cURL',
      code: `curl -X GET https://api.hosterget.com/v1/endpoint \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
    }
  ];

  const gpuExamples = [
    {
      language: 'JavaScript',
      code: `const response = await fetch('https://api.hosterget.com/v1/gpu/process', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'stable-diffusion-xl',
    prompt: 'A beautiful sunset over mountains',
    parameters: {
      steps: 30,
      guidance_scale: 7.5
    }
  })
});

const result = await response.json();
console.log(result.image_url);`
    },
    {
      language: 'Python',
      code: `import requests

payload = {
    'model': 'stable-diffusion-xl',
    'prompt': 'A beautiful sunset over mountains',
    'parameters': {
        'steps': 30,
        'guidance_scale': 7.5
    }
}

response = requests.post(
    'https://api.hosterget.com/v1/gpu/process',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json=payload
)

result = response.json()
print(result['image_url'])`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" data-testid="text-docs-title">
                API Documentation
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Complete guide to integrating HosterGet APIs into your applications. Get started in minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Docs Content */}
        <div className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="authentication" className="space-y-8 max-w-5xl">
              <TabsList className="bg-muted">
                <TabsTrigger value="authentication" data-testid="tab-authentication">Auth</TabsTrigger>
                <TabsTrigger value="gpu" data-testid="tab-gpu">GPU</TabsTrigger>
                <TabsTrigger value="face" data-testid="tab-face">Face</TabsTrigger>
                <TabsTrigger value="identity" data-testid="tab-identity">Identity</TabsTrigger>
              </TabsList>

              <TabsContent value="authentication" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                    <CardDescription>
                      All API requests require authentication using your API key
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm mb-4">
                        Include your API key in the <code className="bg-muted px-2 py-1 rounded text-sm">Authorization</code> header:
                      </p>
                      <CodeSnippet examples={authExamples} title="Authentication" />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4">Rate Limits</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Plan</TableHead>
                            <TableHead>Rate Limit</TableHead>
                            <TableHead>Monthly Calls</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Free</TableCell>
                            <TableCell>10 req/min</TableCell>
                            <TableCell>1,000</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Pro</TableCell>
                            <TableCell>100 req/min</TableCell>
                            <TableCell>100,000</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Enterprise</TableCell>
                            <TableCell>Custom</TableCell>
                            <TableCell>Unlimited</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gpu" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>GPU Services API</CardTitle>
                        <CardDescription>GPU-accelerated AI models</CardDescription>
                      </div>
                      <Badge variant="default">Live</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Endpoint</h4>
                      <code className="bg-muted px-3 py-2 rounded block">POST /v1/gpu/process</code>
                    </div>

                    <CodeSnippet examples={gpuExamples} title="Example Request" />

                    <div>
                      <h4 className="font-semibold mb-2">Response</h4>
                      <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
{`{
  "status": "success",
  "image_url": "https://cdn.hosterget.com/output/abc123.png",
  "processing_time": 2.34,
  "credits_used": 0.05
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="face" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Face Analyzer API</CardTitle>
                        <CardDescription>Facial recognition and analysis</CardDescription>
                      </div>
                      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Beta</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Endpoint</h4>
                      <code className="bg-muted px-3 py-2 rounded block">POST /v1/face/analyze</code>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Response</h4>
                      <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
{`{
  "faces_detected": 1,
  "faces": [{
    "age": 28,
    "gender": "female",
    "emotion": "happy",
    "confidence": 0.96
  }]
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="identity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Identity Verification API</CardTitle>
                        <CardDescription>Email & IP verification</CardDescription>
                      </div>
                      <Badge variant="default">Live</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Endpoints</h4>
                      <div className="space-y-2">
                        <code className="bg-muted px-3 py-2 rounded block">POST /v1/identity/email</code>
                        <code className="bg-muted px-3 py-2 rounded block">POST /v1/identity/ip</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
