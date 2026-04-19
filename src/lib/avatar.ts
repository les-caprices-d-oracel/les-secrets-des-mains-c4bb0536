export type BodyShape = "slim" | "normal" | "round";

export type HairStyle =
  | "short" | "long" | "bun" | "wavy" | "curly" | "ponytail"
  | "bob" | "bald" | "afro" | "buzz" | "mohawk" | "braids" | "pixie";

export type Outfit =
  | "tunic" | "shirt" | "hoodie" | "witch" | "cape" | "halloween" | "mystic";

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
  { id: "black",  color: "#1a1a1a", label: "Noir" },
  { id: "brown",  color: "#5a3a22", label: "Brun" },
  { id: "blond",  color: "#e6c887", label: "Blond" },
  { id: "ginger", color: "#c8552b", label: "Roux" },
  { id: "white",  color: "#f5f0e6", label: "Blanc" },
  { id: "gray",   color: "#9a9a9a", label: "Gris" },
  { id: "navy",   color: "#1e2a52", label: "Bleu nuit" },
  { id: "purple", color: "#3d1a5c", label: "Violet" },
];

export const PREMIUM_HAIR_COLORS: {
  id: string; color: string; label: string; premium: boolean;
}[] = [
  { id: "emerald",   color: "#10b981", label: "Vert emeraude", premium: true },
  { id: "magicpink", color: "#ec4899", label: "Rose magique",  premium: true },
  { id: "cyan",      color: "#06b6d4", label: "Cyan mystique", premium: true },
  { id: "gold",      color: "#f59e0b", label: "Or enchante",   premium: true },
];

export const FREE_HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: "short", label: "Court" },
  { id: "long",  label: "Long" },
  { id: "bun",   label: "Chignon" },
];

export const PREMIUM_HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: "wavy",     label: "Ondule" },
  { id: "curly",    label: "Boucle" },
  { id: "ponytail", label: "Queue" },
  { id: "bob",      label: "Carre" },
  { id: "afro",     label: "Afro" },
  { id: "braids",   label: "Tresses" },
  { id: "pixie",    label: "Pixie" },
  { id: "mohawk",   label: "Crete" },
  { id: "buzz",     label: "Rase" },
  { id: "bald",     label: "Chauve" },
];

export const FREE_OUTFITS: { id: Outfit; label: string; color: string }[] = [
  { id: "tunic",  label: "Tunique", color: "#6366f1" },
  { id: "shirt",  label: "Chemise", color: "#94a3b8" },
  { id: "hoodie", label: "Sweat",   color: "#475569" },
];

export const PREMIUM_OUTFITS: {
  id: Outfit; label: string; color: string; premium: boolean;
}[] = [
  { id: "witch",     label: "Sorciere",   color: "#4c1d95", premium: true },
  { id: "cape",      label: "Cape",       color: "#7c2d12", premium: true },
  { id: "halloween", label: "Halloween",  color: "#ea580c", premium: true },
  { id: "mystic",    label: "Mysterieux", color: "#1e1b4b", premium: true },
];

export const DEFAULT_AVATAR: AvatarConfig = {
  body: "normal",
  skin: "#eab78b",
  hairStyle: "short",
  hairColor: "#1a1a1a",
  outfit: "tunic",
  outfitColor: "#6366f1",
};

let _mem: AvatarConfig | null = null;

export const loadAvatar = (): AvatarConfig | null => {
  if (_mem) return _mem;
  try {
    const raw = localStorage.getItem("avatar_config");
    if (raw) {
      _mem = JSON.parse(raw);
      return _mem;
    }
  } catch { }
  return null;
};

export const saveAvatar = (cfg: AvatarConfig): void => {
  _mem = cfg;
  try {
    localStorage.setItem("avatar_config", JSON.stringify(cfg));
  } catch { }
  window.dispatchEvent(new Event("avatar-updated"));
};

export const clearAvatar = (): void => {
  _mem = null;
  try {
    localStorage.removeItem("avatar_config");
  } catch { }
  window.dispatchEvent(new Event("avatar-updated"));
};