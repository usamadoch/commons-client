import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { LockKeyhole, BarChart2, Check } from "@/lib/icons";
import { Poll } from "@/types";
import { usePollMutation } from "@/hooks/mutations/usePollMutation";
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
            <div className="mb-2.5 relative rounded-sm border-2 border-n-1 dark:border-n-6 bg-white dark:bg-n-2 p-4 shadow-primary-4 overflow-hidden">
                {/* Header tag */}
                <div className="flex items-center gap-1.5 mb-3 text-[11px] font-extrabold uppercase tracking-wider text-n-4 dark:text-n-7">
                    <Icon icon={BarChart2} className="w-3.5 h-3.5 text-purple-1" />
                    <span>Poll</span>
                </div>

                {/* Skeleton dummy options behind overlay */}
                <div className="flex flex-col gap-2.5 select-none pointer-events-none opacity-20 dark:opacity-15">
                    {dummyOptions.map((_, index) => (
                        <div key={index} className="flex items-center p-3.5 rounded-xs border-2 border-dashed border-n-1 dark:border-n-5 bg-n-2/30 dark:bg-n-3">
                            <div className="w-5 h-5 shrink-0 rounded-full border-2 border-dashed border-n-4 dark:border-n-6 mr-3" />
                            <div className="h-3 w-1/3 bg-n-3/40 dark:bg-white/20 rounded-xs" />
                        </div>
                    ))}
                </div>

                {/* High-contrast Neobrutalist Lock Overlay */}
                {showOverlay && (
                    <div 
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center p-5 text-center bg-white/95 dark:bg-n-2/95 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.();
                        }}
                    >
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-n-2 border border-n-1 dark:border-n-6 shadow-primary-4 flex items-center justify-center mb-2">
                            <Icon icon={LockKeyhole} className="w-6 h-6 text-purple-1 fill-current" />
                        </div>
                        <h4 className="text-base font-extrabold text-n-1 dark:text-white mb-1">
                            Members Only Poll
                        </h4>
                        <p className="text-xs font-semibold text-n-4 dark:text-n-7 mb-3 max-w-[18rem]">
                            Join the community to vote and see live results.
                        </p>
                        <button
                            type="button"
                            className="btn-purple btn-medium rounded-xs shadow-primary-4 font-bold text-xs text-n-1 px-6 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick?.();
                            }}
                        >
                            Join to unlock
                        </button>
                    </div>
                )}
            </div>
        );
    }

    const hasVoted = userVotedOptions.length > 0;

    return (
        <div className="mb-2.5">
            <div className="relative w-full p-4 rounded-sm border-2 border-n-1 dark:border-n-6 bg-white dark:bg-n-2 shadow-primary-4">
                {/* Header tag */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-n-4 dark:text-n-7">
                        <Icon icon={BarChart2} className="w-3.5 h-3.5 text-purple-1" />
                        <span>Poll</span>
                        {localPoll.allowMultiple && (
                            <span className="text-[10px] font-bold text-purple-1 normal-case tracking-normal bg-purple-1/10 px-1.5 py-0.5 rounded-xs border border-purple-1/30">
                                Multiple choices
                            </span>
                        )}
                    </div>
                    {hasVoted && (
                        <span className="text-[11px] font-bold text-purple-1 flex items-center gap-1">
                            <Icon icon={Check} className="w-3 h-3 stroke-[3]" /> Voted
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2.5">
                    {localPoll.options.map((option: any, index: number) => {
                        const text = typeof option === 'string' ? option : option.text;
                        const votes = typeof option === 'string' ? 0 : option.votes;
                        const isSelected = userVotedOptions.includes(index);
                        const totalVotes = localPoll.totalVotes || 0;
                        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

                        return (
                            <div
                                key={index}
                                className={`relative flex items-center justify-between p-3.5 rounded-xs border-2 transition-all overflow-hidden ${
                                    hasVoted
                                        ? isSelected
                                            ? 'border-purple-1 dark:border-purple-1 bg-purple-1/15 dark:bg-purple-1/20 shadow-primary-4'
                                            : 'border-n-1/20 dark:border-n-6 bg-n-2/5 dark:bg-n-3/40'
                                        : 'border-2 border-n-1 dark:border-n-5 bg-white dark:bg-n-3 hover:border-purple-1 hover:shadow-primary-4 hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    !hasVoted && handleVote(index);
                                }}
                            >
                                {/* Progress Bar Fill when voted */}
                                {hasVoted && (
                                    <div
                                        className={`absolute top-0 left-0 bottom-0 transition-all duration-500 ${
                                            isSelected ? 'bg-purple-1/30 dark:bg-purple-1/35' : 'bg-n-1/5 dark:bg-white/5'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                )}

                                <div className="relative z-10 flex items-center gap-3 w-full">
                                    {/* Indicator */}
                                    {!hasVoted ? (
                                        localPoll.allowMultiple ? (
                                            <div className="w-5 h-5 shrink-0 rounded-xs border-2 border-n-1 dark:border-white/60 bg-white dark:bg-n-2 flex items-center justify-center transition-colors" />
                                        ) : (
                                            <div className="w-5 h-5 shrink-0 rounded-full border-2 border-n-1 dark:border-white/60 bg-white dark:bg-n-2 flex items-center justify-center transition-colors" />
                                        )
                                    ) : (
                                        <div
                                            className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                                                isSelected
                                                    ? 'border-purple-1 bg-purple-1 text-n-1'
                                                    : 'border-n-4 dark:border-n-6 text-transparent'
                                            }`}
                                        >
                                            {isSelected && <Icon icon={Check} className="w-3.5 h-3.5 text-n-1 stroke-[3]" />}
                                        </div>
                                    )}

                                    {/* Label */}
                                    <span
                                        className={`text-sm grow text-n-1 dark:text-white ${
                                            isSelected ? 'font-extrabold' : 'font-bold'
                                        }`}
                                    >
                                        {text}
                                    </span>

                                    {/* Percentage */}
                                    {hasVoted && (
                                        <span
                                            className={`text-sm ml-auto pl-2 shrink-0 ${
                                                isSelected
                                                    ? 'font-extrabold text-purple-1 dark:text-purple-1'
                                                    : 'font-bold text-n-3 dark:text-n-8'
                                            }`}
                                        >
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-n-1/10 dark:border-n-6 text-xs font-semibold text-n-3 dark:text-n-8">
                    <span>
                        {localPoll.totalVotes || 0} {(localPoll.totalVotes || 0) === 1 ? 'vote' : 'votes'}
                    </span>
                    {!hasVoted ? (
                        <span className="text-[11px] text-n-4 dark:text-n-7">Click an option to vote</span>
                    ) : (
                        <span className="text-[11px] text-purple-1 font-bold">Final results</span>
                    )}
                </div>
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

