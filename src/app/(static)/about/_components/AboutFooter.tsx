import Link from "next/link";
import Icon from "@/components/Icon";
import { BUSINESS, telHref } from "@/constants/business";

const navigations = [
    {
        title: "About",
        url: "/about",
    },
    {
        title: "Terms & Conditions",
        url: "/terms",
    },
    {
        title: "Privacy Policy",
        url: "/privacy",
    },
    {
        title: "Cancellation & Refund Policy",
        url: "/cancellation-refund",
    },
    {
        title: "Delivery Policy",
        url: "/delivery-policy",
    },
    {
        title: "Ownership Statement",
        url: "/ownership-statement",
    },
];

const AboutFooter = () => {
    return (
        <footer className="w-full border-t-2 border-n-6 bg-n-1 text-n-9">
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3 py-10 md:py-8 space-y-6">
                <div className="flex items-center justify-between gap-6 md:flex-col md:items-center md:gap-6">
                    {/* Language selector & links */}
                    <div className="flex items-center gap-8 md:flex-col md:gap-4">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 text-xs font-bold text-n-9 transition-colors hover:text-purple-1 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-white"
                        >
                            <Icon className="w-4 h-4 fill-inherit" name="earth" />
                            English
                        </button>

                        <nav aria-label="Legal and information" className="flex flex-wrap items-center justify-center gap-6 md:gap-4 text-center">
                            {navigations.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className="text-xs font-bold text-n-8 transition-colors hover:text-purple-1 outline-none focus-visible:outline-2 focus-visible:outline-white"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Copyright */}
                    <div className="text-xs font-semibold text-n-8 md:text-center">
                        © {new Date().getFullYear()} Commons. All rights reserved.
                    </div>
                </div>

                {/* Business contact & address strip */}
                <div className="pt-4 border-t border-n-6/60 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-n-8 md:text-center md:justify-center">
                    <span>
                        <strong className="font-semibold text-n-9">{BUSINESS.legalName}</strong>
                        {BUSINESS.registeredAddress && ` · ${BUSINESS.registeredAddress}`}
                    </span>
                    <span className="flex items-center gap-4">
                        {BUSINESS.supportPhone && (
                            <a href={telHref(BUSINESS.supportPhone)} className="hover:text-purple-1 transition-colors">
                                Tel: {BUSINESS.supportPhone}
                            </a>
                        )}
                        <a href={`mailto:${BUSINESS.supportEmail}`} className="hover:text-purple-1 transition-colors">
                            {BUSINESS.supportEmail}
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default AboutFooter;
