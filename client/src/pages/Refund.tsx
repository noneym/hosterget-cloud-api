import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Refund() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8" data-testid="text-refund-title">Refund Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted-foreground mb-6">
                Last updated: November 2, 2025
              </p>
              
              <p className="mb-4">
                At HosterGet, we want you to be completely satisfied with our service. This Refund Policy outlines the circumstances under which refunds may be issued.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7-Day Money-Back Guarantee</h2>
              <p className="mb-4">
                We offer a <strong>7-day money-back guarantee</strong> for first-time Pro plan subscribers:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Available only for your first Pro subscription payment</li>
                <li>Request must be made within 7 days of initial payment</li>
                <li>Full refund will be issued to your original payment method</li>
                <li>Your account will be downgraded to the Free plan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Monthly Subscriptions</h2>
              <p className="mb-4">For recurring monthly subscriptions:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Payments are non-refundable after the 7-day guarantee period</li>
                <li>You can cancel anytime to prevent future charges</li>
                <li>Cancellation takes effect at the end of your current billing period</li>
                <li>You retain access to paid features until the period ends</li>
                <li>No partial refunds for unused time within a billing period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Credit Purchases</h2>
              <p className="mb-4">For pay-as-you-go API credits:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Credits are non-refundable once purchased</li>
                <li>Unused credits do not expire</li>
                <li>Credits cannot be transferred between accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Enterprise Plans</h2>
              <p className="mb-4">
                Enterprise plans have custom refund terms outlined in your contract. Please contact your account manager for details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Issues and Downtime</h2>
              <p className="mb-4">
                We are committed to providing reliable service. In cases of extended service disruptions:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Pro/Enterprise plans: Service credits may be issued for downtime exceeding SLA</li>
                <li>Credits will be applied automatically to your account</li>
                <li>Credits can be used for future API usage</li>
                <li>Free plan users are not eligible for downtime credits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Exceptional Circumstances</h2>
              <p className="mb-4">
                Refunds outside the standard policy may be considered for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Billing errors or duplicate charges</li>
                <li>Unauthorized transactions (subject to investigation)</li>
                <li>Service failures preventing API usage</li>
              </ul>
              <p className="mb-4">
                Each case is reviewed individually. Contact our support team to discuss your situation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
              <p className="mb-4">To request a refund:</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Email us at{" "}
                  <a href="mailto:billing@hosterget.com" className="text-primary hover:underline">
                    billing@hosterget.com
                  </a>
                </li>
                <li>Include your account email and transaction details</li>
                <li>Explain the reason for your refund request</li>
                <li>We will respond within 2 business days</li>
              </ol>
              <p className="mb-4">
                If approved, refunds are typically processed within 5-10 business days to your original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Chargebacks</h2>
              <p className="mb-4">
                Please contact us before initiating a chargeback with your bank. Chargebacks may result in:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Immediate account suspension</li>
                <li>Loss of all data and API access</li>
                <li>Additional fees to cover processing costs</li>
              </ul>
              <p className="mb-4">
                We're happy to work with you to resolve billing concerns directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Free Plan</h2>
              <p className="mb-4">
                The Free plan has no recurring charges and is not eligible for refunds. You may delete your account at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Refund Policy from time to time. Changes will be posted on this page with an updated date. Material changes will be communicated via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about our Refund Policy, please contact us:
              </p>
              <p className="mb-2">
                Billing Email:{" "}
                <a href="mailto:billing@hosterget.com" className="text-primary hover:underline">
                  billing@hosterget.com
                </a>
              </p>
              <p>
                General Support:{" "}
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
