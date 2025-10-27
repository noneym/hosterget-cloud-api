import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Key, DollarSign, Clock, Plus, TrendingUp, Zap } from "lucide-react";
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
        <div className="container mx-auto px-6 py-12">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2" data-testid="text-dashboard-title">Dashboard</h1>
            <p className="text-muted-foreground text-lg">Monitor your API usage and manage your account</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="Total API Calls"
              value="24,847"
              icon={Activity}
              trend="+23% from last month"
              trendUp={true}
            />
            <StatsCard
              title="Active API Keys"
              value="3"
              icon={Key}
            />
            <StatsCard
              title="Credits Remaining"
              value="$87.50"
              icon={DollarSign}
            />
            <StatsCard
              title="Avg Response Time"
              value="89ms"
              icon={Clock}
              trend="-15% faster"
              trendUp={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Usage Overview</CardTitle>
                <CardDescription>API calls over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="font-medium">Usage Chart</p>
                    <p className="text-sm">Real-time analytics visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleCreateKey}
                  data-testid="button-create-key"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create API Key
                </Button>
                <Link href="/docs">
                  <a className="block" data-testid="link-view-docs">
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="mr-2 h-4 w-4" />
                      Documentation
                    </Button>
                  </a>
                </Link>
                <Link href="/pricing">
                  <a className="block" data-testid="link-add-credits">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Buy Credits
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
              <Button onClick={handleCreateKey} data-testid="button-header-create-key" className="bg-primary">
                <Plus className="mr-2 h-4 w-4" />
                New Key
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <ApiKeyCard
                name="Production API Key"
                keyPreview="hg_live_••••••••••••3x9z"
                fullKey="hg_live_1234567890abcdef3x9z"
                createdAt="Jan 15, 2024"
                lastUsed="2 hours ago"
                onCopy={handleCopyKey}
                onDelete={handleDeleteKey}
              />
              <ApiKeyCard
                name="Development Key"
                keyPreview="hg_test_••••••••••••7k2m"
                fullKey="hg_test_abcdefghijklmnop7k2m"
                createdAt="Dec 1, 2023"
                lastUsed="1 day ago"
                onCopy={handleCopyKey}
                onDelete={handleDeleteKey}
              />
              <ApiKeyCard
                name="Staging Environment"
                keyPreview="hg_stag_••••••••••••9p4x"
                fullKey="hg_stag_zyxwvutsrqponmlk9p4x"
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
