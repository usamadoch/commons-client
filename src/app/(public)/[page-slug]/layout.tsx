import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { pageService } from "@/services/page.service";
import CreatorLayoutWrapper from "./_components/CreatorLayoutWrapper";

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
        const data = await pageService.getBySlug(slug, { cache: 'no-store' });
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
        const cookieStore = await cookies();
        const cookieString = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

        // Fetch the initial page data on the server to prevent the client-side loader
        initialData = await pageService.getBySlug(slug, { 
            cache: 'no-store',
            headers: {
                Cookie: cookieString
            }
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

