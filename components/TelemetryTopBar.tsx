"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Zap, Radio, Database, Cpu, Wifi } from "lucide-react";

// Abstract/Sci-fi terms that don't necessarily avoid meaning but sound "tech"
const ABSTRACT_LABELS = [
    "VORTEX", "QUBIT", "HYPER", "ION", "PLASMA", "FLUX", "VOID", "NEXUS", "ECHO", "WAVE", "PULSE"
];

const SCIFI_LOGS = [
    "LINK_ESTABLISHED", "DECRYPTING_PACKET", "HANDSHAKE_COMPLETE", "BUFFER_FLUSHED",
    "ROUTING_PROXY", "SYNAPSE_FIRING", "PATTERN_MATCHED", "TRACE_COMPLETE",
    "PACKET_RECEIVED", "NODE_SYNCED", "RENDERING_FRAME", "MEMORY_OPTIMIZED",
    "QUANTUM_TUNNEL", "VOID_STABILIZED", "NEURAL_LINK_ACTIVE", "ZERO_POINT_ENERGY"
];

// More abstract Japanese text
const JAPANESE_TEXTS = [
    "システム正常", // System Normal
    "データ転送中", // Data Transferring
    "接続安定",     // Connection Stable
    "セキュリティ",   // Security
    "暗号化通信",   // Encrypted Communication
    "ネットワーク",   // Network
    "同期完了",     // Sync Complete
];

import { useAudio } from "@/app/context/AudioContext";

// ... (keep existing constants)

import { useScroll, useSpring, motion } from "framer-motion";

// ... (keep existing imports)

export default function TelemetryTopBar() {
    const { currentTrack, isPlaying, analyserRef } = useAudio();
    const { scrollY, scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const [metrics, setMetrics] = useState<Record<string, number>>({});
    const [log, setLog] = useState("");
    const [jpText, setJpText] = useState(JAPANESE_TEXTS[0]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gridState, setGridState] = useState<boolean[]>(Array(12).fill(false));
    const [scrollDepth, setScrollDepth] = useState(0);

    // Track scroll for telemetry
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setScrollDepth(Math.floor(latest * 100));
        });
    }, [scrollYProgress]);

    // Initialize metrics
    useEffect(() => {
        const initialMetrics: Record<string, number> = {};
        ABSTRACT_LABELS.forEach(label => {
            initialMetrics[label] = Math.floor(Math.random() * 100);
        });
        setMetrics(initialMetrics);
    }, []);

    // Animation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Update abstract metrics randomly
            setMetrics(prev => {
                const newMetrics = { ...prev };
                const keyToUpdate = ABSTRACT_LABELS[Math.floor(Math.random() * ABSTRACT_LABELS.length)];
                newMetrics[keyToUpdate] = Math.floor(Math.random() * 100);
                // Inject Scroll Data occasionally
                if (Math.random() > 0.8) {
                    newMetrics["V-POS"] = Math.floor(window.scrollY);
                }
                return newMetrics;
            });

            // ... (keep existing logic)

            // Random log update
            if (Math.random() > 0.7) {
                const hex = Math.random().toString(16).substring(2, 6).toUpperCase();
                const action = SCIFI_LOGS[Math.floor(Math.random() * SCIFI_LOGS.length)];
                setLog(`0x${hex}::${action}`);
            }

            // Random JP text
            if (Math.random() > 0.9) {
                setJpText(JAPANESE_TEXTS[Math.floor(Math.random() * JAPANESE_TEXTS.length)]);
            }

            // Update grid state
            setGridState(prev => prev.map(() => Math.random() > 0.5));

        }, 150); // Faster updates for "busyness"

        return () => clearInterval(interval);
    }, []);

    // Oscilloscope / Waveform Visualizer
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const draw = () => {
            animationFrameId = requestAnimationFrame(draw);

            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            if (!isPlaying || !analyserRef.current) {
                // Static Line / Idle State
                ctx.beginPath();
                ctx.strokeStyle = '#374151'; // Gray-700
                ctx.lineWidth = 1;
                ctx.moveTo(0, height / 2);

                // Add tiny noise for "liveness"
                for (let i = 0; i < width; i += 5) {
                    const noise = Math.random() * 2 - 1;
                    ctx.lineTo(i, (height / 2) + noise);
                }
                ctx.stroke();
                return;
            }

            const bufferLength = analyserRef.current.frequencyBinCount; // Should be 128 (fftSize 256)
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteTimeDomainData(dataArray);

            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ffffff'; // White
            ctx.beginPath();

            const sliceWidth = width * 1.0 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0; // 128 is zero/center
                const y = (v * height) / 2; // Center is height/2 ? No.

                // dataArray value: 0 (bottom) -> 128 (middle) -> 255 (top)
                // y needs to map to canvas.height.
                // Value 128 should be at height/2.
                // Value 0 should be at height.
                // Value 255 should be at 0.

                // Normalized: -1 to 1
                const normalized = (dataArray[i] - 128) / 128;

                // Scale to fit height (maybe amplify a bit since it's small)
                const yPos = (height / 2) + (normalized * (height / 2));

                if (i === 0) {
                    ctx.moveTo(x, yPos);
                } else {
                    ctx.lineTo(x, yPos);
                }

                x += sliceWidth;
            }

            ctx.lineTo(width, height / 2);
            ctx.stroke();
        };

        draw();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying, analyserRef]);

    return (
        <div className="fixed top-0 left-0 w-full z-50 hidden md:flex items-center justify-between px-2 py-0.5 bg-black/95 backdrop-blur-md border-b border-white/10 text-[9px] font-mono text-gray-300 select-none pointer-events-none mix-blend-difference overflow-hidden h-[28px]">

            {/* LEFT: System Identity & Status Grid */}
            <div className="flex items-center gap-4 border-r border-white/20 pr-4 h-full">
                <div className="flex items-center gap-2 text-white">
                    <Activity className="w-3 h-3 animate-pulse text-white" />
                    <span className="font-bold tracking-tighter shadow-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">SYS.V.0.9</span>
                </div>

                {/* Micro Grid Visualization */}
                <div className="grid grid-cols-4 gap-0.5">
                    {gridState.map((active, i) => (
                        <div
                            key={i}
                            className={`w-1 h-1 ${active ? 'bg-white shadow-[0_0_2px_white]' : 'bg-gray-700'}`}
                        />
                    ))}
                </div>

                <div className="flex flex-col leading-none">
                    <span className="text-[7px] text-gray-400 font-bold">UPTIME</span>
                    <span className="text-white font-bold">99.9%</span>
                </div>
            </div>

            {/* CENTER: High Density Metrics Stream */}
            <div className="flex items-center flex-1 justify-center gap-6 overflow-hidden px-4">
                {/* Metric Group 1 */}
                <div className="flex gap-3 border-r border-white/20 pr-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[7px] text-gray-400 font-bold">Q-BIT</span>
                        <span className="text-white font-bold text-shadow-sm">{metrics["QUBIT"] || 42}</span>
                    </div>
                    <div className="w-[40px] h-[16px] border border-gray-600 relative bg-gray-900">
                        <div
                            className="absolute bottom-0 left-0 bg-gray-200 w-full transition-all duration-100"
                            style={{ height: `${metrics["QUBIT"]}%` }}
                        />
                    </div>
                </div>

                {/* Sparkline Canvas */}
                <div className="w-[80px] h-[20px]">
                    <canvas ref={canvasRef} width={80} height={20} />
                </div>

                {/* Audio Status / Metric Group 2 */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className={`text-[7px] tracking-widest font-bold ${isPlaying ? 'text-white' : 'text-gray-400'}`}>
                            {isPlaying ? "AUDIO_OUT" : "FLUX"}
                        </span>
                        <span className="text-gray-300 font-semibold tracking-wider text-[9px] max-w-[150px] truncate">
                            {isPlaying && currentTrack ? currentTrack.title.toUpperCase() : jpText}
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`w-0.5 h-2 ${i * 20 < (metrics["FLUX"] || 0) || (isPlaying && i < 4) ? 'bg-white shadow-[0_0_2px_white]' : 'bg-gray-700'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Depth Sensor Module */}
                <div className="flex items-center gap-2 border-r border-white/20 pr-3">
                    <div className="flex flex-col items-end leading-none">
                        <span className="text-[7px] text-gray-400 font-bold">DEPTH</span>
                        <span className="text-white font-bold tracking-widest">{scrollDepth.toString().padStart(3, '0')}%</span>
                    </div>
                    <div className="w-[80px] h-[10px] bg-gray-900 border border-gray-700 relative overflow-hidden">
                        <motion.div
                            className="h-full bg-white shadow-[0_0_4px_white]"
                            style={{ scaleX, originX: 0 }}
                        />
                    </div>
                </div>

                {/* Rolling Text Stream */}
                <div className="flex items-center gap-2 whitespace-nowrap text-gray-300 font-medium">
                    <span className="text-gray-500">::</span>
                    <span className="text-gray-500">::</span>
                    <span className="text-gray-500">::</span>
                    <span>{metrics["ION"] ?? 0}</span>
                    <span className="text-gray-500">::</span>
                    <span>{metrics["WAVE"] ?? 0}</span>
                    <span className="text-gray-500">::</span>
                    <span>{metrics["PULSE"] ?? 0}</span>
                </div>
            </div>

            {/* RIGHT: Logs & Network */}
            <div className="flex items-center gap-4 border-l border-white/20 pl-4 h-full justify-end min-w-[200px]">
                <div className="flex flex-col items-end leading-none gap-0.5">
                    <span className="text-[8px] text-white max-w-[150px] truncate uppercase tracking-tight shadow-sm font-bold">
                        {log || "INITIALIZING..."}
                    </span>
                    <div className="flex gap-1 text-[7px] text-gray-400 font-bold">
                        <span>LATENCY: 4ms</span>
                        <span>PKT: 0%</span>
                    </div>
                </div>
                <Wifi className="w-3 h-3 text-white" />
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
    );
}
