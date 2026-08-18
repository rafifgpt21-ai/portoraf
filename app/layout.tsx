import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Oswald } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { AudioProvider } from "@/app/context/AudioContext";
import SmoothScroll from "@/components/SmoothScroll";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafif Sidqi — Creative Technologist",
  description: "Portfolio of Rafif Sidqi Mokobombang — multimedia producer, systems engineer, and music technologist in Jakarta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('portfolio-theme');var theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme='light';}})();`,
          }}
        />
      </head>
      <body
        className={`${oswald.variable} ${plexMono.variable} ${archivoBlack.variable}`}
      >
        <AudioProvider>
          <SmoothScroll />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
