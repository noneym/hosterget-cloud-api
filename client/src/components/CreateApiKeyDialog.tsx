import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus } from "lucide-react";

interface CreateApiKeyDialogProps {
  trigger?: React.ReactNode;
}

export function CreateApiKeyDialog({ trigger }: CreateApiKeyDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/keys", { name: name.trim() });
      const newKey = await response.json();

      queryClient.invalidateQueries({ queryKey: ["/api/keys"] });

      toast({
        title: "API Key Created",
        description: `Created "${name}". Make sure to copy your key now - you won't be able to see it again!`,
      });

      setOpen(false);
      setName("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button data-testid="button-create-key">
            <Plus className="mr-2 h-4 w-4" />
            Create API Key
          </Button>
        )}
      </DialogTrigger>
      <DialogContent data-testid="dialog-create-key">
        <DialogHeader>
          <DialogTitle>Create New API Key</DialogTitle>
          <DialogDescription>
            Give your API key a descriptive name to help you identify it later.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Key Name</Label>
            <Input
              id="name"
              placeholder="e.g., Production API Key"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreate();
                }
              }}
              data-testid="input-key-name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            data-testid="button-cancel-create-key"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isLoading}
            data-testid="button-confirm-create-key"
          >
            {isLoading ? "Creating..." : "Create Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
