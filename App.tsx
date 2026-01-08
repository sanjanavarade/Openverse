import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AIBuddy from "./components/AIBuddy";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import RepoAnalyzer from "./pages/RepoAnalyzer";
import Explorer from "./pages/Explorer";
import ReadmeGenerator from "./pages/ReadmeGenerator";
import PracticeZone from "./pages/PracticeZone";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import { Menu } from "lucide-react";

export type ThemeType = "dark" | "light" | "nord" | "midnight" | "sunset";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState<ThemeType>("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply theme to body
  useEffect(() => {
    const themeColors: Record<ThemeType, string> = {
      dark: "#09090b",
      light: "#fafafa",
      nord: "#2e3440",
      midnight: "#020617",
      sunset: "#1a0b16",
    };
    document.body.style.backgroundColor = themeColors[theme];
  }, [theme]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "onboarding":
        return <Onboarding />;
      case "analyzer":
        return <RepoAnalyzer />;
      case "explorer":
        return <Explorer />;
      case "readme":
        return <ReadmeGenerator />;
      case "practice":
        return <PracticeZone />;
      case "community":
        return <Community />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <Auth
        onLogin={handleLogin}
        theme={theme === "light" ? "light" : "dark"}
      />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 theme-${theme} ${
        theme === "light" ? "text-zinc-900" : "text-zinc-100"
      } selection:bg-indigo-500/30`}
    >
      {/* Mobile Top Bar */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center px-6 z-40 border-b transition-colors ${
          theme === "light"
            ? "bg-white border-zinc-200"
            : "bg-zinc-950/80 border-zinc-800 backdrop-blur-md"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 text-indigo-500"
        >
          <Menu size={24} />
        </button>
        <span className="ml-4 font-bold text-lg">OpenVerse</span>
      </div>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        theme={theme}
        setTheme={setTheme}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main
        className={`transition-all duration-300 min-h-screen pt-16 lg:pt-0 ${
          isLoggedIn ? "lg:pl-64" : ""
        }`}
      >
        <div className="p-4 md:p-8">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            {renderContent()}
          </div>
        </div>
      </main>

      <AIBuddy />

      <style>{`
        /* Global Theme Overrides */
        .theme-light { background-color: #fafafa; }
        .theme-dark { background-color: #09090b; }
        .theme-nord { background-color: #2e3440; }
        .theme-midnight { background-color: #020617; }
        .theme-sunset { background-color: #1a0b16; }

        /* Generic adjustments for non-dark themes */
        .theme-light h1, .theme-light h2, .theme-light h3, .theme-light h4 { color: #18181b !important; }
        .theme-light p, .theme-light span { color: #52525b !important; }
        .theme-light .bg-zinc-900 { background-color: #ffffff !important; border-color: #e4e4e7 !important; color: #18181b !important; }
        .theme-light .bg-zinc-800 { background-color: #f4f4f5 !important; border-color: #e4e4e7 !important; }
        .theme-light .border-zinc-800 { border-color: #e4e4e7 !important; }
        
        /* Nord Theme */
        .theme-nord h1, .theme-nord h2, .theme-nord h3 { color: #eceff4 !important; }
        .theme-nord p, .theme-nord span { color: #d8dee9 !important; }
        .theme-nord .bg-zinc-900 { background-color: #3b4252 !important; border-color: #4c566a !important; }
        .theme-nord .bg-zinc-800 { background-color: #434c5e !important; border-color: #4c566a !important; }
        .theme-nord .border-zinc-800 { border-color: #4c566a !important; }
        .theme-nord .text-indigo-500 { color: #88c0d0 !important; }
        .theme-nord .bg-indigo-600 { background-color: #81a1c1 !important; }
        
        /* Midnight Theme */
        .theme-midnight { color: #f1f5f9; }
        .theme-midnight .bg-zinc-900 { background-color: #0f172a !important; border-color: #1e293b !important; }
        .theme-midnight .bg-zinc-800 { background-color: #1e293b !important; border-color: #334155 !important; }
        .theme-midnight .border-zinc-800 { border-color: #1e293b !important; }

        /* Sunset Theme */
        .theme-sunset { color: #ffe4e6; }
        .theme-sunset .bg-zinc-900 { background-color: #2d1624 !important; border-color: #4a203a !important; }
        .theme-sunset .bg-zinc-800 { background-color: #4a203a !important; border-color: #6b2d4f !important; }
        .theme-sunset .border-zinc-800 { border-color: #4a203a !important; }
        .theme-sunset .text-indigo-500 { color: #fb7185 !important; }
        .theme-sunset .bg-indigo-600 { background-color: #e11d48 !important; }

        /* Card responsiveness fixes */
        @media (max-width: 640px) {
          .grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          h1 { font-size: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
