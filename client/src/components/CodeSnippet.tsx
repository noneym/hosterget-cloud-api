import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";

interface CodeExample {
  language: string;
  code: string;
}

interface CodeSnippetProps {
  examples: CodeExample[];
  title?: string;
}

export function CodeSnippet({ examples, title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(examples[0]?.language || "");

  const copyToClipboard = () => {
    const code = examples.find(ex => ex.language === activeTab)?.code || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden" data-testid="component-code-snippet">
      {title && (
        <div className="border-b px-4 py-2 bg-muted/30">
          <h4 className="text-sm font-medium">{title}</h4>
        </div>
      )}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b px-4">
          <TabsList className="bg-transparent">
            {examples.map((example) => (
              <TabsTrigger
                key={example.language}
                value={example.language}
                className="text-xs"
                data-testid={`tab-${example.language}`}
              >
                {example.language}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            data-testid="button-copy-code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        {examples.map((example) => (
          <TabsContent key={example.language} value={example.language} className="mt-0">
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="font-mono text-foreground">{example.code}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
