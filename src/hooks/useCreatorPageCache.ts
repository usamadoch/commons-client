import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { type CreatorPage as CreatorPageType } from "@/types";

export const useCreatorPageCache = (slug: string, userId?: string) => {
    const queryClient = useQueryClient();

    const handleImageSuccess = useCallback((type: 'banner' | 'avatar', url: string) => {
        // Update public creator profile
        queryClient.setQueryData(['creator-profile', slug], (old: CreatorPageType | undefined | null) => {
            if (!old) return old;
            return {
                ...old,
                [type === 'banner' ? 'bannerUrl' : 'avatarUrl']: url
            };
        });
    }, [queryClient, slug]);

    const handleJoinSuccess = useCallback(() => {
        // Increment member count in public profile
        queryClient.setQueryData(['creator-profile', slug], (old: CreatorPageType | undefined | null) => {
            if (!old) return old;
            return {
                ...old,
                memberCount: (old.memberCount || 0) + 1
            };
        });

        // Update relationship query for current user
        if (userId) {
            queryClient.setQueryData(['creator-relationship', slug, userId], {
                isOwner: false,
                isMember: true,
            });
        }

        // Invalidate posts to unlock member content
        queryClient.invalidateQueries({ queryKey: ['creator-posts', slug] });
        queryClient.invalidateQueries({ queryKey: ['recent-videos', slug] });
    }, [queryClient, slug, userId]);

    return { handleImageSuccess, handleJoinSuccess };
};
