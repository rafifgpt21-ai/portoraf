"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Pause, Play, Square, X } from "lucide-react";
import { useAudio, tracks, type Track } from "@/app/context/AudioContext";

type Theme = "light" | "dark";

const capabilities = [
  { no: "01", title: "Moving image", detail: "Direction / camera / edit / colour", tag: "FRAME" },
  { no: "02", title: "Sound work", detail: "Production / mix / master / design", tag: "WAVE" },
  { no: "03", title: "Live systems", detail: "Broadcast / VJ / streaming / events", tag: "LIVE" },
  { no: "04", title: "Digital products", detail: "Systems / web / AI / interaction", tag: "CODE" },
];

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const seconds = Math.max(0, Math.floor(value));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function ThemeSwitch({ theme, onChange }: { theme: Theme; onChange: () => void }) {
  return (
    <button className="theme-switch" type="button" onClick={onChange} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
      <span className="theme-switch__dot" aria-hidden="true" />
      <span>{theme === "light" ? "DARK / MONO" : "LIGHT / COLOUR"}</span>
    </button>
  );
}

function ReelPoster() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="reel-poster">
      {playing ? (
        <>
          <iframe
            className="reel-frame"
            src="https://www.youtube.com/embed/vj0yMO6_XN0?autoplay=1&rel=0&modestbranding=1"
            title="Rafif Sidqi multimedia production reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <button className="reel-close" type="button" onClick={() => setPlaying(false)} aria-label="Close reel">
            <X size={18} /> CLOSE
          </button>
        </>
      ) : (
        <>
          <div className="reel-poster__type" aria-hidden="true">
            <span>SELECTED</span>
            <span className="outline-word">REEL</span>
            <span>MMXXVI</span>
          </div>
          <div className="reel-poster__target" aria-hidden="true">
            <i /><i /><i />
          </div>
          <button className="reel-play" type="button" onClick={() => setPlaying(true)}>
            <Play size={20} fill="currentColor" /> PLAY FILM
          </button>
        </>
      )}
    </div>
  );
}

function TrackRow({ track }: { track: Track }) {
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const active = currentTrack?.id === track.id;

  return (
    <button className={`track-row${active ? " is-active" : ""}`} type="button" onClick={() => togglePlay(track)}>
      <span className="track-row__number">{String(track.id).padStart(2, "0")}</span>
      <span className="track-row__main">
        <strong>{track.title}</strong>
        <small>{track.artist} / {track.genre}</small>
      </span>
      <span className="track-row__bpm">{track.bpm}<small>BPM</small></span>
      <span className="track-row__time">{track.duration}</span>
      <span className="track-row__action" aria-hidden="true">{active && isPlaying ? <Pause /> : <Play fill="currentColor" />}</span>
    </button>
  );
}

function AudioDesk() {
  const { currentTrack, isPlaying, togglePlay, terminateTrack, currentTime, duration, seek, analyserRef } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || !analyserRef.current || !canvasRef.current) return;
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const samples = new Uint8Array(analyser.frequencyBinCount);
    const render = () => {
      analyser.getByteFrequencyData(samples);
      const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--acid").trim();
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 52; i += 1) {
        const value = samples[Math.floor((i / 52) * samples.length * 0.28)] / 255;
        const height = Math.max(6, value * canvas.height);
        context.fillStyle = i % 5 === 0 ? accent : ink;
        context.fillRect(i * (canvas.width / 52), canvas.height - height, Math.max(2, canvas.width / 52 - 4), height);
      }
      animationRef.current = requestAnimationFrame(render);
    };
    render();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyserRef, isPlaying]);

  return (
    <div className="audio-desk">
      <div className="audio-desk__header">
        <span>OUTPUT / RAF AUDIO</span>
        <span className={isPlaying ? "signal-live" : ""}>{isPlaying ? "● SIGNAL LIVE" : "○ STANDBY"}</span>
      </div>
      <canvas className="audio-desk__scope" ref={canvasRef} width={720} height={210} />
      <div className="audio-desk__now">
        <small>NOW PLAYING</small>
        <strong>{currentTrack?.title ?? "SELECT A RECORD"}</strong>
        <span>{currentTrack ? `${currentTrack.artist} / ${currentTrack.genre}` : "ARCHIVE READY"}</span>
      </div>
      <div className="audio-desk__controls">
        <button type="button" disabled={!currentTrack} onClick={() => currentTrack && togglePlay(currentTrack)} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </button>
        <button type="button" disabled={!currentTrack} onClick={terminateTrack} aria-label="Stop"><Square fill="currentColor" /></button>
        <span>{formatTime(currentTime)}</span>
        <input aria-label="Seek audio" type="range" min={0} max={duration || 0} step={0.1} value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default function PortfolioExperience() {
  const [theme, setTheme] = useState<Theme>("light");
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
    setTheme(next);
  };

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a className="site-mark" href="#top" aria-label="Rafif Sidqi, home">RS/M</a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#profile">Profile</a>
          <a href="#work">Work</a>
          <a href="#sound">Sound</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeSwitch theme={theme} onChange={toggleTheme} />
      </header>

      <section className="hero" id="top">
        <div className="hero__meta hero__meta--left">
          <span>PORTFOLIO / 2026</span><span>JAKARTA, ID</span><span>06°12′S / 106°49′E</span>
        </div>
        <div className="hero__meta hero__meta--right">
          <span>CREATIVE TECHNOLOGIST</span><span>MULTIMEDIA PRODUCER</span><span>AVAILABLE / SELECT PROJECTS</span>
        </div>

        <div className="hero__orb" aria-hidden="true">
          <div className="hero__orb-ring hero__orb-ring--one" />
          <div className="hero__orb-ring hero__orb-ring--two" />
          <div className="hero__orb-cross">+</div>
          <div className="hero__orb-label">IMAGE / SOUND / SYSTEM</div>
        </div>

        <h1 className="hero__name">
          <span className="hero__line hero__line--one">RA<span>FIF</span></span>
          <span className="hero__line hero__line--two"><i>SIDQI</i></span>
          <span className="hero__line hero__line--three">MOKO</span>
        </h1>

        <a className="hero__scroll" href="#profile">SCROLL TO ENTER <ArrowDownRight /></a>
        <div className="hero__edition">ED.<strong>01</strong></div>
      </section>

      <div className="ticker" aria-label="Disciplines">
        <div className="ticker__track">
          <span>MEDIA PRODUCTION ✦ SYSTEMS ENGINEERING ✦ MUSIC TECHNOLOGY ✦ LIVE VISUALS ✦ WEB DEVELOPMENT ✦&nbsp;</span>
          <span aria-hidden="true">MEDIA PRODUCTION ✦ SYSTEMS ENGINEERING ✦ MUSIC TECHNOLOGY ✦ LIVE VISUALS ✦ WEB DEVELOPMENT ✦&nbsp;</span>
        </div>
      </div>

      <section className="profile section-frame" id="profile">
        <header className="section-heading">
          <span>01 / PROFILE</span>
          <h2>THE WORK LIVES<br />BETWEEN <em>WORLDS.</em></h2>
          <span className="section-heading__note">PRACTICE / INTERDISCIPLINARY</span>
        </header>
        <div className="profile__grid">
          <div className="profile__statement">
            <p>I build complete audiovisual experiences and useful digital systems—from the first signal to the final delivery.</p>
            <div className="profile__stamp">CS<br /><span>+</span><br />CREATIVE</div>
          </div>
          <div className="profile__copy">
            <p>A Computer Science graduate with the hands of a producer: camera, edit, colour, composition, mixing, live broadcast, and frontend systems.</p>
            <p>My work connects creative instinct with technical reliability. The result is media that feels deliberate and systems that hold up under pressure.</p>
            <a href="https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/RAFIF%20SIDQI%20MOKOBOMBANG.pdf" target="_blank" rel="noreferrer">READ MY RÉSUMÉ <ArrowUpRight /></a>
          </div>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.no}>
              <span>{item.no}</span>
              <b>{item.tag}</b>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <ArrowUpRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="work section-frame" id="work">
        <div className="work__side-title" aria-hidden="true">MOVING<br />IMAGE</div>
        <div className="work__content">
          <header className="section-label"><span>02 / SELECTED WORK</span><span>2022—2026</span></header>
          <h2>PICTURES<br /><span>NOW</span></h2>
          <p className="work__intro">Direction, camera, post-production, colour, sound, and delivery—treated as one continuous system.</p>
          <ReelPoster />
          <div className="work__credits">
            <span>ROLE<br /><b>MULTIMEDIA PRODUCER</b></span>
            <span>FORMAT<br /><b>16:9 / STEREO</b></span>
            <span>OUTPUT<br /><b>YOUTUBE / DIGITAL</b></span>
          </div>
        </div>
      </section>

      <section className="sound section-frame" id="sound">
        <header className="section-heading section-heading--sound">
          <span>03 / SONIC ARCHIVE</span>
          <h2>OPEN ARCHIVE.<br /><em>ONE SIGNAL.</em></h2>
          <span className="section-heading__note">PRODUCED BY RAF</span>
        </header>
        <div className="sound__body">
          <AudioDesk />
          <div className="track-list">
            <div className="track-list__header"><span>NO.</span><span>RECORD / ARTIST</span><span>BPM</span><span>TIME</span><span>PLAY</span></div>
            {tracks.map((track) => <TrackRow track={track} key={track.id} />)}
          </div>
        </div>
      </section>

      <section className="contact section-frame" id="contact">
        <div className="contact__topline"><span>04 / OPEN CHANNEL</span><span>JAKARTA / GMT+7</span></div>
        <div className="contact__main">
          <p>HAVE A PROJECT?</p>
          <h2>LET’S MAKE<br /><span>NOISE.</span></h2>
          <a href="mailto:rafifsidqi2138@gmail.com">RAFIFSIDQI2138@GMAIL.COM <ArrowUpRight /></a>
        </div>
        <div className="contact__links">
          <a href="https://wa.me/628559895967" target="_blank" rel="noreferrer"><span>01</span>WHATSAPP <ArrowUpRight /></a>
          <a href="https://www.linkedin.com/in/rafifsidqi" target="_blank" rel="noreferrer"><span>02</span>LINKEDIN <ArrowUpRight /></a>
          <a href="https://xycf6udmoabgvnxm.public.blob.vercel-storage.com/RAFIF%20SIDQI%20MOKOBOMBANG.pdf" target="_blank" rel="noreferrer"><span>03</span>RÉSUMÉ <ArrowUpRight /></a>
        </div>
        <footer><span>RAFIF SIDQI MOKOBOMBANG © {year}</span><a href="#top">BACK TO TOP ↑</a></footer>
      </section>
    </main>
  );
}
