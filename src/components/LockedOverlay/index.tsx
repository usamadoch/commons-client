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
        const className = "btn-purple btn-medium rounded-sm px-6 mt-2 relative z-20";

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
            <div className="absolute bottom-0 left-0 right-0 h-48 flex flex-col items-center justify-end pb-6 z-10 text-center">
                <div className="w-10 h-10 rounded-full bg-n-1 flex items-center justify-center mb-2 shadow-md">
                    <Icon icon={LockKeyhole} className="w-5 h-5 text-purple-1 fill-current" />
                </div>
                <h3 className="text-base font-bold text-n-9 dark:text-n-1 mb-1">{title}</h3>
                {renderButton()}
            </div>
        );
    }

    if (type === 'overlay') {
        return (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 p-6 text-center rounded-sm">
                <div className="w-12 h-12 rounded-full bg-n-9 flex items-center justify-center mb-3">
                    <Icon icon={LockKeyhole} className="w-6 h-6 text-purple-1 fill-current" />
                </div>
                <h3 className="text-h6 dark:text-n-9 mb-1 drop-shadow-md">{title}</h3>
                {text && <p className="text-sm dark:text-n-8 mb-2 drop-shadow-md">{text}</p>}
                {renderButton()}
            </div>
        );
    }

    // Box type (like current LockedContent box)
    return (
        <div className="flex flex-col md:flex-row items-center justify-between text-center p-8 border rounded-md border-n-1 dark:border-n-6 dark:bg-n-3 mt-2.5 md:p-12 bg-n-1/5 gap-6">
            <div className="flex flex-col items-center md:items-start max-w-full md:max-w-[60%]">
                <div className="flex items-center gap-3 mb-2">
                    <Icon icon={LockKeyhole} className="w-5 h-5 text-purple-1" />
                    <h4 className="text-h6 dark:text-n-9">{title}</h4>
                </div>
                <p className="text-n-4 text-center md:text-left dark:text-n-8">{text || "Join this creator's community to access full posts, excessive media, and comments."}</p>
            </div>

            <div className="w-full md:w-auto flex justify-center">
                {href ? (
                    <Link href={href} className="btn-purple btn-medium px-8 w-full md:w-auto" onClick={(e) => e.stopPropagation()}>
                        {buttonText}
                    </Link>
                ) : (
                    <button className="btn-purple btn-medium px-8 w-full md:w-auto" onClick={(e) => { e.stopPropagation(); onClick?.(e); }} disabled={isLoading}>
                        {isLoading ? <Loader /> : buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LockedOverlay;
