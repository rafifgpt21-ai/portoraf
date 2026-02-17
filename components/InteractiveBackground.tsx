"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            vx: number;
            vy: number;
            color: string;
            originalX: number;
            originalY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 1; // 1-3px size
                this.vx = (Math.random() - 0.5) * 0.2; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.2;
                this.originalX = this.x;
                this.originalY = this.y;

                // Randomly assign colors: mostly grey/white, rare red accents
                const rand = Math.random();
                if (rand > 0.98) {
                    this.color = "rgba(255, 0, 0, 0.8)"; // Red accent
                } else {
                    this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`; // Increased brightness
                }
            }

            update() {
                // Base movement
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction (Antigravity-ish / Repulsion)
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDistance = 150;

                if (distance < forceDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (forceDistance - distance) / forceDistance;

                    // Push away from mouse
                    const directionX = forceDirectionX * force * 2;
                    const directionY = forceDirectionY * force * 2;

                    this.x -= directionX;
                    this.y -= directionY;
                }

                // Wrap around screen
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;

                // Draw square pixels for cyber feel, not circles
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = (window.innerWidth * window.innerHeight) / 15000; // Density
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-100"
        />
    );
}
