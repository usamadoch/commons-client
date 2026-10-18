import { useState } from "react";
import { useRouter } from "next/navigation";
import ActionMenu from "@/components/ActionMenu";
import { toast } from "react-hot-toast";
import { Icon } from "@/components/ui/icon";
import { MessageCircle, Send } from "@/lib/icons";
import Comment from "@/components/Comment";
import LikeButton from "@/components/LikeButton";
import { getSocialShareItems } from "@/utils/share";
import { usePrefetch } from "@/hooks/usePrefetch";

type ActionsProps = {
    postId: string;
    comments: number;
    likes: number;
    isLiked: boolean;
    className?: string;
    showComment?: boolean;
    shareUrl?: string;
    type?: 'post' | 'comment';
    isLocked?: boolean;
    onCommentClick?: () => void;
};

const Actions = ({ postId, comments, likes: initialLikes, isLiked: initialIsLiked, className, showComment = true, shareUrl, type = 'post', isLocked, onCommentClick }: ActionsProps) => {
    const router = useRouter();
    const { prefetch } = usePrefetch();

    // Comment state
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const shareItems = getSocialShareItems({
        url: shareUrl || `/posts/${postId}`,
        onCopySuccess: () => {
            toast.success("Post link copied to clipboard");
        }
    });

    return (
        <>
            <div className={`flex items-center ${className}`}>

                <LikeButton postId={postId} initialLikes={initialLikes} initialIsLiked={initialIsLiked} targetType={type} isLocked={isLocked} onLockedClick={onCommentClick} />


                {showComment && (
                    <button
                        className="flex items-center gap-1 ml-4 px-0 cursor-pointer dark:text-n-8"
                        onPointerEnter={() => prefetch(`/posts/${postId}`)}
                        onTouchStart={() => prefetch(`/posts/${postId}`)}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (typeof window !== "undefined" && window.innerWidth <= 767) {
                                router.push(`/posts/${postId}`);
                                return;
                            }
                            if (onCommentClick) {
                                onCommentClick();
                            }
                        }}
                    >
                        <Icon icon={MessageCircle} className="" />
                        <span className="text-sm ">{comments}</span>
                    </button>
                )}



                {type === 'post' ? (
                    <ActionMenu
                        className="ml-4"
                        buttonClass="px-0 cursor-pointer flex items-center focus:outline-none"
                        iconName={Send}
                        iconClass="dark:text-n-8"
                        anchor="bottom end"
                        portal
                        menuItemsClass="z-[9999] border border-n-4 rounded-xs min-w-[9.5rem] py-1 bg-white dark:bg-n-1 shadow-primary-4 focus:outline-none [--anchor-gap:10px] transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
                        items={shareItems}
                    />
                ) : (
                    showComment && (
                        <button
                            className={` ml-4 cursor-pointer dark:text-n-8`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (typeof window !== "undefined" && window.innerWidth <= 767) {
                                    router.push(`/posts/${postId}`);
                                    return;
                                }
                                setIsCommentOpen(!isCommentOpen);
                                if (onCommentClick) {
                                    onCommentClick();
                                }
                            }}
                        >
                            <Icon icon={Send} />
                        </button>
                    )
                )}

            </div>
            {isCommentOpen && type === 'comment' && (
                <Comment
                    className="mt-4 mb-2 pr-4! py-0! pl-0! border-dashed shadow-none md:-ml-12 md:pr-3!"
                    placeholder="Type to add your comment"
                    value={commentValue}
                    setValue={(e) => setCommentValue(e.target.value)}
                />
            )}
        </>
    );
};

export default Actions;
