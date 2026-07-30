import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { postService } from "@/services/post.service";
import { Icon } from "@/components/ui/icon";
import { Lock } from "@/lib/icons";
import { Poll } from "@/types";

interface PostPollProps {
    postId: string;
    initialPoll: Poll;
    initialVotedOptions?: number[];
    locked: boolean;
}

const PostPoll = ({ postId, initialPoll, initialVotedOptions = [], locked }: PostPollProps) => {
    const [localPoll, setLocalPoll] = useState<any>(initialPoll);
    const [userVotedOptions, setUserVotedOptions] = useState<number[]>(initialVotedOptions);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        setLocalPoll(initialPoll);
    }, [initialPoll]);

    useEffect(() => {
        setUserVotedOptions(initialVotedOptions);
    }, [initialVotedOptions]);

    const handleVote = async (optionIndex: number) => {
        if (!localPoll || isVoting || locked) return;

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

        setIsVoting(true);
        try {
            const response = await postService.votePoll(postId, newSelected);
            setLocalPoll(response.post.poll);
            setUserVotedOptions(response.userVotedOptions || []);
        } catch (error: any) {
            toast.error(error.message || "Failed to vote");
        } finally {
            setIsVoting(false);
        }
    };

    if (!localPoll) return null;

    return (
        <div className="mb-2.5 mt-4 w-full max-w-4xl mx-auto">
            <div className={`relative w-full p-5 rounded-md border border-n-1 dark:border-n-6 bg-transparent`}>
                {locked ? (
                    <div className="relative">
                        <div className="flex flex-col gap-3 select-none pointer-events-none opacity-60">
                            {Array((localPoll as any).optionCount || localPoll?.options?.length || 3).fill(0).map((_, index) => (
                                <div key={index} className="flex items-center p-3 rounded-md border border-n-1 dark:border-n-6 bg-n-2/50 dark:bg-n-6/20">
                                    <div className="w-5 h-5 shrink-0 rounded-full border-2 border-n-4 dark:border-n-6 mr-3" />
                                    <div className="h-2 w-1/2 bg-n-3/40 dark:bg-n-6 rounded-full" />
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center py-6 gap-3 z-10">
                            <Icon icon={Lock} className="w-8 h-8 text-n-7 dark:text-n-3 drop-shadow-md" />
                            <p className="text-sm font-semibold text-n-7 dark:text-n-3 drop-shadow-md">Members Only Poll</p>
                            {localPoll.optionCount && (
                                <p className="text-xs text-n-7 dark:text-n-3 drop-shadow-md">{localPoll.optionCount} options</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
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
                                        className={`relative flex items-center p-3 rounded-md border transition-colors overflow-hidden ${hasVoted ? (isSelected ? 'border-primary-1 dark:border-primary-1' : 'border-n-1 dark:border-n-6') : 'bg-n-2 dark:bg-transparent border-n-1 dark:border-n-6 cursor-pointer hover:border-n-3 dark:hover:border-n-5'}`}
                                        onClick={() => !hasVoted && handleVote(index)}
                                    >
                                        {hasVoted && (
                                            <div
                                                className={`absolute top-0 left-0 bottom-0 transition-all duration-500 ${isSelected ? 'bg-primary-1/10' : 'bg-n-3/30 dark:bg-n-6/30'}`}
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

                                            <span className={`text-sm font-semibold grow ${hasVoted && isSelected ? 'text-primary-1' : 'dark:text-n-9'}`}>{text}</span>

                                            {hasVoted && (
                                                <span className={`text-sm font-bold ${isSelected ? 'text-primary-1' : 'text-n-4 dark:text-n-5'}`}>
                                                    {percentage}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {userVotedOptions.length > 0 && (
                            <div className="mt-4 text-xs font-semibold text-n-4 dark:text-n-5">
                                {localPoll.totalVotes || 0} {(localPoll.totalVotes || 0) === 1 ? 'vote' : 'votes'}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PostPoll;
