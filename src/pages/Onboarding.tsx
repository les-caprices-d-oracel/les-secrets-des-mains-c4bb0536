import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const Onboarding = () => {
  const navigate = useNavigate();
  const [cguAccepted, setCguAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const canProceed = cguAccepted && privacyAccepted;

  const handleStart = () => {
    if (!canProceed) return;
    localStorage.setItem("onboarding_done", "true");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <StarField />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <p className="text-5xl mb-4">✨</p>

        <h1 className="font-display text-3xl text-primary text-center leading-tight mb-2 drop-shadow-[0_0_20px_hsla(51,100%,50%,0.4)]">
          Bienvenue
        </h1>

        <p className="text-muted-foreground text-center text-sm mb-10 max-w-xs">
          Avant de commencer votre voyage mystique, veuillez accepter nos conditions.
        </p>

        {/* Checkboxes */}
        <div className="w-full space-y-4 mb-10">
          <label className="flex items-start gap-3 glass rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-primary/50">
            <input
              type="checkbox"
              checked={cguAccepted}
              onChange={(e) => setCguAccepted(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded accent-primary shrink-0"
            />
            <span className="text-sm text-foreground leading-relaxed">
              J'accepte les{" "}
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); navigate("/cgu"); }}
                className="text-primary underline underline-offset-2 hover:text-accent transition-colors"
              >
                Conditions Générales d'Utilisation
              </button>
            </span>
          </label>

          <label className="flex items-start gap-3 glass rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-primary/50">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded accent-primary shrink-0"
            />
            <span className="text-sm text-foreground leading-relaxed">
              J'accepte la{" "}
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); navigate("/confidentialite"); }}
                className="text-primary underline underline-offset-2 hover:text-accent transition-colors"
              >
                Politique de Confidentialité
              </button>
            </span>
          </label>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          disabled={!canProceed}
          className="w-full py-4 px-8 rounded-2xl font-body font-bold text-lg tracking-wide text-primary-foreground transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: canProceed ? "var(--gradient-cta)" : "hsl(var(--muted))",
          }}
        >
          🌙 Commencer mon voyage
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
