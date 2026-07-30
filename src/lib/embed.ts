/**
 * Embeddable URL utilities.
 *
 * Only whitelisted domains are rendered as rich embed cards (thumbnail + metadata).
 * All other URLs render as a generic link card (domain only, no raw URL exposed).
 */

const EMBEDDABLE_PATTERNS: RegExp[] = [
    /^https?:\/\/(www\.)?(m\.)?youtube\.com\//,
    /^https?:\/\/youtu\.be\//,
];

export function isEmbeddableUrl(url: string): boolean {
    return EMBEDDABLE_PATTERNS.some((pattern) => pattern.test(url));
}

/**
 * Extracts the YouTube video ID from a YouTube URL.
 * Returns empty string if the URL is not a recognised YouTube format.
 */
export function extractYouTubeVideoId(url: string): string {
    if (url.includes("youtube.com/watch?v=")) {
        return url.split("watch?v=")[1]?.split("&")[0] || "";
    }
    if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1]?.split("?")[0] || "";
    }
    if (url.includes("youtube.com/embed/")) {
        return url.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    }
    return "";
}

/**
 * Returns the YouTube thumbnail URL for a given video ID.
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Builds a YouTube embed URL (for iframe use in the creation preview only).
 */
export function toYouTubeEmbedUrl(url: string): string {
    let embedUrl = url;

    if (url.includes("youtube.com/watch?v=")) {
        embedUrl = url.replace("watch?v=", "embed/");
        const ampersandIndex = embedUrl.indexOf("&");
        if (ampersandIndex !== -1) {
            embedUrl = embedUrl.substring(0, ampersandIndex);
        }
    } else if (url.includes("youtu.be/")) {
        embedUrl = url.replace("youtu.be/", "youtube.com/embed/");
    }

    return embedUrl;
}

/**
 * Extracts a human-readable domain label from a URL.
 * Used to display non-embeddable links without exposing the full URL.
 */
export function getDomainLabel(url: string): string {
    try {
        const hostname = new URL(url).hostname.replace(/^www\./, "");
        return hostname;
    } catch {
        return "External Link";
    }
}
