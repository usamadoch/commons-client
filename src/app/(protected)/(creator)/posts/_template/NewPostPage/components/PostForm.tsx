import { useState } from "react";
import { usePostForm } from "../usePostForm";
import PostInput from "./PostInput";
import MediaPreview from "./MediaPreview";
import PostToolbar from "./PostToolbar";
import NewPostSettings from "./NewPostSettings";
import LinkInput from "./LinkInput";
import PollInput from "./PollInput";
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

    const [isAddingLink, setIsAddingLink] = useState(false);
    const [isAddingPoll, setIsAddingPoll] = useState(false);

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

                        {linkUrl ? (
                            <LinkPreview 
                                url={linkUrl} 
                                onRemove={() => setLinkUrl(undefined)} 
                            />
                        ) : isAddingLink ? (
                            <LinkInput 
                                onAddLink={(url) => {
                                    setLinkUrl(url);
                                    setIsAddingLink(false);
                                }}
                                onCancel={() => setIsAddingLink(false)}
                            />
                        ) : null}

                        {poll ? (
                            <PollPreview 
                                poll={poll} 
                                onRemove={() => setPoll(undefined)} 
                            />
                        ) : isAddingPoll ? (
                            <PollInput 
                                onAddPoll={(p) => {
                                    setPoll(p);
                                    setIsAddingPoll(false);
                                }}
                                onCancel={() => setIsAddingPoll(false)}
                            />
                        ) : null}

                        <PostToolbar
                            openFileSelector={openFileSelector}
                            onFileSelection={handleFileSelection}
                            fileInputRef={fileInputRef}
                            attachments={attachments}
                            linkUrl={linkUrl}
                            poll={poll}
                            onOpenLinkModal={() => setIsAddingLink(true)}
                            onOpenPollModal={() => setIsAddingPoll(true)}
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


        </div>
    );
};

export default PostForm;

