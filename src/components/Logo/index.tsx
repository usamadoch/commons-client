




import Link from "next/link";
import { useColorMode } from "@chakra-ui/color-mode";
import Image from "@/components/Image";
import { useAuth } from "@/store/auth";

type LogoProps = {
    className?: string;
    light?: boolean;
    href?: string;
    disabled?: boolean;
    hideText?: boolean;
    textClassName?: string;
};

const Logo = ({ className, light, href, disabled, hideText, textClassName }: LogoProps) => {
    const { colorMode } = useColorMode();
    const { user } = useAuth();
    const isDarkMode = colorMode === "dark";

    const defaultHref = user?.role === "creator" ? "/dashboard" : "/";
    const targetHref = href ?? defaultHref;

    const content = (
        <>
            <Image
                className="w-auto h-full object-contain shrink-0"
                src="/l.svg"
                width={40}
                height={40}
                alt="Bruddle"
            />
            {!hideText && (
                <span className={`font-bold text-[1.3rem] tracking-tight text-white select-none leading-none ${textClassName || ""}`}>
                    Commons
                </span>
            )}
        </>
    );

    if (disabled) {
        return (
            <div className={`flex items-center gap-2 h-8 ${className}`}>
                {content}
            </div>
        );
    }

    return (
        <Link className={`flex items-center gap-2 h-8 ${className}`} href={targetHref}>
            {content}
        </Link>
    );
};

export default Logo;
