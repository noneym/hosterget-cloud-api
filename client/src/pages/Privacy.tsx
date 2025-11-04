import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8" data-testid="text-privacy-title">Privacy Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted-foreground mb-6">
                Last updated: November 2, 2025
              </p>
              
              <p className="mb-4">
                Purpery, LLC ("HosterGet", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cloud API services.
              </p>
              
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-3">Company Information</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Purpery, LLC</strong><br />
                  1111B S Governors Ave STE 34861<br />
                  Dover, DE 19904, USA<br />
                  EIN: 61-2270068
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
              <p className="mb-4">When you register for an account, we collect:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name and email address</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Account credentials</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Usage Data</h3>
              <p className="mb-4">We automatically collect information about your use of our APIs:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>API requests and responses</li>
                <li>Usage statistics and analytics</li>
                <li>IP addresses and device information</li>
                <li>Service performance metrics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide and maintain our API services</li>
                <li>Process your transactions and manage subscriptions</li>
                <li>Monitor usage and prevent abuse</li>
                <li>Send important service notifications</li>
                <li>Improve our products and develop new features</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Encryption in transit (TLS/SSL)</li>
                <li>Encrypted data storage</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Secure payment processing through Stripe</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell your personal information. We may share data with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> Stripe for payment processing, hosting providers</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@hosterget.com" className="text-primary hover:underline">
                  privacy@hosterget.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <p className="mb-4">
                We use essential cookies for authentication and session management. We do not use third-party tracking cookies for advertising.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="mb-4">
                We retain your data for as long as your account is active or as needed to provide services. Usage logs are retained for 90 days for operational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
              <p className="mb-4">
                Your data may be processed in the United States or other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="mb-4">
                Our services are not directed to individuals under 18. We do not knowingly collect data from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Purpery, LLC</strong><br />
                  1111B S Governors Ave STE 34861<br />
                  Dover, DE 19904, USA<br />
                  EIN: 61-2270068
                </p>
                <p className="text-sm mb-2">
                  Privacy:{" "}
                  <a href="mailto:privacy@hosterget.com" className="text-primary hover:underline">
                    privacy@hosterget.com
                  </a>
                </p>
                <p className="text-sm">
                  Support:{" "}
                  <a href="mailto:support@hosterget.com" className="text-primary hover:underline">
                    support@hosterget.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
