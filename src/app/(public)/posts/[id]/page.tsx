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
    let pageSlug = "";

    try {
        const { post } = await postService.getById(id);
        pageSlug = (post?.pageId as any)?.pageSlug || "";
        initialPageData = await getInitialPageData(pageSlug);
    } catch (e) {
        console.error("Error fetching data for post detail:", e);
    }

    return (
        <>
            <CreatorHeader pageSlug={pageSlug || undefined} initialPageData={initialPageData} />
            <PostDetailPage />
        </>
    );
};

export default PostDetail;
