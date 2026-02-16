import type { Metadata } from "next";
import { Oswald, JetBrains_Mono, Orbitron, Archivo_Black } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import SystemOverlay from "@/components/SystemOverlay";

import TelemetryTopBar from "@/components/TelemetryTopBar";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafif Sidqi M. | Systems Engineer",
  description: "Multimedia Producer | Systems Engineer | Music Tech Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${oswald.variable} ${jetbrainsMono.variable} ${orbitron.variable} ${archivoBlack.variable} antialiased bg-cyber-black text-white selection:bg-interaction-red selection:text-black overflow-x-hidden`}
      >
        <div className="fixed inset-0 pointer-events-none z-50 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
        <Background />
        <SystemOverlay />
        <TelemetryTopBar />
        <div className="md:pl-12 pl-0 pt-8 transition-all duration-300 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
