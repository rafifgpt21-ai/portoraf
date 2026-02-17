"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function CyberBackground() {
    const { scrollYProgress } = useScroll();

    // Parallax layers
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Grid - Moves slowly */}
            <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px',
                    y: y1
                }}
            />

            {/* Floating Elements - Move faster */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full"
                style={{ y: y2, rotate }}
            />

            <motion.div
                className="absolute bottom-1/3 right-1/4 w-96 h-96 border border-white/5"
                style={{ y: y2, rotate: useTransform(scrollYProgress, [0, 1], [0, -45]) }}
            />

            {/* Code Rain / Data Stream placeholder - Simplified for performance */}
            <div className="absolute right-10 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent opacity-20"></div>
            <div className="absolute left-20 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/5 to-transparent opacity-10"></div>
        </div>
    );
}
