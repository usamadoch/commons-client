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


const PostDetail = () => {
    return (
        <>
            <CreatorHeader />
            <PostDetailPage />
        </>
    );
};

export default PostDetail;
