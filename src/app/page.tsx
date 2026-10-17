




import Layout from "@/layout";
import { RootHomePage } from "./_template/RootHomePage";
import { pageService } from "@/services/page.service";
import { postService } from "@/services/post.service";
import { CreatorPage, Post } from "@/types";

export const revalidate = 60; // 1-minute ISR for public landing feed

export default async function Home() {
    let initialPage: CreatorPage | null = null;
    let initialPosts: Post[] = [];

    try {
        const [pageData, postsData] = await Promise.all([
            pageService.getBySlug("commons", {
                next: { revalidate: 60, tags: ['public-feed-page'] },
            }),
            postService.getCreatorPosts(
                { pageSlug: "commons", limit: 10, type: ['text', 'image', 'video'] },
                { next: { revalidate: 60, tags: ['public-feed-posts'] } }
            ),
        ]);
        initialPage = pageData?.page || null;
        initialPosts = postsData?.posts || [];
    } catch (e) {
        console.error('[Home] Failed to prefetch public landing feed:', e);
    }

    return (
        <Layout requireAuth={false}>
            <RootHomePage initialPage={initialPage} initialPosts={initialPosts} />
        </Layout>
    );
}
