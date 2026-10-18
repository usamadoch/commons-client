// Utilities for triggering the global top navigation progress bar programmatically.

export const NAVIGATION_START_EVENT = "commons:navigation-start";
export const NAVIGATION_STOP_EVENT = "commons:navigation-stop";

/**
 * Triggers the top navigation progress bar manually (e.g. before programmatic router.push).
 */
export function startNavigationProgress(): void {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT));
    }
}

/**
 * Manually completes or cancels the top navigation progress bar.
 */
export function stopNavigationProgress(): void {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(NAVIGATION_STOP_EVENT));
    }
}
