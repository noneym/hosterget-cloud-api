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

  const faceExamples = [
    {
      language: 'JavaScript',
      code: `const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('https://api.hosterget.com/v1/face/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const analysis = await response.json();
console.log(analysis);`
    },
    {
      language: 'Python',
      code: `import requests

files = {'image': open('photo.jpg', 'rb')}
headers = {'Authorization': 'Bearer YOUR_API_KEY'}

response = requests.post(
    'https://api.hosterget.com/v1/face/analyze',
    headers=headers,
    files=files
)

analysis = response.json()
print(analysis)`
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-20">
          <div className="mb-16">
            <Badge variant="outline" className="mb-4">Documentation</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-docs-title">
              API Documentation
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl">
              Complete guide to integrating HosterGet APIs into your applications. Get started in minutes.
            </p>
          </div>

          <Tabs defaultValue="authentication" className="space-y-8">
            <TabsList className="bg-muted">
              <TabsTrigger value="authentication" data-testid="tab-authentication">Authentication</TabsTrigger>
              <TabsTrigger value="gpu" data-testid="tab-gpu">GPU Services</TabsTrigger>
              <TabsTrigger value="face" data-testid="tab-face">Face Analyzer</TabsTrigger>
              <TabsTrigger value="identity" data-testid="tab-identity">Identity Check</TabsTrigger>
            </TabsList>

            <TabsContent value="authentication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    All API requests require authentication using your API key
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Include your API key in the <code className="bg-muted px-2 py-1 rounded text-sm">Authorization</code> header as a Bearer token:
                  </p>
                  <CodeSnippet examples={authExamples} title="Authentication Example" />
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Rate Limits</h4>
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
                      <CardDescription>
                        Access powerful GPU-accelerated models for AI tasks
                      </CardDescription>
                    </div>
                    <Badge variant="default">Live</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Endpoint</h4>
                    <code className="bg-muted px-3 py-2 rounded block">POST /v1/gpu/process</code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Required</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell><code>model</code></TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Model name (e.g., stable-diffusion-xl)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><code>prompt</code></TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Text prompt for generation</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><code>parameters</code></TableCell>
                          <TableCell>object</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>Additional model parameters</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <CodeSnippet examples={gpuExamples} title="GPU API Example" />

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
                      <CardDescription>
                        Advanced facial recognition and attribute analysis
                      </CardDescription>
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
                    <h4 className="font-semibold mb-2">Request</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Send a multipart/form-data request with the image file
                    </p>
                  </div>

                  <CodeSnippet examples={faceExamples} title="Face Analysis Example" />

                  <div>
                    <h4 className="font-semibold mb-2">Response</h4>
                    <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
{`{
  "faces_detected": 1,
  "faces": [
    {
      "age": 28,
      "gender": "female",
      "emotion": "happy",
      "confidence": 0.96,
      "attributes": {
        "glasses": false,
        "beard": false,
        "smile": true
      }
    }
  ]
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
                      <CardDescription>
                        Email & IP verification with fraud detection
                      </CardDescription>
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

                  <div>
                    <h4 className="font-semibold mb-2">Email Verification Response</h4>
                    <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
{`{
  "email": "user@example.com",
  "valid": true,
  "disposable": false,
  "domain": "example.com",
  "mx_records": true
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">IP Verification Response</h4>
                    <pre className="bg-muted p-4 rounded overflow-x-auto text-sm">
{`{
  "ip": "192.168.1.1",
  "country": "United States",
  "city": "San Francisco",
  "vpn": false,
  "proxy": false,
  "threat_level": "low"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
