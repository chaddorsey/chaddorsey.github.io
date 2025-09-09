import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Lock,
  Unlock,
  Sparkles,
  History,
  RotateCcw,
  Dice6,
} from "lucide-react";

// --------------------- DATA --------------------- //
const EMERGING_TECH = [
  "Augmented / Virtual Reality",
  "Artificial Intelligence",
  "Learning Analytics and Data Science",
  "Internet of Things",
  "Multimodal Generative AI",
  "Conversational Agents",
  "Immersive Technologies",
  "Brain–Computer Interfaces",
  "Haptic Feedback",
  "Digital Twins",
  "Affective Computing",
];

const TOPICS = [
  "Food Chains and Food Webs",
  "Photosynthesis and Cellular Respiration",
  "States of Matter",
  "Velocity and Acceleration",
  "Newton’s Laws of Motion",
  "Linear Functions",
  "Probability and Statistics",
  "Fractions, Decimals, and Ratios",
  "Ecosystems and Biodiversity",
  "Chemical Reactions",
  "The Water Cycle",
  "Geometry of Shapes and Angles",
  "Graphing and Data Representation",
  "Energy Transfer (heat, light, sound)",
  "Exponents and Roots",
  "Human Body Systems",
];

const PEDAGOGY = [
  "Inquiry-Based Learning",
  "Project-Based Learning",
  "Problem-Based Learning",
  "Experiential Learning",
  "Collaborative Learning",
  "Differentiated Instruction",
  "Culturally Responsive Teaching",
  "STEM Integration (interdisciplinary)",
  "Flipped Classroom",
  "Game-Based Learning",
  "Computational Thinking",
  "Universal Design for Learning (UDL)",
];

const GRADES = [
  "Upper Elementary",
  "Middle School",
  "Lower High School",
  "Upper High School",
];

// Utility to create a short label for chips
const shortLabel = (s: string) => s.replace("(interdisciplinary)", "").replace("Universal Design for Learning (UDL)", "UDL");

// --------------------- AUDIO FX --------------------- //
function useTickSfx() {
  const ctxRef = useRef<AudioContext | null>(null);
  useEffect(() => () => { void ctxRef.current?.close(); }, []);
  const ensure = () => (ctxRef.current ||= new (window.AudioContext || (window as any).webkitAudioContext)());
  const tick = (freq = 900) => {
    try {
      const ctx = ensure();
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(t + 0.08);
    } catch {}
  };
  const ding = () => tick(660);
  return { tick, ding } as const;
}

// --------------------- REEL --------------------- //
interface ReelProps {
  label: string;
  items: string[];
  index: number;
  setIndex: (i: number) => void;
  locked: boolean;
  setLocked: (b: boolean) => void;
  spinning: boolean;
}

function Reel({ label, items, index, setIndex, locked, setLocked, spinning }: ReelProps) {
  const visible = useMemo(() => {
    const prev = (index - 1 + items.length) % items.length;
    const next = (index + 1) % items.length;
    return [items[prev], items[index], items[next]];
  }, [items, index]);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</span>
        <button
          aria-label={locked ? `Unlock ${label}` : `Lock ${label}`}
          onClick={() => setLocked(!locked)}
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs transition-all ${
            locked
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
              : "border-slate-300/60 bg-white/40 backdrop-blur dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-700/60"
          }`}
        >
          {locked ? <Lock size={14} /> : <Unlock size={14} />} {locked ? "Locked" : "Lock"}
        </button>
      </div>

      <div className="relative h-20 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
        {/* bezel gloss */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/70 to-transparent dark:from-white/10" />

        <div
          key={spinning ? `spin-${label}` : `still-${label}-${index}`}
          className="absolute inset-0"
          style={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)", transform: 'translateY(-33.33%)' }}
        >
          {visible.map((v, i) => (
            <div
              key={i}
              className={`flex items-center justify-center px-3 text-center text-sm sm:text-base font-medium ${
                i === 1 ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              <span className="line-clamp-1">{v}</span>
            </div>
          ))}
        </div>

        {/* center highlight line */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />
      </div>
      <div className="absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-br from-slate-200/60 via-white/30 to-slate-200/60 blur-xl dark:from-slate-700/50 dark:via-slate-900/30 dark:to-slate-700/50" />
    </div>
  );
}

// --------------------- MAIN --------------------- //
export default function EdTechSlotMachine() {
  const [idx0, setIdx0] = useState(0);
  const [idx1, setIdx1] = useState(0);
  const [idx2, setIdx2] = useState(0);
  const [idx3, setIdx3] = useState(0);
  const [locks, setLocks] = useState([false, false, false, false]);
  const [spinning, setSpinning] = useState([false, false, false, false]);
  const [isSpinningAll, setIsSpinningAll] = useState(false);
  const [history, setHistory] = useState<string[][]>([]);
  const { tick, ding } = useTickSfx();

  const current = useMemo(() => [EMERGING_TECH[idx0], TOPICS[idx1], PEDAGOGY[idx2], GRADES[idx3]], [idx0, idx1, idx2, idx3]);

  const setIndexByColumn = (col: number, i: number) => {
    [setIdx0, setIdx1, setIdx2, setIdx3][col](i);
  };

  const randomIndex = (len: number) => Math.floor(Math.random() * len);

  const spinColumn = async (col: number) => {
    if (locks[col]) return; // don't spin locked
    setSpinning((s) => s.map((v, i) => (i === col ? true : v)));
    const items = [EMERGING_TECH, TOPICS, PEDAGOGY, GRADES][col];
    const duration = 1200 + col * 300 + Math.random() * 600; // staggered stops
    const start = performance.now();

    return new Promise<void>((resolve) => {
      const step = () => {
        const now = performance.now();
        const elapsed = now - start;
        // speed eases out
        const interval = Math.max(60, 240 - (elapsed / duration) * 200);
        const next = (getIndex(col) + 1) % items.length;
        setIndexByColumn(col, next);
        tick(600 + 80 * col);
        if (elapsed < duration) {
          setTimeout(step, interval);
        } else {
          const final = randomIndex(items.length);
          setIndexByColumn(col, final);
          setSpinning((s) => s.map((v, i) => (i === col ? false : v)));
          resolve();
        }
      };
      setTimeout(step, 0);
    });
  };

  const getIndex = (col: number) => [idx0, idx1, idx2, idx3][col];

  const spinAll = async () => {
    if (isSpinningAll) return;
    setIsSpinningAll(true);
    const cols = [0, 1, 2, 3];
    for (const c of cols) await spinColumn(c); // sequential for satisfying cascade
    setIsSpinningAll(false);
    ding();
    setHistory((h) => [[...current], ...h].slice(0, 8));
  };

  const resetAll = () => {
    setIdx0(0); setIdx1(0); setIdx2(0); setIdx3(0);
    setLocks([false, false, false, false]);
  };

  const toggleLock = (i: number) => setLocks((L) => L.map((v, k) => (k === i ? !v : v)));

  const sentence = `Design an environment or learning experience involving ${current[0]} for learning about ${current[1]} using ${current[2]} in ${current[3]}.`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key.toLowerCase() === "enter") {
        e.preventDefault();
        spinAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSpinningAll, locks, idx0, idx1, idx2, idx3]);

  // Initial pleasing random setup
  useEffect(() => {
    setIdx0(randomIndex(EMERGING_TECH.length));
    setIdx1(randomIndex(TOPICS.length));
    setIdx2(randomIndex(PEDAGOGY.length));
    setIdx3(randomIndex(GRADES.length));
  }, []);

  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
              <Sparkles className="inline-block" /> EdTech Slot Machine
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Pull the lever to generate a fresh learning design brief.
              <span className="ml-2 hidden sm:inline">Tip: press <kbd className="px-1 py-0.5 rounded border bg-white/70 dark:bg-slate-800/70">Space</kbd> to spin.</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 bg-white/70 px-3 py-2 text-sm backdrop-blur hover:bg-white/90 dark:bg-slate-800/60 dark:hover:bg-slate-800"
            >
              <RotateCcw size={16} /> Reset
            </button>
            <button
              onClick={() => setHistory([])}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 bg-white/70 px-3 py-2 text-sm backdrop-blur hover:bg-white/90 dark:bg-slate-800/60 dark:hover:bg-slate-800"
            >
              <History size={16} /> Clear History
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-stretch">
          {/* Reels Panel */}
          <div className="relative rounded-3xl border border-slate-200/80 bg-white/70 p-4 sm:p-6 shadow-xl backdrop-blur dark:bg-slate-900/50 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Reel label="Emerging Technology" items={EMERGING_TECH} index={idx0} setIndex={setIdx0} locked={locks[0]} setLocked={() => toggleLock(0)} spinning={spinning[0]} />
              <Reel label="Topic" items={TOPICS} index={idx1} setIndex={setIdx1} locked={locks[1]} setLocked={() => toggleLock(1)} spinning={spinning[1]} />
              <Reel label="Pedagogy" items={PEDAGOGY} index={idx2} setIndex={setIdx2} locked={locks[2]} setLocked={() => toggleLock(2)} spinning={spinning[2]} />
              <Reel label="Grade Level" items={GRADES} index={idx3} setIndex={setIdx3} locked={locks[3]} setLocked={() => toggleLock(3)} spinning={spinning[3]} />
            </div>

            {/* Lever */}
            <div className="mt-6 flex items-center justify-center">
              <motion.button
                whileTap={{ y: 6 }}
                onClick={spinAll}
                disabled={isSpinningAll}
                aria-label="Pull the lever"
                className="group relative inline-flex h-24 w-24 items-end justify-center rounded-full border-2 border-slate-300 bg-gradient-to-br from-white to-slate-100 p-3 shadow-lg transition hover:shadow-xl active:shadow-md disabled:opacity-60 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700"
              >
                {/* rod */}
                <motion.div
                  animate={{ rotate: isSpinningAll ? -20 : 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 12 }}
                  className="absolute bottom-8 h-16 w-2 rounded-full bg-slate-400/70 dark:bg-slate-600"
                />
                {/* knob */}
                <motion.div
                  animate={{ y: isSpinningAll ? 8 : 0 }}
                  className="absolute -top-2 h-8 w-8 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 shadow ring-2 ring-white/70 dark:ring-slate-700"/>
                <div className="relative z-10 -mb-1 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-5 py-2 text-white font-semibold tracking-wide shadow-inner">
                  Pull
                </div>
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-emerald-200/40 to-indigo-200/40 blur-xl dark:from-emerald-700/20 dark:to-indigo-700/20" />
              </motion.button>
            </div>
          </div>

          {/* Result Panel */}
          <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/70 p-4 sm:p-6 shadow-xl backdrop-blur dark:bg-slate-900/50 dark:border-slate-700">
            <h2 className="text-lg font-semibold">Your Design Prompt</h2>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
              <p className="text-sm leading-6">
                Design an environment or learning experience involving{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{current[0]}</span>{" "}for learning about{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{current[1]}</span>{" "}using{" "}
                <span className="font-semibold text-rose-600 dark:text-rose-400">{current[2]}</span>{" "}in{" "}
                <span className="font-semibold text-amber-600 dark:text-amber-400">{current[3]}</span>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {current.map((c, i) => (
                <span key={i} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  {shortLabel(c)}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(sentence)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 bg-white/70 px-3 py-2 text-sm backdrop-blur hover:bg-white/90 dark:bg-slate-800/60 dark:hover:bg-slate-800"
              >
                <Copy size={16} /> Copy Sentence
              </button>
              <button
                onClick={() => spinAll()}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/70 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800"
              >
                <Dice6 size={16} /> Spin Again
              </button>
            </div>

            {history.length > 0 && (
              <div className="mt-2">
                <div className="mb-2 text-xs uppercase tracking-widest text-slate-500">Recent pulls</div>
                <div className="flex flex-col gap-2 max-h-56 overflow-auto pr-1">
                  {history.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIdx0(EMERGING_TECH.indexOf(h[0]));
                        setIdx1(TOPICS.indexOf(h[1]));
                        setIdx2(PEDAGOGY.indexOf(h[2]));
                        setIdx3(GRADES.indexOf(h[3]));
                      }}
                      className="group text-left rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs hover:bg-white dark:bg-slate-800/60 dark:border-slate-700"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{shortLabel(h[0])}</span>
                        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">{shortLabel(h[1])}</span>
                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">{shortLabel(h[2])}</span>
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">{shortLabel(h[3])}</span>
                      </div>
                      <div className="mt-1 text-slate-500 dark:text-slate-400">Click to restore</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          Crafted for playful curriculum design • Locks to hold any column • Keyboard: Space/Enter to spin
        </footer>
      </div>
    </div>
  );
}
