/**
 * Shared motion + typography config for the /about page.
 * Keep every animated piece of the page pointed at these values so timing and
 * type stay consistent. Breakpoints follow the project's desktop-first
 * Tailwind screens (`lg:` = max-width 1023px, `md:` = max-width 767px, `sm:` = max-width 480px).
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
    reveal: 0.7,
    fade: 0.6,
    reduced: 0.15,
} as const;

export const STAGGER = 0.07;

export const VIEWPORT = { once: true, amount: 0.3 } as const;

/** Typography scale for the about page (Roboto Flex, single family). */
export const type = {
    h1: "font-extrabold text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.03em] text-balance text-n-9",
    h2: "font-extrabold text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-balance text-n-9",
    h3: "font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.01em] text-balance text-n-9",
    body: "text-xl md:text-lg leading-[1.6] text-n-8 max-w-[62ch] text-pretty",
    eyebrow: "text-[0.8125rem] font-semibold uppercase tracking-[0.12em]",
} as const;

/** Shared section shell spacing (8px rhythm). */
export const sectionPad = "py-32 md:py-24";
export const container = "w-full max-w-[90rem] mx-auto px-16 2xl:px-10 lg:px-8 md:px-5";
