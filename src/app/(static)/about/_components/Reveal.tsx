"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { DURATION, EASE_OUT, STAGGER, VIEWPORT } from "./motion";

const tags = {
    div: motion.div,
    p: motion.p,
    li: motion.li,
    ul: motion.ul,
    ol: motion.ol,
    span: motion.span,
    h2: motion.h2,
} as const;

type Tag = keyof typeof tags;

type RevealProps = {
    children: ReactNode;
    as?: Tag;
    className?: string;
    delay?: number;
    /** Animate on mount instead of on scroll-in (hero). */
    onMount?: boolean;
    amount?: number;
    id?: string;
};

/** Fade-up reveal: opacity + translateY(16px). Reduced motion => 150ms opacity only. */
export const Reveal = ({ children, as = "div", className, delay = 0, onMount = false, amount, id }: RevealProps) => {
    const reduced = useReducedMotion();
    const Comp = tags[as];
    const hidden = reduced ? { opacity: 0 } : { opacity: 0, y: 16 };
    const shown = { opacity: 1, y: 0 };
    const transition = reduced
        ? { duration: DURATION.reduced }
        : { duration: DURATION.fade, ease: EASE_OUT, delay };

    return (
        <Comp
            id={id}
            className={className}
            initial={hidden}
            {...(onMount
                ? { animate: shown }
                : { whileInView: shown, viewport: { ...VIEWPORT, ...(amount ? { amount } : {}) } })}
            transition={transition}
        >
            {children}
        </Comp>
    );
};

/** Parent that staggers its RevealItem children as it enters the viewport. */
export const RevealStagger = ({
    children,
    as = "div",
    className,
    stagger = STAGGER,
    amount,
}: {
    children: ReactNode;
    as?: Tag;
    className?: string;
    stagger?: number;
    amount?: number;
}) => {
    const reduced = useReducedMotion();
    const Comp = tags[as];
    const variants: Variants = {
        hidden: {},
        shown: { transition: { staggerChildren: reduced ? 0 : stagger } },
    };
    return (
        <Comp
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="shown"
            viewport={{ ...VIEWPORT, ...(amount ? { amount } : {}) }}
        >
            {children}
        </Comp>
    );
};

export const RevealItem = ({ children, as = "div", className }: { children: ReactNode; as?: Tag; className?: string }) => {
    const reduced = useReducedMotion();
    const Comp = tags[as];
    const variants: Variants = reduced
        ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: DURATION.reduced } } }
        : {
            hidden: { opacity: 0, y: 16 },
            shown: { opacity: 1, y: 0, transition: { duration: DURATION.fade, ease: EASE_OUT } },
        };
    return (
        <Comp className={className} variants={variants}>
            {children}
        </Comp>
    );
};

/**
 * Line-by-line masked reveal for headings. Each line sits in an overflow-hidden
 * mask and slides up from 100%. Lines break on desktop (>767px) and wrap
 * naturally on mobile.
 */
export const MaskLines = ({
    lines,
    onMount = false,
    delay = 0,
}: {
    lines: ReactNode[];
    onMount?: boolean;
    delay?: number;
}) => {
    const reduced = useReducedMotion();
    const variants: Variants = reduced
        ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: DURATION.reduced } } }
        : {
            hidden: { y: "105%" },
            shown: (i: number) => ({
                y: "0%",
                transition: { duration: DURATION.reveal, ease: EASE_OUT, delay: delay + i * 0.08 },
            }),
        };

    return (
        <>
            {lines.map((line, i) => (
                <span key={i}>
                    {/* pb/-mb keeps descenders inside the mask with tight leading */}
                    <span className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]">
                        <motion.span
                            className="inline-block"
                            custom={i}
                            variants={variants}
                            initial="hidden"
                            {...(onMount ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT })}
                        >
                            {line}
                        </motion.span>
                    </span>
                    {i < lines.length - 1 && (
                        <>
                            <br className="md:hidden" />
                            <span className="hidden md:inline"> </span>
                        </>
                    )}
                </span>
            ))}
        </>
    );
};

/** Words rise in from a mask, staggered. Text stays real text for assistive tech. */
export const WordsRise = ({ text, className = "" }: { text: string; className?: string }) => {
    const reduced = useReducedMotion();
    const words = text.split(" ");
    const variants: Variants = reduced
        ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: DURATION.reduced } } }
        : {
            hidden: { y: "105%" },
            shown: (i: number) => ({
                y: "0%",
                transition: { duration: 0.8, ease: EASE_OUT, delay: i * STAGGER },
            }),
        };

    return (
        <motion.span className={className} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
            {words.map((w, i) => (
                <span key={i}>
                    <span className="inline-block overflow-hidden align-top pb-[0.1em] -mb-[0.1em]">
                        <motion.span className="inline-block" custom={i} variants={variants}>
                            {w}
                        </motion.span>
                    </span>
                    {i < words.length - 1 ? " " : null}
                </span>
            ))}
        </motion.span>
    );
};
