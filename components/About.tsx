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
                setDisplayedText(
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
        }
        return () => clearInterval(interval);
    }, [isHovered, text]);

    return (
        <span
            className={`cursor-pointer inline-block ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setDisplayedText(text);
            }}
        >
            {displayedText}
        </span>
    );
};

const Typewriter = ({ text, speed = 20 }: { text: string; speed?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                const nextCharacter = text.charAt(i);
                setDisplayedText((prev) => prev + nextCharacter);
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
    const [activeModule, setActiveModule] = useState<typeof modules[0]>(modules[0]);

    return (
        <section className="min-h-screen w-full border-t border-white/10 flex flex-col justify-center px-4 sm:px-6 md:px-12 relative overflow-hidden py-24 md:py-28">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12 shrink-0"
            >
                <div className="w-3 h-3 md:w-4 md:h-4 bg-white shrink-0" />
                <h2 className="text-[clamp(1.7rem,6.5vw,4.5rem)] leading-none font-bold text-white uppercase tracking-tighter flex flex-col md:flex-row items-baseline gap-2 md:gap-4 whitespace-nowrap">
                    [Introduction_Module]
                    <span className="text-sm md:text-base text-gray-500 opacity-50 font-normal tracking-normal">イントロダクション</span>
                </h2>
                <div className="h-px md:h-1 grow bg-gray-800 ml-1 md:ml-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-pulse"></div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 w-full max-w-[1600px] mx-auto">
                {/* Left Column: Interactive System Modules */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="border border-white/15 p-4 sm:p-6 relative flex flex-col gap-5 bg-black/50 backdrop-blur-sm"
                >
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
                    <div className="mt-4 border-t border-gray-800 pt-4 flex flex-col gap-4">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest">SKILL_MODULE</h3>
                            <div className="flex gap-2 items-center">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                <span className="text-[8px] text-white font-mono">LIVE</span>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                            {modules.map((mod, i) => (
                                <motion.button
                                    key={mod.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    viewport={{ once: true }}
                                    className={`min-h-16 sm:aspect-video border border-gray-800 relative group overflow-hidden transition-all duration-300 flex items-center justify-center p-2 ${activeModule.id === mod.id ? 'bg-white/10 border-white' : 'bg-black/50 hover:border-gray-600'}`}
                                    onMouseEnter={() => setActiveModule(mod)}
                                    onFocus={() => setActiveModule(mod)}
                                    onClick={() => setActiveModule(mod)}
                                    aria-pressed={activeModule.id === mod.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-in-out" />

                                    <span className="absolute top-1 right-1 text-[8px] text-gray-600 group-hover:text-white font-mono transition-colors opacity-0 group-hover:opacity-100">{mod.id}</span>

                                    {/* Module Name in Box */}
                                    <div className="z-10 text-center">
                                        <span className={`text-[11px] md:text-xs font-mono font-bold uppercase transition-colors ${activeModule.id === mod.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                            {mod.name}
                                        </span>
                                    </div>

                                    <div className={`absolute bottom-0 left-0 h-[2px] w-full ${activeModule.id === mod.id ? 'bg-white' : 'bg-transparent group-hover:bg-gray-700'} transition-colors`} />
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
                                                <span className="text-gray-500 text-[10px] uppercase">
                                                    [{activeModule.type}]
                                                </span>
                                            </div>
                                            <div className="text-gray-400 text-xs leading-snug font-mono overflow-y-auto">
                                                <span className="mr-2 text-white">{">"}</span>
                                                <Typewriter key={activeModule.id} text={activeModule.description} speed={15} />
                                                <span className="inline-block w-1.5 h-3 bg-white ml-1 animate-pulse align-middle"></span>
                                            </div>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Main Text - Data Log Style */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative font-mono"
                >
                    {/* Decorative Header */}
                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 border-b border-gray-800 pb-2">
                        <span className="text-white">{">"}</span>
                        <span className="uppercase tracking-widest">SUBJECT_ANALYSIS_LOG</span>
                        <span className="ml-auto">ID: 4945-A</span>
                    </div>

                    <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-gray-400 border-l border-gray-800 pl-5 md:pl-6 relative">
                        {/* Decorative Line Marker */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-white via-transparent to-transparent"></div>

                        <div className="border-b border-white/10 pb-4">
                            <span className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-gray-600">01 // CREATE</span>
                            <p>I am a <ScrambleText text="Creative Technologist" className="text-white font-bold hover:text-white transition-colors" /> working across camera, edit, color, composition, mixing, and mastering. I build complete audiovisual experiences for live events, streaming, and post-production.</p>
                        </div>
                        <div className="border-b border-white/10 pb-4">
                            <span className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-gray-600">02 // SYSTEMIZE</span>
                            <p>A <span className="text-white">Computer Science graduate in Information Systems</span>, I bring a systems mindset to creative work—making every workflow structured, technically reliable, and ready to scale.</p>
                        </div>
                        <div>
                            <span className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-gray-600">03 // CONNECT</span>
                            <p>I also work as a <ScrambleText text="Business Systems Analyst" className="text-white font-bold hover:text-white transition-colors" /> and web developer, using <span className="text-white">Next.js, AI, and emerging technology</span> to connect media craft with useful digital products.</p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4 items-center opacity-50">
                        <div className="h-px bg-white w-12"></div>
                        <div className="text-[10px] font-mono text-gray-500">END_OF_TRANSMISSION</div>
                        <div className="h-px bg-gray-800 grow"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
