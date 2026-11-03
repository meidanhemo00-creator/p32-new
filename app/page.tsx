import { Nav } from "./components/Nav";
import { Cover } from "./components/Cover";
import { Hero } from "./components/Hero";
import { QuickNav } from "./components/QuickNav";
import { Fragmentation } from "./components/Fragmentation";
import { Pivot } from "./components/Pivot";
import { ExecutiveProtection } from "./components/ExecutiveProtection";
import { Pillars } from "./components/Pillars";
import { Capabilities } from "./components/Capabilities";
import { Canine } from "./components/Canine";
import { Cyber } from "./components/Cyber";
import { Credibility } from "./components/Credibility";
import { SatelliteReach } from "./components/SatelliteReach";
import { GlobalReach } from "./components/GlobalReach";
import { Engagement } from "./components/Engagement";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Cover />
        <Hero />
        <QuickNav />
        <Fragmentation />
        <Pivot />
        <ExecutiveProtection />
        <Pillars />
        <Capabilities />
        <Cyber />
        <Canine />
        <Credibility />
        <SatelliteReach />
        <GlobalReach />
        <Engagement />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
