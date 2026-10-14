"use client";

import Link from "next/link";
import BannerBase, { BannerActions } from "./BannerBase";

export default function LiveTipsBanner() {
    return (
        <BannerBase
            bgColor="#3CC7D9"
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
                            Every tip lands in rupees.
                        </h2>
                        <p
                            className="anim-desc font-normal text-[13.5px] mobile:text-xs text-[#17161C] max-w-xs leading-snug"
                            style={{ fontFamily: "'Figtree', sans-serif" }}
                        >
                            Go live. Fans send Super Messages with JazzCash or Easypaisa.
                        </p>
                        <BannerActions>
                            <Link
                                href="/live"
                                onClick={(e) => e.stopPropagation()}
                                className="v2-btn inline-flex items-center justify-center min-h-[38px] px-4 bg-[#17161C] text-white border-[2.5px] border-[#17161C] rounded-[10px] font-bold text-[13.5px] mobile:text-xs hover:bg-[#26242e] whitespace-nowrap cursor-pointer"
                                style={{ fontFamily: "'Figtree', sans-serif" }}
                            >
                                Go live on Commons
                            </Link>
                            <Link
                                href="/about"
                                onClick={(e) => e.stopPropagation()}
                                className="font-bold text-[13.5px] mobile:text-xs text-[#17161C] underline underline-offset-4 hover:opacity-80 py-1 px-1 whitespace-nowrap cursor-pointer"
                                style={{ fontFamily: "'Figtree', sans-serif" }}
                            >
                                See how tips work
                            </Link>
                        </BannerActions>
                    </div>

                    {/* Right SVG Illustration */}
                    <div
                        ref={artRef}
                        aria-hidden="true"
                        className="anim-art shrink-0 w-[160px] mobile:w-[115px] flex items-center justify-center will-change-transform"
                    >
                        <svg width="200" height="210" viewBox="0 0 200 210" className="w-full h-auto block">
                            <rect x="8" y="14" width="86" height="164" rx="14" fill="#fff" stroke="#17161C" strokeWidth="3" />
                            <rect x="15" y="28" width="72" height="136" rx="7" fill="#17161C" />
                            <rect x="20" y="34" width="36" height="16" rx="8" fill="#D7263D" />
                            <text
                                x="38"
                                y="46"
                                textAnchor="middle"
                                fontFamily="'Figtree',sans-serif"
                                fontWeight="700"
                                fontSize="10"
                                fill="#fff"
                            >
                                LIVE
                            </text>
                            <circle cx="51" cy="98" r="18" fill="#FFD234" stroke="#fff" strokeWidth="2.5" />
                            <path d="M22 160c2-24 14-34 29-34s27 10 29 34z" fill="#FF5C8A" stroke="#fff" strokeWidth="2.5" />
                            <g stroke="#17161C" strokeWidth="2.5">
                                <rect x="72" y="18" width="122" height="40" rx="10" fill="#FFD234" />
                                <rect x="80" y="74" width="114" height="40" rx="10" fill="#fff" />
                                <rect x="72" y="130" width="122" height="40" rx="10" fill="#FF5C8A" />
                            </g>
                            <g fontFamily="'Figtree',sans-serif" fill="#17161C" stroke="none">
                                <text x="82" y="36" fontWeight="700" fontSize="14">Rs 200</text>
                                <text x="82" y="51" fontSize="11.5">Keep going!</text>
                                <text x="90" y="92" fontWeight="700" fontSize="14">Rs 500</text>
                                <text x="90" y="107" fontSize="11.5">Love this</text>
                                <text x="82" y="148" fontWeight="700" fontSize="14">Rs 1,000</text>
                                <text x="82" y="163" fontSize="11.5">Thank you</text>
                            </g>
                            <path d="M176 190l3-7 3 7 7 3-7 3-3 7-3-7-7-3z" fill="#fff" stroke="#17161C" strokeWidth="2" />
                        </svg>
                    </div>
                </>
            )}
        </BannerBase>
    );
}
