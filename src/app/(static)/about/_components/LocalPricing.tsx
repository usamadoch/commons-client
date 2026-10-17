"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./motion";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

const internationalRows = [
    "Exchange rates & foreign fees",
    "Hidden 20–30% platform cuts",
    "Inflation gap & dollar volatility",
    "Card not supported at checkout",
];

const commonsRows = [
    "Simple way: flat 9% cut, keep 91%",
    "Direct PKR payouts to your bank or wallet",
    "JazzCash, Easypaisa, local cards",
    "No dollar sign, zero foreign exchange fees",
];

const LocalPricing = () => {
    const reduced = useReducedMotion();

    return (
        <section aria-labelledby="pricing-heading" className="w-full py-32 md:py-20 border-b border-n-6 bg-n-2/30">
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3">
                {/* Section Header */}
                <div className="max-w-3xl mb-12">
                    <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-purple-1 mb-4 block">
                        Native Experience
                    </span>
                    <h2
                        id="pricing-heading"
                        className="font-extrabold text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-balance text-n-9 mb-6"
                    >
                        Built for Pakistan, not translated for it.
                    </h2>

                    {/* Merged copy paragraphs */}
                    <div className="space-y-4 text-xl md:text-lg text-n-8 leading-[1.6] max-w-[62ch] text-pretty">
                        <p>
                            Supporting you on an international platform means paying for exchange rates, hidden bank fees, and the inflation gap. A small gesture in dollars becomes a heavy burden in rupees. Commons runs natively in PKR, giving your audience the exact same premium experience at a price that actually respects their wallet.
                        </p>
                        <p>
                            Every payment runs through JazzCash, Easypaisa, or a local card. Your audience never sees a dollar sign, never wonders about the exchange rate, never gets stopped at checkout because their card isn't supported.
                        </p>
                        <p className="font-semibold text-n-9">
                            A simple way to build: we take a flat 9% cut. No upfront costs, no monthly platform subscriptions, and no surprise deductions — you keep 91% of what you earn, deposited directly in rupees.
                        </p>
                    </div>
                </div>

                {/* Two-column Comparison Grid */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-6 mt-12 max-w-5xl">
                    {/* Left Card: On International Platforms */}
                    <div className="flex flex-col h-full p-8 md:p-6 rounded-xl border-2 border-n-5/60 bg-n-1/80 opacity-90 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.15)]">
                        <div className="flex items-center justify-between pb-6 mb-6 border-b border-n-5/40">
                            <h3 className="text-xl font-bold text-n-8 tracking-tight">
                                On international platforms
                            </h3>
                            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-xs bg-n-3 text-n-8">
                                Foreign barrier
                            </span>
                        </div>

                        <RevealStagger className="space-y-4 flex-1">
                            {internationalRows.map((row, index) => (
                                <RevealItem
                                    key={index}
                                    className="flex items-center gap-3.5 text-base md:text-sm text-n-8/80"
                                >
                                    {/* Muted cross icon */}
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs bg-n-3 border border-n-5/50 text-pink-1">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                            <motion.path
                                                d="M18 6L6 18M6 6l12 12"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true, amount: 0.5 }}
                                                transition={{ duration: 0.45, delay: 0.1 + index * 0.08, ease: EASE_OUT }}
                                            />
                                        </svg>
                                    </div>
                                    <span className="line-through decoration-n-5 font-medium">{row}</span>
                                </RevealItem>
                            ))}
                        </RevealStagger>
                    </div>

                    {/* Right Card: On Commons */}
                    <div className="flex flex-col h-full p-8 md:p-6 rounded-xl border-2 border-purple-1 bg-n-2 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_rgba(174,122,255,0.3)] relative">
                        <div className="flex items-center justify-between pb-6 mb-6 border-b border-n-6">
                            <h3 className="text-xl font-extrabold text-n-9 tracking-tight">
                                On Commons
                            </h3>
                            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-xs bg-purple-1 text-n-1 shadow-[2px_2px_0_#000]">
                                PKR Native
                            </span>
                        </div>

                        <RevealStagger className="space-y-4 flex-1">
                            {commonsRows.map((row, index) => (
                                <RevealItem
                                    key={index}
                                    className="flex items-center gap-3.5 text-base md:text-sm text-n-9 font-semibold"
                                >
                                    {/* Accent check icon with drawing stroke */}
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs bg-green-1 border border-n-1 text-n-1 shadow-[1.5px_1.5px_0_#000]">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                            <motion.path
                                                d="M20 6L9 17l-5-5"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true, amount: 0.5 }}
                                                transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: EASE_OUT }}
                                            />
                                        </svg>
                                    </div>
                                    <span>{row}</span>
                                </RevealItem>
                            ))}
                        </RevealStagger>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocalPricing;