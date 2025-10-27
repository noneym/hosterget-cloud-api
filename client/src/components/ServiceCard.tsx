import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status: "Live" | "Beta" | "Free Tool";
  metric?: string;
  tags: string[];
  href: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  status,
  metric,
  tags,
  href,
}: ServiceCardProps) {
  const statusColors = {
    "Live": "bg-green-500/10 text-green-500 border-green-500/20",
    "Beta": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Free Tool": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  return (
    <Card className="hover-elevate active-elevate-2 transition-all group" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="outline" className={statusColors[status]}>
            {status}
          </Badge>
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        {metric && (
          <div className="text-xs text-muted-foreground">{metric}</div>
        )}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={href}>
          <a data-testid={`link-explore-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Button variant="ghost" className="w-full group-hover:bg-accent">
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
