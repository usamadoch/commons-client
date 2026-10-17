"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import Marquee from "./Marquee";
import CtaButton, { CtaRow } from "./CtaButton";
import { MaskLines, Reveal } from "./Reveal";
import { Icon } from "@/components/ui/icon";
import { Check } from "@/lib/icons";
import { useActiveWhenVisible, useFinePointer } from "./hooks";
import styles from "./about.module.css";
import checkoutImage from "../_assets/checkout-yearly.webp";

const SPRING = { stiffness: 180, damping: 20, mass: 0.5 };
const MAX_TILT = 8;

const Hero = () => {
    const reduced = useReducedMotion();
    const finePointer = useFinePointer();
    const frameRef = useRef<HTMLDivElement>(null);
    const chipsRef = useRef<HTMLDivElement>(null);
    const chipsActive = useActiveWhenVisible(chipsRef);

    const tiltX = useSpring(0, SPRING);
    const tiltY = useSpring(0, SPRING);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!finePointer || reduced || !frameRef.current) return;
        const rect = frameRef.current.getBoundingClientRect();
        const px = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const py = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        tiltX.set(Math.max(-1, Math.min(1, px)) * MAX_TILT);
        tiltY.set(Math.max(-1, Math.min(1, py)) * MAX_TILT);
    };

    const handleMouseLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    return (
        <section id="hero-section" className="relative w-full overflow-hidden pt-12 md:pt-8">
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3 pb-24 md:pb-16">
                <div className="grid grid-cols-[1.1fr_1fr] lg:grid-cols-1 gap-12 lg:gap-14 items-center">
                    {/* Left Column: Text */}
                    <div className="flex flex-col items-start text-left">

                        {/* H1 line-by-line reveal */}
                        <h1 className="font-extrabold text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.03em] text-balance text-n-9 mb-8">
                            <MaskLines
                                lines={[
                                    "Turn your audience",
                                    <>
                                        into <span className="text-purple-1">income.</span>
                                    </>,
                                ]}
                                onMount
                                delay={0.05}
                            />
                        </h1>

                        {/* Subhead fade-up */}
                        <Reveal onMount delay={0.35} as="p" className="text-xl md:text-lg leading-[1.6] text-n-8 max-w-[56ch] text-pretty mb-10">
                            One page. PKR in, PKR out. For the creators whose audience already wants to support them — but never had a frictionless way to do it.
                        </Reveal>

                        {/* Button row fade-up */}
                        <Reveal onMount delay={0.5} className="w-full">
                            <CtaRow>
                                <CtaButton href="/register" variant="primary">
                                    Start your page — it's free
                                </CtaButton>
                                <CtaButton href="#toolkit" variant="secondary">
                                    See how it works
                                </CtaButton>
                            </CtaRow>
                        </Reveal>

                        {/* Payment method logos row */}
                        <Reveal onMount delay={0.65} className="mt-8 flex flex-wrap items-center gap-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-n-8">
                                Accepted locally:
                            </span>
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/merchant_logos/jazzcash.svg"
                                    alt="JazzCash"
                                    width={36}
                                    height={25}
                                    className="h-6 w-auto rounded-xs shadow-[1.5px_1.5px_0_#000]"
                                />
                                <Image
                                    src="/merchant_logos/easypaisa.svg"
                                    alt="Easypaisa"
                                    width={36}
                                    height={25}
                                    className="h-6 w-auto rounded-xs shadow-[1.5px_1.5px_0_#000]"
                                />
                                <Image
                                    src="/merchant_logos/visa.svg"
                                    alt="Visa"
                                    width={36}
                                    height={25}
                                    className="h-6 w-auto rounded-xs shadow-[1.5px_1.5px_0_#000]"
                                />
                                <Image
                                    src="/merchant_logos/mastercard.svg"
                                    alt="Mastercard"
                                    width={36}
                                    height={25}
                                    className="h-6 w-auto rounded-xs shadow-[1.5px_1.5px_0_#000]"
                                />
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Visual Frame */}
                    <div
                        ref={frameRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full flex items-center justify-center lg:mt-6 md:mt-8 md:mb-6"
                    >
                        {/* Product device mockup: clean uncropped frame with Commons border and hard shadow */}
                        <motion.div
                            style={finePointer && !reduced ? { x: tiltX, y: tiltY } : undefined}
                            className="relative w-full max-w-[620px] rounded-xl border-2 border-n-6 bg-n-2 shadow-primary-8 transform -rotate-2 lg:rotate-0 transition-transform duration-300 overflow-hidden"
                        >
                            <Image
                                src={checkoutImage}
                                alt="Commons checkout showing yearly and monthly plan options and card payment form"
                                width={checkoutImage.width}
                                height={checkoutImage.height}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                                preload
                                placeholder="blur"
                                className="w-full h-auto block object-contain"
                            />
                        </motion.div>

                        {/* Decorative floating chips: placed slightly up & down so screenshot content is fully visible */}
                        <div ref={chipsRef} aria-hidden="true" className="pointer-events-none">
                            {/* JazzCash chip */}
                            <div
                                className={`absolute -bottom-4 -left-4 md:-bottom-6 md:left-2 mobile:-bottom-6 mobile:left-1 z-10 flex items-center gap-2.5 px-3.5 py-2.5 md:px-3 md:py-2 rounded-sm bg-n-2/95 border-2 border-n-6 shadow-primary-4 backdrop-blur-sm ${styles.float}`}
                                data-paused={!chipsActive}
                            >
                                <Image
                                    src="/merchant_logos/jazzcash.svg"
                                    alt="JazzCash"
                                    width={28}
                                    height={19}
                                    className="h-5 md:h-4 w-auto rounded-xs shadow-[1px_1px_0_#000]"
                                />
                                <span className="text-sm md:text-xs font-bold text-n-9 tracking-tight">JazzCash · Paid</span>
                            </div>

                            {/* Super Chat highlight style pill (dark theme with purple accent) */}
                            <div
                                className={`absolute -top-4 -right-4 md:-top-6 md:right-2 mobile:-top-6 mobile:right-1 z-10 flex items-center gap-2.5 px-4 py-2.5 md:px-3 md:py-2 rounded-sm bg-n-2/95 border-2 border-n-6 shadow-primary-4 backdrop-blur-sm ${styles.floatAlt}`}
                                data-paused={!chipsActive}
                            >
                                <span className="text-xs md:text-[11px] font-bold uppercase tracking-wider bg-purple-1 text-n-1 px-2 py-0.5 md:px-1.5 rounded-xs">
                                    Rs 1,500
                                </span>
                                <span className="text-sm md:text-xs font-bold text-n-9 tracking-tight">Super Message in live</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marquee ticker strip below hero */}
            <Marquee />
        </section>
    );
};

export default Hero;