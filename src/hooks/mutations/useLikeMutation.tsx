import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post.service";

type TargetType = 'post' | 'comment';

export const useLikeMutation = (postId: string, targetType: TargetType) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return targetType === 'comment'
                ? await postService.toggleLikeComment(postId)
                : await postService.toggleLike(postId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['creator-posts'] });
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
        onError: (error) => {
            console.error('Failed to toggle like', error);
        }
    });
};
