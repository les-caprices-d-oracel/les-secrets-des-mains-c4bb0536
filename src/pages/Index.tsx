import StarField from "@/components/StarField";
import handImage from "@/assets/hand-mystical.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const menuItems = [
  { icon: "🏠", label: "Accueil", path: "/", angle: -135 },
  { icon: "🕐", label: "Historique", path: "/historique", angle: -90 },
  { icon: "👤", label: "Profil", path: "/profil", angle: -45 },
  { icon: "👑", label: "Nos Offres", path: "/lectures", angle: 45 },
];

const RADIUS = 130;

const Index = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  // Sparkles around the hand
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const filtered = prev.filter((s) => Date.now() - s.id < 2000);
        if (filtered.length < 5) {
          return [
            ...filtered,
            {
              id: Date.now(),
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              size: Math.random() * 10 + 8,
            },
          ];
        }
        return filtered;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleHandClick = useCallback(() => {
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
      if (!target.closest("[data-hand-menu]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [isOpen]);

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden pb-24">
      <StarField />

      {/* Backdrop when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 transition-opacity duration-300"
          style={{ backgroundColor: "hsla(243, 78%, 11%, 0.7)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-12 w-full max-w-md mx-auto">
        {/* Interactive hand navigation */}
        <div
          data-hand-menu
          className="relative mb-6 cursor-pointer select-none"
          role="navigation"
          aria-label="Menu de navigation"
          onClick={handleHandClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Sparkles */}
          {!isOpen &&
            sparkles.map((s) => (
              <span
                key={s.id}
                className="absolute left-1/2 top-1/2 pointer-events-none text-primary"
                style={{
                  transform: `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px))`,
                  fontSize: `${s.size}px`,
                  animation: "sparkle-fade 1.5s ease-out forwards",
                  opacity: 0,
                }}
              >
                ✨
              </span>
            ))}

          {/* Menu items */}
          {menuItems.map((item, i) => {
            const rad = (item.angle * Math.PI) / 180;
            const x = Math.cos(rad) * RADIUS;
            const y = Math.sin(rad) * RADIUS;

            return (
              <button
                key={item.path}
                aria-label={item.label}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(item.path);
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-body font-semibold text-foreground whitespace-nowrap transition-all duration-500 z-40"
                style={{
                  background: isOpen ? "rgba(26, 10, 59, 0.85)" : "rgba(26, 10, 59, 0)",
                  border: isOpen ? "1px solid rgba(255, 215, 0, 0.4)" : "1px solid transparent",
                  backdropFilter: isOpen ? "blur(16px)" : "none",
                  transform: isOpen
                    ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                    : "translate(-50%, -50%) scale(0)",
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? `${i * 70}ms` : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: isOpen ? "0 0 20px rgba(255, 215, 0, 0.15)" : "none",
                }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            );
          })}

          {/* The hand image */}
          <img
            src={handImage}
            alt="Main mystique avec lignes dorées et étoiles"
            width={512}
            height={640}
            className="w-64 h-auto drop-shadow-[0_0_40px_hsla(51,100%,50%,0.3)] transition-transform duration-500"
            style={{
              transform: `scale(${isOpen ? 1.4 : isHovered ? 1.25 : 1})`,
              transitionTimingFunction: isOpen
                ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                : "ease-out",
              animation: isOpen || isHovered ? "none" : "float 3s ease-in-out infinite",
            }}
          />

          {/* Hover hint text */}
          <p
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-body whitespace-nowrap transition-all duration-300"
            style={{
              color: "#E8D5FF",
              opacity: isHovered && !isOpen ? 1 : 0,
              transform: `translateY(${isHovered && !isOpen ? 0 : 6}px)`,
            }}
          >
            Touchez pour naviguer ✨
          </p>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl text-primary text-center leading-tight mb-3 drop-shadow-[0_0_20px_hsla(51,100%,50%,0.4)]">
          Les Secrets
          <br />
          des Mains
        </h1>

        <p className="text-muted-foreground text-center text-sm mb-10 max-w-xs">
          Découvrez ce que vos lignes de main révèlent sur votre destin ✨
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/scanner")}
          className="w-full max-w-xs py-4 px-8 rounded-2xl font-body font-bold text-lg tracking-wide text-primary-foreground animate-glow-pulse transition-transform active:scale-95"
          style={{ background: "var(--gradient-cta)" }}
        >
          🖐️ Révèle mes secrets
        </button>

        {/* Secondary links */}
        <div className="mt-8 flex gap-6">
          <button
            onClick={() => navigate("/lectures")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Nos lectures
          </button>
          <button
            onClick={() => navigate("/pdf")}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            PDF personnalisé
          </button>
        </div>
      </div>

      <style>{`
        @keyframes sparkle-fade {
          0% { opacity: 0; transform: translate(calc(-50%), calc(-50%)) scale(0.5); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translate(calc(-50%), calc(-50%)) scale(1.2) translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Index;
