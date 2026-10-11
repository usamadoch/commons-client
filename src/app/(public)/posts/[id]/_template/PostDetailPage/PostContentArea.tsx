import { getCreatorInfo } from "@/lib/post-mapper";
import { Post, MediaAttachment, AnyMediaAttachment } from "@/types";

import Actions from "@/components/PostCard/Actions";
import ReadMore from "@/components/ReadMore";
import ContentHeader from "@/components/ContentHeader";

import PostMediaGallery from "./PostMediaGallery";
import PostMetadata from "./PostMetadata";
import PostCardLinkPreview from "@/components/PostCard/LinkPreview";
import PostCardPoll from "@/components/PostCard/Poll";

// ─── Types ──────────────────────────────────────────────────

interface PostContentAreaProps {
    post: Post;
    locked: boolean;
    mediaItems: AnyMediaAttachment[];
    unlockedMediaItems: MediaAttachment[];
    displayCaption: string;
    onLockedClick?: () => void;
}

// ─── Component ──────────────────────────────────────────────

const PostContentArea = ({
    post,
    locked,
    mediaItems,
    unlockedMediaItems,
    displayCaption,
    onLockedClick,
}: PostContentAreaProps) => {
    const creator = getCreatorInfo(post);

    return (
        <div className="w-full">
            {/* ── Media Gallery ─────────────────────────────── */}
            <div className="w-full max-w-4xl mx-auto">
                <PostMediaGallery
                    locked={locked}
                    mediaItems={mediaItems}
                    unlockedMediaItems={unlockedMediaItems}
                />
            </div>

            {(post.linkUrl || (post as any).linkPreview) && (
                <div className="w-full max-w-4xl mx-auto">
                    <PostCardLinkPreview
                        linkUrl={post.linkUrl as string}
                        linkPreview={(post as any).linkPreview}
                        isLocked={locked}
                        shareUrl={`/posts/${post._id}`}
                        onClick={onLockedClick}
                    />
                </div>
            )}

            {post.poll && (
                <div className="w-full max-w-4xl mx-auto">
                    <PostCardPoll
                        postId={post._id}
                        initialPoll={post.poll}
                        initialVotedOptions={post.userVotedOptions || []}
                        isLocked={locked}
                        shareUrl={`/posts/${post._id}`}
                        onClick={onLockedClick}
                    />
                </div>
            )}

            <ContentHeader
                creator={creator}
                date={post.publishedAt || post.createdAt}
                locked={locked}
                titleOrCaption={<ReadMore words={20} className="dark:text-n-9">{displayCaption}</ReadMore>}
                actions={
                    <Actions
                        postId={post._id}
                        likes={post.likeCount}
                        comments={post.commentCount}
                        isLiked={post.isLiked || false}
                        showComment={false}
                        className="mt-0"
                    />
                }
                metadata={<PostMetadata viewCount={post.viewCount} />}
            />
        </div>
    );
};

export default PostContentArea;
