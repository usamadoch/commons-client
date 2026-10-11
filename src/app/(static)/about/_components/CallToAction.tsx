"use client";

import CtaButton from "./CtaButton";
import { Reveal } from "./Reveal";
import styles from "./about.module.css";

const CallToAction = () => {
    return (
        <section className="relative w-full py-40 md:py-28 text-center overflow-hidden border-t border-n-6 bg-n-1">
            {/* Subtle dot grid pattern (5% opacity) */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 text-white opacity-[0.05] ${styles.dotGrid}`}
            />

            <div className="relative z-10 mx-auto w-full max-w-4xl px-6 flex flex-col items-center">
                <Reveal as="div">
                    <h2 className="font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.03em] text-balance text-n-9 mb-6">
                        Give them a way
                        <br className="md:hidden" /> to{" "}
                        <span className="text-purple-1">show up.</span>
                    </h2>
                </Reveal>

                <Reveal as="p" delay={0.15} className="text-2xl md:text-lg text-n-8 leading-relaxed max-w-xl mx-auto mb-12">
                    Stop making your audience work around the platform to support you. A simple way to earn with a flat 9% cut and direct rupee payouts.
                </Reveal>

                <Reveal delay={0.25}>
                    <CtaButton
                        href="/register"
                        variant="primary"
                    >
                        Start your page now
                    </CtaButton>
                </Reveal>
            </div>
        </section>
    );
};

export default CallToAction;