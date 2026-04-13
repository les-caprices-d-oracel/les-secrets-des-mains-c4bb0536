import StarField from "@/components/StarField";
import FloatingHandNav from "@/components/FloatingHandNav";
import handImage from "@/assets/hand-mystical.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden pb-24">
      <StarField />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-12 w-full max-w-md mx-auto">
        {/* Mystical hand illustration */}
        <div className="animate-float mb-6">
          <img
            src={handImage}
            alt="Main mystique avec lignes dorées et étoiles"
            width={512}
            height={640}
            className="w-64 h-auto drop-shadow-[0_0_40px_hsla(51,100%,50%,0.3)]"
          />
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl text-primary text-center leading-tight mb-3 drop-shadow-[0_0_20px_hsla(51,100%,50%,0.4)]">
          Les Secrets
          <br />
          des Mains
        </h1>

        <p className="text-muted-foreground text-center text-sm mb-10 max-w-xs">
          Découvrez ce que vos lignes de main révèlent sur votre destin ✨
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/scanner")}
          className="w-full max-w-xs py-4 px-8 rounded-2xl font-body font-bold text-lg tracking-wide text-primary-foreground animate-glow-pulse transition-transform active:scale-95"
          style={{ background: "var(--gradient-cta)" }}
        >
          🖐️ Révèle mes secrets
        </button>

        {/* Secondary links */}
        <div className="mt-8 flex gap-6">
          <button
            onClick={() => navigate("/lectures")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Nos lectures
          </button>
          <button
            onClick={() => navigate("/pdf")}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            PDF personnalisé
          </button>
        </div>
      </div>

      <FloatingHandNav />
    </div>
  );
};

export default Index;
