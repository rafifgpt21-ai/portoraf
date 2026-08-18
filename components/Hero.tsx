"use client";

import { motion } from "framer-motion";
import { motionEase, useHydratedReducedMotion } from "@/components/motion";

export default function Hero() {
    const reduceMotion = useHydratedReducedMotion();
    const enter = reduceMotion ? { duration: 0 } : { duration: 0.56, ease: motionEase };

    return (
        <section id="top" className="relative z-10 grid min-h-[100svh] grid-rows-[auto_1fr_auto] overflow-hidden bg-paper pt-[70px] text-ink md:pt-[75px]">
            <div className="grid grid-cols-2 border-b-2 border-ink px-3 py-2 font-mono text-[8px] font-black uppercase tracking-[0.12em] md:grid-cols-4 md:px-7 md:text-[9px]">
                <span>Portfolio / Rafif Sidqi</span>
                <span className="text-right md:text-left">Jakarta / ID</span>
                <span className="hidden md:block">Independent creative systems</span>
                <span className="hidden text-right md:block">Available / MMXXVI</span>
            </div>

            <div className="relative flex min-h-[390px] items-center border-b-2 border-ink px-3 py-7 md:min-h-0 md:px-7 md:py-4">
                <div aria-hidden="true" className="absolute right-[7%] top-[10%] h-[34vw] max-h-[440px] w-[34vw] max-w-[440px] rounded-full border-2 border-ink/20" />
                <div aria-hidden="true" className="absolute right-[12%] top-[18%] h-[22vw] max-h-[290px] w-[22vw] max-w-[290px] rounded-full border border-ink/20" />
                <div aria-hidden="true" className="poster-hairlines absolute right-0 top-0 h-full w-[9%] border-l-2 border-ink/30 opacity-50" />
                <div className="absolute left-3 top-5 hidden font-mono text-[8px] font-black uppercase tracking-[0.18em] [writing-mode:vertical-rl] md:block">
                    Creative technologist / subject 4945-A
                </div>

                <h1 className="sr-only">Rafif Sidqi Mokobombang</h1>
                <div aria-hidden="true" className="relative z-10 w-full md:pl-10">
                    <motion.div
                        initial={reduceMotion ? false : { x: "-12vw", rotate: -1.5 }}
                        animate={{ x: 0, rotate: 0 }}
                        transition={{ ...enter, delay: 0.34 }}
                        className="relative whitespace-nowrap font-archivo text-[clamp(5.7rem,19vw,18rem)] uppercase leading-[0.65] tracking-[-0.09em]"
                    >
                        RAFIF
                        <motion.span
                            initial={reduceMotion ? false : { x: 26 }}
                            animate={{ x: 0 }}
                            transition={{ ...enter, delay: 0.48 }}
                            className="text-outline-signal absolute left-[36%] top-[10%] font-oswald font-medium tracking-[-0.08em]"
                        >
                            SIDQI
                        </motion.span>
                    </motion.div>

                    <motion.div
                        initial={reduceMotion ? false : { x: "10vw" }}
                        animate={{ x: 0 }}
                        transition={{ ...enter, delay: 0.52 }}
                        className="relative mt-4 flex items-end gap-3 md:mt-2"
                    >
                        <span className="font-oswald text-[clamp(2.65rem,10.6vw,10.5rem)] font-medium uppercase leading-[0.7] tracking-[-0.075em]">MOKOBOMBANG</span>
                        <span className="mb-1 hidden max-w-40 font-mono text-[8px] font-black uppercase leading-relaxed tracking-[0.12em] lg:block">モコボンバン<br />Multimedia / Systems / Sound</span>
                    </motion.div>
                </div>

                <div aria-hidden="true" className="absolute bottom-5 right-[7%] hidden h-10 w-44 poster-barcode md:block" />
            </div>

            <motion.div
                initial={reduceMotion ? false : { y: 70 }}
                animate={{ y: 0 }}
                transition={{ ...enter, delay: 0.62 }}
                className="grid border-b-2 border-ink bg-signal text-[#050505] md:grid-cols-[minmax(17rem,0.85fr)_minmax(24rem,1.45fr)_minmax(20rem,0.8fr)]"
            >
                <div className="border-b-2 border-ink p-4 md:border-b-0 md:border-r-2 md:p-5">
                    <span className="font-mono text-[8px] font-black uppercase tracking-[0.15em]">Practice / 001</span>
                    <p className="mt-2 font-archivo text-[clamp(1.7rem,3vw,3.4rem)] uppercase leading-[0.82] tracking-[-0.055em]">Multimedia<br />Producer</p>
                </div>

                <div className="hidden border-r-2 border-ink p-5 md:flex md:flex-col md:justify-between">
                    <p className="max-w-2xl font-oswald text-xl font-medium uppercase leading-tight tracking-[-0.025em] lg:text-2xl">
                        Systems engineer connecting moving image, sound, live production, and useful digital products.
                    </p>
                    <div className="mt-4 flex gap-5 font-mono text-[8px] font-black uppercase tracking-[0.12em]">
                        <span>English / C1</span><span>Core / Systems</span><span>Base / Jakarta</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1">
                    <a
                        href="#contact"
                        className="min-h-14 border-r-2 border-ink px-3 text-left font-oswald text-lg font-medium uppercase underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper md:border-b-2 md:border-r-0 md:px-5 md:text-2xl"
                    >
                        Start a project →
                    </a>
                    <a
                        href="https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/RAFIF%20SIDQI%20MOKOBOMBANG.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-14 items-center px-3 font-oswald text-lg font-medium uppercase underline decoration-2 underline-offset-4 hover:bg-ink hover:text-paper md:px-5 md:text-2xl"
                    >
                        Résumé ↗
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
