import { Link } from "wouter";
import logoIcon from '@assets/generated_images/Blue_cloud_hosting_logo_transparent_6f6c4e19.png';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoIcon} alt="HosterGet Logo" className="h-9 w-9 object-contain" />
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
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-services">
                    GPU Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Face Analyzer
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-foreground transition-colors">
                    Identity Check
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/pricing">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">
                    Pricing
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/docs">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-docs">
                    Documentation
                  </a>
                </Link>
              </li>
              <li>
                <a href="mailto:support@hosterget.com" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-email">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                    Terms of Service
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                    Privacy Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">© 2024 HosterGet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
