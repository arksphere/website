import React from "react";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faWeixin } from "@fortawesome/free-brands-svg-icons";

export const Community: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#050505] text-gray-900 dark:text-white w-full overflow-x-hidden font-sans transition-colors duration-500">
      <Helmet>
        <title>Community - ArkSphere</title>
        <meta
          name="description"
          content="Join the ArkSphere community to build the runtime, infra, and OSS map together."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Join the Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building the{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              AI Agentic Runtime
            </span>
            ,{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              AI Native Infra
            </span>
            , and{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              Ecosystem Mapping
            </span>{" "}
            — together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Join Us */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a]">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Join the Discussion
            </h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://discord.gg/PAvduR6ns4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faDiscord} className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Discord Server
                    </div>
                    <div className="text-sm text-gray-500">
                      Chat with maintainers & builders
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-[#07C160] flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faWeixin} className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      WeChat Group
                    </div>
                    <div className="text-sm text-gray-500">
                      Add "jimmysong" to join.{" "}
                      <a
                        href="https://jimmysong.io/zh/community/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Contribution */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a]">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Contribution
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              We welcome contributions to the runtime, infrastructure, and the
              OSS Hub map.
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/arksphere/community/blob/main/contribution/guide.md"
                  className="block p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    Contribution Guidelines
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Learn how to submit PRs and issues
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/arksphere/community/blob/main/community/code-of-conduct.md"
                  className="block p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    Community Covenant
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Our code of conduct
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Working Groups */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Working Groups
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Runtime WG
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Defining the standard for agent execution, scheduling, and
                lifecycle management.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Infra WG
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Building the serving layer, GPU orchestration, and distributed
                compute patterns.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                OSS Hub WG
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Curating and mapping the ecosystem of AI tools and frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
