"use client";

import Image, { StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT } from "./motion";

type ScreenshotFrameProps = {
    src: StaticImageData;
    alt: string;
    sizes: string;
};

/**
 * Product screenshot frame matching Commons design tokens:
 * Solid border, hard neo-brutalist shadow, fully uncropped display.
 */
const ScreenshotFrame = ({ src, alt, sizes }: ScreenshotFrameProps) => {
    const reduced = useReducedMotion();

    return (
        <motion.div
            className="w-full overflow-hidden rounded-xl border-2 border-n-6 bg-n-2 shadow-primary-6"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduced ? { duration: DURATION.reduced } : { duration: 0.6, ease: EASE_OUT }}
        >
            <Image
                src={src}
                alt={alt}
                width={src.width}
                height={src.height}
                sizes={sizes}
                placeholder="blur"
                className="w-full h-auto block object-contain"
            />
        </motion.div>
    );
};

export default ScreenshotFrame;
