"use client";

import { RefObject, useEffect, useState } from "react";

/** True only for a precise pointer that can hover (mouse/trackpad). False on touch. */
export function useFinePointer() {
    const [fine, setFine] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setFine(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return fine;
}

/**
 * True while the element is on screen AND the tab is visible.
 * Used to pause looping decorative animations (marquee, floating chips).
 */
export function useActiveWhenVisible<T extends Element>(ref: RefObject<T | null>) {
    const [onScreen, setOnScreen] = useState(false);
    const [tabVisible, setTabVisible] = useState(true);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
            rootMargin: "100px 0px",
        });
        io.observe(el);
        return () => io.disconnect();
    }, [ref]);

    useEffect(() => {
        const update = () => setTabVisible(document.visibilityState === "visible");
        update();
        document.addEventListener("visibilitychange", update);
        return () => document.removeEventListener("visibilitychange", update);
    }, []);

    return onScreen && tabVisible;
}

/** Smooth-scroll to an in-page target, respecting reduced motion, and move focus there. */
export function scrollToId(id: string, reduced: boolean | null) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
