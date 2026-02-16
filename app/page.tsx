import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoProjects from "@/components/VideoProjects";
import MusicProjects from "@/components/MusicProjects";
import TechStack from "@/components/TechStack";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <VideoProjects />
        <MusicProjects />
        <TechStack />
        <Terminal />
      </div>
    </main>
  );
}
