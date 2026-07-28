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
        switch (type) {
            case 'new_member':
                return (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect width="40" height="40" rx="12" fill="#E0F2FE" />
                        <path d="M20 20C22.2091 20 24 18.2091 24 16C24 13.7909 22.2091 12 20 12C17.7909 12 16 13.7909 16 16C16 18.2091 17.7909 20 20 20Z" fill="#0EA5E9" />
                        <path d="M13 28C13 24.134 16.134 21 20 21C23.866 21 27 24.134 27 28" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            case 'new_message':
                return (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect width="40" height="40" rx="12" fill="#DCFCE7" />
                        <path d="M28 20C28 24.4183 24.4183 28 20 28C18.6657 28 17.4077 27.6734 16.31 27.108L12 28L12.892 23.69C12.3266 22.5923 12 21.3343 12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20Z" fill="#22C55E" />
                    </svg>
                );
            case 'new_comment':
                return (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect width="40" height="40" rx="12" fill="#F3E8FF" />
                        <path d="M14 17C14 15.3431 15.3431 14 17 14H27C28.6569 14 30 15.3431 30 17V23C30 24.6569 28.6569 26 27 26H23.4142L20 29.4142L16.5858 26H17C15.3431 26 14 24.6569 14 23V17Z" fill="#A855F7" />
                        <circle cx="19" cy="20" r="1.5" fill="white" />
                        <circle cx="24" cy="20" r="1.5" fill="white" />
                    </svg>
                );
            case 'new_like':
            case 'post_liked':
                return (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect width="40" height="40" rx="12" fill="#FCE7F3" />
                        <path d="M20 27.5L18.55 26.1818C13.4 21.5091 10 18.4182 10 14.6C10 11.5091 12.42 9 15.5 9C17.24 9 18.91 9.80909 20 11.0909C21.09 9.80909 22.76 9 24.5 9C27.58 9 30 11.5091 30 14.6C30 18.4182 26.6 21.5091 21.45 26.1909L20 27.5Z" fill="#EC4899" />
                    </svg>
                );
            case 'membership_expired':
                return (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect width="40" height="40" rx="12" fill="#FFEDD5" />
                        <path d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10Z" stroke="#F97316" strokeWidth="2.5" />
                        <path d="M20 15V20L23.5 23.5" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );
            default:
                return (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect width="40" height="40" rx="12" fill="#E0E7FF" />
                        <path d="M24.8967 22.5029C24.4925 21.8988 24.269 21.1966 24.25 20.47V17.5C24.25 15.1528 22.3472 13.25 20 13.25C17.6528 13.25 15.75 15.1528 15.75 17.5V20.47C15.731 21.1966 15.5075 21.8988 15.1033 22.5029C14.8055 22.9482 15.1246 23.5555 15.6617 23.5555H24.3383C24.8754 23.5555 25.1945 22.9482 24.8967 22.5029Z" fill="#6366F1" />
                        <path d="M22.5 25C22.5 26.3807 21.3807 27.5 20 27.5C18.6193 27.5 17.5 26.3807 17.5 25" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                );
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
