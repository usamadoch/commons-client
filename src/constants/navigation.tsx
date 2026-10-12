import { Permission } from "@/types";
import { LucideIcon } from "lucide-react";
import { 
    SolidDashboard, 
    SolidHome, 
    SolidPosts, 
    SolidMembers, 
    SolidEarnings, 
    SolidExplore, 
    SolidBell, 
    SolidMessages, 
    SolidAnalytics, 
    SolidSettings 
} from "@/lib/icons";

export type NavigationItem = {
    title: string;
    icon: LucideIcon;
    url: string;
    category?: string;
    roles?: string[]; // Keep for backward compatibility if needed, or deprecate
    permissions?: Permission[];
    target?: string;
    counter?: number;
    counterColor?: string;
    suffixIcon?: LucideIcon;
    suffixIconViewBox?: string;
    suffixIconBg?: boolean;
    suffixText?: string;
    suffixUrl?: string;
    /** If true, this route is accessible to guests without auth */
    isPublicRoute?: boolean;
};

export const navigation: NavigationItem[] = [
    // Creator Pages
    {
        title: "Dashboard",
        icon: SolidDashboard,
        url: "/dashboard",
        category: "Creator",
        permissions: ["dashboard:view"],
    },
    {
        title: "Home",
        icon: SolidHome,
        url: "/",
        category: "Discover",
        isPublicRoute: true,
        roles: ["member", "admin"],
    },
    {
        title: "Posts",
        icon: SolidPosts,
        url: "/posts",
        category: "Creator",
        permissions: ["post:create"], // Only creators see "Posts" management
    },
    {
        title: "Members",
        icon: SolidMembers,
        url: "/members",
        category: "Creator",
        permissions: ["members:view"],
    },
    {
        title: "Earnings",
        icon: SolidEarnings,
        url: "/earnings",
        category: "Creator",
        permissions: ["payouts:view"],
    },
    // Member Pages
    {
        title: "Explore",
        icon: SolidExplore,
        url: "/explore",
        category: "Discover",
        isPublicRoute: true,
        roles: ["member", "admin"],
    },

    // Shared Pages
    {
        title: "Notifications",
        icon: SolidBell,
        url: "/notifications",
        category: "General",
        counterColor: "#AE7AFF",
    },
    {
        title: "Messages",
        icon: SolidMessages,
        category: "General",
        counterColor: "#98E9AB",
        url: "/messages",
    },
    {
        title: "Analytics",
        icon: SolidAnalytics,
        url: "/analytics",
        category: "Creator",
        permissions: ["analytics:view"],
    },
    {
        title: "Settings",
        icon: SolidSettings,
        category: "General",
        url: "/settings",
    },
];
