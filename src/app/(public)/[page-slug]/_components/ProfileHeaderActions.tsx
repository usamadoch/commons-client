




import Link from "next/link";
import ActionMenu from "@/components/ActionMenu";
import LegacyIcon from "@/components/Icon";
import { Share2, Copy } from "@/lib/icons";
import { toast } from "react-hot-toast";

type ProfileHeaderActionsProps = {
    isOwner: boolean;
    isMember: boolean;
    isPendingAuthCheck?: boolean;
    onJoinClick: () => void;
    onShareClick: () => void;
};

const ProfileHeaderActions = ({ isOwner, isMember, isPendingAuthCheck, onJoinClick, onShareClick }: ProfileHeaderActionsProps) => {
    if (isPendingAuthCheck) {
        return (
            <div className="flex shrink-0 max-w-80 w-full mobile:max-w-none">
                <div className="h-10 grow bg-n-3/10 animate-pulse rounded-sm dark:bg-n-7" />
                <div className="ml-2 w-10 h-10 shrink-0 bg-n-3/10 animate-pulse rounded-sm dark:bg-n-7" />
            </div>
        );
    }

    if (isOwner) {
        return (
            <div className="flex shrink-0 max-w-60 w-full mobile:max-w-none">
                <Link href="/settings" className="btn-purple h-10 mobile:h-9 grow">
                    <LegacyIcon name="setup" />
                    <span className="">Edit Profile</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex shrink-0 max-w-80 w-full mobile:max-w-none">
            <button
                className={`btn-purple h-10 mobile:h-9 grow ${isMember ? "opacity-75" : ""}`}
                onClick={isMember ? undefined : onJoinClick}
                disabled={isMember}
            >
                {/* {isMember && <Icon name="check" />} */}
                <span>{isMember ? "Member" : "Become a Member"}</span>
            </button>

            <ActionMenu
                className="ml-2 shrink-0"
                buttonClass="btn-purple h-10 mobile:h-9 px-2 focus:outline-none"
                items={[
                    {
                        icon: Share2,
                        label: "Share",
                        onClick: onShareClick,
                    },
                    {
                        icon: Copy,
                        label: "Copy Link",
                        onClick: () => {
                            if (typeof window !== "undefined") {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success("Profile link copied to clipboard");
                            }
                        },
                    }
                ]}
            />
        </div>
    );
};

export default ProfileHeaderActions;
