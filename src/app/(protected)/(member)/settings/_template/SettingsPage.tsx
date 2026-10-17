"use client"

import { useState } from "react";

import Security from "./sections/Security";
import SocialNetworks from "./sections/SocialNetworks";
import Notifications from "./sections/Notifications";
import MemberAccount from "./sections/MemberAccount";
import CreatorAccount from "./sections/CreatorAccount";

import { usePermission } from "@/hooks/usePermission";


import Tabs from "@/components/Tabs";

const SettingsTabValues = {
    Account: "account",
    Security: "security",
    SocialNetworks: "social-networks",
    Notifications: "notifications",
} as const;

type SettingsTab = typeof SettingsTabValues[keyof typeof SettingsTabValues];

const allTypes: { title: string; value: SettingsTab }[] = [
    { title: "Account", value: "account" },
    { title: "Security", value: "security" },
    { title: "Social Networks", value: "social-networks" },
    { title: "Notifications", value: "notifications" },
];

const SettingsPage = () => {
    const canManagePage = usePermission('page:manage');
    const canManageSecurity = usePermission('security:manage');

    const [type, setType] = useState<SettingsTab>("account");

    const types = allTypes.filter(item => {
        // Social networks specifically for page management
        if (item.value === 'social-networks' && !canManagePage) {
            return false;
        }

        // Security specifically for members (per current logic)
        // If creators should also have it, we would add the permission to them.
        if (item.value === 'security' && !canManageSecurity) {
            return false;
        }

        return true;
    });

    return (
        <div className="pt-4 max-w-4xl w-full mx-auto">
            <div className="flex justify-between mb-6 overflow-x-auto scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
                <Tabs
                    className="flex-nowrap"
                    classButton="whitespace-nowrap"
                    items={types}
                    value={type}
                    setValue={setType as (val: string) => void}
                />
            </div>
            {type === "account" && (canManagePage ? <CreatorAccount /> : <MemberAccount />)}
            {type === "security" && canManageSecurity && <Security />}
            {type === "social-networks" && canManagePage && <SocialNetworks />}
            {type === "notifications" && <Notifications />}
        </div>
    );
};

export default SettingsPage;
