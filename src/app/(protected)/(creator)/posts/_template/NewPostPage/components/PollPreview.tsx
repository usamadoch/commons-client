import { Icon as LucideIcon } from "@/components/ui/icon";
import { Trash2 } from "@/lib/icons";
import { Poll } from "@/types";
import Checkbox from "@/components/Checkbox";

type PollPreviewProps = {
    poll: Poll;
    onRemove: () => void;
};

const PollPreview = ({ poll, onRemove }: PollPreviewProps) => {
    return (
        <div className="relative group w-full col-span-full mt-4 pb-4">
            <div className="relative w-full p-5 rounded-md border border-n-1 dark:border-n-6 bg-transparent">
                <button
                    className="absolute top-2 right-2 z-10 btn-medium btn-stroke btn-square rounded-full bg-white dark:text-n-9 dark:bg-n-1 cursor-pointer flex items-center justify-center"
                    onClick={onRemove}
                    type="button"
                >
                    <LucideIcon icon={Trash2} size={16} className="fill-n-1 dark:fill-n-9 text-n-1 dark:text-n-9" />
                </button>

                <div className="flex flex-col gap-3">
                    {poll.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-md bg-n-2 dark:bg border border-n-1 dark:border-n-6">
                            {poll.allowMultiple ? (
                                <Checkbox
                                    value={false}
                                    onChange={() => { }}
                                />
                            ) : (
                                <div className="w-5 h-5 shrink-0 rounded-full border-2 border-n-4 dark:border-n-5 flex items-center justify-center" />
                            )}
                            <span className="text-sm font-semibold dark:text-n-9">{typeof option === 'string' ? option : option.text}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center text-xs font-semibold text-n-4 dark:text-n-7 gap-2">
                    {/* {poll.endDate && (
                        <span >Ends: {new Date(poll.endDate).toLocaleString()}</span>
                    )} */}
                    {/* {poll.endDate && poll.allowMultiple && <span>•</span>} */}
                    {/* {poll.allowMultiple && (
                        <span>Multiple choices allowed</span>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default PollPreview;
