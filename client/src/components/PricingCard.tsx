import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText?: string;
  onSelect?: () => void;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  recommended = false,
  ctaText = "Get Started",
  onSelect,
}: PricingCardProps) {
  return (
    <Card 
      className={`relative ${recommended ? 'border-primary shadow-lg' : ''}`}
      data-testid={`card-pricing-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default">Recommended</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          variant={recommended ? "default" : "outline"} 
          className="w-full"
          onClick={onSelect}
          data-testid={`button-select-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
