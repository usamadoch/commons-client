"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import ScreenshotFrame from "./ScreenshotFrame";
import { scrollToId } from "./hooks";
import checkoutImg from "../_assets/checkout-yearly.webp";
import postImg from "../_assets/create-post.webp";
import messagingImg from "../_assets/messaging-inbox.webp";
import liveImg from "../_assets/live-control-room.webp";

const featuresData = [
    {
        id: "feature-1",
        num: "01",
        stepTitle: "1. Built to Convert",
        title: "One link. They pick a plan. They pay in rupees.",
        description:
            "JazzCash, Easypaisa, and local cards — all there by default. Your audience pays the way they already pay for everything else.",
        imageSrc: checkoutImg,
        alt: "Commons checkout modal displaying membership tier selection, pricing in Pakistani Rupees, and payment form",
    },
    {
        id: "feature-2",
        num: "02",
        stepTitle: "2. Publish and Earn",
        title: "The same feed you'd post to anyway.",
        description:
            "Write a post, share a video, upload a file. Decide who sees it: everyone, or only the people paying you. One toggle — paid or free.",
        imageSrc: postImg,
        alt: "Commons creator post publisher showing content composer, audience privacy settings, and access control toggle",
    },
    {
        id: "feature-3",
        num: "03",
        stepTitle: "3. A Private Space for Your Community",
        title: "Talk to them where they're already paying you.",
        description:
            "Direct messages for the one-on-one conversations. Group chat for the community you're building. Both built in, both included, neither bolted on as an afterthought.",
        imageSrc: messagingImg,
        alt: "Commons messaging interface showing creator direct conversations, group discussions, and active subscriber chat",
    },
    {
        id: "feature-4",
        num: "04",
        stepTitle: "4. Go live. Get paid.",
        title: "The Super Chat YouTube never gave them.",
        description:
            "Keep streaming on YouTube. Commons sits next to it. Your audience sends a paid message — it shows up highlighted in your chat.",
        imageSrc: liveImg,
        alt: "Commons live stream control panel with real-time video broadcast, live viewer metrics, and highlighted paid super messages",
    },
];

const CreatorToolkit = () => {
    const reduced = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const [activeId, setActiveId] = useState("feature-1");

    // Track scroll progress within the entire toolkit section for the sidebar indicator
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 24 });

    // Scroll spy using IntersectionObserver on each feature block
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-25% 0px -45% 0px",
                threshold: 0.1,
            }
        );

        featuresData.forEach((f) => {
            const el = document.getElementById(f.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="toolkit"
            aria-labelledby="toolkit-heading"
            className="relative w-full pt-24 pb-16 lg:pt-0 lg:pb-16 md:pb-12 scroll-mt-20"
        >
            {/* Mobile/Tablet Sticky Horizontal Navigation */}
            <div className="hidden lg:block sticky top-0 z-20 w-full bg-n-1/95 border-b border-n-6 backdrop-blur-sm">
                <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3 py-3 overflow-x-auto scrollbar-none">
                    <nav aria-label="Feature navigation" className="flex items-center gap-2 min-w-max">
                        {featuresData.map((feature) => {
                            const isActive = activeId === feature.id;
                            return (
                                <button
                                    key={feature.id}
                                    onClick={() => scrollToId(feature.id, reduced)}
                                    className={`px-4 py-2 rounded-xs border text-xs font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer ${isActive
                                            ? "bg-purple-1 border-n-1 text-n-1 shadow-[2px_2px_0_#000]"
                                            : "bg-n-3 border-n-6 text-n-8 hover:text-n-9"
                                        }`}
                                >
                                    {feature.stepTitle}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3 lg:pt-10 md:pt-8">
                <div className="grid grid-cols-[1fr_1.6fr] lg:grid-cols-1 gap-20 lg:gap-10 md:gap-8 items-start">
                    {/* Left: Sticky Sidebar (Desktop >=lg) */}
                    <div className="sticky top-28 lg:static self-start space-y-8 lg:space-y-4 lg:pb-6 lg:border-b lg:border-n-6/40">
                        <div>
                            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-purple-1 mb-3 block">
                                Centerpiece
                            </span>
                            <h2
                                id="toolkit-heading"
                                className="font-extrabold text-[clamp(2rem,3.8vw,3.25rem)] md:text-3xl leading-[1.05] tracking-[-0.02em] text-balance text-n-9 mb-4 md:mb-3"
                            >
                                The Creator
                                <br className="lg:hidden" /> Toolkit.
                            </h2>
                            <p className="text-xl md:text-base text-n-8 leading-[1.6] max-w-md">
                                Everything you need to monetize a local audience, without the friction of foreign platforms.
                            </p>
                        </div>

                        {/* Interactive numbered scroll-spy list */}
                        <div className="relative pl-5 lg:hidden">
                            {/* Track bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-n-6 rounded-full overflow-hidden">
                                <motion.div
                                    className="w-full bg-purple-1 origin-top"
                                    style={{
                                        height: "100%",
                                        scaleY: smoothProgress,
                                    }}
                                />
                            </div>

                            <nav aria-label="Creator toolkit features" className="flex flex-col gap-5">
                                {featuresData.map((feature) => {
                                    const isActive = activeId === feature.id;
                                    return (
                                        <button
                                            key={feature.id}
                                            onClick={() => scrollToId(feature.id, reduced)}
                                            className={`text-left transition-all duration-200 cursor-pointer group flex items-start gap-3 outline-none focus-visible:outline-2 focus-visible:outline-purple-1 ${isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                                                }`}
                                        >
                                            <span
                                                className={`text-sm font-mono font-bold transition-colors ${isActive ? "text-purple-1" : "text-n-8"
                                                    }`}
                                            >
                                                {feature.num}
                                            </span>
                                            <span className="text-lg font-bold text-n-9 tracking-tight group-hover:translate-x-1 transition-transform">
                                                {feature.stepTitle.replace(/^\d+\.\s*/, "")}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Right: 4 Feature Blocks */}
                    <div className="space-y-36 lg:space-y-16 md:space-y-12">
                        {featuresData.map((feature) => (
                            <div
                                key={feature.id}
                                id={feature.id}
                                className="min-h-[75vh] last:min-h-fit lg:min-h-fit flex flex-col justify-center scroll-mt-28 lg:scroll-mt-20"
                            >
                                <span className="text-xs font-mono font-bold tracking-widest uppercase text-purple-1 mb-2 block">
                                    {feature.stepTitle}
                                </span>
                                <h3 className="font-extrabold text-[clamp(1.5rem,2.4vw,2.15rem)] md:text-2xl leading-[1.15] tracking-[-0.01em] text-balance text-n-9 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-xl md:text-base text-n-8 leading-[1.6] max-w-[62ch] text-pretty mb-6 md:mb-5">
                                    {feature.description}
                                </p>

                                <div className="w-full">
                                    <ScreenshotFrame
                                        src={feature.imageSrc}
                                        alt={feature.alt}
                                        sizes="(max-width: 1024px) 100vw, 750px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreatorToolkit;