import Image from "@/components/Image";
import { useMyPage } from "@/hooks/queries";
import TextareaAutosize from "react-textarea-autosize";

type PostInputProps = {
    content: string;
    setContent: (content: string) => void;
    attachmentCount: number;
    children?: React.ReactNode;
};

const PostInput = ({ content, setContent, attachmentCount, children }: PostInputProps) => {
    const { data: page } = useMyPage();

    return (
        <div className="flex items-start mt-2 text-sm font-bold">
            <div className="relative ml-2 w-10 h-10 mr-2.5 shrink-0">
                <Image
                    className="object-cover rounded-full"
                    family="avatar"
                    slot="profile"
                    src={page?.avatarUrl}
                    fill
                    alt={page?.displayName || "Avatar"}
                />
            </div>

            <div className="flex flex-col grow min-w-0">
                <TextareaAutosize
                    className="w-full bg-transparent py-2 pr-4 text-sm font-medium text-n-1 outline-none resize-none placeholder:text-n-1 md:px-3 dark:text-n-9 dark:placeholder:text-n-9"
                    maxRows={12}
                    minRows={3}
                    autoFocus
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    required={attachmentCount === 0}
                />
                {children}
            </div>
        </div>
    );
};

export default PostInput;
