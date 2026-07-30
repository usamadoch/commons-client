import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Images from "./Images";
import Actions from "./Actions";
import ReadMore from "@/components/ReadMore";
import { Icon } from "@/components/ui/icon";
import { Pencil, Copy, Play } from "@/lib/icons";
import ActionMenu from "@/components/ActionMenu";
import { formatDuration, formatAppDate } from "@/lib/date";
import { getCreatorInfo } from "@/lib/post-mapper";
import PostCardPoll from "./Poll";
import PostCardLinkPreview from "./LinkPreview";
import LockedOverlay from "@/components/LockedOverlay";

import { Post, CreatorPage, isLockedMedia, Poll } from "@/types";

const DUMMY_TEASERS = [
    " Unlock this post to continue reading exclusive member content. Join the community to access the full post, view all media attachments, and participate in the comments section with other members.",
    " Gain full access to this post and everything else the creator has to offer. Members unlock all premium content, high-resolution media, and exclusive community discussions.",
    " This content is locked for non-members. Become a supporter today to read the rest of this post, unlock all videos and images, and join the exclusive conversation.",
    " Continue reading by unlocking this member-exclusive post. Support the creator to get instant access to their full catalog of premium updates, behind-the-scenes content, and more."
];

type PostCardProps = {
    post: Post;
    page?: CreatorPage;
    isOwner?: boolean;
    imageBig?: boolean;
    onCommentClick?: () => void;
};

const PostCard = ({ post, page, isOwner = false, imageBig, onCommentClick }: PostCardProps) => {
    const creator = getCreatorInfo(post, page);

    // Pick a deterministic dummy text for this post
    const dummyIndex = post._id.charCodeAt(post._id.length - 1) % DUMMY_TEASERS.length;
    const dummyText = DUMMY_TEASERS[dummyIndex || 0];

    let content: string;
    let images: string[] = [];
    let video: { thumbnailUrl?: string; duration?: number } | undefined;

    if (post.isLocked) {
        content = post.teaser || 'Exclusive content for members';

        if (post.postType === 'image') {
            const attachments = post.mediaAttachments || [];
            images = attachments
                .filter(m => m.thumbnailUrl)
                .map(m => m.thumbnailUrl!)
                .filter((url): url is string => !!url);
        } else if (post.postType === 'video') {
            const attachment = post.mediaAttachments?.[0];
            if (attachment && attachment.thumbnailUrl) {
                video = {
                    thumbnailUrl: attachment.thumbnailUrl,
                    duration: (attachment as any).duration
                };
            }
        }
    } else {
        content = post.caption || '';
        if (post.postType === 'image') {
            const attachments = post.mediaAttachments || [];
            images = attachments
                .filter(m => !isLockedMedia(m) && m.url)
                .map(m => m.url)
                .filter((url): url is string => !!url);
        } else if (post.postType === 'video') {
            const attachment = post.mediaAttachments?.[0];
            if (attachment && !isLockedMedia(attachment) && attachment.url) {
                video = {
                    thumbnailUrl: attachment.thumbnailUrl,
                    duration: (attachment as any).duration
                };
            }
        }
    }

    const item = {
        id: post._id,
        author: creator.displayName,
        avatar: creator.avatarUrl,
        time: formatAppDate(post.createdAt, { suffix: true }),
        content: content,
        images: images,
        video: video,
        likes: post.likeCount || 0,
        comments: post.commentCount || 0,
        isLiked: !!post.isLiked,
        isLocked: post.isLocked,
        shareUrl: `/posts/${post._id}`,
        isOwner: isOwner,
        linkUrl: post.linkUrl,
        linkPreview: (post as any).linkPreview,
        poll: post.poll,
    };

    const hasImages = item.images && item.images.length > 0;
    const hasVideo = !!item.video;
    const hasLink = !!(item.linkUrl || item.linkPreview);
    const hasPoll = !!item.poll;

    const showOverlayOn = {
        images: item.isLocked && hasImages,
        video: item.isLocked && !hasImages && hasVideo,
        link: item.isLocked && !hasImages && !hasVideo && hasLink,
        poll: item.isLocked && !hasImages && !hasVideo && !hasLink && hasPoll,
        text: item.isLocked && !hasImages && !hasVideo && !hasLink && !hasPoll,
    };

    return (
        <div className="flex flex-col py-5 card bg-white border border-n-4 rounded-sm last:mb-0 mobile:px-4">
            {/* Header Row */}
            <div className="flex items-center px-5 mobile:px-0 mb-3">
                <div className="relative shrink-0 w-8.5 h-8.5 mr-3.5">
                    <Image
                        className="object-cover rounded-full"
                        family="avatar"
                        slot="dropdown"
                        src={item.avatar}
                        fill
                        alt="Avatar"
                    />
                </div>
                <div className="flex items-center gap-2 min-w-0">
                    <div className="capitalize whitespace-nowrap text-base font-bold dark:text-n-9 truncate">
                        {item.author}
                    </div>
                    <div className="text-sm text-n-3 dark:text-n-8">•</div>
                    <div className="truncate text-sm font-medium text-n-3 dark:text-n-8">
                        {item.time}
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    {item.isOwner && (
                        <Link
                            href={`/posts/${item.id}/edit`}
                            onClick={(e) => e.stopPropagation()}
                            className="btn-stroke btn-small rounded-full"
                        >
                            <Icon icon={Pencil} className="icon-16" /> Edit
                        </Link>
                    )}
                    <ActionMenu
                        className="-mt-1.5"
                        items={[
                            {
                                label: "Copy link",
                                icon: Copy,
                                onClick: () => {
                                    const shareUrl = item.shareUrl;
                                    const fullUrl = shareUrl ? (shareUrl.startsWith('http') ? shareUrl : `${window.location.origin}${shareUrl}`) : window.location.href;
                                    navigator.clipboard.writeText(fullUrl);
                                },
                            }
                        ]}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="pl-17 lg:pl-0 pr-5 lg:pr-0">
                <div className="relative">
                    <div className={`text-base py-2.5 ${item.isLocked ? "max-h-40 overflow-hidden select-none" : ""}`}>
                        {item.content && (
                            <ReadMore words={100} buttonClass="text-n-1 dark:text-purple-1">
                                {`${item.content}${item.isLocked && !item.poll ? '...' : ''}`}
                            </ReadMore>
                        )}
                        {item.isLocked && !item.poll && (
                            <span className="blur-xs opacity-70 select-none pointer-events-none">
                                {dummyText}
                            </span>
                        )}
                    </div>
                    {showOverlayOn.text && (
                        <LockedOverlay type="gradient" title="Members Only Post" onClick={onCommentClick} />
                    )}
                </div>

                {hasImages && (
                    <div className={`relative mb-2.5 ${item.images.length === 1 ? 'w-fit max-w-full' : 'w-full'}`}>
                        <Images
                            items={item.images}
                            imageBig={imageBig}
                            className={`group lg:pr-0 mobile:aspect-square ${item.images.length === 1 ? 'w-fit max-w-full' : 'w-full'} ${imageBig ? "h-80 mobile:h-auto" : "h-120 mobile:h-auto"} ${item.isLocked ? " select-none" : ""}`}
                        />
                        {showOverlayOn.images && (
                            <LockedOverlay type="overlay" title="Members Only Post" onClick={onCommentClick} />
                        )}
                    </div>
                )}

                {hasVideo && (
                    <div className="mb-2.5 relative">
                        <div className="relative w-full overflow-hidden rounded-sm flex items-center justify-center">
                            {item.video?.thumbnailUrl ? (
                                <img
                                    src={item.video.thumbnailUrl}
                                    alt="Video thumbnail"
                                    className="w-full h-auto max-h-160 object-contain object-left"
                                />
                            ) : (
                                <div className="w-full aspect-video flex items-center justify-center bg-black">
                                    <Icon icon={Play} className="w-12 h-12 text-white/80" />
                                </div>
                            )}
                            {item.video?.duration && !item.isLocked && (
                                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs font-semibold text-white dark:text-n-8">
                                    {formatDuration(item.video.duration)}
                                </div>
                            )}
                        </div>
                        {showOverlayOn.video && (
                            <LockedOverlay type="box" title="Members Only Video" onClick={onCommentClick} />
                        )}
                    </div>
                )}

                {hasLink && (
                    <PostCardLinkPreview
                        linkUrl={item.linkUrl}
                        linkPreview={item.linkPreview}
                        isLocked={item.isLocked}
                        shareUrl={item.shareUrl}
                        showOverlay={showOverlayOn.link}
                        onClick={onCommentClick}
                    />
                )}

                {hasPoll && (
                    <PostCardPoll
                        postId={item.id}
                        initialPoll={item.poll!}
                        initialVotedOptions={post.userVotedOptions || []}
                        isLocked={item.isLocked}
                        shareUrl={item.shareUrl}
                        showOverlay={showOverlayOn.poll}
                        onClick={onCommentClick}
                    />
                )}

                <Actions
                    postId={item.id}
                    comments={item.comments}
                    likes={item.likes}
                    isLiked={item.isLiked}
                    isLocked={item.isLocked}
                    shareUrl={item.shareUrl}
                    onCommentClick={onCommentClick}
                />
            </div>
        </div>
    );
};

export default PostCard;
