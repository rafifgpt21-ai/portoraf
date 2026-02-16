"use client";

import { useState, useEffect } from "react";
import { Activity, Radio, Zap } from "lucide-react";

const SCIFI_LOGS = [
    "LINK_ESTABLISHED",
    "DECRYPTING_PACKET",
    "HANDSHAKE_COMPLETE",
    "BUFFER_FLUSHED",
    "ROUTING_PROXY",
    "SYNAPSE_FIRING",
    "PATTERN_MATCHED",
    "TRACE_COMPLETE",
    "PACKET_RECEIVED",
    "NODE_SYNCED",
    "RENDERING_FRAME",
    "MEMORY_OPTIMIZED",
];

const JAPANESE_TEXTS = [
    "システム正常", // System Normal
    "データ転送中", // Data Transferring
    "接続安定",     // Connection Stable
    "セキュリティ",   // Security
];

export default function TelemetryTopBar() {
    const [syncRate, setSyncRate] = useState(0);
    const [entropy, setEntropy] = useState(0);
    const [flux, setFlux] = useState(0);
    const [currentLog, setCurrentLog] = useState("");
    const [jpText, setJpText] = useState(JAPANESE_TEXTS[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSyncRate(Math.floor(Math.random() * 20) + 80); // 80-99%
            setEntropy(Math.floor(Math.random() * 100));
            setFlux(Math.floor(Math.random() * 30) + 10);

            const hex = Math.random().toString(16).substring(2, 6).toUpperCase();
            const action = SCIFI_LOGS[Math.floor(Math.random() * SCIFI_LOGS.length)];
            setCurrentLog(`0x${hex}::${action}`);

            if (Math.random() > 0.7) {
                setJpText(JAPANESE_TEXTS[Math.floor(Math.random() * JAPANESE_TEXTS.length)]);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-50 hidden md:flex items-center justify-between px-4 py-1 bg-black/90 backdrop-blur-sm border-b border-white/10 text-[10px] font-mono text-gray-400 select-none pointer-events-none mix-blend-difference">
            {/* Left Section: Status & ID */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white">
                    <Activity className="w-3 h-3" />
                    <span className="tracking-widest uppercase font-bold">SYS_ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="opacity-50">ID:</span>
                    <span>RS-2026-XQ</span>
                </div>
                <div className="text-gray-500">
                    {jpText}
                </div>
            </div>

            {/* Middle Section: Abstract Metrics */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <span className="opacity-50">FLUX</span>
                    <span className="text-gray-400">{flux}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="opacity-50">ENTROPY</span>
                    <span className="text-gray-400">{entropy}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="opacity-50">SYNC</span>
                    <span className="text-gray-400">{syncRate}%</span>
                </div>
            </div>

            {/* Right Section: Logs */}
            <div className="flex items-center gap-4 min-w-[200px] justify-end">
                <div className="flex items-center gap-2 animate-pulse">
                    <Zap className="w-3 h-3 text-white" />
                    <span className="uppercase text-white">{currentLog}</span>
                </div>
            </div>
        </div>
    );
}
