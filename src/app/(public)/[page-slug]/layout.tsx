import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageService } from "@/services/page.service";
import CreatorLayoutWrapper from "./_components/CreatorLayoutWrapper";

export const revalidate = 60; // ISR for creator profiles

type Props = {
    params: Promise<{
        "page-slug": string;
    }>;
    children: ReactNode;
};

export async function generateStaticParams() {
    try {
        const data = await pageService.getAll();
        return (data?.pages || []).slice(0, 100).map((page) => ({
            "page-slug": page.pageSlug,
        }));
    } catch (error) {
        console.error("Failed to fetch creators for generateStaticParams:", error);
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams["page-slug"];

    let name = slug.charAt(0).toUpperCase() + slug.slice(1);
    try {
        const data = await pageService.getBySlug(slug, {
            next: { revalidate: 60, tags: [`creator-${slug.toLowerCase()}`] }
        });
        if (data?.page?.displayName) {
            name = data.page.displayName;
        }
    } catch (error) {
        console.error("[generateMetadata] API error for slug:", slug, error);
    }

    name = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    const seoString = `Welcome to the exclusive posts, join private communities, and connect directly with ${name} on Commons.`;

    return {
        description: seoString,
    };
}

export default async function CreatorLayout({ params, children }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams["page-slug"];

    let initialData = null;
    try {
        // Fetch the public initial page data on the server without cookies
        // Auth-specific state will be verified client-side
        initialData = await pageService.getBySlug(slug, {
            next: { revalidate: 60, tags: [`creator-${slug.toLowerCase()}`] }
        });
    } catch {
        notFound();
    }

    return (
        <CreatorLayoutWrapper initialPageData={initialData}>
            {children}
        </CreatorLayoutWrapper>
    );
}

