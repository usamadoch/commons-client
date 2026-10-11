"use client";

import { useState, useMemo } from "react";

import Search from "@/components/Search";
import Loader from "@/components/Loader";
import Item from "./Item";
import { useExploreCreators } from "./useExploreCreators";

export const ExplorePage = () => {
    const { creators, isLoading, error } = useExploreCreators();

    const [search, setSearch] = useState("");

    const filteredCreators = useMemo(() => {
        const query = search.toLowerCase();
        return creators.filter((creator) =>
            (creator.displayName || "").toLowerCase().includes(query) ||
            (creator.tagline || "").toLowerCase().includes(query)
        );
    }, [creators, search]);



    return (
        <div className="w-full">
            <Search
                className="w-full mb-8 md:mb-6"
                placeholder="Search Creators..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                onSubmit={(e: React.FormEvent) => e.preventDefault()}
            />

            {isLoading ? (
                <div className="flex justify-center pt-10">
                    <Loader />
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
            ) : (
                <div className="grid grid-cols-4 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8 md:gap-6">
                    {filteredCreators.length > 0 ? (
                        filteredCreators.map((creator) => (
                            <Item item={creator} key={creator._id} />
                        ))
                    ) : (
                        <div className="col-span-full w-full text-center py-10 text-n-3 dark:text-n-8 font-medium">
                            No creators found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};