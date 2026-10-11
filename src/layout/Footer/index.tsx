"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
// import ToggleTheme from "./ToggleTheme";

const navigations = [
    {
        title: "About",
        url: "/about",
    },
    {
        title: "Terms of Service",
        url: "/terms",
    },
    {
        title: "Privacy Policy",
        url: "/privacy",
    },
];

const Footer = () => {
    const pathname = usePathname();
    if (pathname === "/about") return null;

    return (
    <footer className="border-t border-n-4 dark:border-n-6 bg-white dark:bg-n-1">
        <div className="flex items-center h-16 px-16 max-w-360 mx-auto 2xl:px-8 lg:px-6 md:px-5 md:h-auto md:py-6 md:flex-col md:gap-4">
            <button className="inline-flex items-center mr-8 text-xs font-bold text-n-1 dark:text-n-9 dark:fill-white transition-colors md:mr-0">
                <Icon className="mr-1.5 fill-inherit" name="earth" />
                English
            </button>
            <div className="flex mr-auto md:mr-0 md:justify-center">
                {navigations.map((link, index) => (
                    <Link
                        className="mr-8 text-xs font-bold text-n-3 dark:text-n-9 hover:text-purple-1 dark:hover:text-purple-1 transition-colors last:mr-0 md:mr-4"
                        href={link.url}
                        key={index}
                    >
                        {link.title}
                    </Link>
                ))}
            </div>
            <div className="text-xs font-bold text-n-4 dark:text-n-8 md:text-center">
                © {new Date().getFullYear()} Commons. All rights reserved.
            </div>
            {/* <ToggleTheme /> */}
        </div>
    </footer>
    );
};

export default Footer;
