import { useState } from "react";
import Link from "next/link";
import { formatAppDate } from "@/lib/date";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { usePostComments } from "@/hooks/queries";
import Modal from "@/components/Modal";
import Image from "@/components/Image";
import { Icon } from "@/components/ui/icon";
import { LockKeyhole } from "@/lib/icons";
import Comment from "@/components/Comment";
import { postService as postApi } from "@/services/post.service";
import { Post, isLockedMedia, CreatorPage } from "@/types";
import Actions from "@/components/PostCard/Actions";
import Loader from "../Loader";
import CommentItem from "@/components/CommentItem";
import ReadMore from "@/components/ReadMore";
import ActionMenu from "@/components/ActionMenu";
import { getCreatorInfo } from "@/lib/post-mapper";
import { useAuth } from "@/store/auth";
import LoginModal from "@/components/modals/LoginModal";
import PostCardPoll from "@/components/PostCard/Poll";
import PostCardLinkPreview from "@/components/PostCard/LinkPreview";
import Images from "@/components/PostCard/Images";

type PostModalProps = {
    visible: boolean;
    onClose: () => void;
    post: Post | null;
    page?: CreatorPage;
};

const PostModal = ({ visible, onClose, post, page }: PostModalProps) => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();
    const { data: commentsData, isLoading: loadingComments } = usePostComments(post?._id || "");
    const comments = commentsData || [];

    const [commentValue, setCommentValue] = useState("");
    const [sendingComment, setSendingComment] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const shareItems = post ? [
        {
            label: "Copy link",
            icon: "copy",
            viewBox: "0 0 24 24",
            onClick: () => {
                const shareUrl = `/posts/${post._id}`;
                const fullUrl = `${window.location.origin}${shareUrl}`;
                navigator.clipboard.writeText(fullUrl);
                toast.success("Post link copied to clipboard");
            },
        }
    ] : [];

    const handleSendComment = async () => {
        if (!post || !commentValue.trim()) return;

        if (!isAuthenticated) {
            toast.error("Please log in to leave a comment");
            setShowLoginModal(true);
            return;
        }

        setSendingComment(true);
        try {
            await postApi.addComment(post._id, { content: commentValue });
            // Invalidate query to refetch comments
            queryClient.invalidateQueries({ queryKey: ['post-comments', post._id] });
            setCommentValue("");
        } catch (error: unknown) {
            console.error("Failed to post comment", error);
            const errRes = error && typeof error === "object" && "response" in error ? (error as { response?: { data?: { message?: string } } }).response?.data?.message : null;
            toast.error(errRes || "Failed to post comment. Please try again.");
        } finally {
            setSendingComment(false);
        }
    };

    if (!post) return null;

    // Helper to extract media
    const attachments = post.mediaAttachments || [];
    const imageList = post.isLocked
        ? attachments.filter(m => m.thumbnailUrl).map(m => m.thumbnailUrl!).filter((url): url is string => !!url)
        : attachments.filter(m => !isLockedMedia(m) && m.url).map(m => m.url).filter((url): url is string => !!url);

    const hasImages = post.postType === 'image' && (imageList.length > 0 || post.isLocked);
    const hasVideo = post.postType === 'video' && (attachments.length > 0 || post.isLocked);
    const hasPoll = !!post.poll;
    const postWithLink = post as { linkPreview?: unknown };
    const hasLink = !!(post.linkUrl || postWithLink.linkPreview);

    const showMediaSection = hasImages || hasVideo || hasPoll || hasLink;

    // Use centralized creator info logic
    const creator = getCreatorInfo(post, page);

    const videoAttachment = attachments.find(m => m.type === 'video') || attachments[0];

    return (
        <>
            <Modal
                visible={visible}
                onClose={onClose}
                showCloseIcon={false}
                classWrap={`${showMediaSection ? "max-w-[80rem]" : "max-w-[40rem]"} bg-n-1 dark:bg-n-1 w-full flex flex-row !p-0 h-[80vh] overflow-hidden md:flex-col md:h-auto md:max-h-[90vh]`}
            >
                {/* Left Section: Media / Interactive Attachments */}
                {showMediaSection && (
                    <div className="w-3/5 bg-n-1 flex items-center justify-center relative overflow-hidden md:w-full md:min-h-80 md:max-h-96">
                        {post.isLocked ? (
                            <div className="text-center p-8 flex flex-col items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-n-2 border border-n-1 dark:border-n-6 shadow-primary-4 flex items-center justify-center mb-3">
                                    <Icon icon={LockKeyhole} className="w-6 h-6 text-purple-1 fill-current" />
                                </div>
                                <div className="text-h6 font-extrabold text-white mb-1">Members Only Post</div>
                                <div className="text-xs font-semibold text-white/80 mb-3 max-w-[18rem]">
                                    Join {creator.displayName}&apos;s community to unlock this content
                                </div>
                                <Link
                                    href={creator.pageSlug ? `/${creator.pageSlug}` : `/posts/${post._id}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClose();
                                    }}
                                    className="btn-purple btn-medium rounded-xs shadow-primary-4 font-bold text-xs text-n-1 px-6 cursor-pointer"
                                >
                                    Join to unlock
                                </Link>
                            </div>
                        ) : hasImages ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Images
                                    items={imageList}
                                    slot="modal"
                                    className="w-full h-full relative"
                                />
                            </div>
                        ) : hasVideo ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-black">
                                {videoAttachment?.url ? (
                                    <video
                                        src={videoAttachment.url}
                                        controls
                                        className="w-full h-full max-h-full object-contain"
                                        poster={videoAttachment.thumbnailUrl}
                                    />
                                ) : videoAttachment?.thumbnailUrl ? (
                                    <img
                                        src={videoAttachment.thumbnailUrl}
                                        alt="Video thumbnail"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="text-white font-bold">Video Player</div>
                                )}
                            </div>
                        ) : hasPoll ? (
                            <div className="w-full p-8 max-w-lg mx-auto overflow-y-auto">
                                <PostCardPoll
                                    postId={post._id}
                                    initialPoll={post.poll!}
                                    initialVotedOptions={post.userVotedOptions || []}
                                    isLocked={post.isLocked}
                                    shareUrl={`/posts/${post._id}`}
                                />
                            </div>
                        ) : hasLink ? (
                            <div className="w-full p-8 max-w-lg mx-auto">
                                <PostCardLinkPreview
                                    linkUrl={post.linkUrl}
                                    linkPreview={(post as any).linkPreview}
                                    isLocked={post.isLocked}
                                    shareUrl={`/posts/${post._id}`}
                                />
                            </div>
                        ) : null}
                    </div>
                )}

                {/* Right Section: Details (Stacked) */}
                <div className={`${showMediaSection ? "w-2/5" : "w-full"} shrink-0 bg-white dark:bg-n-1 flex flex-col dark:border-white/10 md:w-full md:flex-1 md:h-full`}>
                {/* 1. Author Header */}
                <div className="p-4 border-b border-n-4 dark:border-white flex items-center shrink-0">
                    {creator.pageSlug ? (
                        <Link
                            href={`/${creator.pageSlug}`}
                            onClick={onClose}
                            className="flex items-center min-w-0 cursor-pointer"
                        >
                            <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden shrink-0">
                                <Image
                                    className="object-cover rounded-full"
                                    family="avatar"
                                    slot="dropdown"
                                    src={creator.avatarUrl}
                                    fill
                                    alt={creator.displayName}
                                />
                            </div>
                            <div className="capitalize font-bold text-base text-n-1 dark:text-white truncate">
                                {creator.displayName}
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center min-w-0">
                            <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden shrink-0">
                                <Image
                                    className="object-cover rounded-full"
                                    family="avatar"
                                    slot="dropdown"
                                    src={creator.avatarUrl}
                                    fill
                                    alt={creator.displayName}
                                />
                            </div>
                            <div className="capitalize font-bold text-base text-n-1 dark:text-white truncate">
                                {creator.displayName}
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2 ml-2 min-w-0">
                        <div className="text-sm text-n-3">•</div>
                        <div className="text-sm text-n-3">{formatAppDate(post.createdAt, { suffix: true })}</div>
                    </div>
                    <ActionMenu
                        className="ml-auto"
                        items={shareItems}
                    />
                </div>

                {/* 2. Scrollable Comments List */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {/* Post Caption as first item if exists */}
                    {post.caption && !post.isLocked && (
                        <div className="">
                            <p className="text-base text-n-1 dark:text-white">
                                <ReadMore words={100}>{post.caption}</ReadMore>
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        {loadingComments ? (
                            <div className="flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : comments.length > 0 ? (
                            comments.map((comment) => (
                                <CommentItem
                                    key={comment._id}
                                    comment={comment}
                                    variant="modal"
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 text-n-3 text-sm">
                                No comments yet. Be the first!
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-4">
                    <Actions
                        postId={post._id}
                        likes={post.likeCount}
                        comments={post.commentCount}
                        isLiked={post.isLiked || false}
                        showComment={false}
                        shareUrl={`/posts/${post._id}`}
                        type="post"
                    />
                </div>



                {/* 3. Fixed Comment Input */}
                <div className="p-4 shrink-0">
                    <Comment
                        placeholder={post.allowComments ? "Write a comment..." : "Comments are turned off."}
                        className="shadow-none"
                        value={commentValue}
                        setValue={(e) => setCommentValue(e.target.value)}
                        onSend={handleSendComment}
                        disabled={!post.allowComments || sendingComment || post.isLocked}
                        inputDisabled={!post.allowComments}
                    />
                </div>
            </div>
        </Modal>
        <LoginModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    );
};

export default PostModal;
