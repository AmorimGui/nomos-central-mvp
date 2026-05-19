import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/sections/Hero";
import { Problem } from "@/components/landing/sections/Problem";
import { Features } from "@/components/landing/sections/Features";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Features />
    </>
  );
}
