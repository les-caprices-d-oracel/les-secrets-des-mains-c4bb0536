import { useParams, useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const lignesData: Record<string, {
  nom: string;
  emoji: string;
  couleur: string;
  description: string;
  signification: string;
  position: string;
  longueur: { titre: string; texte: string }[];
  conseils: string[];
}> = {
  vie: {
    nom: "Ligne de Vie",
    emoji: "🌿",
    couleur: "#00C853",
    description: "La ligne de Vie est la plus importante de la main. Elle révèle ta vitalité, ton énergie et la qualité de ton parcours de vie.",
    signification: "Contrairement aux idées reçues, elle ne prédit pas la durée de vie mais reflète la force vitale, la santé générale et les grands changements de vie.",
    position: "Elle commence entre le pouce et l'index, puis courbe autour du mont de Vénus (base du pouce) vers le poignet.",
    longueur: [
      { titre: "Longue et profonde", texte: "Grande vitalité, énergie débordante et santé robuste. Tu es résilient(e) face aux épreuves." },
      { titre: "Courte", texte: "Ne signifie PAS une vie courte ! Indique plutôt une personnalité indépendante et autonome." },
      { titre: "Courbée", texte: "Richesse émotionnelle et grande capacité d'adaptation. Tu sais rebondir." },
      { titre: "Brisée ou interrompue", texte: "Marque un changement majeur de direction dans ta vie, une transformation profonde." },
    ],
    conseils: [
      "Prends soin de ton énergie vitale au quotidien",
      "Les ruptures dans la ligne annoncent des renaissances, pas des fins",
      "Une ligne forte indique une grande capacité de guérison",
    ],
  },
  coeur: {
    nom: "Ligne de Cœur",
    emoji: "💕",
    couleur: "#FF4081",
    description: "La ligne de Cœur est le miroir de ta vie sentimentale et émotionnelle. Elle révèle comment tu aimes et comment tu vis tes relations.",
    signification: "Elle indique ta capacité à aimer, ta sensibilité émotionnelle et la nature de tes relations amoureuses passées et futures.",
    position: "Elle traverse la paume horizontalement en haut, partant du bord de la main (côté auriculaire) vers l'index ou le majeur.",
    longueur: [
      { titre: "Longue et droite", texte: "Amour rationnel et stable. Tu cherches un partenaire intellectuel avant tout." },
      { titre: "Longue et courbée", texte: "Passionné(e) et expressif(ve) en amour. Tu vis tes émotions intensément." },
      { titre: "Courte", texte: "Tu privilégies ta liberté personnelle. L'amour est important mais pas ta seule priorité." },
      { titre: "Brisée", texte: "Traumatisme émotionnel passé ou grande rupture sentimentale transformatrice." },
    ],
    conseils: [
      "La profondeur de la ligne reflète l'intensité de tes émotions",
      "Des ramifications indiquent plusieurs grandes histoires d'amour",
      "Une ligne claire et nette annonce un amour sincère et durable",
    ],
  },
  tete: {
    nom: "Ligne de Tête",
    emoji: "🧠",
    couleur: "#7C4DFF",
    description: "La ligne de Tête révèle ta façon de penser, ta créativité et ton intelligence. Elle est le reflet de ton esprit.",
    signification: "Elle montre comment tu réfléchis, prends des décisions et utilises ton intelligence au quotidien. C'est la carte de ton mental.",
    position: "Elle traverse la paume au milieu, horizontalement, légèrement sous la ligne de Cœur, partant du bord de la main entre le pouce et l'index.",
    longueur: [
      { titre: "Longue et droite", texte: "Penseur(se) logique et analytique. Tu excelles dans les raisonnements complexes." },
      { titre: "Longue et courbée", texte: "Esprit créatif et imaginatif. Tu vois le monde différemment des autres." },
      { titre: "Courte", texte: "Pragmatique et concret(e). Tu préfères l'action à la réflexion prolongée." },
      { titre: "Ondulée", texte: "Esprit dispersé mais brillant. Tu as mille idées à la seconde." },
    ],
    conseils: [
      "La clarté de la ligne indique la clarté de tes pensées",
      "Une ligne profonde montre une grande concentration mentale",
      "Des fourches à l'extrémité révèlent une double compétence rare",
    ],
  },
  destin: {
    nom: "Ligne de Destin",
    emoji: "⭐",
    couleur: "#FFD700",
    description: "La ligne de Destin est la plus mystérieuse. Elle trace le chemin de ta destinée, tes succès et les forces qui guident ta vie.",
    signification: "Elle révèle ta carrière, tes ambitions et l'influence du destin sur ton parcours. Tout le monde n'en possède pas une visible.",
    position: "Elle monte verticalement du bas de la paume (près du poignet) vers le majeur, traversant le centre de la main.",
    longueur: [
      { titre: "Longue et nette", texte: "Destin clair et puissant. Tu es né(e) pour accomplir quelque chose de grand." },
      { titre: "Commence au milieu", texte: "Succès tardif mais mérité. Ta persévérance finira par payer." },
      { titre: "Fragmentée", texte: "Plusieurs réorientations de carrière. Chaque changement te rapproche de ta vraie voie." },
      { titre: "Absente", texte: "Pas de fatalité ! Tu es libre de créer ton propre destin sans contraintes." },
    ],
    conseils: [
      "L'absence de cette ligne est un signe de liberté totale",
      "Une ligne profonde signifie que le destin joue un grand rôle dans ta vie",
      "Les croisements indiquent des moments de décision cruciaux",
    ],
  },
};

const LigneSignification = () => {
  const { ligne } = useParams<{ ligne: string }>();
  const navigate = useNavigate();
  const data = ligne ? lignesData[ligne] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground font-body">Ligne introuvable.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden pb-12">
      <StarField />

      {/* Header */}
      <div className="relative z-10 flex items-center px-4 pt-6 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground text-lg transition-transform active:scale-90"
          aria-label="Retour"
        >
          ←
        </button>
        <h1
          className="font-display text-lg mx-auto pr-10"
          style={{ color: data.couleur, textShadow: `0 0 12px ${data.couleur}44` }}
        >
          {data.emoji} {data.nom}
        </h1>
      </div>

      <div className="relative z-10 flex flex-col gap-4 px-5 w-full max-w-md mx-auto">
        {/* Ligne animée décorative */}
        <div className="flex justify-center mb-2">
          <svg width="200" height="8" viewBox="0 0 200 8">
            <path
              d="M0 4 Q50 0, 100 4 Q150 8, 200 4"
              fill="none"
              stroke={data.couleur}
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 6px ${data.couleur}88)`,
                strokeDasharray: 220,
                strokeDashoffset: 0,
                animation: "drawLine 1.5s ease-out forwards",
              }}
            />
          </svg>
        </div>

        {/* Description */}
        <div className="glass rounded-2xl p-4">
          <p className="text-sm text-foreground font-body leading-relaxed">{data.description}</p>
        </div>

        {/* Signification */}
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display text-sm mb-2" style={{ color: data.couleur }}>
            ✨ Signification
          </h2>
          <p className="text-xs text-muted-foreground font-body leading-relaxed">{data.signification}</p>
        </div>

        {/* Position */}
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display text-sm mb-2" style={{ color: data.couleur }}>
            📍 Position sur la main
          </h2>
          <p className="text-xs text-muted-foreground font-body leading-relaxed">{data.position}</p>
        </div>

        {/* Interprétations */}
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display text-sm mb-3" style={{ color: data.couleur }}>
            🔮 Interprétations
          </h2>
          <div className="space-y-3">
            {data.longueur.map((item) => (
              <div key={item.titre} className="border-l-2 pl-3" style={{ borderColor: data.couleur }}>
                <p className="text-xs font-body font-bold text-foreground mb-0.5">{item.titre}</p>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{item.texte}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conseils */}
        <div className="glass rounded-2xl p-4">
          <h2 className="font-display text-sm mb-2" style={{ color: data.couleur }}>
            💡 Conseils
          </h2>
          <ul className="space-y-1.5">
            {data.conseils.map((c) => (
              <li key={c} className="text-xs text-muted-foreground font-body flex items-start gap-1.5">
                <span style={{ color: data.couleur }} className="mt-0.5">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/scanner")}
          className="w-full py-3 rounded-xl font-display font-bold text-sm text-primary-foreground transition-transform active:scale-95 mt-2"
          style={{ background: "var(--gradient-cta)" }}
        >
          🖐️ Analyser ma {data.nom}
        </button>
      </div>

      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 220; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default LigneSignification;
