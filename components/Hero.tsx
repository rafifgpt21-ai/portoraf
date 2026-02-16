"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-start px-8 md:px-16">
            {/* System Status / Specs - Top Left */}
            <div className="absolute top-24 left-4 md:left-8 font-mono text-gray-500 text-xs md:text-sm tracking-widest border-l-2 border-gray-500 pl-4">
                <p>SYSTEM_IDENTITY: ONLINE</p>
                <p className="text-[10px] opacity-70">システム・オンライン</p>
                <p>ACCESS LEVEL: ADMIN</p>
                <p className="text-[10px] opacity-70">管理者権限</p>
            </div>

            {/* Vertical Decorative Text - Right Side */}
            <div className="absolute top-1/2 right-4 md:right-12 transform -translate-y-1/2 hidden md:flex flex-col gap-4 items-center z-0 pointer-events-none opacity-30 mix-blend-overlay writing-vertical-rl text-white font-bold text-4xl tracking-[1em]">
                <span>ラフィフ・シドキ</span>
                <span>システムエンジニア</span>
            </div>

            {/* Main Headline - Left Aligned & Massive */}
            <div className="relative group z-10 text-left">
                <h1
                    className="font-archivo-black text-[10vw] md:text-[8vw] leading-[0.85] uppercase tracking-tighter text-white mix-blend-difference"
                    style={{ fontFamily: 'var(--font-archivo-black)' }}
                >
                    Rafif <span className="text-white">Sidqi</span>
                    <br />
                    Mokobombang
                </h1>
                {/* Glitch Overlay (Decorative) */}
                <div
                    className="absolute top-0 left-1 w-full h-full opacity-0 group-hover:opacity-50 pointer-events-none animate-glitch text-[10vw] md:text-[8vw] leading-[0.85] uppercase tracking-tighter text-interaction-red mix-blend-overlay font-archivo-black"
                    aria-hidden="true"
                    style={{ fontFamily: 'var(--font-archivo-black)' }}
                >
                    Rafif Sidqi
                    <br />
                    Mokobombang
                </div>
                <div
                    className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-80 pointer-events-none animate-glitch text-[10vw] md:text-[8vw] leading-[0.85] uppercase tracking-tighter text-shadow-interaction-blue font-archivo-black"
                    aria-hidden="true"
                    style={{ fontFamily: 'var(--font-archivo-black)' }}
                >
                    Rafif Sidqi
                    <br />
                    Mokobombang
                </div>
            </div>

            {/* Roles / Subheadline - Bottom Left */}
            <div className="absolute bottom-8 left-4 md:left-8 border border-white/20 text-gray-300 bg-black/50 px-4 py-2 text-sm md:text-xl font-bold uppercase backdrop-blur-sm">
                <span className="">
                    Multimedia Producer | Systems Engineer | Music Tech Enthusiast
                </span>
                <span className="block text-right text-xs text-gray-500 mt-1">
                    マルチメディア・プロデューサー | システムエンジニア
                </span>
            </div>

            {/* Detail Specs - Bottom Right */}
            <div className="absolute bottom-40 md:bottom-8 right-4 md:right-8 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-gray-400 text-xs md:text-sm max-w-xs md:max-w-md text-right md:text-left">
                <div className="border border-gray-800 p-2 relative group hover:border-interaction-red transition-colors bg-black/80 backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-1 h-1 bg-gray-800 group-hover:bg-interaction-red transition-colors" />
                    <h3 className="text-gray-500 mb-1 uppercase tracking-wider group-hover:text-interaction-red transition-colors">[LANGUAGE] <span className="text-[10px]">言語</span></h3>
                    <p className="text-white">English: C1 Advanced</p>
                </div>

                <div className="border border-gray-800 p-2 relative group hover:border-interaction-red transition-colors bg-black/80 backdrop-blur-sm">
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-gray-800 group-hover:bg-interaction-red transition-colors" />
                    <h3 className="text-gray-500 mb-1 uppercase tracking-wider group-hover:text-interaction-red transition-colors">[CORE] <span className="text-[10px]">コア</span></h3>
                    <p className="text-white">Systems Engineer</p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-4 w-2 h-24 bg-linear-to-b from-transparent via-gray-800 to-transparent"></div>
            <div className="absolute top-1/2 right-4 w-2 h-24 bg-linear-to-b from-transparent via-gray-800 to-transparent"></div>
        </section>
    );
}
