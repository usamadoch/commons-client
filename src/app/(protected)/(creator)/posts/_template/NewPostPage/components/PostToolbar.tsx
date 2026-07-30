
import { MediaFile } from "../hooks/useMediaUpload";
import { Icon as LucideIcon } from "@/components/ui/icon";
import { BarChart2, Video, ImageIcon, LinkIcon } from "@/lib/icons";
import { Poll } from "@/types";

type ToolbarProps = {
    openFileSelector: () => void;
    onFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    attachments?: MediaFile[];
    linkUrl?: string;
    poll?: Poll;
    onOpenLinkModal?: () => void;
    onOpenPollModal?: () => void;
};

const PostToolbar = ({ 
    openFileSelector, 
    onFileSelection, 
    fileInputRef, 
    attachments = [], 
    linkUrl,
    poll,
    onOpenLinkModal, 
    onOpenPollModal 
}: ToolbarProps) => {
    const hasVideo = attachments.some(a => a.type === 'video');
    const hasImages = attachments.some(a => a.type === 'image');
    const hasLink = !!linkUrl;
    const hasPoll = !!poll;

    const isVideoDisabled = hasImages || hasVideo || hasPoll || hasLink;
    const isImageDisabled = hasVideo || hasPoll || hasLink;
    const isPollDisabled = hasImages || hasVideo || hasPoll || hasLink;
    const isLinkDisabled = hasImages || hasVideo || hasPoll || hasLink;

    const triggerUpload = (acceptType: string) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = acceptType;
            openFileSelector();
        }
    };

    return (
        <div className="flex items-center justify-between w-full md:px-3">
            <div className="flex items-center mb-2 gap-2">
                <button
                    className={`btn-stroke p-2 h-10 rounded-md md:grow ${isVideoDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    onClick={() => triggerUpload("video/*")}
                    disabled={isVideoDisabled}
                >
                    <LucideIcon icon={Video} />
                </button>
                <button
                    className={`btn-stroke p-2 h-10 rounded-md md:grow ${isImageDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    onClick={() => triggerUpload("image/*")}
                    disabled={isImageDisabled}
                >
                    <LucideIcon icon={ImageIcon} />
                </button>

                <button 
                    className={`btn-stroke p-2 h-10 rounded-md md:grow ${isPollDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    onClick={onOpenPollModal}
                    disabled={isPollDisabled}
                >
                    <LucideIcon icon={BarChart2} />
                </button>
                <button 
                    className={`btn-stroke p-2 h-10 rounded-md md:grow ${isLinkDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    onClick={onOpenLinkModal}
                    disabled={isLinkDisabled}
                >
                    <LucideIcon icon={LinkIcon} />
                </button>


                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={onFileSelection}
                    accept="image/*,video/*"
                    multiple
                />
            </div>
        </div>
    );
};

export default PostToolbar;
