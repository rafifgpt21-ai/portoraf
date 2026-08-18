"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import BrutalistSection from "@/components/BrutalistSection";
import { stampIn, useHydratedReducedMotion } from "@/components/motion";

const modules = [
    { id: "01", name: "DaVinci Resolve", category: "VIDEO / COLOR", type: "CORE", description: "Professional video editing, cinematic color grading, finishing, and delivery." },
    { id: "02", name: "Cubase Pro", category: "AUDIO / ENGINEERING", type: "CORE", description: "Music production, multitrack recording, detailed editing, mixing, and mastering." },
    { id: "03", name: "FL Studio", category: "AUDIO / PRODUCTION", type: "TOOL", description: "Electronic composition, sound design, beat construction, and arrangement." },
    { id: "04", name: "Web Development", category: "SYSTEMS / WEB", type: "DEV", description: "Performant digital products built with Next.js, React, and modern frontend systems." },
    { id: "05", name: "Resolume Arena", category: "LIVE / VISUALS", type: "VJ", description: "Real-time video mixing, projection mapping, and live visual performance systems." },
    { id: "06", name: "OBS Studio", category: "LIVE / BROADCAST", type: "STREAM", description: "Reliable broadcast systems for professional live streaming and recording." },
];

const statements = [
    { id: "A", label: "CREATE", text: "I work across camera, edit, color, composition, mixing, and mastering—building complete audiovisual experiences for live events, streaming, and post-production." },
    { id: "B", label: "SYSTEMIZE", text: "A Computer Science graduate in Information Systems, I bring structure, technical reliability, and scalable thinking to creative production." },
    { id: "C", label: "CONNECT", text: "As a business systems analyst and web developer, I use Next.js, AI, and emerging technology to connect media craft with useful digital products." },
];

export default function About() {
    const [activeModule, setActiveModule] = useState(modules[0]);
    const reduceMotion = useHydratedReducedMotion();

    return (
        <BrutalistSection id="about" index="01" title="PROFILE" subtitle="イントロダクション / SUBJECT_ANALYSIS" tone="paper">
            <div className="grid min-h-screen lg:grid-cols-[0.86fr_1.14fr]">
                <div className="border-b-2 border-ink lg:border-b-0 lg:border-r-2">
                    <div className="grid grid-cols-2 border-b-2 border-ink font-mono text-[9px] font-bold uppercase tracking-[0.15em]">
                        <div className="border-r-2 border-ink p-3 md:p-4">ID / RAFIF_SIDQI</div>
                        <div className="p-3 text-right md:p-4">STATUS / ACTIVE</div>
                    </div>

                    <div className="p-4 md:p-8">
                        <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">Selected tools / click to inspect</p>
                        <div className="grid grid-cols-2 border-l-2 border-t-2 border-ink sm:grid-cols-3">
                            {modules.map((module) => {
                                const selected = activeModule.id === module.id;
                                return (
                                    <motion.button
                                        key={module.id}
                                        type="button"
                                        aria-pressed={selected}
                                        onMouseEnter={() => setActiveModule(module)}
                                        onFocus={() => setActiveModule(module)}
                                        onClick={() => setActiveModule(module)}
                                        whileHover={reduceMotion ? undefined : { x: -4, y: -4 }}
                                        className={`group relative min-h-28 border-b-2 border-r-2 border-ink p-3 text-left uppercase transition-colors ${selected ? "bg-signal text-[#050505]" : "bg-paper text-ink hover:bg-ink hover:text-paper"}`}
                                    >
                                        <span className={`font-archivo text-3xl leading-none ${selected ? "text-ink" : "text-ink/20 group-hover:text-paper/30"}`}>{module.id}</span>
                                        <span className="mt-5 block font-oswald text-base font-bold leading-none">{module.name}</span>
                                        <span className="mt-2 block font-mono text-[8px] font-bold tracking-[0.12em] opacity-60">{module.category}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="mt-6 min-h-52 overflow-hidden border-2 border-ink bg-blush text-ink">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeModule.id}
                                    variants={stampIn}
                                    initial={reduceMotion ? "visible" : "hidden"}
                                    animate="visible"
                                    exit={reduceMotion ? undefined : "exit"}
                                    className="flex min-h-52 flex-col justify-between p-5 md:p-7"
                                >
                                    <div className="flex justify-between border-b-2 border-ink pb-2 font-mono text-[9px] font-black uppercase">
                                        <span>STAMP / {activeModule.id}</span>
                                        <span>{activeModule.type}</span>
                                    </div>
                                    <h3 className="font-archivo text-[clamp(2.2rem,5vw,5.5rem)] leading-[0.78] tracking-[-0.06em]">{activeModule.name}</h3>
                                    <p className="max-w-xl font-mono text-xs font-bold leading-relaxed md:text-sm">{activeModule.description}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="bg-paper text-ink">
                    <div className="relative overflow-hidden border-b-2 border-ink p-5 md:p-8">
                        <span aria-hidden="true" className="text-outline-signal absolute -right-4 -top-3 font-archivo text-[clamp(5rem,10vw,11rem)] uppercase leading-none opacity-60">NOW</span>
                        <p className="relative font-archivo text-[clamp(3rem,7vw,8.5rem)] uppercase leading-[0.78] tracking-[-0.07em]">
                            CREATIVE<br />TECHNOLOGIST<span className="text-signal">.</span>
                        </p>
                    </div>
                    <div>
                        {statements.map((statement, index) => (
                            <motion.article
                                key={statement.id}
                                initial={reduceMotion ? false : { x: index % 2 === 0 ? 90 : -90 }}
                                whileInView={{ x: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                                className="grid grid-cols-[4rem_1fr] border-b-2 border-ink md:grid-cols-[7rem_1fr]"
                            >
                                <div className="flex items-start justify-center border-r-2 border-ink bg-signal py-5 font-archivo text-4xl text-[#050505] md:text-6xl">{statement.id}</div>
                                <div className="p-5 md:p-8">
                                    <h3 className="font-archivo text-3xl leading-none tracking-[-0.04em] md:text-5xl">{statement.label}</h3>
                                    <p className="mt-4 max-w-2xl font-mono text-sm font-medium leading-relaxed md:text-base">{statement.text}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </BrutalistSection>
    );
}
