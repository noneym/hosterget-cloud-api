import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Key, DollarSign, Clock, Plus } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const handleCopyKey = () => {
    console.log('Key copied to clipboard');
  };

  const handleDeleteKey = () => {
    console.log('Key deletion requested');
  };

  const handleCreateKey = () => {
    console.log('Create new API key');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-dashboard-title">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your API usage and manage your account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total API Calls"
              value="12,543"
              icon={Activity}
              trend="+12% from last month"
              trendUp={true}
            />
            <StatsCard
              title="Active API Keys"
              value="3"
              icon={Key}
            />
            <StatsCard
              title="Credits Remaining"
              value="$47.50"
              icon={DollarSign}
            />
            <StatsCard
              title="Avg Response Time"
              value="124ms"
              icon={Clock}
              trend="-8% faster"
              trendUp={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Usage Overview</CardTitle>
                <CardDescription>API calls over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart placeholder - usage statistics will be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleCreateKey}
                  data-testid="button-create-key"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New API Key
                </Button>
                <Link href="/docs">
                  <a className="block" data-testid="link-view-docs">
                    <Button variant="outline" className="w-full justify-start">
                      View Documentation
                    </Button>
                  </a>
                </Link>
                <Link href="/pricing">
                  <a className="block" data-testid="link-add-credits">
                    <Button variant="outline" className="w-full justify-start">
                      Add Credits
                    </Button>
                  </a>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys and access tokens</CardDescription>
              </div>
              <Button onClick={handleCreateKey} data-testid="button-header-create-key">
                <Plus className="mr-2 h-4 w-4" />
                Create Key
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <ApiKeyCard
                name="Production API Key"
                keyPreview="sk_live_••••••••••••3x9z"
                fullKey="sk_live_1234567890abcdef3x9z"
                createdAt="Jan 15, 2024"
                lastUsed="2 hours ago"
                onCopy={handleCopyKey}
                onDelete={handleDeleteKey}
              />
              <ApiKeyCard
                name="Development Key"
                keyPreview="sk_test_••••••••••••7k2m"
                fullKey="sk_test_abcdefghijklmnop7k2m"
                createdAt="Dec 1, 2023"
                lastUsed="1 day ago"
                onCopy={handleCopyKey}
                onDelete={handleDeleteKey}
              />
              <ApiKeyCard
                name="Staging Environment"
                keyPreview="sk_stag_••••••••••••9p4x"
                fullKey="sk_stag_zyxwvutsrqponmlk9p4x"
                createdAt="Nov 10, 2023"
                lastUsed="Never"
                onCopy={handleCopyKey}
                onDelete={handleDeleteKey}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
