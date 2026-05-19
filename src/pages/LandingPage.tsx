import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/sections/Hero";
import { Problem } from "@/components/landing/sections/Problem";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
    </>
  );
}
