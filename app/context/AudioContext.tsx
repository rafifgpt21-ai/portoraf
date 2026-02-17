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
            analyserRef.current.fftSize = 256;
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
