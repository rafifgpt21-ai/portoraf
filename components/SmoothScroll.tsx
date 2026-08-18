"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const anchorEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.085,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            syncTouch: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.35,
        });

        const handleAnchorClick = (event: MouseEvent) => {
            if (
                event.button !== 0
                || event.metaKey
                || event.ctrlKey
                || event.shiftKey
                || event.altKey
            ) return;

            const clickedElement = event.target;
            const anchor = clickedElement instanceof Element
                ? clickedElement.closest<HTMLAnchorElement>('a[href*="#"]')
                : null;

            if (
                !anchor
                || anchor.origin !== window.location.origin
                || anchor.pathname !== window.location.pathname
                || !anchor.hash
            ) return;

            const target = document.querySelector<HTMLElement>(anchor.hash);
            if (!target) return;

            event.preventDefault();
            lenis.scrollTo(target, {
                offset: -58,
                duration: 1.15,
                easing: anchorEasing,
                onComplete: () => window.history.pushState(null, "", anchor.hash),
            });
        };

        document.addEventListener("click", handleAnchorClick, { capture: true });

        let animationFrameId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            animationFrameId = window.requestAnimationFrame(raf);
        };

        animationFrameId = window.requestAnimationFrame(raf);

        return () => {
            document.removeEventListener("click", handleAnchorClick, { capture: true });
            window.cancelAnimationFrame(animationFrameId);
            lenis.destroy();
        };
    }, []);

    return null;
}
