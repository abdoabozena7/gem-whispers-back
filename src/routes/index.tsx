import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft, Building2, Check, ChevronRight, CircleDot, Crown, HeartPulse, Landmark, Lightbulb,
  ScanLine, ScrollText, Shield, Ship, Sparkles, Wheat, type LucideIcon,
} from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getRiddle } from "@/lib/ai/riddle.functions";
import {
  artifactText, fallbackHints, fallbackProblem, knowledgeName, LANGS, toGlyphs, tr,
  type Age, type Key, type Knowledge, type Lang,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { nextHintLevel } from "@/lib/hint-levels";

const CityScene3D = lazy(() => import("@/components/CityScene3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GEM: Bring Egypt Back to Life" },
      { name: "description", content: "Decode the ancient tongue, solve the problems of a lost civilization, and watch Ancient Egypt live again." },
      { property: "og:title", content: "GEM: Bring Egypt Back to Life" },
      { property: "og:description", content: "The museum holds the knowledge your civilization needs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GemExperience,
});

type View = "locked" | "rosettaScan" | "rosetta" | "age" | "city" | "scan" | "artifact" | "need" | "memory";

/** Scan order drives the story; the current need is always the next knowledge in this order. */
const ORDER: Knowledge[] = ["Agriculture", "Religion", "Architecture", "Writing", "Government", "Trade", "Medicine", "Military"];
const icons: Record<Knowledge, LucideIcon> = {
  Agriculture: Wheat, Religion: Landmark, Architecture: Building2, Writing: ScrollText,
  Trade: Ship, Medicine: HeartPulse, Government: Crown, Military: Shield,
};
const STORAGE = "gem-journey-v2";

type Saved = { discoveries: Knowledge[]; lang: Lang | null; age: Age | null };

function GemExperience() {
  const [view, setView] = useState<View>("locked");
  const [discoveries, setDiscoveries] = useState<Knowledge[]>([]);
  const [lang, setLang] = useState<Lang | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [current, setCurrent] = useState<Knowledge>("Agriculture");
  const [reaction, setReaction] = useState<Knowledge | null>(null);
  const [templeOpen, setTempleOpen] = useState(false);

  // Resume a saved journey (client only, after hydration).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        setDiscoveries(s.discoveries ?? []);
        setLang(s.lang);
        setAge(s.age);
        if (s.lang && s.age) { setView("city"); setWelcome(true); }
        else if (s.lang) setView("age");
      }
    } catch { /* ignore corrupt save */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE, JSON.stringify({ discoveries, lang, age } satisfies Saved));
  }, [loaded, discoveries, lang, age]);

  useEffect(() => {
    if (!reaction) return;
    const t = window.setTimeout(() => setReaction(null), 5200);
    return () => window.clearTimeout(t);
  }, [reaction]);
  useEffect(() => {
    if (!welcome) return;
    const t = window.setTimeout(() => setWelcome(false), 3500);
    return () => window.clearTimeout(t);
  }, [welcome]);

  const L: Lang = lang ?? "en";
  const decoded = lang !== null;
  const need = ORDER.find((k) => !discoveries.includes(k)) ?? null;
  const progress = Math.round((discoveries.length / ORDER.length) * 100);
  const ctx = { L, decoded };

  const reset = () => {
    localStorage.removeItem(STORAGE);
    setDiscoveries([]); setLang(null); setAge(null); setView("locked");
  };

  let body;
  if (view === "locked") {
    body = <Locked ctx={ctx} onScan={() => setView("rosettaScan")} />;
  } else if (view === "rosettaScan") {
    body = (
      <ScanScreen ctx={ctx} scanning={scanning} onBack={() => setView("locked")} onScan={() => {
        setScanning(true);
        window.setTimeout(() => { setScanning(false); setView("rosetta"); }, 1400);
      }} />
    );
  } else if (view === "rosetta") {
    body = <Rosetta onPick={(l) => { setLang(l); window.setTimeout(() => setView("age"), 1600); }} picked={lang} />;
  } else if (view === "age") {
    body = <AgePick ctx={ctx} onPick={(a) => { setAge(a); setView("city"); }} />;
  } else if (view === "scan") {
    body = (
      <ScanScreen ctx={ctx} scanning={scanning} onBack={() => setView("city")} onScan={() => {
        setCurrent(need ?? ORDER[discoveries.length % ORDER.length]);
        setScanning(true);
        window.setTimeout(() => { setScanning(false); setView("artifact"); }, 1200);
      }} />
    );
  } else if (view === "artifact") {
    body = (
      <ArtifactReveal ctx={ctx} k={current} restored={discoveries.includes(current)}
        onRestore={() => setDiscoveries((d) => (d.includes(current) ? d : [...d, current]))}
        onChanged={() => { setReaction(current); setView("city"); }} />
    );
  } else if (view === "need") {
    body = <NeedScreen ctx={ctx} need={need} age={age ?? "adult"} onBack={() => setView("city")} onDiscover={() => setView("scan")} />;
  } else if (view === "memory") {
    body = <MemoryScreen ctx={ctx} discoveries={discoveries} onBack={() => setView("city")} onReset={reset} />;
  } else {
    body = (
      <main className="app-shell">
        <header className="city-header">
          <div className="city-header__title"><span>{tr("yourCiv", L)}</span><strong>{tr("living", L)}</strong></div>
          <button className="progress-medallion" onClick={() => setView("memory")} aria-label={`${progress}%`}>
            <span>{progress}%</span><small>{tr("restored", L)}</small>
          </button>
        </header>
        <div className="city-stage-wrap">
          <LivingCity discoveries={discoveries} focus={reaction} onTemple={() => setTempleOpen(true)} />
          {reaction && <ReactionBanner L={L} k={reaction} />}
          {welcome && !reaction && <div className="welcome-toast">{tr("welcomeBack", L)}</div>}
        </div>
        <section className="city-actions">
          {need && (
            <button className="need-strip" onClick={() => setView("need")}>
              <span><small>{tr("problem", L)}</small><strong className="need-teaser">{fallbackProblem[need][L].split(/[.!?؟]/)[0]}…</strong></span><ChevronRight />
            </button>
          )}
          <Button variant="discovery" size="museum" className="w-full" onClick={() => setView("scan")}><ScanLine /> {tr("discover", L)}</Button>
        </section>
        <nav className="compact-nav" aria-label="Main navigation">
          <button className="compact-nav__item is-active" aria-label={tr("living", L)}><CircleDot /></button>
          <button className="compact-nav__item" onClick={() => setView("need")} aria-label={tr("problem", L)}><Lightbulb /></button>
          <button className="compact-nav__item" onClick={() => setView("memory")} aria-label={tr("myEgypt", L)}><Crown /></button>
        </nav>
        {templeOpen && <TempleSheet L={L} discoveries={discoveries} onClose={() => setTempleOpen(false)} onDiscover={() => { setTempleOpen(false); setView("need"); }} />}
      </main>
    );
  }

  return <div dir={L === "ar" ? "rtl" : "ltr"} lang={L} className="gem-root" data-decoded={decoded}>{body}</div>;
}

/** Text that reads as hieroglyphs until the language is decoded, then morphs into the visitor's tongue. */
function T({ k, ctx }: { k: Key; ctx: { L: Lang; decoded: boolean } }) {
  const text = tr(k, ctx.L);
  if (ctx.decoded) return <span className="tx-real">{text}</span>;
  return <span className="glyph-text" aria-label="untranslated">{toGlyphs(tr(k, "en"))}</span>;
}

function LivingCity({ discoveries, onTemple, focus, still }: { discoveries: Knowledge[]; onTemple?: () => void; focus?: Knowledge | null; still?: boolean }) {
  return (
    <div className="living-city">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <CityScene3D discoveries={discoveries} onTemple={onTemple} focus={focus} still={still} />
        </Suspense>
      </ClientOnly>
    </div>
  );
}

function Locked({ ctx, onScan }: { ctx: { L: Lang; decoded: boolean }; onScan: () => void }) {
  return (
    <main className="opening-screen">
      <div className="translation-alert" role="status"><span className="pulse-dot" />TRANSLATION NEEDED · <span dir="rtl">الترجمة مطلوبة</span></div>
      <div className="opening-mark"><span>𓂀 GEM</span><small className="glyph-text">{toGlyphs("Bring Egypt back")}</small></div>
      <div className="opening-city" aria-hidden="true"><LivingCity discoveries={[]} /></div>
      <div className="opening-copy">
        <p className="eyebrow glyph-text">{toGlyphs("A civilization is waiting")}</p>
        <h1 className="glyph-text glyph-title"><T k="lockedTitle" ctx={ctx} /></h1>
        <p className="glyph-text"><T k="lockedBody" ctx={ctx} /></p>
        <Button variant="discovery" size="museum" className="w-full" onClick={onScan}><ScanLine /> SCAN</Button>
      </div>
    </main>
  );
}

function Rosetta({ onPick, picked }: { onPick: (l: Lang) => void; picked: Lang | null }) {
  return (
    <main className={cn("artifact-screen rosetta-screen", picked && "is-decoding")}>
      <div className="artifact-aura"><span /><span /><span /></div>
      <div className="rosetta-stone" aria-hidden="true">
        <i className="glyph-text">{toGlyphs("ptolemy decree memphis priests")}</i>
        <i className="demotic">ⲡⲧⲟⲗⲉⲙⲁⲓⲟⲥ ⲁⲓⲱⲛⲟⲃⲓⲟⲥ</i>
        <i className="greek">ΠΤΟΛΕΜΑΙΟΣ ΑΙΩΝΟΒΙΟΣ</i>
      </div>
      <p className="eyebrow">{picked ? tr("decoded", picked) : "𓂀 ⲗⲟⲅⲟⲥ · ΛΟΓΟΣ"}</p>
      <h1>{picked ? tr("rosetta", picked) : <span className="glyph-text">{toGlyphs("Rosetta Stone")}</span>}</h1>
      {picked ? <p className="artifact-detail">{tr("rosettaDetail", picked)}</p> : (
        <div className="lang-grid">
          {LANGS.map((l) => <button key={l.id} className="lang-option" onClick={() => onPick(l.id)}>{l.native}</button>)}
        </div>
      )}
    </main>
  );
}

function AgePick({ ctx, onPick }: { ctx: { L: Lang; decoded: boolean }; onPick: (a: Age) => void }) {
  const ages: Age[] = ["child", "teen", "adult"];
  return (
    <main className="focus-screen age-screen">
      <div className="need-copy"><p className="eyebrow">{tr("decoded", ctx.L)}</p><h1>{tr("chooseAge", ctx.L)}</h1></div>
      <div className="lang-grid">{ages.map((a) => <button key={a} className="lang-option" onClick={() => onPick(a)}>{tr(a, ctx.L)}</button>)}</div>
    </main>
  );
}

function ScanScreen({ ctx, scanning, onBack, onScan }: { ctx: { L: Lang; decoded: boolean }; scanning: boolean; onBack: () => void; onScan: () => void }) {
  return (
    <main className="focus-screen scan-screen">
      <header className="top-bar"><button onClick={onBack} aria-label="Back"><ArrowLeft /></button><strong><T k="discovery" ctx={ctx} /></strong><span /></header>
      <div className={cn("scanner", scanning && "is-scanning")}>
        <div className="scanner-corners" /><ScanLine />
        <span><T k={scanning ? "reading" : "frame"} ctx={ctx} /></span>
      </div>
      <div className="focus-footer">
        <p><T k="museumHolds" ctx={ctx} /></p>
        <Button variant="discovery" size="museum" className="w-full" disabled={scanning} onClick={onScan}>
          {ctx.decoded ? tr("simulate", ctx.L) : "SCAN"}
        </Button>
      </div>
    </main>
  );
}

function ArtifactReveal({ ctx, k, restored, onRestore, onChanged }: { ctx: { L: Lang }; k: Knowledge; restored: boolean; onRestore: () => void; onChanged: () => void }) {
  const Icon = icons[k];
  const { L } = ctx;
  return (
    <main className="artifact-screen">
      <div className="artifact-aura"><span /><span /><span /></div>
      <div className="artifact-object"><Icon /></div>
      <p className="eyebrow">{tr("found", L)}</p>
      <h1>{artifactText[k].name[L]}</h1>
      <div className="knowledge-lockup"><Icon /><span><small>{tr("knowledge", L)}</small><strong>{knowledgeName[k][L]}</strong></span></div>
      <p className="artifact-detail">{artifactText[k].detail[L]}</p>
      {!restored ? (
        <Button variant="discovery" size="museum" className="w-full" onClick={onRestore}><Sparkles /> {tr("restore", L)} {knowledgeName[k][L]}</Button>
      ) : (
        <div className="restored-action"><div><Check /> {knowledgeName[k][L]} ✓</div><Button variant="discovery" size="museum" className="w-full" onClick={onChanged}>{tr("seeChange", L)} <ChevronRight /></Button></div>
      )}
    </main>
  );
}

function ReactionBanner({ L, k }: { L: Lang; k: Knowledge }) {
  return (
    <div className="reaction-banner">
      <Sparkles /><small>{tr("inAction", L)}</small><strong>{knowledgeName[k][L]}</strong>
      <p>{artifactText[k].reaction[L]}</p>
    </div>
  );
}

function NeedScreen({ ctx, need, age, onBack, onDiscover }: { ctx: { L: Lang }; need: Knowledge | null; age: Age; onBack: () => void; onDiscover: () => void }) {
  const { L } = ctx;
  const riddle = useServerFn(getRiddle);
  const [problem, setProblem] = useState<string | null>(null);
  const [hints, setHints] = useState<string[]>([]);
  const langName = LANGS.find((l) => l.id === L)?.ai ?? "English";

  useEffect(() => {
    if (!need) return;
    const key = `gem-riddle-easy-v3-${need}-${L}-${age}`;
    const cached = sessionStorage.getItem(key);
    if (cached) { setProblem(cached); return; }
    let alive = true;
    riddle({ data: { knowledge: need, language: langName, age, mode: "problem", hintLevel: 0 } })
      .then((r) => { if (alive) { setProblem(r.text); sessionStorage.setItem(key, r.text); } })
      .catch(() => { if (alive) setProblem(fallbackProblem[need][L]); });
    return () => { alive = false; };
  }, [need, L, age]);

  if (!need) return <MemoryRedirect onBack={onBack} />;
  const level = nextHintLevel(hints.length);
  const askHint = () => {
    if (!level) return;
    // Show the concrete clue immediately. AI can tailor it without blocking play.
    const index = level - 1;
    const clue = fallbackHints[need][L][index];
    setHints((h) => [...h, clue]);
    if (level === 3) return; // The final clue always names the exact scanned artifact.
    void riddle({ data: { knowledge: need, language: langName, age, mode: "hint", hintLevel: level } })
      .then((r) => setHints((h) => h.map((text, i) => i === index ? r.text : text)))
      .catch(() => { /* the immediately available clue stays visible */ });
  };

  return (
    <main className="focus-screen need-screen">
      <header className="top-bar"><Button variant="ghost" size="icon" onClick={onBack} aria-label="Back"><ArrowLeft /></Button><strong>{tr("problem", L)}</strong><span /></header>
      <div className="need-visual"><span className="need-mystery">?</span></div>
      <div className="need-copy">
        <p className="eyebrow">{tr("peopleSay", L)}</p>
        <p className="problem-text">{problem ?? fallbackProblem[need][L]}</p>
        <p className="problem-q">{tr("whatSolves", L)}</p>
      </div>
      <div className="hint-levels" aria-label={tr("hint", L)}>
        {(["hintUse", "hintLook", "hintAnswer"] as const).map((key, i) => <span key={key} className={hints.length > i ? "is-revealed" : ""}><b>{i + 1}</b><small>{tr(key, L)}</small></span>)}
      </div>
      <div className="hint-list" aria-live="polite">
        {hints.map((h, i) => <div key={i} className="hint-card"><Lightbulb /><span><small>{tr("hintN", L)} {i + 1} · {tr((["hintUse", "hintLook", "hintAnswer"] as const)[i], L)}</small>{h}</span></div>)}
      </div>
      {level && (
        <Button variant="outline" className="hint-button" onClick={askHint}><Lightbulb /> {tr(hints.length ? "nextHint" : "hint", L)} · {level}/3</Button>
      )}
      <Button variant="discovery" size="museum" className="w-full" onClick={onDiscover}><ScanLine /> {tr("startDiscovery", L)}</Button>
    </main>
  );
}

function MemoryRedirect({ onBack }: { onBack: () => void }) {
  useEffect(() => { onBack(); }, [onBack]);
  return null;
}

function MemoryScreen({ ctx, discoveries, onBack, onReset }: { ctx: { L: Lang }; discoveries: Knowledge[]; onBack: () => void; onReset: () => void }) {
  const { L } = ctx;
  const progress = Math.round((discoveries.length / ORDER.length) * 100);
  const identity = discoveries.includes("Writing") && discoveries.includes("Architecture") ? "The Builders’ Kingdom" : discoveries.length ? "The River Civilization" : "A Kingdom Forgotten";
  return (
    <main className="focus-screen memory-screen">
      <header className="top-bar"><button onClick={onBack} aria-label="Back"><ArrowLeft /></button><strong>{tr("myEgypt", L)}</strong><span /></header>
      <div className="memory-preview"><LivingCity discoveries={discoveries} still /></div>
      <div className="memory-progress"><strong>{progress}%</strong><span>{tr("knowledgeRestored", L)}</span><div><i style={{ width: `${progress}%` }} /></div></div>
      <div className="memory-metrics">
        <span><strong>{discoveries.length}</strong><small>{tr("artifacts", L)}</small></span>
        <span><strong>{discoveries.length}</strong><small>{tr("areas", L)}</small></span>
        <span><strong>{Math.floor(discoveries.length / 2)}</strong><small>{tr("structures", L)}</small></span>
      </div>
      <div className="identity"><small>{tr("identity", L)}</small><h1>{identity}</h1><p>{tr("shaped", L)}</p></div>
      <button className="reset-link" onClick={onReset}>{tr("restart", L)}</button>
    </main>
  );
}

function TempleSheet({ L, discoveries, onClose, onDiscover }: { L: Lang; discoveries: Knowledge[]; onClose: () => void; onDiscover: () => void }) {
  const req: Knowledge[] = ["Religion", "Architecture", "Writing"];
  const complete = req.every((r) => discoveries.includes(r));
  return (
    <div className="sheet-backdrop" onClick={onClose} role="presentation">
      <section className="temple-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" /><Landmark /><h2>{complete ? tr("templeDone", L) : tr("temple", L)}</h2>
        <div className="requirements">{req.map((r) => <span key={r} className={discoveries.includes(r) ? "is-known" : ""}>{discoveries.includes(r) ? <Check /> : <CircleDot />} {discoveries.includes(r) ? knowledgeName[r][L] : "?"}</span>)}</div>
        {!complete && <Button variant="discovery" size="museum" className="w-full" onClick={onDiscover}>{tr("findNeed", L)} <ChevronRight /></Button>}
      </section>
    </div>
  );
}
