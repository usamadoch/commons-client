"use client";

import { useParams, useSearchParams } from "next/navigation";

// CreatorHeader moved to layout
import Loader from "@/components/Loader";

import { Post } from "@/types";
import { usePostDetail } from "./usePostDetail";
import PostContentArea from "./PostContentArea";
import PostLoadingSkeleton from "./PostLoadingSkeleton";
import LockedContent from "./LockedContent";
import CommentsSection from "./CommentsSection";
import JoinTierModal from "@/components/modals/JoinTierModal";
import DevPlayground from "./DevPlayground";

// ─── Component ──────────────────────────────────────────────

interface PostDetailPageProps {
    initialPost?: (Post & { isLiked?: boolean }) | null;
}

const PostDetailPage = ({ initialPost }: PostDetailPageProps) => {
    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const postId = params.id as string;

    const isDevEnabled = process.env.NEXT_PUBLIC_DEV_PLAYGROUND === "true";
    const devRoutes = ["preview", "dev", "playground", "text", "single_image", "multi_image", "video", "poll", "link", "locked"];
    const isPlaygroundRoute = devRoutes.includes(postId);
    const isPlaygroundQuery = searchParams?.get("dev") === "true" || searchParams?.get("preview") === "true";

    if (isDevEnabled && (isPlaygroundRoute || isPlaygroundQuery)) {
        return <DevPlayground postId={postId} />;
    }

    const {
        post,
        comments,
        pageSlug,
        isValidId,
        isPostLoading,
        isCommentsLoading,
        locked,
        mediaItems,
        unlockedMediaItems,
        displayCaption,
        commentValue,
        setCommentValue,
        handleCommentSubmit,
        isSubmittingComment,
        handleJoin,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isJoinTierModalOpen,
        setIsJoinTierModalOpen,
        user,
    } = usePostDetail(postId, initialPost);

    const creatorPageForModal = post ? {
        _id: typeof post.pageId === "object" ? post.pageId._id : post.pageId,
        pageSlug: pageSlug || "",
        userId: post.creatorId
    } as any : null;

    return (
        <>
            {/* ── Post Content Area ─────────────────────────── */}
            {!isValidId || (!isPostLoading && !post) ? (
                <div className="p-10 text-center text-n-1 dark:text-n-8">
                    Post not found
                </div>
            ) : isPostLoading ? (
                <PostLoadingSkeleton />
            ) : (
                <>
                    {/* CreatorHeader removed from here, now in layout */}
                    <PostContentArea
                        post={post!}
                        locked={locked}
                        mediaItems={mediaItems}
                        unlockedMediaItems={unlockedMediaItems}
                        displayCaption={displayCaption}
                        onLockedClick={handleJoin}
                    />
                    {/* ── Comments / Locked Section ─────────────────── */}
                    <div className="max-w-4xl mx-auto w-full p-5 mobile:px-3 mobile:py-3">
                        {locked ? (
                            <LockedContent
                                handleJoin={handleJoin}
                                user={user}
                                isLoginModalOpen={isLoginModalOpen}
                                setIsLoginModalOpen={setIsLoginModalOpen}
                            />
                        ) : isCommentsLoading ? (
                            <div className="flex items-center justify-center py-10">
                                <Loader />
                            </div>
                        ) : (
                            <CommentsSection
                                user={user}
                                value={commentValue}
                                setValue={setCommentValue}
                                handleCommentSubmit={handleCommentSubmit}
                                isSubmittingComment={isSubmittingComment}
                                comments={comments || []}
                                allowComments={post?.allowComments ?? true}
                            />
                        )}
                    </div>
                </>
            )}

            {creatorPageForModal && (
                <JoinTierModal
                    visible={isJoinTierModalOpen}
                    onClose={() => setIsJoinTierModalOpen(false)}
                    page={creatorPageForModal}
                />
            )}

            {isDevEnabled && (
                <a
                    href="/posts/preview"
                    className="fixed bottom-4 right-4 z-50 bg-n-1 text-white border-2 border-purple-1 px-3 py-1.5 rounded-xs text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-purple-1 hover:text-n-1 transition-all cursor-pointer"
                    title="Dev Playground: View all post formats gathered in one place"
                >
                    <span>🧪</span>
                    <span>Dev: All Formats</span>
                </a>
            )}
        </>
    );
};

export default PostDetailPage;
