"use client";

import React, { useEffect, useRef } from "react";

interface BannerBaseProps {
    bgColor: string;
    className?: string;
    children: (props: { artRef: React.RefObject<HTMLDivElement | null> }) => React.ReactNode;
}

export function BannerActions({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`anim-actions flex items-center gap-2.5 mt-1 flex-wrap ${className}`}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
}

export default function BannerBase({ bgColor, className = "", children }: BannerBaseProps) {
    const bannerRef = useRef<HTMLDivElement>(null);
    const artRef = useRef<HTMLDivElement>(null);

    // Desktop pointer parallax on art illustration
    useEffect(() => {
        if (typeof window === "undefined") return;
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!isFinePointer || prefersReducedMotion) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let animationFrameId: number | null = null;
        let isHovered = false;

        const updateParallax = () => {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;

            if (artRef.current) {
                artRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
            }

            if (isHovered || Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
                animationFrameId = requestAnimationFrame(updateParallax);
            } else {
                if (artRef.current) {
                    artRef.current.style.transform = "translate3d(0, 0, 0)";
                }
                animationFrameId = null;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!bannerRef.current) return;
            const rect = bannerRef.current.getBoundingClientRect();
            const normX = (e.clientX - rect.left) / rect.width - 0.5;
            const normY = (e.clientY - rect.top) / rect.height - 0.5;

            targetX = -normX * 12;
            targetY = -normY * 12;

            isHovered = true;
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateParallax);
            }
        };

        const handleMouseLeave = () => {
            isHovered = false;
            targetX = 0;
            targetY = 0;
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateParallax);
            }
        };

        const el = bannerRef.current;
        if (el) {
            el.addEventListener("mousemove", handleMouseMove);
            el.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (el) {
                el.removeEventListener("mousemove", handleMouseMove);
                el.removeEventListener("mouseleave", handleMouseLeave);
            }
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={bannerRef}
            style={{ backgroundColor: bgColor }}
            className={`relative overflow-hidden w-full h-[240px] min-h-[240px] max-h-[240px] text-[#17161C] border-[2.5px] border-[#17161C] rounded-[14px] shadow-[5px_5px_0_#17161C] select-none ${className}`}
        >
            <style jsx>{`
                @keyframes fade-slide-up {
                    0% {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes art-pop {
                    0% {
                        opacity: 0;
                        transform: scale(0.94);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .anim-title,
                .anim-headline {
                    animation: fade-slide-up 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 100ms both;
                }

                .anim-desc {
                    animation: fade-slide-up 500ms cubic-bezier(0.2, 0.8, 0.2, 1) 220ms both;
                }

                .anim-actions {
                    animation: fade-slide-up 500ms cubic-bezier(0.2, 0.8, 0.2, 1) 340ms both;
                }

                .anim-art {
                    animation: art-pop 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
                }

                .v2-btn {
                    box-shadow: 3px 3px 0 #17161C;
                    transform: translate(0, 0);
                    transition: transform 120ms cubic-bezier(0.2, 0.8, 0.2, 1),
                        box-shadow 120ms cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .v2-btn:hover {
                    transform: translate(1px, 1px);
                    box-shadow: 2px 2px 0 #17161C;
                }

                .v2-btn:active {
                    transform: translate(2px, 2px);
                    box-shadow: 0 0 0 #17161C;
                }

                @media (prefers-reduced-motion: reduce) {
                    .anim-title,
                    .anim-headline,
                    .anim-desc,
                    .anim-actions,
                    .anim-art {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                    .v2-btn {
                        transition: none !important;
                    }
                }
            `}</style>
            {children({ artRef })}
        </div>
    );
}
