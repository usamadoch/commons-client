"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./motion";
import { Reveal } from "./Reveal";

const ProblemStatement = () => {
    const reduced = useReducedMotion();

    return (
        <section className="relative w-full border-b border-n-6 bg-n-2/40 py-32 md:py-20">
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3">
                <div className="grid grid-cols-12 lg:grid-cols-1 gap-16 lg:gap-10 items-start">
                    {/* Left: 5 cols sticky heading */}
                    <div className="col-span-5 lg:col-span-1 sticky top-32 lg:static self-start">
                        <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-purple-1 mb-4 block">
                            The Problem
                        </span>
                        <h2 className="font-extrabold text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-balance text-n-9">
                            WhatsApp groups and bank transfers only scale so far.
                        </h2>
                    </div>

                    {/* Right: 7 cols content */}
                    <div className="col-span-7 lg:col-span-1 space-y-8 text-xl md:text-lg text-n-8 leading-[1.6]">
                        {/* Paragraph 1 */}
                        <Reveal as="p" className="text-pretty">
                            Most creators in Pakistan run their business through WhatsApp groups and bank transfers. Someone pays, someone checks a screenshot, someone adds them to a group by hand.
                            <br className="my-2" />
                            <span className="relative inline-block mt-2 font-bold text-n-9">
                                <span className="relative z-10">It works — until you have a hundred people to manage.</span>
                                <motion.span
                                    aria-hidden="true"
                                    className="absolute left-0 bottom-0.5 w-full h-[8px] bg-purple-1/80 -z-0 origin-left"
                                    initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.6, ease: EASE_OUT }}
                                />
                            </span>
                        </Reveal>

                        {/* Before vs. After: Manual WhatsApp Workflow vs. Automated Commons Link */}
                        <Reveal className="py-2">
                            <div className="rounded-xl border border-n-6 bg-n-2/80 p-6 md:p-5 flex flex-col gap-6 md:gap-5 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.1)]">
                                {/* The Old Way */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-xs font-mono font-bold tracking-wider uppercase text-n-8">
                                            The manual way
                                        </span>
                                        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs bg-n-3 border border-n-5 text-n-8">
                                            Doesn't scale
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-n-8">
                                        <span className="px-3 py-1.5 rounded-sm bg-n-3 border border-n-5 text-n-8 line-through decoration-n-5/90">
                                            1. Send screenshot
                                        </span>
                                        <span className="text-n-8/50 font-mono">→</span>
                                        <span className="px-3 py-1.5 rounded-sm bg-n-3 border border-n-5 text-n-8 line-through decoration-n-5/90">
                                            2. Verify bank account
                                        </span>
                                        <span className="text-n-8/50 font-mono">→</span>
                                        <span className="px-3 py-1.5 rounded-sm bg-n-3 border border-n-5 text-n-8 line-through decoration-n-5/90">
                                            3. Add to group by hand
                                        </span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="relative flex items-center justify-center my-0.5">
                                    <div className="w-full border-t border-n-6" />
                                    <span className="absolute bg-n-2 px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-purple-1">
                                        Replaced by Commons
                                    </span>
                                </div>

                                {/* The Commons Way */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-xs font-mono font-bold tracking-wider uppercase text-purple-1">
                                            With Commons
                                        </span>
                                        <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-xs bg-purple-1 text-n-1 shadow-[2px_2px_0_#000]">
                                            100% Automated
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-3.5 rounded-lg bg-n-1 border border-n-6 shadow-[2px_2px_0_#000]">
                                        <div className="flex items-center gap-2.5">
                                            <span className="flex h-2 w-2 rounded-full bg-purple-1 animate-pulse" />
                                            <span className="font-mono text-sm md:text-xs font-bold text-n-9">
                                                commons.so/<span className="text-purple-1">yourname</span>
                                            </span>
                                            <span className="text-xs font-mono font-semibold text-n-8/80 hidden sm:inline">
                                                (One link)
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-n-8 md:text-[11px]">
                                            JazzCash · Easypaisa · Cards
                                        </span>
                                    </div>
                                    <p className="text-sm md:text-xs text-n-8 leading-relaxed">
                                        Subscribers pay in rupees, and instant access to your locked posts and private community is granted automatically.
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        {/* YouTube Super Chat callout */}
                        <Reveal className="border-l-4 border-purple-1 bg-n-3/40 p-6 rounded-r-md">
                            <p className="text-xl md:text-lg text-n-9 leading-[1.6]">
                                And on live streams? If your audience is mostly Pakistani, that door is closed. YouTube’s Super Chat isn't available here, leaving money on the table every time you go live.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;