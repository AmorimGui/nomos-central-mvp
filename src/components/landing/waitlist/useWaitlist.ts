import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Status = "idle" | "loading" | "success" | "error";

export function useWaitlist() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (email: string) => {
    setStatus("loading");
    setError(null);

    const userAgent =
      typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null;

    // The auto-generated Database type does not yet include `waitlist` because
    // the migration has not been pushed to the live project. Cast to bypass
    // until types are regenerated via `supabase gen types`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = supabase as any;

    const { error: insertError } = await client
      .from("waitlist")
      .insert({ email, source: "landing", user_agent: userAgent });

    if (insertError) {
      // 23505 = unique violation. Treat repeat sign-ups as success silently —
      // the user gets the same confirmation either way, which is better UX
      // and avoids leaking which emails are already on the list.
      if (insertError.code === "23505") {
        setStatus("success");
        return;
      }
      setError(insertError.message);
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
  };

  return { status, error, submit, reset };
}
