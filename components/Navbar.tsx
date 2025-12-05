import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { NAV_ITEMS, NAV_LABELS } from "../constants";
import { View } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface NavbarProps {
  currentView: View;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  theme,
  toggleTheme,
}) => {
  const location = useLocation();

  // Helper to determine if a link is active
  const isActive = (view: View) => {
    if (view === View.OVERVIEW && location.pathname === "/") return true;
    if (view === View.OSS_HUB && location.pathname === "/osshub") return true;
    if (
      view === View.AGENT_RUNTIME &&
      (location.pathname === "/architecture" ||
        location.pathname === "/runtime")
    )
      return true;
    if (
      view === View.AI_INFRA &&
      (location.pathname === "/stack" ||
        location.pathname === "/ai-native-infra")
    )
      return true;
    if (view === View.COMMUNITY && location.pathname === "/community")
      return true;
    if (view === View.AGENTOPS && location.pathname === "/agentops")
      return true;
    if (
      view === View.AGENTOPS_ARCHITECT &&
      location.pathname === "/agentops-architect"
    )
      return true;
    return false;
  };

  const getPath = (view: View) => {
    switch (view) {
      case View.OVERVIEW:
        return "/";
      case View.OSS_HUB:
        return "/osshub";
      case View.AGENT_RUNTIME:
        return "/architecture";
      case View.AI_INFRA:
        return "/stack";
      case View.COMMUNITY:
        return "/community";
      case View.AGENTOPS:
        return "/agentops";
      default:
        return "/";
    }
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Close menu when route changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Logo className="text-gray-900 dark:text-white" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={getPath(item.view)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.view)
                    ? "text-google-blue"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {NAV_LABELS[item.label]}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              )}
            </button>

            <a
              href="https://github.com/arksphere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Toggle Dark Mode"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0D0D0D]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={getPath(item.view)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.view)
                    ? "text-google-blue bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {NAV_LABELS[item.label]}
              </Link>
            ))}
            <a
              href="https://github.com/arksphere"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
