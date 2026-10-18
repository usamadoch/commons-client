"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { NAVIGATION_START_EVENT, NAVIGATION_STOP_EVENT } from "@/lib/navigation-progress";

const SHOW_DELAY_MS = 120; // Navigations faster than 120ms won't flash the bar
const TRICKLE_INTERVAL_MS = 250;
const MAX_PROGRESS = 88;
const SAFETY_TIMEOUT_MS = 8000;

function ProgressBarInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const [opacity, setOpacity] = useState(1);

    const statusRef = useRef<"idle" | "starting" | "active" | "completing">("idle");
    const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const trickleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const completionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const initialRenderRef = useRef(true);

    const clearTimers = useCallback(() => {
        if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
        if (trickleTimerRef.current) clearInterval(trickleTimerRef.current);
        if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
        delayTimerRef.current = null;
        trickleTimerRef.current = null;
        completionTimerRef.current = null;
        fadeTimerRef.current = null;
        safetyTimerRef.current = null;
    }, []);

    const complete = useCallback(() => {
        if (statusRef.current === "idle") return;

        const wasVisible = visible || statusRef.current === "active";
        clearTimers();

        if (!wasVisible) {
            // Completed quickly before delay fired: do not flash
            statusRef.current = "idle";
            setVisible(false);
            setProgress(0);
            setOpacity(1);
            return;
        }

        statusRef.current = "completing";
        setProgress(100);
        setOpacity(1);

        // Allow bar to animate smoothly to 100%, then fade out
        completionTimerRef.current = setTimeout(() => {
            setOpacity(0);
            fadeTimerRef.current = setTimeout(() => {
                statusRef.current = "idle";
                setVisible(false);
                setProgress(0);
                setOpacity(1);
            }, 200);
        }, 180);
    }, [clearTimers, visible]);

    const start = useCallback(() => {
        clearTimers();
        statusRef.current = "starting";
        setOpacity(1);
        setProgress(24);

        // Delay making the bar visible to prevent flashing on fast navigations
        delayTimerRef.current = setTimeout(() => {
            if (statusRef.current === "starting") {
                statusRef.current = "active";
                setVisible(true);
            }
        }, SHOW_DELAY_MS);

        // Incremental trickle animation
        trickleTimerRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= MAX_PROGRESS) return prev;
                // Diminishing trickle curve
                const remaining = MAX_PROGRESS - prev;
                const increment = Math.max(1, Math.floor(remaining * 0.18));
                return Math.min(MAX_PROGRESS, prev + increment);
            });
        }, TRICKLE_INTERVAL_MS);

        // Safety timeout to avoid permanent hanging if navigation is aborted
        safetyTimerRef.current = setTimeout(() => {
            complete();
        }, SAFETY_TIMEOUT_MS);
    }, [clearTimers, complete]);

    // Handle navigation completion when route or query changes
    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            return;
        }
        complete();
    }, [pathname, searchParams, complete]);

    // Global listener for internal navigation clicks, popstate, and programmatic events
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.button !== 0) return; // Only primary clicks
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // Ignore modified clicks

            const target = e.target as HTMLElement | null;
            const anchor = target?.closest("a");
            if (!anchor) return;

            // Ignore if default already prevented (e.g. login modal or cancelled handler)
            if (e.defaultPrevented) return;

            const linkTarget = anchor.getAttribute("target");
            if (linkTarget && linkTarget !== "_self") return;

            if (anchor.hasAttribute("download")) return;

            const href = anchor.getAttribute("href");
            if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

            try {
                const destination = new URL(anchor.href, window.location.href);

                // Ignore external destinations
                if (destination.origin !== window.location.origin) return;

                // Ignore same-page hash or exact same URL clicks
                const isSameUrl =
                    destination.pathname === window.location.pathname &&
                    destination.search === window.location.search;
                if (isSameUrl) return;

                start();
            } catch {
                // Ignore invalid URLs
            }
        };

        const handlePopState = () => {
            start();
        };

        const handleCustomStart = () => {
            start();
        };

        const handleCustomStop = () => {
            complete();
        };

        // Wrap history.pushState and history.replaceState so programmatic router.push automatically triggers the progress bar
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function (...args) {
            const url = args[2];
            if (url && typeof url === "string" && !url.startsWith("#")) {
                try {
                    const destination = new URL(url, window.location.href);
                    if (
                        destination.origin === window.location.origin &&
                        (destination.pathname !== window.location.pathname || destination.search !== window.location.search)
                    ) {
                        start();
                    }
                } catch {
                    // Ignore URL parsing errors
                }
            }
            return originalPushState.apply(this, args);
        };

        history.replaceState = function (...args) {
            const url = args[2];
            if (url && typeof url === "string" && !url.startsWith("#")) {
                try {
                    const destination = new URL(url, window.location.href);
                    if (
                        destination.origin === window.location.origin &&
                        (destination.pathname !== window.location.pathname || destination.search !== window.location.search)
                    ) {
                        start();
                    }
                } catch {
                    // Ignore URL parsing errors
                }
            }
            return originalReplaceState.apply(this, args);
        };

        document.addEventListener("click", handleClick, { capture: true });
        window.addEventListener("popstate", handlePopState);
        window.addEventListener(NAVIGATION_START_EVENT, handleCustomStart);
        window.addEventListener(NAVIGATION_STOP_EVENT, handleCustomStop);

        return () => {
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
            document.removeEventListener("click", handleClick, { capture: true });
            window.removeEventListener("popstate", handlePopState);
            window.removeEventListener(NAVIGATION_START_EVENT, handleCustomStart);
            window.removeEventListener(NAVIGATION_STOP_EVENT, handleCustomStop);
            clearTimers();
        };
    }, [start, complete, clearTimers]);

    if (!visible && statusRef.current !== "completing") {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none select-none"
        >
            <div
                className="h-[2.5px] bg-purple-1 transition-all ease-out"
                style={{
                    width: `${progress}%`,
                    opacity: opacity,
                    boxShadow: "0 0 10px #AE7AFF, 0 0 4px #AE7AFF",
                    transitionDuration: progress === 100 ? "180ms" : "250ms",
                }}
            />
        </div>
    );
}

export default function NavigationProgressBar() {
    return (
        <Suspense fallback={null}>
            <ProgressBarInner />
        </Suspense>
    );
}
