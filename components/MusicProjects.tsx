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

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const percent = dataArray[i] / 255;
                barHeight = percent * canvas.height * 0.95; // Scale to 95% of height

                // Cyberpunk Red Color with Opacity based on intensity
                ctx.fillStyle = `rgba(255, 59, 59, ${Math.max(0.1, percent)})`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
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
        <section className="py-20 px-4 md:px-12 w-full border-t border-gray-900 bg-black relative">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12">
                <div className="w-4 h-4 bg-white" />
                <h2 className="text-4xl md:text-8xl font-bold text-white uppercase tracking-tighter flex flex-col md:flex-row items-baseline gap-4">
                    [Sonic_Archive]
                    <span className="text-sm md:text-lg text-gray-500 opacity-50 font-normal tracking-normal">音のアーカイブ</span>
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Visualizer & Now Playing Area */}
                <div className="flex-1 lg:max-w-[40%] flex flex-col gap-4">
                    <div className="relative border border-gray-800 bg-gray-900/50 p-2 h-96 overflow-hidden group">
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
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-interaction-red" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-interaction-red" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-interaction-red" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-interaction-red" />
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTrack ? (
                            <motion.div
                                key={activeTrack.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="border border-gray-800 p-3 bg-black flex flex-col gap-1 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-20">
                                    <Activity size={32} className={`text-interaction-red ${isPlaying ? 'animate-pulse' : ''}`} />
                                </div>
                                <div className="text-[10px] text-interaction-red font-mono tracking-widest mb-0.5">NOW_PLAYING //</div>
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
                                        className="flex items-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-interaction-red px-3 py-1 text-xs font-mono border border-red-900/50 transition-colors"
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
                                            className="absolute top-0 left-0 h-full bg-interaction-red pointer-events-none"
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
                </div>

                {/* Track List */}
                <div className="flex-1 flex flex-col gap-2">
                    {tracks.map((track) => (
                        <div
                            key={track.id}
                            onClick={() => togglePlay(track)}
                            className={`group relative p-4 border transition-all cursor-pointer overflow-hidden
                                ${currentTrack?.id === track.id
                                    ? "border-interaction-red bg-gray-900/30"
                                    : "border-gray-800 bg-black hover:border-gray-600"
                                }`}
                        >
                            {/* Hover Fill */}
                            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className={`w-8 h-8 flex items-center justify-center border font-mono text-xs
                                        ${currentTrack?.id === track.id ? "border-interaction-red text-interaction-red" : "border-gray-700 text-gray-500"}
                                    `}>
                                        {currentTrack?.id === track.id && isPlaying ? (
                                            <div className="flex gap-0.5 h-3 items-end">
                                                <div className="w-0.5 bg-interaction-red animate-[music-bar_0.5s_ease-in-out_infinite]" />
                                                <div className="w-0.5 bg-interaction-red animate-[music-bar_0.6s_ease-in-out_infinite_0.1s]" />
                                                <div className="w-0.5 bg-interaction-red animate-[music-bar_0.4s_ease-in-out_infinite_0.2s]" />
                                            </div>
                                        ) : (
                                            track.id.toString().padStart(2, '0')
                                        )}
                                    </div>

                                    <div>
                                        <h4 className={`text-lg font-bold uppercase transition-colors ${currentTrack?.id === track.id ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                                            {track.title}
                                        </h4>
                                        <div className="flex gap-2 text-xs font-mono text-gray-600">
                                            <span>{track.artist}</span>
                                            <span>::</span>
                                            <span>{track.genre}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right font-mono text-sm text-gray-500 group-hover:text-interaction-red transition-colors">
                                    {track.duration}
                                </div>
                            </div>
                        </div>
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
