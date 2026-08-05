import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { Lock } from "@/lib/icons";
import { Poll } from "@/types";
import { usePollMutation } from "@/hooks/mutations/usePollMutation";
import LockedOverlay from "@/components/LockedOverlay";
import { useAuth } from "@/store/auth";
import LoginModal from "@/components/modals/LoginModal";

interface PostCardPollProps {
    postId: string;
    initialPoll: Poll;
    initialVotedOptions: number[];
    isLocked: boolean;
    shareUrl?: string;
    showOverlay?: boolean;
    onClick?: () => void;
}

const PostCardPoll = ({ postId, initialPoll, initialVotedOptions, isLocked, shareUrl, showOverlay = isLocked, onClick }: PostCardPollProps) => {
    const [localPoll, setLocalPoll] = useState<Poll>(initialPoll);
    const [userVotedOptions, setUserVotedOptions] = useState<number[]>(initialVotedOptions);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

    const { mutateAsync: votePoll, isPending: isVoting } = usePollMutation(postId);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        setLocalPoll(initialPoll);
    }, [initialPoll]);

    useEffect(() => {
        setUserVotedOptions(initialVotedOptions);
    }, [initialVotedOptions]);

    const handleVote = async (optionIndex: number) => {
        if (!localPoll || isVoting || isLocked) return;

        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        let newSelected = [...userVotedOptions];
        if (localPoll.allowMultiple) {
            if (newSelected.includes(optionIndex)) {
                newSelected = newSelected.filter(i => i !== optionIndex);
            } else {
                newSelected.push(optionIndex);
            }
        } else {
            if (newSelected.includes(optionIndex)) return;
            newSelected = [optionIndex];
        }

        try {
            const response = await votePoll(newSelected) as any;
            setLocalPoll(response.post.poll);
            setUserVotedOptions(response.userVotedOptions || []);
        } catch (error) {
            // Error is handled by the hook
        }
    };

    if (isLocked) {
        const optionCount = (localPoll as any).optionCount || localPoll?.options?.length || 3;
        const dummyOptions = Array(optionCount).fill(0);

        return (
            <div className="mb-2.5 relative">
                <div className="relative w-full p-5 rounded-md border border-n-1 dark:border-n-6 bg-transparent">

                    <div className="flex flex-col gap-3 select-none pointer-events-none">
                        {dummyOptions.map((_, index) => (
                            <div key={index} className="flex items-center p-3 rounded-md border border-n-1 dark:border-n-6 bg-n-2/50 dark:bg-n-6/20">
                                <div className="w-5 h-5 shrink-0 rounded-full border-2 border-n-4 dark:border-n-6 mr-3" />
                                <div className="h-2 w-1/2 bg-n-3/40 dark:bg-n-6 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
                {showOverlay && (
                    <LockedOverlay type="overlay" title="Members Only Poll" onClick={onClick} />
                )}
            </div>
        );
    }

    return (
        <div className="mb-2.5">
            <div className={`relative w-full p-5 rounded-md border border-n-1 dark:border-n-6 bg-transparent`}>
                <div className="flex flex-col gap-3">
                    {localPoll.options.map((option: any, index: number) => {
                        const text = typeof option === 'string' ? option : option.text;
                        const votes = typeof option === 'string' ? 0 : option.votes;
                        const hasVoted = userVotedOptions.length > 0;
                        const isSelected = userVotedOptions.includes(index);
                        const totalVotes = localPoll.totalVotes || 0;
                        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

                        return (
                            <div
                                key={index}
                                className={`relative flex items-center p-3 rounded-md border transition-colors overflow-hidden ${hasVoted ? (isSelected ? 'border-primary-1 dark:border-primary-1' : 'border-n-1 dark:border-n-6') : 'bg-n-2 dark:bg-transparent border-n-1 dark:border-n-6 cursor-pointer hover:border-n-3 dark:hover:border-n-7'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    !hasVoted && handleVote(index);
                                }}
                            >
                                {hasVoted && (
                                    <div
                                        className={`absolute top-0 left-0 bottom-0 transition-all duration-500 ${isSelected ? 'bg-n-9 dark:bg-n-9' : 'bg-n-6 dark:bg-n-6'}`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                )}

                                <div className="relative z-10 flex items-center gap-3 w-full">
                                    {!hasVoted && (
                                        localPoll.allowMultiple ? (
                                            <div className={`w-5 h-5 shrink-0 rounded-sm border-2 flex items-center justify-center ${isSelected ? 'border-primary-1 bg-primary-1' : 'border-n-4 dark:border-n-5'}`} />
                                        ) : (
                                            <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary-1' : 'border-n-4 dark:border-n-5'}`}>
                                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-1" />}
                                            </div>
                                        )
                                    )}

                                    <span className={`text-sm font-semibold grow ${hasVoted && isSelected ? 'text-n-1 dark:text-n-1' : 'dark:text-n-9'}`}>{text}</span>

                                    {hasVoted && (
                                        <span className={`text-sm font-bold ${isSelected ? 'text-n-1 dark:text-n-1' : 'text-n-4 dark:text-n-6'}`}>
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {userVotedOptions.length > 0 && (
                    <div className="mt-4 text-xs font-semibold text-n-4 dark:text-n-8">
                        {localPoll.totalVotes || 0} {(localPoll.totalVotes || 0) === 1 ? 'vote' : 'votes'}
                    </div>
                )}
            </div>

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
        </div>
    );
};

export default PostCardPoll;

