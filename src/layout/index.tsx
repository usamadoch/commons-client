





"use client"

import Menu from "./Menu";
import Sidebar from "./Sidebar";
import RightAuthSidebar from "./RightAuthSidebar";
import { RequireAuth, useAuth, hasClientSession } from "@/store/auth";
import { useHydrated } from "@/hooks/useHydrated";

type LayoutProps = {
    children: React.ReactNode;
    requireAuth?: boolean;
};

const Layout = ({
    children,
    requireAuth = true,
}: LayoutProps) => {
    const { mounted } = useHydrated();
    const { isAuthenticated, isLoading } = useAuth();
    const hasSession = hasClientSession();

    // User is considered authenticated if confirmed or loading with an active session hint
    const isAuth = isAuthenticated || (isLoading && hasSession);

    // Right auth sidebar is only shown on public pages for unauthenticated visitors.
    // During SSR and initial hydration pass (!mounted), match the public SSR layout.
    // Once mounted, switch based on actual client auth session state without hydration mismatch.
    const showRightAuthSidebar = !requireAuth && (!mounted ? true : !isAuth);

    const content = (
        <div className="relative flex pl-75 xl:pl-16 md:pl-0 md:pb-16 bg-n-1 min-h-screen">
            <Sidebar />
            <div className="flex flex-col grow w-full min-h-screen md:pt-0 md:min-h-[calc(100vh-4rem)]">
                <div className="flex grow justify-center">
                    <div className="w-full max-w-360 mx-auto pt-6 px-8 2xl:px-6 lg:px-6 md:px-4 mobile:px-3">
                        {showRightAuthSidebar ? (
                            <div className="grid grid-cols-12 gap-8 2xl:gap-6 items-start w-full">
                                <main className="col-span-8 xl:col-span-12 w-full min-w-0 flex justify-center">
                                    {children}
                                </main>
                                <aside className="col-span-4 xl:hidden sticky top-6 flex flex-col min-w-0 w-full z-30">
                                    <RightAuthSidebar />
                                </aside>
                            </div>
                        ) : (
                            <main className="w-full min-w-0 flex justify-center">
                                {children}
                            </main>
                        )}
                    </div>
                </div>
            </div>
            <Menu />
        </div>
    );

    if (requireAuth) {
        return (
            <RequireAuth>
                {content}
            </RequireAuth>
        );
    }

    return content;
};

export default Layout;
