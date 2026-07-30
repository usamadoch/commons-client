import { useState } from "react";
import { usePostForm } from "../usePostForm";
import PostInput from "./PostInput";
import MediaPreview from "./MediaPreview";
import PostToolbar from "./PostToolbar";
import NewPostSettings from "./NewPostSettings";
import LinkModal from "./LinkModal";
import PollModal from "./PollModal";
import LinkPreview from "./LinkPreview";
import PollPreview from "./PollPreview";

type PostFormProps = {
    formState: ReturnType<typeof usePostForm>;
    submitLabel?: string;
};

const PostForm = ({ formState, submitLabel = "Post" }: PostFormProps) => {
    const {
        attachments,
        caption,
        setCaption,
        visibility,
        setVisibility,
        allowComments,
        setAllowComments,
        linkUrl,
        setLinkUrl,
        poll,
        setPoll,
        fileInputRef,
        openFileSelector,
        handleFileSelection,
        removeAttachment,
        removeAllAttachments,
        retryUpload,
        handleSubmit,
        isSubmitting,
        isUploading,
        hasUploadError,
    } = formState;

    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isPollModalOpen, setIsPollModalOpen] = useState(false);

    return (
        <div className="flex lg:block">
            <div className="grow lg:mb-6 lg:bg-transparent lg:p-0 lg:border-none dark:lg:bg-transparent">
                <form
                    className="flex flex-col pl-1 py-1 pr-5 bg-white border border-n-4 md:pr-4 dark:bg-n-1 dark:border-n-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <PostInput
                        content={caption}
                        setContent={setCaption}
                        attachmentCount={attachments.length}
                    >
                        <MediaPreview
                            attachments={attachments}
                            removeAttachment={removeAttachment}
                            removeAllAttachments={removeAllAttachments}
                            retryUpload={retryUpload}
                        />

                        {linkUrl && (
                            <LinkPreview 
                                url={linkUrl} 
                                onRemove={() => setLinkUrl(undefined)} 
                            />
                        )}

                        {poll && (
                            <PollPreview 
                                poll={poll} 
                                onRemove={() => setPoll(undefined)} 
                            />
                        )}

                        <PostToolbar
                            openFileSelector={openFileSelector}
                            onFileSelection={handleFileSelection}
                            fileInputRef={fileInputRef}
                            attachments={attachments}
                            onOpenLinkModal={() => setIsLinkModalOpen(true)}
                            onOpenPollModal={() => setIsPollModalOpen(true)}
                        />
                    </PostInput>
                </form>
            </div>

            <NewPostSettings
                visibility={visibility}
                setVisibility={setVisibility}
                allowComments={allowComments}
                setAllowComments={setAllowComments}
                onPublish={handleSubmit}
                isSubmitting={isSubmitting}
                isUploading={isUploading}
                hasUploadError={hasUploadError}
            />

            <LinkModal 
                isOpen={isLinkModalOpen} 
                onClose={() => setIsLinkModalOpen(false)} 
                onAddLink={setLinkUrl} 
            />

            <PollModal
                isOpen={isPollModalOpen}
                onClose={() => setIsPollModalOpen(false)}
                onAddPoll={setPoll}
            />
        </div>
    );
};

export default PostForm;

