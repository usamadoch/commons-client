

import Link from "next/link";
import { formatAppDate } from "@/lib/date";
import { Notification as AppNotification, NotificationType } from "@/types";
import { User, MessageSquare, MessageCircle, Heart, Clock, Bell } from "lucide-react";

type MailDesktopProps = {
    item: AppNotification;
};

const MailDesktop = ({ item }: MailDesktopProps) => {

    const getNotificationIcon = (type: NotificationType) => {
        const iconProps = { className: "w-5 h-5" };
        switch (type) {
            case 'new_member':
                return <User {...iconProps} className="w-5 h-5 text-blue-500" />;
            case 'new_message':
                return <MessageSquare {...iconProps} className="w-5 h-5 text-green-500" />;
            case 'new_comment':
                return <MessageCircle {...iconProps} className="w-5 h-5 text-purple-500" />;
            case 'new_like':
            case 'post_liked':
                return <Heart {...iconProps} className="w-5 h-5 text-red-500" />;
            case 'membership_expired':
                return <Clock {...iconProps} className="w-5 h-5 text-orange-500" />;
            default:
                return <Bell {...iconProps} className="w-5 h-5 text-primary-1" />;
        }
    };

    const getNotificationLink = (notification: AppNotification) => {
        if (notification.actionUrl) {
            return notification.actionUrl;
        }

        switch (notification.type) {
            case 'new_member':
                return '/members';
            case 'new_message':
                return '/messages';
            case 'new_comment':
            case 'new_like':
            case 'post_liked':
                return notification.metadata?.postId ? `/posts/${notification.metadata.postId}` : '#';
            default:
                return '#';
        }
    };



    return (
        <div className="flex items-start border-b border-n-4 text-sm last:border-none dark:border-n-6">
            <Link
                href={getNotificationLink(item)}
                className="flex items-start grow p-4"
            >
                <div className="flex items-center shrink-0 pr-4  w-[14.7rem]">
                    <div className="relative flex items-center justify-center shrink-0 w-8 h-8 mr-3 text-h6 dark:text-n-9">
                        {getNotificationIcon(item.type)}
                    </div>
                    {item.title || "Notification"}
                </div>
                <div className="grow pt-1.5 truncate font-medium dark:text-n-9" >
                    {item.body || item.message}{" "}
                </div>
                <div className="shrink-0 w-28 ml-4 pt-1.5 text-right text-n-3 dark:text-n-8">
                    {formatAppDate(item.createdAt, { suffix: true })}
                </div>
            </Link>
        </div>
    );
};

export default MailDesktop;
