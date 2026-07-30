import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/ui/icon";
import { Heart } from "@/lib/icons";
import { useAuth } from "@/store/auth";
import LoginModal from "../modals/LoginModal";
import { useLikeMutation } from "@/hooks/mutations/useLikeMutation";

interface LikeButtonProps {
    postId: string;
    initialLikes: number;
    initialIsLiked: boolean;
    targetType?: 'post' | 'comment';
    isLocked?: boolean;
    onLockedClick?: () => void;
}

const LikeButton = ({ postId, initialLikes, initialIsLiked, targetType = 'post', isLocked, onLockedClick }: LikeButtonProps) => {
    const { isAuthenticated } = useAuth();
    const { mutateAsync: toggleLike } = useLikeMutation(postId, targetType);

    const [liked, setLiked] = useState<boolean>(initialIsLiked);
    const [likesCount, setLikesCount] = useState<number>(initialLikes);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [animating, setAnimating] = useState<boolean>(false);

    const serverLiked = useRef<boolean>(initialIsLiked);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setLiked(initialIsLiked);
        serverLiked.current = initialIsLiked;
    }, [initialIsLiked]);

    useEffect(() => {
        setLikesCount(initialLikes);
    }, [initialLikes]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const syncLike = async (targetLiked: boolean) => {
        if (targetLiked === serverLiked.current) return;
        try {
            const res = await toggleLike();
            serverLiked.current = res.liked;
            setLiked(res.liked);
            setLikesCount(Math.max(0, res.likeCount));
        } catch (error) {
            setLiked(serverLiked.current);
            setLikesCount(prev => Math.max(0, serverLiked.current ? prev + 1 : prev - 1));
        }
    };

    const handleLike = async (e: React.MouseEvent): Promise<void> => {
        e.stopPropagation();

        if (isLocked) {
            if (onLockedClick) onLockedClick();
            return;
        }

        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        const nextLiked = !liked;
        setLiked(nextLiked);
        setLikesCount(prev => nextLiked ? prev + 1 : Math.max(0, prev - 1));

        setAnimating(true);
        setTimeout(() => setAnimating(false), 400);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            syncLike(nextLiked);
        }, 400);
    };

    return (
        <>
            <button
                className={`flex items-center gap-1 px-0 cursor-pointer active:scale-90 transition-transform`}
                onClick={handleLike}
            >
                <Icon
                    icon={Heart}
                    className={twMerge(
                        "transition-colors ",
                        animating && "animate-heart-pop",
                        liked ? "fill-purple-1 text-purple-1 icon-22" : "text-n-1 dark:text-n-8"
                    )}
                />
                <span className="text-sm dark:text-n-8">{likesCount}</span>
            </button>
            <div
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
            >
                <LoginModal
                    visible={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            </div>
        </>
    );
};

export default LikeButton;
