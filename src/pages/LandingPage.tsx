import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/sections/Hero";
import { Problem } from "@/components/landing/sections/Problem";
import { Features } from "@/components/landing/sections/Features";
import { HowItWorks } from "@/components/landing/sections/HowItWorks";
import { ForWho } from "@/components/landing/sections/ForWho";
import { FinalCTA } from "@/components/landing/sections/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <ForWho />
      <FinalCTA />
      <Footer />
    </>
  );
}
