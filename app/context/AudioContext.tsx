"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

export interface Track {
    id: number;
    title: string;
    artist: string;
    genre: string;
    bpm: number;
    duration: string;
    src: string;
}

interface AudioContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    analyserRef: React.RefObject<AnalyserNode | null>;
    currentTime: number;
    duration: number;
    togglePlay: (track: Track) => Promise<void>;
    terminateTrack: () => void;
    seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const tracks: Track[] = [
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
        duration: "1:02",
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/bass%20heaven.mp3",
    },
    {
        id: 3,
        title: "Orchestral Madness",
        artist: "Raf",
        genre: "Orchestral",
        bpm: 120, // Estimated/Placeholder
        duration: "3:30", // Placeholder
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/Challange%20no%208%20Orchestral%20madness.mp3",
    },
    {
        id: 4,
        title: "Lullaby",
        artist: "Ila & Raf",
        genre: "Ballad",
        bpm: 80, // Estimated/Placeholder
        duration: "3:45", // Placeholder
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/Master%203.mp3",
    },
    {
        id: 5,
        title: "Lunar Candy",
        artist: "Raf",
        genre: "Synthwave",
        bpm: 110, // Estimated/Placeholder
        duration: "3:20", // Placeholder
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/day%204.mp3",
    },
    {
        id: 6,
        title: "Cry (Raf Cover)",
        artist: "Cigarettes After Sex",
        genre: "Alternative",
        bpm: 95, // Estimated/Placeholder
        duration: "4:00", // Placeholder
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/cry%20baby%20FINAL%204.mp3",
    },
    {
        id: 7,
        title: "Uranium",
        artist: "Raf",
        genre: "Trap",
        bpm: 140, // Estimated/Placeholder
        duration: "2:50", // Placeholder
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/day%206.mp3",
    },
    {
        id: 8,
        title: "World Civilization",
        artist: "Raf & Gadiza",
        genre: "House",
        bpm: 124, // Estimated/Placeholder
        duration: "3:39", // Estimated based on typical songs or use placeholder
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/jafest%2090000000.mp3",
    },
    {
        id: 9,
        title: "Aurora",
        artist: "Raf",
        genre: "Mid Tempo & Trap",
        bpm: 100, // Estimated/Placeholder
        duration: "3:15", // Placeholder
        src: "https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/Aurora.mp3",
    },
];

export function AudioProvider({ children }: { children: ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    // Initialize Audio & Listeners
    useEffect(() => {
        // Only create audio element on client
        if (typeof window === "undefined") return;

        audioRef.current = new Audio();
        audioRef.current.crossOrigin = "anonymous";

        const handleEnded = () => setIsPlaying(false);
        const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
        const handleLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);

        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.pause();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const setupAudioContext = () => {
        if (!audioContextRef.current && audioRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            // Connect audio element source to analyser
            if (!sourceRef.current) {
                sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
                sourceRef.current.connect(analyserRef.current);
                analyserRef.current.connect(audioContextRef.current.destination);
            }
            analyserRef.current.fftSize = 8192;
        }
    };

    const togglePlay = async (track: Track) => {
        if (!audioRef.current) return;

        // Resume AudioContext if suspended (browser policy)
        if (audioContextRef.current?.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        if (currentTrack?.id === track.id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                setupAudioContext();
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            setupAudioContext();
            setCurrentTrack(track);
            audioRef.current.src = track.src;
            await audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const terminateTrack = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentTrack(null);
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return (
        <AudioContext.Provider value={{
            currentTrack,
            isPlaying,
            audioRef,
            analyserRef,
            currentTime,
            duration,
            togglePlay,
            terminateTrack,
            seek
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
