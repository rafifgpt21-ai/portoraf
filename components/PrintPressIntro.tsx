"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { motionEase, useHydratedReducedMotion } from "@/components/motion";

export default function PrintPressIntro() {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(true);
    const reduceMotion = useHydratedReducedMotion();

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (reduceMotion) {
            const frame = requestAnimationFrame(() => setVisible(false));
            return () => cancelAnimationFrame(frame);
        }
        const timer = window.setTimeout(() => setVisible(false), 900);
        return () => window.clearTimeout(timer);
    }, [mounted, reduceMotion]);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {visible && !reduceMotion ? (
                <motion.div
                    key="press"
                    className="fixed inset-0 z-[100] pointer-events-none overflow-hidden font-archivo uppercase"
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute inset-x-0 top-0 h-1/2 border-b-[3px] border-ink bg-paper text-ink"
                        exit={{ y: "-102%" }}
                        transition={{ duration: 0.45, ease: motionEase }}
                    >
                        <motion.span
                            initial={{ y: "-110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.38, ease: motionEase }}
                            className="absolute bottom-0 left-4 text-[23vw] leading-[0.67] tracking-[-0.09em] md:left-8"
                        >
                            RAFIF
                        </motion.span>
                    </motion.div>
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink text-paper"
                        exit={{ y: "102%" }}
                        transition={{ duration: 0.45, ease: motionEase }}
                    >
                        <motion.span
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.38, ease: motionEase }}
                            className="absolute left-4 top-0 text-[18vw] leading-[0.75] tracking-[-0.09em] md:left-8"
                        >
                            SYSTEMS
                        </motion.span>
                    </motion.div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute left-0 top-1/2 z-10 h-[6px] w-full origin-left bg-signal"
                        transition={{ delay: 0.18, duration: 0.42, ease: motionEase }}
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
