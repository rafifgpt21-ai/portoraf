"use client";

import { useState } from "react";
import { Send, Terminal as TerminalIcon } from "lucide-react";

export default function Terminal() {
    const [inputVal, setInputVal] = useState("");
    const [logs, setLogs] = useState<string[]>([
        "INITIALIZING CONNECTION PROTOCOL...",
        "ESTABLISHED SECURE LINK TO JAKARTA_SERVER",
        "ENTER COMMAND OR MESSAGE:",
    ]);

    const handleSend = () => {
        if (!inputVal.trim()) return;

        setLogs((prev) => [...prev, `> ${inputVal}`, "TRANSMISSION FAILED: OFFLINE MODE ADJUCTED. REDIRECTING TO EMAIL PROTOCOL..."]);

        setTimeout(() => {
            window.location.href = `mailto:rafif.mokobombang@example.com?body=${encodeURIComponent(inputVal)}`;
        }, 1500);

        setInputVal("");
    };

    return (
        <section className="py-20 px-4 md:px-12 w-full mb-20">
            <div className="flex items-center gap-4 mb-8">
                <TerminalIcon className="text-white w-8 h-8" />
                <h2 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter">
                    [Connection_Protocol]
                </h2>
            </div>

            <div className="bg-gray-950 border-2 border-gray-800 p-4 font-mono text-sm md:text-base shadow-[10px_10px_0px_0px_#121212] relative overflow-hidden w-full max-w-5xl">
                {/* CRT Scanline */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02),rgba(255,255,255,0.06))] bg-size-[100%_4px,3px_100%] bg-repeat opacity-20 z-10" />

                <div className="h-64 overflow-y-auto mb-4 text-gray-300 font-bold space-y-2 p-4 border border-gray-900 bg-black/50">
                    {logs.map((log, i) => (
                        <p key={i}>{log}</p>
                    ))}
                </div>

                <div className="flex gap-4 items-center relative z-20">
                    <span className="text-white">{">"}</span>
                    <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="bg-transparent border-none outline-none text-white w-full placeholder-gray-700 font-mono"
                        placeholder="TYPE_MESSAGE..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-white text-black px-6 py-2 font-bold uppercase hover:bg-interaction-red hover:text-white transition-colors flex items-center gap-2"
                    >
                        Send <Send size={16} />
                    </button>
                </div>

                {/* Contact Links */}
                <div className="mt-8 pt-8 border-t border-gray-800 flex flex-wrap gap-8 text-gray-500">
                    <a href="#" className="hover:text-interaction-red transition-colors">[LINKEDIN_uplink]</a>
                    <a href="mailto:rafif@example.com" className="hover:text-interaction-red transition-colors">[EMAIL_relay]</a>
                    <span>[LOC: Jakarta, ID]</span>
                </div>
            </div>
        </section>
    );
}
