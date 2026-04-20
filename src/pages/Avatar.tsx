import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { saveAvatar, DEFAULT_AVATAR } from "@/lib/avatar";

const HAIR_STYLES = [
  { id: "short01",  label: "Court",   premium: false },
  { id: "long01",   label: "Long",    premium: false },
  { id: "bun",      label: "Chignon", premium: false },
  { id: "wavy01",   label: "Ondule",  premium: true  },
  { id: "curly01",  label: "Boucle",  premium: true  },
  { id: "long02",   label: "Tresses", premium: true  },
  { id: "pixie",    label: "Pixie",   premium: true  },
  { id: "mohawk",   label: "Crete",   premium: true  },
];

const HAIR_COLORS = [
  { id: "0e0e0e", label: "Noir",      premium: false },
  { id: "6a4e35", label: "Brun",      premium: false },
  { id: "e8c170", label: "Blond",     premium: false },
  { id: "a0522d", label: "Roux",      premium: false },
  { id: "f5f0e6", label: "Blanc",     premium: false },
  { id: "9a9a9a", label: "Gris",      premium: false },
  { id: "1e2a52", label: "Bleu nuit", premium: false },
  { id: "3d1a5c", label: "Violet",    premium: false },
  { id: "10b981", label: "Vert",      premium: true  },
  { id: "ec4899", label: "Rose",      premium: true  },
  { id: "06b6d4", label: "Cyan",      premium: true  },
  { id: "f59e0b", label: "Or",        premium: true  },
];

const SKIN_OPTIONS = [
  { id: "f2d3b1", label: "Tres clair" },
  { id: "edb98a", label: "Clair"      },
  { id: "d08b5b", label: "Caramel"    },
  { id: "ae5d29", label: "Brun clair" },
  { id: "694d3d", label: "Brun"       },
  { id: "3d2314", label: "Ebene"      },
];

const FEATURES = [
  { id: "birthmark",  label: "Grain beaute",    premium: false },
  { id: "blush",      label: "Joues rosees",    premium: false },
  { id: "freckles01", label: "Taches rousseur", premium: true  },
  { id: "glasses",    label: "Lunettes",        premium: true  },
];

type TabId = "skin" | "hair" | "features" | "accessories";

interface DiceBearConfig {
  seed: string;
  hair: string;
  hairColor: string;
  skinColor: string;
  features: string[];
}

const buildUrl = (cfg: DiceBearConfig, size = 200) => {
  const p = new URLSearchParams({
    seed: cfg.seed,
    hair: cfg.hair,
    hairColor: cfg.hairColor,
    skinColor: cfg.skinColor,
    size: String(size),
    backgroundColor: "transparent",
    radius: "50",
  });
  if (cfg.features.length > 0) p.set("features", cfg.features.join(","));
  return `https://api.dicebear.com/9.x/adventurer/svg?${p.toString()}`;
};

const Lock = () => (
  <div className="absolute inset-0 flex items-center justify-center rounded-xl"
    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}>
    <span style={{ fontSize: "1rem" }}>🔒</span>
  </div>
);

const SectionTitle = ({ text, premium }: { text: string; premium?: boolean }) => (
  <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", marginBottom: 10,
    textTransform: "uppercase", letterSpacing: "0.12em" }}>
    {text} {premium && <span style={{ color: "#fcd34d", fontSize: "0.6rem" }}>✦ PREMIUM</span>}
  </p>
);

const Avatar = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("skin");
  const [saved, setSaved] = useState(false);
  const [cfg, setCfg] = useState<DiceBearConfig>({
    seed: "mon-avatar",
    hair: "short01",
    hairColor: "0e0e0e",
    skinColor: "f2d3b1",
    features: ["blush"],
  });

  const tabs: { id: TabId; emoji: string; label: string }[] = [
    { id: "skin",        emoji: "✋", label: "Peau"        },
    { id: "hair",        emoji: "💇", label: "Cheveux"     },
    { id: "features",    emoji: "✨", label: "Details"     },
    { id: "accessories", emoji: "🎩", label: "Accessoires" },
  ];

  const handleSave = () => {
    saveAvatar({ ...DEFAULT_AVATAR, skin: "#" + cfg.skinColor, hairColor: "#" + cfg.hairColor });
    (window as any).__dicebearConfig = cfg;
    setSaved(true);
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg,#0d0a1a 0%,#130d2e 50%,#0a0a14 100%)" }}>
      <StarField />

      {/* Header */}
      <header className="relative z-20 w-full flex items-center justify-between px-5 pt-5 pb-2">
        <button onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
          </svg>
        </button>
        <h1 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>Mon Avatar</h1>
        <div style={{ width: 40 }}/>
      </header>

      {/* Preview */}
      <div className="relative z-10 my-4 flex flex-col items-center gap-2">
        <div style={{ width: 140, height: 140, borderRadius: "50%",
          border: "2px solid rgba(120,60,220,0.5)",
          boxShadow: "0 0 30px rgba(120,60,220,0.2)",
          background: "rgba(255,255,255,0.04)", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={buildUrl(cfg)} alt="Avatar" width={140} height={140}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        <input value={cfg.seed} onChange={(e) => setCfg(c => ({ ...c, seed: e.target.value }))}
          placeholder="Ton nom..."
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px", padding: "6px 14px", color: "rgba(255,255,255,0.8)",
            fontSize: "0.8rem", outline: "none", width: 160, textAlign: "center" }}/>
        <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)" }}>
          Change le nom pour un nouvel avatar
        </p>
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex gap-2 mb-4">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex flex-col items-center px-3 py-2 rounded-xl transition-all"
            style={{ background: tab === t.id ? "rgba(120,60,220,0.35)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${tab === t.id ? "rgba(120,60,220,0.7)" : "rgba(255,255,255,0.08)"}`,
              color: tab === t.id ? "white" : "rgba(255,255,255,0.4)",
              fontSize: "0.6rem", minWidth: 58 }}>
            <span style={{ fontSize: "1.1rem" }}>{t.emoji}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xs px-4 pb-32 overflow-y-auto flex-1">

        {tab === "skin" && (
          <div>
            <SectionTitle text="Teinte de peau"/>
            <div className="flex flex-wrap gap-3 justify-center">
              {SKIN_OPTIONS.map((s) => (
                <button key={s.id} onClick={() => setCfg(c => ({ ...c, skinColor: s.id }))}
                  className="flex flex-col items-center gap-1 transition-all active:scale-90">
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#" + s.id,
                    border: `3px solid ${cfg.skinColor === s.id ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.15)"}`,
                    boxShadow: cfg.skinColor === s.id ? `0 0 12px #${s.id}88` : "none" }}/>
                  <span style={{ fontSize: "0.56rem", color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "hair" && (
          <div className="flex flex-col gap-5">
            <div>
              <SectionTitle text="Coupe"/>
              <div className="flex flex-wrap gap-2 justify-center">
                {HAIR_STYLES.map((h) => (
                  <button key={h.id}
                    onClick={() => !h.premium && setCfg(c => ({ ...c, hair: h.id }))}
                    className="relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                    style={{ background: cfg.hair === h.id ? "rgba(120,60,220,0.35)" : "rgba(255,255,255,0.04)",
                      border: `2px solid ${cfg.hair === h.id ? "rgba(120,60,220,0.7)" : "rgba(255,255,255,0.07)"}`,
                      minWidth: 64 }}>
                    <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=prev&hair=${h.id}&skinColor=${cfg.skinColor}&hairColor=${cfg.hairColor}&size=56&backgroundColor=transparent`}
                      alt={h.label} width={56} height={56}
                      style={{ borderRadius: "50%", background: "rgba(255,255,255,0.04)" }}/>
                    <span style={{ fontSize: "0.56rem", color: "rgba(255,255,255,0.5)" }}>{h.label}</span>
                    {h.premium && <Lock/>}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle text="Couleur"/>
              <div className="flex flex-wrap gap-2 justify-center">
                {HAIR_COLORS.map((c) => (
                  <div key={c.id} className="relative">
                    <button onClick={() => !c.premium && setCfg(cfg => ({ ...cfg, hairColor: c.id }))}
                      style={{ width: 38, height: 38, borderRadius: "50%", background: "#" + c.id,
                        border: `3px solid ${cfg.hairColor === c.id ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.12)"}`,
                        opacity: c.premium ? 0.5 : 1,
                        boxShadow: cfg.hairColor === c.id ? `0 0 10px #${c.id}88` : "none" }}/>
                    {c.premium && (
                      <div className="absolute inset-0 flex items-center justify-center"
                        style={{ borderRadius: "50%", background: "rgba(0,0,0,0.45)", fontSize: "0.65rem" }}>🔒</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "features" && (
          <div>
            <SectionTitle text="Details du visage"/>
            <div className="flex flex-wrap gap-2 justify-center">
              {FEATURES.map((f) => {
                const active = cfg.features.includes(f.id);
                return (
                  <button key={f.id}
                    onClick={() => { if (f.premium) return;
                      setCfg(c => ({ ...c, features: active ? c.features.filter(x => x !== f.id) : [...c.features, f.id] })); }}
                    className="relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                    style={{ background: active ? "rgba(120,60,220,0.35)" : "rgba(255,255,255,0.04)",
                      border: `2px solid ${active ? "rgba(120,60,220,0.7)" : "rgba(255,255,255,0.07)"}`, minWidth: 72 }}>
                    <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=prev&skinColor=${cfg.skinColor}&hairColor=${cfg.hairColor}&hair=${cfg.hair}&features=${f.id}&size=64&backgroundColor=transparent`}
                      alt={f.label} width={64} height={64}
                      style={{ borderRadius: "50%", background: "rgba(255,255,255,0.04)" }}/>
                    <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.5)" }}>{f.label}</span>
                    {f.premium && <Lock/>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {tab === "accessories" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <span style={{ fontSize: "3rem" }}>🔒</span>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 220, lineHeight: 1.6 }}>
              Debloque les accessoires magiques avec l'abonnement Premium
            </p>
            <button onClick={() => navigate("/lectures")}
              className="font-semibold transition-all active:scale-95"
              style={{ padding: "14px 28px", borderRadius: "14px", fontSize: "0.75rem",
                background: "rgba(252,211,77,0.15)", border: "1px solid rgba(252,211,77,0.35)",
                color: "#fcd34d", letterSpacing: "0.05em" }}>
              ✦ Debloquer Premium
            </button>
          </div>
        )}
      </div>

      {/* Save */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center px-5 pb-6 pt-4"
        style={{ background: "linear-gradient(to top, rgba(13,10,26,0.98) 70%, transparent)" }}>
        <button onClick={handleSave}
          className="w-full max-w-xs font-semibold uppercase tracking-widest transition-all active:scale-95"
          style={{ padding: "16px", borderRadius: "14px", fontSize: "0.72rem", letterSpacing: "0.18em",
            background: saved ? "rgba(16,185,129,0.9)" : "rgba(120,60,220,0.9)", color: "white",
            border: "1px solid rgba(180,120,255,0.3)",
            boxShadow: "0 0 40px rgba(120,60,220,0.25), 0 8px 24px rgba(0,0,0,0.5)" }}>
          {saved ? "✓ Sauvegarde !" : "Sauvegarder mon avatar"}
        </button>
      </div>
    </div>
  );
};

export default Avatar;