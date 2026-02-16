"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Background() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const [activeCells, setActiveCells] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        // Generate random active cells for the "living grid" effect
        const generateCells = () => {
            const cells = [];
            const count = Math.floor(Math.random() * 10) + 5; // 5-15 active cells
            for (let i = 0; i < count; i++) {
                cells.push({
                    x: Math.floor(Math.random() * 20), // Grid range X
                    y: Math.floor(Math.random() * 20), // Grid range Y
                });
            }
            setActiveCells(cells);
        };

        generateCells();
        const interval = setInterval(generateCells, 2000); // Shift every 2s
        return () => clearInterval(interval);
    }, []);

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
            {/* Deep Radial Void */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] opacity-80" />

            {/* Base Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

            {/* Active Grid Cells (Flickering) */}
            <div className="absolute inset-0 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
                {activeCells.map((cell, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.05, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute bg-white"
                        style={{
                            left: `${cell.x * 4}rem`,
                            top: `${cell.y * 4}rem`,
                            width: "4rem",
                            height: "4rem",
                        }}
                    />
                ))}
            </div>

            {/* Moving Grid Layer (Parallax) */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_2px_at_center,#ffffff_1px,transparent_0)] bg-size-[6rem_6rem] opacity-5 rotation-12"
            />

            {/* Secondary Moving Dots (Parallax Reverse) */}
            <motion.div
                style={{ y: y2 }}
                className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_2px_at_center,#ffffff_1px,transparent_0)] bg-size-[10rem_10rem] opacity-5"
            />
        </div>
    );
}
