import { Link } from "react-router-dom";

const LegalFooter = () => (
  <footer className="relative z-10 w-full py-6 mt-auto">
    <div className="flex justify-center gap-4 flex-wrap px-4">
      <Link to="/mentions-legales" className="text-[10px] font-body text-muted-foreground/60 hover:text-primary transition-colors">Mentions légales</Link>
      <span className="text-muted-foreground/30 text-[10px]">•</span>
      <Link to="/cgu" className="text-[10px] font-body text-muted-foreground/60 hover:text-primary transition-colors">CGU</Link>
      <span className="text-muted-foreground/30 text-[10px]">•</span>
      <Link to="/confidentialite" className="text-[10px] font-body text-muted-foreground/60 hover:text-primary transition-colors">Confidentialité</Link>
    </div>
  </footer>
);

export default LegalFooter;
