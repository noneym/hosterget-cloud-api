import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import logoImage from '@assets/generated_images/HosterGet_company_logo_745cb216.png';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="flex items-center space-x-2 hover-elevate rounded-md px-2 py-1" data-testid="link-home">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="HosterGet" className="h-8 w-8 rounded-md" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                HosterGet
              </span>
            </div>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/services">
            <a className="text-sm font-medium hover-elevate rounded-md px-3 py-2 transition-colors" data-testid="link-services">
              Services
            </a>
          </Link>
          <Link href="/pricing">
            <a className="text-sm font-medium hover-elevate rounded-md px-3 py-2 transition-colors" data-testid="link-pricing">
              Pricing
            </a>
          </Link>
          <Link href="/docs">
            <a className="text-sm font-medium hover-elevate rounded-md px-3 py-2 transition-colors" data-testid="link-docs">
              Documentation
            </a>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <a data-testid="link-login">
                <Button variant="ghost">Log In</Button>
              </a>
            </Link>
            <Link href="/signup">
              <a data-testid="link-signup">
                <Button variant="default" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                  Sign Up
                </Button>
              </a>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-2">
          <Link href="/services">
            <a className="block hover-elevate rounded-md px-3 py-2" data-testid="link-mobile-services">
              Services
            </a>
          </Link>
          <Link href="/pricing">
            <a className="block hover-elevate rounded-md px-3 py-2" data-testid="link-mobile-pricing">
              Pricing
            </a>
          </Link>
          <Link href="/docs">
            <a className="block hover-elevate rounded-md px-3 py-2" data-testid="link-mobile-docs">
              Documentation
            </a>
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login">
              <a data-testid="link-mobile-login">
                <Button variant="ghost" className="w-full">Log In</Button>
              </a>
            </Link>
            <Link href="/signup">
              <a data-testid="link-mobile-signup">
                <Button variant="default" className="w-full bg-gradient-to-r from-primary to-purple-600">Sign Up</Button>
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
