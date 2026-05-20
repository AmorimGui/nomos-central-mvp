import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWaitlist } from "./useWaitlist";
import { BrandButton } from "../ui/BrandButton";

const schema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  // Honeypot field — not validated here. Bots fill it, we drop the submit silently.
  hp_fullname: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function WaitlistForm() {
  const { status, error, submit } = useWaitlist();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", hp_fullname: "" },
  });

  const onSubmit = async (data: FormData) => {
    // Honeypot trip: silently drop. Bot sees a normal success-looking response
    // (no validation error), discouraging retry.
    if (data.hp_fullname && data.hp_fullname.length > 0) return;
    await submit(data.email);
  };

  if (status === "success") {
    return (
      <div className="text-center space-y-3 py-2">
        <span className="caption text-brand-accent block">✓ tudo certo</span>
        <h3>Você está na lista.</h3>
        <p className="text-sm text-brand-text-secondary">
          Avisamos quando o Nomos estiver pronto. Obrigado por confiar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="waitlist-email"
          className="caption text-brand-text-tertiary block mb-2"
        >
          email
        </label>
        <input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg bg-brand-bg-tertiary border border-white/[0.08] text-brand-text-primary placeholder:text-brand-text-tertiary focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition-colors"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "waitlist-email-error" : undefined}
        />
        {errors.email && (
          <p
            id="waitlist-email-error"
            className="text-sm text-brand-text-secondary mt-2"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Honeypot — invisible to humans, bots usually fill it */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        {...register("hp_fullname")}
        className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
      />

      <BrandButton
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando..." : "Confirmar inscrição"}
      </BrandButton>

      {status === "error" && error && (
        <p className="text-sm text-brand-text-secondary text-center pt-1">
          Algo deu errado. Tente de novo em instantes.
        </p>
      )}
    </form>
  );
}
