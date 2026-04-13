import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const lines = [
  {
    id: "vie",
    label: "Ligne de Vie ✨",
    color: "#00E676",
    delay: 0,
    path: "M 108 330 C 100 290, 88 250, 82 210 C 76 175, 78 145, 90 120",
    labelPos: { x: 50, y: 220 },
    route: "/ligne/vie",
  },
  {
    id: "coeur",
    label: "Ligne de Cœur 💕",
    color: "#FF6FB4",
    delay: 1.5,
    path: "M 75 175 C 100 155, 135 145, 170 148 C 195 150, 220 158, 240 170",
    labelPos: { x: 180, y: 135 },
    route: "/ligne/coeur",
  },
  {
    id: "tete",
    label: "Ligne de Tête 🧠",
    color: "#9B59B6",
    delay: 3,
    path: "M 80 200 C 110 185, 150 180, 185 185 C 210 188, 230 195, 245 205",
    labelPos: { x: 185, y: 175 },
    route: "/ligne/tete",
  },
  {
    id: "destin",
    label: "Ligne du Destin 🌟",
    color: "#FFD700",
    delay: 4.5,
    path: "M 155 340 C 152 300, 150 260, 148 220 C 146 190, 145 165, 148 140",
    labelPos: { x: 165, y: 260 },
    route: "/ligne/destin",
  },
];

const navItems = [
  { icon: "🏠", label: "Accueil", path: "/" },
  { icon: "🕐", label: "Historique", path: "/historique" },
  { icon: "👤", label: "Profil", path: "/profil" },
  { icon: "👑", label: "Nos Offres", path: "/lectures" },
];

const Index = () => {
  const navigate = useNavigate();
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  // Sparkles around line endpoints
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const filtered = prev.filter((s) => Date.now() - s.id < 2500);
        if (filtered.length < 6) {
          // Random positions near the hand area
          const cx = 150 + (Math.random() - 0.5) * 200;
          const cy = 200 + (Math.random() - 0.5) * 200;
          return [...filtered, { id: Date.now(), x: cx, y: cy, size: Math.random() * 8 + 5 }];
        }
        return filtered;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <StarField />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto px-4 pt-8 pb-24">
        {/* Title */}
        <h1 className="font-display text-2xl md:text-3xl text-primary text-center leading-tight mb-2 drop-shadow-[0_0_20px_hsla(51,100%,50%,0.4)]">
          Les Secrets
          <br />
          des Mains
        </h1>

        <p className="text-muted-foreground text-center text-xs mb-4 max-w-xs">
          Touchez une ligne pour découvrir sa signification ✨
        </p>

        {/* SVG Hand — 60% of screen */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          <svg
            viewBox="0 0 300 400"
            className="w-full h-auto"
            style={{ maxHeight: "55vh" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hand outline — elegant thin golden strokes */}
            <g stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85">
              {/* Palm */}
              <path d="M 70 340 C 60 310, 55 270, 58 230 C 60 200, 65 175, 75 155 L 80 145" />
              <path d="M 245 340 C 255 310, 258 270, 255 230 C 252 200, 248 180, 240 165" />
              <path d="M 70 340 Q 155 370, 245 340" />

              {/* Index finger */}
              <path d="M 80 145 C 78 120, 75 90, 73 60 C 72 42, 78 28, 88 28 C 98 28, 104 42, 103 60 C 101 80, 100 100, 98 120" />

              {/* Middle finger */}
              <path d="M 98 120 C 100 95, 105 60, 108 35 C 110 18, 118 5, 130 5 C 142 5, 148 18, 147 35 C 145 60, 142 95, 140 125" />

              {/* Ring finger */}
              <path d="M 140 125 C 145 95, 152 62, 158 40 C 161 25, 170 14, 180 14 C 190 14, 197 25, 195 40 C 192 62, 188 95, 185 130" />

              {/* Pinky finger */}
              <path d="M 185 130 C 192 105, 200 78, 208 58 C 212 46, 220 38, 228 40 C 236 42, 240 52, 237 65 C 233 82, 225 110, 240 165" />

              {/* Thumb */}
              <path d="M 75 230 C 55 235, 35 228, 25 210 C 18 195, 22 178, 35 172 C 48 166, 62 175, 65 190" />
            </g>

            {/* Sparkles */}
            {sparkles.map((s) => (
              <text
                key={s.id}
                x={s.x}
                y={s.y}
                fontSize={s.size}
                className="pointer-events-none"
                style={{ animation: "sparkle-svg 2s ease-out forwards" }}
              >
                ✨
              </text>
            ))}

            {/* Palm lines with draw animation */}
            {lines.map((line) => {
              const isHovered = hoveredLine === line.id;
              return (
                <g key={line.id}>
                  {/* Invisible wider hit area */}
                  <path
                    d={line.path}
                    stroke="transparent"
                    strokeWidth="20"
                    fill="none"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredLine(line.id)}
                    onMouseLeave={() => setHoveredLine(null)}
                    onClick={() => navigate(line.route)}
                  />

                  {/* Glow layer */}
                  <path
                    d={line.path}
                    stroke={line.color}
                    strokeWidth={isHovered ? "5" : "3"}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isHovered ? 0.5 : 0.15}
                    style={{
                      filter: `blur(${isHovered ? 6 : 3}px)`,
                      transition: "all 0.3s ease",
                    }}
                    className="pointer-events-none"
                  />

                  {/* Main line */}
                  <path
                    d={line.path}
                    stroke={line.color}
                    strokeWidth={isHovered ? "3" : "2"}
                    strokeLinecap="round"
                    fill="none"
                    className="pointer-events-none"
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: 300,
                      animation: `draw-line 1.5s ease-out ${line.delay}s forwards`,
                      filter: isHovered ? `drop-shadow(0 0 8px ${line.color})` : "none",
                      transition: "filter 0.3s, stroke-width 0.3s",
                    }}
                  >
                    {/* Idle shimmer */}
                    <animate
                      attributeName="opacity"
                      values="0.7;1;0.7"
                      dur="3s"
                      begin={`${line.delay + 1.5}s`}
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Hover label */}
                  {isHovered && (
                    <foreignObject
                      x={line.labelPos.x}
                      y={line.labelPos.y}
                      width="140"
                      height="30"
                      className="pointer-events-none"
                    >
                      <div
                        className="font-body text-xs font-semibold px-2 py-1 rounded-lg text-center whitespace-nowrap"
                        style={{
                          background: "rgba(26, 10, 59, 0.85)",
                          backdropFilter: "blur(8px)",
                          border: `1px solid ${line.color}50`,
                          color: line.color,
                          animation: "fade-in-label 0.2s ease-out",
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
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/scanner")}
          className="w-full max-w-xs py-4 px-8 rounded-2xl font-body font-bold text-lg tracking-wide text-primary-foreground animate-glow-pulse transition-transform active:scale-95 mt-4"
          style={{ background: "var(--gradient-cta)" }}
        >
          🖐️ Révèle mes secrets
        </button>
      </div>

      {/* Mini nav pills */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 px-3 py-2 rounded-2xl"
        style={{
          background: "rgba(26, 10, 59, 0.8)",
          backdropFilter: "blur(16px)",
          border: "1px solid hsla(51,100%,50%,0.15)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-200 hover:bg-primary/10 active:scale-90"
          >
            {item.icon}
          </button>
        ))}
      </nav>

      <style>{`
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes sparkle-svg {
          0% { opacity: 0; }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes fade-in-label {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Index;
