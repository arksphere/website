import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";
import { faRocket, faServer, faMap } from "@fortawesome/free-solid-svg-icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-gray-800 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ArkSphere
          </span>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Agentic Runtime + AI Native Infra + OSS Hub, built openly with the
            community.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
            Resources
          </h4>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href="/architecture"
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faRocket} className="w-4 h-4" />
                Agentic Runtime
              </a>
            </li>
            <li>
              <a
                href="/stack"
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faServer} className="w-4 h-4" />
                AI Native Infra
              </a>
            </li>
            <li>
              <a
                href="/osshub"
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faMap} className="w-4 h-4" />
                OSS Hub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
            Community
          </h4>
          <ul className="mt-4 space-y-4">
            <li>
              <a
                href="https://discord.gg/PAvduR6ns4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faDiscord} className="w-4 h-4" />
                Discord
              </a>
            </li>
            <li>
              <a
                href="/community"
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faWeixin} className="w-4 h-4" />
                WeChat
              </a>
            </li>
            <li>
              <a
                href="https://github.com/arksphere/community/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
        <p className="text-center text-sm text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} ArkSphere. All rights reserved.
          ArkSphere.dev
        </p>
      </div>
    </footer>
  );
};
