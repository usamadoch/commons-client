"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import LiveTipsBanner from "./banners/LiveTipsBanner";
import UrduFirstBanner from "./banners/UrduFirstBanner";
import PaidPostBanner from "./banners/PaidPostBanner";

interface BannerItem {
    id: "B" | "C" | "D";
    label: string;
    component: React.ReactNode;
}

const BANNERS: BannerItem[] = [
    {
        id: "B",
        label: "Live tips in rupees",
        component: <LiveTipsBanner />,
    },
    {
        id: "C",
        label: "اپنے فینز سے کمائیں",
        component: <UrduFirstBanner />,
    },
    {
        id: "D",
        label: "Paid post, unlocked",
        component: <PaidPostBanner />,
    },
];

export default function BannerCarousel() {
    // C is default (index 1), with B (0) and D (2) around it in an infinite loop
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [direction, setDirection] = useState<"next" | "prev">("next");

    // Drag / Swipe tracking
    const dragStartXRef = useRef<number | null>(null);
    const hasDraggedRef = useRef<boolean>(false);
    const touchStartXRef = useRef<number | null>(null);

    const total = BANNERS.length;

    // Continuous loop next: 0 -> 1 -> 2 -> 0 -> 1 ...
    const goToNext = useCallback(() => {
        setDirection("next");
        setCurrentIndex((prev) => (prev + 1) % total);
    }, [total]);

    // Continuous loop prev: 0 -> 2 -> 1 -> 0 -> 2 ...
    const goToPrev = useCallback(() => {
        setDirection("prev");
        setCurrentIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Auto-advance every 5.5s when not hovered
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            goToNext();
        }, 5500);
        return () => clearInterval(interval);
    }, [isHovered, goToNext]);

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
            dragStartXRef.current = null;
            hasDraggedRef.current = false;
            return;
        }
        dragStartXRef.current = e.clientX;
        hasDraggedRef.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragStartXRef.current === null) return;
        if (Math.abs(e.clientX - dragStartXRef.current) > 10) {
            hasDraggedRef.current = true;
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
            dragStartXRef.current = null;
            hasDraggedRef.current = false;
            return;
        }

        if (dragStartXRef.current !== null) {
            const diff = dragStartXRef.current - e.clientX;
            if (hasDraggedRef.current && Math.abs(diff) > 40) {
                if (diff > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            } else if (!hasDraggedRef.current) {
                // Single clean click advances to next banner
                goToNext();
            }
        }
        dragStartXRef.current = null;
        hasDraggedRef.current = false;
    };

    // Touch swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
            touchStartXRef.current = null;
            return;
        }
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
            touchStartXRef.current = null;
            return;
        }
        if (touchStartXRef.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartXRef.current - touchEndX;

        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
        touchStartXRef.current = null;
    };

    return (
        <div
            className="relative w-full mb-6 select-none cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                dragStartXRef.current = null;
                hasDraggedRef.current = false;
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Promotional Banners Carousel"
        >
            <style jsx>{`
                .banner-viewport {
                    position: relative;
                    width: 100%;
                    height: 240px;
                    overflow: hidden;
                    border-radius: 14px;
                }

                .slide-in-right {
                    animation: slideInFromRight 420ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }

                .slide-in-left {
                    animation: slideInFromLeft 420ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }

                @keyframes slideInFromRight {
                    0% {
                        opacity: 0.3;
                        transform: translate3d(60px, 0, 0);
                    }
                    100% {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes slideInFromLeft {
                    0% {
                        opacity: 0.3;
                        transform: translate3d(-60px, 0, 0);
                    }
                    100% {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .slide-in-right,
                    .slide-in-left {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>

            {/* Banner Viewport */}
            <div className="banner-viewport">
                <div
                    key={currentIndex}
                    className={`w-full will-change-transform ${
                        direction === "next" ? "slide-in-right" : "slide-in-left"
                    }`}
                >
                    {BANNERS[currentIndex].component}
                </div>
            </div>

            {/* Subtle, 3 Vertical Opacitated Indicator Dots */}
            <div
                aria-hidden="true"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
            >
                {BANNERS.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-1.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                                ? "h-3.5 bg-n-1/80 dark:bg-white/90"
                                : "h-1.5 bg-n-1/25 dark:bg-white/30"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
