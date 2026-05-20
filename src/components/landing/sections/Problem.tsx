import { motion } from "framer-motion";
import { Calendar, FileText, Brain, Focus, FileEdit, Bell } from "lucide-react";
import { Section } from "../ui/Section";

const cards = [
  { name: "Calendário", icon: Calendar, rotation: -3 },
  { name: "Anotações", icon: FileText, rotation: 4 },
  { name: "Flashcards", icon: Brain, rotation: -5 },
  { name: "Foco", icon: Focus, rotation: 3 },
  { name: "Resumos", icon: FileEdit, rotation: -2 },
  { name: "Lembretes", icon: Bell, rotation: 5 },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30, rotate: 0 },
  show: (rotation: number) => ({
    opacity: 1,
    y: 0,
    rotate: rotation,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Problem() {
  return (
    <Section id="problema">
      <motion.div
        className="flex flex-col items-center text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.span variants={fadeUp} className="caption text-brand-text-tertiary mb-6">
          o problema
        </motion.span>

        <motion.h2 variants={fadeUp} className="max-w-4xl mb-12 md:mb-16">
          Aplicativos demais.
          <br />
          Progresso de menos.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mb-12 md:mb-16">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.name}
                custom={card.rotation}
                variants={cardItem}
                className="rounded-xl border border-white/[0.08] bg-brand-bg-secondary p-5 flex flex-col items-start gap-3 transition-colors hover:border-white/[0.16]"
              >
                <Icon className="w-5 h-5 text-brand-text-tertiary" aria-hidden />
                <span className="text-sm font-medium text-brand-text-secondary">
                  {card.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.p variants={fadeUp} className="body-large max-w-2xl">
          Você abre Notion para anotar, Google Calendar para agendar, Quizlet pra
          revisar, Forest pra focar. E perde mais tempo organizando do que
          estudando.
        </motion.p>
      </motion.div>
    </Section>
  );
}
