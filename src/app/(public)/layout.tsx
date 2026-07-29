



import { CreatorHeaderProvider } from "@/context/CreatorHeaderContext";
import DraftBanner from "@/layout/DraftBanner";
import PublicSidebarWrapper from "./PublicSidebarWrapper";
import { cookies } from "next/headers";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const hasToken = cookieStore.has('refreshToken') || cookieStore.has('accessToken');

    return (
        <CreatorHeaderProvider>
            <PublicSidebarWrapper initialIsAuthenticated={hasToken}>
                <div className="min-h-screen flex flex-col bg-background text-base antialiased dark:bg-n-1 w-full">
                    <DraftBanner />

                    {/* <div className="flex-1 flex flex-col"> */}
                    {children}
                    {/* </div> */}
                </div>
            </PublicSidebarWrapper>
        </CreatorHeaderProvider>
    );
};

export default PublicLayout;