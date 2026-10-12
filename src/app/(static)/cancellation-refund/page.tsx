import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cancellation & Refund Policy | Commons",
    description:
        "Learn about subscription cancellations, refund eligibility, and payment dispute procedures on Commons.",
};

const CancellationRefundPage = () => {
    return (
        <main className="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col gap-12">
            <div className="flex flex-col gap-2 border-b border-n-4 dark:border-n-6 pb-12">
                <h1 className="text-[48px] font-normal tracking-tighter leading-[0.85] text-n-1 dark:text-n-9">
                    Cancellation &amp; Refund Policy
                </h1>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8">
                    <p>Last Updated: October 12, 2026</p>
                </div>
            </div>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">1. Overview</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Commons is a digital platform that allows users to support creators through paid memberships and one-time payments during live streams. All payments on Commons are processed in Pakistani Rupees (PKR), unless otherwise indicated at checkout.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    This policy explains how subscription cancellations, refund requests, and payment disputes are handled on Commons.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">2. Subscription Cancellations</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Users can cancel their recurring creator memberships at any time through their Commons account dashboard.
                </p>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p><strong className="font-bold text-n-1 dark:text-n-9">No cancellation fee:</strong> Users will not be charged a fee for cancelling a membership.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Continued access:</strong> After cancellation, users retain access to the membership&apos;s paid content and benefits until the end of their current billing period.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Future payments:</strong> Once cancellation takes effect, the membership will not renew, and no further recurring payments will be charged for that membership.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Partial refunds:</strong> Cancelling a membership does not automatically entitle the user to a refund for the current billing period or any unused portion of the subscription.</p>
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">3. Refund Eligibility</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Because Commons provides immediate access to digital content and membership benefits, payments are generally non-refundable once access has been granted.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    However, users may contact our support team to request a refund in the following circumstances:
                </p>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Duplicate payments:</strong> The same subscription or purchase was charged more than once in error.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Payment errors:</strong> A payment was processed incorrectly or charged in the wrong amount.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Technical issues:</strong> A user paid for a membership but could not access the purchased benefits, and the issue could not be resolved.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Unauthorized transactions:</strong> A payment appears to have been made without the account holder&apos;s authorization. Such requests will be reviewed before a decision is made.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Other applicable circumstances:</strong> Refunds may be provided where required by applicable law.</p>
                </div>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Submitting a refund request does not guarantee approval. Each request will be reviewed based on the transaction details and circumstances.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">4. One-Time Payments and Super Messages</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Super Messages are one-time payments that allow users to highlight messages during a creator&apos;s livestream.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    These payments are generally non-refundable once successfully processed and delivered. Users should verify the amount and recipient before completing a payment.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Refund requests may be considered for duplicate charges, payment errors, failed delivery, or other eligible circumstances described in this policy.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">5. How to Request a Refund</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    To request a refund or report a billing issue, contact us at <a href="mailto:support@commons.pk" className="text-purple-1 hover:underline">support@commons.pk</a>.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Please include:
                </p>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p>• Your registered email address</p>
                    <p>• The transaction date and amount</p>
                    <p>• The relevant creator or membership, if applicable</p>
                    <p>• Your transaction reference, if available</p>
                    <p>• A brief explanation of the issue</p>
                </div>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Our support team aims to respond to inquiries within 48 hours. We may request additional information to investigate a claim.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">6. Refund Processing Time</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    If a refund is approved, Commons will initiate the refund through the applicable payment method or payment provider.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Approved refunds are generally expected to be processed within 5–10 business days, although the time required for the funds to appear in the user&apos;s account may vary depending on the payment provider or issuing bank.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    We will communicate any material delays where possible.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">7. Billing Disputes</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    If you believe a payment was processed incorrectly, please contact us at <a href="mailto:support@commons.pk" className="text-purple-1 hover:underline">support@commons.pk</a> so we can investigate and attempt to resolve the issue.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Users retain any rights available to them under applicable law and the rules of their payment provider.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">8. Contact Us</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    For cancellation assistance, refund requests, or billing complaints, contact:
                </p>
                <div className="flex flex-col gap-1 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p className="font-bold text-n-1 dark:text-n-9">Commons Technologies (SMC-Private) Limited</p>
                    <p>Email: <a href="mailto:support@commons.pk" className="text-purple-1 hover:underline">support@commons.pk</a></p>
                    <p>Website: <a href="https://www.commons.pk" target="_blank" rel="noopener noreferrer" className="text-purple-1 hover:underline">https://www.commons.pk</a></p>
                </div>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    We aim to respond to customer inquiries within 48 hours.
                </p>
            </section>
        </main>
    );
};

export default CancellationRefundPage;
