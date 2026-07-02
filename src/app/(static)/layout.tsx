import DraftBanner from "@/layout/DraftBanner";
import StaticHeader from "@/layout/StaticHeader";
import Footer from "@/layout/Footer";
import PublicSidebarWrapper from "@/app/(public)/PublicSidebarWrapper";

const StaticLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PublicSidebarWrapper>
            <div className="min-h-screen flex flex-col bg-background text-base antialiased dark:bg-n-1 w-full">
                <DraftBanner />
                <StaticHeader />
                <main className="flex-1 flex flex-col">
                    {children}
                </main>
                <Footer />
            </div>
        </PublicSidebarWrapper>
    );
};

export default StaticLayout;
