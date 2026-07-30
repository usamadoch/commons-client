import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Switch from "@/components/Switch";
import Icon from "@/components/Icon";
import { Icon as LucideIcon } from "@/components/ui/icon";
import { Plus, Trash2 } from "@/lib/icons";
import { Poll } from "@/types";

type PollModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddPoll: (poll: Poll) => void;
};

const PollModal = ({ isOpen, onClose, onAddPoll }: PollModalProps) => {
    const [options, setOptions] = useState<string[]>(["", ""]);
    const [hasEndDate, setHasEndDate] = useState(false);
    const [endDate, setEndDate] = useState<string>("");
    const [allowMultiple, setAllowMultiple] = useState(false);

    useEffect(() => {
        if (hasEndDate && !endDate) {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            // Format to YYYY-MM-DDTHH:mm
            const isoString = date.toISOString();
            setEndDate(isoString.substring(0, 16));
        }
    }, [hasEndDate, endDate]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, ""]);
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleSubmit = () => {
        const validOptions = options.map(o => o.trim()).filter(o => o.length > 0);
        if (validOptions.length >= 2) {
            onAddPoll({
                options: validOptions.map(text => ({ text, votes: 0 })),
                totalVotes: 0,
                allowMultiple,
                endDate: hasEndDate ? new Date(endDate).toISOString() : null,
            });
            // Reset state
            setOptions(["", ""]);
            setHasEndDate(false);
            setEndDate("");
            setAllowMultiple(false);
            onClose();
        }
    };

    const isValid = options.filter(o => o.trim().length > 0).length >= 2;

    return (
        <Modal
            visible={isOpen}
            onClose={onClose}
            showCloseIcon={false}
            title="Create a Poll"
            classWrap="max-w-xl"
        >
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Field
                                className="grow"
                                classInput="h-12"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOptionChange(index, e.target.value)}
                            />
                            {options.length > 2 && (
                                <button
                                    type="button"
                                    title="Remove option"
                                    className="flex items-center justify-center w-8 h-8 bg-purple-1 border border-n-1 rounded-md cursor-pointer transition-colors hover:bg-purple-2 text-white shrink-0"
                                    onClick={() => removeOption(index)}
                                >
                                    <LucideIcon icon={Trash2} size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-2">

                    <button
                        className="group inline-flex items-center font-bold transition-colors hover:text-purple-1"
                        onClick={addOption}
                        disabled={options.length >= 10}
                    >
                        <Icon name="add-circle" className="mr-2 fill-inherit" />
                        Add Option
                    </button>

                    <div className="flex items-center gap-4 text-sm font-semibold dark:text-n-9">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span>Set end date</span>
                            <Switch value={hasEndDate} setValue={setHasEndDate} />
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span>Allow multiple choices</span>
                            <Switch value={allowMultiple} setValue={setAllowMultiple} />
                        </label>
                    </div>
                </div>

                {hasEndDate && (
                    <Field
                        className="w-full"
                        classInput="h-12"
                        label="Poll ends at:"
                        type="datetime-local"
                        value={endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                    />
                )}

                <button
                    className="btn-purple btn w-full mt-4 h-12 rounded-sm"
                    onClick={handleSubmit}
                    disabled={!isValid}
                >
                    Submit Poll
                </button>
            </div>
        </Modal>
    );
};

export default PollModal;
