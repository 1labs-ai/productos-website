import { Footer } from "@/components/layout";
import { HeroSection } from "@/components/sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
