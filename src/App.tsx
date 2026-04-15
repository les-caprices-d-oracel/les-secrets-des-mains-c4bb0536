import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Scanner from "./pages/Scanner.tsx";
import Lectures from "./pages/Lectures.tsx";
import LigneSignification from "./pages/LigneSignification.tsx";
import Resultat from "./pages/Resultat.tsx";
import MentionsLegales from "./pages/MentionsLegales.tsx";
import Confidentialite from "./pages/Confidentialite.tsx";
import CGU from "./pages/CGU.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const RequireOnboarding = ({ children }: { children: React.ReactNode }) => {
  const done = localStorage.getItem("onboarding_done") === "true";
  if (!done) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
        <Route path="/" element={<RequireOnboarding><PageTransition><Index /></PageTransition></RequireOnboarding>} />
        <Route path="/scanner" element={<RequireOnboarding><PageTransition><Scanner /></PageTransition></RequireOnboarding>} />
        <Route path="/lectures" element={<RequireOnboarding><PageTransition><Lectures /></PageTransition></RequireOnboarding>} />
        <Route path="/ligne/:ligne" element={<RequireOnboarding><PageTransition><LigneSignification /></PageTransition></RequireOnboarding>} />
        <Route path="/resultat" element={<RequireOnboarding><PageTransition><Resultat /></PageTransition></RequireOnboarding>} />
        <Route path="/mentions-legales" element={<PageTransition><MentionsLegales /></PageTransition>} />
        <Route path="/confidentialite" element={<PageTransition><Confidentialite /></PageTransition>} />
        <Route path="/cgu" element={<PageTransition><CGU /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
