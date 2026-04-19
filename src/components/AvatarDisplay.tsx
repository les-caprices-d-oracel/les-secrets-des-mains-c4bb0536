import { AvatarConfig, BodyShape, HairStyle, Outfit } from "@/lib/avatar";

interface Props {
  config: AvatarConfig;
  size?: number;
}

const bodyWidth: Record<BodyShape, number> = { slim: 70, normal: 90, round: 110 };

const Hair = ({ style, color }: { style: HairStyle; color: string }) => {
  switch (style) {
    case "bald":
      return null;
    case "buzz":
      return <ellipse cx="100" cy="62" rx="38" ry="22" fill={color} opacity="0.7" />;
    case "short":
      return <path d="M60,75 Q60,40 100,38 Q140,40 140,75 Q140,55 100,52 Q60,55 60,75 Z" fill={color} />;
    case "long":
      return (
        <>
          <path d="M58,72 Q58,38 100,36 Q142,38 142,72 L150,170 Q125,180 100,180 Q75,180 50,170 Z" fill={color} />
          <ellipse cx="100" cy="55" rx="42" ry="22" fill={color} />
        </>
      );
    case "bun":
      return (
        <>
          <circle cx="100" cy="32" r="18" fill={color} />
          <path d="M62,75 Q62,48 100,46 Q138,48 138,75 Q138,58 100,56 Q62,58 62,75 Z" fill={color} />
        </>
      );
    case "wavy":
      return (
        <path
          d="M58,80 Q55,40 100,36 Q145,40 142,80 Q150,120 140,150 Q140,100 100,95 Q60,100 60,150 Q50,120 58,80 Z"
          fill={color}
        />
      );
    case "curly":
      return (
        <>
          {[...Array(10)].map((_, i) => (
            <circle key={i} cx={60 + i * 9} cy={50 + Math.sin(i) * 8} r="14" fill={color} />
          ))}
        </>
      );
    case "ponytail":
      return (
        <>
          <path d="M62,72 Q62,40 100,38 Q138,40 138,72 Q138,55 100,52 Q62,55 62,72 Z" fill={color} />
          <path d="M138,70 Q170,90 165,140 Q155,140 150,100 Q145,85 138,80 Z" fill={color} />
        </>
      );
    case "bob":
      return <path d="M58,75 Q58,40 100,38 Q142,40 142,75 L142,110 L58,110 Z" fill={color} />;
    case "afro":
      return <ellipse cx="100" cy="50" rx="60" ry="48" fill={color} />;
    case "mohawk":
      return (
        <>
          <ellipse cx="100" cy="62" rx="38" ry="20" fill="#333" opacity="0.6" />
          <path d="M85,30 L115,30 L110,75 L90,75 Z" fill={color} />
        </>
      );
    case "braids":
      return (
        <>
          <path d="M58,72 Q58,40 100,38 Q142,40 142,72 Z" fill={color} />
          <rect x="50" y="70" width="14" height="100" rx="7" fill={color} />
          <rect x="136" y="70" width="14" height="100" rx="7" fill={color} />
        </>
      );
    case "pixie":
      return <path d="M62,68 Q60,42 100,40 Q140,42 138,68 Q130,52 100,50 Q70,52 62,68 Z" fill={color} />;
  }
};

const OutfitShape = ({ outfit, color, body }: { outfit: Outfit; color: string; body: BodyShape }) => {
  const w = bodyWidth[body];
  const x = 100 - w / 2;
  switch (outfit) {
    case "tunic":
      return <path d={`M${x},155 L${x + w},155 L${x + w + 10},230 L${x - 10},230 Z`} fill={color} />;
    case "shirt":
      return (
        <>
          <path d={`M${x},155 L${x + w},155 L${x + w + 5},220 L${x - 5},220 Z`} fill={color} />
          <line x1="100" y1="155" x2="100" y2="220" stroke="#0008" strokeWidth="1.5" />
        </>
      );
    case "hoodie":
      return (
        <>
          <path d={`M${x - 5},150 Q100,140 ${x + w + 5},150 L${x + w + 8},230 L${x - 8},230 Z`} fill={color} />
          <ellipse cx="100" cy="148" rx={w / 2 + 8} ry="12" fill={color} />
        </>
      );
    case "witch":
      return (
        <>
          <path d={`M${x - 5},155 L${x + w + 5},155 L${x + w + 25},230 L${x - 25},230 Z`} fill={color} />
          <circle cx="100" cy="160" r="6" fill="#fcd34d" />
        </>
      );
    case "cape":
      return (
        <>
          <path d={`M${x},155 L${x + w},155 L${x + w + 10},230 L${x - 10},230 Z`} fill={color} />
          <path d={`M${x - 15},150 Q100,165 ${x + w + 15},150 L${x + w + 30},230 L${x - 30},230 Z`} fill="#1e1b4b" opacity="0.9" />
        </>
      );
    case "halloween":
      return (
        <>
          <path d={`M${x},155 L${x + w},155 L${x + w + 10},230 L${x - 10},230 Z`} fill={color} />
          <text x="100" y="200" fontSize="24" textAnchor="middle">🎃</text>
        </>
      );
    case "mystic":
      return (
        <>
          <path d={`M${x - 5},155 L${x + w + 5},155 L${x + w + 15},230 L${x - 15},230 Z`} fill={color} />
          <text x="100" y="195" fontSize="14" textAnchor="middle" fill="#fcd34d">✦ ✧ ✦</text>
        </>
      );
  }
};

const AvatarDisplay = ({ config, size = 200 }: Props) => {
  const w = bodyWidth[config.body];
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rainbowGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="33%" stopColor="#fcd34d" />
          <stop offset="66%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="magicGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>

      {/* Neck */}
      <rect x="92" y="135" width="16" height="25" fill={config.skin} />
      {/* Body */}
      <OutfitShape outfit={config.outfit} color={config.outfitColor} body={config.body} />
      {/* Head */}
      <ellipse cx="100" cy="90" rx="42" ry="48" fill={config.skin} />
      {/* Ears */}
      <ellipse cx="58" cy="92" rx="6" ry="10" fill={config.skin} />
      <ellipse cx="142" cy="92" rx="6" ry="10" fill={config.skin} />
      {/* Eyes */}
      <ellipse cx="84" cy="92" rx="4" ry="5" fill="#1a1a1a" />
      <ellipse cx="116" cy="92" rx="4" ry="5" fill="#1a1a1a" />
      <circle cx="85" cy="90" r="1.2" fill="#fff" />
      <circle cx="117" cy="90" r="1.2" fill="#fff" />
      {/* Brows */}
      <path d="M76,82 Q84,79 92,82" stroke="#3a2418" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M108,82 Q116,79 124,82" stroke="#3a2418" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <path d="M100,98 Q98,108 100,112 Q102,108 100,98" stroke="#0003" strokeWidth="1" fill="none" />
      {/* Mouth */}
      <path d="M92,118 Q100,124 108,118" stroke="#9b2c2c" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="76" cy="108" r="5" fill="#f9a8d4" opacity="0.4" />
      <circle cx="124" cy="108" r="5" fill="#f9a8d4" opacity="0.4" />
      {/* Hair on top */}
      <Hair style={config.hairStyle} color={config.hairColor} />
    </svg>
  );
};

export default AvatarDisplay;
