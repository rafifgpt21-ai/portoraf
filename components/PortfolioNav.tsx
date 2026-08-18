"use client";

import { useEffect, useState } from "react";

const navItems = [
    { href: "#top", label: "Index", index: "00" },
    { href: "#about", label: "Profile", index: "01" },
    { href: "#reel", label: "Reel", index: "02" },
    { href: "#audio", label: "Audio", index: "03" },
    { href: "#contact", label: "Contact", index: "04" },
];

export default function PortfolioNav() {
    const [active, setActive] = useState("top");

    useEffect(() => {
        const sections = [document.getElementById("top"), ...document.querySelectorAll<HTMLElement>("[data-portfolio-section]")].filter(Boolean) as HTMLElement[];
        const updateActive = () => {
            const probe = Math.min(window.innerHeight * 0.28, 240);
            const current = sections.reduce((selected, section) => (
                section.getBoundingClientRect().top <= probe ? section : selected
            ), sections[0]);
            setActive(current.id);
        };
        const observer = new IntersectionObserver(updateActive, {
            rootMargin: "-18% 0px -72% 0px",
            threshold: [0, 0.01],
        });
        sections.forEach((section) => observer.observe(section));
        const frame = window.requestAnimationFrame(updateActive);
        window.addEventListener("scroll", updateActive, { passive: true });
        window.addEventListener("hashchange", updateActive);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", updateActive);
            window.removeEventListener("hashchange", updateActive);
            observer.disconnect();
        };
    }, []);

    return (
        <nav aria-label="Portfolio index" className="fixed inset-x-0 top-6 z-[70] border-b-2 border-ink bg-paper text-ink md:top-7">
            <div className="grid h-11 grid-cols-5 px-2 md:h-12 md:grid-cols-[minmax(12rem,1.5fr)_repeat(4,minmax(7rem,1fr))] md:px-5">
                {navItems.map((item, itemIndex) => {
                    const isActive = active === item.href.slice(1);
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => setActive(item.href.slice(1))}
                            className={`group relative flex min-w-0 items-center justify-center gap-1 px-1 font-mono text-[8px] font-bold uppercase tracking-[0.08em] sm:text-[10px] md:justify-start md:px-3 ${isActive ? "underline decoration-[3px] decoration-signal underline-offset-4" : "hover:underline hover:decoration-2 hover:underline-offset-4"}`}
                        >
                            <span className={isActive ? "text-signal" : "text-ink/40 group-hover:text-signal"}>{item.index}</span>
                            <span className={itemIndex === 0 ? "hidden sm:inline" : "inline"}>{item.label}</span>
                            {itemIndex === 0 ? <span className="hidden font-archivo text-sm tracking-[-0.04em] md:ml-auto md:inline">R.S.M.</span> : null}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
