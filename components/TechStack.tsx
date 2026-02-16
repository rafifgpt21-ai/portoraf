"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "DaVinci Resolve", category: "Video & Audio" },
    { name: "Cubase Pro", category: "Audio" },
    { name: "FL Studio", category: "Audio" },
    { name: "Next.js", category: "Dev" },
    { name: "iZotope RX11", category: "Audio" },
    { name: "React", category: "Dev" },

];

export default function TechStack() {
    return (
        <section className="py-20 px-4 md:px-12 w-full">
            <div className="mb-12 pb-2">
                <h2 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter">
                    [Module_Capabilities]
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0 border-t border-l border-gray-800">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="group relative border-r border-b border-gray-800 p-8 bg-gray-900/20 backdrop-blur-sm hover:bg-gray-900/50 hover:border-interaction-red transition-colors duration-200 aspect-square flex flex-col justify-between"
                    >
                        {/* Corner Markers */}
                        <div className="absolute top-2 left-2 w-1 h-1 bg-gray-600 group-hover:bg-black" />
                        <div className="absolute top-2 right-2 w-1 h-1 bg-gray-600 group-hover:bg-black" />
                        <div className="absolute bottom-2 left-2 w-1 h-1 bg-gray-600 group-hover:bg-black" />
                        <div className="absolute bottom-2 right-2 w-1 h-1 bg-gray-600 group-hover:bg-black" />

                        {/* Category Label */}
                        <span className="font-mono text-xs text-gray-500 uppercase group-hover:text-interaction-red">
                            / {skill.category}
                        </span>

                        {/* Skill Name */}
                        <span className="text-lg md:text-xl font-bold text-white uppercase group-hover:text-interaction-red wrap-break-word">
                            {skill.name}
                        </span>

                        {/* Hover Decor */}
                        <div className="absolute inset-0 border border-transparent group-hover:border-interaction-red/20 pointer-events-none transition-all duration-200" />
                    </div>
                ))}
            </div>
        </section>
    );
}
