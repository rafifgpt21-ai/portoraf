"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, Terminal, X } from "lucide-react";

export default function VideoProjects() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <section className="py-20 px-4 md:px-12 w-full border-t border-gray-900">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-4 h-4 bg-white" />
                <h2 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter flex flex-col md:flex-row items-baseline gap-4">
                    [Project_Recap]
                    <span className="text-sm md:text-lg text-gray-500 opacity-50 font-normal tracking-normal">プロジェクト・リカプス</span>
                </h2>
                <div className="h-1 grow bg-gray-800 ml-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-glitch opacity-50"></div>
                </div>
            </div>

            <div className="relative w-full overflow-hidden min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!isVisible ? (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative min-h-[400px] w-full flex flex-col items-center justify-center gap-8 border border-gray-900 bg-black/50 overflow-hidden"
                        >
                            {/* Animated Background Grid */}
                            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                                    backgroundSize: '40px 40px'
                                }}
                            />

                            {/* Scanning Line Animation */}
                            <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-white/5 to-transparent h-full w-full animate-pulse pointer-events-none" />

                            {/* Tech Decor: ID Numbers */}
                            <div className="absolute top-6 left-6 text-[10px] text-gray-600 font-mono tracking-widest">
                                SYS.RECAP//ID:904-X
                            </div>
                            <div className="absolute bottom-6 right-6 text-[10px] text-gray-600 font-mono tracking-widest">
                                SECURE_CHANNEL_LOCKED
                            </div>

                            {/* Tech Decor: Brackets */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-gray-800" />
                            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gray-800" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-gray-800" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gray-800" />

                            {/* Main Interactive Area */}
                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div className="font-mono text-gray-500 text-sm tracking-[0.25em] text-center animate-pulse">
                                    // ENCRYPTED_SIGNAL_DETECTED
                                </div>

                                <button
                                    onClick={() => setIsVisible(true)}
                                    className="group relative px-12 py-6 bg-black border border-white text-white font-mono text-xl tracking-wider overflow-hidden hover:border-interaction-red hover:text-interaction-red transition-all duration-300 cursor-pointer"
                                >
                                    {/* Hover Fill Effect */}
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                                    <span className="relative z-10 flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                                        <Terminal className="w-5 h-5" />
                                        INITIALIZE_RECAP
                                    </span>

                                    {/* Corner Accents on Button */}
                                    <div className="absolute top-0 left-0 w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Glitch Overlay */}
                                    <div className="absolute inset-0 bg-interaction-red/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-75 mix-blend-screen" />
                                </button>

                                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-mono group hover:text-gray-400 transition-colors cursor-default">
                                    Awaiting Decryption Key...
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="video"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-full aspect-video group"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Scanline Overlay */}
                            <div className={`absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] bg-repeat ${isHovered ? "opacity-50" : "opacity-20"} transition-opacity duration-300`} />

                            {/* CRT Screen Border Effect */}
                            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />

                            {/* Terminate Button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-1 bg-black/80 border border-interaction-red/50 text-interaction-red text-xs font-mono tracking-widest hover:bg-interaction-red/10 hover:border-interaction-red transition-all duration-300 cursor-pointer"
                            >
                                <X className="w-3 h-3" />
                                TERMINATE_SIGNAL
                            </button>

                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/vj0yMO6_XN0?autoplay=1&rel=0&modestbranding=1"
                                title="Project Recap"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full object-cover"
                            ></iframe>

                            {/* Corner Accents */}
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white opacity-50 group-hover:opacity-100 transition-opacity" />

                            {/* Status Text */}
                            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 font-mono text-xs text-interaction-red opacity-0 group-hover:opacity-100 transition-opacity">
                                Playback_Active
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
