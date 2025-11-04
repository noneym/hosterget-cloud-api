import { Link } from "wouter";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Logo className="h-8 w-auto" />
              <span className="text-xl font-bold tracking-tight">
                HosterGet
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise-grade cloud APIs trusted by 10,000+ developers worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Products</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-services">
                  GPU Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Face Analyzer
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Identity Check
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-docs">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-support">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-refund">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2">Purpery, LLC</p>
              <p className="leading-relaxed">
                1111B S Governors Ave STE 34861<br />
                Dover, DE 19904, USA<br />
                EIN: Pending
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Contact</p>
              <p className="leading-relaxed">
                <a href="mailto:support@hosterget.com" className="hover:text-foreground transition-colors">support@hosterget.com</a><br />
                <a href="mailto:sales@hosterget.com" className="hover:text-foreground transition-colors">sales@hosterget.com</a><br />
                <a href="tel:+13025550123" className="hover:text-foreground transition-colors">+1 (302) 555-0123</a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Business Hours</p>
              <p className="leading-relaxed">
                Monday - Friday: 9 AM - 6 PM EST<br />
                Saturday - Sunday: Closed<br />
                Email support available 24/7
              </p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">© 2024 HosterGet. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
