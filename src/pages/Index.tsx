import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import handImage from "@/assets/hand-main.png";

/* ── Palm line definitions ── */
const palmLines = [
  {
    id: "vie",
    label: "Ligne de Vie ✨",
    color: "#00C853",
    delay: 0,
    route: "/ligne/vie",
    // Hit area for life line (curved around thumb)
    path: "M 60 220 C 50 260, 55 320, 75 380 C 85 400, 95 415, 110 420",
    labelPos: { x: 15, y: 310 },
  },
  {
    id: "coeur",
    label: "Ligne de Cœur 💕",
    color: "#FF4081",
    delay: 2,
    route: "/ligne/coeur",
    // Hit area for heart line (horizontal across top)
    path: "M 220 180 C 190 165, 150 160, 110 165 C 85 170, 65 178, 50 190",
    labelPos: { x: 120, y: 135 },
  },
  {
    id: "tete",
    label: "Ligne de Tête 🧠",
    color: "#7C4DFF",
    delay: 4,
    route: "/ligne/tete",
    // Hit area for head line (middle horizontal)
    path: "M 60 245 C 90 250, 140 255, 180 260 C 210 265, 235 275, 250 285",
    labelPos: { x: 140, y: 230 },
  },
  {
    id: "destin",
    label: "Ligne du Destin 🌟",
    color: "#FFD700",
    delay: 6,
    route: "/ligne/destin",
    // Hit area for fate line (vertical center)
    path: "M 160 420 C 158 380, 155 320, 153 260 C 151 210, 150 170, 152 140",
    labelPos: { x: 165, y: 280 },
  },
];

const menuItems = [
  { icon: "🏠", label: "Accueil", path: "/" },
  { icon: "🕐", label: "Historique", path: "/historique" },
  { icon: "👤", label: "Profil", path: "/profil" },
  { icon: "👑", label: "Nos Offres", path: "/lectures" },
];

/* ── Interactive Hand Image with Line Hotspots ── */
const HandImage = ({
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
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Main Hand Image */}
    <img
      src={handImage}
      alt="Main avec lignes de chiromancie"
      className="w-full h-auto object-contain"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
    
    {/* SVG Overlay for Interactive Hotspots */}
    <svg 
      viewBox="0 0 300 500" 
      className="absolute inset-0 w-full h-full"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        {/* Glow filters for hover effects */}
        {palmLines.map((l) => (
          <filter key={l.id} id={`glow-${l.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={hoveredLine === l.id ? "8" : "4"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {/* Interactive hit areas (invisible but clickable) */}
      {palmLines.map((line) => (
        <g key={line.id} style={{ pointerEvents: "auto" }}>
          {/* Invisible hit area */}
          <path
            d={line.path}
            stroke="transparent"
            strokeWidth="25"
            fill="none"
            className="cursor-pointer"
            onMouseEnter={() => onLineHover(line.id)}
            onMouseLeave={onLineLeave}
            onClick={() => onLineClick(line.route)}
          />
          
          {/* Visible glow line on hover */}
          {hoveredLine === line.id && (
            <path
              d={line.path}
              stroke={line.color}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter={`url(#glow-${line.id})`}
              style={{
                opacity: 0.8,
                animation: "pulse-glow 1.5s ease-in-out infinite",
              }}
            />
          )}

          {/* Hover label */}
          {hoveredLine === line.id && (
            <foreignObject x={line.labelPos.x} y={line.labelPos.y} width="150" height="40" className="pointer-events-none">
              <div
                className="font-body text-xs font-semibold px-3 py-2 rounded-lg text-center whitespace-nowrap w-fit"
                style={{
                  background: "rgba(26, 10, 59, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: `2px solid ${line.color}`,
                  color: line.color,
                  boxShadow: `0 0 20px ${line.color}66`,
                  animation: "label-in 0.2s ease-out",
                }}
              >
                {line.label}
              </div>
            </foreignObject>
          )}
        </g>
      ))}
    </svg>
  </div>
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
        className="relative z-10 flex-1 flex items-center justify-center px-6"
      >
        <div className="relative w-full" style={{ maxWidth: "340px", height: "55vh" }}>
          <HandImage
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
