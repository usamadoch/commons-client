import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post.service";
import { usePost, usePostComments } from "@/hooks/queries";
import { isValidObjectId } from "@/lib/validation";
import {
    Post,
    MediaAttachment,
    AnyMediaAttachment,
    isUnlockedMedia,
    CreatorPage,
    Comment as PostComment,
} from "@/types";

import { usePostComment } from "./hooks/usePostComment";
import { usePostJoin } from "./hooks/usePostJoin";
import { useAuth } from "@/store/auth";

interface UsePostDetailReturn {
    // Data
    post: Post | null | undefined;
    comments: PostComment[] | undefined;
    pageSlug: string | undefined;

    // Validation
    isValidId: boolean;

    // Loading states
    isPostLoading: boolean;
    isCommentsLoading: boolean;

    // Derived post state
    locked: boolean;
    mediaItems: AnyMediaAttachment[];
    unlockedMediaItems: MediaAttachment[];
    displayCaption: string;

    // Comment form
    commentValue: string;
    setCommentValue: (value: string) => void;
    handleCommentSubmit: () => Promise<void>;
    isSubmittingComment: boolean;

    // Join / Auth
    handleJoin: () => void;
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
    isJoinTierModalOpen: boolean;
    setIsJoinTierModalOpen: (open: boolean) => void;

    // Auth user
    user: ReturnType<typeof useAuth>["user"];
}

/**
 * Encapsulates all data-fetching, derived state, and mutation logic
 * for the post detail page.
 */
export const usePostDetail = (
    postId: string,
    initialPost?: (Post & { isLiked?: boolean }) | null
): UsePostDetailReturn => {
    // ── Validate ID format (skip all requests if invalid) ───
    const isValidId = isValidObjectId(postId);
    const queryId = isValidId ? postId : '';

    const queryClient = useQueryClient();

    // ── Queries (disabled when ID is invalid) ───────────────
    const { data: post, isLoading: isPostLoading } = usePost(queryId, initialPost);
    const { data: comments, isLoading: isCommentsLoading } = usePostComments(queryId);

    // ── Sub Hooks ────────────────────────────────────────────
    const {
        commentValue,
        setCommentValue,
        isSubmittingComment,
        handleCommentSubmit,
    } = usePostComment(postId);

    const {
        user,
        handleJoin,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isJoinTierModalOpen,
        setIsJoinTierModalOpen,
    } = usePostJoin(post);

    // ── Dwell-based view counting (3s visible duration) ─────
    useEffect(() => {
        if (!isValidId || !postId) return;

        let accumulatedMs = 0;
        let lastVisibleStart: number | null = null;
        let timerId: ReturnType<typeof setTimeout> | null = null;
        let isDispatched = false;

        const REQUIRED_DWELL_MS = 3000;

        const record = () => {
            if (isDispatched) return;
            isDispatched = true;

            postService.recordView(postId).then((res) => {
                if (res?.recorded && typeof res.viewCount === 'number') {
                    // Update cache for any queries matching ['post', queryId]
                    queryClient.setQueriesData(
                        { queryKey: ['post', queryId] },
                        (old: (Post & { isLiked?: boolean }) | undefined | null) => {
                            if (!old) return old;
                            return { ...old, viewCount: res.viewCount };
                        }
                    );
                }
            }).catch((err) => {
                console.error('[PostDetail] Failed to record view:', err);
            });
        };

        const startTimer = () => {
            if (isDispatched) return;
            if (typeof document !== 'undefined' && document.visibilityState !== 'visible') {
                return;
            }

            lastVisibleStart = Date.now();
            const remainingMs = Math.max(0, REQUIRED_DWELL_MS - accumulatedMs);

            if (remainingMs <= 0) {
                record();
                return;
            }

            timerId = setTimeout(() => {
                record();
            }, remainingMs);
        };

        const pauseTimer = () => {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            if (lastVisibleStart !== null) {
                accumulatedMs += Date.now() - lastVisibleStart;
                lastVisibleStart = null;
            }
        };

        const handleVisibilityChange = () => {
            if (typeof document === 'undefined') return;
            if (document.visibilityState === 'visible') {
                startTimer();
            } else {
                pauseTimer();
            }
        };

        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', handleVisibilityChange);
            if (document.visibilityState === 'visible') {
                startTimer();
            }
        }

        return () => {
            pauseTimer();
            if (typeof document !== 'undefined') {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };
    }, [postId, queryId, isValidId, queryClient]);

    // ── Derived values ───────────────────────────────────────
    const locked = post?.isLocked ?? false;

    const mediaItems: AnyMediaAttachment[] =
        post?.mediaAttachments && post.mediaAttachments.length > 0
            ? post.mediaAttachments
            : [];

    const unlockedMediaItems = mediaItems.filter(isUnlockedMedia);

    const displayCaption = locked
        ? post?.teaser || "Exclusive content for members"
        : post?.caption || "";

    // Derive pageSlug from the populated pageId object
    const pageSlug: string | undefined =
        post && typeof post.pageId === "object"
            ? (post.pageId as Pick<CreatorPage, "_id" | "pageSlug">).pageSlug
            : undefined;

    return {
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
    };
};
