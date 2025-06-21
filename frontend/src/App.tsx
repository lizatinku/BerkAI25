
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScamCallDetection from "./pages/ScamCallDetection";
import ScamCallWidget from "./pages/ScamCallWidget";
import PostCallReport from "./pages/PostCallReport";
import EmailPhishingDetection from "./pages/EmailPhishingDetection";
import AuthLogin from "./pages/AuthLogin";
import AuthSignup from "./pages/AuthSignup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/signup" element={<AuthSignup />} />
          <Route path="/scam-call" element={<ScamCallDetection />} />
          <Route path="/scam-call-widget" element={<ScamCallWidget />} />
          <Route path="/post-call-report" element={<PostCallReport />} />
          <Route path="/email-detection" element={<EmailPhishingDetection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
