import { Home, Clock, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Accueil", path: "/" },
  { icon: Clock, label: "Historique", path: "/historique" },
  { icon: User, label: "Profil", path: "/profil" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 glass rounded-2xl px-2 py-3 flex justify-around items-center max-w-md mx-auto">
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-300 ${
              isActive
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
            <span className="text-[10px] font-semibold tracking-wide">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
