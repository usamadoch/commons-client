"use client";

import Link from "next/link";
import BannerBase, { BannerActions } from "./BannerBase";

export default function PaidPostBanner() {
    return (
        <BannerBase
            bgColor="#FF8A3D"
            className="flex items-center justify-between px-7 mobile:px-4"
        >
            {({ artRef }) => (
                <>
                    {/* Left Content */}
                    <div className="flex-1 flex flex-col items-start justify-center gap-2 z-10 pr-3 mobile:pr-2">
                        <h2
                            className="anim-title font-extrabold text-[25px] md:text-[28px] mobile:text-[20px] leading-[1.15] text-[#17161C] tracking-[-0.01em]"
                            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800 }}
                        >
                            Post once. Get paid every month.
                        </h2>
                        <p
                            className="anim-desc font-normal text-[13.5px] mobile:text-xs text-[#17161C] max-w-xs leading-snug"
                            style={{ fontFamily: "'Figtree', sans-serif" }}
                        >
                            Lock a post, set a price, and fans unlock it with JazzCash, Easypaisa, or card.
                        </p>
                        <BannerActions>
                            <Link
                                href="/register"
                                onClick={(e) => e.stopPropagation()}
                                className="v2-btn inline-flex items-center justify-center min-h-[38px] px-4 bg-[#1B7F4B] text-white border-[2.5px] border-[#17161C] rounded-[10px] font-bold text-[13.5px] mobile:text-xs hover:bg-[#15693d] whitespace-nowrap cursor-pointer"
                                style={{ fontFamily: "'Figtree', sans-serif" }}
                            >
                                Start your page
                            </Link>
                            <Link
                                href="/about"
                                onClick={(e) => e.stopPropagation()}
                                className="font-bold text-[13.5px] mobile:text-xs text-[#17161C] underline underline-offset-4 hover:opacity-80 py-1 px-1 whitespace-nowrap cursor-pointer"
                                style={{ fontFamily: "'Figtree', sans-serif" }}
                            >
                                Learn more
                            </Link>
                        </BannerActions>
                    </div>

                    {/* Right SVG Illustration */}
                    <div
                        ref={artRef}
                        aria-hidden="true"
                        className="anim-art shrink-0 w-[165px] mobile:w-[115px] flex items-center justify-center will-change-transform"
                    >
                        <svg width="210" height="210" viewBox="0 0 210 210" className="w-full h-auto block">
                            <g transform="rotate(3 100 110)">
                                <rect x="18" y="34" width="164" height="150" rx="12" fill="#fff" stroke="#17161C" strokeWidth="3" />
                                <rect x="34" y="52" width="70" height="12" rx="6" fill="#17161C" />
                                <rect x="34" y="78" width="132" height="9" rx="4.5" fill="#D5D0E0" />
                                <rect x="34" y="94" width="132" height="9" rx="4.5" fill="#D5D0E0" />
                                <rect x="34" y="110" width="88" height="9" rx="4.5" fill="#D5D0E0" />
                                <rect
                                    x="34"
                                    y="138"
                                    width="132"
                                    height="32"
                                    rx="8"
                                    fill="#1B7F4B"
                                    stroke="#17161C"
                                    strokeWidth="2.5"
                                />
                                <text
                                    x="100"
                                    y="159"
                                    textAnchor="middle"
                                    fontFamily="'Figtree',sans-serif"
                                    fontWeight="700"
                                    fontSize="13"
                                    fill="#fff"
                                >
                                    Unlock · Rs 500
                                </text>
                            </g>
                            <circle cx="168" cy="38" r="28" fill="#FFD234" stroke="#17161C" strokeWidth="3" />
                            <rect x="154" y="38" width="28" height="22" rx="4" fill="#17161C" />
                            <path d="M159 38v-7a9 9 0 0 1 18 0v7" fill="none" stroke="#17161C" strokeWidth="3.5" />
                            <circle cx="168" cy="49" r="3.5" fill="#FFD234" />
                            <circle cx="30" cy="30" r="12" fill="#FF5C8A" stroke="#17161C" strokeWidth="2.5" />
                            <circle cx="30" cy="30" r="5" fill="#fff" />
                            <path d="M186 160l3-7 3 7 7 3-7 3-3 7-3-7-7-3z" fill="#fff" stroke="#17161C" strokeWidth="2" />
                        </svg>
                    </div>
                </>
            )}
        </BannerBase>
    );
}
