





import CreatorPage from "./_template";
import { postService } from "@/services/post.service";

type Props = {
    params: Promise<{
        "page-slug": string;
    }>;
};

export default async function Creator({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams["page-slug"];

    let initialPosts: any[] = [];
    try {
        const data = await postService.getCreatorPosts(
            { pageSlug: slug, limit: 20, type: ['text', 'image', 'video'] },
            { next: { revalidate: 60, tags: [`creator-posts-${slug.toLowerCase()}`] } }
        );
        initialPosts = data?.posts || [];
    } catch (e) {
        console.error(`[CreatorPage] Error prefetching posts for ${slug}:`, e);
    }

    return <CreatorPage initialPosts={initialPosts} />;
}


