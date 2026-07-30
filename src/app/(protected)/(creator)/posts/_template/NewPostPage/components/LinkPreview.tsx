import { Icon as LucideIcon } from "@/components/ui/icon";
import { Trash2 } from "@/lib/icons";
import { isEmbeddableUrl, toYouTubeEmbedUrl, getDomainLabel } from "@/lib/embed";

type LinkPreviewProps = {
    url: string;
    onRemove: () => void;
};

const LinkPreview = ({ url, onRemove }: LinkPreviewProps) => {
    const RemoveButton = () => (
        <button
            className="absolute top-2 right-2 z-10 btn-medium btn-stroke btn-square rounded-full bg-white dark:bg-n-1 cursor-pointer flex items-center justify-center"
            onClick={onRemove}
            type="button"
        >
            <LucideIcon icon={Trash2} size={16} className="fill-n-1 dark:fill-n-9 text-n-1 dark:text-n-9" />
        </button>
    );

    // Non-embeddable URL: render as a link card
    if (!isEmbeddableUrl(url)) {
        return (
            <div className="relative group w-full col-span-full mt-4 pb-4">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full p-4 rounded-md border border-n-1 dark:border-n-6 bg-n-2 dark:bg-transparent hover:bg-n-3 dark:hover:bg-n-6/30 transition-colors"
                >
                    <div className="text-sm font-medium text-primary-1 truncate">{getDomainLabel(url)}</div>
                </a>
                <RemoveButton />
            </div>
        );
    }

    const embedUrl = toYouTubeEmbedUrl(url);

    return (
        <div className="relative group w-full col-span-full mt-4 pb-4">
            <div className="relative h-96 w-full rounded-md border border-n-1 dark:border-n-6 overflow-hidden bg-n-2 dark:bg-n-2">
                <iframe
                    src={embedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>
            <RemoveButton />
        </div>
    );
};

export default LinkPreview;

