import { useQuery } from "@tanstack/react-query";
import { pageService } from "@/services/page.service";
import { ApiClientError } from "@/services/api.client";
import { useAuth } from "@/store/auth";

// Hook to fetch Public Creator Page Metadata (Profile, Banner, Tiers, etc.)
export const usePublicCreatorProfile = (slug?: string, initialPage?: any) => {
    return useQuery({
        queryKey: ['creator-profile', slug],
        queryFn: async () => {
            if (!slug) return null;
            const res = await pageService.getBySlug(slug);
            return res?.page || null;
        },
        enabled: !!slug,
        initialData: initialPage || undefined,
        staleTime: 1000 * 60 * 5, // 5 minutes freshness for public creator metadata
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
            if (error instanceof ApiClientError && error.code === 'NOT_PUBLISHED') {
                return false;
            }
            return failureCount < 3;
        },
    });
};

// Hook to fetch User-Specific Creator Relationship (Owner, Member, Permissions)
export const useCreatorRelationship = (slug?: string) => {
    const { user, isAuthenticated } = useAuth();
    return useQuery({
        queryKey: ['creator-relationship', slug, user?._id],
        queryFn: async () => {
            if (!slug || !user) return { isOwner: false, isMember: false };
            const res = await pageService.getBySlug(slug);
            return {
                isOwner: Boolean(res?.isOwner),
                isMember: Boolean(res?.isMember),
            };
        },
        enabled: !!slug && Boolean(isAuthenticated && user?._id),
        staleTime: 1000 * 60 * 2, // 2 minutes freshness for authenticated relationship
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
};

// Unified Hook for Creator Page Data (composing public profile and personalized state)
export const useCreatorPage = (slug?: string, initialData?: any) => {
    const initialPage = initialData?.page || initialData;
    const { data: publicPage, isLoading: isProfileLoading, isError: isProfileError, error: profileError } = usePublicCreatorProfile(slug, initialPage);
    const { data: relationship, isLoading: isRelLoading } = useCreatorRelationship(slug);

    const isOwner = relationship?.isOwner ?? Boolean(initialData?.isOwner);
    const isMember = relationship?.isMember ?? Boolean(initialData?.isMember);

    const data = publicPage ? {
        page: publicPage,
        isOwner,
        isMember,
    } : null;

    return {
        data,
        isLoading: isProfileLoading,
        isPendingAuthCheck: isRelLoading,
        isError: isProfileError,
        error: profileError,
    };
};

// Hook to fetch Current User's Page (for Navigation)
export const useMyPage = () => {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['my-creation-page', user?._id],
        queryFn: async () => {
            const res = await pageService.getMyPage();
            return res?.page || null;
        },
        enabled: !!user && (user.role === 'creator' || user.role === 'admin'),
        staleTime: 1000 * 60 * 30,
        retry: false,
    });
};

// Hook for Explore Page
export const useExploreCreators = (initialData?: any[]) => {
    return useQuery({
        queryKey: ['explore-creators'],
        queryFn: async () => {
            const { pages } = await pageService.getAll();
            return pages || [];
        },
        initialData: initialData ? initialData : undefined,
        initialDataUpdatedAt: initialData ? Date.now() : undefined,
        staleTime: 1000 * 60 * 5,
    });
};
