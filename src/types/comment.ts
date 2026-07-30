import { User } from './user';

export interface Comment {
    _id: string;
    postId: string;
    authorId: string | User;
    content: string;
    likeCount?: number;
    isLiked?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCommentPayload {
    content: string;
    parentId?: string;
}
