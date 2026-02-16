"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Disc, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Track {
    id: number;
    title: string;
    artist: string;
    genre: string;
    bpm: number;
    duration: string;
    src: string;
}

const tracks: Track[] = [
    {
        id: 1,
        title: "One Last Time (Raf Remix)",
        artist: "Imigran",
        genre: "Progressive House",
        bpm: 128,
        duration: "4:00",
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/Imigran%20House%20mix%203.mp3",
    },
    {
        id: 2,
        title: "Bass Heaven",
        artist: "Raf",
        genre: "Mid Tempo",
        bpm: 100,
        duration: "3:00",
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/bass%20heaven.mp3",
    },
];

export default function MusicProjects() {
    const [currentTrack, setCurrentTrack] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationRef = useRef<number | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);

    // Initialize Audio Context & Listeners
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.crossOrigin = "anonymous";

        const handleEnded = () => setIsPlaying(false);
        const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
        const handleLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);

        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audioRef.current?.removeEventListener('ended', handleEnded);
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
            audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioRef.current?.pause();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const setupAudioContext = () => {
        if (!audioContextRef.current && audioRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
            sourceRef.current.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
            analyserRef.current.fftSize = 256;
        }
    };

    const drawVisualizer = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyserRef.current!.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2; // Scale down height

                // Cyberpunk Red Color with Opacity based on intensity
                ctx.fillStyle = `rgba(255, 59, 59, ${barHeight / 100})`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        };

        draw();
    };

    const togglePlay = async (id: number) => {
        const track = tracks.find((t) => t.id === id);
        if (!track || !audioRef.current) return;

        // Resume AudioContext if suspended (browser policy)
        if (audioContextRef.current?.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        if (currentTrack === id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
                if (animationRef.current) cancelAnimationFrame(animationRef.current);
            } else {
                setupAudioContext();
                await audioRef.current.play();
                setIsPlaying(true);
                drawVisualizer();
            }
        } else {
            setupAudioContext();
            setCurrentTrack(id);
            audioRef.current.src = track.src;
            await audioRef.current.play();
            setIsPlaying(true);
            drawVisualizer();
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !audioRef.current || !duration) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percentage * duration;

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const activeTrack = tracks.find(t => t.id === currentTrack);

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
                    <div className="relative border border-gray-800 bg-gray-900/50 p-2 h-64 overflow-hidden group">
                        {/* CRT Overlay Effect */}
                        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] opacity-20" />

                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={250}
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
                                className="border border-gray-800 p-6 bg-black flex flex-col gap-2 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-20">
                                    <Activity size={48} className={`text-interaction-red ${isPlaying ? 'animate-pulse' : ''}`} />
                                </div>
                                <div className="text-xs text-interaction-red font-mono tracking-widest mb-2">NOW_PLAYING //</div>
                                <h3 className="text-2xl font-bold text-white uppercase leading-none">{activeTrack.title}</h3>
                                <div className="flex items-center gap-2 text-gray-400 font-mono text-sm mt-2">
                                    <span className="text-white bg-gray-900 px-1">ARTIST: {activeTrack.artist}</span>
                                    <span>//</span>
                                    <span>BPM: {activeTrack.bpm}</span>
                                    <span>//</span>
                                    <span>{activeTrack.genre}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4 flex items-center gap-3 font-mono text-xs text-gray-500">
                                    <span>{formatTime(currentTime)}</span>
                                    <div
                                        ref={progressBarRef}
                                        onClick={handleSeek}
                                        className="flex-1 h-2 bg-gray-800 cursor-pointer relative group/progress overflow-hidden"
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
                            <div className="border border-gray-800 p-6 bg-black flex flex-col gap-2 relative opacity-50">
                                <div className="text-xs text-gray-600 font-mono tracking-widest mb-2">STATUS // IDLE</div>
                                <h3 className="text-2xl font-bold text-gray-700 uppercase leading-none">NO_TRACK_SELECTED</h3>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Track List */}
                <div className="flex-1 flex flex-col gap-2">
                    {tracks.map((track) => (
                        <div
                            key={track.id}
                            onClick={() => togglePlay(track.id)}
                            className={`group relative p-4 border transition-all cursor-pointer overflow-hidden
                                ${currentTrack === track.id
                                    ? "border-interaction-red bg-gray-900/30"
                                    : "border-gray-800 bg-black hover:border-gray-600"
                                }`}
                        >
                            {/* Hover Fill */}
                            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className={`w-8 h-8 flex items-center justify-center border font-mono text-xs
                                        ${currentTrack === track.id ? "border-interaction-red text-interaction-red" : "border-gray-700 text-gray-500"}
                                    `}>
                                        {currentTrack === track.id && isPlaying ? (
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
                                        <h4 className={`text-lg font-bold uppercase transition-colors ${currentTrack === track.id ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
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
