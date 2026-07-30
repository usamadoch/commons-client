import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { postService } from "@/services/post.service";

import Actions from "@/components/PostCard/Actions";
import ReadMore from "@/components/ReadMore";

import PostMediaGallery from "./PostMediaGallery";
import PostMetadata from "./PostMetadata";
import ContentHeader from "@/components/ContentHeader";
import { Icon } from "@/components/ui/icon";
import { Play, Lock } from "@/lib/icons";
import { isEmbeddableUrl, extractYouTubeVideoId, getYouTubeThumbnailUrl, getDomainLabel } from "@/lib/embed";

import {
    Post,
    MediaAttachment,
    AnyMediaAttachment,
} from "@/types";

import { getCreatorInfo } from "@/lib/post-mapper";

// ─── Types ──────────────────────────────────────────────────

interface PostContentAreaProps {
    post: Post;
    locked: boolean;
    mediaItems: AnyMediaAttachment[];
    unlockedMediaItems: MediaAttachment[];
    displayCaption: string;
}

// ─── Component ──────────────────────────────────────────────

const PostContentArea = ({
    post,
    locked,
    mediaItems,
    unlockedMediaItems,
    displayCaption,
}: PostContentAreaProps) => {

    const creator = getCreatorInfo(post);
    const [localPoll, setLocalPoll] = useState<any>(post.poll);
    const [userVotedOptions, setUserVotedOptions] = useState<number[]>(post.userVotedOptions || []);
    const [isVoting, setIsVoting] = useState(false);

    // Sync poll state when parent props change
    useEffect(() => {
        setLocalPoll(post.poll);
    }, [post.poll]);
    useEffect(() => {
        setUserVotedOptions(post.userVotedOptions || []);
    }, [post.userVotedOptions]);

    const handleVote = async (optionIndex: number) => {
        if (!localPoll || isVoting || locked) return;

        let newSelected = [...userVotedOptions];
        if (localPoll.allowMultiple) {
            if (newSelected.includes(optionIndex)) {
                newSelected = newSelected.filter(i => i !== optionIndex);
            } else {
                newSelected.push(optionIndex);
            }
        } else {
            if (newSelected.includes(optionIndex)) return;
            newSelected = [optionIndex];
        }

        setIsVoting(true);
        try {
            const response = await postService.votePoll(post._id, newSelected);
            setLocalPoll(response.post.poll);
            setUserVotedOptions(response.userVotedOptions || []);
        } catch (error: any) {
            toast.error(error.message || "Failed to vote");
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <div className="w-full">
            {/* ── Media Gallery ─────────────────────────────── */}
            <PostMediaGallery
                locked={locked}
                mediaItems={mediaItems}
                unlockedMediaItems={unlockedMediaItems}
            />

            {(post.linkUrl || (post as any).linkPreview) && (() => {
                const linkPreview = (post as any).linkPreview;
                const isEmbed = post.linkUrl
                    ? isEmbeddableUrl(post.linkUrl as string)
                    : linkPreview?.isEmbeddable;

                if (isEmbed) {
                    let thumbnailUrl = null;
                    if (post.linkUrl) {
                        const videoId = extractYouTubeVideoId(post.linkUrl as string);
                        thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : null;
                    } else if (linkPreview) {
                        thumbnailUrl = linkPreview.thumbnailUrl || null;
                    }

                    return (
                        <div className="mb-2.5 mt-4">
                            <div className="relative h-96 w-full rounded-md border border-n-1 dark:border-n-6 overflow-hidden bg-black">
                                {locked ? (
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        {thumbnailUrl && (
                                            <img
                                                src={thumbnailUrl}
                                                alt="Video thumbnail"
                                                className="w-full h-full object-cover opacity-30"
                                            />
                                        )}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                                            <Icon icon={Lock} className="w-8 h-8 text-white/80" />
                                            <span className="px-3 py-1 bg-black/80 rounded text-sm font-semibold text-white">Members Only</span>
                                        </div>
                                    </div>
                                ) : (
                                    <a href={post.linkUrl as string} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
                                        {thumbnailUrl && (
                                            <img
                                                src={thumbnailUrl}
                                                alt="Video thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                            <Icon icon={Play} className="w-16 h-16 text-white/90 drop-shadow-lg" />
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                }

                // Non-embeddable URL: show domain label only
                const domainLabel = post.linkUrl
                    ? getDomainLabel(post.linkUrl as string)
                    : linkPreview?.domainLabel;

                return (
                    <div className="mb-2.5 mt-4">
                        {locked ? (
                            <div className="w-full p-4 rounded-md border border-n-1 dark:border-n-6 bg-n-2 dark:bg-transparent flex items-center gap-3">
                                <Icon icon={Lock} className="w-5 h-5 text-n-4 dark:text-n-5 shrink-0" />
                                <span className="text-sm font-medium text-n-4 dark:text-n-7">Members Only Link</span>
                            </div>
                        ) : (
                            <a
                                href={post.linkUrl as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full p-4 rounded-md border border-n-1 dark:border-n-6 bg-n-2 dark:bg-transparent hover:bg-n-3 dark:hover:bg-n-6/30 transition-colors"
                            >
                                <div className="text-sm font-medium text-primary-1 truncate">{domainLabel}</div>
                            </a>
                        )}
                    </div>
                );
            })()}

            {localPoll && (
                <div className="mb-2.5 mt-4">
                    <div className={`relative w-full p-5 rounded-md border border-n-1 dark:border-n-6 bg-transparent`}>
                        {locked ? (
                            <div className="flex flex-col items-center justify-center py-6 gap-3">
                                <Icon icon={Lock} className="w-8 h-8 text-n-4 dark:text-n-5" />
                                <p className="text-sm font-semibold text-n-4 dark:text-n-5">Members Only Poll</p>
                                {localPoll.optionCount && (
                                    <p className="text-xs text-n-4 dark:text-n-5">{localPoll.optionCount} options</p>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col gap-3">
                                    {localPoll.options.map((option: any, index: number) => {
                                        const text = typeof option === 'string' ? option : option.text;
                                        const votes = typeof option === 'string' ? 0 : option.votes;
                                        const hasVoted = userVotedOptions.length > 0;
                                        const isSelected = userVotedOptions.includes(index);
                                        const totalVotes = localPoll.totalVotes || 0;
                                        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

                                        return (
                                            <div
                                                key={index}
                                                className={`relative flex items-center p-3 rounded-md border transition-colors overflow-hidden ${hasVoted ? (isSelected ? 'border-primary-1 dark:border-primary-1' : 'border-n-1 dark:border-n-6') : 'bg-n-2 dark:bg-transparent border-n-1 dark:border-n-6 cursor-pointer hover:border-n-3 dark:hover:border-n-5'}`}
                                                onClick={() => !hasVoted && handleVote(index)}
                                            >
                                                {hasVoted && (
                                                    <div
                                                        className={`absolute top-0 left-0 bottom-0 transition-all duration-500 ${isSelected ? 'bg-primary-1/10' : 'bg-n-3/30 dark:bg-n-6/30'}`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                )}

                                                <div className="relative z-10 flex items-center gap-3 w-full">
                                                    {!hasVoted && (
                                                        localPoll.allowMultiple ? (
                                                            <div className={`w-5 h-5 shrink-0 rounded-sm border-2 flex items-center justify-center ${isSelected ? 'border-primary-1 bg-primary-1' : 'border-n-4 dark:border-n-5'}`} />
                                                        ) : (
                                                            <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary-1' : 'border-n-4 dark:border-n-5'}`}>
                                                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-1" />}
                                                            </div>
                                                        )
                                                    )}

                                                    <span className={`text-sm font-semibold grow ${hasVoted && isSelected ? 'text-primary-1' : 'dark:text-n-9'}`}>{text}</span>

                                                    {hasVoted && (
                                                        <span className={`text-sm font-bold ${isSelected ? 'text-primary-1' : 'text-n-4 dark:text-n-5'}`}>
                                                            {percentage}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {userVotedOptions.length > 0 && (
                                    <div className="mt-4 text-xs font-semibold text-n-4 dark:text-n-5">
                                        {localPoll.totalVotes || 0} {(localPoll.totalVotes || 0) === 1 ? 'vote' : 'votes'}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
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
