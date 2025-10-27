import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ApiKeyCardProps {
  name: string;
  keyPreview: string;
  fullKey?: string;
  createdAt: string;
  lastUsed?: string;
  onCopy?: () => void;
  onDelete?: () => void;
}

export function ApiKeyCard({
  name,
  keyPreview,
  fullKey,
  createdAt,
  lastUsed,
  onCopy,
  onDelete,
}: ApiKeyCardProps) {
  const [showFullKey, setShowFullKey] = useState(false);
  const displayKey = showFullKey && fullKey ? fullKey : keyPreview;

  return (
    <Card data-testid={`card-apikey-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base">{name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded truncate" data-testid="text-key-preview">
                {displayKey}
              </code>
              {fullKey && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFullKey(!showFullKey)}
                  data-testid="button-toggle-key"
                >
                  {showFullKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCopy}
              data-testid="button-copy-key"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              data-testid="button-delete-key"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
        <CardDescription className="mt-2">
          <div className="flex flex-wrap gap-2 text-xs">
            <span>Created: {createdAt}</span>
            {lastUsed && (
              <>
                <span>•</span>
                <span>Last used: {lastUsed}</span>
              </>
            )}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
