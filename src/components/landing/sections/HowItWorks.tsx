import { motion } from "framer-motion";
import { Section } from "../ui/Section";

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

const steps = [
  {
    title: "Importe sua rotina",
    description:
      "Sincronize seu calendário acadêmico ou crie do zero. Hoje sempre claro.",
  },
  {
    title: "Centralize seus materiais",
    description:
      "PDFs, notas e desenhos no caderno digital. Tudo pesquisável.",
  },
  {
    title: "Deixe a IA acelerar",
    description:
      "Resumos e flashcards gerados automaticamente. Você foca em entender.",
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            variants={fadeUp}
            className="caption text-brand-text-tertiary block mb-6"
          >
            como funciona
          </motion.span>
          <motion.h2 variants={fadeUp} className="max-w-3xl mx-auto">
            Simples de começar.
            <br />
            Poderoso de usar.
          </motion.h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 list-none p-0 m-0">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <span
                aria-hidden
                className="text-5xl md:text-6xl font-semibold text-brand-accent mb-6 leading-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mb-3">{step.title}</h4>
              <p className="text-sm text-brand-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </Section>
  );
}
