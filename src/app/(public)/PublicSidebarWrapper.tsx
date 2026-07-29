"use client";

import { useAuth } from "@/store/auth";
import Sidebar from "@/layout/Sidebar";
import { ReactNode } from "react";

export default function PublicSidebarWrapper({ children, initialIsAuthenticated }: { children: ReactNode, initialIsAuthenticated?: boolean }) {
    const { isAuthenticated, isLoading } = useAuth();

    // Use initialIsAuthenticated while the client-side auth is loading to prevent blinking
    const isAuth = isLoading ? initialIsAuthenticated : isAuthenticated;

    return (
        <div className={`relative flex w-full flex-col grow ${isAuth ? "pl-16 md:pl-0" : ""}`}>
            {isAuth && <Sidebar isMinimize />}
            <div className="flex flex-col grow w-full min-w-0">
                {children}
            </div>
        </div>
    );
}
