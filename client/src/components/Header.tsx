import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { Logo } from "./Logo";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <a className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1 -ml-2" data-testid="link-home">
              <Logo className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent tracking-tight">
                HosterGet
              </span>
            </a>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/services">
            <a className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors" data-testid="link-services">
              Products
            </a>
          </Link>
          <Link href="/pricing">
            <a className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors" data-testid="link-pricing">
              Pricing
            </a>
          </Link>
          <Link href="/docs">
            <a className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors" data-testid="link-docs">
              Docs
            </a>
          </Link>
          <a href="mailto:support@hosterget.com" className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors">
            Support
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:flex"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login">
              <a data-testid="link-login">
                <Button variant="ghost" size="sm">Log in</Button>
              </a>
            </Link>
            <Link href="/signup">
              <a data-testid="link-signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Sign up
                </Button>
              </a>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container mx-auto px-6 py-4 space-y-1">
            <Link href="/services">
              <a className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium" data-testid="link-mobile-services">
                Products
              </a>
            </Link>
            <Link href="/pricing">
              <a className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium" data-testid="link-mobile-pricing">
                Pricing
              </a>
            </Link>
            <Link href="/docs">
              <a className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium" data-testid="link-mobile-docs">
                Docs
              </a>
            </Link>
            <a href="mailto:support@hosterget.com" className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium">
              Support
            </a>
            <div className="pt-4 border-t mt-4 space-y-2">
              <Link href="/login">
                <a data-testid="link-mobile-login">
                  <Button variant="outline" size="sm" className="w-full">Log in</Button>
                </a>
              </Link>
              <Link href="/signup">
                <a data-testid="link-mobile-signup">
                  <Button size="sm" className="w-full bg-primary">Sign up</Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
