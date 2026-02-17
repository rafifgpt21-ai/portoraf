"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Scramble Text Component
const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
    const [displayedText, setDisplayedText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplayedText(prev =>
                    text.split("").map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        } else {
            setDisplayedText(text);
        }
        return () => clearInterval(interval);
    }, [isHovered, text]);

    return (
        <span
            className={`cursor-pointer inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayedText}
        </span>
    );
};

const Typewriter = ({ text, speed = 20 }: { text: string; speed?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
};

const modules = [
    { id: "01", name: "DaVinci Resolve", category: "VIDEO_AUDIO", type: "CORE", description: "Professional video editing and color grading workflow." },
    { id: "02", name: "Cubase Pro", category: "AUDIO_ENG", type: "CORE", description: "Advanced music production and audio recording suite." },
    { id: "03", name: "FL Studio", category: "AUDIO_PROD", type: "TOOL", description: "Digital audio workstation for electronic music production." },
    { id: "04", name: "Web Dev", category: "FULL_STACK", type: "DEV", description: "Building performant web applications using Next.js and React." },
    { id: "05", name: "Resolume Arena", category: "VISUAL_FX", type: "VJ_SOFT", description: "Real-time video mixing and projection mapping for live visual performances." },
    { id: "06", name: "OBS Studio", category: "BROADCAST", type: "STREAM", description: "Open Broadcaster Software for professional live streaming and recording." },
];

export default function About() {
    const [activeModule, setActiveModule] = useState<typeof modules[0] | null>(null);

    return (
        <section className="h-screen w-full border-t border-gray-900 flex flex-col justify-center px-4 md:px-12 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8 shrink-0">
                <div className="w-4 h-4 bg-white" />
                <h2 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-tighter flex flex-col md:flex-row items-baseline gap-4">
                    [Introduction_Module]
                    <span className="text-sm md:text-base text-gray-500 opacity-50 font-normal tracking-normal">イントロダクション</span>
                </h2>
                <div className="h-1 grow bg-gray-800 ml-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                {/* Left Column: Interactive System Modules */}
                <div className="border border-gray-800 p-6 relative flex flex-col gap-6 bg-black/40 backdrop-blur-sm">
                    {/* Status Badges */}
                    <span className="absolute top-0 left-0 bg-white text-black text-xs px-2 py-1 font-mono font-bold">
                        ID: RAFIF_SIDQI
                    </span>
                    <span className="absolute bottom-0 right-0 bg-gray-800 text-gray-400 text-xs px-2 py-1 font-mono">
                        STATUS: ACTIVE
                    </span>

                    {/* Bio Metrics */}
                    <div className="space-y-1 font-mono text-[10px] md:text-xs text-gray-400 mt-6 mb-2">
                        <p className="typing-effect">{">"} INITIALIZING BIO_METRICS...</p>
                        <p>{">"} LOADING PERSONAL_DATA...</p>
                        <p>{">"} SUBJECT: CREATIVE TECHNOLOGIST</p>
                        <p>{">"} BACKGROUND: INFORMATION SYSTEMS</p>
                    </div>

                    {/* Interactive Modules Grid */}
                    <div className="mt-2 border-t border-gray-800 pt-4 grow flex flex-col justify-end">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">SKILL_MODULE</h3>
                            <div className="flex gap-2 items-center">
                                <span className="w-2 h-2 rounded-full bg-interaction-red animate-pulse"></span>
                                <span className="text-[8px] text-interaction-red font-mono">LIVE</span>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {modules.map((mod) => (
                                <motion.button
                                    key={mod.id}
                                    className={`aspect-video border border-gray-800 relative group overflow-hidden transition-all duration-300 flex items-center justify-center p-1 ${activeModule?.id === mod.id ? 'bg-white/10 border-interaction-red' : 'bg-black/50 hover:border-gray-600'}`}
                                    onMouseEnter={() => setActiveModule(mod)}
                                    onMouseLeave={() => setActiveModule(null)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-in-out" />

                                    <span className="absolute top-1 right-1 text-[8px] text-gray-600 group-hover:text-interaction-red font-mono transition-colors opacity-0 group-hover:opacity-100">{mod.id}</span>

                                    {/* Module Name in Box */}
                                    <div className="z-10 text-center">
                                        <span className={`text-[10px] md:text-xs font-mono font-bold uppercase transition-colors ${activeModule?.id === mod.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                            {mod.name}
                                        </span>
                                    </div>

                                    <div className={`absolute bottom-0 left-0 h-[2px] w-full ${activeModule?.id === mod.id ? 'bg-interaction-red' : 'bg-transparent group-hover:bg-gray-700'} transition-colors`} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Detail Readout - Terminal Style */}
                        <div className="h-32 border-2 border-gray-800 bg-black p-0 font-mono relative overflow-hidden flex flex-col">
                            {/* Terminal Header */}
                            <div className="bg-gray-900 border-b border-gray-800 p-1 flex justify-between items-center px-2">
                                <span className="text-[10px] text-gray-500 uppercase">SYS_INSPECT</span>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-700"></div>
                                    <div className="w-2 h-2 bg-gray-700"></div>
                                </div>
                            </div>

                            <div className="p-3 grow relative">
                                <AnimatePresence mode="wait">
                                    {activeModule ? (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.1 }}
                                            className="h-full flex flex-col gap-2"
                                        >
                                            <div className="flex justify-between items-baseline border-b border-dashed border-gray-800 pb-1">
                                                <span className="text-white text-sm font-bold uppercase tracking-tighter">
                                                    {">"} {activeModule.name}
                                                </span>
                                                <span className="text-interaction-red text-[10px] uppercase">
                                                    [{activeModule.type}]
                                                </span>
                                            </div>
                                            <div className="text-gray-400 text-xs leading-snug font-mono overflow-y-auto">
                                                <span className="mr-2 text-interaction-red">{">"}</span>
                                                <Typewriter text={activeModule.description} speed={15} />
                                                <span className="inline-block w-1.5 h-3 bg-interaction-red ml-1 animate-pulse align-middle"></span>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="h-full flex flex-col justify-center items-center text-gray-600"
                                        >
                                            <span className="animate-pulse text-xs tracking-widest uppercase">
                                                [ HOVER_TO_INSPECT ]
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Main Text - Data Log Style */}
                <div className="relative font-mono">
                    {/* Decorative Header */}
                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 border-b border-gray-800 pb-2">
                        <span className="text-interaction-red">{">"}</span>
                        <span className="uppercase tracking-widest">SUBJECT_ANALYSIS_LOG</span>
                        <span className="ml-auto">ID: 4945-A</span>
                    </div>

                    <div className="flex flex-col gap-6 text-sm md:text-base leading-relaxed text-gray-400 border-l border-gray-800 pl-6 relative">
                        {/* Decorative Line Marker */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-interaction-red via-transparent to-transparent"></div>

                        <p>
                            <span className="text-gray-600 mr-2">01</span>
                            I am a <ScrambleText text="Creative Technologist" className="text-white font-bold hover:text-interaction-red transition-colors" /> with a background in <ScrambleText text="Information Systems" className="text-white font-bold hover:text-interaction-red transition-colors" />, working at the intersection of technology and audio-visual production.
                        </p>
                        <p>
                            <span className="text-gray-600 mr-2">02</span>
                            I focus on <span className="text-white">video production</span>, <span className="text-white">audio engineering</span>, and <span className="text-white">web development</span>, combining creative ideas with practical technical solutions.
                        </p>
                        <p>
                            <span className="text-gray-600 mr-2">03</span>
                            I enjoy building <ScrambleText text="digital experiences" className="text-white font-bold hover:text-interaction-red transition-colors" /> that are simple, functional, and meaningful, while continuously learning and exploring new technologies to improve both creative and technical skills.
                        </p>
                    </div>

                    <div className="mt-8 flex gap-4 items-center opacity-50">
                        <div className="h-px bg-white w-12"></div>
                        <div className="text-[10px] font-mono text-gray-500">END_OF_TRANSMISSION</div>
                        <div className="h-px bg-gray-800 grow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
