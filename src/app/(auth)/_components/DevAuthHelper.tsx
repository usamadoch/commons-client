"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import Loader from "@/components/Loader";
import { Icon } from "@/components/ui/icon";
import { ChevronDown, ChevronUp, User as UserIcon, Check } from "@/lib/icons";

export interface DevUser {
    label: string;
    email: string;
    password?: string;
    role: "creator" | "member";
    roleBadge: string;
    description: string;
}

export const DEV_EXISTING_USERS: DevUser[] = [
    {
        label: "Alice Creator",
        email: "creator_a@test.com",
        password: "Password123!",
        role: "creator",
        roleBadge: "Creator",
        description: "Digital artist (Dashboard)",
    },
    {
        label: "Bob Creator",
        email: "creator_b@test.com",
        password: "Password123!",
        role: "creator",
        roleBadge: "Creator",
        description: "Tech builder (Dashboard)",
    },
    {
        label: "Member 1",
        email: "member1@test.com",
        password: "Password123!",
        role: "member",
        roleBadge: "Member",
        description: "Active subscriber (Feed)",
    },
    {
        label: "Member 2",
        email: "member2@test.com",
        password: "Password123!",
        role: "member",
        roleBadge: "Member",
        description: "Community fan (Feed)",
    },
];

interface DevAuthHelperProps {
    page: "login" | "register";
    onFillRandomMember?: (user: {
        email: string;
        displayName: string;
        password: string;
    }) => void;
    onFillRandomCreator?: (user: {
        email: string;
        displayName: string;
        password: string;
        creatorName: string;
        pageSlug: string;
        category: string[];
    }) => void;
    onFillExistingUser?: (user: {
        email: string;
        password: string;
        role: "creator" | "member";
        label: string;
    }) => void;
}

export const DevAuthHelper: React.FC<DevAuthHelperProps> = ({
    page,
    onFillRandomMember,
    onFillRandomCreator,
    onFillExistingUser,
}) => {
    // Check dev playground flag
    const isDevEnabled = process.env.NEXT_PUBLIC_DEV_PLAYGROUND === "true";
    const router = useRouter();
    const { login } = useAuth();

    const [isExpanded, setIsExpanded] = useState(true);
    const [authenticatingEmail, setAuthenticatingEmail] = useState<string | null>(null);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);

    if (!isDevEnabled) {
        return null;
    }

    const triggerNotification = (msg: string) => {
        setNotificationMessage(msg);
        setTimeout(() => setNotificationMessage(null), 3000);
    };

    const handleRandomMemberClick = () => {
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const userData = {
            email: `member_${randomId}@test.com`,
            displayName: `Member ${randomId}`,
            password: "Password123!",
        };

        if (onFillRandomMember) {
            onFillRandomMember(userData);
            triggerNotification(`Filled form with Member #${randomId}`);
        } else if (page === "register") {
            router.push(`/login?devFill=member_${randomId}`);
        }
    };

    const handleRandomCreatorClick = () => {
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const creatorData = {
            email: `creator_${randomId}@test.com`,
            displayName: `Creator ${randomId}`,
            password: "Password123!",
            creatorName: `Studio ${randomId}`,
            pageSlug: `studio-${randomId}`,
            category: ["Technology", "Design"],
        };

        if (onFillRandomCreator) {
            onFillRandomCreator(creatorData);
            triggerNotification(`Filled form with Creator #${randomId}`);
        } else if (page === "login") {
            try {
                sessionStorage.setItem("commons_register_draft", JSON.stringify(creatorData));
            } catch {
                // ignore storage error
            }
            router.push(`/register?devFill=creator_${randomId}`);
        }
    };

    const handleQuickLogin = async (user: DevUser) => {
        setLoginError(null);
        setAuthenticatingEmail(user.email);
        try {
            await login({
                email: user.email,
                password: user.password || "password123",
            }, { redirect: true });
        } catch (err: any) {
            console.error("Dev quick login failed", err);
            setLoginError(err?.message || "Login failed. Ensure backend seed data exists.");
            setAuthenticatingEmail(null);
        }
    };

    const handleFillExisting = (user: DevUser) => {
        setLoginError(null);
        if (onFillExistingUser) {
            onFillExistingUser({
                email: user.email,
                password: user.password || "password123",
                role: user.role,
                label: user.label,
            });
            triggerNotification(`Filled credentials for ${user.label}`);
        } else if (page === "register") {
            // If on register and clicking to fill existing user, direct to login
            router.push(`/login?devEmail=${encodeURIComponent(user.email)}`);
        }
    };

    return (
        <div className="w-full mb-6 text-left border-2 border-n-1 dark:border-n-6 bg-[#FEFAED] dark:bg-n-2 rounded-lg shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.25)] transition-all overflow-hidden">
            {/* Header / Toggle Bar */}
            <div
                className="flex items-center justify-between px-3.5 py-2.5 bg-yellow-1 dark:bg-n-3 border-b-2 border-n-1 dark:border-n-6 cursor-pointer select-none"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-xs bg-n-1 text-yellow-1 font-black text-xs">
                        ⚡
                    </span>
                    <span className="font-extrabold text-xs tracking-wider uppercase text-n-1 dark:text-white">
                        Dev Playground Auth
                    </span>
                    <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-xs bg-n-1/10 dark:bg-white/10 text-n-1 dark:text-white border border-n-1/20 dark:border-white/20">
                        {page.toUpperCase()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {notificationMessage && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 dark:text-green-300 bg-white/80 dark:bg-black/50 px-2 py-0.5 rounded-xs border border-green-600/30">
                            <Icon icon={Check} className="w-3 h-3" />
                            {notificationMessage}
                        </span>
                    )}
                    <button
                        type="button"
                        className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors text-n-1 dark:text-white"
                        aria-label={isExpanded ? "Collapse Dev Bar" : "Expand Dev Bar"}
                    >
                        <Icon icon={isExpanded ? ChevronUp : ChevronDown} className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="p-3.5 space-y-3.5 text-xs">
                    {loginError && (
                        <div className="p-2.5 bg-pink-1/20 border border-pink-1 rounded text-n-1 dark:text-white font-medium text-[11px]">
                            ⚠️ {loginError}
                        </div>
                    )}

                    {/* Section 1: Quick Fill Random Users */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-[11px] uppercase tracking-wide text-n-3 dark:text-n-6">
                                🎲 Fill Random Credentials
                            </span>
                            <span className="text-[10px] text-n-3 dark:text-n-8">
                                One-click test inputs
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={handleRandomMemberClick}
                                className="inline-flex items-center justify-center gap-1.5 h-9 px-2.5 bg-white dark:bg-n-3 border border-n-1 dark:border-n-6 rounded-xs font-bold text-xs text-n-1 dark:text-white hover:bg-yellow-2 dark:hover:bg-n-4 transition-colors shadow-[1.5px_1.5px_0px_0px_#000000] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                            >
                                <span className="text-sm">👤</span>
                                <span>Random Member</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleRandomCreatorClick}
                                className="inline-flex items-center justify-center gap-1.5 h-9 px-2.5 bg-white dark:bg-n-3 border border-n-1 dark:border-n-6 rounded-xs font-bold text-xs text-n-1 dark:text-white hover:bg-yellow-2 dark:hover:bg-n-4 transition-colors shadow-[1.5px_1.5px_0px_0px_#000000] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                            >
                                <span className="text-sm">👑</span>
                                <span>Random Creator</span>
                            </button>
                        </div>
                    </div>

                    {/* Section 2: Seed / Existing Users */}
                    <div className="pt-2 border-t border-n-1/15 dark:border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-[11px] uppercase tracking-wide text-n-3 dark:text-n-6">
                                ⚡ Existing Users ({DEV_EXISTING_USERS.length})
                            </span>
                            <span className="text-[10px] text-n-3 dark:text-n-8">
                                Instant Login or Fill
                            </span>
                        </div>
                        <div className="space-y-1.5">
                            {DEV_EXISTING_USERS.map((user) => {
                                const isLoadingThis = authenticatingEmail === user.email;
                                return (
                                    <div
                                        key={user.email}
                                        className="flex items-center justify-between p-1.5 px-2 bg-white/70 dark:bg-n-3/60 border border-n-1/20 dark:border-white/10 rounded-xs hover:border-n-1 dark:hover:border-white/40 transition-colors"
                                    >
                                        <div className="min-w-0 flex-1 pr-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-bold text-xs truncate text-n-1 dark:text-white">
                                                    {user.label}
                                                </span>
                                                <span
                                                    className={`text-[9px] font-black uppercase px-1 py-0.25 rounded-xs border ${user.role === "creator"
                                                            ? "bg-purple-1/20 text-purple-600 dark:text-purple-300 border-purple-1"
                                                            : "bg-green-1/20 text-green-700 dark:text-green-300 border-green-1"
                                                        }`}
                                                >
                                                    {user.roleBadge}
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-n-3 dark:text-n-8 truncate font-mono">
                                                {user.email}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => handleFillExisting(user)}
                                                title={`Fill credentials for ${user.label}`}
                                                className="px-2 py-1 text-[11px] font-bold border border-n-1 dark:border-n-6 rounded-xs bg-white dark:bg-n-2 text-n-1 dark:text-white hover:bg-n-1 hover:text-white dark:hover:bg-white dark:hover:text-n-1 transition-colors cursor-pointer"
                                            >
                                                Fill
                                            </button>
                                            <button
                                                type="button"
                                                disabled={!!authenticatingEmail}
                                                onClick={() => handleQuickLogin(user)}
                                                title={`1-Click login as ${user.label}`}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-n-1 dark:bg-white text-white dark:text-n-1 rounded-xs hover:bg-n-1/80 dark:hover:bg-white/90 transition-colors shadow-[1px_1px_0px_0px_#000000] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.4)] disabled:opacity-50 cursor-pointer"
                                            >
                                                {isLoadingThis ? (
                                                    <Loader className="w-3.5 h-3.5 text-inherit" />
                                                ) : (
                                                    <span>⚡ Login</span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevAuthHelper;
