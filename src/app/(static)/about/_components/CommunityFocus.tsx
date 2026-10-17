"use client";

import { useRef, useState } from "react";
import { Newspaper, Mic, GraduationCap, Gamepad2 } from "@/lib/icons";
import { Icon } from "@/components/ui/icon";
import { RevealStagger, RevealItem } from "./Reveal";
import { useFinePointer } from "./hooks";

const communities = [
    {
        icon: Newspaper,
        title: "Political & Current Affairs",
        description: "Audiences that loyally follow every episode, but have nowhere to back it financially.",
    },
    {
        icon: Mic,
        title: "Religious Scholars & Speakers",
        description: "Running live Q&As, discussions, and exclusive lectures for a devoted community.",
    },
    {
        icon: GraduationCap,
        title: "Teachers & Tutors",
        description: "Building a paying, dedicated student base around lessons and direct access.",
    },
    {
        icon: Gamepad2,
        title: "Gaming & Entertainment",
        description: "Creators with an interactive audience who've been waiting for a Super Chat alternative.",
    },
];

const AudienceCard = ({
    item,
}: {
    item: (typeof communities)[number];
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const finePointer = useFinePointer();
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!finePointer || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        setMousePos(null);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative flex flex-col h-full p-8 rounded-xl border-2 border-n-6 bg-n-2 overflow-hidden transition-all duration-150 ease-out shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,0.3)]"
        >
            {/* Desktop Spotlight highlight on border / surface */}
            {mousePos && finePointer && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(174,122,255,0.18), transparent 70%)`,
                    }}
                />
            )}

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon box */}
                <div className="w-13 h-13 rounded-sm border border-n-6 bg-n-3 text-n-9 flex items-center justify-center mb-6 shadow-primary-4 shrink-0">
                    <Icon icon={item.icon} size={24} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-xl md:text-lg text-n-9 tracking-tight mb-3">
                    {item.title}
                </h3>

                {/* Description */}
                <p className="text-base text-n-8 leading-[1.6] text-pretty mt-auto">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

const CommunityFocus = () => {
    return (
        <section aria-labelledby="audiences-heading" className="w-full py-32 md:py-20 border-b border-n-6">
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3">
                <div className="max-w-3xl mb-16 md:mb-12">
                    <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-purple-1 mb-4 block">
                        Who Commons Is For
                    </span>
                    <h2
                        id="audiences-heading"
                        className="font-extrabold text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-balance text-n-9 mb-4"
                    >
                        Built for communities.
                    </h2>
                    <p className="text-xl md:text-lg text-n-8 leading-[1.6]">
                        For creators whose audience already wants to support them.
                    </p>
                </div>

                {/* 4 col desktop, 2 col xl/tablet, 1 col mobile */}
                <RevealStagger className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 gap-6 items-stretch">
                    {communities.map((community, index) => (
                        <RevealItem key={index} className="h-full">
                            <AudienceCard item={community} />
                        </RevealItem>
                    ))}
                </RevealStagger>
            </div>
        </section>
    );
};

export default CommunityFocus;
