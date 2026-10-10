// Museum-grade Web Audio cues — synthesized, no audio files, unlocked on first user gesture.
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, gain = 0.06, type: OscillatorType = "sine") {
  const ac = audio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + start);
  g.gain.setValueAtTime(0, ac.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ac.currentTime + start + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0008, ac.currentTime + start + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + dur + 0.05);
}

/** Soft rising sweep while the scanner reads an artifact. */
export function playScan() {
  const ac = audio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1800;
  osc.type = "sine";
  osc.frequency.setValueAtTime(220, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(680, ac.currentTime + 1.1);
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.linearRampToValueAtTime(0.045, ac.currentTime + 0.2);
  g.gain.exponentialRampToValueAtTime(0.0008, ac.currentTime + 1.2);
  osc.connect(filter);
  filter.connect(g);
  g.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 1.25);
}

/** Shimmering arpeggio when the ancient language decodes. */
export function playDecode() {
  const ac = audio();
  if (!ac) return;
  const notes = [440, 554.4, 659.3, 880, 1108.7];
  notes.forEach((f, i) => tone(f, i * 0.11, 0.9, 0.05, "triangle"));
}

/** Warm two-tone bell when knowledge is restored. */
export function playRestore() {
  tone(523.25, 0, 1.4, 0.07);
  tone(784, 0.16, 1.6, 0.055);
  tone(1046.5, 0.34, 1.8, 0.03);
}

/** Gentle pulse as the civilization reacts. */
export function playReact() {
  tone(392, 0, 0.7, 0.04, "sine");
  tone(587.3, 0.12, 0.9, 0.035, "sine");
}

/** Golden three-note motif for the completed temple. */
export function playTemple() {
  [523.25, 659.3, 784, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.18, 1.8, 0.06, "sine"));
  tone(261.6, 0, 2.6, 0.05, "triangle");
}
