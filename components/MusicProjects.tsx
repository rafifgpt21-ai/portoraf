"use client";

import { useRef, useEffect } from "react";
import { Play, Pause, Music, Disc, Activity, Square, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio, tracks } from "@/app/context/AudioContext";

export default function MusicProjects() {
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        terminateTrack,
        currentTime,
        duration,
        seek,
        analyserRef
    } = useAudio();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);

    const drawVisualizer = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            // Check if analyser is still valid/connected
            if (analyserRef.current) {
                analyserRef.current.getByteFrequencyData(dataArray);
            }

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Configuration
            const analyser = analyserRef.current;
            if (!analyser) return;

            const sampleRate = analyser.context.sampleRate;
            const binCount = bufferLength; // 4096 typically
            const nyquist = sampleRate / 2;
            const TOTAL_BARS = 64; // Fixed number of bars for correct spacing

            // Frequency Mapping Configuration
            // Region 1: 0% to 25% of width -> 20Hz to 200Hz
            // Region 2: 25% to 100% of width -> 200Hz to Nyquist
            const SPLIT_POINT = 0.25;
            const LOWEST_FREQ = 20;
            const CROSSOVER_FREQ = 200;

            const barWidth = canvas.width / TOTAL_BARS;

            // Temporary mapping helper
            const getFreq = (index: number) => {
                const normIndex = index / TOTAL_BARS;
                if (normIndex < SPLIT_POINT) {
                    // Linear mapping for detail in bass
                    // 0 -> LOWEST_FREQ
                    // SPLIT_POINT -> CROSSOVER_FREQ
                    const localProgress = normIndex / SPLIT_POINT;
                    return LOWEST_FREQ + (localProgress * (CROSSOVER_FREQ - LOWEST_FREQ));
                } else {
                    // Logarithmic mapping for the rest to perceive higher ranges naturally
                    const localProgress = (normIndex - SPLIT_POINT) / (1 - SPLIT_POINT);
                    // Log scale: start * (end/start)^t
                    // Ensure we don't hit 0 or infinity issues, but 200 is fine.
                    // Using Log scale for 200 -> Nyquist
                    return CROSSOVER_FREQ * Math.pow(nyquist / CROSSOVER_FREQ, localProgress);
                }
            };

            for (let i = 0; i < TOTAL_BARS; i++) {
                const startFreq = getFreq(i);
                const endFreq = getFreq(i + 1);

                // Convert frequencies to bin indices
                const startBin = Math.floor((startFreq / nyquist) * binCount);
                const endBin = Math.floor((endFreq / nyquist) * binCount);

                // Calculate average/max energy in this bin range
                let sum = 0;
                let maxVal = 0;
                const actualStart = Math.max(0, startBin);
                const actualEnd = Math.min(binCount - 1, Math.max(actualStart + 1, endBin));

                for (let j = actualStart; j < actualEnd; j++) {
                    const val = dataArray[j];
                    sum += val;
                    if (val > maxVal) maxVal = val;
                }

                // Use max for sharper peaks, or average for smoother look. Mixed approach:
                // For narrow bass ranges, max is good to catch the fundamental.
                // For wide high ranges, average might wash out tones, so max is often better for visualizers.
                const value = maxVal;

                // Visualize
                // Apply some weighting? Bass is usually high energy, highs are lower.
                // 1/f compensation:
                // Approx frequency of this bar:
                const centerFreq = (startFreq + endFreq) / 2;
                // Linear boost for highs: 
                // 20Hz -> 1x, 20000Hz -> 3x?
                // Or just simple constant boost.

                const boost = 1 + (centerFreq / 8000); // Slight boost for highs

                const rawPercent = value / 255;
                // Use power function to emphasize peaks and reduce noise (makes low values lower)
                const percent = Math.pow(rawPercent, 1.2) * boost;

                // Full height bars that change color based on intensity (Heatmap style)
                // Theme: Dark Gray -> Interaction Red -> White Hot
                const intensity = Math.min(1, percent);

                let r, g, b;

                // Thermal Gradient: Deep Blue -> Blue -> Red -> Yellow -> White
                // Represents increasing heat/energy

                if (intensity < 0.25) {
                    // Deep Blue (0,0,20) -> Blue (0,0,255)
                    const t = intensity / 0.25;
                    r = 0;
                    g = 0;
                    b = 20 + (235 * t);
                } else if (intensity < 0.5) {
                    // Blue (0,0,255) -> Red (255,0,0)
                    const t = (intensity - 0.25) / 0.25;
                    r = 255 * t;
                    g = 0;
                    b = 255 * (1 - t);
                } else if (intensity < 0.75) {
                    // Red (255,0,0) -> Yellow (255,255,0)
                    const t = (intensity - 0.5) / 0.25;
                    r = 255;
                    g = 255 * t;
                    b = 0;
                } else {
                    // Yellow (255,255,0) -> White (255,255,255)
                    const t = (intensity - 0.75) / 0.25;
                    r = 255;
                    g = 255;
                    b = 255 * t;
                }

                ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
                const xPos = i * barWidth;

                // Draw full height strip with gap
                ctx.fillRect(xPos, 0, barWidth - 2, canvas.height);
            }
        };

        draw();
    };

    // Trigger visualizer when playing starts
    useEffect(() => {
        if (isPlaying) {
            drawVisualizer();
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }
    }, [isPlaying, analyserRef]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !duration) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percentage * duration;

        seek(newTime);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const activeTrack = currentTrack;

    return (
        <section className="h-screen min-h-[800px] flex flex-col pt-16 md:pt-24 pb-8 px-4 md:px-12 w-full border-t border-gray-900 bg-black relative overflow-hidden">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-none flex items-center gap-4 mb-2 md:mb-8"
            >
                <div className="w-4 h-4 bg-white" />
                <h2 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter flex flex-col md:flex-row items-baseline gap-4">
                    [Sonic_Archive]
                    <span className="text-sm md:text-lg text-gray-500 opacity-50 font-normal tracking-normal">音のアーカイブ</span>
                </h2>
            </motion.div>

            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8 min-h-0">
                {/* Visualizer & Now Playing Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex-none lg:w-[40%] flex flex-col gap-2 lg:gap-4"
                >
                    <div className="relative border border-gray-800 bg-gray-900/50 p-2 h-32 md:h-64 lg:h-96 overflow-hidden group">
                        {/* CRT Overlay Effect */}
                        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] opacity-20" />

                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={384}
                            className="w-full h-full object-cover opacity-80"
                        />

                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-gray-600 font-mono tracking-widest text-sm animate-pulse">AWAITING_INPUT...</span>
                            </div>
                        )}

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTrack ? (
                            <motion.div
                                key={activeTrack.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="border border-gray-800 p-2 md:p-3 bg-black flex flex-col gap-1 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-20">
                                    <Activity size={32} className={`text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                                </div>
                                <div className="text-[10px] text-white font-mono tracking-widest mb-0.5">NOW_PLAYING //</div>
                                <h3 className="text-lg font-bold text-white uppercase leading-none">{activeTrack.title}</h3>
                                <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px] mt-1">
                                    <span className="text-white bg-gray-900 px-1">ARTIST: {activeTrack.artist}</span>
                                    <span>//</span>
                                    <span>BPM: {activeTrack.bpm}</span>
                                    <span>//</span>
                                    <span>{activeTrack.genre}</span>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => togglePlay(activeTrack)}
                                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 text-xs font-mono border border-gray-700 transition-colors"
                                    >
                                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                                        {isPlaying ? "PAUSE" : "PLAY"}
                                    </button>
                                    <button
                                        onClick={terminateTrack}
                                        className="flex items-center gap-2 bg-gray-900/20 hover:bg-gray-900/40 text-gray-400 hover:text-white px-3 py-1 text-xs font-mono border border-gray-800 hover:border-white transition-colors"
                                    >
                                        <Square size={12} fill="currentColor" />
                                        TERMINATE
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-gray-500">
                                    <span>{formatTime(currentTime)}</span>
                                    <div
                                        ref={progressBarRef}
                                        onClick={handleSeek}
                                        className="flex-1 h-1.5 bg-gray-800 cursor-pointer relative group/progress overflow-hidden"
                                    >
                                        <div
                                            className="absolute top-0 left-0 h-full bg-white pointer-events-none"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                        />
                                        {/* Glitchy Handle */}
                                        <div
                                            className="absolute top-0 h-full w-1 bg-white pointer-events-none opacity-0 group-hover/progress:opacity-100"
                                            style={{ left: `${(currentTime / duration) * 100}%` }}
                                        />
                                    </div>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="border border-gray-800 p-3 bg-black flex flex-col gap-1 relative opacity-50">
                                <div className="text-[10px] text-gray-600 font-mono tracking-widest mb-0.5">STATUS // IDLE</div>
                                <h3 className="text-lg font-bold text-gray-700 uppercase leading-none">NO_TRACK_SELECTED</h3>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Produced by Raf - Footer */}
                    <div className="mt-4 text-left pointer-events-none">
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest opacity-60">
                            ALL TRACKS PRODUCED BY RAF <span className="text-red-600 animate-pulse">//</span> 全ての曲は RAF によって制作されました
                        </p>
                        <p className="text-[10px] text-gray-700 font-mono mt-1">
                            SONIC_ARCHIVE_V1.0
                        </p>
                    </div>
                </motion.div>

                {/* Track List */}
                <div className="flex-1 flex flex-col gap-2   overflow-y-auto pr-2 pb-12">
                    {tracks.map((track, i) => (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            viewport={{ once: true }}
                            onClick={() => togglePlay(track)}
                            className={`group flex-none relative p-3 md:p-4 border transition-all cursor-pointer overflow-hidden
                                ${currentTrack?.id === track.id
                                    ? "border-white bg-gray-900/30"
                                    : "border-gray-800 bg-black hover:border-gray-600"
                                }`}
                        >
                            {/* Hover Fill */}
                            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3 md:gap-6">
                                    <div className={`w-8 h-8 flex items-center justify-center border font-mono text-xs
                                        ${currentTrack?.id === track.id ? "border-white text-white" : "border-gray-700 text-gray-500"}
                                    `}>
                                        {currentTrack?.id === track.id && isPlaying ? (
                                            <div className="flex gap-0.5 h-3 items-end">
                                                <div className="w-0.5 bg-white animate-[music-bar_0.5s_ease-in-out_infinite]" />
                                                <div className="w-0.5 bg-white animate-[music-bar_0.6s_ease-in-out_infinite_0.1s]" />
                                                <div className="w-0.5 bg-white animate-[music-bar_0.4s_ease-in-out_infinite_0.2s]" />
                                            </div>
                                        ) : (
                                            track.id.toString().padStart(2, '0')
                                        )}
                                    </div>

                                    <div>
                                        <h4 className={`text-base md:text-lg font-bold uppercase transition-colors ${currentTrack?.id === track.id ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                                            {track.title}
                                        </h4>
                                        <div className="flex gap-2 text-xs font-mono text-gray-600">
                                            <span>{track.artist}</span>
                                            <span>::</span>
                                            <span>{track.genre}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right font-mono text-sm text-gray-500 group-hover:text-white transition-colors">
                                    {track.duration}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>



            <style jsx global>{`
                @keyframes music-bar {
                    0%, 100% { height: 20%; }
                    50% { height: 100%; }
                }
            `}</style>
        </section>
    );
}
