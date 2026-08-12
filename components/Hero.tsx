"use client";

export default function Hero() {
    return (
        <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between px-4 sm:px-6 md:px-16 pt-24 pb-5 sm:pb-8 md:pt-20 md:pb-8">
            {/* System Status / Specs - Top Left */}
            <div className="absolute top-24 left-4 md:left-8 font-mono text-gray-500 text-xs md:text-sm tracking-widest border-l-2 border-gray-500 pl-4">
                <p>SYSTEM_IDENTITY: ONLINE</p>
                <p className="text-[10px] opacity-70">システム・オンライン</p>
                <p>ACCESS LEVEL: ADMIN</p>
                <p className="text-[10px] opacity-70">管理者権限</p>
            </div>

            {/* Vertical Decorative Text - Right Side */}
            <div className="absolute top-1/2 right-4 lg:right-12 transform -translate-y-1/2 hidden lg:flex flex-col gap-4 items-center z-0 pointer-events-none opacity-30 mix-blend-overlay writing-vertical-rl text-white font-bold text-4xl tracking-[1em]">
                <span>ラフィフ・シドキ</span>
                <span>システムエンジニア</span>
            </div>

            {/* Spacer for Flex Layout on Mobile */}
            <div className="block lg:hidden h-16"></div>

            {/* Main Headline - Left Aligned & Massive */}
            <div className="hero-headline-stage relative group z-10 text-left grow flex items-center min-h-0">
                <div className="relative w-full">
                    <h1
                        className="hero-display font-archivo-black max-w-full text-[clamp(2.55rem,11vw,10rem)] sm:text-[9vw] lg:text-[10vw] xl:text-[10.5vw] 2xl:text-[10rem] leading-[0.84] uppercase tracking-[-0.055em] text-white mix-blend-difference"
                        style={{ fontFamily: 'var(--font-archivo-black)' }}
                    >
                        Rafif <span className="text-white">Sidqi</span>
                        <br />
                        Mokobombang
                    </h1>
                    {/* Glitch Overlay (Decorative) */}
                    <div
                        className="hero-display absolute top-0 left-1 w-full h-full opacity-0 group-hover:opacity-50 pointer-events-none animate-glitch text-[clamp(2.55rem,11vw,10rem)] sm:text-[9vw] lg:text-[10vw] xl:text-[10.5vw] 2xl:text-[10rem] leading-[0.84] uppercase tracking-[-0.055em] text-interaction-red mix-blend-overlay font-archivo-black"
                        aria-hidden="true"
                        style={{ fontFamily: 'var(--font-archivo-black)' }}
                    >
                        Rafif Sidqi
                        <br />
                        Mokobombang
                    </div>
                    <div
                        className="hero-display absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-80 pointer-events-none animate-glitch text-[clamp(2.55rem,11vw,10rem)] sm:text-[9vw] lg:text-[10vw] xl:text-[10.5vw] 2xl:text-[10rem] leading-[0.84] uppercase tracking-[-0.055em] text-shadow-interaction-blue font-archivo-black"
                        aria-hidden="true"
                        style={{ fontFamily: 'var(--font-archivo-black)' }}
                    >
                        Rafif Sidqi
                        <br />
                        Mokobombang
                    </div>
                </div>
            </div>

            {/* Shared layout prevents the two desktop panels from colliding. */}
            <div className="mt-3 flex flex-col gap-4 w-full lg:absolute lg:bottom-8 lg:left-8 lg:right-8 lg:mt-0 lg:w-auto lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(24rem,28rem)] lg:items-end lg:gap-4 xl:gap-8">
                {/* Roles / Subheadline */}
                <div className="relative min-w-0 border border-white/20 text-gray-300 bg-black/70 px-3 sm:px-4 py-2 text-[11px] sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold uppercase leading-relaxed backdrop-blur-sm self-start lg:self-end">
                    <span className="text-balance">
                        Multimedia Producer | Systems Engineer | Music Tech Enthusiast
                    </span>
                    <span className="block text-right text-[9px] sm:text-xs text-gray-500 mt-1 break-words">
                        マルチメディア・プロデューサー | システムエンジニア
                    </span>
                </div>

                {/* Detail Specs */}
                <div className="relative min-w-0 grid grid-cols-2 gap-2 md:gap-4 font-mono text-gray-400 text-[10px] sm:text-xs md:text-sm w-full text-left">
                    <div className="border border-gray-800 p-2 relative group hover:border-interaction-red transition-colors bg-black/80 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-1 h-1 bg-gray-600 group-hover:bg-interaction-red transition-colors" />
                        <h3 className="text-gray-500 mb-1 uppercase tracking-wider group-hover:text-interaction-red transition-colors">[LANGUAGE] <span className="text-[10px]">言語</span></h3>
                        <p className="text-white">English: C1 Advanced</p>
                    </div>

                    <div className="border border-gray-800 p-2 relative group hover:border-interaction-red transition-colors bg-black/80 backdrop-blur-sm">
                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-gray-600 group-hover:bg-interaction-red transition-colors" />
                        <h3 className="text-gray-500 mb-1 uppercase tracking-wider group-hover:text-interaction-red transition-colors">[CORE] <span className="text-[10px]">コア</span></h3>
                        <p className="text-white">Systems Engineer</p>
                    </div>

                    <div className="flex flex-col gap-2 col-span-2 mt-1 md:mt-2">
                        <button
                            onClick={() => document.getElementById('contact-protocols')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full py-3 border border-interaction-red bg-black/50 text-interaction-red hover:bg-interaction-red hover:text-black transition-all duration-300 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn relative z-20 shadow-red-glow cursor-pointer animate-pulse hover:animate-none"
                        >
                            <span className="group-hover/btn:animate-pulse">[ ESTABLISH_CONNECTION ]</span>
                        </button>

                        <a
                            href="https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/RAFIF%20SIDQI%20MOKOBOMBANG.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 border border-white/20 hover:border-white bg-black/50 text-gray-400 hover:text-white transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/dl relative z-20 cursor-pointer"
                        >
                            <span className="group-hover/dl:text-white transition-colors">[ DOWNLOAD_PERSONNEL_FILE ]</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-4 w-2 h-24 bg-linear-to-b from-transparent via-gray-800 to-transparent hidden md:block"></div>
            <div className="absolute top-1/2 right-4 w-2 h-24 bg-linear-to-b from-transparent via-gray-800 to-transparent hidden md:block"></div>
        </section>
    );
}
