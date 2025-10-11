import Image from "next/image";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Benefits } from "../components/Benefits";
import { Pricing } from "../components/Pricing";
import { Integration } from "../components/Integration";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <Pricing />
        <Integration />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
