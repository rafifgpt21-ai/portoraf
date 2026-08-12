import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoProjects from "@/components/VideoProjects";
import MusicProjects from "@/components/MusicProjects";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <main id="top" className="min-h-screen w-full relative overflow-hidden">
      <Hero />
      <div id="about">
        <About />
      </div>
      <VideoProjects />
      <MusicProjects />
      <Terminal />
    </main>
  );
}
