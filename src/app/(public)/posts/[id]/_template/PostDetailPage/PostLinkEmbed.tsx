import { Icon } from "@/components/ui/icon";
import { Play, Lock } from "@/lib/icons";
import { isEmbeddableUrl, extractYouTubeVideoId, getYouTubeThumbnailUrl, getDomainLabel } from "@/lib/embed";

interface PostLinkEmbedProps {
    linkUrl?: string;
    linkPreview?: any;
    locked: boolean;
}

const PostLinkEmbed = ({ linkUrl, linkPreview, locked }: PostLinkEmbedProps) => {
    if (!linkUrl && !linkPreview) return null;

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
            <div className="mb-2.5 mt-4 w-full max-w-4xl mx-auto">
                <div className="relative aspect-21/9 w-full rounded-md border border-n-1 dark:border-n-6 overflow-hidden bg-black">
                    {locked ? (
                        <div className="w-full h-full flex items-center justify-center relative">
                            {thumbnailUrl && (
                                <img
                                    src={thumbnailUrl}
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover opacity-30"
                                />
                            )}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                                <Icon icon={Lock} className="w-8 h-8 text-white/80" />
                                <span className="px-3 py-1 bg-black/80 rounded text-sm font-semibold text-white">Members Only</span>
                            </div>
                        </div>
                    ) : (
                        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
                            {thumbnailUrl && (
                                <img
                                    src={thumbnailUrl}
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <Icon icon={Play} className="w-16 h-16 text-white/90 drop-shadow-lg" />
                            </div>
                        </a>
                    )}
                </div>
            </div>
        );
    }

    const domainLabel = linkUrl
        ? getDomainLabel(linkUrl)
        : linkPreview?.domainLabel;

    return (
        <div className="mb-2.5 mt-4 w-full max-w-4xl mx-auto">
            {locked ? (
                <div className="w-full p-4 rounded-md border border-n-1 dark:border-n-6 bg-n-2 dark:bg-transparent flex items-center gap-3">
                    <Icon icon={Lock} className="w-5 h-5 text-n-4 dark:text-n-5 shrink-0" />
                    <span className="text-sm font-medium text-n-4 dark:text-n-7">Members Only Link</span>
                </div>
            ) : (
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-4 rounded-md border border-n-1 dark:border-n-6 bg-n-2 dark:bg-transparent hover:bg-n-3 dark:hover:bg-n-6/30 transition-colors"
                >
                    <div className="text-sm font-medium text-primary-1 truncate">{domainLabel}</div>
                </a>
            )}
        </div>
    );
};

export default PostLinkEmbed;
