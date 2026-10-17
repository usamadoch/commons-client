import PostDetailPage from "./_template/PostDetailPage/PostDetailPage";
import CreatorHeader from "@/layout/CreatorHeader";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params;
    return {
        title: `Post details`,
        description: `Read exclusive post details on commons.`,
    };
}


import { postService } from "@/services/post.service";
import { getInitialPageData } from "@/lib/ssr-helpers";

const PostDetail = async ({ params }: Props) => {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    let initialPageData = null;
    let initialPost = null;
    let pageSlug = "";

    const devRoutes = ["preview", "dev", "playground", "text", "single_image", "multi_image", "video", "poll", "link", "locked"];
    const isDevPreviewId = devRoutes.includes(id);
    const isDevEnabled = process.env.NEXT_PUBLIC_DEV_PLAYGROUND === "true";

    if (!isDevPreviewId || !isDevEnabled) {
        try {
            const data = await postService.getById(id, {
                next: { revalidate: 60, tags: [`post-${id}`] }
            });
            if (data?.post) {
                initialPost = { ...data.post, isLiked: data.isLiked };
                pageSlug = (data.post.pageId as any)?.pageSlug || "";
                initialPageData = await getInitialPageData(pageSlug);
            }
        } catch (e) {
            console.error("Error fetching data for post detail:", e);
        }
    }

    return (
        <>
            <CreatorHeader pageSlug={pageSlug || undefined} initialPageData={initialPageData} />
            <PostDetailPage initialPost={initialPost} />
        </>
    );
};

export default PostDetail;
