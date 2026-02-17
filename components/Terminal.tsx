"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Copy, ExternalLink, Mail, Phone, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Helper to generate random hex string
const generateHex = (length: number) => {
    let result = '';
    const characters = '0123456789ABCDEF';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Scramble Text Component (reused for consistent theme)
const ScrambleText = ({ text, className, hover = true }: { text: string, className?: string, hover?: boolean }) => {
    const [displayedText, setDisplayedText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    useEffect(() => {
        if (!hover) return;

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
    }, [isHovered, text, hover]);

    return (
        <span
            className={`inline-block ${className} ${hover ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayedText}
        </span>
    );
};

// Typing Effect Component
const TypingEffect = ({ text, delay = 0, speed = 30 }: { text: string, delay?: number, speed?: number }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [started, text, speed]);

    return <span>{displayedText}</span>;
};

// Hex Matrix Stream Component
const HexStream = () => {
    const [stream, setStream] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStream(prev => {
                const newLine = generateHex(Math.floor(Math.random() * 10) + 10) + ' ' + generateHex(4);
                const newStream = [...prev, newLine];
                if (newStream.length > 20) newStream.shift(); // Keep last 20 lines
                return newStream;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-[10px] text-white/30 overflow-hidden h-full flex flex-col justify-end pointer-events-none select-none">
            {stream.map((line, i) => (
                <div key={i} className="opacity-50 hover:opacity-100 hover:text-interaction-red transition-opacity duration-75">
                    {line}
                </div>
            ))}
        </div>
    );
};


// Glitch Text Component (for header)
const GlitchText = ({ text }: { text: string }) => {
    return (
        <span className="glitch-wrapper font-bold" data-text={text}>
            {text}
        </span>
    );
};


interface ContactProtocolProps {
    label: string;
    subLabel: string;
    value: string;
    actionLink: string;
    copyValue: string;
    icon: React.ReactNode;
    color: string;
}

const ContactProtocol = ({ label, subLabel, value, actionLink, copyValue, icon, color }: ContactProtocolProps) => {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Track hover state for lock-on effect

    const handleSuccess = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const fallbackCopy = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            handleSuccess();
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    };

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!navigator.clipboard) {
            fallbackCopy(copyValue);
            return;
        }
        try {
            await navigator.clipboard.writeText(copyValue);
            handleSuccess();
        } catch (err) {
            console.error('Clipboard API failed', err);
            fallbackCopy(copyValue);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative border border-white/20 bg-black/50 hover:border-interaction-red/50 hover:bg-interaction-red/5 transition-all duration-300 overflow-hidden"
        >
            {/* Lock-on Brackets Effect */}
            <motion.div
                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-interaction-red pointer-events-none"
                initial={{ opacity: 0, top: -5, left: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, top: isHovered ? 0 : -5, left: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-interaction-red pointer-events-none"
                initial={{ opacity: 0, top: -5, right: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, top: isHovered ? 0 : -5, right: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-interaction-red pointer-events-none"
                initial={{ opacity: 0, bottom: -5, left: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, bottom: isHovered ? 0 : -5, left: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-interaction-red pointer-events-none"
                initial={{ opacity: 0, bottom: -5, right: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, bottom: isHovered ? 0 : -5, right: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
            />

            {/* Hover Indicator */}
            {/* Removed in favor of bracket effect or kept subtle? Keeping for visual weight but reducing distinctness if brackets take focus. */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-interaction-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom`} />

            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
                {/* Left: Info */}
                <div className="flex gap-4 items-center">
                    <div className={`p-3 bg-transparent border border-white/20 text-gray-400 group-hover:text-interaction-red group-hover:border-interaction-red transition-colors duration-300`}>
                        {icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-interaction-red font-bold transition-colors`}>{label}</span>
                            <span className="text-[10px] text-white/40 font-mono">[{subLabel}]</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-mono text-white group-hover:text-interaction-red transition-colors duration-300 font-bold">
                            <ScrambleText text={value} hover={isHovered} />
                        </h3>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex gap-2 w-full md:w-auto">
                    <a
                        href={actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-white/20 hover:border-interaction-red hover:bg-interaction-red text-white hover:text-black font-mono text-xs uppercase tracking-wider transition-all duration-300 font-bold"
                    >
                        <span>Initiate</span>
                        <ArrowRight size={14} />
                    </a>
                    <button
                        onClick={handleCopy}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-white/20 font-mono text-xs uppercase tracking-wider transition-all duration-300 font-bold ${copied ? 'bg-interaction-red border-interaction-red text-black shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'hover:border-interaction-red hover:bg-interaction-red hover:text-black text-white'}`}
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.span
                                    key="copied"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2 }}
                                    className="flex items-center gap-2 font-black"
                                >
                                    [DATA_COPIED] <Check size={14} strokeWidth={3} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="copy"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2"
                                >
                                    COPY DATA <Copy size={14} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Decorative Scanline */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </motion.div>
    );
};

export default function Terminal() {
    return (
        <section className="min-h-screen w-screen flex flex-col justify-center px-8 md:px-16 relative bg-black text-white overflow-hidden">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12 border-b border-white/20 pb-4 w-full">
                <div className="flex items-center gap-3">
                    <TerminalIcon className="text-white w-6 h-6" />
                    <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter cursor-crosshair hover:text-interaction-red transition-colors duration-300">
                        <GlitchText text="[Connection_Protocol]" />
                    </h2>
                </div>
                <div className="flex gap-4 text-xs font-mono text-gray-500 font-bold">
                    <span>STATUS: OPEN</span>
                    <span>ENCRYPTION: ENABLED</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {/* Left Panel: Terminal Output (Decorative) */}
                <div className="lg:col-span-1 border border-white/20 bg-black/50 p-4 font-mono text-xs md:text-sm text-white/80 flex flex-col h-full min-h-[300px] relative overflow-hidden group hover:border-interaction-red/50 transition-colors duration-300">
                    {/* CRT Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%] bg-repeat opacity-10 z-10" />

                    <div className="mb-4 text-white font-bold z-10">
                        <span className="text-gray-500">{">"}</span> <TypingEffect text="SYSTEM_DIAGNOSTIC_TOOL_V2.4" speed={50} />
                        <br />
                        <span className="text-gray-500">{">"}</span> <TypingEffect text="CHECKING_PORTS... OK" delay={1500} speed={30} />
                        <br />
                        <span className="text-gray-500">{">"}</span> <TypingEffect text="PINGING_JAKARTA_SERVER... 4ms" delay={3000} speed={20} />
                    </div>

                    <div className="space-y-2 grow opacity-80 font-bold z-10">
                        <p className="flex"><span className="text-gray-500 mr-2">{">"}</span> <TypingEffect text="INCOMING_TRANSMISSION_REQUEST..." delay={4500} /></p>
                        <p className="flex"><span className="text-gray-500 mr-2">{">"}</span> <TypingEffect text="SELECT_PROTOCOL_BELOW_TO_PROCEED" delay={6500} /></p>
                        <p className="flex"><span className="text-gray-500 mr-2">{">"}</span> <TypingEffect text="WAITING_FOR_USER_INPUT_" delay={8000} /><span className="inline-block w-2 h-4 bg-gray-500 animate-pulse ml-1" /></p>

                        <div className="mt-4 p-2 border border-dashed border-white/20 text-white/50 break-all hover:text-interaction-red hover:border-interaction-red transition-colors duration-300 h-32 overflow-hidden relative">
                            <HexStream />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>


                    </div>

                    <div className="mt-auto pt-4 border-t border-white/20 flex justify-between items-center text-[10px] text-white/60 font-bold z-10">
                        <span>UPTIME: 99.9%</span>
                        <span className="bg-white text-black px-1 font-bold">ONLINE</span>
                    </div>
                </div>

                {/* Right Panel: Interactive Contact List */}
                <div id="contact-protocols" className="lg:col-span-2 flex flex-col gap-4 ">
                    <ContactProtocol
                        label="WHATSAPP_UPLINK"
                        subLabel="DIRECT_LINE"
                        value="+62 855-9895-967"
                        copyValue="+628559895967"
                        actionLink="https://wa.me/628559895967"
                        icon={<Phone size={20} />}
                        color="white"
                    />

                    <ContactProtocol
                        label="EMAIL_RELAY"
                        subLabel="ASYNC_MSG"
                        value="rafifsidqi2138@gmail.com"
                        copyValue="rafifsidqi2138@gmail.com"
                        actionLink="mailto:rafifsidqi2138@gmail.com"
                        icon={<Mail size={20} />}
                        color="white"
                    />

                    <ContactProtocol
                        label="LINKEDIN_NEURAL_NET"
                        subLabel="PROFESSIONAL_NET"
                        value="linkedin.com/in/rafifsidqi"
                        copyValue="https://www.linkedin.com/in/rafifsidqi"
                        actionLink="https://www.linkedin.com/in/rafifsidqi"
                        icon={<ExternalLink size={20} />}
                        color="white"
                    />
                </div>
            </div>
        </section>
    );
}
