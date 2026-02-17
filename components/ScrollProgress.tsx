"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setPercentage(Math.round(latest * 100));
        });
    }, [scrollYProgress]);

    return (
        <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 h-[60vh] z-50 hidden md:flex flex-col items-center gap-2 pointer-events-none mix-blend-difference">
            <div className="text-[10px] font-mono text-gray-500 writing-vertical-rl tracking-widest uppercase mb-2">
                Depth_Sensor
            </div>

            {/* The Track */}
            <div className="w-[1px] h-full bg-gray-800 relative overflow-hidden">
                {/* The Fill */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-white origin-top"
                    style={{ scaleY, height: "100%" }}
                />
            </div>

            {/* Percentage Readout */}
            <div className="font-mono text-xs font-bold text-white mt-2">
                {percentage.toString().padStart(3, '0')}%
            </div>

            {/* Decorative Markers */}
            <div className="absolute top-0 right-full mr-1 w-1 h-[1px] bg-gray-600"></div>
            <div className="absolute bottom-0 right-full mr-1 w-1 h-[1px] bg-gray-600"></div>
            <div className="absolute top-1/4 right-full mr-1 w-1 h-[1px] bg-gray-800"></div>
            <div className="absolute top-1/2 right-full mr-1 w-2 h-[1px] bg-white"></div>
            <div className="absolute top-3/4 right-full mr-1 w-1 h-[1px] bg-gray-800"></div>
        </div>
    );
}
