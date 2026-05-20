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

export function ForWho() {
  return (
    <Section id="para-quem">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.span
          variants={fadeUp}
          className="caption text-brand-text-tertiary block mb-6"
        >
          para quem é
        </motion.span>

        <motion.h2 variants={fadeUp} className="mb-8 md:mb-10">
          Da prova de{" "}
          <span className="text-brand-accent">amanhã</span>
          <br />
          ao TCC do{" "}
          <span className="text-brand-accent">fim do ano</span>.
        </motion.h2>

        <motion.p variants={fadeUp} className="body-large">
          Se você estuda, o Nomos é para você.
        </motion.p>
      </motion.div>
    </Section>
  );
}
