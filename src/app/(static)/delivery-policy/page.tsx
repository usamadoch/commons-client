import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/constants/business";
import BusinessContactDetails from "../_components/BusinessContactDetails";
import StaticPageWrapper from "../_components/StaticPageWrapper";

export const metadata: Metadata = {
    title: "Shipping & Service Delivery Policy | Commons",
    description:
        "Learn how digital memberships, creator content, and live stream services are fulfilled and delivered on Commons.",
};

const DeliveryPolicyPage = () => {
    return (
        <StaticPageWrapper title="Shipping & Service Delivery Policy" lastUpdated="October 22, 2026">
            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">1. Overview & Nature of Services</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Commons ({BUSINESS.websiteLabel}), operated by {BUSINESS.legalName}, is a digital platform enabling creators to offer exclusive digital content, memberships, and live broadcast interactions to their audience.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    All products, memberships, and services sold on Commons are <strong className="font-bold text-n-1 dark:text-n-9">strictly digital goods and electronic services</strong>. Commons does not sell or dispatch physical goods, and therefore <strong className="font-bold text-n-1 dark:text-n-9">no physical shipping, postal dispatch, or courier delivery</strong> is involved in any transaction.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">2. Electronic Delivery Method</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    All digital services are delivered electronically through the Commons web platform directly to your authenticated user account. Upon completing a transaction, no postal delivery fee, handling fee, or customs duty is charged.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">3. Fulfillment Timelines</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Delivery and fulfillment timelines vary by the specific service purchased:
                </p>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p>
                        <strong className="font-bold text-n-1 dark:text-n-9">Creator Membership Subscriptions:</strong> Fulfillment is immediate. As soon as your payment is authorized by our payment service provider, your user account is automatically granted instant digital access to the creator&apos;s exclusive feed, tier-locked posts, video streaming, and community channels.
                    </p>
                    <p>
                        <strong className="font-bold text-n-1 dark:text-n-9">Super Messages & Live Stream Tipping:</strong> Fulfillment is instantaneous and real-time. Upon successful payment confirmation, the Super Message is rendered and highlighted on the creator&apos;s active live stream feed and chat room within seconds.
                    </p>
                    <p>
                        <strong className="font-bold text-n-1 dark:text-n-9">Direct Messaging & Community Chat:</strong> Chat channel privileges are unlocked immediately upon active tier membership confirmation.
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">4. Confirmation and Receipts</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Following any successful purchase or subscription renewal, an electronic confirmation receipt is displayed on screen and sent to your registered account email address. You may also view and print full payment receipts at any time from your account settings.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">5. Access Duration & Renewal</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Access to paid membership content remains active for the duration of the purchased billing period (monthly or annual). If you cancel a recurring subscription, you retain complete digital access to all purchased benefits until the end of your prepaid billing cycle.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">6. Technical Delivery Issues & Support</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    If you experience any delay in digital delivery—for example, if a payment is completed but your access to tier content is not automatically unlocked, or a Super Message fails to display due to a network interruption—please reach out to us immediately:
                </p>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p>• Email our technical support at <a href={`mailto:${BUSINESS.supportEmail}`} className="text-purple-1 hover:underline">{BUSINESS.supportEmail}</a> with your registered email and payment reference.</p>
                    <p>• We respond to all delivery and technical inquiries within {BUSINESS.supportResponseHours} hours.</p>
                    <p>• If technical delivery cannot be restored or fulfilled, users are eligible for a prompt resolution or refund in accordance with our <Link href="/cancellation-refund" className="text-purple-1 hover:underline">Cancellation & Refund Policy</Link>.</p>
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">7. Business Contact Information</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    For inquiries regarding service delivery, digital access, or platform operations, contact:
                </p>
                <BusinessContactDetails />
            </section>
        </StaticPageWrapper>
    );
};

export default DeliveryPolicyPage;
