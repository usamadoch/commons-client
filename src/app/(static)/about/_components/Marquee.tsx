"use client";

import { useRef } from "react";
import styles from "./about.module.css";
import { useActiveWhenVisible } from "./hooks";

const ITEMS = ["JazzCash", "Easypaisa", "Local cards", "PKR in, PKR out"];

const Row = () => (
    <div className="flex shrink-0 items-center">
        {Array.from({ length: 3 }).flatMap((_, r) =>
            ITEMS.map((item, i) => (
                <span key={`${r}-${i}`} className="flex items-center">
                    <span className="px-6 md:px-4">{item}</span>
                    <span className="text-purple-1/60 font-normal">·</span>
                </span>
            ))
        )}
    </div>
);

/** Slow decorative ticker matching project dark aesthetic. Paused on hover, offscreen, hidden tab, and reduced motion. */
const Marquee = () => {
    const ref = useRef<HTMLDivElement>(null);
    const active = useActiveWhenVisible(ref);

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={`${styles.marquee} relative overflow-hidden border-y border-n-6 bg-n-2 text-n-9`}
        >
            <div
                className={`${styles.marqueeTrack} flex w-max py-4 text-[clamp(1rem,1.8vw,1.35rem)] font-bold uppercase tracking-wider whitespace-nowrap`}
                data-paused={!active}
            >
                <Row />
                <Row />
            </div>
        </div>
    );
};

export default Marquee;
