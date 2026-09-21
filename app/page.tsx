import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Fragmentation } from "./components/Fragmentation";
import { Pivot } from "./components/Pivot";
import { Pillars } from "./components/Pillars";
import { Capabilities } from "./components/Capabilities";
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
        <Hero />
        <Fragmentation />
        <Pivot />
        <Pillars />
        <Capabilities />
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
