import { Chat } from "@/components/Chat";
import { Navbar } from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import { QuickActions } from "@/components/QuickActions";
import { Skills } from "@/components/Skills";




export default function Home() {
  return  <div className=" w-screen md:max-h-screen min-h-dvh md:min-h-screen flex flex-col overflow-hidden bg-black">
      <Navbar />
      <main className="flex flex-1  min-h-0 overflow-hidden md:px-[5%] py-[1%] px-[5%] md:gap-5 z-1">
        <div className="flex-3 min-h-0 w-full">
          <Chat />
        </div>
        
        <section className="hidden md:flex flex-1 min-h-0 overflow-y-auto flex-col gap-5">
          <QuickActions />
          <Skills />
        </section>
      </main>
      <ParticleBackground />
    </div>
}
