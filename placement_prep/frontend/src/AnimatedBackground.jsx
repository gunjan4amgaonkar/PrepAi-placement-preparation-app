// Animated "runtime environment" background: drifting grid, glowing circuit
// traces with travelling pulses, soft orbs, twinkling sparkles and floating code chips.
// Pure CSS/SVG (no libraries); it respects prefers-reduced-motion.

const sparkles = [
  { x: 8, y: 18, s: 14, d: 0, c: "#fbbf24" },
  { x: 22, y: 62, s: 10, d: 1.2, c: "#7dd3fc" },
  { x: 36, y: 12, s: 12, d: 2.1, c: "#7dd3fc" },
  { x: 47, y: 78, s: 9, d: 0.6, c: "#fbbf24" },
  { x: 58, y: 30, s: 15, d: 1.8, c: "#7dd3fc" },
  { x: 69, y: 88, s: 11, d: 2.6, c: "#f0abfc" },
  { x: 78, y: 16, s: 10, d: 0.9, c: "#fbbf24" },
  { x: 86, y: 52, s: 14, d: 1.5, c: "#7dd3fc" },
  { x: 93, y: 80, s: 9, d: 3.1, c: "#fbbf24" },
  { x: 15, y: 90, s: 12, d: 2.4, c: "#f0abfc" },
  { x: 63, y: 55, s: 8, d: 0.3, c: "#7dd3fc" },
  { x: 30, y: 40, s: 8, d: 3.4, c: "#fbbf24" },
];

const chips = [
  { t: "npm run dev", x: 6, y: 74, d: 0, dur: 38, tone: "pink" },
  { t: "build passed", x: 70, y: 82, d: 6, dur: 44, tone: "green" },
  { t: "{ }", x: 42, y: 90, d: 12, dur: 36, tone: "blue" },
  { t: "</>", x: 88, y: 92, d: 3, dur: 40, tone: "blue" },
  { t: "git push", x: 24, y: 96, d: 18, dur: 46, tone: "pink" },
  { t: "O(log n)", x: 56, y: 100, d: 9, dur: 42, tone: "green" },
  { t: "tests: 12/12", x: 78, y: 104, d: 22, dur: 48, tone: "green" },
];

// Stepped circuit lines (viewBox 1600 x 900), like traces on a board.
const traces = [
  "M0 700 H260 V560 H520 V420 H760",
  "M1600 220 H1360 V340 H1120 V480 H980",
  "M300 0 V120 H520 V250 H700",
  "M1600 760 H1300 V640 H1040 V560",
  "M0 300 H180 V200 H380",
  "M900 900 V780 H1080 V700",
];

export default function AnimatedBackground() {
  return (
    <div className="bg-root" aria-hidden="true">
      <div className="bg-orb bg-orb-a" />
      <div className="bg-orb bg-orb-b" />
      <div className="bg-orb bg-orb-c" />
      <div className="bg-grid" />

      <svg
        className="bg-traces"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {traces.map((d, i) => (
          <g key={i}>
            <path d={d} className="trace-base" />
            <path
              d={d}
              className="trace-pulse"
              pathLength="100"
              style={{ animationDelay: `${i * 1.7}s`, animationDuration: `${7 + (i % 3) * 2}s` }}
            />
          </g>
        ))}
      </svg>

      {sparkles.map((s, i) => (
        <svg
          key={i}
          className="bg-sparkle"
          viewBox="0 0 24 24"
          width={s.s}
          height={s.s}
          style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s`, color: s.c }}
        >
          <path d="M12 0c.8 6.6 5.4 11.2 12 12-6.6.8-11.2 5.4-12 12-.8-6.6-5.4-11.2-12-12C6.6 11.2 11.2 6.6 12 0z" fill="currentColor" />
        </svg>
      ))}

      {chips.map((c, i) => (
        <span
          key={i}
          className={`bg-chip bg-chip-${c.tone}`}
          style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `-${c.d}s`, animationDuration: `${c.dur}s` }}
        >
          {c.t}
        </span>
      ))}
    </div>
  );
}
