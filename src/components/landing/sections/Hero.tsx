import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { BrandButton } from "../ui/BrandButton";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const mockTasks: Array<{ label: string; time: string; accent?: boolean }> = [
  { label: "Resumo: História Geral, capítulo 3", time: "09:00", accent: true },
  { label: "Revisar flashcards de Direito", time: "10:30" },
  { label: "Bloco de estudo: Cálculo II", time: "14:00" },
  { label: "Entregar TCC — capítulo 2", time: "18:00" },
];

interface HeroProps {
  onCTAClick?: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
  const scrollToHowItWorks = () => {
    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section size="hero" id="hero">
      <motion.div
        className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Left: copy */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.span variants={item} className="caption text-brand-accent inline-block">
            o app de estudo definitivo
          </motion.span>

          <motion.h1 variants={item}>
            Sua vida acadêmica,
            <br />
            <span className="text-brand-accent">finalmente em ordem.</span>
          </motion.h1>

          <motion.p variants={item} className="body-large max-w-xl mx-auto lg:mx-0">
            Pare de perder tempo organizando os apps que deveriam te organizar.
            Organização, IA e foco — em um só lugar.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
          >
            <BrandButton variant="primary" size="lg" onClick={onCTAClick}>
              Entrar na lista de espera
            </BrandButton>
            <BrandButton variant="secondary" size="lg" onClick={scrollToHowItWorks}>
              Ver como funciona
            </BrandButton>
          </motion.div>
        </div>

        {/* Right: faux app mockup */}
        <motion.div variants={item} className="relative" aria-hidden>
          {/* Soft glow behind mockup */}
          <div className="absolute inset-0 -z-10 bg-brand-accent/15 blur-3xl rounded-full" />

          <div
            className="relative rounded-2xl border border-white/[0.08] bg-brand-bg-secondary shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ transform: "perspective(1200px) rotateY(-5deg) rotateX(2deg)" }}
          >
            {/* Mock window chrome */}
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[0.06]">
              <span className="w-3 h-3 rounded-full bg-white/[0.10]" />
              <span className="w-3 h-3 rounded-full bg-white/[0.10]" />
              <span className="w-3 h-3 rounded-full bg-white/[0.10]" />
              <span className="ml-3 caption text-brand-text-tertiary">Hoje · Nomos</span>
            </div>

            {/* Mock body */}
            <div className="p-6 space-y-3">
              <div className="caption text-brand-text-tertiary mb-2">17 de maio · sexta-feira</div>
              {mockTasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-brand-bg-tertiary border border-white/[0.04]"
                >
                  <span
                    className={
                      task.accent
                        ? "w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(16,185,129,0.6)] shrink-0"
                        : "w-2 h-2 rounded-full bg-white/[0.20] shrink-0"
                    }
                  />
                  <span className="text-sm flex-1 text-brand-text-primary truncate">{task.label}</span>
                  <span className="caption text-brand-text-tertiary font-geist-mono">{task.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
