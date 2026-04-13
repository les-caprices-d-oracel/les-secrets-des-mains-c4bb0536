import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const lignes = [
  {
    nom: "Ligne de Vie",
    emoji: "🌿",
    couleur: "#00C853",
    route: "/ligne/vie",
    resume: "Vitalité puissante — ta ligne révèle une énergie profonde et une grande résilience face aux épreuves de la vie.",
  },
  {
    nom: "Ligne de Cœur",
    emoji: "💕",
    couleur: "#FF4081",
    route: "/ligne/coeur",
    resume: "Cœur passionné — tu vis tes émotions intensément et tes relations sont marquées par la sincérité.",
  },
  {
    nom: "Ligne de Tête",
    emoji: "🧠",
    couleur: "#7C4DFF",
    route: "/ligne/tete",
    resume: "Esprit créatif — ton intelligence mêle logique et imagination, te donnant une vision unique du monde.",
  },
  {
    nom: "Ligne de Destin",
    emoji: "⭐",
    couleur: "#FFD700",
    route: "/ligne/destin",
    resume: "Destin tracé — une force invisible guide tes pas vers un accomplissement qui te dépasse.",
  },
];

const Resultat = () => {
  const navigate = useNavigate();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ma Lecture de Main",
          text: "Découvre ce que les lignes de ma main révèlent ! 🖐️✨",
          url: window.location.href,
        });
      } catch {}
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden pb-8">
      <StarField />

      {/* Header */}
      <div className="relative z-10 flex items-center px-4 pt-6 mb-2">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground text-lg transition-transform active:scale-90"
          aria-label="Retour"
        >
          ←
        </button>
        <h1 className="font-display text-lg text-primary mx-auto pr-10 drop-shadow-[0_0_12px_hsla(51,100%,50%,0.3)]">
          ✨ Ton Résultat
        </h1>
      </div>

      {/* Intro */}
      <p className="relative z-10 text-center text-xs text-muted-foreground font-body px-8 mb-4">
        Voici ce que les lignes de ta main révèlent sur toi…
      </p>

      {/* 4 Cards */}
      <div className="relative z-10 flex flex-col gap-4 px-5 w-full max-w-md mx-auto">
        {lignes.map((l, i) => (
          <button
            key={l.nom}
            onClick={() => navigate(l.route)}
            className="glass rounded-2xl p-4 text-left transition-all duration-300 active:scale-[0.98] relative overflow-hidden"
            style={{
              animationDelay: `${i * 0.15}s`,
              animation: "fadeSlideUp 0.5s ease-out both",
            }}
          >
            {/* Glow accent */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-r"
              style={{ background: l.couleur, boxShadow: `0 0 12px ${l.couleur}66` }}
            />

            <div className="flex items-start gap-3 pl-3">
              <span className="text-2xl mt-0.5">{l.emoji}</span>
              <div className="flex-1 min-w-0">
                <h2
                  className="font-display text-sm mb-1"
                  style={{ color: l.couleur, textShadow: `0 0 8px ${l.couleur}44` }}
                >
                  {l.nom}
                </h2>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {l.resume}
                </p>
                <span className="inline-block mt-2 text-[10px] font-body text-foreground/60">
                  Voir le détail →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-col gap-3 px-5 w-full max-w-md mx-auto mt-6">
        {/* Sauvegarder */}
        <button
          onClick={() => {
            localStorage.setItem("derniere_lecture", JSON.stringify({ date: new Date().toISOString(), lignes }));
            alert("Lecture sauvegardée ✨");
          }}
          className="w-full py-3 rounded-xl font-body font-bold text-sm text-foreground glass border border-secondary/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          💾 Sauvegarder ma lecture
        </button>

        {/* PDF */}
        <button
          onClick={() => navigate("/lectures")}
          className="w-full py-3 rounded-xl font-body font-bold text-sm text-primary-foreground transition-transform active:scale-95"
          style={{ background: "var(--gradient-cta)" }}
        >
          📄 Obtenir mon PDF personnalisé
        </button>

        {/* Partager */}
        <button
          onClick={handleShare}
          className="w-full py-3 rounded-xl font-body font-bold text-sm text-foreground glass border border-accent/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          🔗 Partager mon résultat
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Resultat;
