"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./motion";
import { WordsRise, Reveal } from "./Reveal";

const PlatformFreedom = () => {
    const reduced = useReducedMotion();

    return (
        <section
            aria-labelledby="moderation-heading"
            className="relative w-full py-36 md:py-24 bg-black border-y-2 border-n-6 text-white overflow-hidden"
        >
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5">
                <div className="max-w-5xl">
                    {/* Eyebrow */}
                    <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-purple-1 mb-6 block">
                        Your platform, your rules
                    </span>

                    {/* Huge H2 with words rising in */}
                    <h2
                        id="moderation-heading"
                        className="font-extrabold text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.03em] text-balance text-white mb-8"
                    >
                        <WordsRise text="No foreign moderation." />
                    </h2>

                    {/* Accent line drawing left to right */}
                    <motion.div
                        aria-hidden="true"
                        className="w-full max-w-xl h-[3px] bg-purple-1 origin-left mb-12"
                        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                    />
                </div>

                {/* Body paragraph offset right on desktop */}
                <div className="flex justify-end mt-4">
                    <Reveal
                        as="p"
                        className="text-xl md:text-lg text-n-8 leading-[1.65] max-w-[56ch] text-pretty"
                    >
                        We all know how public platforms police content. But if you think a foreign paywall protects you—believe me, they ban people there, too. One misunderstood conversation, and your entire income stream is gone. On Commons, there are no foreign moderation algorithms dictating what you can say. Your stage, your rules.
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default PlatformFreedom;