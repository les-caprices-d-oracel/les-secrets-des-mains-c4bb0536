import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const plans = [
  {
    icon: "🖐️",
    title: "Lecture des Mains",
    price: "0,99€",
    period: "par lecture",
    highlight: false,
    gratuit: ["Lignes principales (Vie, Cœur, Tête)", "Résumé rapide"],
    payant: ["Ligne du Destin détaillée", "Conseils personnalisés", "🧝 Ton avatar personnalisé intégré à ton PDF", "🎨 PDF 100% customisable (thème, couleurs, message, décoration)"],
    tagline: "Parce que ton destin mérite mieux qu'une devinette 🌙",
  },
  {
    icon: "💕",
    title: "Lecture Amoureuse",
    subtitle: "Deux mains, un seul destin...",
    price: "1,98€",
    period: "par lecture",
    highlight: false,
    gratuit: ["Compatibilité de base", "Ligne de Cœur analysée"],
    payant: ["Compatibilité détaillée à deux", "Prédictions amoureuses", "🎨 PDF duo 100% personnalisable (thème, couleurs, décoration)", "🧝 2 avatars personnalisés inclus sur votre PDF commun"],
  },
  {
    icon: "👑",
    title: "Premium",
    price: "4,99€",
    period: "/mois · sans engagement",
    highlight: true,
    gratuit: ["Toutes les lectures illimitées", "Historique complet", "Avatar personnalisé"],
    payant: ["🎨 PDF illimités ultra-customisables avec ton avatar unique", "Nouvelles lignes en avant-première", "Support prioritaire"],
  },
];

const Lectures = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden pb-12">
      <StarField />

      {/* Header */}
      <div className="relative z-10 flex items-center px-4 pt-6 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground text-lg transition-transform active:scale-90"
          aria-label="Retour"
        >
          ←
        </button>
        <h1 className="font-display text-lg text-primary mx-auto pr-10 drop-shadow-[0_0_12px_hsla(51,100%,50%,0.3)]">
          Nos Lectures
        </h1>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex flex-col gap-5 px-5 w-full max-w-md mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="glass rounded-2xl p-5 transition-all duration-300 relative overflow-hidden"
            style={{
              borderColor: plan.highlight ? "hsla(51,100%,50%,0.5)" : undefined,
              boxShadow: plan.highlight
                ? "0 0 30px hsla(51,100%,50%,0.15)"
                : undefined,
            }}
          >
            {/* Premium badge */}
            {plan.highlight && (
              <div
                className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-body font-bold text-primary-foreground"
                style={{ background: "var(--gradient-cta)" }}
              >
                Populaire ⭐
              </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{plan.icon}</span>
              <div>
                <h2 className="font-display text-base text-primary leading-tight">{plan.title}</h2>
                {plan.subtitle && (
                  <p className="text-xs text-muted-foreground font-body italic">{plan.subtitle}</p>
                )}
                <p className="text-foreground font-body font-bold text-xl">
                  {plan.price}
                  <span className="text-xs text-muted-foreground font-normal ml-1">{plan.period}</span>
                </p>
              </div>
            </div>

            {/* Gratuit section */}
            <div className="mb-3">
              <p className="text-xs font-body font-semibold text-secondary mb-1.5">✅ Inclus</p>
              <ul className="space-y-1">
                {plan.gratuit.map((item) => (
                  <li key={item} className="text-xs text-foreground font-body flex items-start gap-1.5">
                    <span className="text-secondary mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payant section */}
            <div className="mb-4">
              <p className="text-xs font-body font-semibold text-accent mb-1.5">🔒 Premium</p>
              <ul className="space-y-1">
                {plan.payant.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground font-body flex items-start gap-1.5">
                    <span className="text-accent mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              className="w-full py-2.5 rounded-xl font-body font-bold text-sm text-primary-foreground transition-transform active:scale-95"
              style={{ background: plan.highlight ? "var(--gradient-cta)" : "hsl(var(--secondary))" }}
            >
              {plan.highlight ? "S'abonner 👑" : "Choisir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
