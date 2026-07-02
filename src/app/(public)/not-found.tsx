"use client";

import { useEffect } from "react";
import { useCreatorHeader } from "@/context/CreatorHeaderContext";
import Link from "next/link";

export default function NotFound() {
    const { setHeaderHidden } = useCreatorHeader();

    useEffect(() => {
        setHeaderHidden(true);
        return () => setHeaderHidden(false);
    }, [setHeaderHidden]);

    return (
        <div className="flex flex-col items-center justify-center flex-1 w-full px-6 py-20 min-h-[calc(100vh-100px)]">
            <div className="w-full max-w-lg text-center">
                <div className="mb-6">
                    <h1 className="text-[120px] leading-none font-black text-n-3/20 dark:text-n-5 select-none">
                        404
                    </h1>
                </div>
                <h2 className="mb-4 text-h2 md:text-h3 text-n-7 dark:text-n-9">Page Not Found</h2>
                <p className="max-w-md mx-auto mb-10 text-base text-n-4 dark:text-n-8">
                    We couldn't find the page you're looking for. It might have been removed or the URL might be incorrect.
                </p>
                <Link className="btn-purple btn-shadow inline-flex px-10 rounded-sm" href="/">
                    Return Home
                </Link>
            </div>
        </div>
    );
}
