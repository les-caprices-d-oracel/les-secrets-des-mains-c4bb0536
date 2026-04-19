import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import LegalFooter from "@/components/LegalFooter";
import NewsletterForm from "@/components/NewsletterForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const menuItems = [
  { label: "Accueil", path: "/" },
  { label: "Historique", path: "/historique" },
  { label: "Profil", path: "/profil" },
  { label: "Nos Offres", path: "/lectures" },
];

const palmLines = [
  { id: "vie", label: "Vie", color: "#34d399", route: "/ligne/vie", desc: "Vitalité & énergie de ton chemin" },
  { id: "coeur", label: "Cœur", color: "#f9a8d4", route: "/ligne/coeur", desc: "Émotions & relations sentimentales" },
  { id: "tete", label: "Tête", color: "#c4b5fd", route: "/ligne/tete", desc: "Intellect & manière de penser" },
  { id: "destin", label: "Destin", color: "#fcd34d", route: "/ligne/destin", desc: "Trajectoire & accomplissements" },
];

const MenuIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="5" y1="5" x2="15" y2="15" />
      <line x1="15" y1="5" x2="5" y2="15" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="17" y2="6" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="14" x2="17" y2="14" />
    </svg>
  );

const HandChoiceDialog = ({
  open, onOpenChange, onChoose,
}: {
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
      <DialogContent
        className="rounded-2xl max-w-sm border-0"
        style={{ background: "rgba(15,10,30,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-center" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)" }}>
            Quelle main lire ?
          </DialogTitle>
          <DialogDescription className="text-center font-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            Chaque main révèle une part différente de toi
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChoose(opt.id)}
              className="flex items-center gap-4 w-full rounded-xl px-4 py-4 text-left transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            >
              <span style={{ fontSize: "2rem" }}>{opt.icon}</span>
              <div>
                <p className="font-body font-semibold" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.85)" }}>{opt.label}</p>
                <p className="font-body" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", lineHeight: "1.5" }}>{opt.sub}</p>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHandChoice, setShowHandChoice] = useState(false);
  const [readingsCount, setReadingsCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("readings_count");
      setReadingsCount(stored ? parseInt(stored, 10) || 0 : 0);
    } catch {
      setReadingsCount(0);
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-menu]")) setMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const handleHandChoice = useCallback(
    (hand: "droite" | "gauche") => {
      setShowHandChoice(false);
      navigate(`/scanner?hand=${hand}`);
    },
    [navigate],
  );

  const nextMilestone = readingsCount < 3 ? 3 : readingsCount < 7 ? 7 : readingsCount < 15 ? 15 : readingsCount + 5;
  const remaining = Math.max(0, nextMilestone - readingsCount);

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d0a1a 0%, #130d2e 50%, #0a0a14 100%)" }}
    >
      {/* Purple glow top */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(120,60,220,0.15) 0%, transparent 60%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 80% 70%, rgba(80,40,140,0.08) 0%, transparent 50%)" }}
        />
      </div>

      <StarField />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-5 pb-2">
        <div
          className="flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "#f97316",
            boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
            fontSize: "1.4rem",
          }}
          aria-label="Logo"
        >
          🤚
        </div>

        <div data-menu className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.95)",
            }}
            aria-label="Menu de navigation"
            aria-expanded={menuOpen}
          >
            <MenuIcon open={menuOpen} />
          </button>
          <div
            className="absolute top-12 right-0 w-48 rounded-xl overflow-hidden transition-all duration-200 origin-top-right"
            style={{
              background: "rgba(15,10,30,0.97)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
              transform: menuOpen ? "scale(1)" : "scale(0.95)",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
            }}
          >
            {menuItems.map((item, i) => (
              <button
                key={item.path}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(item.path);
                }}
                className="w-full flex items-center justify-between px-4 py-3 font-body transition-colors"
                style={{
                  fontSize: "0.83rem",
                  color: "rgba(255,255,255,0.65)",
                  borderBottom: i < menuItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {item.label}
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.9rem" }}>›</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero title */}
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ marginTop: "32px" }}>
        <h1
          className="font-display font-bold leading-[1.05]"
          style={{ fontSize: "clamp(2.2rem, 9vw, 4rem)", color: "rgba(255,255,255,0.98)", letterSpacing: "-0.01em" }}
        >
          Les Secrets des
        </h1>
        <h1
          className="font-display font-bold leading-[1.05]"
          style={{
            fontSize: "clamp(2.2rem, 9vw, 4rem)",
            color: "#fcd34d",
            letterSpacing: "-0.01em",
            textShadow: "0 0 40px rgba(252,211,77,0.25)",
          }}
        >
          Mains
        </h1>

        <p
          className="font-body mt-5"
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "300px",
            lineHeight: "1.5",
            marginBottom: "32px",
          }}
        >
          Découvrez les lignes de votre paume et les secrets qu'elles révèlent
        </p>
      </div>

      {/* Progress card */}
      <div className="relative z-10 px-6 w-full flex justify-center">
        <div
          className="w-full max-w-sm flex items-center gap-3"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "16px",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(252,211,77,0.12)",
              fontSize: "1.2rem",
            }}
          >
            🤚
          </div>
          <p className="font-body" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", lineHeight: "1.45" }}>
            Tu as fait{" "}
            <span style={{ color: "#fcd34d", fontWeight: 700 }}>{readingsCount}</span>{" "}
            {readingsCount > 1 ? "lectures" : "lecture"} — encore{" "}
            <span style={{ color: "#fcd34d", fontWeight: 700 }}>{remaining}</span> pour débloquer le prochain secret
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 mt-6">
        <button
          onClick={() => setShowHandChoice(true)}
          className="w-full max-w-xs font-body font-semibold uppercase tracking-widest transition-all duration-200 active:scale-95 hover:brightness-110"
          style={{
            padding: "16px 32px",
            borderRadius: "14px",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            background: "#f97316",
            color: "#ffffff",
            border: "1px solid rgba(255,180,120,0.3)",
            boxShadow: "0 0 50px rgba(249,115,22,0.3), 0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          Révèle mes secrets
        </button>
      </div>

      {/* 4 line cards */}
      <div className="relative z-10 px-6 mt-8 w-full flex justify-center">
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {palmLines.map((line) => (
            <button
              key={line.id}
              onClick={() => navigate(line.route)}
              className="flex flex-col items-start gap-2 text-left transition-all duration-200 active:scale-95 hover:brightness-110"
              style={{
                padding: "16px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${line.color}33`,
                backdropFilter: "blur(8px)",
              }}
              aria-label={`Ligne de ${line.label}`}
            >
              <div
                className="rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: line.color,
                  boxShadow: `0 0 12px ${line.color}88`,
                }}
              />
              <span className="font-display font-semibold" style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.92)" }}>
                {line.label}
              </span>
              <span
                className="font-body"
                style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", lineHeight: "1.35" }}
              >
                {line.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <section className="relative z-10 w-full flex flex-col items-center px-6 py-8 mt-4">
        <NewsletterForm />
      </section>

      <HandChoiceDialog open={showHandChoice} onOpenChange={setShowHandChoice} onChoose={handleHandChoice} />

      <LegalFooter />
    </div>
  );
};

export default Index;
