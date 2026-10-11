import { Icon } from "@/components/ui/icon";
import { Search as SearchIcon } from "@/lib/icons";
import React, { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

type SearchProps = {
    className?: string;
    classInput?: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    large?: boolean;
};

const Search = ({
    className,
    classInput,
    placeholder,
    value,
    onChange,
    onSubmit,
    large,
}: SearchProps) => {
    return (
        <form
            className={twMerge(
                "relative w-full shadow-primary-4",
                className
            )}
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(e);
            }}
        >
            <input
                className={twMerge(
                    "w-full h-13 md:h-12 pl-12 pr-10 md:pl-11 md:pr-9 bg-white border border-n-1 rounded-sm text-sm font-medium text-n-1 outline-none transition-colors placeholder:text-n-3 placeholder:font-normal focus:border-purple-1 dark:bg-n-2 dark:border-n-6 dark:text-n-9 dark:placeholder:text-n-8 dark:focus:border-purple-1",
                    large && "h-16 pl-14 text-base",
                    classInput
                )}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <div className="absolute left-4 md:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <Icon className="w-5 h-5 md:w-4 md:h-4 text-n-1 dark:text-n-8" icon={SearchIcon} />
            </div>
            {value && (
                <button
                    type="button"
                    onClick={() => onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-n-3 hover:text-n-1 dark:text-n-8 dark:hover:text-white text-xs font-bold px-1.5 py-0.5 rounded transition-colors"
                    aria-label="Clear search"
                >
                    ✕
                </button>
            )}
        </form>
    );
};

export default Search;

