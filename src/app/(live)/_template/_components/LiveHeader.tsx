



import Link from "next/link";

import { Copy, Radio, Square, X } from "@/lib/icons";
import { Icon } from "@/components/ui/icon";

type LiveHeaderProps = {
    title?: React.ReactNode;
    duration?: React.ReactNode;
    backHref?: string;
    backTitle?: string;
    rightContent?: React.ReactNode;
    className?: string;
    showCopyLink?: boolean;
    showStartLive?: boolean;
    showEndStream?: boolean;
    startLiveDisabled?: boolean;
    startLiveDisabledReason?: React.ReactNode;
    isEnded?: boolean;
    onCopyLink?: () => void;
    onStartLive?: () => void;
    onEndStream?: () => void;
};

const LiveHeader = ({
    title,
    duration,
    backHref = "/posts",
    backTitle = "Back",
    rightContent,
    className = "",
    showCopyLink,
    showStartLive,
    showEndStream,
    startLiveDisabled,
    startLiveDisabledReason,
    isEnded,
    onCopyLink,
    onStartLive,
    onEndStream,
}: LiveHeaderProps) => {
    return (
        <div className={`flex justify-between items-center shrink-0 pb-4 border-b border-n-4 dark:border-n-6 ${className}`}>
            <div className="flex items-center gap-4">
                <Link
                    href={backHref}
                    className="btn-stroke btn-square btn-medium"
                    title={backTitle}
                >
                    <Icon icon={X} strokeWidth={2.5} className="text-n-1 dark:text-n-9" />
                </Link>
                {(title || duration) && (
                    <div>
                        {title && <div className="text-base font-bold text-n-1 dark:text-n-9">{title}</div>}
                        {duration && <div className="text-xs text-n-4 dark:text-n-7 font-bold">{duration}</div>}
                    </div>
                )}
            </div>

            {(showCopyLink || showStartLive || showEndStream || isEnded || rightContent) && (
                <div className="flex items-center gap-4">
                    {showCopyLink && (
                        <button
                            onClick={onCopyLink}
                            className="btn-stroke btn-medium px-4"
                        >
                            <Icon icon={Copy} className="text-n-1 dark:text-n-9" /> Copy link
                        </button>
                    )}
                    {isEnded ? null : (
                        <>
                            {showStartLive && (
                                <div className="flex items-center gap-3">
                                    {startLiveDisabled && startLiveDisabledReason && (
                                        <span className="text-xs text-pink-1 font-medium">
                                            {startLiveDisabledReason}
                                        </span>
                                    )}
                                    <button
                                        onClick={onStartLive}
                                        disabled={startLiveDisabled}
                                        className="btn-purple btn-medium btn-shadow px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                                    >
                                        <Icon icon={Radio} className="text-n-1" /> Start Live
                                    </button>
                                </div>
                            )}
                            {showEndStream && (
                                <button
                                    onClick={onEndStream}
                                    className="btn-purple btn-medium btn-shadow px-4 cursor-pointer"
                                >
                                    <Icon icon={Square} className="text-n-1" /> End Stream
                                </button>
                            )}
                        </>
                    )}
                    {rightContent}
                </div>
            )}
        </div>
    );
};

export default LiveHeader;
