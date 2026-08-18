"use client";

import { useCallback, useEffect, useRef } from "react";
import { Pause, Play, Square } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAudio, tracks } from "@/app/context/AudioContext";
import BrutalistSection from "@/components/BrutalistSection";
import { stampIn, useHydratedReducedMotion } from "@/components/motion";

export default function MusicProjects() {
    const { currentTrack, isPlaying, togglePlay, terminateTrack, currentTime, duration, seek, analyserRef } = useAudio();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const reduceMotion = useHydratedReducedMotion();

    const drawVisualizer = useCallback(() => {
        if (!analyserRef.current || !canvasRef.current) return;
        const analyser = analyserRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const data = new Uint8Array(analyser.frequencyBinCount);
        const bars = 48;

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(data);
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const width = canvas.width / bars;

            for (let index = 0; index < bars; index++) {
                const start = Math.floor((index / bars) * data.length * 0.38);
                const end = Math.max(start + 1, Math.floor(((index + 1) / bars) * data.length * 0.38));
                let peak = 0;
                for (let sample = start; sample < end; sample++) peak = Math.max(peak, data[sample] || 0);
                const normalized = peak / 255;
                const height = Math.max(2, normalized * canvas.height);
                ctx.fillStyle = normalized > 0.78 ? "#ff2a12" : "#f0ede4";
                ctx.fillRect(index * width, canvas.height - height, Math.max(1, width - 3), height);
            }
        };
        draw();
    }, [analyserRef]);

    useEffect(() => {
        if (isPlaying) drawVisualizer();
        else if (animationRef.current) cancelAnimationFrame(animationRef.current);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [drawVisualizer, isPlaying]);

    const formatTime = (time: number) => {
        if (!Number.isFinite(time)) return "0:00";
        return `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;
    };

    return (
        <BrutalistSection id="audio" index="03" title="SONIC ARCHIVE" subtitle="音のアーカイブ / AUDIO_OUTPUT" tone="cobalt">
            <div className="grid min-h-screen lg:grid-cols-[minmax(20rem,0.8fr)_minmax(0,1.2fr)]">
                <aside className="border-b-[3px] border-paper lg:border-b-0 lg:border-r-[3px]">
                    <div className="sticky top-[148px] p-4 md:p-7 lg:p-8">
                        <div className="border-[3px] border-paper bg-ink">
                            <div className="flex items-center justify-between border-b-[3px] border-paper p-3 font-mono text-[9px] font-black uppercase tracking-[0.15em]">
                                <span>Output monitor</span>
                                <span className={isPlaying ? "text-signal" : "text-paper/40"}>{isPlaying ? "LIVE" : "IDLE"}</span>
                            </div>
                            <div className="relative h-44 border-b-[3px] border-paper bg-ink p-3 md:h-64">
                                <canvas ref={canvasRef} width={640} height={300} className="h-full w-full" />
                                {!isPlaying ? (
                                    <div className="absolute inset-0 flex items-center justify-center font-archivo text-3xl uppercase text-paper/20 md:text-5xl">NO SIGNAL</div>
                                ) : null}
                            </div>

                            <AnimatePresence mode="wait">
                                {currentTrack ? (
                                    <motion.div
                                        key={currentTrack.id}
                                        variants={stampIn}
                                        initial={reduceMotion ? "visible" : "hidden"}
                                        animate="visible"
                                        exit={reduceMotion ? undefined : "exit"}
                                        className="bg-paper p-4 text-ink md:p-6"
                                    >
                                        <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-ink/50">Now playing / Track {currentTrack.id.toString().padStart(2, "0")}</span>
                                        <h3 className="mt-3 font-archivo text-[clamp(2rem,5vw,4.8rem)] uppercase leading-[0.8] tracking-[-0.055em]">{currentTrack.title}</h3>
                                        <div className="mt-4 flex flex-wrap gap-x-3 font-mono text-[9px] font-black uppercase">
                                            <span>{currentTrack.artist}</span><span>/</span><span>{currentTrack.genre}</span><span>/</span><span>{currentTrack.bpm} BPM</span>
                                        </div>
                                        <div className="mt-5 flex gap-2">
                                            <button type="button" onClick={() => togglePlay(currentTrack)} className="flex min-h-11 flex-1 items-center justify-center gap-2 border-[3px] border-ink bg-ink px-3 font-mono text-[9px] font-black uppercase text-paper hover:bg-signal hover:text-[#050505]">
                                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />} {isPlaying ? "Pause" : "Play"}
                                            </button>
                                            <button type="button" onClick={terminateTrack} className="flex min-h-11 items-center justify-center gap-2 border-[3px] border-ink px-3 font-mono text-[9px] font-black uppercase hover:bg-signal">
                                                <Square className="h-3 w-3 fill-current" /> Stop
                                            </button>
                                        </div>
                                        <div className="mt-4 grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 font-mono text-[9px] font-black">
                                            <span>{formatTime(currentTime)}</span>
                                            <input
                                                aria-label={`Seek ${currentTrack.title}`}
                                                type="range"
                                                min={0}
                                                max={duration || 0}
                                                step={0.1}
                                                value={Math.min(currentTime, duration || 0)}
                                                onChange={(event) => seek(Number(event.target.value))}
                                                className="h-2 w-full cursor-pointer accent-signal"
                                            />
                                            <span className="text-right">{formatTime(duration)}</span>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="p-5 font-mono text-xs font-black uppercase text-paper/45">Select a record to open the signal.</div>
                                )}
                            </AnimatePresence>
                        </div>
                        <p className="mt-6 border-l-[6px] border-signal pl-4 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-paper/55">
                            All tracks produced by Raf // 全ての曲は RAF によって制作されました
                        </p>
                    </div>
                </aside>

                <div className="border-l-0 border-paper">
                    <div className="grid grid-cols-[4rem_1fr_4rem] border-b-[3px] border-paper bg-paper px-3 py-2 font-mono text-[9px] font-black uppercase text-ink md:grid-cols-[7rem_1fr_7rem]">
                        <span>No.</span><span>Record / Artist / Genre</span><span className="text-right">Length</span>
                    </div>
                    {tracks.map((track, index) => {
                        const active = currentTrack?.id === track.id;
                        return (
                            <motion.button
                                layout
                                type="button"
                                key={track.id}
                                onClick={() => togglePlay(track)}
                                initial={reduceMotion ? false : { x: index % 2 === 0 ? 80 : -80 }}
                                whileInView={{ x: active && !reduceMotion ? -8 : 0 }}
                                whileHover={reduceMotion ? undefined : { x: -8 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                                className={`group grid w-full grid-cols-[4rem_1fr_4rem] border-b-[3px] border-paper text-left md:grid-cols-[7rem_1fr_7rem] ${active ? "bg-paper py-6 text-ink" : "bg-ink py-4 text-paper hover:bg-paper hover:text-ink"}`}
                            >
                                <div className={`flex items-center justify-center border-r-[3px] border-current font-archivo text-3xl md:text-5xl ${active ? "text-signal" : "text-current"}`}>
                                    {track.id.toString().padStart(2, "0")}
                                </div>
                                <div className="min-w-0 px-3 md:px-6">
                                    <h4 className="truncate font-archivo text-xl uppercase leading-none tracking-[-0.035em] md:text-4xl">{track.title}</h4>
                                    <p className="mt-2 truncate font-mono text-[9px] font-bold uppercase opacity-55 md:text-[10px]">{track.artist} / {track.genre} / {track.bpm} BPM</p>
                                </div>
                                <div className="flex items-center justify-end border-l-[3px] border-current pr-3 font-mono text-[10px] font-black md:pr-5 md:text-sm">{track.duration}</div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </BrutalistSection>
    );
}
