import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";

const Scanner = () => {
  const navigate = useNavigate();
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      navigate("/resultat");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <StarField />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center px-4 pt-6 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground text-lg transition-transform active:scale-90"
          aria-label="Retour"
        >
          ←
        </button>
        <h1 className="font-display text-lg text-primary mx-auto pr-10 drop-shadow-[0_0_12px_hsla(51,100%,50%,0.3)]">
          Scanner
        </h1>
      </div>

      {/* Scanner area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6">
        {/* Oval frame */}
        <div className="relative w-64 h-80 mb-8">
          {/* Glowing oval border */}
          <div
            className="absolute inset-0 rounded-[50%] transition-all duration-700"
            style={{
              border: "2px solid transparent",
              backgroundImage: isCapturing
                ? "linear-gradient(hsl(var(--background)), hsl(var(--background))), linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))"
                : "linear-gradient(hsl(var(--background)), hsl(var(--background))), linear-gradient(135deg, hsla(51,100%,50%,0.6), hsla(336,100%,72%,0.6))",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: isCapturing
                ? "0 0 40px hsla(51,100%,50%,0.5), inset 0 0 40px hsla(51,100%,50%,0.1)"
                : "0 0 25px hsla(51,100%,50%,0.2), inset 0 0 25px hsla(51,100%,50%,0.05)",
              animation: isCapturing ? "none" : "scan-pulse 3s ease-in-out infinite",
            }}
          />

          {/* Corner guides */}
          {[
            "top-0 left-4 border-t-2 border-l-2 rounded-tl-3xl",
            "top-0 right-4 border-t-2 border-r-2 rounded-tr-3xl",
            "bottom-0 left-4 border-b-2 border-l-2 rounded-bl-3xl",
            "bottom-0 right-4 border-b-2 border-r-2 rounded-br-3xl",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute w-10 h-10 border-primary/60 ${pos}`}
            />
          ))}

          {/* Scan line animation */}
          {isCapturing && (
            <div
              className="absolute left-6 right-6 h-0.5 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
                animation: "scan-line 1.5s ease-in-out infinite",
              }}
            />
          )}

          {/* Hand emoji placeholder */}
          {!isCapturing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20 animate-float">🖐️</span>
            </div>
          )}
        </div>

        {/* Instruction text */}
        <p className="text-sm font-body text-muted-foreground text-center mb-10">
          {isCapturing ? "Analyse en cours..." : "Placez votre main dans le cadre"}
        </p>

        {/* Capture button */}
        <button
          onClick={handleCapture}
          disabled={isCapturing}
          className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 disabled:opacity-60"
          style={{
            background: "var(--gradient-cta)",
            boxShadow: "0 0 30px hsla(51,100%,50%,0.3)",
          }}
          aria-label="Capturer"
        >
          <div
            className="w-16 h-16 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center"
          >
            <span className="text-2xl">{isCapturing ? "⏳" : "📸"}</span>
          </div>

          {/* Rotating ring when capturing */}
          {isCapturing && (
            <div
              className="absolute inset-[-3px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), transparent)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "3px",
                animation: "spin 1s linear infinite",
              }}
            />
          )}
        </button>
      </div>

      <style>{`
        @keyframes scan-pulse {
          0%, 100% { box-shadow: 0 0 25px hsla(51,100%,50%,0.2), inset 0 0 25px hsla(51,100%,50%,0.05); }
          50% { box-shadow: 0 0 40px hsla(51,100%,50%,0.4), inset 0 0 35px hsla(51,100%,50%,0.1); }
        }
        @keyframes scan-line {
          0% { top: 10%; }
          50% { top: 85%; }
          100% { top: 10%; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Scanner;
