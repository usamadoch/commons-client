import type { Metadata } from "next";
import { BUSINESS } from "@/constants/business";
import BusinessContactDetails from "../_components/BusinessContactDetails";
import StaticPageWrapper from "../_components/StaticPageWrapper";

export const metadata: Metadata = {
    title: "Privacy Policy | Commons",
    description:
        "How Commons collects, uses, shares, and protects your personal and payment information.",
};

const PrivacyPage = () => {
    return (
        <StaticPageWrapper title="Commons Privacy Policy" lastUpdated="October 15, 2026">

            <section className="flex flex-col gap-2">
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    This Privacy Policy explains how {BUSINESS.legalName} (&quot;Commons&quot;, &quot;we&quot;, &quot;us&quot;), a company based in Pakistan, collects and processes personal data when you use {BUSINESS.websiteLabel}. Our contact details are listed in Section 8.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">1. What Information We Collect</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    To make Commons work, we collect the following basic information:
                </p>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Account Information:</strong> Your name, email, profile picture, and login credentials.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Payment Information:</strong> Payments for subscriptions and Super Messages are processed by our payment service provider, Safepay. Card details (card number, expiry date, and security code) are entered directly into secure payment fields hosted by Safepay and are sent to Safepay, not to Commons servers. Commons does not receive or store your full card number or security code. To support saved cards and recurring billing, we store reference tokens issued by Safepay, and we keep records of your transactions (such as amount, date, the creator or membership purchased, and payment status). We may display limited card details provided by Safepay, such as the card brand and last four digits, so you can recognise a saved card.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Creator Payout and Verification Information:</strong> If you receive payouts as a creator, we collect the information needed to verify your identity and pay you, including your name, date of birth, address, bank name, account holder name, IBAN, and identity document type and number.</p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Usage Data:</strong> Basic information about how you interact with the site to help us fix bugs and improve performance.</p>
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">2. How We Use Your Information</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    We use your information exclusively to provide the Commons service. This includes processing payments, sending you receipt emails, notifying you about messages or new content, and keeping your account secure.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">3. Sharing Your Information</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    We do not sell your personal data to advertisers or third parties. We only share data with trusted partners necessary to run the platform, such as our payment service provider, Safepay (to process payments, save cards you choose to store, and handle recurring billing and refunds), and secure cloud servers (to host the website and your content). Safepay processes payment data in accordance with its own privacy policy and terms. We may also disclose information where required by law or to investigate fraud and payment disputes.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">4. Cookies</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    We use standard browser cookies to keep you logged into your account and to maintain your session securely. You can disable cookies in your browser settings, but parts of the Commons platform will no longer function properly.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">5. Your Rights and Deletion</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    You own your data. You can update your profile information at any time from your account settings.
                    If you wish to permanently delete your Commons account and erase your personal data from our active servers,
                    please contact us at <a href="mailto:support@commons.pk" className="text-purple-1 hover:underline">support@commons.pk</a>. You can also contact us at the same address to have your saved cards removed.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">6. Data Retention</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Transaction and payment records are retained for as long as necessary to meet our legal, tax, accounting, and fraud-prevention obligations under applicable law, even if you delete your account. Other personal data is deleted or anonymised when it is no longer needed to provide the service.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">7. Payment Security</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Card payments are handled by Safepay. Card details are captured in secure fields hosted by Safepay and are not transmitted to or stored on Commons servers. Commons does not store full card numbers or card security codes; we only keep the Safepay reference tokens and transaction records described in Section 1.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">8. Contact Us</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    For privacy questions, data access, or deletion requests, contact:
                </p>
                <BusinessContactDetails />
            </section>
        </StaticPageWrapper>
    );
};

export default PrivacyPage;
