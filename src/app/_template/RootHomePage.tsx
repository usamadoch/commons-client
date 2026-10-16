"use client";

import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useHydrated } from "@/hooks/useHydrated";
import Loader from "@/components/Loader";
import AuthenticatedFeed from "./AuthenticatedFeed";
import PublicFeed from "./PublicFeed";
import BannerCarousel from "./_components/BannerCarousel";
import FeedSelector, { FeedType } from "./_components/FeedSelector";

// ======================
// ROOT HOMEPAGE (PUBLIC + AUTHENTICATED)
// ======================
export const RootHomePage = () => {
    const { mounted } = useHydrated();
    const { isAuthenticated, isLoading } = useAuth();
    const [feedType, setFeedType] = useState<FeedType>("for-you");

    if (!mounted) return null;

    // While auth is loading, show a loader briefly
    if (isLoading) {
        return (
            <div className="flex justify-center items-center pt-10">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl pb-20">
            {/* Rotating Banner Carousel with Banner C as default */}
            <BannerCarousel />

            {/* For you and following dropdown select */}
            <FeedSelector value={feedType} onChange={setFeedType} />

            {/* Feed content */}
            {feedType === "for-you" ? (
                <PublicFeed />
            ) : (
                <AuthenticatedFeed />
            )}
        </div>
    );
};
