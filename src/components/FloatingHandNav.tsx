import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: "🏠", label: "Accueil", path: "/", angle: -135 },
  { icon: "🕐", label: "Historique", path: "/historique", angle: -90 },
  { icon: "👤", label: "Profil", path: "/profil", angle: -45 },
  { icon: "👑", label: "Nos Offres", path: "/lectures", angle: -10 },
];

const RADIUS = 90;

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const HandSVG = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 64 64" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Palm */}
    <ellipse cx="32" cy="38" rx="14" ry="16" fill="#2D1B69" opacity="0.9" />
    {/* Fingers */}
    <rect x="20" y="10" width="5" height="20" rx="2.5" fill="#3A2480" />
    <rect x="26.5" y="6" width="5" height="22" rx="2.5" fill="#3A2480" />
    <rect x="33" y="8" width="5" height="20" rx="2.5" fill="#3A2480" />
    <rect x="39" y="13" width="5" height="17" rx="2.5" fill="#3A2480" />
    {/* Thumb */}
    <rect x="13" y="28" width="5" height="14" rx="2.5" fill="#3A2480" transform="rotate(-25 15 35)" />

    {/* Life Line - gold gradient */}
    <path
      d="M24 48 C22 42, 21 36, 24 30"
      stroke="url(#lifeGrad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      className={isHovered ? "animate-none" : ""}
      style={{
        filter: isHovered ? "drop-shadow(0 0 4px #FFD700)" : "none",
        opacity: isHovered ? 1 : undefined,
      }}
    >
      {!isHovered && (
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" begin="0s" repeatCount="indefinite" />
      )}
    </path>

    {/* Heart Line - pink */}
    <path
      d="M20 34 C26 30, 34 30, 42 33"
      stroke="#FF6FB4"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      style={{
        filter: isHovered ? "drop-shadow(0 0 4px #FF6FB4)" : "none",
        opacity: isHovered ? 1 : undefined,
      }}
    >
      {!isHovered && (
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" begin="0.8s" repeatCount="indefinite" />
      )}
    </path>

    {/* Head Line - purple */}
    <path
      d="M20 38 C26 35, 34 36, 40 38"
      stroke="#9B59B6"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      style={{
        filter: isHovered ? "drop-shadow(0 0 4px #9B59B6)" : "none",
        opacity: isHovered ? 1 : undefined,
      }}
    >
      {!isHovered && (
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" begin="1.5s" repeatCount="indefinite" />
      )}
    </path>

    {/* Destiny Line - luminous white */}
    <path
      d="M32 48 C32 42, 32 36, 32 28"
      stroke="#E8D5FF"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      style={{
        filter: isHovered ? "drop-shadow(0 0 4px #E8D5FF)" : "none",
        opacity: isHovered ? 1 : undefined,
      }}
    >
      {!isHovered && (
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.2s" begin="2s" repeatCount="indefinite" />
      )}
    </path>

    <defs>
      <linearGradient id="lifeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFAA00" />
      </linearGradient>
    </defs>
  </svg>
);

const FloatingHandNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Generate sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const filtered = prev.filter((s) => Date.now() - s.id < 2000);
        if (filtered.length < 4) {
          return [
            ...filtered,
            {
              id: Date.now(),
              x: Math.random() * 60 - 30,
              y: Math.random() * 60 - 30,
              size: Math.random() * 8 + 6,
              delay: Math.random() * 0.5,
            },
          ];
        }
        return filtered;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      setIsOpen(false);
      navigate(path);
    },
    [navigate]
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-hand-nav]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        data-hand-nav
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
        aria-label="Menu de navigation"
        role="navigation"
      >
        {/* Menu items */}
        {menuItems.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = Math.cos(rad) * RADIUS;
          const y = Math.sin(rad) * RADIUS;

          return (
            <button
              key={item.path}
              aria-label={item.label}
              onClick={() => handleNavigate(item.path)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-semibold text-foreground whitespace-nowrap transition-all duration-500"
              style={{
                background: isOpen ? "rgba(26, 10, 59, 0.85)" : "rgba(26, 10, 59, 0)",
                border: isOpen ? "1px solid rgba(255, 215, 0, 0.4)" : "1px solid transparent",
                backdropFilter: isOpen ? "blur(16px)" : "none",
                transform: isOpen
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                  : "translate(-50%, -50%) scale(0)",
                opacity: isOpen ? 1 : 0,
                transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: isOpen ? "0 0 20px rgba(255, 215, 0, 0.15)" : "none",
              }}
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </button>
          );
        })}

        {/* Sparkles */}
        {!isOpen &&
          sparkles.map((s) => (
            <span
              key={s.id}
              className="absolute left-1/2 top-1/2 pointer-events-none text-primary"
              style={{
                transform: `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px))`,
                fontSize: `${s.size}px`,
                animation: `sparkle-fade 1.5s ease-out ${s.delay}s forwards`,
                opacity: 0,
              }}
            >
              ✨
            </span>
          ))}

        {/* Main button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Menu de navigation"
          className="relative w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-500"
          style={{
            background: "rgba(26, 10, 59, 0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: isHovered
              ? "0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.2)"
              : "0 0 20px rgba(255, 215, 0, 0.2)",
            transform: `scale(${isHovered ? 1.3 : 1}) rotate(${isClicked ? "15deg" : "0deg"})`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            animation: isOpen ? "none" : "hand-float 3s ease-in-out infinite",
          }}
        >
          {/* Rotating border gradient */}
          <div
            className="absolute inset-[-2px] rounded-full"
            style={{
              background: "conic-gradient(from var(--border-angle, 0deg), #FFD700, #FF6FB4, #FFD700)",
              animation: "rotate-border 3s linear infinite",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "2px",
              borderRadius: "9999px",
            }}
          />
          <HandSVG isHovered={isHovered || isOpen} />
        </button>
      </div>

      <style>{`
        @keyframes hand-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes rotate-border {
          to { --border-angle: 360deg; }
        }
        @keyframes sparkle-fade {
          0% { opacity: 0; transform: translate(calc(-50%), calc(-50%)) scale(0.5); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translate(calc(-50%), calc(-50%)) scale(1.2) translateY(-10px); }
        }
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </>
  );
};

export default FloatingHandNav;
