"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { scrollToId } from "./hooks";

type Variant = "primary" | "secondary";

type CtaButtonProps = {
    href: string;
    variant?: Variant;
    children: ReactNode;
    className?: string;
    id?: string;
    arrow?: boolean;
    magnetic?: boolean;
};

const CtaButton = ({
    href,
    variant = "primary",
    children,
    className = "",
    id,
}: CtaButtonProps) => {
    const isPrimary = variant === "primary";
    const buttonClass = isPrimary
        ? "btn-purple btn-shadow px-8 select-none"
        : "btn-stroke btn-shadow px-8 select-none";

    const isHash = href.startsWith("#");

    if (isHash) {
        return (
            <a
                id={id}
                href={href}
                className={`${buttonClass} ${className}`}
                onClick={(e) => {
                    e.preventDefault();
                    scrollToId(href.slice(1), false);
                }}
            >
                {children}
            </a>
        );
    }

    return (
        <Link id={id} href={href} className={`${buttonClass} ${className}`}>
            {children}
        </Link>
    );
};

export const CtaRow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <div className={`flex items-center gap-4 md:flex-col md:items-stretch ${className}`}>
        {children}
    </div>
);

export default CtaButton;
