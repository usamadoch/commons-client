import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { MoreHorizontal } from "@/lib/icons";

import { useNavigation, NavigationItem } from "@/hooks/useNavigation";
import ActionMenu from "@/components/ActionMenu";

import { useState, useMemo } from "react";
import { useAuth } from "@/store/auth";
import LoginModal from "@/components/modals/LoginModal";
import { useHydrated } from "@/hooks/useHydrated";

type MenuProps = {};

const Menu = ({ }: MenuProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const navigationItems = useNavigation();
    const { isAuthenticated } = useAuth();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const { mounted } = useHydrated();

    // Compact Social-Media Mobile Navigation:
    // Priority visible items (Home is must, plus Explore and Notifications):
    // 1. Home ("/" or fallback "/dashboard")
    // 2. Explore ("/explore")
    // 3. Notifications ("/notifications" or fallback "/messages")
    const { visibleItems, hiddenItems } = useMemo(() => {
        const visible: NavigationItem[] = [];
        const hidden: NavigationItem[] = [];

        // 1. Priority slot 1: Home (or Dashboard)
        const homeItem = navigationItems.find((i) => i.url === "/" || i.url === "/dashboard");
        if (homeItem) visible.push(homeItem);

        // 2. Priority slot 2: Explore
        const exploreItem = navigationItems.find((i) => i.url === "/explore");
        if (exploreItem && !visible.some((v) => v.url === exploreItem.url)) {
            visible.push(exploreItem);
        }

        // 3. Priority slot 3: Notifications (or Messages)
        const notifItem = navigationItems.find(
            (i) => i.url === "/notifications" || i.url === "/messages"
        );
        if (notifItem && !visible.some((v) => v.url === notifItem.url)) {
            visible.push(notifItem);
        }

        // Fill up to 3 visible items if any of the above were missing
        for (const item of navigationItems) {
            if (visible.length < 3 && !visible.some((v) => v.url === item.url)) {
                visible.push(item);
            }
        }

        // All remaining items go into hiddenItems (ActionMenu "More")
        for (const item of navigationItems) {
            if (!visible.some((v) => v.url === item.url)) {
                hidden.push(item);
            }
        }

        return { visibleItems: visible, hiddenItems: hidden };
    }, [navigationItems]);

    const moreItems = hiddenItems.map((item) => ({
        label: item.title,
        icon: item.icon,
        onClick: (e: React.MouseEvent) => handleNavClick(e, item),
    }));

    const handleNavClick = (e: React.MouseEvent, link: any) => {
        if (!isAuthenticated && !link.isPublicRoute) {
            e.preventDefault();
            setShowLoginModal(true);
            return;
        }
        router.push(link.url);
    };

    return (
        <>
            <div className="fixed left-0 bottom-0 right-0 z-50 hidden items-center bg-background border-t border-n-4 mobile:flex dark:bg-n-1 dark:border-n-5 h-13 px-1 pb-[env(safe-area-inset-bottom)]">
                {visibleItems.map((link: any, index: number) => {
                    const isActive = pathname === link.url;
                    return (
                        <button
                            className="flex-1 flex justify-center items-center h-full tap-highlight-color transition-colors active:scale-95 cursor-pointer"
                            onClick={(e) => handleNavClick(e, link)}
                            key={index}
                            aria-label={link.title}
                        >
                            <div className="relative flex items-center justify-center py-2">
                                <Icon
                                    className={`icon-22 transition-colors ${isActive ? "text-purple-1!" : "text-n-7 dark:text-n-9"}`}
                                    icon={link.icon}
                                />
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-1 rounded-full" />
                                )}
                            </div>
                        </button>
                    );
                })}
                {hiddenItems.length > 0 && (
                    <div className="flex-1 flex justify-center items-center h-full">
                        {mounted ? (
                            <ActionMenu
                                items={moreItems}
                                className="w-full h-full flex items-center justify-center"
                                buttonClass="flex justify-center items-center w-full h-full tap-highlight-color transition-colors active:scale-95 cursor-pointer"
                                iconName={MoreHorizontal}
                                iconClass={`icon-22 transition-colors ${hiddenItems.some(item => pathname === item.url) ? "text-purple-1!" : "text-n-7 dark:text-n-9"}`}
                                anchor="top end"
                            />
                        ) : (
                            <button className="flex justify-center items-center w-full h-full tap-highlight-color cursor-pointer">
                                <Icon
                                    className={`icon-22 transition-colors ${hiddenItems.some(item => pathname === item.url) ? "text-purple-1!" : "text-n-7 dark:text-n-9"}`}
                                    icon={MoreHorizontal}
                                />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <LoginModal
                visible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
};

export default Menu;

