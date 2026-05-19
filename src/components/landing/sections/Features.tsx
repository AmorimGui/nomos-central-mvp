import { motion } from "framer-motion";
import {
  Layers,
  BookText,
  CalendarDays,
  NotebookPen,
  BellRing,
  Target,
  type LucideIcon,
} from "lucide-react";
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

interface SmallFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  aiTag?: boolean;
}

const smallFeatures: SmallFeature[] = [
  {
    icon: BookText,
    title: "Resumos com IA",
    description:
      "Cole o conteúdo, receba o essencial. Sem precisar ler 40 páginas pra entender 4.",
    aiTag: true,
  },
  {
    icon: CalendarDays,
    title: "Organização de rotina",
    description:
      "Importe seu calendário acadêmico, agende blocos de estudo e tenha hoje sempre claro.",
  },
  {
    icon: NotebookPen,
    title: "Caderno digital",
    description:
      "Notas, desenhos e PDFs no mesmo lugar. Sincronizado, pesquisável, seu pra sempre.",
  },
  {
    icon: BellRing,
    title: "Lembretes inteligentes",
    description:
      "Avisos no momento certo. Antes de provas, em horários ociosos, quando você esquecer.",
  },
  {
    icon: Target,
    title: "Bloqueio de distrações",
    description:
      "Modo foco que esconde abas e bloqueia distrações pelo tempo que você escolher.",
  },
];

function AITag() {
  return (
    <span
      aria-hidden
      className="caption px-2 py-0.5 rounded bg-brand-accent/10 text-brand-accent"
    >
      ✦ IA
    </span>
  );
}

function SmallFeatureCard({ icon: Icon, title, description, aiTag }: SmallFeature) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-xl border border-white/[0.08] bg-brand-bg-secondary p-6 transition-all duration-300 hover:border-white/[0.16] hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]"
    >
      {aiTag && (
        <div className="absolute top-5 right-5">
          <AITag />
        </div>
      )}
      <Icon className="w-5 h-5 text-brand-text-tertiary mb-4" aria-hidden />
      <h4 className="mb-2">{title}</h4>
      <p className="text-sm text-brand-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  );
}

function FlashcardsHeroCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="relative md:col-span-2 lg:row-span-2 rounded-xl border border-white/[0.08] bg-brand-bg-secondary p-8 lg:p-10 transition-all duration-300 hover:border-white/[0.16] hover:shadow-[0_0_50px_rgba(16,185,129,0.08)] flex flex-col"
    >
      <div className="absolute top-6 right-6">
        <AITag />
      </div>

      <Layers className="w-6 h-6 text-brand-text-tertiary mb-6" aria-hidden />
      <h3 className="mb-4">Flashcards gerados por IA</h3>
      <p className="body-large mb-8 lg:max-w-md">
        Gere baralhos completos a partir das suas notas. Revise no algoritmo SM-2,
        igual ao Anki — sem o trabalho de criar cartão por cartão.
      </p>

      {/* Mini-mockup: a flashcard "generated" */}
      <div
        aria-hidden
        className="mt-auto rounded-lg border border-white/[0.08] bg-brand-bg-tertiary p-5 space-y-4 max-w-md"
      >
        <span className="caption text-brand-accent block">✦ Gerado em 0.8s</span>
        <div>
          <span className="caption text-brand-text-tertiary block mb-1.5">pergunta</span>
          <span className="text-sm text-brand-text-primary block">
            Qual é a fórmula da Lei de Hooke?
          </span>
        </div>
        <div>
          <span className="caption text-brand-text-tertiary block mb-1.5">resposta</span>
          <span className="text-sm font-geist-mono text-brand-text-primary block">
            F = -kx
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <Section id="funcionalidades">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            variants={fadeUp}
            className="caption text-brand-text-tertiary block mb-6"
          >
            funcionalidades
          </motion.span>
          <motion.h2 variants={fadeUp} className="max-w-3xl mx-auto">
            Tudo que você precisa, em um só lugar.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          <FlashcardsHeroCard />
          {smallFeatures.map((f) => (
            <SmallFeatureCard key={f.title} {...f} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
