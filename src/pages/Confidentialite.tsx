import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const Confidentialite = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden pb-8">
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
        <h1 className="font-display text-base text-primary mx-auto pr-10 drop-shadow-[0_0_12px_hsla(51,100%,50%,0.3)]">
          🔒 Confidentialité RGPD
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-5 max-w-md mx-auto w-full">
        <div className="glass rounded-2xl p-5 space-y-5 text-sm font-body">
          
          {/* Responsable */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Responsable des données</h2>
            <div className="text-muted-foreground space-y-1">
              <p><span className="text-foreground">Vergnettes Carole</span></p>
              <p>70 bis avenue Georges Guynemer</p>
              <p>Email : lescapricedorace@gmail.com</p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Données collectées */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Données collectées</h2>
            <ul className="text-muted-foreground space-y-2 list-disc pl-4">
              <li>Photos de vos mains (analyse temporaire)</li>
              <li>Avatar personnalisé (si créé)</li>
              <li>Historique des lectures</li>
              <li>Préférences de personnalisation PDF</li>
              <li>Données de paiement (traitées par Stripe/Paddle)</li>
            </ul>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Finalités */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Utilisation des données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données sont utilisées uniquement pour :
            </p>
            <ul className="text-muted-foreground space-y-1 list-disc pl-4 mt-2">
              <li>Générer vos lectures personnalisées</li>
              <li>Créer vos PDF customisés</li>
              <li>Sauvegarder votre historique</li>
              <li>Améliorer nos services</li>
            </ul>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Conservation */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Durée de conservation</h2>
            <p className="text-muted-foreground leading-relaxed">
              • Photos de mains : supprimées automatiquement après analyse<br/>
              • Données de compte : conservées jusqu'à suppression de votre compte<br/>
              • PDF générés : stockés selon votre formule (1 mois ou illimité)
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Droits */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Vos droits RGPD</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="text-muted-foreground space-y-1 list-disc pl-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement ("droit à l'oubli")</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Contactez-nous à <span className="text-primary">lescapricedorace@gmail.com</span> pour exercer ces droits.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Sécurité */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Sécurité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données sont stockées sur des serveurs sécurisés (Supabase) avec chiffrement 
              SSL. Nous ne vendons ni ne partageons vos données avec des tiers à des fins 
              commerciales.
            </p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-center text-xs text-muted-foreground mt-6 px-4">
        Politique mise à jour le 14 avril 2024 — Conforme au RGPD
      </p>
    </div>
  );
};

export default Confidentialite;