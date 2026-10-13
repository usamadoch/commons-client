"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/Image";
import { useCreatorPlans } from "@/hooks/queries";
import { CreatorPage } from "@/types";
import { Icon } from "@/components/ui/icon";
import { ChevronUp } from "@/lib/icons";

type StickyJoinBarProps = {
    page: CreatorPage;
    isOwner: boolean;
    isMember: boolean;
    onJoinSuccess?: () => void;
    onOpenJoinModal?: () => void;
    onOpenLoginModal?: () => void;
};

const StickyJoinBar = ({ page, isOwner, isMember, onJoinSuccess, onOpenJoinModal, onOpenLoginModal }: StickyJoinBarProps) => {
    const searchParams = useSearchParams();
    const isPreview = searchParams.get("preview") === "true";

    // Determine if the bar should be completely hidden
    const shouldHide = (isOwner || isMember) && !isPreview;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

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

    // Handle scroll visibility threshold
    useEffect(() => {
        if (shouldHide || isPreview) return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [shouldHide, isPreview]);

    if (shouldHide) return null;

    const isVisible = isPreview || isScrolled;

    const handleJoinClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onOpenJoinModal?.();
    };

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMinimized(true);
    };

    const handleExpand = () => {
        setIsMinimized(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, x: isMobile ? 0 : "-50%", opacity: 0 }}
                    animate={{
                        y: isMinimized ? "calc(100% - 14px)" : 0,
                        x: isMobile ? 0 : "-50%",
                        opacity: 1
                    }}
                    exit={{ y: 100, x: isMobile ? 0 : "-50%", opacity: 0 }}
                    whileHover={isMinimized ? { y: "calc(100% - 18px)" } : undefined}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    onClick={isMinimized ? handleExpand : undefined}
                    className={`fixed bottom-0 left-1/2 lg:left-0 z-40 w-[calc(100%-2rem)] lg:w-full max-w-3xl lg:max-w-full rounded-t-sm lg:rounded-none border-t-2 border-x-2 lg:border-x-0 border-b-0 border-n-1 dark:border-n-6 bg-white dark:bg-n-2 shadow-primary-6 lg:shadow-none select-none transition-shadow ${isMinimized ? "cursor-pointer hover:shadow-primary-8" : ""
                        }`}
                >
                    {/* Top Handle / Peek Strip */}
                    <div
                        onClick={isMinimized ? handleExpand : handleMinimize}
                        className={`w-full flex items-center justify-center pt-1.5 pb-1 cursor-pointer group transition-colors ${isMinimized
                            ? "bg-purple-1/15 dark:bg-purple-1/20 hover:bg-purple-1/30"
                            : "hover:bg-n-3/5 dark:hover:bg-white/5"
                            }`}
                        title={isMinimized ? "Click to expand" : "Click to minimize"}
                    >
                        <div className="flex items-center gap-1.5">
                            <div
                                className={`rounded-full transition-all ${isMinimized
                                    ? "w-12 h-1.5 bg-purple-1 shadow-sm group-hover:scale-105"
                                    : "w-8 h-1 bg-n-4 dark:bg-n-6 group-hover:bg-purple-1"
                                    }`}
                            />
                            {isMinimized && (
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-1 dark:text-purple-1 flex items-center gap-0.5 leading-none">
                                    <Icon icon={ChevronUp} className="w-3 h-3 stroke-[3]" />
                                    <span className="mobile:hidden">Membership</span>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Bar Content */}
                    <div className="flex items-center justify-between gap-4 lg:gap-3 px-6 pb-3 lg:px-4 lg:pb-2.5 mobile:px-3 mobile:pb-2 pt-0.5">
                        <div className="flex items-center gap-3 mobile:gap-2.5 min-w-0">
                            <div className="relative shrink-0 w-10 h-10 mobile:w-8 mobile:h-8 rounded-sm overflow-hidden border border-n-1 dark:border-n-6">
                                <Image
                                    className="object-cover"
                                    family="avatar"
                                    slot="profile"
                                    src={page.avatarUrl}
                                    fill
                                    alt="Avatar"
                                />
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                                <span className="text-xs font-bold text-n-1 dark:text-n-9 leading-tight truncate">
                                    Join {page.displayName}&apos;s community<span className="lg:hidden"> and enjoy exclusive member benefits</span>.
                                </span>
                                <span className="text-sm mobile:text-xs font-extrabold text-purple-1 dark:text-purple-1 mt-0.5 leading-tight">
                                    {minPrice !== null ? `Starting at PKR ${minPrice.toLocaleString()}/mo` : "Enjoy exclusive member benefits."}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={handleJoinClick}
                                className="btn-purple px-6 lg:px-4 mobile:px-3 h-9.5 mobile:h-8.5 rounded-xs shrink-0 shadow-primary-4 font-bold text-sm mobile:text-xs hover:scale-[1.02] active:scale-[0.98] transition-transform"
                            >
                                Become a Member
                            </button>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyJoinBar;
