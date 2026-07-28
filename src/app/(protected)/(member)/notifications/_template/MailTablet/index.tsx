import Link from "next/link";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

import { Notification as AppNotification, NotificationType } from "@/types";
import { formatAppDate } from "@/lib/date";
import { User, MessageSquare, MessageCircle, Heart, Clock, Bell } from "lucide-react";

type MailTabletProps = {
    item: AppNotification;
};

const MailTablet = ({ item }: MailTabletProps) => {

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
            case 'new_member': return '/members';
            case 'new_message': return '/messages';
            case 'new_comment':
            case 'new_like':
            case 'post_liked':
                return notification.metadata?.postId ? `/posts/${notification.metadata.postId}` : '#';
            default: return '#';
        }
    };

    return (
        <Link
            className="block px-5 py-3.5 border-b border-n-4 text-sm last:border-none dark:border-n-6"
            href={getNotificationLink(item)}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center font-bold dark:text-n-9">
                    <div className="relative flex items-center justify-center shrink-0 w-8 h-8 mr-3">
                        {getNotificationIcon(item.type)}
                    </div>
                    {item.title || "Notification"}
                </div>
                <div className="text-xs font-medium text-n-3 dark:text-n-8">
                    {formatAppDate(item.createdAt, { suffix: true })}
                </div>
            </div>
            <div className="flex text-n-1 dark:text-n-9 font-medium">
                <div className="truncate">
                    {item.body || item.message}{" "}
                </div>
            </div>
        </Link>
    );
};

export default MailTablet;
