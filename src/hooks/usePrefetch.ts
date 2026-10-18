"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

const PREFETCH_CACHE_TTL_MS = 30000; // 30 seconds matching Next.js dynamic cache lifetime

/**
 * Hook for smart, deduplicated route prefetching on hover or focus.
 * Uses a 30-second TTL cache so re-visits after cache expiration re-prefetch fresh data.
 */
export function usePrefetch() {
    const router = useRouter();
    const prefetchedUrls = useRef<Map<string, number>>(new Map());

    const prefetch = useCallback((url?: string | null) => {
        if (!url) return;

        // Skip non-internal or hash-only destinations
        if (
            url.startsWith("#") ||
            url.startsWith("http:") ||
            url.startsWith("https:") ||
            url.startsWith("mailto:") ||
            url.startsWith("tel:") ||
            url.startsWith("javascript:")
        ) {
            return;
        }

        const now = Date.now();
        const lastPrefetch = prefetchedUrls.current.get(url);

        // Deduplicate prefetch calls within the 30-second window
        if (lastPrefetch && now - lastPrefetch < PREFETCH_CACHE_TTL_MS) {
            return;
        }

        prefetchedUrls.current.set(url, now);

        try {
            router.prefetch(url);
        } catch {
            // Silently ignore prefetch errors (e.g. offline or aborted)
        }
    }, [router]);

    const getPrefetchProps = useCallback((url?: string | null) => {
        if (!url) return {};
        return {
            onPointerEnter: () => prefetch(url),
            onFocus: () => prefetch(url),
        };
    }, [prefetch]);

    return {
        prefetch,
        getPrefetchProps,
    };
}
