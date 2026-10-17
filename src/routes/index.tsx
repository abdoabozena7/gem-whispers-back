import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft, Building2, Check, ChevronRight, CircleDot, Crown, HeartPulse, Landmark, Lightbulb,
  ScanLine, ScrollText, Shield, Ship, Sparkles, Wheat, MapPin, X, type LucideIcon,
} from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { JourneyMenu } from "@/components/JourneyMenu";
import { RewardChapters } from "@/components/RewardChapters";
import { getRiddle } from "@/lib/ai/riddle.functions";
import {
  artifactAlt, artifactText, artifactDetailForAge, hintsForAge, identityForAge, problemForAge, reactionForAge, knowledgeName, LANGS, toGlyphs, tr, civilizationLevel, civilizationStage, storyVoice, chapterAtLevel,
  type Age, type Key, type Knowledge, type Lang,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { nextHintLevel } from "@/lib/hint-levels";
import { museumLocation } from "@/lib/museum-locations";
import { playDecode, playReact, playRestore, playScan, playTemple } from "@/lib/sounds";

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

type Saved = { discoveries: Knowledge[]; lang: Lang | null; age: Age | null; clues?: Partial<Record<Knowledge, number>> };

function GemExperience() {
  const [view, setView] = useState<View>("locked");
  const [discoveries, setDiscoveries] = useState<Knowledge[]>([]);
  const [lang, setLang] = useState<Lang | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [current, setCurrent] = useState<Knowledge>("Agriculture");
  const [scanCount, setScanCount] = useState(0);
  const [currentAlt, setCurrentAlt] = useState(false);
  const [reaction, setReaction] = useState<Knowledge | null>(null);
  const [templeOpen, setTempleOpen] = useState(false);
  const [clues, setClues] = useState<Partial<Record<Knowledge, number>>>({});
  const templeFanfared = useRef(false);

  // Resume a saved journey (client only, after hydration).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        setDiscoveries(s.discoveries ?? []);
        setLang(s.lang);
        setAge(s.age);
        setClues(s.clues ?? {});
        if (s.lang && s.age) { setView("city"); setWelcome(true); }
        else if (s.lang) setView("age");
      }
    } catch { /* ignore corrupt save */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE, JSON.stringify({ discoveries, lang, age, clues } satisfies Saved)); } catch { /* journey still works if storage is unavailable */ }
  }, [loaded, discoveries, lang, age, clues]);

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

  // Golden fanfare the one time the temple completes (Religion + Architecture + Writing).
  useEffect(() => {
    if (templeFanfared.current) return;
    if (discoveries.includes("Writing") && discoveries.includes("Religion") && discoveries.includes("Architecture")) {
      templeFanfared.current = true;
      playTemple();
    }
  }, [discoveries]);

  const L: Lang = lang ?? "en";
  const decoded = lang !== null;
  const need = ORDER.find((k) => !discoveries.includes(k)) ?? null;
  const scanTarget = need ?? ORDER[scanCount % ORDER.length] ?? "Agriculture";
  const scanAlt = !need && Math.floor(scanCount / ORDER.length) % 2 === 1;
  const progress = Math.round((discoveries.length / ORDER.length) * 100);
  const ctx = { L, decoded, age: age ?? "adult" };

  const reset = () => {
    try { localStorage.removeItem(STORAGE); } catch { /* resetting still works without storage */ }
    setDiscoveries([]); setClues({}); setLang(null); setAge(null); setReaction(null); setWelcome(false); setTempleOpen(false); setScanning(false); setScanCount(0); templeFanfared.current = false; setView("locked");
  };

  let body;
  if (view === "locked") {
    body = <Locked ctx={ctx} onScan={() => setView("rosettaScan")} />;
  } else if (view === "rosettaScan") {
    body = (
      <ScanScreen ctx={ctx} rosetta scanning={scanning} onBack={() => setView("locked")} onScan={() => {
        playScan();
        setScanning(true);
        window.setTimeout(() => { setScanning(false); setView("rosetta"); }, 1400);
      }} />
    );
  } else if (view === "rosetta") {
    body = <Rosetta onPick={(l) => { playDecode(); setLang(l); window.setTimeout(() => setView("age"), 1600); }} picked={lang} />;
  } else if (view === "age") {
    body = <AgePick ctx={ctx} onPick={(a) => { setAge(a); setView("city"); }} />;
  } else if (view === "scan") {
    body = (
      <ScanScreen ctx={ctx} target={scanTarget} alt={scanAlt} scanning={scanning} onBack={() => setView("city")} onScan={() => {
        playScan();
        setScanCount((c) => c + 1);
        setCurrent(scanTarget);
        setCurrentAlt(scanAlt);
        setScanning(true);
        window.setTimeout(() => { setScanning(false); setView("artifact"); }, 1200);
      }} />
    );
  } else if (view === "artifact") {
    body = (
      <ArtifactReveal ctx={ctx} k={current} alt={currentAlt} restored={discoveries.includes(current)}
        onRestore={() => { playRestore(); setDiscoveries((d) => (d.includes(current) ? d : [...d, current])); }}
        onChanged={() => { playReact(); setReaction(current); setView("city"); }} />
    );
  } else if (view === "need") {
    body = <NeedScreen ctx={ctx} need={need} age={age ?? "adult"} revealed={need ? clues[need] ?? 0 : 0} onReveal={(count) => { if (need) setClues((c) => ({ ...c, [need]: count })); }} onBack={() => setView("city")} onDiscover={() => setView("scan")} />;
  } else if (view === "memory") {
    body = <MemoryScreen ctx={ctx} discoveries={discoveries} onBack={() => setView("city")} onReset={reset} />;
  } else {
    body = (
      <main className="app-shell">
        <header className="city-header">
          <div className="city-header__title"><span>𓂀 GEM · {tr("yourCiv", L, ctx.age)}</span><strong>{tr("living", L, ctx.age)}</strong></div>
          <Button variant="ghost" className="level-emblem" onClick={() => setView("memory")} aria-label={tr("myEgypt", L, ctx.age)}><Crown /><span><small>{tr("level", L)}</small><b>{civilizationLevel(discoveries.length)}</b></span></Button>
          <div className="journey-hud"><span>{civilizationStage(discoveries.length, L)}</span><strong>{progress}%</strong><progress value={discoveries.length} max={8} aria-label={tr("knowledgeRestored", L, ctx.age)} /></div>
        </header>
        <div className="city-stage-wrap">
          <LivingCity discoveries={discoveries} focus={reaction} onTemple={() => setTempleOpen(true)} />
           {reaction && <><div className="restoration-flash" aria-hidden="true" /><ReactionBanner L={L} age={ctx.age} k={reaction} count={discoveries.length} onReward={() => setView("memory")} /></>}
          {welcome && !reaction && <div className="welcome-toast">{tr("welcomeBack", L, ctx.age)}</div>}
        </div>
        <section className="city-actions">
          {need && (
            <Button variant="ghost" className="need-strip" onClick={() => setView("need")}>
              <span><small>{tr("chapter", L)} {discoveries.length + 1}/8 · {storyVoice(need, L)}</small><strong className="need-teaser">{problemForAge(need, L, ctx.age).split(/[.!?؟]/)[0]}…</strong></span><ChevronRight />
            </Button>
          )}
          {!need && <p className="journey-complete"><Sparkles />{tr("allRestored", L)}</p>}
          <Button variant="discovery" size="museum" className="w-full" onClick={() => setView("scan")}><ScanLine /> {tr("discover", L, ctx.age)}</Button>
        </section>
        <nav className="compact-nav" aria-label="Main navigation">
          <Button variant="ghost" className="compact-nav__item is-active" aria-label={tr("living", L, ctx.age)}><CircleDot /><small>{tr("living", L, ctx.age)}</small></Button>
          <Button variant="ghost" className="compact-nav__item" onClick={() => setView(need ? "need" : "memory")} aria-label={tr("problem", L, ctx.age)}><Lightbulb /><small>{tr("hintN", L)}</small></Button>
          <Button variant="ghost" className="compact-nav__item" onClick={() => setView("memory")} aria-label={tr("myEgypt", L, ctx.age)}><Crown /><small>{tr("myEgypt", L, ctx.age)}</small></Button>
        </nav>
        {templeOpen && <TempleSheet L={L} age={ctx.age} discoveries={discoveries} onClose={() => setTempleOpen(false)} onDiscover={() => { setTempleOpen(false); setView("need"); }} />}
      </main>
    );
  }

  return <div dir={L === "ar" ? "rtl" : "ltr"} lang={L} className="gem-root" data-decoded={decoded}><div key={view} className="screen-transition">{body}</div></div>;
}

/** Text that reads as hieroglyphs until the language is decoded, then morphs into the visitor's tongue. */
function T({ k, ctx }: { k: Key; ctx: { L: Lang; decoded: boolean; age: Age } }) {
  const text = tr(k, ctx.L, ctx.age);
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

function Locked({ ctx, onScan }: { ctx: { L: Lang; decoded: boolean; age: Age }; onScan: () => void }) {
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
      {picked ? <div className="artifact-detail"><p>{tr("rosettaDetail", picked)}</p><p>{tr("rosettaElsewhere", picked)}</p></div> : (
        <div className="lang-grid">
          {LANGS.map((l) => <button key={l.id} className="lang-option" onClick={() => onPick(l.id)}>{l.native}</button>)}
        </div>
      )}
    </main>
  );
}

function AgePick({ ctx, onPick }: { ctx: { L: Lang; decoded: boolean; age: Age }; onPick: (a: Age) => void }) {
  const ages: Age[] = ["child", "teen", "adult"];
  return (
    <main className="focus-screen age-screen">
      <div className="need-copy"><p className="eyebrow">{tr("decoded", ctx.L)}</p><h1>{tr("chooseAge", ctx.L)}</h1></div>
      <div className="lang-grid">{ages.map((a) => <button key={a} className="lang-option" onClick={() => onPick(a)}>{tr(a, ctx.L)}</button>)}</div>
    </main>
  );
}

function ScanScreen({ ctx, target, alt, rosetta, scanning, onBack, onScan }: { ctx: { L: Lang; decoded: boolean; age: Age }; target?: Knowledge; alt?: boolean; rosetta?: boolean; scanning: boolean; onBack: () => void; onScan: () => void }) {
  return (
    <main className="focus-screen scan-screen">
      <header className="top-bar"><button onClick={onBack} aria-label="Back"><ArrowLeft /></button><strong><T k="discovery" ctx={ctx} /></strong><span /></header>
      <div className={cn("scanner", scanning && "is-scanning")}>
        <div className="scanner-corners" /><ScanLine />
        <span><T k={scanning ? "reading" : "frame"} ctx={ctx} /></span>
      </div>
      <div className="focus-footer">
        {target && <MuseumGuidance k={target} alt={alt ?? false} L={ctx.L} age={ctx.age} />}
        {rosetta && ctx.decoded && <p>{tr("rosettaElsewhere", ctx.L)}</p>}
        <p><T k="museumHolds" ctx={ctx} /></p>
        <Button variant="discovery" size="museum" className="w-full" disabled={scanning} onClick={onScan}>
          {ctx.decoded ? tr("simulate", ctx.L, ctx.age) : "SCAN"}
        </Button>
      </div>
    </main>
  );
}

function ArtifactReveal({ ctx, k, alt, restored, onRestore, onChanged }: { ctx: { L: Lang; age: Age }; k: Knowledge; alt: boolean; restored: boolean; onRestore: () => void; onChanged: () => void }) {
  const Icon = icons[k];
  const { L } = ctx;
  const text = alt ? artifactAlt[k] : artifactText[k];
  return (
    <main className="artifact-screen">
      <div className="artifact-aura"><span /><span /><span /></div>
      <div className="artifact-object"><Icon /></div>
      <p className="eyebrow">{tr("found", L, ctx.age)}</p>
      <h1>{text.name[L]}</h1>
      <div className="knowledge-lockup"><Icon /><span><small>{tr("knowledge", L, ctx.age)}</small><strong>{knowledgeName[k][L]}</strong></span></div>
      <p className="artifact-detail">{artifactDetailForAge(k, L, ctx.age, alt)}</p>
      {!restored ? (
        <Button variant="discovery" size="museum" className="w-full" onClick={onRestore}><Sparkles /> {tr("restore", L, ctx.age)} {knowledgeName[k][L]}</Button>
      ) : (
        <div className="restored-action"><div><Check /> {knowledgeName[k][L]} ✓</div><Button variant="discovery" size="museum" className="w-full" onClick={onChanged}>{tr("seeChange", L, ctx.age)} <ChevronRight /></Button></div>
      )}
    </main>
  );
}

function ReactionBanner({ L, age, k, count, onReward }: { L: Lang; age: Age; k: Knowledge; count: number; onReward: () => void }) {
  const evolved = civilizationLevel(count) > civilizationLevel(count - 1);
  const chapter = chapterAtLevel(civilizationLevel(count));
  return (
    <div className="reaction-banner" role="status">
      <Sparkles /><small>{tr(evolved ? "levelUp" : "inAction", L, age)}</small><strong>{evolved ? `${tr("level", L)} ${civilizationLevel(count)} · ${civilizationStage(count, L)}` : knowledgeName[k][L]}</strong>
      <p>{reactionForAge(k, L, age)}</p>
       {evolved && chapter && <div className="level-reward"><small>{tr("rewardUnlocked", L)}</small><strong>{chapter.title[L]}</strong><Button variant="quiet" onClick={onReward}>{tr("readReward", L)}<ChevronRight /></Button></div>}
    </div>
  );
}

function NeedScreen({ ctx, need, age, revealed, onReveal, onBack, onDiscover }: { ctx: { L: Lang; age: Age }; need: Knowledge | null; age: Age; revealed: number; onReveal: (count: number) => void; onBack: () => void; onDiscover: () => void }) {
  const { L } = ctx;
  const riddle = useServerFn(getRiddle);
  const [problem, setProblem] = useState<string | null>(null);
  const [hints, setHints] = useState<string[]>(() => need ? hintsForAge(need, L, age).slice(0, Math.min(3, Math.max(0, revealed))) : []);
  const [locationOpen, setLocationOpen] = useState(false);
  const aliveRef = useRef(true);
  useEffect(() => { aliveRef.current = true; return () => { aliveRef.current = false; }; }, []);
  const langName = LANGS.find((l) => l.id === L)?.ai ?? "English";

  useEffect(() => {
    if (!need) return;
    if (age === "child") { setProblem(problemForAge(need, L, age)); return; }
    const key = `gem-riddle-cinema-v5-${need}-${L}-${age}`;
    const cached = sessionStorage.getItem(key);
    if (cached) { setProblem(cached); return; }
    let alive = true;
    riddle({ data: { knowledge: need, language: langName, age, mode: "problem", hintLevel: 0 } })
      .then((r) => { if (alive) { setProblem(r.text); sessionStorage.setItem(key, r.text); } })
      .catch(() => { if (alive) setProblem(problemForAge(need, L, ctx.age)); });
    return () => { alive = false; };
  }, [need, L, age]);

  if (!need) return <MemoryRedirect onBack={onBack} />;
  const level = nextHintLevel(hints.length);
  const askHint = () => {
    if (!level) return;
    // Show the concrete clue immediately. AI can tailor it without blocking play.
    const index = level - 1;
    const clue = hintsForAge(need, L, age)[index] ?? hintsForAge(need, L, age)[2];
    setHints((h) => [...h, clue]);
    onReveal(level);
    if (level === 3 || age === "child") return; // The final clue always names the exact scanned artifact.
    void riddle({ data: { knowledge: need, language: langName, age, mode: "hint", hintLevel: level } })
      .then((r) => { if (aliveRef.current) setHints((h) => h.map((text, i) => i === index ? r.text : text)); })
      .catch(() => { /* the immediately available clue stays visible */ });
  };

  return (
    <main className="focus-screen need-screen">
      <header className="top-bar"><Button variant="ghost" size="icon" onClick={onBack} aria-label="Back"><ArrowLeft /></Button><strong>{tr("problem", L, ctx.age)}</strong><span /></header>
      <div className="story-portrait" aria-hidden="true"><span>𓂀</span><i /><i /><i /></div>
      <div className="need-copy">
        <p className="eyebrow">{storyVoice(need, L)}</p>
        <p className="problem-text">{problem ?? problemForAge(need, L, ctx.age)}</p>
        <p className="problem-q">{tr("whatSolves", L, ctx.age)}</p>
      </div>
      <div className="hint-levels" aria-label={tr("hint", L, ctx.age)}>
        {(["hintUse", "hintLook", "hintAnswer"] as const).map((key, i) => <span key={key} className={hints.length > i ? "is-revealed" : ""}><b>{i + 1}</b><small>{tr(key, L, age)}</small></span>)}
      </div>
      <div className="hint-list" aria-live="polite">
        {hints.map((h, i) => <div key={i} className="hint-card"><Lightbulb /><span><small>{tr("hintN", L, ctx.age)} {i + 1} · {tr((["hintUse", "hintLook", "hintAnswer"] as const)[i] ?? "hintAnswer", L, age)}</small>{h}</span></div>)}
      </div>
      {level && (
        <Button variant="outline" className="hint-button" onClick={askHint}><Lightbulb /> {tr(hints.length ? "nextHint" : "hint", L, age)} · {level}/3</Button>
      )}
      <Button variant="quiet" className="location-button" onClick={() => setLocationOpen((open) => !open)} aria-expanded={locationOpen}><MapPin />{tr("whereLook", L)}<ChevronRight /></Button>
      {locationOpen && <MuseumGuidance k={need} L={L} age={age} />}
      <Button variant="discovery" size="museum" className="w-full" onClick={onDiscover}><ScanLine /> {tr("startDiscovery", L, ctx.age)}</Button>
    </main>
  );
}

function MemoryRedirect({ onBack }: { onBack: () => void }) {
  useEffect(() => { onBack(); }, [onBack]);
  return null;
}

function MemoryScreen({ ctx, discoveries, onBack, onReset }: { ctx: { L: Lang; age: Age }; discoveries: Knowledge[]; onBack: () => void; onReset: () => void }) {
  const { L } = ctx;
  const progress = Math.round((discoveries.length / ORDER.length) * 100);
  const identity = identityForAge(discoveries, L, ctx.age);
  return (
    <main className="focus-screen memory-screen">
      <header className="top-bar"><Button variant="ghost" size="icon" onClick={onBack} aria-label="Back"><ArrowLeft /></Button><strong>{tr("myEgypt", L, ctx.age)}</strong><JourneyMenu count={new Set(discoveries).size} L={L} age={ctx.age} onRestart={onReset} /></header>
      <div className="memory-preview"><LivingCity discoveries={discoveries} still /></div>
      <div className="memory-progress"><strong>{progress}%</strong><span>{tr("knowledgeRestored", L, ctx.age)}</span><div><i style={{ width: `${progress}%` }} /></div></div>
      <div className="memory-level"><Crown /><strong>{tr("level", L)} {civilizationLevel(discoveries.length)}</strong><span>{civilizationStage(discoveries.length, L)}</span></div>
      <RewardChapters discoveries={discoveries} L={L} age={ctx.age} />
      <ol className="discovery-trail" aria-label={tr("journey", L)}>{ORDER.map((k, i) => { const Icon = icons[k]; const found = discoveries.includes(k); const next = ORDER.find((entry) => !discoveries.includes(entry)) === k; return <li key={k} className={cn(found && "is-found", next && "is-next")}><span>{found ? <Check /> : <Icon />}</span><div><small>{tr("chapter", L)} {i + 1}</small><strong>{found ? artifactText[k].name[L] : next ? tr("nextDiscovery", L) : toGlyphs(k)}</strong></div></li>; })}</ol>
      <div className="memory-metrics">
        <span><strong>{discoveries.length}</strong><small>{tr("artifacts", L, ctx.age)}</small></span>
        <span><strong>{discoveries.length}</strong><small>{tr("areas", L, ctx.age)}</small></span>
        <span><strong>{Math.floor(discoveries.length / 2)}</strong><small>{tr("structures", L, ctx.age)}</small></span>
      </div>
      <div className="identity"><small>{tr("identity", L, ctx.age)}</small><h1>{identity}</h1><p>{tr("shaped", L, ctx.age)}</p></div>
    </main>
  );
}

function MuseumGuidance({ k, alt, L, age }: { k: Knowledge; alt?: boolean; L: Lang; age: Age }) {
  const location = museumLocation(k, alt ?? false);
  return <section className="museum-guidance" aria-label={tr("museumHelp", L)}><small><MapPin />{tr(location ? "verifiedLocation" : "museumHelp", L)}</small><h2>{(alt ? artifactAlt[k] : artifactText[k]).name[L]}</h2>
    {location ? <><strong>{tr(location.area, L)} · {location.accession}</strong><p>{tr("locationScope", L, age)}</p><Button asChild variant="link" className="museum-source"><a href={location.source} target="_blank" rel="noopener noreferrer">{tr("museumSource", L)}<ChevronRight /></a></Button></> : <><p>{tr(age === "child" ? "childLocation" : "locationUnverified", L)}</p><blockquote>{tr("guideQuestion", L)}</blockquote></>}
  </section>;
}

function TempleSheet({ L, age, discoveries, onClose, onDiscover }: { L: Lang; age: Age; discoveries: Knowledge[]; onClose: () => void; onDiscover: () => void }) {
  const req: Knowledge[] = ["Religion", "Architecture", "Writing"];
  const complete = req.every((r) => discoveries.includes(r));
  return (
    <div className="sheet-backdrop" onClick={onClose} role="presentation">
      <section className="temple-sheet" onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" className="sheet-close" onClick={onClose} aria-label={tr("close", L)}><X /></Button>
        <div className="sheet-handle" /><Landmark /><h2>{complete ? tr("templeDone", L, age) : tr("temple", L, age)}</h2>
        <div className="requirements">{req.map((r) => <span key={r} className={discoveries.includes(r) ? "is-known" : ""}>{discoveries.includes(r) ? <Check /> : <CircleDot />} {discoveries.includes(r) ? knowledgeName[r][L] : "?"}</span>)}</div>
        {!complete && <Button variant="discovery" size="museum" className="w-full" onClick={onDiscover}>{tr("findNeed", L, age)} <ChevronRight /></Button>}
      </section>
    </div>
  );
}
