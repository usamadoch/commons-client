"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PostContentArea from "./PostContentArea";
import CommentsSection from "./CommentsSection";
import LockedContent from "./LockedContent";
import { MOCK_POSTS, MOCK_COMMENTS, MockContentType } from "./mockPostData";
import { isUnlockedMedia } from "@/types";
import { Icon } from "@/components/ui/icon";
import { ChevronRight, ChevronLeft, ArrowLeft } from "@/lib/icons";

interface DevPlaygroundProps {
    postId?: string;
}

export const DevPlayground: React.FC<DevPlaygroundProps> = ({ postId }) => {
    type PlaygroundTab = Exclude<MockContentType, "live"> | "all";
    const searchParams = useSearchParams();

    const formatKeys: { key: Exclude<MockContentType, "live">; label: string; icon: string; desc: string }[] = [
        { key: "text", label: "Text Only", icon: "📝", desc: "Original Text Post rendering with ContentHeader & ReadMore" },
        { key: "single_image", label: "Single Image", icon: "🖼️", desc: "Original Single Image rendering with PostMediaGallery & MediaBlock" },
        { key: "multi_image", label: "Multi-Image", icon: "📸", desc: "Original Multiple Images rendering with MediaCarousel" },
        { key: "video", label: "Video", icon: "🎥", desc: "Original Video rendering with Mux/native player & duration" },
        { key: "poll", label: "Poll", icon: "📊", desc: "Original Interactive Poll rendering with PostCardPoll" },
        { key: "link", label: "Link Preview", icon: "🔗", desc: "Original OpenGraph Link Embed rendering with PostCardLinkPreview" },
        { key: "locked", label: "Members Only", icon: "🔒", desc: "Original Locked Post rendering with teaser & LockedOverlay" },
    ];

    // Determine initial active tab based on query param or route postId
    const getInitialTab = (): PlaygroundTab => {
        const queryTab = searchParams?.get("tab") as PlaygroundTab;
        if (queryTab && (queryTab === "all" || formatKeys.some(f => f.key === queryTab))) {
            return queryTab;
        }
        if (postId && formatKeys.some(f => f.key === postId)) {
            return postId as Exclude<MockContentType, "live">;
        }
        return "all";
    };

    const [selectedTab, setSelectedTab] = useState<PlaygroundTab>(getInitialTab);
    const [commentValue, setCommentValue] = useState("");

    // Synchronize tab state with URL query without reloading
    const handleSelectTab = (tab: PlaygroundTab) => {
        setSelectedTab(tab);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "instant" });
            const url = new URL(window.location.href);
            if (tab === "all") {
                url.searchParams.delete("tab");
            } else {
                url.searchParams.set("tab", tab);
            }
            window.history.replaceState(null, "", url.toString());
        }
    };

    const currentIndex = selectedTab === "all" ? -1 : formatKeys.findIndex(f => f.key === selectedTab);
    const prevFormat = currentIndex > 0 ? formatKeys[currentIndex - 1] : null;
    const nextFormat = currentIndex >= 0 && currentIndex < formatKeys.length - 1 ? formatKeys[currentIndex + 1] : null;

    const renderPostItem = (key: Exclude<MockContentType, "live">, isIndividualView = false) => {
        const post = MOCK_POSTS[key];
        const comments = MOCK_COMMENTS[key] || [];
        const locked = post.isLocked;
        const mediaItems = post.mediaAttachments || [];
        const unlockedMediaItems = mediaItems.filter(isUnlockedMedia);
        const displayCaption = locked
            ? (post.teaser || "Exclusive content for members")
            : (post.caption || "");
        const formatInfo = formatKeys.find(f => f.key === key);

        return (
            <div
                key={key}
                className={`w-full ${
                    isIndividualView
                        ? "mb-8 pb-4"
                        : "mb-16 pb-12 border-b-2 border-dashed border-n-4/40 dark:border-n-6/60 last:border-none"
                }`}
            >
                {/* Format Label Header — Identical in gathered and individual views */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-n-4/20 dark:border-n-6/40">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{formatInfo?.icon}</span>
                        <h3 className="text-lg font-black text-n-1 dark:text-white capitalize">
                            {formatInfo?.label}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-xs bg-purple-1/20 text-purple-1 border border-purple-1/30 font-bold uppercase">
                            Original Component
                        </span>
                    </div>
                    <span className="text-xs text-n-4 dark:text-n-7">
                        {formatInfo?.desc}
                    </span>
                </div>

                {/* Exact Original Post Component Container */}
                <div className="w-full bg-background dark:bg-n-1 rounded-lg border border-n-4/30 dark:border-n-6/40 shadow-sm overflow-hidden">
                    <PostContentArea
                        post={post}
                        locked={locked}
                        mediaItems={mediaItems}
                        unlockedMediaItems={unlockedMediaItems}
                        displayCaption={displayCaption}
                        onLockedClick={() => alert("Join Tier Clicked (Original flow)")}
                    />

                    {/* Comments or Locked CTA (Original flow) */}
                    <div className="max-w-4xl mx-auto w-full p-5 mobile:px-3 mobile:py-3 border-t border-n-4/20 dark:border-n-6/40">
                        {locked ? (
                            <LockedContent
                                handleJoin={() => alert("Join Clicked")}
                                user={null}
                                isLoginModalOpen={false}
                                setIsLoginModalOpen={() => {}}
                            />
                        ) : (
                            <CommentsSection
                                user={null}
                                value={commentValue}
                                setValue={(val) => setCommentValue(val)}
                                handleCommentSubmit={() => {}}
                                isSubmittingComment={false}
                                comments={comments}
                                allowComments={post.allowComments ?? true}
                            />
                        )}
                    </div>
                </div>

                {/* Individual Stepper Navigation when in single tab view */}
                {isIndividualView && (
                    <div className="mt-8 pt-6 border-t border-n-4/30 dark:border-n-6/40 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            {prevFormat ? (
                                <button
                                    type="button"
                                    onClick={() => handleSelectTab(prevFormat.key)}
                                    className="btn btn-medium btn-stroke text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                                >
                                    <Icon icon={ChevronLeft} className="w-4 h-4" />
                                    <span>{prevFormat.icon} {prevFormat.label}</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleSelectTab("all")}
                                    className="btn btn-medium btn-stroke text-xs font-bold flex items-center gap-1.5 cursor-pointer opacity-70"
                                >
                                    <span>📑 All Formats</span>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-n-4 dark:text-n-7">
                                Format {currentIndex + 1} of {formatKeys.length}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleSelectTab("all")}
                                className="text-xs font-bold underline text-purple-1 hover:text-purple-1/80 cursor-pointer ml-2"
                            >
                                Switch to All-in-One View
                            </button>
                        </div>

                        <div>
                            {nextFormat ? (
                                <button
                                    type="button"
                                    onClick={() => handleSelectTab(nextFormat.key)}
                                    className="btn btn-medium btn-purple text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                                >
                                    <span>{nextFormat.icon} {nextFormat.label}</span>
                                    <Icon icon={ChevronRight} className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleSelectTab("all")}
                                    className="btn btn-medium btn-purple text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                                >
                                    <span>📑 Back to All Formats</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full min-h-screen bg-background dark:bg-n-1 text-n-1 dark:text-n-9 pb-24">
            {/* ── Top Dev Banner ─────────────────────────────── */}
            <div className="sticky top-0 z-50 w-full bg-n-1 text-white border-b-2 border-purple-1 py-3 px-6 shadow-xl">
                <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xs bg-purple-1 text-n-1 font-black flex items-center justify-center text-sm shadow-md">
                            🧪
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-extrabold text-sm text-white">
                                    Dev Playground: All Content Types Gathered
                                </span>
                                <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-0.5 rounded-full font-bold">
                                    ENV GATED
                                </span>
                            </div>
                            <p className="text-xs text-white/60">
                                Viewing exact original designs & components for all post types at one place
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {postId && postId !== "preview" && !formatKeys.some(f => f.key === postId) && (
                            <Link
                                href={`/posts/${postId}`}
                                className="text-xs font-bold px-3 py-1.5 rounded-xs bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                            >
                                <Icon icon={ArrowLeft} className="w-3.5 h-3.5" />
                                <span>Exit to Live Post</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* View Mode & Format Selector */}
                <div className="max-w-6xl mx-auto mt-3 pt-2.5 border-t border-white/15 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-white/50 mr-1">View Mode:</span>
                    <button
                        type="button"
                        onClick={() => handleSelectTab("all")}
                        className={`text-xs px-3 py-1.5 rounded-xs font-bold transition-all cursor-pointer ${
                            selectedTab === "all"
                                ? "bg-purple-1 text-n-1 font-black border border-purple-1 shadow-md"
                                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        }`}
                    >
                        📑 Show All Formats (All-in-One)
                    </button>

                    <span className="text-white/20 mx-1">|</span>

                    {formatKeys.map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => handleSelectTab(item.key)}
                            className={`text-xs px-3 py-1.5 rounded-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                selectedTab === item.key
                                    ? "bg-purple-1 text-n-1 font-black border border-purple-1 shadow-md"
                                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                            }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Main Gathered Content Container ────────────── */}
            <div className="max-w-4xl mx-auto px-4 pt-8 mobile:px-3">
                {selectedTab === "all" ? (
                    <div>
                        <div className="mb-8 p-4 rounded-lg border-2 border-n-4/40 dark:border-n-6/60 bg-n-2/5 dark:bg-n-2/40 text-xs text-n-4 dark:text-n-7">
                            <strong className="text-n-1 dark:text-white block mb-1">
                                📋 Inspection Mode: All Original Content Formats
                            </strong>
                            Below you can scroll through every content format (Text, Single Image, Multi-Image Carousel, Video, Poll, Link Preview, Locked Post) rendered with its exact original component. Use this to inspect current spacing, layout, and UX before deciding what to modify.
                        </div>

                        {formatKeys.map((f) => renderPostItem(f.key, false))}
                    </div>
                ) : (
                    <div>
                        {renderPostItem(selectedTab, true)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevPlayground;
