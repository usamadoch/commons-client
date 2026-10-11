"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./motion";
import { Reveal } from "./Reveal";

const ProblemStatement = () => {
    const reduced = useReducedMotion();

    return (
        <section className="relative w-full border-b border-n-6 bg-n-2/40 py-32 md:py-20">
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5">
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

                        {/* Interactive collapse visual: manual steps -> One link */}
                        <Reveal className="py-2">
                            <div className="relative p-5 rounded-md border border-n-6 bg-n-1 overflow-hidden min-h-[76px] flex items-center">
                                {/* Collapsing 3 chips */}
                                <motion.div
                                    className="flex flex-wrap items-center gap-2 text-xs font-semibold text-n-8"
                                    initial={reduced ? { opacity: 0, display: "none" } : { opacity: 1, scale: 1 }}
                                    whileInView={reduced ? undefined : { opacity: 0, scale: 0.95 }}
                                    viewport={{ once: true, amount: 0.7 }}
                                    transition={{ delay: 0.9, duration: 0.45, ease: EASE_OUT }}
                                >
                                    <span className="px-3 py-1.5 rounded-sm bg-n-3 border border-n-5 text-n-9">
                                        Screenshot
                                    </span>
                                    <span className="text-n-6 font-mono">→</span>
                                    <span className="px-3 py-1.5 rounded-sm bg-n-3 border border-n-5 text-n-9">
                                        Manual check
                                    </span>
                                    <span className="text-n-6 font-mono">→</span>
                                    <span className="px-3 py-1.5 rounded-sm bg-n-3 border border-n-5 text-n-9">
                                        Add to group
                                    </span>
                                </motion.div>

                                {/* Target single chip */}
                                <motion.div
                                    className="absolute inset-x-5 flex items-center"
                                    initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                                    whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.7 }}
                                    transition={{ delay: 1.15, duration: 0.45, ease: EASE_OUT }}
                                >
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-purple-1 border-2 border-n-1 text-n-1 font-bold text-sm shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_rgba(255,255,255,0.25)]">
                                        <span className="flex h-2 w-2 rounded-full bg-n-1" />
                                        One link
                                    </span>
                                </motion.div>
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