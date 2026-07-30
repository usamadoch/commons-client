
"use client"
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import Empty from "@/components/Empty";
import Icon from "@/components/Icon";
import { Notification as AppNotification } from "@/types";

import { useHydrated } from "@/hooks/useHydrated";
import { useNotifications, useMarkNotificationsAsRead } from "@/hooks/queries";

import { useSocket } from "@/store/socket";

import Loader from "@/components/Loader";
import MailTablet from "./MailTablet";
import MailDesktop from "./MailDesktop";

// --- Isolated child: handles responsive rendering only ---
const NotificationList = ({
    notifications,
    mounted,
}: {
    notifications: AppNotification[];
    mounted: boolean;
}) => {
    const isTablet = useMediaQuery({
        query: "(max-width: 1023px)",
    });

    return (
        <div className="card">
            {notifications.map((notification: AppNotification) =>
                mounted && isTablet ? (
                    <MailTablet item={notification} key={notification._id} />
                ) : (
                    <MailDesktop item={notification} key={notification._id} />
                )
            )}
        </div>
    );
};

// --- Main page component ---
const NotificationsPage = () => {
    const { mounted } = useHydrated();
    const { data, isLoading, error } = useNotifications();
    const markAllReadMutation = useMarkNotificationsAsRead();
    const { markAllAsReadLocal, unreadCount } = useSocket();
    const hasMarkedRef = useRef(false);

    const notifications = data?.notifications || [];

    // Extract the stable mutate function from the mutation object
    const { mutate: markAllRead } = markAllReadMutation;

    // Auto-mark as read on visit and whenever unreadCount becomes > 0 while on this page
    useEffect(() => {
        if (unreadCount > 0 || !hasMarkedRef.current) {
            hasMarkedRef.current = true;
            
            // Optimistic update: instantly clear the counter for perfect UX 
            // and to avoid race conditions if the component unmounts before mutation finishes.
            // Added a small delay so the user can visually see the transition when they click.
            setTimeout(() => {
                markAllAsReadLocal();
            }, 600);
            
            // Fire the API request in the background
            markAllRead();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unreadCount]);

    if (isLoading) {
        return (
            <div className="flex grow items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex grow items-center justify-center gap-3">
                <Icon name="info-circle" className="w-6 h-6 fill-n-1 dark:fill-white" />
                <p className="text-n-1 dark:text-white">Failed to load notifications</p>
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <Empty
                title="No notifications yet"
                content="You'll get updates when people join your community, interact with your posts and more."
                imageSvg={
                    <Icon
                        name="notification"
                        className="w-8 h-8 fill-n-1 dark:fill-n-8"
                    />
                }
            />
        );
    }

    return (
        <div className="flex pt-4 lg:block">
            <div className="w-[calc(100%-20rem)] pl-26.5 4xl:w-[calc(100%-14.7rem)] 2xl:pl-10 lg:w-full lg:pl-0">
                <NotificationList notifications={notifications} mounted={mounted} />
            </div>
        </div>
    );
};

export default NotificationsPage;
