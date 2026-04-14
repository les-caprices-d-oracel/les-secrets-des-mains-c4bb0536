import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const CGU = () => {
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
        <h1 className="font-display text-lg text-primary mx-auto pr-10 drop-shadow-[0_0_12px_hsla(51,100%,50%,0.3)]">
          📜 Conditions d'Utilisation
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-5 max-w-md mx-auto w-full">
        <div className="glass rounded-2xl p-5 space-y-5 text-sm font-body">
          
          {/* Introduction */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Préambule</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes Conditions Générales d'Utilisation régissent l'accès et l'utilisation 
              de l'application "Les Secrets des Mains" éditée par Vergnettes Carole, 
              70 bis avenue Georges Guynemer.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Objet */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Objet du service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les Secrets des Mains propose des lectures de chiromancie à titre de divertissement 
              et de conseil personnel. Les interprétations sont générées automatiquement et 
              n'ont aucune valeur scientifique, médicale ou prédictive garantie.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Accès */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Accès au service</h2>
            <ul className="text-muted-foreground space-y-2 list-disc pl-4">
              <li>L'application est accessible gratuitement en version limitée</li>
              <li>Des fonctionnalités premium sont disponibles via achat unique ou abonnement</li>
              <li>L'utilisateur doit avoir 18 ans minimum ou autorisation parentale</li>
              <li>L'accès nécessite une connexion internet</li>
            </ul>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Compte utilisateur */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Compte utilisateur</h2>
            <p className="text-muted-foreground leading-relaxed">
              L'utilisateur est responsable de la confidentialité de ses identifiants. 
              Toute activité effectuée depuis son compte est réputée être effectuée par lui. 
              En cas de suspicion d'utilisation frauduleuse, l'utilisateur doit nous contacter 
              immédiatement.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Paiements */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Paiements et remboursements</h2>
            <ul className="text-muted-foreground space-y-2 list-disc pl-4">
              <li>Les prix sont affichés en euros TTC</li>
              <li>Paiement sécurisé via Stripe/Paddle</li>
              <li>Droit de rétractation de 14 jours pour les abonnements non consommés</li>
              <li>Les PDF déjà générés ne sont pas remboursables</li>
              <li>Résiliation possible à tout moment pour les abonnements</li>
            </ul>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Propriété */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Propriété intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les contenus générés (PDF, lectures) sont destinés à un usage personnel unique. 
              L'utilisateur ne peut pas revendre, redistribuer ou commercialiser les contenus 
              générés par l'application. Les templates et designs restent la propriété exclusive 
              de Les Secrets des Mains.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Limitation */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Limitation de responsabilité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les Secrets des Mains ne peut être tenu responsable des décisions prises par 
              l'utilisateur suite à une lecture. La chiromancie est un art divinatoire 
              présenté à titre indicatif uniquement. En cas de problème de santé ou de 
              situation grave, l'utilisateur doit consulter des professionnels qualifiés.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Modification */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Modification des CGU</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes CGU peuvent être modifiées à tout moment. Les utilisateurs seront 
              informés des changements majeurs. L'utilisation continue de l'application après 
              modification vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Contact */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question concernant ces CGU, contactez :<br/>
              <span className="text-primary">lescapricedorace@gmail.com</span>
            </p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-center text-xs text-muted-foreground mt-6 px-4">
        CGU version 1.0 — En vigueur depuis le 14 avril 2024
      </p>
    </div>
  );
};

export default CGU;