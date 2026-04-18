import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconSparkles = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z" />
    <path d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z" />
  </svg>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Entre une adresse email valide.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;
      const listId = Number(import.meta.env.VITE_BREVO_LIST_ID) || 3;
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
      });
      if (res.ok || res.status === 204) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json();
        if (data?.code === "duplicate_parameter") {
          setStatus("success");
          setEmail("");
        } else {
          throw new Error(data?.message || "Erreur inconnue");
        }
      }
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur s'est produite. Réessaie dans un instant.");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-3 py-5 px-6 rounded-2xl"
        style={{ background: "rgba(18,155,105,0.08)", border: "1px solid rgba(52,211,153,0.2)", animation: "label-in 0.4s ease-out" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}>
          <IconSparkles />
        </div>
        <div className="text-center">
          <p className="font-body font-semibold" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>
            Bienvenue dans les secrets ✨
          </p>
          <p className="font-body" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: "1.5" }}>
            Tu recevras bientôt les mystères de la chiromancie dans ta boîte mail.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2 mb-1">
        <div style={{ color: "rgba(252,211,77,0.6)" }}><IconSparkles /></div>
        <p className="font-body text-center" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Reçois les secrets chaque semaine
        </p>
        <div style={{ color: "rgba(252,211,77,0.6)" }}><IconSparkles /></div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)", pointerEvents: "none" }}>
            <IconMail />
          </div>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
            placeholder="ton@email.com"
            className="w-full font-body"
            style={{ paddingLeft: "36px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "12px", borderRadius: "12px", fontSize: "0.8rem", background: "rgba(255,255,255,0.05)", border: errorMsg ? "1px solid rgba(249,168,212,0.4)" : "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", outline: "none", transition: "border-color 0.2s, background 0.2s" }}
            onFocus={e => (e.currentTarget.style.border = "1px solid rgba(52,211,153,0.35)")}
            onBlur={e => (e.currentTarget.style.border = errorMsg ? "1px solid rgba(249,168,212,0.4)" : "1px solid rgba(255,255,255,0.08)")}
            disabled={status === "loading"}
          />
        </div>
        {errorMsg && (
          <p className="font-body text-center" style={{ fontSize: "0.68rem", color: "rgba(249,168,212,0.8)", marginTop: "-2px" }}>
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full font-body font-semibold transition-all duration-200 active:scale-95"
          style={{ padding: "12px", borderRadius: "12px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: status === "loading" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)", cursor: status === "loading" ? "not-allowed" : "pointer" }}
          onMouseEnter={e => { if (status !== "loading") { e.currentTarget.style.background = "rgba(52,211,153,0.12)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.25)"; e.currentTarget.style.color = "rgba(52,211,153,0.9)"; }}}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
        >
          {status === "loading" ? "Inscription en cours…" : "Rejoindre les initiés →"}
        </button>
        <p className="font-body text-center" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.18)", lineHeight: "1.5" }}>
          Pas de spam · Désabonnement en 1 clic · Conforme RGPD
        </p>
      </form>
    </div>
  );
};

export default NewsletterForm;