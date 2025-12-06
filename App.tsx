import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { View } from "./types";

// Lazy load route components for code splitting
const Overview = lazy(() =>
  import("./views/Overview").then((m) => ({ default: m.Overview }))
);
const OssHubIndex = lazy(() =>
  import("./views/OssHubIndex").then((m) => ({ default: m.OssHubIndex }))
);
const CategoryView = lazy(() =>
  import("./views/CategoryView").then((m) => ({ default: m.CategoryView }))
);
const ProjectDetail = lazy(() =>
  import("./views/ProjectDetail").then((m) => ({ default: m.ProjectDetail }))
);
const Architecture = lazy(() =>
  import("./views/Architecture").then((m) => ({ default: m.Architecture }))
);
const Stack = lazy(() =>
  import("./views/Stack").then((m) => ({ default: m.Stack }))
);
const Community = lazy(() =>
  import("./views/Community").then((m) => ({ default: m.Community }))
);
const AgentOps = lazy(() =>
  import("./views/AgentOps").then((module) => ({
    default: module.AgentOps,
  }))
);
const Capabilities = lazy(() =>
  import("./views/Capabilities").then((m) => ({ default: m.Capabilities }))
);
const AgenticRuntimeSpec = lazy(() =>
  import("./views/AgenticRuntimeSpec").then((m) => ({
    default: m.AgenticRuntimeSpec,
  }))
);

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Check system preference
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(systemPrefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (location.pathname === "/agentops") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0D0D0D";
      document.body.style.color = "#F7F9FA";
      return;
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0D0D0D";
      document.body.style.color = "#F7F9FA";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#F7F9FA";
      document.body.style.color = "#202124";
    }
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Determine current view based on path for Navbar highlighting
  const getCurrentView = (path: string): View => {
    switch (path) {
      case "/":
        return View.OVERVIEW;
      case "/osshub":
        return View.OSS_HUB;
      case "/architecture":
      case "/runtime":
        return View.AGENT_RUNTIME;
      case "/stack":
      case "/ai-native-infra":
        return View.AI_INFRA;
      case "/community":
        return View.COMMUNITY;
      default:
        return View.OVERVIEW;
    }
  };

  const currentView = getCurrentView(location.pathname);

  return (
    <div
      className={`flex flex-col font-sans transition-colors duration-300 ${
        location.pathname === "/agentops"
          ? "h-screen overflow-hidden"
          : "min-h-screen"
      } ${
        theme === "dark" || location.pathname === "/agentops"
          ? "bg-[#0D0D0D] text-white"
          : "bg-[#F7F9FA] text-gray-900"
      }`}
    >
      <Navbar
        currentView={currentView}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main
        className={`flex-grow ${
          location.pathname === "/" || location.pathname === "/agentops"
            ? "p-0"
            : "pt-8 px-4 sm:px-6 lg:px-8"
        }`}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={<Overview onChangeView={() => {}} theme={theme} />}
            />
            <Route path="/osshub" element={<OssHubIndex />} />
            <Route
              path="/osshub/category/:categorySlug"
              element={<CategoryView />}
            />
            <Route path="/osshub/:slug" element={<ProjectDetail />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route
              path="/architecture/capabilities"
              element={<Capabilities />}
            />
            <Route
              path="/specs/agentic-runtime-spec"
              element={<AgenticRuntimeSpec />}
            />
            <Route path="/stack" element={<Stack />} />
            <Route path="/community" element={<Community />} />
            <Route path="/agentops" element={<AgentOps />} />
          </Routes>
        </Suspense>
      </main>

      {location.pathname !== "/agentops" && <Footer />}
    </div>
  );
}

export default App;
