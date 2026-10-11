"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "./CtaButton";

/**
 * Appears (slides down, 250ms) once the hero has scrolled out of view.
 * Rendered inside a zero-height sticky wrapper so it respects the
 * authenticated sidebar offset instead of spanning the full window.
 */
const StickyHeader = ({ heroId }: { heroId: string }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hero = document.getElementById(heroId);
        if (!hero) return;
        const io = new IntersectionObserver(([entry]) => {
            setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
        io.observe(hero);
        return () => io.disconnect();
    }, [heroId]);

    return (
        <div className="sticky top-0 z-30 h-0">
            <header
                aria-label="About page"
                aria-hidden={!visible}
                inert={!visible}
                className={`absolute inset-x-0 top-0 border-b-2 border-n-6 bg-n-1 transition-[transform,visibility] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${visible ? "translate-y-0 visible" : "-translate-y-full invisible"
                    }`}
            >
                <div className="mx-auto flex h-18 md:h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-16 2xl:px-10 lg:px-8 md:px-5">
                    <Link
                        href="/"
                        aria-label="Commons home"
                        className="flex h-11 shrink-0 items-center gap-2 rounded-xs outline-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
                    >
                        <Image src="/l.svg" alt="" width={32} height={32} className="h-8 w-8" />
                        <span className="text-[1.3rem] font-bold leading-none tracking-tight text-white sm:hidden">Commons</span>
                    </Link>
                    <Link
                        href="/register"
                        className="btn-purple btn-medium btn-shadow px-5 select-none"
                    >
                        Start your page
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default StickyHeader;
