import { useState } from "react";
import Field from "@/components/Field";
import { Icon as LucideIcon } from "@/components/ui/icon";
import { Trash2 } from "@/lib/icons";

type LinkInputProps = {
    onAddLink: (url: string) => void;
    onCancel: () => void;
};

const LinkInput = ({ onAddLink, onCancel }: LinkInputProps) => {
    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        if (url.trim()) {
            onAddLink(url.trim());
            setUrl("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="relative group w-full col-span-full mt-4 pb-4">
            <div className="w-full p-4 rounded-md border border-n-1 dark:border-n-6 bg-n-2 dark:bg-transparent flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-1">Add Link</span>
                    <button
                        className="btn-medium btn-stroke btn-square rounded-full bg-white dark:bg-n-1 cursor-pointer flex items-center justify-center"
                        onClick={onCancel}
                        type="button"
                    >
                        <LucideIcon icon={Trash2} size={16} className="fill-n-1 dark:fill-n-9 text-n-1 dark:text-n-9" />
                    </button>
                </div>

                <div className="flex gap-2">

                    <Field
                        className="w-full"
                        classInput="h-12"
                        placeholder="Paste link here"
                        icon="link"
                        value={url}
                        onChange={(e: any) => setUrl(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <button
                        className="bg-n-9 text-white hover:bg-n-9 dark:text-n-1 dark:hover:text-n-1 btn-stroke btn h-12 rounded-sm whitespace-nowrap px-6 shrink-0"
                        onClick={handleSubmit}
                        disabled={!url.trim()}
                        type="button"
                    >
                        Add Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkInput;
