import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { CreateApiKeyDialog } from "@/components/CreateApiKeyDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Key, DollarSign, Clock, Plus, TrendingUp, Zap } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ApiKey } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();

  const { data: apiKeys = [], isLoading: keysLoading } = useQuery<ApiKey[]>({
    queryKey: ["/api/keys"],
  });

  const deleteKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const response = await apiRequest("DELETE", `/api/keys/${keyId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/keys"] });
      toast({
        title: "API Key Deleted",
        description: "The API key has been successfully deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete API key",
        variant: "destructive",
      });
    },
  });

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
  };

  const handleDeleteKey = (keyId: string) => {
    if (confirm("Are you sure you want to delete this API key? This action cannot be undone.")) {
      deleteKeyMutation.mutate(keyId);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRelativeTime = (date: Date | null) => {
    if (!date) return "Never";
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
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
                <CreateApiKeyDialog 
                  trigger={
                    <Button variant="outline" className="w-full justify-start" data-testid="button-create-key-quick">
                      <Plus className="mr-2 h-4 w-4" />
                      Create API Key
                    </Button>
                  }
                />
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/docs" data-testid="link-view-docs">
                    <Zap className="mr-2 h-4 w-4" />
                    Documentation
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/pricing" data-testid="link-add-credits">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Buy Credits
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys and access tokens</CardDescription>
              </div>
              <CreateApiKeyDialog 
                trigger={
                  <Button data-testid="button-header-create-key" className="bg-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    New Key
                  </Button>
                }
              />
            </CardHeader>
            <CardContent className="space-y-4">
              {keysLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-2"></div>
                  <p>Loading API keys...</p>
                </div>
              ) : apiKeys.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Key className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No API keys yet</p>
                  <p className="text-sm">Create your first API key to get started</p>
                </div>
              ) : (
                apiKeys.map((apiKey) => (
                  <ApiKeyCard
                    key={apiKey.id}
                    name={apiKey.name}
                    keyPreview={`${apiKey.key.slice(0, 10)}••••••••••••${apiKey.key.slice(-4)}`}
                    fullKey={apiKey.key}
                    createdAt={formatDate(apiKey.createdAt)}
                    lastUsed={formatRelativeTime(apiKey.lastUsedAt)}
                    onCopy={() => handleCopyKey(apiKey.key)}
                    onDelete={() => handleDeleteKey(apiKey.id)}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
