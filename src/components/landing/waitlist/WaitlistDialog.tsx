import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WaitlistForm } from "./WaitlistForm";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-brand bg-brand-bg-secondary border border-white/[0.08] text-brand-text-primary max-w-md">
        <DialogHeader>
          <DialogTitle className="!text-2xl !leading-tight !tracking-tight">
            Entrar na lista
          </DialogTitle>
          <DialogDescription className="text-brand-text-secondary !text-base !leading-relaxed">
            Avisamos assim que liberarmos o acesso.
          </DialogDescription>
        </DialogHeader>
        <WaitlistForm />
      </DialogContent>
    </Dialog>
  );
}
