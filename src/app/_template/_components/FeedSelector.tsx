"use client";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export type FeedType = "for-you" | "following";

type FeedSelectorProps = {
    value: FeedType;
    onChange: (value: FeedType) => void;
};

const OPTIONS: { id: FeedType; label: string }[] = [
    { id: "for-you", label: "For you" },
    { id: "following", label: "Following" },
];

export default function FeedSelector({ value, onChange }: FeedSelectorProps) {
    const selected = OPTIONS.find(o => o.id === value) || OPTIONS[0];

    return (
        <div className="relative inline-block mb-4">
            <Listbox value={value} onChange={onChange}>
                {({ open }) => (
                    <>
                        <ListboxButton className="inline-flex items-center gap-2 px-3 h-8 bg-white dark:bg-n-3 border-[1.5px] border-n-1 dark:border-n-5 rounded-[3px] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_rgba(255,255,255,0.2)] text-xs font-bold text-n-1 dark:text-n-9 hover:bg-n-4/10 dark:hover:bg-n-4/20 transition-all cursor-pointer">
                            <span>{selected.label}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                        </ListboxButton>

                        <Transition
                            leave="transition duration-120 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <ListboxOptions className="absolute left-0 mt-1 w-32 bg-white dark:bg-n-3 border-[1.5px] border-n-1 dark:border-n-5 rounded-[3px] shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_rgba(255,255,255,0.2)] py-1 z-20 outline-none">
                                {OPTIONS.map((option) => (
                                    <ListboxOption
                                        key={option.id}
                                        value={option.id}
                                        className={({ active, selected }) =>
                                            `px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                                                selected
                                                    ? "bg-purple-1/20 text-purple-1"
                                                    : active
                                                    ? "bg-n-4/20 dark:bg-n-5 text-n-1 dark:text-n-9"
                                                    : "text-n-1 dark:text-n-9"
                                            }`
                                        }
                                    >
                                        {option.label}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </>
                )}
            </Listbox>
        </div>
    );
}
