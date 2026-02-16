"use client";

import { useState, useEffect } from "react";

export default function SystemOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none font-mono text-[10px] md:text-xs text-white mix-blend-difference">

            {/* Japanese Warning/Status Labels */}

            <div className="absolute bottom-6 right-12 text-gray-500 opacity-40 font-bold tracking-widest writing-vertical-rl text-[10px]">
                警告なし・安全
            </div>

            {/* Decorative Crosshairs */}
            <div className="absolute top-1/2 left-8 w-4 h-4 text-white opacity-10">+</div>
            <div className="absolute top-1/2 right-8 w-4 h-4 text-white opacity-10">+</div>
            <div className="absolute top-8 left-1/2 w-4 h-4 text-white opacity-10">+</div>
            <div className="absolute bottom-8 left-1/2 w-4 h-4 text-white opacity-10">+</div>

            {/* Scanline Animation */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02),rgba(255,255,255,0.06))] bg-size-[100%_3px,3px_100%] bg-repeat opacity-5" />
        </div>
    );
}
