"use client";

const navItems = [
    { href: "#about", label: "About", index: "01" },
    { href: "#reel", label: "Reel", index: "02" },
    { href: "#audio", label: "Audio", index: "03" },
    { href: "#contact", label: "Contact", index: "04" },
];

export default function PortfolioNav() {
    return (
        <nav
            aria-label="Portfolio sections"
            className="fixed top-3 left-3 right-3 md:top-9 md:left-auto md:right-8 z-[60] border border-white/15 bg-black/80 backdrop-blur-xl"
        >
            <div className="flex h-11 items-center justify-between md:justify-start">
                <a
                    href="#top"
                    className="hidden md:flex h-full items-center border-r border-white/15 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
                >
                    RAF//SYSTEMS
                </a>
                <div className="flex h-full flex-1 items-center justify-between md:flex-none">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="group flex h-full min-w-0 items-center gap-1 px-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-gray-400 transition-colors hover:bg-white/10 hover:text-white sm:px-3 sm:text-[10px] md:px-4"
                        >
                            <span className="text-gray-700 transition-colors group-hover:text-interaction-red">
                                {item.index}
                            </span>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
