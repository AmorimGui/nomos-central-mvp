import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/sections/Hero";
import { Problem } from "@/components/landing/sections/Problem";
import { Features } from "@/components/landing/sections/Features";
import { HowItWorks } from "@/components/landing/sections/HowItWorks";
import { ForWho } from "@/components/landing/sections/ForWho";
import { FinalCTA } from "@/components/landing/sections/FinalCTA";
import { WaitlistDialog } from "@/components/landing/waitlist/WaitlistDialog";

export default function LandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <>
      <Navbar />
      <Hero onCTAClick={openWaitlist} />
      <Problem />
      <Features />
      <HowItWorks />
      <ForWho />
      <FinalCTA onCTAClick={openWaitlist} />
      <Footer />
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  );
}
