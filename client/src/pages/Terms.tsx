import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8" data-testid="text-terms-title">Terms of Service</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted-foreground mb-6">
                Last updated: November 2, 2025
              </p>
              
              <p className="mb-4">
                Please read these Terms of Service ("Terms") carefully before using the HosterGet API platform ("Service") operated by HosterGet ("us", "we", or "our").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="mb-4">HosterGet provides cloud-based API services including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>GPU acceleration APIs</li>
                <li>Face analysis and recognition</li>
                <li>Identity verification services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="mb-4">To use our Service, you must:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p className="mb-4">
                You are responsible for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Subscription Plans and Billing</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Plans</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Free:</strong> $0/month with limited API calls</li>
                <li><strong>Pro:</strong> $25/month with increased limits</li>
                <li><strong>Enterprise:</strong> Custom pricing</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Billing</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Subscriptions are billed monthly in advance</li>
                <li>All fees are non-refundable except as stated in our Refund Policy</li>
                <li>We use Stripe for payment processing</li>
                <li>You authorize us to charge your payment method</li>
                <li>Failure to pay may result in service suspension</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. API Usage and Limits</h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Comply with rate limits for your subscription tier</li>
                <li>Not abuse, exploit, or circumvent usage restrictions</li>
                <li>Use the API only for lawful purposes</li>
                <li>Not attempt to reverse engineer our services</li>
                <li>Not share your API keys with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
              <p className="mb-4">You may not use our Service to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Harass, abuse, or harm others</li>
                <li>Collect personal data without consent</li>
                <li>Impersonate others or misrepresent affiliation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="mb-4">
                The Service and its original content, features, and functionality are owned by HosterGet and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mb-4">
                You retain ownership of data you submit through the API. You grant us a license to process your data to provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Service Availability</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We strive for 99.9% uptime for Pro and Enterprise plans</li>
                <li>Scheduled maintenance will be announced in advance</li>
                <li>We are not liable for temporary service interruptions</li>
                <li>Free tier has no uptime guarantees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, HOSTERGET SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
              <p className="mb-4">
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
              <p className="mb-4">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
              <p className="mb-4">We may terminate or suspend your account immediately if you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Breach these Terms</li>
                <li>Engage in fraudulent activity</li>
                <li>Fail to pay fees</li>
              </ul>
              <p className="mb-4">
                You may cancel your subscription at any time through your dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of material changes via email. Continued use of the Service after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by the laws of the United States, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms, please contact us at:
              </p>
              <p className="mb-2">
                Email:{" "}
                <a href="mailto:legal@hosterget.com" className="text-primary hover:underline">
                  legal@hosterget.com
                </a>
              </p>
              <p>
                Support:{" "}
                <a href="mailto:support@hosterget.com" className="text-primary hover:underline">
                  support@hosterget.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
