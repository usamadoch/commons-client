"use client";

import Link from "next/link";
import { SolidMembers, SolidExplore } from "@/lib/icons";

const EmptySubscriptions = () => (
    <div className="card shadow-primary-6 border border-n-4 dark:border-n-5 rounded-xl flex flex-col items-center justify-center px-6 py-14 md:py-16 text-center max-w-xl mx-auto">
        {/* Tactile Neobrutalist Icon Badge */}
        <div className="w-16 h-16 mb-5 rounded-xl bg-purple-1 border-2 border-n-1 dark:border-white shadow-primary-4 flex items-center justify-center text-n-1">
            <SolidMembers size={32} className="text-n-1" />
        </div>

        <h3 className="text-h4 font-extrabold text-n-1 dark:text-white mb-2.5">
            Your feed is empty
        </h3>

        <p className="text-n-3 dark:text-n-8 text-sm md:text-base max-w-sm mx-auto mb-7 leading-relaxed">
            You haven&apos;t joined any creators yet. Discover and subscribe to your favorite creators to see their content here.
        </p>

        <Link
            href="/explore"
            className="btn-purple btn-shadow inline-flex items-center justify-center gap-2 px-8 h-12 text-sm font-bold"
        >
            <SolidExplore size={18} className="text-n-1" />
            <span>Explore Creators</span>
        </Link>
    </div>
);

export default EmptySubscriptions;

