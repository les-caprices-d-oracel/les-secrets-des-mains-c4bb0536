import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

/* ── Palm line definitions ── */
const palmLines = [
  {
    id: "vie",
    label: "Ligne de Vie ✨",
    color: "#00C853",
    delay: 0,
    route: "/ligne/vie",
    // Life line: curves from between thumb & index around the mount of Venus
    path: "M 152 168 C 140 190, 120 220, 110 255 C 100 290, 98 320, 105 355 C 110 375, 118 390, 130 400",
    labelPos: { x: 62, y: 280 },
    length: 320,
  },
  {
    id: "coeur",
    label: "Ligne de Cœur 💕",
    color: "#FF4081",
    delay: 2,
    route: "/ligne/coeur",
    // Heart line: horizontal across upper palm, pinky to index
    path: "M 260 178 C 240 168, 215 162, 190 165 C 165 168, 145 172, 130 178 C 118 183, 108 190, 100 198",
    labelPos: { x: 155, y: 148 },
    length: 220,
  },
  {
    id: "tete",
    label: "Ligne de Tête 🧠",
    color: "#7C4DFF",
    delay: 4,
    route: "/ligne/tete",
    // Head line: across mid palm, slightly curved
    path: "M 148 195 C 165 200, 190 205, 215 210 C 235 214, 250 218, 262 225",
    labelPos: { x: 185, y: 196 },
    length: 180,
  },
  {
    id: "destin",
    label: "Ligne du Destin 🌟",
    color: "#FFD700",
    delay: 6,
    route: "/ligne/destin",
    // Fate line: vertical from base up to middle finger
    path: "M 185 410 C 183 380, 180 340, 178 300 C 176 265, 175 235, 176 200 C 177 180, 178 165, 180 155",
    labelPos: { x: 192, y: 295 },
    length: 300,
  },
];

const menuItems = [
  { icon: "🏠", label: "Accueil", path: "/" },
  { icon: "🕐", label: "Historique", path: "/historique" },
  { icon: "👤", label: "Profil", path: "/profil" },
  { icon: "👑", label: "Nos Offres", path: "/lectures" },
];

/* ── Realistic Hand SVG ── */
const HandSVG = ({
  hoveredLine,
  onLineHover,
  onLineLeave,
  onLineClick,
}: {
  hoveredLine: string | null;
  onLineHover: (id: string) => void;
  onLineLeave: () => void;
  onLineClick: (route: string) => void;
}) => (
  <svg viewBox="0 0 340 480" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Skin gradient */}
      <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F5D5A0" />
        <stop offset="100%" stopColor="#E8B87A" />
      </linearGradient>
      <linearGradient id="skinDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8C090" />
        <stop offset="100%" stopColor="#D4A055" />
      </linearGradient>
      {/* Glow filters for each line */}
      {palmLines.map((l) => (
        <filter key={l.id} id={`glow-${l.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={hoveredLine === l.id ? "6" : "3"} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      ))}
    </defs>

    {/* ── PALM ── */}
    <path
      d="M 100 430 C 85 400, 70 350, 68 300 C 66 260, 72 220, 85 195 L 95 178
         C 100 170, 108 162, 118 158
         L 130 155 L 152 155
         C 158 155, 165 152, 170 148
         L 180 142
         C 190 148, 200 152, 210 155
         L 240 158
         C 260 162, 272 170, 278 185
         L 282 195
         C 290 220, 292 260, 288 300
         C 284 350, 270 400, 255 430
         Q 178 465, 100 430 Z"
      fill="url(#skinGrad)"
      stroke="#D4A055"
      strokeWidth="1.2"
    />

    {/* Palm mounts - subtle shading */}
    {/* Mount of Venus (thumb base) */}
    <ellipse cx="125" cy="340" rx="35" ry="50" fill="#E0B878" opacity="0.3" />
    {/* Mount of Jupiter (below index) */}
    <ellipse cx="135" cy="175" rx="18" ry="14" fill="#DCAD6E" opacity="0.2" />
    {/* Mount of Saturn (below middle) */}
    <ellipse cx="178" cy="168" rx="16" ry="12" fill="#DCAD6E" opacity="0.2" />
    {/* Mount of Apollo (below ring) */}
    <ellipse cx="218" cy="172" rx="16" ry="12" fill="#DCAD6E" opacity="0.2" />
    {/* Mount of Mercury (below pinky) */}
    <ellipse cx="255" cy="185" rx="14" ry="12" fill="#DCAD6E" opacity="0.2" />
    {/* Mount of Moon (opposite Venus) */}
    <ellipse cx="245" cy="350" rx="30" ry="45" fill="#E0B878" opacity="0.2" />

    {/* ── THUMB ── */}
    <path
      d="M 95 178 C 80 168, 62 155, 48 140 C 35 128, 25 112, 28 98
         C 31 84, 42 76, 55 80 C 68 84, 78 98, 82 115
         C 86 130, 90 148, 100 165"
      fill="url(#skinGrad)" stroke="#D4A055" strokeWidth="1.2"
    />
    {/* Thumb phalanx crease */}
    <path d="M 45 125 C 55 120, 68 118, 78 122" stroke="#D4A055" strokeWidth="0.6" opacity="0.5" fill="none" />

    {/* ── INDEX FINGER ── */}
    <path
      d="M 118 158 C 115 135, 110 108, 107 82 C 104 60, 102 38, 108 22
         C 114 8, 126 4, 136 10 C 146 18, 148 38, 147 58
         C 146 78, 143 108, 140 135 L 152 155"
      fill="url(#skinGrad)" stroke="#D4A055" strokeWidth="1.2"
    />
    {/* Index creases */}
    <path d="M 112 105 C 122 100, 138 100, 145 104" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />
    <path d="M 108 72 C 118 68, 136 68, 145 72" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />

    {/* ── MIDDLE FINGER ── */}
    <path
      d="M 152 155 C 152 128, 155 95, 158 65 C 160 40, 162 18, 170 5
         C 178 -4, 190 -4, 196 5 C 202 18, 202 40, 200 65
         C 198 95, 196 128, 195 148 L 210 155"
      fill="url(#skinGrad)" stroke="#D4A055" strokeWidth="1.2"
    />
    <path d="M 155 92 C 165 87, 188 87, 198 92" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />
    <path d="M 158 58 C 168 53, 185 53, 196 58" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />

    {/* ── RING FINGER ── */}
    <path
      d="M 210 155 C 212 130, 218 100, 222 72 C 225 50, 228 30, 234 18
         C 240 8, 250 8, 255 18 C 260 30, 258 50, 256 72
         C 253 100, 248 130, 245 155 L 260 165"
      fill="url(#skinGrad)" stroke="#D4A055" strokeWidth="1.2"
    />
    <path d="M 220 98 C 230 93, 248 93, 255 98" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />
    <path d="M 224 65 C 232 60, 248 60, 254 65" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />

    {/* ── PINKY FINGER ── */}
    <path
      d="M 260 165 C 265 145, 272 118, 278 95 C 282 78, 285 62, 282 50
         C 280 40, 272 36, 265 42 C 258 48, 258 65, 260 82
         C 262 100, 265 125, 268 150 L 278 185"
      fill="url(#skinGrad)" stroke="#D4A055" strokeWidth="1.2"
    />
    <path d="M 262 108 C 270 104, 278 106, 280 110" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />
    <path d="M 268 78 C 273 74, 280 76, 281 80" stroke="#D4A055" strokeWidth="0.6" opacity="0.4" fill="none" />

    {/* ── PALM LINES ── */}
    {palmLines.map((line) => {
      const isHovered = hoveredLine === line.id;
      return (
        <g key={line.id}>
          {/* Hit area */}
          <path
            d={line.path}
            stroke="transparent"
            strokeWidth="18"
            fill="none"
            className="cursor-pointer"
            onMouseEnter={() => onLineHover(line.id)}
            onMouseLeave={onLineLeave}
            onClick={() => onLineClick(line.route)}
          />
          {/* Visible line */}
          <path
            d={line.path}
            stroke={line.color}
            strokeWidth={isHovered ? "3.5" : "2.5"}
            strokeLinecap="round"
            fill="none"
            filter={`url(#glow-${line.id})`}
            className="pointer-events-none"
            style={{
              strokeDasharray: line.length,
              strokeDashoffset: line.length,
              animation: `draw-line 1.2s ease-out ${line.delay * 0.5}s forwards`,
              transition: "stroke-width 0.3s",
            }}
          >
            <animate
              attributeName="opacity"
              values="0.75;1;0.75"
              dur="3s"
              begin={`${line.delay * 0.5 + 1.2}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Hover label */}
          {isHovered && (
            <foreignObject x={line.labelPos.x} y={line.labelPos.y} width="150" height="32" className="pointer-events-none">
              <div
                className="font-body text-xs font-semibold px-3 py-1.5 rounded-lg text-center whitespace-nowrap w-fit"
                style={{
                  background: "rgba(26, 10, 59, 0.9)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${line.color}44`,
                  color: line.color,
                  animation: "label-in 0.2s ease-out",
                }}
              >
                {line.label}
              </div>
            </foreignObject>
          )}
        </g>
      );
    })}
  </svg>
);

/* ── Main Component ── */
const Index = () => {
  const navigate = useNavigate();
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-menu]")) setMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const handleLineClick = useCallback(
    (route: string) => navigate(route),
    [navigate]
  );

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />

      {/* ── Header ── */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-6">
        <h1 className="font-display text-lg text-primary leading-tight drop-shadow-[0_0_15px_hsla(51,100%,50%,0.35)]">
          Les Secrets
          <br />
          des Mains
        </h1>

        {/* Magic menu button */}
        <div data-menu className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform duration-300 active:scale-90"
            style={{
              filter: "drop-shadow(0 0 8px hsla(51,100%,50%,0.4))",
            }}
            aria-label="Menu de navigation"
          >
            {menuOpen ? "✖️" : "🔮"}
          </button>

          {/* Dropdown */}
          <div
            className="absolute top-12 right-0 w-52 rounded-2xl overflow-hidden transition-all duration-300 origin-top-right"
            style={{
              background: "rgba(26, 10, 59, 0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsla(51,100%,50%,0.2)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              transform: menuOpen ? "scale(1)" : "scale(0.9)",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
            }}
          >
            {menuItems.map((item, i) => (
              <button
                key={item.path}
                onClick={() => { setMenuOpen(false); navigate(item.path); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-body text-foreground transition-colors hover:bg-primary/10"
                style={{
                  borderBottom: i < menuItems.length - 1 ? "1px solid hsla(51,100%,50%,0.08)" : "none",
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                <span className="text-muted-foreground text-xs">→</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Hand ── */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center px-8"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <div className="w-full" style={{ maxWidth: "320px" }}>
          <HandSVG
            hoveredLine={hoveredLine}
            onLineHover={setHoveredLine}
            onLineLeave={() => setHoveredLine(null)}
            onLineClick={handleLineClick}
          />
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative z-10 flex justify-center px-6 pb-10">
        <button
          onClick={() => navigate("/scanner")}
          className="w-full max-w-xs py-4 px-8 rounded-2xl font-display font-bold text-base tracking-wide text-primary-foreground animate-glow-pulse transition-transform active:scale-95"
          style={{ background: "var(--gradient-cta)" }}
        >
          🖐️ Révèle mes secrets
        </button>
      </div>

      <style>{`
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes label-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Index;
