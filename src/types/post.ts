import { User } from './user';
import { CreatorPage } from './page';
import { MediaAttachment, ImageAttachment, VideoAttachment, LockedImageAttachment, LockedVideoAttachment, LockedMediaAttachment, LinkPreview } from './media';
import { Poll } from './poll';

export * from './media';
export * from './poll';
export * from './comment';

export type PostStatus = 'draft' | 'scheduled' | 'published';
export type PostVisibility = 'public' | 'members';

interface BasePostFields {
    _id: string;
    creatorId: string | Pick<User, '_id' | 'displayName' | 'username' | 'avatarUrl'>;
    pageId: string | Pick<CreatorPage, '_id' | 'pageSlug' | 'displayName' | 'avatarUrl'>;
    tags: string[];
    visibility: PostVisibility;
    status: PostStatus;
    publishedAt: string | null;
    scheduledFor: string | null;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    allowComments: boolean;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
    isLocked: boolean;
    isLiked?: boolean;
    linkUrl?: string;
    poll?: Poll;
    userVotedOptions?: number[];
}

type LockedPostState = {
    isLocked: true;
    teaser: string;
    caption: null;
    linkPreview?: LinkPreview;
}

type UnlockedPostState = {
    isLocked: false;
    teaser?: null;
    caption: string | null;
}

type BasePost = BasePostFields & (LockedPostState | UnlockedPostState);

export type TextPost = BasePost & {
    postType: 'text';
    mediaAttachments: never[];
}

export type ImagePost = BasePost & {
    postType: 'image';
    mediaAttachments: (ImageAttachment | LockedImageAttachment)[];
}

export type VideoPost = BasePost & {
    postType: 'video';
    mediaAttachments: (VideoAttachment | LockedVideoAttachment)[];
}

export type Post = TextPost | ImagePost | VideoPost;

export interface DashboardPost {
    _id: string;
    caption: string | null;
    postType: 'text' | 'image' | 'video';
    mediaAttachments: { type: string; url: string | null }[];
    viewCount: number;
    likeCount: number;
    commentCount: number;
    visibility: PostVisibility;
    publishedAt: string | null;
    createdAt: string;
    poll?: any;
    linkUrl?: string;
}

export type PostType = Post['postType'];

export type CreatePostPayload =
    | { _id?: string; postType: 'text'; caption: string; mediaAttachments?: never; visibility?: PostVisibility; tags?: string[]; allowComments?: boolean; status?: 'draft' | 'published'; scheduledFor?: string; linkUrl?: string; poll?: Poll; }
    | { _id?: string; postType: 'image'; caption?: string; mediaAttachments: ImageAttachment[]; visibility?: PostVisibility; tags?: string[]; allowComments?: boolean; status?: 'draft' | 'published'; scheduledFor?: string; linkUrl?: string; poll?: Poll; }
    | { _id?: string; postType: 'video'; caption?: string; mediaAttachments: VideoAttachment[]; visibility?: PostVisibility; tags?: string[]; allowComments?: boolean; status?: 'draft' | 'published'; scheduledFor?: string; linkUrl?: string; poll?: Poll; };

export type UpdatePostPayload = Partial<CreatePostPayload>;

export interface ReviewItem {
    id: string;
    avatar: string;
    author: string;
    time: string;
    content: string;
    images: string[];
    likes: number;
    comments: number;
    isLiked: boolean;
    isLocked: boolean;
    shareUrl?: string;
    isOwner?: boolean;
    video?: {
        thumbnailUrl?: string;
        duration?: number;
    };
}

/**
 * Type guard to check if a post is locked
 */
export function isLockedPost(post: Post): boolean {
    return post.isLocked === true;
}

/**
 * Type guard to check if a media attachment is locked (url is null)
 */
export function isLockedMedia(
    attachment: MediaAttachment | LockedMediaAttachment
): attachment is LockedMediaAttachment {
    return attachment.url === null;
}

/**
 * Type guard to check if a media attachment is unlocked (has url)
 */
export function isUnlockedMedia(
    attachment: MediaAttachment | LockedMediaAttachment
): attachment is MediaAttachment {
    return attachment.url !== null;
}

/**
 * Helper to get unlocked media attachments from a post.
 * Use this when you know the post should be unlocked (e.g., in editing contexts).
 * Returns an empty array if the post is locked.
 */
export function getUnlockedMediaAttachments(post: Post): MediaAttachment[] {
    if (post.isLocked) return [];
    if (post.postType === 'text') return [];

    // Filter to only unlocked media (which should be all of them if !isLocked)
    return post.mediaAttachments.filter(isUnlockedMedia);
}
