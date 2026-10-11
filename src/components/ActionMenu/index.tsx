import { MenuButton, Menu as MenuDropdown, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@/components/ui/icon";
import { LucideIcon } from "lucide-react";
import { MoreHorizontal } from "@/lib/icons";
import Link from "next/link";

type ActionItem = {
    icon?: LucideIcon | React.ReactNode;
    label: string;
    onClick: (e: React.MouseEvent) => void;
    viewBox?: string;
    className?: string; // Allow custom class for specific items
};

type ActionMenuProps = {
    items: ActionItem[];
    className?: string;
    buttonClass?: string;
    iconName?: LucideIcon;
    iconClass?: string;
    iconViewBox?: string;
    anchor?: any;
    portal?: boolean;
    showFooterLinks?: boolean;
    itemClass?: string;
    menuItemsClass?: string;
    children?: React.ReactNode;
};

const ActionMenu = ({
    items,
    className,
    buttonClass = "btn-transparent-dark btn-square btn-small focus:outline-none",
    iconName = MoreHorizontal,
    iconClass,
    iconViewBox,
    anchor,
    portal = false,
    showFooterLinks = false,
    itemClass = "flex items-center cursor-pointer w-full h-8 px-3 text-xs font-semibold text-n-1 dark:text-n-9 transition-colors hover:bg-n-2 dark:hover:bg-n-3 hover:text-purple-1 rounded-xs",
    menuItemsClass,
    children,
}: ActionMenuProps) => {
    const containerClass = `relative inline-flex w-fit ${className || ""}`.trim();

    const defaultMenuItemsClass = anchor
        ? "z-[9999] min-w-[9.5rem] py-1 bg-white dark:bg-n-1 border-2 border-n-1 dark:border-n-6 shadow-primary-4 rounded-xs focus:outline-none [--anchor-gap:6px] transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0"
        : "z-[9999] absolute border-2 border-n-1 dark:border-n-6 shadow-primary-4 rounded-xs right-0 top-full mt-1.5 min-w-[9.5rem] py-1 bg-white dark:bg-n-1 transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0";

    const finalMenuItemsClass = menuItemsClass !== undefined ? menuItemsClass : defaultMenuItemsClass;

    return (
        <MenuDropdown className={containerClass} as="div">
            <MenuButton className={`${buttonClass} focus:outline-none`} onClick={(e) => e.stopPropagation()}>
                {children ? children : iconName && (
                    <Icon icon={iconName} className={iconClass} />
                )}
            </MenuButton>
            <MenuItems
                transition
                anchor={anchor}
                portal={portal}
                modal={false}
                className={`${finalMenuItemsClass} focus:outline-none`}
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        className={item.className || itemClass}
                        as="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            item.onClick(e);
                        }}
                    >
                        {item.icon && (
                            <div className="flex items-center mr-2 w-4 h-4 shrink-0">
                                {typeof item.icon === 'function' || (typeof item.icon === 'object' && !('type' in (item.icon as any))) ? (
                                    <Icon icon={item.icon as LucideIcon} className="w-4 h-4" />
                                ) : (
                                    item.icon as React.ReactNode
                                )}
                            </div>
                        )}
                        {item.label}
                    </MenuItem>
                ))}
                {showFooterLinks && (
                    <div className="flex items-center gap-6.5 border-t border-n-6 pt-2 px-6.5 overflow-x-auto overflow-y-hidden scrollbar-none whitespace-nowrap text-sm text-n-7 dark:text-white/40">
                        <Link href="/about" className="h-10 flex items-center shrink-0 cursor-pointer transition-colors">about</Link>
                        <Link href="/privacy" className="h-10 flex items-center shrink-0 cursor-pointer transition-colors">privacy</Link>
                        <Link href="/terms" className="h-10 flex items-center shrink-0 cursor-pointer transition-colors">terms</Link>
                    </div>
                )}
            </MenuItems>
        </MenuDropdown>
    );
};

export default ActionMenu;
