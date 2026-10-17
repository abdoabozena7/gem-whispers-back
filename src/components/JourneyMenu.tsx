import * as Dialog from "@radix-ui/react-dialog";
import { BookOpen, Crown, Menu, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { civilizationLevel, civilizationStage, tr, type Age, type Lang } from "@/lib/i18n";

export function JourneyMenu({ count, L, age, onRestart }: { count: number; L: Lang; age: Age; onRestart: () => void }) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return <Dialog.Root open={open} onOpenChange={(value) => { setOpen(value); setConfirm(false); }}>
    <Dialog.Trigger asChild><Button variant="ghost" size="icon" aria-label={tr("journeyMenu", L)}><Menu /></Button></Dialog.Trigger>
    <Dialog.Portal><Dialog.Overlay className="journey-menu-overlay" /><Dialog.Content className="journey-menu" dir={L === "ar" ? "rtl" : "ltr"}>
      <Dialog.Close asChild><Button variant="ghost" size="icon" className="sheet-close" aria-label={tr("close", L)}><X /></Button></Dialog.Close>
      <div className="sheet-handle" /><Crown className="journey-menu-crown" />
      <Dialog.Title>{confirm ? tr("restartConfirm", L) : tr("myEgypt", L, age)}</Dialog.Title>
      <Dialog.Description>{confirm ? tr("restartWarning", L) : civilizationStage(count, L)}</Dialog.Description>
      {!confirm && <><div className="menu-level"><strong>{tr("level", L)} {civilizationLevel(count)}</strong><span>{Math.round(count / 8 * 100)}%</span></div><progress value={count} max={8} aria-label={tr("knowledgeRestored", L, age)} />
        <Button variant="quiet" size="museum" onClick={() => { setOpen(false); document.getElementById("earned-chapters")?.scrollIntoView({ block: "start" }); }}><BookOpen />{tr("rewards", L)}</Button>
        <Button variant="outline" size="museum" onClick={() => setConfirm(true)}><RotateCcw />{tr("restart", L, age)}</Button></>}
      {confirm && <><Button variant="destructive" size="museum" onClick={() => { setOpen(false); onRestart(); }}><RotateCcw />{tr("restart", L, age)}</Button><Button variant="outline" size="museum" onClick={() => setConfirm(false)}>{tr("keepJourney", L)}</Button></>}
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}