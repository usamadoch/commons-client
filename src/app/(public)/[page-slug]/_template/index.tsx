"use client";

import { useAuth } from "@/store/auth";
import { useCreatorPage } from "@/hooks/queries";
import { usePageSlug } from "@/hooks/usePageSlug";
import { useCreatorPageCache } from "@/hooks/useCreatorPageCache";
import { notFound } from "next/navigation";

// import Banner from "../_components/Banner";
import ProfileHeader from "../_components/ProfileHeader";
import Content from "../_components/Content";
import Loader from "@/components/Loader";
import StickyJoinBar from "../_components/StickyJoinBar";


const CreatorPage = () => {
    const slug = usePageSlug();
    const { user } = useAuth();
    const { handleImageSuccess, handleJoinSuccess } = useCreatorPageCache(slug, user?._id);

    // Page existence is already validated server-side in layout.tsx.
    // This client-side fetch seeds the React Query cache for interactive features.
    const { data, isLoading } = useCreatorPage(slug);
    const { page, isOwner, isMember } = data || {};

    if (isLoading || !page) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader text="Loading..." />
            </div>
        );
    }

    // Draft pages are only visible to the owner.
    // This check runs client-side where browser cookies are available,
    // so isOwner is correctly determined by the backend.
    if (page.status === 'draft' && !isOwner) {
        notFound();
    }

    // Check for missing fields for warning
    const missingFields: string[] = [];
    if (!page.bannerUrl) missingFields.push('Banner image');
    if (!page.avatarUrl) missingFields.push('Profile picture');
    if (!page.about) missingFields.push('About section');

    return (
        <>

            {/* <Banner
                page={page}
                isOwner={!!isOwner}
                onUpdate={handleImageSuccess}
            /> */}

            <div className="max-w-300 w-full mx-auto">
                <ProfileHeader
                    page={page}
                    isOwner={!!isOwner}
                    isMember={!!isMember}
                    onUpdate={handleImageSuccess}
                    onJoinSuccess={handleJoinSuccess}
                />

                <Content pageSlug={slug} />
            </div>

            <StickyJoinBar
                page={page}
                isOwner={!!isOwner}
                isMember={!!isMember}
                onJoinSuccess={handleJoinSuccess}
            />
        </>
    );
};

export default CreatorPage;
