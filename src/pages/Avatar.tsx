import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Check } from "lucide-react";
import StarField from "@/components/StarField";
import AvatarDisplay from "@/components/AvatarDisplay";
import {
  AvatarConfig,
  DEFAULT_AVATAR,
  FREE_HAIR_COLORS,
  FREE_HAIR_STYLES,
  FREE_OUTFITS,
  PREMIUM_HAIR_COLORS,
  PREMIUM_HAIR_STYLES,
  PREMIUM_OUTFITS,
  SKIN_TONES,
  loadAvatar,
  saveAvatar,
  BodyShape,
  HairStyle,
  Outfit,
} from "@/lib/avatar";
import { toast } from "@/hooks/use-toast";

type Tab = "body" | "hair" | "outfit";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "body", label: "Corps", icon: "🧍" },
  { id: "hair", label: "Cheveux", icon: "💇" },
  { id: "outfit", label: "Tenue", icon: "👕" },
];

const bodies: { id: BodyShape; label: string }[] = [
  { id: "slim", label: "Mince" },
  { id: "normal", label: "Normal" },
  { id: "round", label: "Rond" },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-body uppercase mb-3"
    style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)" }}
  >
    {children}
  </p>
);

const PremiumBadge = () => (
  <div
    className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full"
    style={{
      width: "20px",
      height: "20px",
      background: "linear-gradient(135deg, #fcd34d, #f97316)",
      boxShadow: "0 2px 6px rgba(252,211,77,0.5)",
    }}
  >
    <Lock size={10} color="#1a1209" strokeWidth={3} />
  </div>
);

const Avatar = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<AvatarConfig>(loadAvatar() ?? DEFAULT_AVATAR);
  const [activeTab, setActiveTab] = useState<Tab>("body");

  const update = (patch: Partial<AvatarConfig>) => setConfig((c) => ({ ...c, ...patch }));

  const lockedToast = () =>
    toast({
      title: "✨ Réservé aux abonnés",
      description: "Débloque cet item avec l'offre Révélation.",
    });

  const handleSave = () => {
    saveAvatar(config);
    toast({ title: "Avatar sauvegardé", description: "Ton avatar mystique est prêt 🌙" });
    navigate("/");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d0a1a 0%, #130d2e 50%, #0a0a14 100%)" }}
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(120,60,220,0.15) 0%, transparent 60%)" }}
        />
      </div>
      <StarField />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.95)",
          }}
          aria-label="Retour"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display font-semibold" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.95)" }}>
          Mon avatar
        </h1>
        <button
          onClick={handleSave}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "#f97316",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(249,115,22,0.45)",
          }}
          aria-label="Sauvegarder"
        >
          <Check size={18} strokeWidth={3} />
        </button>
      </header>

      {/* Preview */}
      <div className="relative z-10 flex justify-center pt-2 pb-4">
        <div
          className="flex items-end justify-center"
          style={{
            width: "220px",
            height: "300px",
            borderRadius: "24px",
            background: "radial-gradient(ellipse at 50% 30%, rgba(252,211,77,0.12), transparent 70%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <AvatarDisplay config={config} size={200} />
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 px-5">
        <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
          {tabs.map((t) => {
            const active = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all active:scale-95"
                style={{
                  background: active ? "#fcd34d" : "rgba(255,255,255,0.06)",
                  color: active ? "#1a1209" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.1)"}`,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel */}
      <div
        className="relative z-10 flex-1 px-5 pb-8 pt-2 overflow-y-auto"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(15,10,30,0.5))",
        }}
      >
        {activeTab === "body" && (
          <>
            <SectionTitle>Silhouette</SectionTitle>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {bodies.map((b) => {
                const active = config.body === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => update({ body: b.id })}
                    className="py-3 rounded-xl font-body transition-all active:scale-95"
                    style={{
                      background: active ? "rgba(252,211,77,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${active ? "#fcd34d" : "rgba(255,255,255,0.1)"}`,
                      color: active ? "#fcd34d" : "rgba(255,255,255,0.7)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>

            <SectionTitle>Couleur de peau</SectionTitle>
            <div className="grid grid-cols-5 gap-3">
              {SKIN_TONES.map((tone) => {
                const active = config.skin === tone;
                return (
                  <button
                    key={tone}
                    onClick={() => update({ skin: tone })}
                    className="aspect-square rounded-full transition-all active:scale-90"
                    style={{
                      background: tone,
                      border: `2px solid ${active ? "#fcd34d" : "rgba(255,255,255,0.15)"}`,
                      boxShadow: active ? "0 0 12px rgba(252,211,77,0.5)" : "none",
                    }}
                    aria-label={`Teinte ${tone}`}
                  />
                );
              })}
            </div>
          </>
        )}

        {activeTab === "hair" && (
          <>
            <SectionTitle>Coupe</SectionTitle>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {FREE_HAIR_STYLES.map((s) => {
                const active = config.hairStyle === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => update({ hairStyle: s.id })}
                    className="py-3 rounded-xl font-body transition-all active:scale-95"
                    style={{
                      background: active ? "rgba(252,211,77,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${active ? "#fcd34d" : "rgba(255,255,255,0.1)"}`,
                      color: active ? "#fcd34d" : "rgba(255,255,255,0.7)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
              {PREMIUM_HAIR_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={lockedToast}
                  className="relative py-3 rounded-xl font-body transition-all active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px dashed rgba(252,211,77,0.3)",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                  <PremiumBadge />
                </button>
              ))}
            </div>

            <SectionTitle>Couleur</SectionTitle>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {FREE_HAIR_COLORS.map((c) => {
                const active = config.hairColor === c.color;
                return (
                  <button
                    key={c.id}
                    onClick={() => update({ hairColor: c.color })}
                    className="aspect-square rounded-full transition-all active:scale-90"
                    style={{
                      background: c.color,
                      border: `2px solid ${active ? "#fcd34d" : "rgba(255,255,255,0.15)"}`,
                      boxShadow: active ? "0 0 12px rgba(252,211,77,0.5)" : "none",
                    }}
                    aria-label={c.label}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PREMIUM_HAIR_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={lockedToast}
                  className="relative aspect-square rounded-full transition-all active:scale-90"
                  style={{
                    background:
                      c.id === "rainbow"
                        ? "linear-gradient(135deg,#ef4444,#fcd34d,#34d399,#a78bfa)"
                        : c.id === "gradient"
                        ? "linear-gradient(180deg,#fcd34d,#a78bfa)"
                        : c.color,
                    border: "1px dashed rgba(252,211,77,0.4)",
                    opacity: 0.85,
                  }}
                  aria-label={c.label}
                >
                  <PremiumBadge />
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "outfit" && (
          <>
            <SectionTitle>Tenue gratuite</SectionTitle>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {FREE_OUTFITS.map((o) => {
                const active = config.outfit === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => update({ outfit: o.id, outfitColor: o.color })}
                    className="py-3 rounded-xl font-body transition-all active:scale-95"
                    style={{
                      background: active ? "rgba(252,211,77,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${active ? "#fcd34d" : "rgba(255,255,255,0.1)"}`,
                      color: active ? "#fcd34d" : "rgba(255,255,255,0.7)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>

            <SectionTitle>Tenue magique 🔒</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {PREMIUM_OUTFITS.map((o) => (
                <button
                  key={o.id}
                  onClick={lockedToast}
                  className="relative py-3 rounded-xl font-body transition-all active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px dashed rgba(252,211,77,0.3)",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  {o.label}
                  <PremiumBadge />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Avatar;
