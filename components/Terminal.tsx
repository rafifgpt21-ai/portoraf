"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import BrutalistSection from "@/components/BrutalistSection";
import { motionEase, useHydratedReducedMotion } from "@/components/motion";

function TypedLine({ text, delay = 0 }: { text: string; delay?: number }) {
    const [display, setDisplay] = useState("");
    const reduceMotion = useHydratedReducedMotion();

    useEffect(() => {
        if (reduceMotion) {
            const frame = requestAnimationFrame(() => setDisplay(text));
            return () => cancelAnimationFrame(frame);
        }
        let index = 0;
        let interval: number | undefined;
        const timeout = window.setTimeout(() => {
            interval = window.setInterval(() => {
                setDisplay((previous) => previous + text.charAt(index));
                index += 1;
                if (index >= text.length && interval) window.clearInterval(interval);
            }, 22);
        }, delay);
        return () => {
            window.clearTimeout(timeout);
            if (interval) window.clearInterval(interval);
        };
    }, [delay, reduceMotion, text]);

    return <span>{display}</span>;
}

interface ContactProtocolProps {
    index: string;
    label: string;
    subLabel: string;
    value: string;
    actionLink: string;
    copyValue: string;
    icon: ReactNode;
    delay: number;
}

function ContactProtocol({ index, label, subLabel, value, actionLink, copyValue, icon, delay }: ContactProtocolProps) {
    const [copied, setCopied] = useState(false);
    const reduceMotion = useHydratedReducedMotion();

    const copy = async () => {
        try {
            if (navigator.clipboard) await navigator.clipboard.writeText(copyValue);
            else {
                const field = document.createElement("textarea");
                field.value = copyValue;
                field.style.position = "fixed";
                document.body.appendChild(field);
                field.select();
                document.execCommand("copy");
                document.body.removeChild(field);
            }
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1700);
        } catch (error) {
            console.error("Unable to copy contact data", error);
        }
    };

    return (
        <motion.article
            initial={reduceMotion ? false : { y: 90, rotate: delay * 16 - 1.2 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 160, damping: 18, delay }}
            className="group relative overflow-hidden border-b-2 border-r-2 border-ink bg-paper text-ink last:border-r-0"
        >
            <div className="flex min-h-[21rem] flex-col md:min-h-[25rem]">
                <div className="flex items-center justify-between border-b-2 border-ink p-4 md:p-5">
                    <span className="font-oswald text-5xl font-medium text-signal md:text-7xl">{index}</span>
                    <span>{icon}</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between p-5 md:p-7">
                    <span className="font-mono text-[8px] font-black uppercase tracking-[0.15em] text-ink/45">{label}<br />{subLabel}</span>
                    <h3 className="my-6 break-all font-oswald text-[clamp(2rem,3.2vw,4rem)] font-medium uppercase leading-[0.86] tracking-[-0.055em]">{value}</h3>
                    <span className="poster-barcode h-7 w-2/3 opacity-80" aria-hidden="true" />
                </div>
                <div className="grid grid-cols-2 border-t-2 border-ink">
                    <a
                        href={actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-14 items-center justify-center gap-2 border-r-2 border-ink px-4 font-mono text-[9px] font-black uppercase hover:bg-ink hover:text-paper"
                    >
                        Open <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button type="button" onClick={copy} className="flex min-h-14 items-center justify-center gap-2 px-4 font-mono text-[9px] font-black uppercase hover:bg-signal hover:text-[#050505]">
                        Copy <Copy className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {copied ? (
                    <motion.div
                        initial={reduceMotion ? false : { scaleX: 0, rotate: -2 }}
                        animate={{ scaleX: 1, rotate: 0 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.22, ease: motionEase }}
                        className="absolute inset-0 z-10 flex origin-left items-center justify-center border-y-[5px] border-ink bg-signal font-archivo text-[clamp(2rem,5vw,5rem)] uppercase text-[#050505]"
                    >
                        <Check className="mr-3 h-8 w-8 stroke-[4] md:h-12 md:w-12" /> [DATA_COPIED]
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.article>
    );
}

export default function Terminal() {
    return (
        <BrutalistSection id="contact" index="04" title="CONTACT" subtitle="接続プロトコル / OPEN_CHANNEL" tone="paper">
            <div className="relative min-h-[42rem] overflow-hidden border-b-2 border-ink px-4 py-12 md:min-h-[50rem] md:px-8 md:py-16">
                <span aria-hidden="true" className="text-outline-signal absolute -right-5 top-7 font-archivo text-[clamp(8rem,25vw,27rem)] uppercase leading-[0.7] tracking-[-0.09em]">HELLO</span>
                <div className="relative z-10 flex min-h-[33rem] flex-col justify-between md:min-h-[40rem]">
                    <div className="grid gap-6 md:grid-cols-[1fr_24rem]">
                        <p className="max-w-5xl font-archivo text-[clamp(4rem,11vw,12rem)] uppercase leading-[0.7] tracking-[-0.08em]">LET&apos;S MAKE<br />SOMETHING<br /><span className="text-signal">USEFUL.</span></p>
                        <p className="self-start border-t-2 border-ink pt-3 font-oswald text-lg font-medium uppercase leading-tight md:text-2xl">Available for multimedia production, systems work, live events, and thoughtful collaborations.</p>
                    </div>
                    <div className="grid border-2 border-ink bg-ink p-4 font-mono text-[9px] font-black uppercase leading-relaxed text-paper md:grid-cols-[1fr_auto] md:p-5">
                        <p><span className="text-signal">&gt;</span> <TypedLine text="OPEN_CHANNEL // JAKARTA_NODE // READY" /></p>
                        <p className="mt-2 md:mt-0"><TypedLine text="SELECT A CONTACT METHOD BELOW" delay={450} /></p>
                    </div>
                </div>
            </div>

            <div id="contact-protocols" className="grid border-b-2 border-l-2 border-ink lg:grid-cols-3">
                <ContactProtocol index="01" label="WHATSAPP_UPLINK" subLabel="DIRECT_LINE" value="+62 855-9895-967" copyValue="+628559895967" actionLink="https://wa.me/628559895967" icon={<MessageCircle className="h-6 w-6" />} delay={0} />
                <ContactProtocol index="02" label="EMAIL_RELAY" subLabel="ASYNC_MSG" value="rafifsidqi2138@gmail.com" copyValue="rafifsidqi2138@gmail.com" actionLink="mailto:rafifsidqi2138@gmail.com" icon={<Mail className="h-6 w-6" />} delay={0.08} />
                <ContactProtocol index="03" label="LINKEDIN_NEURAL_NET" subLabel="PROFESSIONAL_NET" value="linkedin.com/in/rafifsidqi" copyValue="https://www.linkedin.com/in/rafifsidqi" actionLink="https://www.linkedin.com/in/rafifsidqi" icon={<ExternalLink className="h-6 w-6" />} delay={0.16} />
            </div>

            <footer className="grid min-h-28 grid-cols-1 bg-signal text-[#050505] md:grid-cols-[1fr_auto]">
                <div className="flex items-center p-5 font-archivo text-[clamp(2.2rem,5vw,6rem)] uppercase leading-none tracking-[-0.055em] md:p-8">MAKE THE SIGNAL USEFUL.</div>
                <div className="flex items-center border-t-2 border-ink px-5 font-mono text-[9px] font-black uppercase tracking-[0.15em] md:border-l-2 md:border-t-0 md:px-8">END OF TRANSMISSION / 2026</div>
            </footer>
        </BrutalistSection>
    );
}
