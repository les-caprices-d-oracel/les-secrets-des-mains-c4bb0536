import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const MentionsLegales = () => {
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
          ⚖️ Mentions Légales
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-5 max-w-md mx-auto w-full">
        <div className="glass rounded-2xl p-5 space-y-5 text-sm font-body">
          
          {/* Éditeur */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Éditeur du site</h2>
            <div className="text-muted-foreground space-y-1">
              <p><strong className="text-foreground">Les Secrets des Mains</strong></p>
              <p>Application de chiromancie digitale</p>
              <p>Propriétaire : <span className="text-foreground">Vergnettes Carole</span></p>
              <p>Adresse : 70 bis avenue Georges Guynemer</p>
              <p>Contact : lescapricedorace@gmail.com</p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Hébergement */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Hébergement</h2>
            <div className="text-muted-foreground space-y-1">
              <p>L'application est hébergée par :</p>
              <p><strong className="text-foreground">Lovable</strong></p>
              <p>Stockage des données : Supabase (PostgreSQL)</p>
              <p>Hébergement cloud sécurisé</p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Propriété intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tous les contenus présents sur cette application (textes, images, graphismes, logos) 
              sont protégés par le droit d'auteur. Toute reproduction ou représentation, 
              totale ou partielle, est interdite sans autorisation expresse.
            </p>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Activité */}
          <section>
            <h2 className="font-display text-base text-primary mb-2">Activité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les Secrets des Mains propose des lectures de lignes de la main à titre 
              de divertissement et de conseil personnel. La chiromancie n'est pas une 
              science exacte et les interprétations fournies sont indicatives.
            </p>
          </section>

        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-center text-xs text-muted-foreground mt-6 px-4">
        © 2024 Les Secrets des Mains — Tous droits réservés
      </p>
    </div>
  );
};

export default MentionsLegales;