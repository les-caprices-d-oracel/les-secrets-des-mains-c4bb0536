import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Gender = "f" | "m";
type TabId = "genre" | "skin" | "hair" | "eyes" | "accessory";

interface Cfg {
  gender: Gender;
  skinColor: string;
  hairColor: string;
  hairStyle: number;
  eyeStyle: number;
  accessory: number;
  lipColor: string;
}

const SKINS = [
  { hex: "#FDDBB4", label: "Clair"    },
  { hex: "#F0C27F", label: "Doré"     },
  { hex: "#C68642", label: "Caramel"  },
  { hex: "#8D5524", label: "Brun"     },
  { hex: "#4A2912", label: "Ébène"    },
  { hex: "#B0E0E6", label: "Fée ✦",   premium: true },
  { hex: "#C8A2C8", label: "Lilas ✦", premium: true },
];

const HAIR_COLORS = [
  { hex: "#1a0a00", label: "Noir"    },
  { hex: "#5C3317", label: "Brun"    },
  { hex: "#D4A017", label: "Blond"   },
  { hex: "#8B0000", label: "Roux"    },
  { hex: "#F5F5F5", label: "Blanc"   },
  { hex: "#6A0DAD", label: "Violet ✦", premium: true },
  { hex: "#00A550", label: "Vert ✦",   premium: true },
  { hex: "#FF69B4", label: "Rose ✦",   premium: true },
  { hex: "#FF8C00", label: "Feu ✦",    premium: true },
];

/* ── SVG AVATAR ─────────────────────────────────────────── */

function WitchSVG({ cfg }: { cfg: Cfg }) {
  const s = cfg.skinColor;
  const h = cfg.hairColor;
  const isPremiumHair = ["#6A0DAD","#00A550","#FF69B4","#FF8C00"].includes(h);

  // Coiffures sorcière (3 gratuites)
  const hairShapes: Record<number, JSX.Element> = {
    0: ( // Long lisse
      <g>
        <ellipse cx="100" cy="95" rx="48" ry="52" fill={h}/>
        <rect x="52" y="100" width="20" height="90" rx="10" fill={h}/>
        <rect x="128" y="100" width="20" height="90" rx="10" fill={h}/>
        <rect x="56" y="95" width="88" height="40" fill={h}/>
      </g>
    ),
    1: ( // Tresses
      <g>
        <ellipse cx="100" cy="95" rx="48" ry="52" fill={h}/>
        <rect x="56" y="95" width="88" height="30" fill={h}/>
        {/* tresse gauche */}
        <path d="M58,120 Q48,140 55,160 Q45,180 52,200 Q42,220 50,240" stroke={h} strokeWidth="14" fill="none" strokeLinecap="round"/>
        {/* tresse droite */}
        <path d="M142,120 Q152,140 145,160 Q155,180 148,200 Q158,220 150,240" stroke={h} strokeWidth="14" fill="none" strokeLinecap="round"/>
        {/* liens */}
        <circle cx="52" cy="200" r="5" fill="#FF69B4"/>
        <circle cx="148" cy="200" r="5" fill="#FF69B4"/>
      </g>
    ),
    2: ( // Chignon avec mèches
      <g>
        <ellipse cx="100" cy="95" rx="48" ry="52" fill={h}/>
        <rect x="56" y="95" width="88" height="25" fill={h}/>
        {/* chignon */}
        <circle cx="100" cy="62" r="22" fill={h}/>
        <circle cx="100" cy="62" r="14" fill={h} opacity="0.8"/>
        {/* mèches */}
        <path d="M60,105 Q50,120 58,135" stroke={h} strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M140,105 Q150,120 142,135" stroke={h} strokeWidth="10" fill="none" strokeLinecap="round"/>
      </g>
    ),
    3: ( // Bouclés premium
      <g>
        {[60,72,84,96,108,120,132].map((x,i) => (
          <circle key={i} cx={x} cy={88+(i%2)*8} r={14} fill={h}/>
        ))}
        <ellipse cx="100" cy="100" rx="46" ry="45" fill={h}/>
        <rect x="56" y="100" width="88" height="20" fill={h}/>
        <circle cx="58" cy="130" r="12" fill={h}/>
        <circle cx="58" cy="155" r="10" fill={h}/>
        <circle cx="142" cy="130" r="12" fill={h}/>
        <circle cx="142" cy="155" r="10" fill={h}/>
      </g>
    ),
    4: ( // Half-up premium
      <g>
        <ellipse cx="100" cy="95" rx="48" ry="52" fill={h}/>
        <rect x="56" y="95" width="88" height="90" fill={h}/>
        <path d="M52,130 Q40,160 48,200" stroke={h} strokeWidth="18" fill="none" strokeLinecap="round"/>
        <path d="M148,130 Q160,160 152,200" stroke={h} strokeWidth="18" fill="none" strokeLinecap="round"/>
        {/* demi-queue */}
        <ellipse cx="100" cy="70" rx="30" ry="12" fill={h}/>
        <rect x="94" y="58" width="12" height="30" rx="6" fill={h}/>
        <circle cx="100" cy="58" r="7" fill="#FF8C00"/>
      </g>
    ),
  };

  // Coiffures sorcier
  const hairShapesM: Record<number, JSX.Element> = {
    0: (
      <g>
        <ellipse cx="100" cy="92" rx="48" ry="50" fill={h}/>
        <rect x="56" y="95" width="88" height="20" fill={h}/>
        <path d="M55,110 Q50,130 58,150" stroke={h} strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M145,110 Q150,130 142,150" stroke={h} strokeWidth="10" fill="none" strokeLinecap="round"/>
      </g>
    ),
    1: (
      <g>
        <ellipse cx="100" cy="92" rx="48" ry="50" fill={h}/>
        <rect x="56" y="95" width="88" height="15" fill={h}/>
        {/* dégradé côtés */}
        <rect x="52" y="100" width="16" height="40" rx="8" fill={h} opacity="0.6"/>
        <rect x="132" y="100" width="16" height="40" rx="8" fill={h} opacity="0.6"/>
      </g>
    ),
    2: (
      <g>
        <ellipse cx="100" cy="92" rx="48" ry="50" fill={h}/>
        <rect x="56" y="95" width="88" height="80" fill={h}/>
        <path d="M56,110 Q44,150 52,190" stroke={h} strokeWidth="16" fill="none" strokeLinecap="round"/>
        <path d="M144,110 Q156,150 148,190" stroke={h} strokeWidth="16" fill="none" strokeLinecap="round"/>
      </g>
    ),
    3: (
      <g>
        {/* Mohawk */}
        <ellipse cx="100" cy="98" rx="46" ry="48" fill={h} opacity="0.4"/>
        <rect x="56" y="100" width="88" height="10" fill={h} opacity="0.4"/>
        <path d="M85,95 Q88,40 100,25 Q112,40 115,95" fill={h}/>
      </g>
    ),
    4: (
      <g>
        <ellipse cx="100" cy="92" rx="48" ry="50" fill={h}/>
        <rect x="56" y="95" width="88" height="70" fill={h}/>
        <path d="M56,110 Q40,155 48,200" stroke={h} strokeWidth="20" fill="none" strokeLinecap="round"/>
        <path d="M144,110 Q160,155 152,200" stroke={h} strokeWidth="20" fill="none" strokeLinecap="round"/>
      </g>
    ),
  };

  const hairMap = cfg.gender === "f" ? hairShapes : hairShapesM;

  // Yeux
  const eyes: Record<number, JSX.Element> = {
    0: ( // Grands yeux étoilés
      <g>
        <ellipse cx="82" cy="118" rx="11" ry="13" fill="white"/>
        <ellipse cx="118" cy="118" rx="11" ry="13" fill="white"/>
        <circle cx="82" cy="119" r="7" fill="#1a0a00"/>
        <circle cx="118" cy="119" r="7" fill="#1a0a00"/>
        <circle cx="85" cy="116" r="2.5" fill="white"/>
        <circle cx="121" cy="116" r="2.5" fill="white"/>
        {/* cils */}
        <path d="M71,107 Q74,103 78,107" stroke="#1a0a00" strokeWidth="1.5" fill="none"/>
        <path d="M122,107 Q126,103 129,107" stroke="#1a0a00" strokeWidth="1.5" fill="none"/>
      </g>
    ),
    1: ( // Yeux amande + liner
      <g>
        <path d="M70,117 Q82,108 94,117 Q82,126 70,117Z" fill="white"/>
        <path d="M106,117 Q118,108 130,117 Q118,126 106,117Z" fill="white"/>
        <circle cx="82" cy="117" r="6" fill="#2C1810"/>
        <circle cx="118" cy="117" r="6" fill="#2C1810"/>
        <circle cx="84" cy="115" r="2" fill="white"/>
        <circle cx="120" cy="115" r="2" fill="white"/>
        <path d="M70,117 Q82,108 94,117" stroke="#1a0a00" strokeWidth="2" fill="none"/>
        <path d="M106,117 Q118,108 130,117" stroke="#1a0a00" strokeWidth="2" fill="none"/>
        {/* liner */}
        <path d="M70,117 Q65,112 68,108" stroke="#1a0a00" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M130,117 Q135,112 132,108" stroke="#1a0a00" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
    ),
    2: ( // Yeux chat
      <g>
        <path d="M70,118 Q82,106 94,118 Q82,124 70,118Z" fill="white"/>
        <path d="M106,118 Q118,106 130,118 Q118,124 106,118Z" fill="white"/>
        <ellipse cx="82" cy="117" rx="4" ry="7" fill="#1a0a00"/>
        <ellipse cx="118" cy="117" rx="4" ry="7" fill="#1a0a00"/>
        <circle cx="83" cy="114" r="1.5" fill="white"/>
        <circle cx="119" cy="114" r="1.5" fill="white"/>
        <path d="M92,112 Q98,108 104,112" stroke="#1a0a00" strokeWidth="1.5" fill="none"/>
      </g>
    ),
  };

  // Accessoires
  const accessories: Record<number, JSX.Element> = {
    0: ( // Chapeau de sorcière
      <g>
        <ellipse cx="100" cy="73" rx="42" ry="8" fill="#1a0a2e"/>
        <path d="M72,73 L85,10 Q100,0 115,10 L128,73Z" fill="#1a0a2e"/>
        <path d="M72,73 Q100,68 128,73" stroke="#6A0DAD" strokeWidth="3" fill="none"/>
        {/* boucle */}
        <rect x="92" y="55" width="16" height="10" rx="3" fill="#FF8C00"/>
        <rect x="95" y="58" width="10" height="4" rx="2" fill="#1a0a2e"/>
        {/* étoiles sur chapeau */}
        <text x="90" y="45" fontSize="8" fill="#fcd34d">✦</text>
        <text x="105" y="38" fontSize="6" fill="#fcd34d">✦</text>
      </g>
    ),
    1: ( // Couronne d'épines magiques
      <g>
        {[72,82,92,100,108,118,128].map((x,i) => (
          <path key={i} d={`M${x},82 L${x+(i%2===0?-3:3)},65 L${x+6},82`} fill="#6A0DAD" opacity="0.9"/>
        ))}
        <rect x="70" y="78" width="60" height="8" rx="4" fill="#6A0DAD"/>
        <circle cx="100" cy="74" r="5" fill="#FF69B4"/>
        <circle cx="82" cy="75" r="3" fill="#fcd34d"/>
        <circle cx="118" cy="75" r="3" fill="#fcd34d"/>
      </g>
    ),
    2: ( // Oreilles de chat halloween
      <g>
        <path d="M60,95 L52,65 L78,85Z" fill="#1a0a2e"/>
        <path d="M140,95 L148,65 L122,85Z" fill="#1a0a2e"/>
        <path d="M62,92 L56,70 L76,86Z" fill="#6A0DAD" opacity="0.7"/>
        <path d="M138,92 L144,70 L124,86Z" fill="#6A0DAD" opacity="0.7"/>
      </g>
    ),
    3: ( // Diadème premium
      <g>
        <path d="M65,88 Q100,68 135,88" stroke="#fcd34d" strokeWidth="3" fill="none"/>
        <circle cx="100" cy="72" r="7" fill="#FF8C00"/>
        <circle cx="78" cy="80" r="4" fill="#6A0DAD"/>
        <circle cx="122" cy="80" r="4" fill="#6A0DAD"/>
        <path d="M65,88 L65,93" stroke="#fcd34d" strokeWidth="3"/>
        <path d="M135,88 L135,93" stroke="#fcd34d" strokeWidth="3"/>
      </g>
    ),
    4: ( // Chapeau haut-de-forme premium
      <g>
        <ellipse cx="100" cy="78" rx="38" ry="7" fill="#0a0a0a"/>
        <rect x="72" y="20" width="56" height="60" rx="4" fill="#0a0a0a"/>
        <rect x="68" y="74" width="64" height="8" rx="3" fill="#0a0a0a"/>
        <rect x="76" y="50" width="48" height="8" fill="#FF8C00" opacity="0.8"/>
        <text x="86" y="45" fontSize="10" fill="#fcd34d">🕷</text>
      </g>
    ),
  };

  // Bouche
  const mouths: Record<string, JSX.Element> = {
    smile: <path d="M86,140 Q100,152 114,140" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    smirk: <path d="M88,140 Q100,148 112,138" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
  };

  const isPremiumAcc = cfg.accessory >= 3;
  const isPremiumEye = cfg.eyeStyle >= 3;
  const isPremiumHairStyle = cfg.hairStyle >= 3;

  return (
    <svg viewBox="0 0 200 280" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Dégradé corps */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#6A0DAD" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="skinGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={s} stopOpacity="1"/>
          <stop offset="100%" stopColor={s} stopOpacity="0.85"/>
        </radialGradient>
      </defs>

      {/* Aura magique */}
      <ellipse cx="100" cy="140" rx="90" ry="120" fill="url(#glow)"/>

      {/* Corps / robe */}
      {cfg.gender === "f" ? (
        <g>
          {/* Robe */}
          <path d="M60,185 Q40,220 30,280 L170,280 Q160,220 140,185 Q120,175 100,175 Q80,175 60,185Z"
            fill="#1a0a2e"/>
          {/* détails robe */}
          <path d="M100,175 L90,280" stroke="#6A0DAD" strokeWidth="1" opacity="0.4"/>
          <path d="M100,175 L110,280" stroke="#6A0DAD" strokeWidth="1" opacity="0.4"/>
          <path d="M55,200 Q100,195 145,200" stroke="#6A0DAD" strokeWidth="1.5" opacity="0.5" fill="none"/>
          {/* étoiles robe */}
          <text x="70" y="230" fontSize="10" opacity="0.6">✦</text>
          <text x="118" y="245" fontSize="8" opacity="0.5">✦</text>
          {/* col */}
          <path d="M75,185 Q100,192 125,185 Q115,175 100,173 Q85,175 75,185Z" fill="#2a1040"/>
        </g>
      ) : (
        <g>
          {/* Cape */}
          <path d="M65,182 Q40,215 35,280 L165,280 Q160,215 135,182 Q118,172 100,172 Q82,172 65,182Z"
            fill="#0d0d1a"/>
          <path d="M65,182 Q55,220 40,280 L35,280" fill="#1a0a2e" opacity="0.8"/>
          <path d="M135,182 Q145,220 160,280 L165,280" fill="#1a0a2e" opacity="0.8"/>
          {/* chemise */}
          <path d="M78,184 Q100,190 122,184 L118,172 Q100,168 82,172Z" fill="#f5f0e6"/>
          {/* cravate */}
          <path d="M97,185 L100,205 L103,185Z" fill="#8B0000"/>
        </g>
      )}

      {/* Cou */}
      <rect x="90" y="160" width="20" height="28" rx="8" fill={s}/>

      {/* Cheveux (derrière) */}
      {hairMap[cfg.hairStyle] || hairMap[0]}

      {/* Visage */}
      <ellipse cx="100" cy="122" rx="44" ry="48" fill="url(#skinGrad)"/>

      {/* Joues */}
      <ellipse cx="74" cy="132" rx="10" ry="7" fill="#FFB6C1" opacity="0.5"/>
      <ellipse cx="126" cy="132" rx="10" ry="7" fill="#FFB6C1" opacity="0.5"/>

      {/* Yeux */}
      {eyes[cfg.eyeStyle] || eyes[0]}

      {/* Sourcils */}
      <path d="M71,106 Q82,101 93,106" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M107,106 Q118,101 129,106" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* Nez */}
      <path d="M98,125 Q96,132 100,134 Q104,132 102,125" stroke={s === "#FDDBB4" ? "#e8b89a" : "#8D5524"} strokeWidth="1.5" fill="none"/>

      {/* Bouche */}
      {mouths.smile}

      {/* Accessoire */}
      {accessories[cfg.accessory] || accessories[0]}

      {/* Petites étoiles décoratives */}
      <text x="22" y="110" fontSize="12" opacity="0.4" fill="#fcd34d">✦</text>
      <text x="165" y="95" fontSize="9" opacity="0.3" fill="#fcd34d">✦</text>
      <text x="30" y="160" fontSize="7" opacity="0.25" fill="#6A0DAD">✦</text>
    </svg>
  );
}

/* ── LOCK ───────────────────────────────────────────────── */
const Lock = () => (
  <div style={{
    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", borderRadius: "inherit",
    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(3px)"
  }}>
    <span style={{ fontSize: "1.1rem" }}>🔒</span>
    <span style={{ fontSize: "0.42rem", color: "#fcd34d", marginTop: 2, letterSpacing: "0.1em" }}>PREMIUM</span>
  </div>
);

/* ── MAIN ───────────────────────────────────────────────── */
export default function Avatar() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("genre");
  const [saved, setSaved] = useState(false);
  const [cfg, setCfg] = useState<Cfg>({
    gender:     "f",
    skinColor:  "#FDDBB4",
    hairColor:  "#1a0a00",
    hairStyle:  0,
    eyeStyle:   0,
    accessory:  0,
    lipColor:   "#e07070",
  });

  const tabs: { id: TabId; emoji: string; label: string }[] = [
    { id: "genre",     emoji: "🧙", label: "Genre"     },
    { id: "skin",      emoji: "✋", label: "Peau"      },
    { id: "hair",      emoji: "💇", label: "Cheveux"   },
    { id: "eyes",      emoji: "👁",  label: "Yeux"      },
    { id: "accessory", emoji: "🎩", label: "Accessoire"},
  ];

  const hairLabelsF = ["Long lisse","Tresses","Chignon","Bouclés ✦","Half-up ✦"];
  const hairLabelsM = ["Court","Dégradé","Long","Mohawk ✦","Fluide ✦"];
  const eyeLabels   = ["Étoilés","Amande","Chat","✦ Magie","✦ Feu"];
  const accLabels   = ["Chapeau","Couronne","Oreilles chat","✦ Diadème","✦ Top hat"];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      background: "linear-gradient(160deg,#0d0a1a 0%,#130d2e 60%,#0a0a14 100%)",
      color: "white", fontFamily: "sans-serif", overflowX: "hidden"
    }}>
      {/* Étoiles fond */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: (Math.random() * 2 + 1) + "px",
            height: (Math.random() * 2 + 1) + "px",
            borderRadius: "50%", background: "white",
            opacity: Math.random() * 0.5 + 0.1,
            left: (Math.random() * 100) + "%",
            top: (Math.random() * 100) + "%",
          }}/>
        ))}
      </div>

      {/* HEADER */}
      <header style={{
        position: "relative", zIndex: 10, width: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 20px 8px"
      }}>
        <button onClick={() => navigate("/")} style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: "1rem"
        }}>←</button>
        <h1 style={{
          fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.08em",
          background: "linear-gradient(90deg,#c084fc,#f472b6,#fb923c)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          {cfg.gender === "f" ? "✦ Crée ta Sorcière ✦" : "✦ Crée ton Sorcier ✦"}
        </h1>
        <div style={{ width: 38 }}/>
      </header>

      {/* PREVIEW AVATAR */}
      <div style={{ position: "relative", zIndex: 10, width: 200, height: 240, margin: "8px auto" }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: 24,
          border: "1.5px solid rgba(160,80,255,0.4)",
          boxShadow: "0 0 40px rgba(120,60,220,0.25), 0 0 80px rgba(120,60,220,0.1)",
          background: "rgba(255,255,255,0.02)", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <WitchSVG cfg={cfg}/>
        </div>
        {/* Badge genre */}
        <div style={{
          position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
          background: "rgba(120,60,220,0.9)", borderRadius: 20,
          padding: "4px 14px", fontSize: "0.6rem", letterSpacing: "0.1em",
          border: "1px solid rgba(200,150,255,0.3)", whiteSpace: "nowrap"
        }}>
          {cfg.gender === "f" ? "🧙‍♀️ Sorcière" : "🧙‍♂️ Sorcier"}
        </div>
      </div>

      {/* TABS */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", gap: 6, margin: "18px 12px 10px", flexWrap: "wrap", justifyContent: "center" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "7px 10px", borderRadius: 12, cursor: "pointer",
            background: tab === t.id ? "rgba(120,60,220,0.4)" : "rgba(255,255,255,0.05)",
            border: `1.5px solid ${tab === t.id ? "rgba(160,80,255,0.8)" : "rgba(255,255,255,0.08)"}`,
            color: tab === t.id ? "white" : "rgba(255,255,255,0.4)",
            fontSize: "0.52rem", minWidth: 55,
            boxShadow: tab === t.id ? "0 0 12px rgba(120,60,220,0.3)" : "none",
            transition: "all 0.2s"
          }}>
            <span style={{ fontSize: "1rem", marginBottom: 2 }}>{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* PANELS */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 380, padding: "0 16px 120px", overflowY: "auto", flex: 1 }}>

        {/* GENRE */}
        {tab === "genre" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 8 }}>
            <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Quel personnage veux-tu créer ?
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {([
                { id: "f" as Gender, emoji: "🧙‍♀️", label: "Sorcière", desc: "Mystérieuse & puissante" },
                { id: "m" as Gender, emoji: "🧙‍♂️", label: "Sorcier",  desc: "Sage & redoutable" },
              ]).map(g => (
                <button key={g.id} onClick={() => setCfg(c => ({ ...c, gender: g.id, hairStyle: 0 }))}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                    padding: "20px 24px", borderRadius: 20, cursor: "pointer",
                    background: cfg.gender === g.id ? "rgba(120,60,220,0.4)" : "rgba(255,255,255,0.04)",
                    border: `2px solid ${cfg.gender === g.id ? "rgba(200,120,255,0.8)" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: cfg.gender === g.id ? "0 0 30px rgba(120,60,220,0.35)" : "none",
                    transition: "all 0.25s"
                  }}>
                  <span style={{ fontSize: "3.2rem" }}>{g.emoji}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800 }}>{g.label}</span>
                  <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 90 }}>{g.desc}</span>
                </button>
              ))}
            </div>
            <p style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", textAlign: "center", lineHeight: 1.7 }}>
              Tu pourras tout personnaliser ensuite 🎨
            </p>
          </div>
        )}

        {/* PEAU */}
        {tab === "skin" && (
          <div>
            <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14, textAlign: "center" }}>Teinte de peau</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {SKINS.map((s, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <button onClick={() => !(s as any).premium && setCfg(c => ({ ...c, skinColor: s.hex }))}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, background: "none", border: "none", cursor: (s as any).premium ? "default" : "pointer" }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "50%", background: s.hex,
                      border: `3px solid ${cfg.skinColor === s.hex ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.12)"}`,
                      boxShadow: cfg.skinColor === s.hex ? `0 0 16px ${s.hex}` : "none",
                      transition: "all 0.2s"
                    }}/>
                    <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
                  </button>
                  {(s as any).premium && <Lock/>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHEVEUX */}
        {tab === "hair" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Styles */}
            <div>
              <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14, textAlign: "center" }}>Coupe</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {(cfg.gender === "f" ? hairLabelsF : hairLabelsM).map((label, i) => {
                  const isPrem = i >= 3;
                  return (
                    <button key={i} onClick={() => !isPrem && setCfg(c => ({ ...c, hairStyle: i }))}
                      style={{
                        position: "relative", padding: "10px 14px", borderRadius: 12, cursor: isPrem ? "default" : "pointer",
                        background: cfg.hairStyle === i ? "rgba(120,60,220,0.4)" : "rgba(255,255,255,0.04)",
                        border: `2px solid ${cfg.hairStyle === i ? "rgba(160,80,255,0.7)" : "rgba(255,255,255,0.07)"}`,
                        fontSize: "0.65rem", color: "white", overflow: "hidden", minWidth: 80
                      }}>
                      {label}
                      {isPrem && <Lock/>}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Couleurs */}
            <div>
              <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14, textAlign: "center" }}>Couleur</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {HAIR_COLORS.map((c, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <button onClick={() => !(c as any).premium && setCfg(cfg => ({ ...cfg, hairColor: c.hex }))}
                      title={c.label}
                      style={{
                        width: 42, height: 42, borderRadius: "50%", background: c.hex,
                        border: `3px solid ${cfg.hairColor === c.hex ? "white" : "rgba(255,255,255,0.1)"}`,
                        display: "block", cursor: (c as any).premium ? "default" : "pointer",
                        boxShadow: cfg.hairColor === c.hex ? `0 0 14px ${c.hex}` : "none",
                        transition: "all 0.2s"
                      }}/>
                    {(c as any).premium && (
                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>🔒</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* YEUX */}
        {tab === "eyes" && (
          <div>
            <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14, textAlign: "center" }}>Style des yeux</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {eyeLabels.map((label, i) => {
                const isPrem = i >= 3;
                return (
                  <button key={i} onClick={() => !isPrem && setCfg(c => ({ ...c, eyeStyle: i }))}
                    style={{
                      position: "relative", padding: "10px 16px", borderRadius: 12, cursor: isPrem ? "default" : "pointer",
                      background: cfg.eyeStyle === i ? "rgba(120,60,220,0.4)" : "rgba(255,255,255,0.04)",
                      border: `2px solid ${cfg.eyeStyle === i ? "rgba(160,80,255,0.7)" : "rgba(255,255,255,0.07)"}`,
                      fontSize: "0.65rem", color: "white", overflow: "hidden", minWidth: 90
                    }}>
                    {label}
                    {isPrem && <Lock/>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ACCESSOIRES */}
        {tab === "accessory" && (
          <div>
            <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14, textAlign: "center" }}>Accessoire magique</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {accLabels.map((label, i) => {
                const isPrem = i >= 3;
                return (
                  <button key={i} onClick={() => !isPrem && setCfg(c => ({ ...c, accessory: i }))}
                    style={{
                      position: "relative", padding: "10px 16px", borderRadius: 12, cursor: isPrem ? "default" : "pointer",
                      background: cfg.accessory === i ? "rgba(120,60,220,0.4)" : "rgba(255,255,255,0.04)",
                      border: `2px solid ${cfg.accessory === i ? "rgba(160,80,255,0.7)" : "rgba(255,255,255,0.07)"}`,
                      fontSize: "0.65rem", color: "white", overflow: "hidden", minWidth: 110
                    }}>
                    {label}
                    {isPrem && <Lock/>}
                  </button>
                );
              })}
            </div>

            {/* CTA Premium */}
            <div style={{
              marginTop: 24, padding: 20, borderRadius: 16, textAlign: "center",
              background: "linear-gradient(135deg, rgba(120,60,220,0.2), rgba(244,114,182,0.15))",
              border: "1px solid rgba(200,100,255,0.25)"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>✨</div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 6 }}>Débloque tout avec Premium</p>
              <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.45)", marginBottom: 14, lineHeight: 1.6 }}>
                Accède à toutes les coiffures, couleurs magiques, accessoires exclusifs et poses spéciales
              </p>
              <button onClick={() => navigate("/lectures")} style={{
                padding: "12px 24px", borderRadius: 12, fontSize: "0.68rem",
                background: "linear-gradient(90deg,#7c3aed,#ec4899)",
                color: "white", border: "none", cursor: "pointer",
                fontWeight: 700, letterSpacing: "0.05em",
                boxShadow: "0 4px 20px rgba(120,60,220,0.4)"
              }}>
                ✦ Devenir Abonné·e
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SAVE */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
        display: "flex", justifyContent: "center", padding: "16px 20px 28px",
        background: "linear-gradient(to top, rgba(13,10,26,1) 60%, transparent)"
      }}>
        <button onClick={() => { (window as any).__avatarConfig = cfg; setSaved(true); setTimeout(() => navigate("/"), 1200); }}
          style={{
            width: "100%", maxWidth: 320, padding: "16px", borderRadius: 14,
            fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700,
            textTransform: "uppercase", cursor: "pointer",
            background: saved
              ? "linear-gradient(90deg,#10b981,#059669)"
              : "linear-gradient(90deg,#7c3aed,#ec4899)",
            color: "white", border: "none",
            boxShadow: saved
              ? "0 0 30px rgba(16,185,129,0.4)"
              : "0 0 30px rgba(120,60,220,0.4), 0 8px 24px rgba(0,0,0,0.5)",
            transition: "all 0.3s"
          }}>
          {saved ? "✓ Sauvegardé !" : "Sauvegarder mon avatar ✦"}
        </button>
      </div>
    </div>
  );
}