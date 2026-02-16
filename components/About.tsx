"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="py-20 px-4 md:px-12 w-full border-t border-gray-900">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-4 h-4 bg-white" />
                <h2 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter flex flex-col md:flex-row items-baseline gap-4">
                    [Introduction_Module]
                    <span className="text-sm md:text-lg text-gray-500 opacity-50 font-normal tracking-normal">イントロダクション</span>
                </h2>
                <div className="h-1 grow bg-gray-800 ml-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                {/* Left Column: Decorative / Context */}
                <div className="border border-gray-800 p-6 relative h-full flex flex-col justify-between bg-black/40 backdrop-blur-sm">
                    <span className="absolute top-0 left-0 bg-white text-black text-xs px-2 py-1 font-mono font-bold">
                        ID: RAFIF_SIDQI
                    </span>
                    <span className="absolute bottom-0 right-0 bg-gray-800 text-gray-400 text-xs px-2 py-1 font-mono">
                        STATUS: ACTIVE
                    </span>

                    <div className="space-y-4 font-mono text-sm text-gray-400 mt-8">
                        <p>{">"} INITIALIZING BIO_METRICS...</p>
                        <p>{">"} LOADING PERSONAL_DATA...</p>
                        <p>{">"} SUBJECT: CREATIVE TECHNOLOGIST</p>
                        <p>{">"} BACKGROUND: INFORMATION SYSTEMS</p>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-4">
                        <h3 className="text-xl font-bold text-white uppercase mb-2">Primary Focus</h3>
                        <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside marker:text-white">
                            <li>Video Production</li>
                            <li>Audio Engineering</li>
                            <li>Web Development</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Main Text */}
                <div className="flex flex-col gap-6 text-lg md:text-xl leading-relaxed text-gray-300 font-light">
                    <p>
                        I am a <span className="text-white font-bold">Creative Technologist</span> with a background in <span className="text-white font-bold">Information Systems</span>, working at the intersection of technology and audio-visual production. I focus on video production, audio engineering, and web development, combining creative ideas with practical technical solutions.
                    </p>
                    <p>
                        I enjoy building digital experiences that are simple, functional, and meaningful, while continuously learning and exploring new technologies to improve both creative and technical skills.
                    </p>

                    <div className="mt-4 flex gap-4">
                        <div className="h-1 bg-white w-12"></div>
                        <div className="h-1 bg-gray-800 grow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
