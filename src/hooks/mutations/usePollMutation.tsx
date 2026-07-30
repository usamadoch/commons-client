import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { postService } from "@/services/post.service";

export const usePollMutation = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (optionIndexes: number[]) => {
            return await postService.votePoll(postId, optionIndexes);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['creator-posts'] });
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to vote");
        }
    });
};
