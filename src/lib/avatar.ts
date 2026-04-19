export type BodyShape = "slim" | "normal" | "round";
export type HairStyle = "short" | "long" | "bun" | "wavy" | "curly" | "ponytail" | "bob" | "bald" | "afro" | "buzz" | "mohawk" | "braids" | "pixie";
export type Outfit = "tunic" | "shirt" | "hoodie" | "witch" | "cape" | "halloween" | "mystic";

export interface AvatarConfig {
  body: BodyShape;
  skin: string;
  hairStyle: HairStyle;
  hairColor: string;
  outfit: Outfit;
  outfitColor: string;
}

export const SKIN_TONES = [
  "#fde7d3", "#f5d0a9", "#eab78b", "#d99a6c", "#c08457",
  "#9c6a43", "#7b4f2f", "#5a3820", "#3f2614", "#2a1809",
];

export const FREE_HAIR_COLORS = [
  { id: "black", color: "#1a1a1a", label: "Noir" },
  { id: "brown", color: "#5a3a22", label: "Brun" },
  { id: "blond", color: "#e6c887", label: "Blond" },
  { id: "ginger", color: "#c8552b", label: "Roux" },
  { id: "white", color: "#f5f0e6", label: "Blanc" },
  { id: "gray", color: "#9a9a9a", label: "Gris" },
  { id: "navy", color: "#1e2a52", label: "Bleu nuit" },
  { id: "purple", color: "#3d1a5c", label: "Violet foncé" },
];

export const PREMIUM_HAIR_COLORS = [
  { id: "rainbow", color: "url(#rainbowGrad)", label: "Arc-en-ciel", premium: true },
  { id: "gradient", color: "url(#magicGrad)", label: "Dégradé magique", premium: true },
  { id: "emerald", color: "#10b981", label: "Vert émeraude", premium: true },
  { id: "magicpink", color: "#ec4899", label: "Rose magique", premium: true },
];

export const FREE_HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: "short", label: "Court" },
  { id: "long", label: "Long" },
  { id: "bun", label: "Chignon" },
];

export const PREMIUM_HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: "wavy", label: "Ondulé" },
  { id: "curly", label: "Bouclé" },
  { id: "ponytail", label: "Queue" },
  { id: "bob", label: "Carré" },
  { id: "bald", label: "Chauve" },
  { id: "afro", label: "Afro" },
  { id: "buzz", label: "Rasé" },
  { id: "mohawk", label: "Crête" },
  { id: "braids", label: "Tresses" },
  { id: "pixie", label: "Pixie" },
];

export const FREE_OUTFITS: { id: Outfit; label: string; color: string }[] = [
  { id: "tunic", label: "Tunique", color: "#6366f1" },
  { id: "shirt", label: "Chemise", color: "#94a3b8" },
  { id: "hoodie", label: "Sweat", color: "#475569" },
];

export const PREMIUM_OUTFITS: { id: Outfit; label: string; color: string; premium: true }[] = [
  { id: "witch", label: "Robe de sorcière", color: "#4c1d95", premium: true },
  { id: "cape", label: "Cape magique", color: "#7c2d12", premium: true },
  { id: "halloween", label: "Halloween", color: "#ea580c", premium: true },
  { id: "mystic", label: "Mystérieux", color: "#1e1b4b", premium: true },
];

export const DEFAULT_AVATAR: AvatarConfig = {
  body: "normal",
  skin: SKIN_TONES[2],
  hairStyle: "short",
  hairColor: "#1a1a1a",
  outfit: "tunic",
  outfitColor: "#6366f1",
};

const STORAGE_KEY = "avatar_config";

export const loadAvatar = (): AvatarConfig | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AvatarConfig;
  } catch {
    return null;
  }
};

export const saveAvatar = (cfg: AvatarConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    window.dispatchEvent(new Event("avatar-updated"));
  } catch {
    /* ignore */
  }
};

export const clearAvatar = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("avatar-updated"));
  } catch {
    /* ignore */
  }
};
