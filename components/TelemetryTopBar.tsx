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

export default function TelemetryTopBar() {
    const { currentTrack, isPlaying, analyserRef } = useAudio();
    const [metrics, setMetrics] = useState<Record<string, number>>({});
    const [log, setLog] = useState("");
    const [jpText, setJpText] = useState(JAPANESE_TEXTS[0]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gridState, setGridState] = useState<boolean[]>(Array(12).fill(false));

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
                return newMetrics;
            });

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

    // Canvas Sparkline / Audio Viz
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let dataPoints: number[] = Array(20).fill(50);

        const draw = () => {
            animationFrameId = requestAnimationFrame(draw);

            let audioValue = 0;
            // Integrate Audio Data if playing
            if (isPlaying && analyserRef.current) {
                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyserRef.current.getByteFrequencyData(dataArray);

                // Get average of low frequencies for beat detection-ish movement
                let sum = 0;
                // Focus on bass frequencies (first 10 bins approx)
                for (let i = 0; i < 20; i++) {
                    sum += dataArray[i];
                }
                const average = sum / 20;

                // Map 0-255 to 0-100 range significantly, scaling up the "kick"
                audioValue = (average / 255) * 80;
            }

            // Shift data
            // If audio is playing, use the audioValue, else random noise
            const randomNoise = Math.random() * 20 - 10;
            const targetValue = isPlaying ? (audioValue + 20) : (50 + randomNoise);

            dataPoints.push(targetValue);
            if (dataPoints.length > 40) dataPoints.shift();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.strokeStyle = isPlaying ? '#ef4444' : '#d1d5db'; // Red if playing, Gray if not
            ctx.lineWidth = 1;

            // Draw line
            for (let i = 0; i < dataPoints.length; i++) {
                const x = (i / (dataPoints.length - 1)) * canvas.width;
                // Flip Y axis: 0 at bottom
                // Value 0-100, canvas height 20. 
                // We want 100 to be top (y=0) and 0 to be bottom (y=20)
                const y = canvas.height - (dataPoints[i] / 100) * canvas.height;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
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
                    <Activity className="w-3 h-3 animate-pulse text-red-500" />
                    <span className="font-bold tracking-tighter shadow-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">SYS.V.0.9</span>
                </div>

                {/* Micro Grid Visualization */}
                <div className="grid grid-cols-4 gap-0.5">
                    {gridState.map((active, i) => (
                        <div
                            key={i}
                            className={`w-1 h-1 ${active ? 'bg-red-500 shadow-[0_0_2px_red]' : 'bg-gray-700'}`}
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
                        <span className={`text-[7px] tracking-widest font-bold ${isPlaying ? 'text-red-500' : 'text-gray-400'}`}>
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

                {/* Rolling Text Stream */}
                <div className="flex items-center gap-2 whitespace-nowrap text-gray-300 font-medium">
                    <span className="text-red-500">::</span>
                    <span>{metrics["ION"] ?? 0}</span>
                    <span className="text-red-500">::</span>
                    <span>{metrics["WAVE"] ?? 0}</span>
                    <span className="text-red-500">::</span>
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
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>
    );
}
