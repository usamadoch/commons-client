import type { Metadata } from "next";
import { BUSINESS } from "@/constants/business";

export const metadata: Metadata = {
    title: "Ownership Statement | Commons",
    description:
        "Commons.pk is owned and operated by Commons Technologies (SMC-Private) Limited, a company registered in Pakistan.",
};

const linkClass = "text-purple-1 hover:underline";

const OwnershipStatementPage = () => {
    return (
        <main className="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col gap-12">
            <div className="flex flex-col gap-2 border-b border-n-4 dark:border-n-6 pb-12">
                <h1 className="text-[48px] font-normal tracking-tighter leading-[0.85] text-n-1 dark:text-n-9">
                    Ownership Statement
                </h1>
                <div className="flex flex-col gap-2 text-base font-normal text-n-3 dark:text-n-8">
                    <p>Last Updated: October 15, 2026</p>
                </div>
            </div>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">Website Ownership</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Commons.pk is owned and operated by {BUSINESS.legalName}, a company registered in Pakistan.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Commons is a digital platform that enables creators to offer paid memberships and digital content to their audiences. The platform also provides features for creator subscriptions and audience engagement.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">Business Information</h2>
                <div className="flex flex-col gap-1 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Legal Business Name:</strong> {BUSINESS.legalName}</p>
                    <p>
                        <strong className="font-bold text-n-1 dark:text-n-9">Website:</strong>{" "}
                        <a href={BUSINESS.websiteUrl} className={linkClass}>{BUSINESS.websiteLabel}</a>
                    </p>
                    <p><strong className="font-bold text-n-1 dark:text-n-9">Business Location:</strong> {BUSINESS.country}</p>
                    {BUSINESS.registeredAddress && (
                        <p><strong className="font-bold text-n-1 dark:text-n-9">Registered Address:</strong> {BUSINESS.registeredAddress}</p>
                    )}
                    <p>
                        <strong className="font-bold text-n-1 dark:text-n-9">Contact Email:</strong>{" "}
                        <a href={`mailto:${BUSINESS.generalEmail}`} className={linkClass}>{BUSINESS.generalEmail}</a>
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">Intellectual Property</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    The Commons platform, including its branding, website design, software, and original platform materials, is owned by {BUSINESS.legalName} or its respective licensors, where applicable.
                </p>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    Content published by individual creators remains subject to the rights of its respective owners. Creators are responsible for ensuring they have the necessary rights to publish the content they upload to the platform.
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal tracking-tight text-n-1 dark:text-n-9">Contact Information</h2>
                <p className="text-base font-normal text-n-3 dark:text-n-8 leading-relaxed">
                    For questions regarding website ownership, business identity, or platform operations, please contact:
                </p>
                <div className="flex flex-col gap-1 text-base font-normal text-n-3 dark:text-n-8 leading-relaxed pl-6 border-l-2 border-purple-1">
                    <p className="font-bold text-n-1 dark:text-n-9">{BUSINESS.legalName}</p>
                    <p>
                        Email: <a href={`mailto:${BUSINESS.generalEmail}`} className={linkClass}>{BUSINESS.generalEmail}</a>
                    </p>
                    <p>
                        Website: <a href={BUSINESS.websiteUrl} className={linkClass}>{BUSINESS.websiteLabel}</a>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default OwnershipStatementPage;
