
import { MediaFile } from "../hooks/useMediaUpload";
import { Icon as LucideIcon } from "@/components/ui/icon";
import { BarChart2, Video, ImageIcon, LinkIcon } from "@/lib/icons";

type ToolbarProps = {
    openFileSelector: () => void;
    onFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    attachments?: MediaFile[];
    onOpenLinkModal?: () => void;
    onOpenPollModal?: () => void;
};

const PostToolbar = ({ openFileSelector, onFileSelection, fileInputRef, attachments = [], onOpenLinkModal, onOpenPollModal }: ToolbarProps) => {
    const hasVideo = attachments.some(a => a.type === 'video');
    const hasImages = attachments.some(a => a.type === 'image');

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
                    className={`btn-stroke p-2 h-10 rounded-md md:grow ${hasImages || hasVideo ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    onClick={() => triggerUpload("video/*")}
                    disabled={hasImages || hasVideo}
                >
                    <LucideIcon icon={Video} />
                </button>
                <button
                    className={`btn-stroke p-2 h-10 rounded-md md:grow ${hasVideo ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    onClick={() => triggerUpload("image/*")}
                    disabled={hasVideo}
                >
                    <LucideIcon icon={ImageIcon} />
                </button>

                <button 
                    className="btn-stroke p-2 h-10 rounded-md md:grow" 
                    type="button"
                    onClick={onOpenPollModal}
                >
                    <LucideIcon icon={BarChart2} />
                </button>
                <button 
                    className="btn-stroke p-2 h-10 rounded-md md:grow" 
                    type="button"
                    onClick={onOpenLinkModal}
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
