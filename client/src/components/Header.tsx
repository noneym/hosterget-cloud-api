import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Logo } from "./Logo";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/register";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 hover-elevate rounded-md px-2 py-1.5 -ml-2" data-testid="link-home">
          <Logo className="h-9 w-9" />
          <span className="text-xl font-bold tracking-tight">
            HosterGet
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {isAuthenticated && (
            <Link href="/dashboard" className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors" data-testid="link-dashboard">
              Dashboard
            </Link>
          )}
          <Link href="/services" className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors" data-testid="link-services">
            Products
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors" data-testid="link-pricing">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium hover-elevate rounded-md px-4 py-2 transition-colors" data-testid="link-docs">
            Docs
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
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user?.email}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogin}
                  data-testid="button-login"
                >
                  Log in
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSignup}
                  data-testid="button-signup"
                >
                  Sign up
                </Button>
              </>
            )}
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
            {isAuthenticated && (
              <Link href="/dashboard" className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium" data-testid="link-mobile-dashboard">
                Dashboard
              </Link>
            )}
            <Link href="/services" className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium" data-testid="link-mobile-services">
              Products
            </Link>
            <Link href="/pricing" className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium" data-testid="link-mobile-pricing">
              Pricing
            </Link>
            <Link href="/docs" className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium" data-testid="link-mobile-docs">
              Docs
            </Link>
            <a href="mailto:support@hosterget.com" className="block hover-elevate rounded-md px-4 py-3 text-sm font-medium">
              Support
            </a>
            <div className="pt-4 border-t mt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    {user?.email}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={handleLogout}
                    data-testid="button-mobile-logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={handleLogin}
                    data-testid="button-mobile-login"
                  >
                    Log in
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full bg-primary"
                    onClick={handleSignup}
                    data-testid="button-mobile-signup"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
