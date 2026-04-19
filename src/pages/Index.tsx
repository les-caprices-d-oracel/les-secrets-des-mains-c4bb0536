import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import LegalFooter from "@/components/LegalFooter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import handImage from "@/assets/hand-main.png";
import NewsletterForm from "@/components/NewsletterForm";

const palmLines = [
  { id: "vie", label: "Ligne de Vie", color: "#34d399", delay: 0, route: "/ligne/vie", path: "M 60 220 C 50 260, 55 320, 75 380 C 85 400, 95 415, 110 420", labelPos: { x: 15, y: 310 } },
  { id: "coeur", label: "Ligne de Cœur", color: "#f9a8d4", delay: 2, route: "/ligne/coeur", path: "M 220 180 C 190 165, 150 160, 110 165 C 85 170, 65 178, 50 190", labelPos: { x: 120, y: 135 } },
  { id: "tete", label: "Ligne de Tête", color: "#c4b5fd", delay: 4, route: "/ligne/tete", path: "M 60 245 C 90 250, 140 255, 180 260 C 210 265, 235 275, 250 285", labelPos: { x: 140, y: 230 } },
  { id: "destin", label: "Ligne du Destin", color: "#fcd34d", delay: 6, route: "/ligne/destin", path: "M 160 420 C 158 380, 155 320, 153 260 C 151 210, 150 170, 152 140", labelPos: { x: 165, y: 280 } },
];

const menuItems = [
  { label: "Accueil", path: "/" },
  { label: "Historique", path: "/historique" },
  { label: "Profil", path: "/profil" },
  { label: "Nos Offres", path: "/lectures" },
];

const MenuIcon = ({ open }: { open: boolean }) => open ? (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="4" y1="4" x2="14" y2="14" /><line x1="14" y1="4" x2="4" y2="14" />
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="5" x2="15" y2="5" /><line x1="3" y1="9" x2="15" y2="9" /><line x1="3" y1="13" x2="15" y2="13" />
  </svg>
);

const HandImage = ({ hoveredLine, onLineHover, onLineLeave, onLineClick }: {
  hoveredLine: string | null;
  onLineHover: (id: string) => void;
  onLineLeave: () => void;
  onLineClick: (route: string) => void;
}) => (
  <div className="relative w-full h-full flex items-center justify-center rounded-lg" style={{ backgroundColor: "transparent" }}>
    <img src={handImage} alt="Main avec lignes de chiromancie" className="w-full h-auto object-contain"
      style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }} />
    {/* overlay retiré : il blanchissait totalement l'image (screen + blanc = blanc) */}
    <svg viewBox="0 0 300 500" className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: "none" }}>
      <defs>
        {palmLines.map((l) => (
          <filter key={l.id} id={`glow-${l.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={hoveredLine === l.id ? "8" : "4"} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        ))}
      </defs>
      {palmLines.map((line) => (
        <g key={line.id} style={{ pointerEvents: "auto" }}>
          <path d={line.path} stroke="transparent" strokeWidth="25" fill="none" className="cursor-pointer"
            onMouseEnter={() => onLineHover(line.id)} onMouseLeave={onLineLeave}
            onTouchStart={() => onLineHover(line.id)} onTouchEnd={onLineLeave}
            onClick={() => onLineClick(line.route)} />
          {hoveredLine === line.id && (
            <path d={line.path} stroke={line.color} strokeWidth="4" strokeLinecap="round" fill="none"
              filter={`url(#glow-${line.id})`} style={{ opacity: 0.8, animation: "pulse-glow 1.5s ease-in-out infinite" }} />
          )}
          {hoveredLine === line.id && (
            <foreignObject x={line.labelPos.x} y={line.labelPos.y} width="150" height="40" className="pointer-events-none">
              <div className="font-body text-xs font-semibold px-3 py-2 rounded-lg text-center whitespace-nowrap w-fit"
                style={{ background: "rgba(10,10,20,0.92)", backdropFilter: "blur(12px)", border: `1px solid ${line.color}44`, color: line.color, boxShadow: `0 0 20px ${line.color}33`, animation: "label-in 0.2s ease-out" }}>
                {line.label}
              </div>
            </foreignObject>
          )}
        </g>
      ))}
    </svg>
  </div>
);

const HandChoiceDialog = ({ open, onOpenChange, onChoose }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onChoose: (hand: "droite" | "gauche") => void;
}) => {
  const options = [
    { id: "droite" as const, label: "Main droite", sub: "Ta main dominante — ton destin construit", icon: "🤚" },
    { id: "gauche" as const, label: "Main gauche", sub: "Ta main non-dominante — ton potentiel inné", icon: "🖐️" },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-sm border-0"
        style={{ background: "rgba(12,12,20,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <DialogHeader>
          <DialogTitle className="font-display text-center" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)" }}>
            Quelle main lire ?
          </DialogTitle>
          <DialogDescription className="text-center font-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
            Chaque main révèle une part différente de toi
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          {options.map((opt) => (
            <button key={opt.id} onClick={() => onChoose(opt.id)}
              className="flex items-center gap-4 w-full rounded-xl px-4 py-4 text-left transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}>
              <span style={{ fontSize: "2rem" }}>{opt.icon}</span>
              <div>
                <p className="font-body font-semibold" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.80)" }}>{opt.label}</p>
                <p className="font-body" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", lineHeight: "1.5" }}>{opt.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showHandChoice, setShowHandChoice] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-menu]")) setMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const handleLineClick = useCallback((route: string) => navigate(route), [navigate]);
  const handleHandChoice = useCallback((hand: "droite" | "gauche") => {
    setShowHandChoice(false);
    navigate(`/scanner?hand=${hand}`);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(30,60,90,0.25) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(20,80,60,0.12) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 60%, rgba(80,40,100,0.08) 0%, transparent 50%)" }} />
      </div>

      <StarField />

      <header className="relative z-20 flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex flex-col">
          <span className="font-body uppercase" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em" }}>
            Chiromancerie · IA
          </span>
          <h1 className="font-display leading-tight" style={{ fontSize: "1.35rem", color: "rgba(255,255,255,0.88)", letterSpacing: "0.02em" }}>
            Les Secrets<br />des Mains
          </h1>
        </div>
        <div data-menu className="relative">
          <button onClick={() => setMenuOpen((p) => !p)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            aria-label="Menu de navigation" aria-expanded={menuOpen}>
            <MenuIcon open={menuOpen} />
          </button>
          <div className="absolute top-12 right-0 w-48 rounded-xl overflow-hidden transition-all duration-200 origin-top-right"
            style={{ background: "rgba(12,12,20,0.95)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 16px 48px rgba(0,0,0,0.6)", transform: menuOpen ? "scale(1)" : "scale(0.95)", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}>
            {menuItems.map((item, i) => (
              <button key={item.path} onClick={() => { setMenuOpen(false); navigate(item.path); }}
                className="w-full flex items-center justify-between px-4 py-3 font-body transition-colors"
                style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", borderBottom: i < menuItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                {item.label}
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.9rem" }}>›</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <p className="relative z-10 text-center font-body px-8"
        style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.02em", marginTop: "4px" }}>
        Explore tes lignes. Révèle ce qu'elles gardent.
      </p>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6" style={{ marginTop: "-8px" }}>
        <div className="relative w-full" style={{ maxWidth: "320px", height: "52vh" }}>
          <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(30,80,60,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <HandImage
            hoveredLine={hoveredLine}
            onLineHover={setHoveredLine}
            onLineLeave={() => setHoveredLine(null)}
            onLineClick={handleLineClick}
          />
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-6 px-6 pb-4">
        {palmLines.map((line) => (
          <button key={line.id} onClick={() => navigate(line.route)}
            className="flex flex-col items-center gap-1 transition-all duration-200 active:scale-95"
            style={{ opacity: hoveredLine === line.id ? 1 : 0.4 }}
            onMouseEnter={() => setHoveredLine(line.id)} onMouseLeave={() => setHoveredLine(null)}
            aria-label={line.label}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: line.color, boxShadow: `0 0 8px ${line.color}55` }} />
            <span className="font-body" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.45)" }}>
              {line.id === "vie" ? "Vie" : line.id === "coeur" ? "Cœur" : line.id === "tete" ? "Tête" : "Destin"}
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-8">
        <button onClick={() => setShowHandChoice(true)}
          className="w-full max-w-xs font-body font-semibold uppercase tracking-widest transition-all duration-200 active:scale-95"
          style={{ padding: "16px 32px", borderRadius: "14px", fontSize: "0.72rem", letterSpacing: "0.2em", background: "rgba(18,155,105,0.88)", color: "rgba(255,255,255,0.97)", border: "1px solid rgba(40,200,140,0.28)", boxShadow: "0 0 50px rgba(18,155,105,0.22), 0 8px 24px rgba(0,0,0,0.5)" }}>
          Révèle mes secrets
        </button>
        <button onClick={() => setShowHowItWorks(true)} className="font-body transition-opacity hover:opacity-70"
          style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.03em" }}>
          Comment ça marche ?
        </button>
      </div>

      {/* ── Newsletter ── */}
      <section className="relative z-10 w-full flex flex-col items-center px-6 py-8">
        <NewsletterForm />
      </section>

      <HandChoiceDialog open={showHandChoice} onOpenChange={setShowHandChoice} onChoose={handleHandChoice} />

      <Dialog open={showHowItWorks} onOpenChange={setShowHowItWorks}>
        <DialogContent className="rounded-2xl max-w-sm border-0"
          style={{ background: "rgba(12,12,20,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <DialogHeader>
            <DialogTitle className="font-display text-center" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)" }}>
              Comment ça marche ?
            </DialogTitle>
            <DialogDescription className="text-center font-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
              Trois étapes pour lire ta paume
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {[
              { num: "01", title: "Choisis ta main", desc: "Main droite (destin construit) ou main gauche (potentiel inné)." },
              { num: "02", title: "Scanne ta paume", desc: "Place ta main devant la caméra pour capturer ses lignes." },
              { num: "03", title: "Découvre ton destin", desc: "Reçois ta lecture personnalisée et sauvegarde-la en PDF." },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-body font-bold shrink-0" style={{ fontSize: "0.7rem", color: "rgba(52,211,153,0.6)", marginTop: "2px" }}>
                  {step.num}
                </span>
                <div>
                  <p className="font-body font-semibold" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>{step.title}</p>
                  <p className="font-body" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", lineHeight: "1.5" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowHowItWorks(false)}
            className="w-full font-body font-medium transition-all active:scale-95 mt-2"
            style={{ padding: "12px", borderRadius: "12px", fontSize: "0.8rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
            Compris
          </button>
        </DialogContent>
      </Dialog>

      <LegalFooter />

      <style>{`
        @keyframes pulse-glow { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes label-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Index;