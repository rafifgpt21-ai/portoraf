"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { slabLeft, slabRight, useHydratedReducedMotion } from "@/components/motion";

interface BrutalistSectionProps {
    id: string;
    index: string;
    title: string;
    subtitle: string;
    children: ReactNode;
    inverse?: boolean;
    tone?: "paper" | "signal" | "ink" | "cobalt" | "blush";
    className?: string;
}

export default function BrutalistSection({
    id,
    index,
    title,
    subtitle,
    children,
    inverse = false,
    tone,
    className = "",
}: BrutalistSectionProps) {
    const ref = useRef<HTMLElement>(null);
    const reduceMotion = useHydratedReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const titleX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [70, -110]);
    const resolvedTone = tone ?? (inverse ? "paper" : "ink");
    const toneClass = {
        paper: "bg-paper text-ink",
        signal: "bg-signal text-[#050505]",
        ink: "bg-ink text-paper",
        cobalt: "bg-cobalt text-[#f3eee4]",
        blush: "bg-blush text-ink",
    }[resolvedTone];

    return (
        <section
            ref={ref}
            id={id}
            data-portfolio-section
            className={`relative border-t-2 border-ink ${toneClass} ${className}`}
        >
            <div className="sticky top-[70px] z-20 grid grid-cols-[4.25rem_1fr] overflow-hidden border-b-2 border-ink bg-paper text-ink md:top-[75px] md:grid-cols-[7rem_1fr_auto]">
                <div className="flex items-center justify-center border-r-2 border-ink bg-signal font-oswald text-4xl font-medium leading-none md:text-6xl">
                    {index}
                </div>
                <div className="relative overflow-hidden px-3 py-2 md:px-6 md:py-3">
                    <motion.span
                        aria-hidden="true"
                        style={{ x: titleX }}
                        className="text-outline-ink absolute left-4 top-4 whitespace-nowrap font-archivo text-[clamp(2.4rem,7vw,7.5rem)] uppercase leading-[0.75] tracking-[-0.07em] opacity-15 md:left-7"
                    >
                        {title}
                    </motion.span>
                    <motion.h2
                        style={{ x: titleX }}
                        className="relative whitespace-nowrap font-archivo text-[clamp(2.4rem,7vw,7.5rem)] uppercase leading-[0.75] tracking-[-0.07em]"
                    >
                        {title}
                    </motion.h2>
                </div>
                <div className="hidden min-w-48 items-center border-l-2 border-ink px-5 font-mono text-[9px] font-black uppercase leading-relaxed tracking-[0.14em] md:flex">
                    {subtitle}
                </div>
            </div>

            <motion.div
                variants={Number(index) % 2 === 0 ? slabRight : slabLeft}
                initial={reduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
            >
                {children}
            </motion.div>
        </section>
    );
}
