"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/motion";

export default function BrutalistBackdrop() {
    const reduceMotion = useHydratedReducedMotion();
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

    return (
        <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 registration-grid opacity-45" />
            <div className="print-noise absolute inset-0 opacity-[0.055]" />
            <div className="absolute -right-20 top-[18vh] h-[42vw] max-h-[680px] w-[42vw] max-w-[680px] rounded-full border border-ink/10" />
            <div className="absolute -right-8 top-[24vh] h-[30vw] max-h-[480px] w-[30vw] max-w-[480px] rounded-full border border-ink/10" />
            <motion.div
                className="absolute left-0 top-0 h-full w-1 origin-top bg-signal"
                style={{ scaleY: reduceMotion ? 1 : scaleY }}
            />
        </div>
    );
}
