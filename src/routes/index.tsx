import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronRight,
  CircleDot,
  Crown,
  HeartPulse,
  Landmark,
  ScanLine,
  ScrollText,
  Shield,
  Ship,
  Sparkles,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GEM: Bring Egypt Back to Life" },
      { name: "description", content: "Discover real artifacts. Restore lost knowledge. Watch Ancient Egypt live again." },
      { property: "og:title", content: "GEM: Bring Egypt Back to Life" },
      { property: "og:description", content: "The museum holds the knowledge your civilization needs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GemExperience,
});

type Knowledge = "Agriculture" | "Religion" | "Architecture" | "Writing" | "Trade" | "Medicine" | "Government" | "Military";
type View = "opening" | "city" | "scan" | "artifact" | "need" | "memory";

type Artifact = {
  name: string;
  knowledge: Knowledge;
  detail: string;
  icon: LucideIcon;
};

const firstArtifact: Artifact = { name: "Ancient Irrigation Tool", knowledge: "Agriculture", detail: "Egyptians controlled water and made the land grow.", icon: Wheat };

const artifacts: Artifact[] = [
  firstArtifact,
  { name: "Temple Relief", knowledge: "Religion", detail: "Belief gave purpose to places, rituals and communities.", icon: Landmark },
  { name: "Stone Column Fragment", knowledge: "Architecture", detail: "Stone became structures built to outlast generations.", icon: Building2 },
  { name: "Papyrus Fragment", knowledge: "Writing", detail: "Knowledge could be recorded, shared and preserved.", icon: ScrollText },
  { name: "Trading Vessel", knowledge: "Trade", detail: "Goods and ideas moved between communities.", icon: Ship },
  { name: "Medical Papyrus", knowledge: "Medicine", detail: "Healing knowledge could protect a growing population.", icon: HeartPulse },
  { name: "Royal Seal", knowledge: "Government", detail: "Authority organized people, work and shared decisions.", icon: Crown },
  { name: "Ancient Weapon", knowledge: "Military", detail: "Defenses protected settlements and their knowledge.", icon: Shield },
];

const knowledgeIcons: Record<Knowledge, LucideIcon> = {
  Agriculture: Wheat,
  Religion: Landmark,
  Architecture: Building2,
  Writing: ScrollText,
  Trade: Ship,
  Medicine: HeartPulse,
  Government: Crown,
  Military: Shield,
};

function GemExperience() {
  const [view, setView] = useState<View>("opening");
  const [discoveries, setDiscoveries] = useState<Knowledge[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const [reaction, setReaction] = useState<Knowledge | null>(null);
  const [templeOpen, setTempleOpen] = useState(false);
  const artifact = artifacts[scanIndex] ?? firstArtifact;
  const progress = Math.round((discoveries.length / artifacts.length) * 100);

  useEffect(() => {
    if (!reaction) return;
    const timer = window.setTimeout(() => setReaction(null), 3600);
    return () => window.clearTimeout(timer);
  }, [reaction]);

  if (view === "opening") return <Opening onBegin={() => setView("city")} />;

  if (view === "scan") {
    return (
      <ScanScreen
        scanning={scanning}
        onBack={() => setView("city")}
        onScan={() => {
          setScanIndex(discoveries.length % artifacts.length);
          setScanning(true);
          window.setTimeout(() => {
            setScanning(false);
            setView("artifact");
          }, 1200);
        }}
      />
    );
  }

  if (view === "artifact") {
    return (
      <ArtifactReveal
        artifact={artifact}
        restored={discoveries.includes(artifact.knowledge)}
        onRestore={() => {
          if (!discoveries.includes(artifact.knowledge)) setDiscoveries((current) => [...current, artifact.knowledge]);
        }}
        onChanged={() => {
          setReaction(artifact.knowledge);
          setView("city");
        }}
      />
    );
  }

  if (view === "need") return <NeedScreen discoveries={discoveries} onBack={() => setView("city")} onDiscover={() => setView("scan")} />;
  if (view === "memory") return <MemoryScreen discoveries={discoveries} onBack={() => setView("city")} />;

  return (
    <main className="app-shell">
      <CityHeader progress={progress} onMemory={() => setView("memory")} />
      <div className="city-stage-wrap">
        <LivingCity discoveries={discoveries} onTemple={() => setTempleOpen(true)} />
        {reaction && <ReactionBanner knowledge={reaction} />}
      </div>
      <CityActions discoveries={discoveries} onNeed={() => setView("need")} onDiscover={() => setView("scan")} />
      <nav className="compact-nav" aria-label="Main navigation">
        <button className="compact-nav__item is-active" aria-label="Living Egypt"><CircleDot /></button>
        <button className="compact-nav__item" onClick={() => setView("need")} aria-label="Current Need"><Sparkles /></button>
        <button className="compact-nav__item" onClick={() => setView("memory")} aria-label="My Egypt"><Crown /></button>
      </nav>
      {templeOpen && <TempleSheet discoveries={discoveries} onClose={() => setTempleOpen(false)} onDiscover={() => { setTempleOpen(false); setView("scan"); }} />}
    </main>
  );
}

function Opening({ onBegin }: { onBegin: () => void }) {
  return (
    <main className="opening-screen">
      <div className="opening-mark"><span>GEM</span><small>BRING EGYPT BACK TO LIFE</small></div>
      <div className="opening-city" aria-hidden="true"><LivingCity discoveries={[]} /></div>
      <div className="opening-copy">
        <p className="eyebrow">A civilization is waiting</p>
        <h1>Egypt has forgotten<br />how to live.</h1>
        <p>Explore the museum.<br />Restore its knowledge.<br />Bring the civilization back to life.</p>
        <Button variant="discovery" size="museum" className="w-full" onClick={onBegin}>BEGIN <ChevronRight /></Button>
      </div>
    </main>
  );
}

function CityHeader({ progress, onMemory }: { progress: number; onMemory: () => void }) {
  return (
    <header className="city-header">
      <div className="city-header__title"><span>YOUR CIVILIZATION</span><strong>Living Egypt</strong></div>
      <button className="progress-medallion" onClick={onMemory} aria-label={`${progress}% knowledge restored`}>
        <span>{progress}%</span><small>RESTORED</small>
      </button>
    </header>
  );
}

function LivingCity({ discoveries, onTemple }: { discoveries: Knowledge[]; onTemple?: () => void }) {
  const has = (item: Knowledge) => discoveries.includes(item);
  const templePhase = has("Writing") ? "complete" : has("Architecture") ? "building" : has("Religion") ? "promise" : "hidden";
  return (
    <div className="living-city" data-farms={has("Agriculture")} data-temple={templePhase} data-trade={has("Trade")}>
      <div className="sun-disc" />
      <div className="desert-ridge ridge-one" /><div className="desert-ridge ridge-two" />
      <div className="nile"><div className="nile-current" /><div className="boat"><span /></div></div>
      <div className="island">
        <div className="path path-one" /><div className="path path-two" />
        <div className="house house-one"><i /></div><div className="house house-two"><i /></div><div className="house house-three"><i /></div>
        <div className="palm palm-one"><i /><b /></div><div className="palm palm-two"><i /><b /></div>
        <div className="citizen citizen-one" /><div className="citizen citizen-two" />
        <div className="fields"><span /><span /><span /><span /></div>
        <div className="canal" /><div className="farmer farmer-one" /><div className="farmer farmer-two" />
        <button className="temple" onClick={onTemple} aria-label="View temple knowledge">
          <span className="temple-roof" /><span className="temple-columns"><i /><i /><i /><i /></span><b className="temple-glow" />
        </button>
        <div className="future-structure future-one" /><div className="future-structure future-two" />
        <div className="scribes"><i /><i /></div>
        <div className="market"><i /><i /><i /></div>
      </div>
      <div className="sand-haze" />
    </div>
  );
}

function CityActions({ discoveries, onNeed, onDiscover }: { discoveries: Knowledge[]; onNeed: () => void; onDiscover: () => void }) {
  const fourth = discoveries.includes("Writing");
  const need = fourth ? "Government" : discoveries.includes("Agriculture") ? "Trade" : "Agriculture";
  const line = fourth ? "The settlement is growing, but no one knows how to organize it." : discoveries.includes("Agriculture") ? "Your people can grow food, but they cannot trade it yet." : "Your people remember the river, but not how to make the land grow.";
  return (
    <section className="city-actions">
      <button className="need-strip" onClick={onNeed}>
        <span><small>CURRENT NEED</small><strong>{need} knowledge</strong></span><ChevronRight />
      </button>
      <p>{line}</p>
      <Button variant="discovery" size="museum" className="w-full" onClick={onDiscover}><ScanLine /> DISCOVER</Button>
    </section>
  );
}

function ScanScreen({ scanning, onBack, onScan }: { scanning: boolean; onBack: () => void; onScan: () => void }) {
  return (
    <main className="focus-screen scan-screen">
      <TopBar label="DISCOVERY" onBack={onBack} />
      <div className={cn("scanner", scanning && "is-scanning")}>
        <div className="scanner-corners" /><ScanLine /><span>{scanning ? "READING ARTIFACT" : "FRAME AN ARTIFACT"}</span><small>{scanning ? "Knowledge is returning…" : "Prototype scan"}</small>
      </div>
      <div className="focus-footer">
        <p>The museum holds what your civilization has forgotten.</p>
        <Button variant="discovery" size="museum" className="w-full" disabled={scanning} onClick={onScan}>{scanning ? "DISCOVERING…" : "SIMULATE ARTIFACT SCAN"}</Button>
      </div>
    </main>
  );
}

function ArtifactReveal({ artifact, restored, onRestore, onChanged }: { artifact: Artifact; restored: boolean; onRestore: () => void; onChanged: () => void }) {
  const Icon = artifact.icon;
  return (
    <main className="artifact-screen">
      <div className="artifact-aura"><span /><span /><span /></div>
      <div className="artifact-object"><Icon /></div>
      <p className="eyebrow">ARTIFACT DISCOVERED</p>
      <h1>{artifact.name}</h1>
      <div className="knowledge-lockup"><Icon /><span><small>KNOWLEDGE</small><strong>{artifact.knowledge}</strong></span></div>
      <p className="artifact-detail">{artifact.detail}</p>
      {!restored ? (
        <Button variant="discovery" size="museum" className="w-full" onClick={onRestore}><Sparkles /> RESTORE {artifact.knowledge.toUpperCase()}</Button>
      ) : (
        <div className="restored-action"><div><Check /> {artifact.knowledge.toUpperCase()} RESTORED</div><Button variant="discovery" size="museum" className="w-full" onClick={onChanged}>SEE WHAT CHANGED <ChevronRight /></Button></div>
      )}
    </main>
  );
}

function ReactionBanner({ knowledge }: { knowledge: Knowledge }) {
  const content: Record<Knowledge, [string, string]> = {
    Agriculture: ["THE LAND REMEMBERS", "Fields grow. Water flows. Your civilization can now feed itself."],
    Religion: ["BELIEF RETURNS", "A temple appears in the sand — waiting for the knowledge to build it."],
    Architecture: ["STONE BEGINS TO RISE", "The temple stands unfinished. Its knowledge cannot survive without writing."],
    Writing: ["TEMPLE RESTORED", "Scribes arrive. Inscriptions form. A sacred place lives again."],
    Trade: ["THE RIVER OPENS", "Merchants gather and boats carry the harvest onward."],
    Medicine: ["HEALING RETURNS", "Knowledge begins to protect a growing population."],
    Government: ["THE CITY ORGANIZES", "A larger community can now act with purpose."],
    Military: ["THE CITY IS GUARDED", "Defenses rise around the knowledge you restored."],
  };
  return <div className="reaction-banner"><Sparkles /><small>KNOWLEDGE IN ACTION</small><strong>{content[knowledge][0]}</strong><p>{content[knowledge][1]}</p></div>;
}

function NeedScreen({ discoveries, onBack, onDiscover }: { discoveries: Knowledge[]; onBack: () => void; onDiscover: () => void }) {
  const government = discoveries.includes("Writing");
  const need: Knowledge = government ? "Government" : discoveries.includes("Agriculture") ? "Trade" : "Agriculture";
  const Icon = knowledgeIcons[need];
  return (
    <main className="focus-screen need-screen">
      <TopBar label="CURRENT NEED" onBack={onBack} />
      <div className="need-visual"><div className="need-rings" /><Icon /></div>
      <div className="need-copy"><p className="eyebrow">YOUR PEOPLE NEED</p><h1>{need}</h1><p>{government ? "The settlement is growing, but no one knows how to organize a larger city." : need === "Trade" ? "Your farms produce more food than your people can use." : "The river is near, but the land does not know how to grow."}</p></div>
      <div className="mission-line"><span>Find evidence of {need.toLowerCase()} inside the museum.</span></div>
      <Button variant="discovery" size="museum" className="w-full" onClick={onDiscover}><ScanLine /> START DISCOVERY</Button>
    </main>
  );
}

function MemoryScreen({ discoveries, onBack }: { discoveries: Knowledge[]; onBack: () => void }) {
  const progress = Math.round((discoveries.length / artifacts.length) * 100);
  const identity = discoveries.includes("Writing") && discoveries.includes("Architecture") ? "The Builders’ Kingdom" : discoveries.length ? "The River Civilization" : "A Kingdom Forgotten";
  return (
    <main className="focus-screen memory-screen">
      <TopBar label="MY EGYPT" onBack={onBack} />
      <div className="memory-preview"><LivingCity discoveries={discoveries} /></div>
      <div className="memory-progress"><strong>{progress}%</strong><span>KNOWLEDGE RESTORED</span><div><i style={{ width: `${progress}%` }} /></div></div>
      <div className="memory-metrics"><span><strong>{discoveries.length}</strong><small>Artifacts<br />Discovered</small></span><span><strong>{discoveries.length}</strong><small>Knowledge<br />Areas</small></span><span><strong>{Math.max(1, Math.floor(discoveries.length / 2))}</strong><small>Major<br />Structures</small></span></div>
      <div className="identity"><small>CIVILIZATION IDENTITY</small><h1>{identity}</h1><p>Your Egypt is being shaped by what you choose to rediscover.</p></div>
    </main>
  );
}

function TempleSheet({ discoveries, onClose, onDiscover }: { discoveries: Knowledge[]; onClose: () => void; onDiscover: () => void }) {
  const requirements: Knowledge[] = ["Religion", "Architecture", "Writing"];
  const complete = requirements.every((item) => discoveries.includes(item));
  return (
    <div className="sheet-backdrop" onClick={onClose} role="presentation">
      <section className="temple-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" /><Landmark /><small>{complete ? "MAJOR STRUCTURE" : "KNOWLEDGE DEPENDENCY"}</small><h2>{complete ? "Temple Restored" : "Temple"}</h2>
        <div className="requirements">{requirements.map((item) => <span key={item} className={discoveries.includes(item) ? "is-known" : ""}>{discoveries.includes(item) ? <Check /> : <CircleDot />} {item}</span>)}</div>
        <p>{complete ? "Belief, stone and the written word live together here." : discoveries.includes("Architecture") ? "The temple stands unfinished. Its knowledge cannot survive." : "Your people understand belief, but cannot build or preserve the temple yet."}</p>
        {!complete && <Button variant="discovery" size="museum" className="w-full" onClick={onDiscover}>FIND WHAT WE NEED <ChevronRight /></Button>}
      </section>
    </div>
  );
}

function TopBar({ label, onBack }: { label: string; onBack: () => void }) {
  return <header className="top-bar"><button onClick={onBack} aria-label="Back"><ArrowLeft /></button><strong>{label}</strong><span /></header>;
}