import { Icon } from "@/components/ui/icon";
import { Play } from "@/lib/icons";
import { isEmbeddableUrl, extractYouTubeVideoId, getYouTubeThumbnailUrl, getDomainLabel } from "@/lib/embed";
import { LinkPreview as LinkPreviewType } from "@/types";
import LockedOverlay from "@/components/LockedOverlay";
import Link from "next/link";

interface PostCardLinkPreviewProps {
    linkUrl?: string;
    linkPreview?: LinkPreviewType;
    isLocked?: boolean;
    shareUrl?: string;
    showOverlay?: boolean;
    onClick?: () => void;
}

const PostCardLinkPreview = ({ linkUrl, linkPreview, isLocked, shareUrl, showOverlay = isLocked, onClick }: PostCardLinkPreviewProps) => {
    const isEmbed = linkUrl
        ? isEmbeddableUrl(linkUrl)
        : linkPreview?.isEmbeddable;

    if (isEmbed) {
        let thumbnailUrl = null;
        if (linkUrl) {
            const videoId = extractYouTubeVideoId(linkUrl);
            thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : null;
        } else if (linkPreview) {
            thumbnailUrl = linkPreview.thumbnailUrl || null;
        }

        return (
            <div className="mb-2.5 relative">
                <div className="relative h-96 w-full rounded-md border border-n-1 dark:border-n-6 overflow-hidden bg-black">
                    {thumbnailUrl && (
                        <img
                            src={thumbnailUrl}
                            alt="Video thumbnail"
                            className={`w-full h-full object-cover ${isLocked ? 'opacity-80' : ''}`}
                        />
                    )}
                    {!isLocked && shareUrl && (
                        <Link href={shareUrl} className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                            <Icon icon={Play} className="w-16 h-16 text-white/90 drop-shadow-lg" />
                        </Link>
                    )}
                </div>
                {showOverlay && (
                    <LockedOverlay type="box" title="Members Only Link" onClick={onClick} />
                )}
            </div>
        );
    }

    // Non-embeddable URL: show domain label only
    const domainLabel = linkUrl
        ? getDomainLabel(linkUrl)
        : linkPreview?.domainLabel;

    return (
        <div className="mb-2.5 relative">
            <div className={`w-full p-4 rounded-md border border-n-1 dark:border-n-6 bg-n-2 dark:bg-transparent ${isLocked ? 'blur-[2px] select-none' : 'hover:bg-n-3 dark:hover:bg-n-6/30 transition-colors'}`}>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-primary-1 truncate">{domainLabel || 'External Link'}</span>
                </div>
            </div>
            {showOverlay && (
                <LockedOverlay type="overlay" title="Members Only Link" onClick={onClick} />
            )}
            {!isLocked && shareUrl && (
                <Link
                    href={shareUrl}
                    className="absolute inset-0 rounded-md"
                ></Link>
            )}
        </div>
    );
};

export default PostCardLinkPreview;

