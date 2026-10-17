"use client";

import { useAuth } from "@/store/auth";
import Sidebar from "@/layout/Sidebar";
import { ReactNode } from "react";
import { useHydrated } from "@/hooks/useHydrated";

export default function PublicSidebarWrapper({ children, initialIsAuthenticated }: { children: ReactNode, initialIsAuthenticated?: boolean }) {
    const { isAuthenticated, isLoading } = useAuth();
    const { mounted } = useHydrated();

    // On server and during initial hydration, match static layout
    // Once client mounts, render minimized sidebar for authenticated users
    const isAuth = mounted && !isLoading ? isAuthenticated : Boolean(initialIsAuthenticated);

    return (
        <div className={`relative flex w-full flex-col grow ${isAuth ? "pl-16 md:pl-0" : ""}`}>
            {isAuth && <Sidebar isMinimize />}
            <div className="flex flex-col grow w-full min-w-0">
                {children}
            </div>
        </div>
    );
}
