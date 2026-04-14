import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<RequireOnboarding><Index /></RequireOnboarding>} />
          <Route path="/scanner" element={<RequireOnboarding><Scanner /></RequireOnboarding>} />
          <Route path="/lectures" element={<RequireOnboarding><Lectures /></RequireOnboarding>} />
          <Route path="/ligne/:ligne" element={<RequireOnboarding><LigneSignification /></RequireOnboarding>} />
          <Route path="/resultat" element={<RequireOnboarding><Resultat /></RequireOnboarding>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
