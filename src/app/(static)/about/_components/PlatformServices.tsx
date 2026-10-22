"use client";

import Link from "next/link";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

interface ServiceItem {
    id: string;
    num: string;
    title: string;
    category: string;
    price: string;
    delivery: string;
    description: string;
}

const servicesData: ServiceItem[] = [
    {
        id: "svc-1",
        num: "01",
        title: "Monthly Creator Memberships",
        category: "Recurring Subscription",
        price: "From PKR 200 / month",
        delivery: "Instant Digital Unlock",
        description:
            "Recurring monthly tier subscription granting supporters immediate digital access to creator-exclusive posts, private updates, and premium feeds.",
    },
    {
        id: "svc-2",
        num: "02",
        title: "Annual Creator Memberships",
        category: "Yearly Subscription Pass",
        price: "From PKR 2,000 / year",
        delivery: "Instant 365-Day Access",
        description:
            "12-month upfront membership pass providing continuous, uninterrupted access to all creator tier perks with built-in discount savings.",
    },
    {
        id: "svc-3",
        num: "03",
        title: "Super Messages (Live Stream Tips)",
        category: "Real-Time Interaction",
        price: "PKR 100 – PKR 10,000 / message",
        delivery: "Instant Live On-Screen Display",
        description:
            "Fixed-price highlighted chat messages delivered in real time and pinned to the top of creator live broadcasts to guarantee audience visibility.",
    },
    {
        id: "svc-4",
        num: "04",
        title: "1-on-1 Direct Creator Messaging",
        category: "Private Communication",
        price: "Included with Tier (from PKR 500/mo)",
        delivery: "Immediate Inbox Activation",
        description:
            "Direct two-way messaging channel enabling private conversations, personal feedback, and one-on-one connections between creator and subscriber.",
    },
    {
        id: "svc-5",
        num: "05",
        title: "Exclusive Community Chat Rooms",
        category: "Community Access",
        price: "Included with Tier (from PKR 200/mo)",
        delivery: "Instant Channel Access",
        description:
            "Subscriber-only discussion channels and group chat spaces for dedicated fan communities to connect and discuss creator topics.",
    },
    {
        id: "svc-6",
        num: "06",
        title: "Paywalled Media & Premium Posts",
        category: "Digital Content Access",
        price: "Included with Tier Access",
        delivery: "Instant Browser Streaming",
        description:
            "Access to paywalled creative posts, high-resolution photo sets, behind-the-scenes writing, and downloadable project materials.",
    },
    {
        id: "svc-7",
        num: "07",
        title: "HD Live Streaming & Interactive Rooms",
        category: "Streaming Media Service",
        price: "Free & Tier-Gated Broadcasts",
        delivery: "Instant Low-Latency Playback",
        description:
            "High-definition video broadcasting with live chat moderation, viewer presence counters, and real-time interactive audience engagement.",
    },
    {
        id: "svc-8",
        num: "08",
        title: "Creator Monetization & Analytics Studio",
        category: "Platform Business Toolkit",
        price: "Flat 9% Platform Cut (Keep 91%)",
        delivery: "Immediate Dashboard Access",
        description:
            "Comprehensive creator studio with subscriber analytics, revenue tracking, member rosters, and automated PKR payouts directly to Pakistani banks and wallets.",
    },
];

const PlatformServices = () => {
    return (
        <section
            id="services"
            aria-labelledby="services-heading"
            className="w-full py-28 md:py-16 border-b border-n-6 bg-n-1 text-n-9"
        >
            <div className="mx-auto w-full max-w-[90rem] px-16 2xl:px-10 lg:px-8 md:px-5 mobile:px-3">
                {/* Header */}
                <div className="max-w-3xl mb-16 md:mb-10">
                    <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-purple-1 mb-3 block">
                        Commercial Offerings & Catalog
                    </span>
                    <h2
                        id="services-heading"
                        className="font-extrabold text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-balance text-n-9 mb-4"
                    >
                        Products & Services Catalog
                    </h2>
                    <p className="text-xl md:text-base text-n-8 leading-[1.6] max-w-[62ch]">
                        All offerings on Commons are 100% digital goods and services priced transparently in Pakistani Rupees (PKR) with instant electronic fulfillment.
                    </p>
                </div>

                {/* 8-Service Neobrutalist Grid */}
                <RevealStagger className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 gap-6">
                    {servicesData.map((svc) => (
                        <RevealItem
                            key={svc.id}
                            className="flex flex-col justify-between p-6 rounded-xl border-2 border-n-6 bg-n-2/60 hover:border-purple-1 hover:bg-n-2 transition-all duration-200 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]"
                        >
                            <div>
                                {/* Top Tag & Number */}
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-n-6">
                                    <span className="text-xs font-mono font-bold text-purple-1 tracking-wider">
                                        {svc.num}
                                    </span>
                                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-n-3 border border-n-5 text-n-8">
                                        {svc.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-n-9 tracking-tight mb-2">
                                    {svc.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-n-8 leading-relaxed mb-6">
                                    {svc.description}
                                </p>
                            </div>

                            {/* Bottom Pricing & Delivery Meta */}
                            <div className="pt-4 border-t border-n-6 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-n-7 font-medium">Pricing:</span>
                                    <span className="font-bold text-purple-1">{svc.price}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-n-7 font-medium">Delivery:</span>
                                    <span className="font-mono text-n-9 text-[11px]">{svc.delivery}</span>
                                </div>
                            </div>
                        </RevealItem>
                    ))}
                </RevealStagger>

                {/* Policy Footer Note */}
                <div className="mt-12 p-6 rounded-xl border-2 border-n-6 bg-n-2 flex items-center justify-between gap-6 md:flex-col md:items-start">
                    <div className="text-sm text-n-8">
                        <strong className="text-n-9 font-bold">100% Digital Delivery:</strong> All memberships and Super Messages are fulfilled electronically and instantly upon payment confirmation. Review our{" "}
                        <Link href="/delivery-policy" className="text-purple-1 font-semibold hover:underline">
                            Shipping & Service Delivery Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/cancellation-refund" className="text-purple-1 font-semibold hover:underline">
                            Cancellation & Refund Policy
                        </Link>
                        .
                    </div>
                    <Link
                        href="/register"
                        className="shrink-0 px-5 py-2.5 rounded-xs bg-purple-1 border-2 border-n-1 text-n-1 font-bold text-sm tracking-wide shadow-[3px_3px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0_#000] transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PlatformServices;
