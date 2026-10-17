
import { useExploreCreators as useQueryExplore } from "@/hooks/queries";
import { ExploreCreator } from "@/types";

export const useExploreCreators = (initialCreators?: ExploreCreator[]) => {
    const { data, isLoading, isError, error, refetch } = useQueryExplore(initialCreators);

    return {
        creators: data || [],
        isLoading,
        error: isError ? (error instanceof Error ? error.message : "Failed to load creators") : null,
        refresh: refetch
    };
};
