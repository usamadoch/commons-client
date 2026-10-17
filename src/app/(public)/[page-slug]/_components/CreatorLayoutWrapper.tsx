"use client";

import { useAuth } from "@/store/auth";
import { useCreatorPage } from "@/hooks/queries";
import { usePageSlug } from "@/hooks/usePageSlug";
import { useCreatorPageCache } from "@/hooks/useCreatorPageCache";
import { notFound, usePathname } from "next/navigation";
import Banner from "./Banner";
import ProfileHeader from "./ProfileHeader";
import StickyJoinBar from "./StickyJoinBar";
import JoinTierModal from "@/components/modals/JoinTierModal";
import LoginModal from "@/components/modals/LoginModal";
import { useState, useEffect, ReactNode, createContext, useContext, Suspense } from "react";
import { useQueryClient } from "@tanstack/react-query";

type CreatorPageContextType = {
    onOpenJoinModal: () => void;
    onOpenLoginModal: () => void;
};

export const CreatorPageContext = createContext<CreatorPageContextType | null>(null);

export const useCreatorPageContext = () => {
    const ctx = useContext(CreatorPageContext);
    if (!ctx) return { onOpenJoinModal: () => {}, onOpenLoginModal: () => {} };
    return ctx;
};

import CreatorHeader from "@/layout/CreatorHeader";

export default function CreatorLayoutWrapper({ children, initialPageData }: { children: ReactNode, initialPageData: any }) {
    const slug = usePageSlug();
    const pathname = usePathname();
    const isRootPage = pathname === `/${slug}`;
    
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { handleImageSuccess, handleJoinSuccess } = useCreatorPageCache(slug, user?._id);
    const queryClient = useQueryClient();

    // Pass initialPageData directly to the query hook as initialData
    const { data, isLoading: isPageLoading, isPendingAuthCheck: isRelLoading } = useCreatorPage(slug, initialPageData);
    const pageData = data || initialPageData;
    const { page, isOwner, isMember } = pageData || {};

    const isPendingAuthCheck = isAuthLoading || (isAuthenticated ? isRelLoading : false);

    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


    useEffect(() => {
        const wasOpen = sessionStorage.getItem(`join_modal_open_${slug}`);
        if (wasOpen === 'true' && isAuthenticated) {
            setIsJoinModalOpen(true);
        }
    }, [slug, isAuthenticated]);

    const handleOpenJoinModal = () => {
        setIsJoinModalOpen(true);
        sessionStorage.setItem(`join_modal_open_${slug}`, 'true');
    };

    const handleCloseJoinModal = () => {
        setIsJoinModalOpen(false);
        sessionStorage.removeItem(`join_modal_open_${slug}`);
    };

    const handleJoinTierSuccess = () => {
        handleJoinSuccess();
        queryClient.invalidateQueries({ queryKey: ['creator-posts', slug], refetchType: 'all' });
        queryClient.invalidateQueries({ queryKey: ['creator-page', slug], refetchType: 'all' });
        queryClient.invalidateQueries({ queryKey: ['recent-videos', slug], refetchType: 'all' });
    };

    if (page?.status === 'draft' && !isOwner) {
        notFound();
    }

    return (
        <CreatorPageContext.Provider value={{ onOpenJoinModal: handleOpenJoinModal, onOpenLoginModal: () => setIsLoginModalOpen(true) }}>
            <CreatorHeader initialPageData={initialPageData} />
            <div className="max-w-300 w-full mx-auto">
                {page && isRootPage && (
                    <>
                        <Banner
                            page={page}
                            isOwner={!!isOwner}
                            onUpdate={handleImageSuccess}
                        />
                        <ProfileHeader
                            page={page}
                            isOwner={!!isOwner}
                            isMember={!!isMember}
                            isPendingAuthCheck={isPendingAuthCheck}
                            onUpdate={handleImageSuccess}
                            onJoinSuccess={handleJoinTierSuccess}
                            onOpenJoinModal={handleOpenJoinModal}
                            onOpenLoginModal={() => setIsLoginModalOpen(true)}
                        />
                    </>
                )}

                {children}
            </div>

            {page && isRootPage && (
                <Suspense fallback={null}>
                    <StickyJoinBar
                        page={page}
                        isOwner={!!isOwner}
                        isMember={!!isMember}
                        onJoinSuccess={handleJoinSuccess}
                        onOpenJoinModal={handleOpenJoinModal}
                        onOpenLoginModal={() => setIsLoginModalOpen(true)}
                    />
                </Suspense>
            )}

            <LoginModal
                visible={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />

            {page && (
                <JoinTierModal
                    visible={isJoinModalOpen}
                    onClose={handleCloseJoinModal}
                    page={page}
                    onSubscriptionSuccess={handleJoinTierSuccess}
                />
            )}
        </CreatorPageContext.Provider>
    );
}
