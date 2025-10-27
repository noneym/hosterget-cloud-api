import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">AI Cloud</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade APIs for cloud intelligence and AI-powered analysis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-services">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-pricing">
                    Pricing
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/docs">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-docs">
                    Documentation
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@aicloud.com" className="text-muted-foreground hover:text-foreground" data-testid="link-footer-email">
                  Email Support
                </a>
              </li>
              <li>
                <Link href="/status">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-status">
                    Status
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-terms">
                    Terms of Service
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-privacy">
                    Privacy Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 AI Cloud Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
