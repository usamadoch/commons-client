"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/Image";
import { useAuth } from "@/store/auth";
import { useCreatorPlans } from "@/hooks/queries";
import { CreatorPage } from "@/types";

type StickyJoinBarProps = {
    page: CreatorPage;
    isOwner: boolean;
    isMember: boolean;
    onJoinSuccess?: () => void;
    onOpenJoinModal?: () => void;
    onOpenLoginModal?: () => void;
};

const StickyJoinBar = ({ page, isOwner, isMember, onJoinSuccess, onOpenJoinModal, onOpenLoginModal }: StickyJoinBarProps) => {
    const { isAuthenticated } = useAuth();
    const searchParams = useSearchParams();
    const isPreview = searchParams.get("preview") === "true";
    
    // Determine if the bar should be completely hidden
    const shouldHide = (isOwner || isMember) && !isPreview;

    const [isScrolled, setIsScrolled] = useState(false);

    const creatorId = typeof page.userId === "object" ? page.userId?._id : page.userId;
    const { data: plans = [] } = useCreatorPlans(creatorId || "");

    const minPrice = plans && plans.length > 0
        ? Math.min(...plans.map((p: any) => p.price))
        : null;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1023);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    // Handle scroll visibility
    useEffect(() => {
        if (shouldHide || isPreview) return; // No need to listen to scroll if hiding or always showing in preview

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };

        window.addEventListener("scroll", handleScroll);
        // Run initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [shouldHide, isPreview]);

    if (shouldHide) return null;

    const isVisible = isPreview || isScrolled;

    const handleJoinClick = () => {
        if (!isAuthenticated) {
            onOpenLoginModal?.();
        } else {
            onOpenJoinModal?.();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, x: isMobile ? "0%" : "-50%", opacity: 0 }}
                        animate={{ y: 0, x: isMobile ? "0%" : "-50%", opacity: 1 }}
                        exit={{ y: 100, x: isMobile ? "0%" : "-50%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 25 }}
                        className="fixed bottom-6 lg:bottom-0 left-1/2 lg:left-0 z-40 flex items-center justify-between gap-6 lg:gap-3 px-6 py-3.5 lg:px-4 lg:py-3 rounded-full lg:rounded-none bg-white/90 dark:bg-n-1/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] lg:shadow-none dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:dark:shadow-none border-t border-transparent lg:border-n-4 lg:dark:border-n-6 w-[calc(100%-2rem)] lg:w-full max-w-3xl lg:max-w-full"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden md:hidden">
                                <Image
                                    className="object-cover rounded-full"
                                    family="avatar"
                                    slot="profile"
                                    src={page.avatarUrl}
                                    fill
                                    alt="Avatar"
                                />
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                                <span className="text-xs font-bold text-n-1 dark:text-n-9 leading-tight">
                                    Join {page.displayName}'s community<span className="md:hidden"> and enjoy exclusive member benefits</span>.
                                </span>
                                <span className="text-sm font-bold text-n-3 dark:text-n-9 mt-0.5">
                                    {minPrice !== null ? `Starting at PKR ${minPrice.toLocaleString()}/mo` : "Enjoy exclusive member benefits."}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleJoinClick}
                            className="btn-purple px-6 md:px-4 h-10 rounded-full shrink-0"
                        >
                            Become a Member
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

export default StickyJoinBar;
