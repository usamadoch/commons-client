import React, { ReactNode } from "react";

interface StaticPageWrapperProps {
    title: string;
    lastUpdated?: string;
    children: ReactNode;
    className?: string;
}

export const StaticSection = ({
    title,
    children,
    className = "",
}: {
    title?: string;
    children: ReactNode;
    className?: string;
}) => {
    return (
        <section className={`flex flex-col gap-2 ${className}`}>
            {title && (
                <h2 className="text-2xl md:text-xl font-normal tracking-tight text-n-1 dark:text-n-9">
                    {title}
                </h2>
            )}
            {children}
        </section>
    );
};

const StaticPageWrapper = ({
    title,
    lastUpdated,
    children,
    className = "",
}: StaticPageWrapperProps) => {
    return (
        <main
            className={`w-full max-w-4xl mx-auto px-6 mobile:px-3 py-24 md:py-10 flex flex-col gap-12 md:gap-8 ${className}`}
        >
            <div className="flex flex-col gap-2 border-b border-n-4 dark:border-n-6 pb-12 md:pb-8">
                <h1 className="text-[48px] md:text-3xl font-normal tracking-tighter leading-[0.85] text-n-1 dark:text-n-9">
                    {title}
                </h1>
                {lastUpdated && (
                    <div className="flex flex-col gap-2 text-base md:text-sm font-normal text-n-3 dark:text-n-8">
                        <p>Last Updated: {lastUpdated}</p>
                    </div>
                )}
            </div>
            {children}
        </main>
    );
};

export default StaticPageWrapper;
