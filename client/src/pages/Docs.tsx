import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Server, Cpu, Eye, Shield, Key } from "lucide-react";

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2" data-testid="text-docs-title">API Documentation</h1>
            <p className="text-muted-foreground text-lg">
              Complete guide to integrating with HosterGet Cloud API
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Secure API key authentication for all endpoints
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">GPU Rental</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  On-demand GPU instances for compute-intensive tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Face Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced facial recognition and attribute detection
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">ID Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Automated identity document verification
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Base URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <code className="px-3 py-2 bg-muted rounded-md block text-sm">
                {window.location.origin}/api/v1
              </code>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>All API requests require authentication using your API key</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Using API Keys</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Include your API key in the request header using either method:
                </p>
                <div className="space-y-2">
                  <div>
                    <Badge variant="outline" className="mb-2">Option 1: X-API-Key Header</Badge>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`curl -H "X-API-Key: hg_your_api_key_here" \\
  https://your-domain.com/api/v1/gpu/create`}
                    </pre>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Option 2: Authorization Header</Badge>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`curl -H "Authorization: Bearer hg_your_api_key_here" \\
  https://your-domain.com/api/v1/gpu/create`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="gpu" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gpu" data-testid="tab-gpu">GPU Rental</TabsTrigger>
              <TabsTrigger value="face" data-testid="tab-face">Face Analysis</TabsTrigger>
              <TabsTrigger value="identity" data-testid="tab-identity">ID Verification</TabsTrigger>
            </TabsList>

            <TabsContent value="gpu" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Create GPU Instance</CardTitle>
                    <Badge>POST</Badge>
                  </div>
                  <CardDescription>/api/v1/gpu/create</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Request Body</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "instance_type": "gpu-a100-40gb",
  "duration_hours": 4
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Response</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "gpu_1234567890",
  "instance_type": "gpu-a100-40gb",
  "duration_hours": 4,
  "status": "active",
  "created_at": "2025-01-27T12:00:00.000Z",
  "expires_at": "2025-01-27T16:00:00.000Z"
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">cURL Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X POST https://your-domain.com/api/v1/gpu/create \\
  -H "X-API-Key: hg_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "instance_type": "gpu-a100-40gb",
    "duration_hours": 4
  }'`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">JavaScript Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`const response = await fetch('https://your-domain.com/api/v1/gpu/create', {
  method: 'POST',
  headers: {
    'X-API-Key': 'hg_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    instance_type: 'gpu-a100-40gb',
    duration_hours: 4
  })
});

const data = await response.json();
console.log(data);`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Python Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import requests

response = requests.post(
    'https://your-domain.com/api/v1/gpu/create',
    headers={'X-API-Key': 'hg_your_api_key_here'},
    json={
        'instance_type': 'gpu-a100-40gb',
        'duration_hours': 4
    }
)

print(response.json())`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="face" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Analyze Face</CardTitle>
                    <Badge>POST</Badge>
                  </div>
                  <CardDescription>/api/v1/face/analyze</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Request Body</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "image_url": "https://example.com/face.jpg"
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Response</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "face_detected": true,
  "confidence": 0.98,
  "attributes": {
    "age": 32,
    "gender": "male",
    "emotion": "happy"
  },
  "processed_at": "2025-01-27T12:00:00.000Z"
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">cURL Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X POST https://your-domain.com/api/v1/face/analyze \\
  -H "X-API-Key: hg_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/face.jpg"
  }'`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">JavaScript Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`const response = await fetch('https://your-domain.com/api/v1/face/analyze', {
  method: 'POST',
  headers: {
    'X-API-Key': 'hg_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_url: 'https://example.com/face.jpg'
  })
});

const data = await response.json();
console.log(data);`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Python Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import requests

response = requests.post(
    'https://your-domain.com/api/v1/face/analyze',
    headers={'X-API-Key': 'hg_your_api_key_here'},
    json={'image_url': 'https://example.com/face.jpg'}
)

print(response.json())`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="identity" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Verify Identity Document</CardTitle>
                    <Badge>POST</Badge>
                  </div>
                  <CardDescription>/api/v1/identity/verify</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Request Body</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "document_type": "passport",
  "document_image_url": "https://example.com/passport.jpg"
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Response</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "verified": true,
  "confidence": 0.95,
  "document_type": "passport",
  "extracted_data": {
    "name": "John Doe",
    "document_number": "ABC123456",
    "expiry_date": "2030-12-31"
  },
  "verified_at": "2025-01-27T12:00:00.000Z"
}`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">cURL Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X POST https://your-domain.com/api/v1/identity/verify \\
  -H "X-API-Key: hg_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_type": "passport",
    "document_image_url": "https://example.com/passport.jpg"
  }'`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">JavaScript Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`const response = await fetch('https://your-domain.com/api/v1/identity/verify', {
  method: 'POST',
  headers: {
    'X-API-Key': 'hg_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    document_type: 'passport',
    document_image_url: 'https://example.com/passport.jpg'
  })
});

const data = await response.json();
console.log(data);`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Python Example</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import requests

response = requests.post(
    'https://your-domain.com/api/v1/identity/verify',
    headers={'X-API-Key': 'hg_your_api_key_here'},
    json={
        'document_type': 'passport',
        'document_image_url': 'https://example.com/passport.jpg'
    }
)

print(response.json())`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
              <CardDescription>Subscription-based rate limiting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">Free Plan</p>
                    <p className="text-sm text-muted-foreground">Unlimited requests (for testing)</p>
                  </div>
                  <Badge variant="outline">Unlimited</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">Pro Plan - $25/month</p>
                    <p className="text-sm text-muted-foreground">Up to 10,000 requests per month</p>
                  </div>
                  <Badge variant="outline">10,000/month</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">Enterprise Plan</p>
                    <p className="text-sm text-muted-foreground">Unlimited requests with custom pricing</p>
                  </div>
                  <Badge variant="outline">Unlimited</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Error Codes</CardTitle>
              <CardDescription>Common HTTP status codes and their meanings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">200</Badge>
                  <div>
                    <p className="font-semibold">Success</p>
                    <p className="text-sm text-muted-foreground">Request completed successfully</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">400</Badge>
                  <div>
                    <p className="font-semibold">Bad Request</p>
                    <p className="text-sm text-muted-foreground">Invalid request parameters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">401</Badge>
                  <div>
                    <p className="font-semibold">Unauthorized</p>
                    <p className="text-sm text-muted-foreground">Missing or invalid API key</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">429</Badge>
                  <div>
                    <p className="font-semibold">Rate Limit Exceeded</p>
                    <p className="text-sm text-muted-foreground">Too many requests, upgrade your plan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">500</Badge>
                  <div>
                    <p className="font-semibold">Internal Server Error</p>
                    <p className="text-sm text-muted-foreground">Something went wrong on our end</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
