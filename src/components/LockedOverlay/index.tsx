import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { LockKeyhole } from "@/lib/icons";
import Loader from "@/components/Loader";

interface LockedOverlayProps {
    type?: 'box' | 'overlay' | 'gradient';
    title?: string;
    text?: string;
    buttonText?: string;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
    isLoading?: boolean;
}

const LockedOverlay = ({
    type = 'overlay',
    title = "Members Only",
    text,
    buttonText = "Join to unlock",
    onClick,
    href,
    isLoading
}: LockedOverlayProps) => {

    const renderButton = () => {
        const className = "btn-purple btn-medium rounded-xs shadow-primary-4 font-bold text-xs text-n-1 px-6 mt-2 relative z-20 cursor-pointer";

        if (href) {
            return (
                <Link href={href} className={className} onClick={(e) => e.stopPropagation()}>
                    {buttonText}
                </Link>
            );
        }

        return (
            <button className={className} onClick={(e) => { e.stopPropagation(); onClick?.(e); }} disabled={isLoading}>
                {isLoading ? <Loader /> : buttonText}
            </button>
        );
    };

    if (type === 'gradient') {
        return (
            <div className="absolute bottom-0 left-0 right-0 h-48 flex flex-col items-center justify-end pb-6 z-10 text-center bg-gradient-to-t from-white via-white/90 to-transparent dark:from-n-2 dark:via-n-2/90">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-n-2 border border-n-1 dark:border-n-6 shadow-primary-4 flex items-center justify-center mb-2">
                    <Icon icon={LockKeyhole} className="w-6 h-6 text-purple-1 fill-current" />
                </div>
                <h3 className="text-base font-extrabold text-n-1 dark:text-n-9 mb-1">{title}</h3>
                {renderButton()}
            </div>
        );
    }

    if (type === 'overlay') {
        return (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 p-6 text-center rounded-sm">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-n-2 border border-n-1 dark:border-n-6 shadow-primary-4 flex items-center justify-center mb-3">
                    <Icon icon={LockKeyhole} className="w-6 h-6 text-purple-1 fill-current" />
                </div>
                <h3 className="text-h6 font-extrabold text-white mb-1">{title}</h3>
                {text && <p className="text-xs font-semibold text-white/90 mb-2 max-w-[18rem]">{text}</p>}
                {renderButton()}
            </div>
        );
    }

    // Box type (like current LockedContent box)
    return (
        <div className="flex flex-row sm:flex-col items-center justify-between p-6 sm:p-3 border-2 rounded-sm border-n-1 dark:border-n-6 bg-white dark:bg-n-2 shadow-primary-4 mt-2 sm:mt-1.5 gap-6 sm:gap-2.5">
            <div className="flex flex-col items-center max-w-[65%] sm:max-w-full">
                <div className="flex items-center gap-2.5 mb-2 sm:mb-1.5">
                    <div className="w-9 h-9 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-n-3 border border-n-1 dark:border-n-6 shadow-primary-4 flex items-center justify-center shrink-0">
                        <Icon icon={LockKeyhole} className="w-4.5 h-4.5 sm:w-3.5 sm:h-3.5 text-purple-1 fill-current" />
                    </div>
                    <h4 className="text-h6 sm:text-sm font-extrabold text-n-1 dark:text-n-9">{title}</h4>
                </div>
                <p className="text-xs font-semibold text-n-4 dark:text-n-8 text-center">
                    {text || "Join this creator's community to access full posts, exclusive media, and comments."}
                </p>
            </div>

            <div className="w-auto sm:w-full flex justify-center shrink-0">
                {href ? (
                    <Link href={href} className="btn-purple btn-medium sm:btn-small rounded-xs shadow-primary-4 font-bold text-xs text-n-1 px-6 sm:px-4 w-auto sm:w-full cursor-pointer" onClick={(e) => e.stopPropagation()}>
                        {buttonText}
                    </Link>
                ) : (
                    <button className="btn-purple btn-medium sm:btn-small rounded-xs shadow-primary-4 font-bold text-xs text-n-1 px-6 sm:px-4 w-auto sm:w-full cursor-pointer" onClick={(e) => { e.stopPropagation(); onClick?.(e); }} disabled={isLoading}>
                        {isLoading ? <Loader /> : buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LockedOverlay;
