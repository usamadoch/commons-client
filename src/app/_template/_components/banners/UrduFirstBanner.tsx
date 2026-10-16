"use client";

import Link from "next/link";
import BannerBase, { BannerActions } from "./BannerBase";

export default function UrduFirstBanner() {
    return (
        <BannerBase
            bgColor="#FF5C8A"
            className="flex items-center justify-between px-7 mobile:px-4"
        >
            {({ artRef }) => (
                <>
                    {/* Top Right Decorative Corner Stamp */}
                    <svg
                        className="absolute -right-5 -top-5 w-[76px] h-[76px] pointer-events-none z-10"
                        viewBox="0 0 76 76"
                        aria-hidden="true"
                    >
                        <circle cx="38" cy="38" r="36" fill="#FFD234" stroke="#17161C" strokeWidth="2.5" />
                        <circle cx="38" cy="38" r="23" fill="#D7263D" stroke="#17161C" strokeWidth="2.5" />
                        <circle cx="38" cy="38" r="10" fill="#fff" stroke="#17161C" strokeWidth="2.5" />
                    </svg>

                    {/* Left Art Illustration */}
                    <div
                        ref={artRef}
                        aria-hidden="true"
                        className="anim-art shrink-0 w-[160px] mobile:w-[115px] flex items-center justify-center will-change-transform"
                    >
                        <svg viewBox="0 0 210 240" className="w-full h-auto block">
                            <circle cx="105" cy="128" r="86" fill="#0D5C63" stroke="#17161C" strokeWidth="2.5" />
                            <path d="M30 52l4-9 4 9 9 4-9 4-4 9-4-9-9-4z" fill="#fff" stroke="#17161C" strokeWidth="2" />
                            <path d="M178 70l3-7 3 7 7 3-7 3-3 7-3-7-7-3z" fill="#FFD234" stroke="#17161C" strokeWidth="2" />
                            <g transform="rotate(-8 105 118)">
                                <rect x="62" y="40" width="84" height="146" rx="14" fill="#fff" stroke="#17161C" strokeWidth="3" />
                                <rect x="70" y="56" width="68" height="112" rx="7" fill="#F4EFFF" />
                                <rect x="75" y="64" width="58" height="32" rx="7" fill="#1B7F4B" stroke="#17161C" strokeWidth="2" />
                                <text
                                    x="104"
                                    y="85"
                                    textAnchor="middle"
                                    fontFamily="'Figtree',sans-serif"
                                    fontWeight="700"
                                    fontSize="15"
                                    fill="#fff"
                                >
                                    Rs 500
                                </text>
                                <rect x="75" y="106" width="58" height="8" rx="4" fill="#C9C4DA" />
                                <rect x="75" y="120" width="40" height="8" rx="4" fill="#C9C4DA" />
                                <path
                                    d="M104 152s-13-8-13-17a7 7 0 0 1 13-3 7 7 0 0 1 13 3c0 9-13 17-13 17z"
                                    fill="#D7263D"
                                    stroke="#17161C"
                                    strokeWidth="2"
                                />
                            </g>
                            <g stroke="#17161C" strokeWidth="2.5">
                                <rect x="128" y="204" width="58" height="13" fill="#FFD234" />
                                <ellipse cx="157" cy="217" rx="29" ry="8" fill="#FFD234" />
                                <rect x="128" y="191" width="58" height="13" fill="#FFD234" />
                                <ellipse cx="157" cy="204" rx="29" ry="8" fill="#FFD234" />
                                <rect x="128" y="178" width="58" height="13" fill="#FFD234" />
                                <ellipse cx="157" cy="191" rx="29" ry="8" fill="#FFE680" />
                            </g>
                            <circle cx="38" cy="208" r="17" fill="#D7263D" stroke="#17161C" strokeWidth="2.5" />
                            <circle cx="38" cy="208" r="10" fill="#FFD234" stroke="#17161C" strokeWidth="2" />
                            <circle cx="38" cy="208" r="4" fill="#fff" />
                        </svg>
                    </div>

                    {/* Right Copy Content */}
                    <div className="flex-1 flex flex-col items-end justify-center gap-2 z-10 pl-3 mobile:pl-2 text-right">
                        <h2
                            lang="ur"
                            dir="rtl"
                            className="anim-headline font-bold text-[34px] mobile:text-[24px] leading-[1.8] text-[#17161C] whitespace-nowrap overflow-visible"
                            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                        >
                            اپنے فینز سے کمائیں
                        </h2>
                        <p
                            className="anim-desc font-normal text-[13.5px] mobile:text-xs text-[#17161C] max-w-xs leading-snug"
                            style={{ fontFamily: "'Figtree', sans-serif" }}
                        >
                            Memberships, paid posts, and live tips, in rupees.
                        </p>
                        <BannerActions className="justify-end">
                            <Link
                                href="/about"
                                onClick={(e) => e.stopPropagation()}
                                className="font-bold text-[13.5px] mobile:text-xs text-[#17161C] underline underline-offset-4 hover:opacity-80 py-1 px-1 whitespace-nowrap cursor-pointer"
                                style={{ fontFamily: "'Figtree', sans-serif" }}
                            >
                                Learn more
                            </Link>
                            <Link
                                href="/register"
                                onClick={(e) => e.stopPropagation()}
                                className="v2-btn inline-flex items-center justify-center min-h-[38px] px-4 bg-[#0D5C63] text-white border-[2.5px] border-[#17161C] rounded-[10px] font-bold text-[13.5px] mobile:text-xs hover:bg-[#0b4e54] whitespace-nowrap cursor-pointer"
                                style={{ fontFamily: "'Figtree', sans-serif" }}
                            >
                                Start your page
                            </Link>
                        </BannerActions>
                    </div>
                </>
            )}
        </BannerBase>
    );
}
