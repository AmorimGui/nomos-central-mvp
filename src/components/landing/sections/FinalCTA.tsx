import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { BrandButton } from "../ui/BrandButton";

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

export function FinalCTA() {
  return (
    <Section
      id="cta"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_60%)]"
        />
      }
    >
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.span
          variants={fadeUp}
          className="caption text-brand-text-tertiary block mb-6"
        >
          fechamento
        </motion.span>

        <motion.h2 variants={fadeUp} className="mb-10 md:mb-12">
          O caos acadêmico acaba aqui.
        </motion.h2>

        <motion.div variants={fadeUp}>
          <BrandButton variant="primary" size="lg">
            Garantir acesso antecipado
          </BrandButton>
        </motion.div>
      </motion.div>
    </Section>
  );
}
