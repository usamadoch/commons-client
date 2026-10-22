"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { BUSINESS, telHref } from "@/constants/business";
// import ToggleTheme from "./ToggleTheme";

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

const Footer = () => {
    const pathname = usePathname();
    if (pathname === "/about") return null;

    return (
    <footer className="border-t border-n-4 dark:border-n-6 bg-white dark:bg-n-1">
        <div className="flex flex-col max-w-360 mx-auto px-16 2xl:px-8 lg:px-6 md:px-4 mobile:px-3 py-4 gap-3">
            <div className="flex items-center justify-between md:flex-col md:gap-4">
                <button className="inline-flex items-center mr-8 text-xs font-bold text-n-1 dark:text-n-9 dark:fill-white transition-colors md:mr-0">
                    <Icon className="mr-1.5 fill-inherit" name="earth" />
                    English
                </button>
                <div className="flex flex-wrap items-center justify-center mr-auto md:mr-0 gap-x-6 gap-y-2 md:gap-x-4 md:gap-y-2 text-center">
                    {navigations.map((link, index) => (
                        <Link
                            className="text-xs font-bold text-n-3 dark:text-n-9 hover:text-purple-1 dark:hover:text-purple-1 transition-colors"
                            href={link.url}
                            key={index}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <div className="text-xs font-bold text-n-4 dark:text-n-8 md:text-center shrink-0">
                    © {new Date().getFullYear()} Commons. All rights reserved.
                </div>
            </div>

            {/* Business entity, local address, and contact number strip */}
            <div className="pt-2 border-t border-n-3/20 dark:border-n-6/50 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[11px] text-n-4 dark:text-n-8 md:text-center md:justify-center">
                <span>
                    <strong className="font-semibold text-n-2 dark:text-n-9">{BUSINESS.legalName}</strong>
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
            {/* <ToggleTheme /> */}
        </div>
    </footer>
    );
};

export default Footer;
