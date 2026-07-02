import Icon from "@/components/Icon";
import MuxVideoPlayer from "@/components/MuxVideoPlayer";
import Loader from "@/components/Loader";
import { MediaFile } from "../hooks/useMediaUpload";
import ActionMenu from "@/components/ActionMenu";

type MediaItemProps = {
    file: MediaFile;
    index: number;
    attachmentsLength: number;
    removeAttachment: (id: string) => void;
    removeAllAttachments: () => void;
    retryUpload?: (id: string) => void;
};

const MediaItem = ({
    file,
    index,
    attachmentsLength,
    removeAttachment,
    removeAllAttachments,
    retryUpload
}: MediaItemProps) => {
    return (
        <div className={`relative group ${index === 0 ? 'w-full col-span-full' : 'w-fit'}`}>
            {/* Media Preview */}
            <div className={`relative ${attachmentsLength === 1 ? 'h-96 w-fit max-w-full' : index === 0 ? 'h-96 w-full bg-n-2 dark:bg-n-2 flex items-center justify-center' : 'h-40 w-fit max-w-full'} rounded-md border border-n-1 dark:border-n-6 overflow-hidden`}>
                {file.type === "image" ? (
                    index === 0 && attachmentsLength > 1 ? (
                        <img
                            src={file.url}
                            alt="Preview"
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <img
                            src={file.url}
                            alt="Preview"
                            className="h-full w-auto max-w-full object-contain"
                        />
                    )
                ) : (
                    <MuxVideoPlayer
                        playbackId={file.uploadedData?.type === 'video' ? file.uploadedData.muxPlaybackId : undefined}
                        status={file.uploadedData?.type === 'video' ? file.uploadedData.status : undefined}
                        fallbackSrc={file.url}
                        className="w-full h-full"
                    />
                )}

                {/* Upload Progress Overlay - REMOVED */}

                {/* Error State Overlay */}
                {file.uploadStatus === 'error' && (
                    <div className="absolute inset-0 bg-red-500/80 flex flex-col items-center justify-center">
                        <span className="text-white dark:text-n-9 text-2xl mb-2">⚠</span>
                        <span className="text-white dark:text-n-9 text-sm mb-2">Upload failed</span>
                        {retryUpload && (
                            <button
                                onClick={() => retryUpload(file.id)}
                                className="px-3 py-1 bg-white text-red-500 text-sm font-medium cursor-pointer"
                            >
                                Try Again
                            </button>
                        )}
                    </div>
                )}

                {/* Uploading State Overlay */}
                {file.isNew && (file.uploadStatus === 'uploading' || file.uploadStatus === 'pending') && (
                    <div className="absolute inset-0 dark:bg-n-6 flex flex-col items-center justify-center">
                        <Loader />
                    </div>
                )}

                {/* Actions Menu - Moved inside media container for absolute positioning */}
                <div className="absolute top-2 right-2 z-10">
                    {index === 0 && attachmentsLength > 1 ? (
                        <ActionMenu
                            buttonClass="btn-medium btn-stroke btn-square rounded-full bg-white dark:bg-n-1 cursor-pointer flex items-center justify-center"
                            menuItemsClass="absolute right-0 top-8 mt-2 w-32 py-2 border border-n-1 rounded-sm bg-white dark:bg-n-1 dark:border-n-6 z-10 focus:outline-none"
                            items={[
                                {
                                    // icon: "trash",
                                    label: "Delete",
                                    className: "flex items-center w-full px-7 py-2 text-sm font-bold text-n-1 cursor-pointer dark:text-n-9",
                                    onClick: () => removeAttachment(file.id),
                                },
                                {
                                    // icon: "trash",
                                    label: "Delete All",
                                    className: "flex items-center w-full px-7 py-2 text-sm font-bold text-pink-1 cursor-pointer dark:text-n-9",
                                    onClick: removeAllAttachments,
                                }
                            ]}
                        />
                    ) : (
                        <button
                            className="btn-medium btn-stroke btn-square rounded-full bg-white dark:bg-n-1 cursor-pointer flex items-center justify-center"
                            onClick={() => removeAttachment(file.id)}
                            type="button"
                        >
                            <Icon name="close" className="fill-n-1 dark:fill-n-9 text-n-1 dark:text-n-9" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediaItem;
