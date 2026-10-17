import { pageService } from "@/services/page.service";

/**
 * Helper to fetch initial page data for SSR to prevent client-side skeleton loading.
 * @param slug The page slug to fetch data for.
 * @returns The initial page data or null if it fails or slug is missing.
 */
export async function getInitialPageData(slug?: string | null) {
    if (!slug) return null;
    try {
        return await pageService.getBySlug(slug, {
            next: { revalidate: 60, tags: [`creator-${slug.toLowerCase()}`] },
        });
    } catch (error) {
        console.error(`[getInitialPageData] Error fetching data for slug ${slug}:`, error);
        return null;
    }
}
