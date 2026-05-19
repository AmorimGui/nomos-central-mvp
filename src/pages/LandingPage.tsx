import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/sections/Hero";
import { Problem } from "@/components/landing/sections/Problem";
import { Features } from "@/components/landing/sections/Features";
import { HowItWorks } from "@/components/landing/sections/HowItWorks";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
    </>
  );
}
