"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useAudio } from "@/app/context/AudioContext";
import { useHydratedReducedMotion } from "@/components/motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function TelemetryTopBar() {
    const { currentTrack, isPlaying } = useAudio();
    const reduceMotion = useHydratedReducedMotion();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

    return (
        <div className="fixed inset-x-0 top-0 z-[80] h-6 border-b-2 border-ink bg-signal text-[#050505] md:h-7">
            <div className="grid h-full grid-cols-[auto_1fr_auto] items-center font-mono text-[8px] font-black uppercase tracking-[0.14em] md:text-[9px]">
                <div className="flex h-full items-center border-r-2 border-ink px-3 md:px-5">ED.01 // ONLINE</div>
                <div className="relative h-full overflow-hidden px-3 flex items-center md:px-5">
                    <span className="truncate">{isPlaying && currentTrack ? `NOW PLAYING — ${currentTrack.title}` : "RAFIF SIDQI MOKOBOMBANG — JAKARTA — AVAILABLE FOR WORK"}</span>
                    <motion.div className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-ink" style={{ scaleX: reduceMotion ? 1 : scaleX }} />
                </div>
                <ThemeToggle />
            </div>
        </div>
    );
}
