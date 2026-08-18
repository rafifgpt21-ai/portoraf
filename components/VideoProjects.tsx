"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";
import BrutalistSection from "@/components/BrutalistSection";
import { shutterTransition, useHydratedReducedMotion } from "@/components/motion";

export default function VideoProjects() {
    const [open, setOpen] = useState(false);
    const reduceMotion = useHydratedReducedMotion();
    const shutter = reduceMotion ? { duration: 0 } : shutterTransition;

    return (
        <BrutalistSection id="reel" index="02" title="SELECTED REEL" subtitle="プロジェクト・リカプス / MOTION_ARCHIVE" tone="signal">
            <div className="grid border-b-[3px] border-ink lg:grid-cols-[20rem_1fr]">
                <aside className="grid grid-cols-2 border-b-[3px] border-ink lg:grid-cols-1 lg:border-b-0 lg:border-r-[3px]">
                    {[
                        ["YEAR", "2022—2026"],
                        ["ROLE", "MULTIMEDIA PRODUCER"],
                        ["DISCIPLINES", "DIRECTION / CAMERA / EDIT / COLOR / SOUND"],
                        ["SIGNAL", "YOUTUBE / 16:9 / STEREO"],
                    ].map(([label, value], index) => (
                        <div key={label} className={`min-h-28 p-4 md:p-6 ${index % 2 === 0 ? "border-r-[3px] lg:border-r-0" : ""} ${index < 3 ? "border-b-[3px] border-ink" : ""}`}>
                            <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-ink/45">{label}</span>
                            <strong className="mt-4 block font-oswald text-xl uppercase leading-none md:text-2xl">{value}</strong>
                        </div>
                    ))}
                </aside>

                <div className="min-w-0 p-4 md:p-8 lg:p-10">
                    <div className="mb-5 flex flex-col gap-3 border-b-[3px] border-ink pb-5 md:flex-row md:items-end md:justify-between">
                        <div className="min-w-0">
                            <span className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-ink/45">Case study / 001</span>
                            <h3 className="mt-2 max-w-full break-words font-archivo text-[clamp(1.95rem,6vw,7rem)] uppercase leading-[0.8] tracking-[-0.065em]">PROJECT RECAP</h3>
                        </div>
                        <p className="max-w-md font-mono text-xs font-bold uppercase leading-relaxed md:text-right">A compressed field report spanning production, post-production, and technical delivery.</p>
                    </div>

                    <div className="relative h-[260px] overflow-hidden border-[3px] border-ink bg-ink md:aspect-video md:h-auto">
                        {open ? (
                            <iframe
                                src="https://www.youtube.com/embed/vj0yMO6_XN0?autoplay=1&rel=0&modestbranding=1"
                                title="Rafif Sidqi selected multimedia production reel"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full"
                            />
                        ) : null}

                        {[
                            { key: "top", className: "left-0 top-0 w-full bg-ink", openStyle: { height: 0 }, closedStyle: { height: "50%" } },
                            { key: "bottom", className: "bottom-0 left-0 w-full bg-ink", openStyle: { height: 0 }, closedStyle: { height: "50%" } },
                            { key: "left", className: "left-0 top-0 h-full border-r-[3px] border-paper bg-ink", openStyle: { width: 0 }, closedStyle: { width: "50%" } },
                            { key: "right", className: "right-0 top-0 h-full border-l-[3px] border-paper bg-ink", openStyle: { width: 0 }, closedStyle: { width: "50%" } },
                        ].map((panel) => (
                            <motion.div
                                key={panel.key}
                                aria-hidden="true"
                                className={`absolute z-10 ${panel.className}`}
                                animate={open ? panel.openStyle : panel.closedStyle}
                                transition={shutter}
                            />
                        ))}

                        <AnimatePresence>
                            {!open ? (
                                <motion.div
                                    key="gate"
                                    initial={reduceMotion ? false : { scale: 1.08 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.92, opacity: 0 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center p-5 text-center text-paper"
                                >
                                    <span className="w-full max-w-sm break-words px-2 font-mono text-[8px] font-black uppercase tracking-[0.14em] text-paper/55 md:text-[9px] md:tracking-[0.22em]">Encrypted signal detected // archive 904-X</span>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(true)}
                                        className="mt-6 flex items-center gap-4 border-[3px] border-paper bg-paper px-6 py-4 font-archivo text-xl uppercase text-ink transition-transform hover:-translate-x-1 hover:-translate-y-1 md:text-3xl"
                                    >
                                        <Play className="h-5 w-5 fill-current" /> Initialize reel
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="close"
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    initial={{ y: -60 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -60 }}
                                    className="absolute right-3 top-3 z-30 flex items-center gap-2 border-[3px] border-paper bg-ink px-3 py-2 font-mono text-[9px] font-black uppercase text-paper hover:bg-signal hover:text-[#050505]"
                                >
                                    <X className="h-4 w-4" /> Terminate
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden border-b-[3px] border-ink bg-signal py-2 text-[#050505]">
                <div className="brutal-marquee flex w-max whitespace-nowrap font-archivo text-2xl uppercase tracking-[-0.03em] md:text-4xl">
                    <span className="pr-10">DIRECTION / CAMERA / EDIT / COLOR / SOUND / DELIVERY /</span>
                    <span className="pr-10" aria-hidden="true">DIRECTION / CAMERA / EDIT / COLOR / SOUND / DELIVERY /</span>
                </div>
            </div>
        </BrutalistSection>
    );
}
