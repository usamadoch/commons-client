"use client";

import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useHydrated } from "@/hooks/useHydrated";
import Loader from "@/components/Loader";
import AuthenticatedFeed from "./AuthenticatedFeed";
import PublicFeed from "./PublicFeed";
import BannerCarousel from "./_components/BannerCarousel";
import FeedSelector, { FeedType } from "./_components/FeedSelector";

import { CreatorPage, Post } from "@/types";

interface RootHomePageProps {
    initialPage?: CreatorPage | null;
    initialPosts?: Post[];
}

// ======================
// ROOT HOMEPAGE (PUBLIC + AUTHENTICATED)
// ======================
export const RootHomePage = ({ initialPage, initialPosts }: RootHomePageProps = {}) => {
    const { mounted } = useHydrated();
    const { isAuthenticated, isLoading } = useAuth();
    const [feedType, setFeedType] = useState<FeedType>("for-you");

    // During SSR or while checking auth on client, render the public feed immediately.
    // This eliminates the blank-screen null flash and initial loader sequence for visitors.
    if (!mounted || (isLoading && !isAuthenticated)) {
        return (
            <div className="w-full max-w-2xl mx-auto pb-20">
                <BannerCarousel />
                <FeedSelector value="for-you" onChange={setFeedType} />
                <PublicFeed initialPage={initialPage} initialPosts={initialPosts} />
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto pb-20">
            {/* Rotating Banner Carousel with Banner C as default */}
            <BannerCarousel />

            {/* For you and following dropdown select */}
            <FeedSelector value={feedType} onChange={setFeedType} />

            {/* Feed content */}
            {feedType === "for-you" || !isAuthenticated ? (
                <PublicFeed initialPage={initialPage} initialPosts={initialPosts} />
            ) : (
                <AuthenticatedFeed />
            )}
        </div>
    );
};
