import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageService } from "@/services/page.service";

type Props = {
    params: Promise<{
        "page-slug": string;
    }>;
    children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams["page-slug"];

    let name = slug.charAt(0).toUpperCase() + slug.slice(1);
    try {
        const data = await pageService.getBySlug(slug);
        if (data?.page?.displayName) {
            name = data.page.displayName;
        }
    } catch (error) {
        console.error("[generateMetadata] API error for slug:", slug, error);
        // Fallback to capitalized slug if api is unavailable
    }

    // Capitalize name (Title Case)
    name = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    const seoString = `Welcome to the exclusive posts, join private communities, and connect directly with ${name} on Commons.`;

    return {
        description: seoString,
    };
}

export default async function CreatorLayout({ params, children }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams["page-slug"];

    try {
        // Validate that the page exists on the server before rendering.
        // This fetch is deduplicated by Next.js with the identical call in generateMetadata.
        await pageService.getBySlug(slug);
    } catch {
        // Page doesn't exist (NOT_FOUND, NOT_PUBLISHED, or any API error) → 404
        notFound();
    }

    return <>{children}</>;
}
