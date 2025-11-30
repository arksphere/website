import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export const ArksDiagram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // State to display what is happening in the diagram
  const [statusText, setStatusText] = useState("System Idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- SETUP ---
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Hide dynamic elements initially
      gsap.set('.request-packet', { opacity: 0, scale: 0 });
      gsap.set('.token-particle', { opacity: 0 });
      gsap.set('.gpu-core', { fillOpacity: 0.3 }); // Start visible but dim
      gsap.set('.link-path', { strokeDasharray: 10, strokeDashoffset: 10, opacity: 0.3 });
      gsap.set('.lb-line', { strokeDasharray: 100, strokeDashoffset: 100 });
      
      // Animate Ops Lines (Dashed lines from roles)
      gsap.to('.ops-line', {
        strokeDashoffset: -20,
        duration: 2,
        ease: "linear",
        repeat: -1
      });

      // --- ANIMATION SEQUENCE ---

      // 1. USER REQUEST -> SYSTEM LAYER
      tl.call(() => setStatusText("1. Ingress (System Layer)"))
        .to('#user-node', { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 })
        .to('.request-packet', { opacity: 1, scale: 1, duration: 0.1 })
        .to('.request-packet', { 
            motionPath: { path: '#path-user-sys', align: '#path-user-sys', alignOrigin: [0.5, 0.5] },
            duration: 0.6, 
            ease: "power1.inOut"
        })
        .to('#box-sys', { stroke: '#FBBC04', strokeWidth: 3, duration: 0.2, yoyo: true, repeat: 1 });

      // 2. SYSTEM -> RUNTIME LAYER
      tl.call(() => setStatusText("2. Agent Orchestration (Runtime Layer)"))
        .to('.request-packet', { 
            motionPath: { path: '#path-sys-run', align: '#path-sys-run', alignOrigin: [0.5, 0.5] },
            duration: 0.6, 
            ease: "power1.inOut"
        })
        .to('#box-run', { stroke: '#0F9D58', strokeWidth: 3, duration: 0.2 })
        // Compass spin
        .to('#compass-icon', { rotation: 360, duration: 1.2, ease: "elastic.out(1, 0.75)" })
        .to('#box-run', { strokeWidth: 1, duration: 0.2 });

      // 3. RUNTIME -> KUBERNETES
      tl.call(() => setStatusText("3. Pod Scheduling (Kubernetes)"))
        .to('.request-packet', { 
            motionPath: { path: '#path-run-k8s', align: '#path-run-k8s', alignOrigin: [0.5, 0.5] },
            duration: 0.6, 
            ease: "power1.inOut"
        })
        .to('#box-k8s', { stroke: '#4285F4', strokeWidth: 3, duration: 0.2 })
        // K8s Routing Animation (Load Balance)
        .to('.lb-line', { strokeDashoffset: 0, duration: 0.4, ease: "none" })
        .to('#box-k8s', { strokeWidth: 1, duration: 0.2 });

      // 4. KUBERNETES -> AI RUNTIME
      tl.call(() => setStatusText("4. Matrix Compute (vLLM)"))
        .to('.request-packet', { 
            motionPath: { path: '#path-k8s-ai', align: '#path-k8s-ai', alignOrigin: [0.5, 0.5] },
            duration: 0.4, 
            ease: "power1.inOut"
        })
        .to('#box-ai', { stroke: '#EA4335', strokeWidth: 3, duration: 0.1 })
        // GPU FLASH
        .to('.gpu-core', { 
            fillOpacity: 1, 
            fill: '#EA4335',
            stagger: { grid: [3, 4], from: "center", amount: 0.1 }, 
            duration: 0.1,
            yoyo: true,
            repeat: 3
        })
        .to('#box-ai', { strokeWidth: 1, duration: 0.2 });

      // 5. RESPONSE STREAM (AI -> System -> USER)
      tl.call(() => setStatusText("5. Streaming Tokens"))
        .to('.request-packet', { opacity: 0, duration: 0.1 }) // Hide request packet
        .to('.token-particle', { 
            opacity: 1, 
            y: -420, // Move UP to user
            duration: 1.5, 
            stagger: 0.05, 
            ease: "power1.out" 
        })
        .to('.token-particle', { opacity: 0, duration: 0.1 }, ">-0.5");

      tl.call(() => setStatusText("Idle"));

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-gray-50 dark:bg-[#080808] flex flex-col items-center justify-center p-4 select-none rounded-3xl">
      
      {/* Status Indicator */}
      <div className="mb-4 px-4 py-2 bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 rounded-full shadow-sm flex items-center gap-2 min-w-[280px] justify-center z-10">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-sm font-mono font-medium text-gray-700 dark:text-gray-200">{statusText}</span>
      </div>

      <div className="relative w-full max-w-4xl aspect-[4/3.5]">
        {/* ViewBox increased to 800 width to accommodate side roles */}
        <svg className="w-full h-full" viewBox="0 0 800 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                </marker>
                <marker id="arrowhead-ops" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#9CA3AF" />
                </marker>
            </defs>

            {/* --- ROLES (Left Side) --- */}
            
            {/* App Developer */}
            <g transform="translate(80, 310)">
                <circle r="24" className="fill-green-50 dark:fill-green-900/20 stroke-green-500" strokeWidth="2" />
                {/* Code Icon */}
                <path d="M-8 -4 L-14 0 L-8 4 M8 -4 L14 0 L8 4 M-3 8 L3 -8" stroke="currentColor" className="text-green-600 dark:text-green-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="0" y="40" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">App Dev</text>
                
                {/* Connection to Runtime */}
                <path d="M30 0 L160 0" stroke="currentColor" className="ops-line text-gray-300 dark:text-gray-700" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead-ops)"/>
                
                {/* Label Background to hide line overlap */}
                <rect x="60" y="-8" width="74" height="16" rx="4" className="fill-gray-50 dark:fill-[#080808]" />
                <text x="95" y="4" textAnchor="middle" className="text-[10px] font-bold fill-gray-500 dark:fill-gray-400 uppercase tracking-wide">Deploy DAG</text>
            </g>

            {/* Platform Engineer */}
            <g transform="translate(80, 480)">
                <circle r="24" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-500" strokeWidth="2" />
                {/* Server/Ops Icon */}
                <rect x="-10" y="-10" width="20" height="20" rx="2" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" fill="none"/>
                <line x1="-6" y1="0" x2="6" y2="0" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2"/>
                <text x="0" y="40" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">Platform Eng</text>

                {/* Connection to K8s */}
                <path d="M30 0 L110 0" stroke="currentColor" className="ops-line text-gray-300 dark:text-gray-700" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead-ops)"/>
                
                {/* Label Background */}
                <rect x="50" y="-8" width="40" height="16" rx="4" className="fill-gray-50 dark:fill-[#080808]" />
                <text x="70" y="4" textAnchor="middle" className="text-[10px] font-bold fill-gray-500 dark:fill-gray-400 uppercase tracking-wide">Scale</text>
            </g>

             {/* Model Engineer */}
             <g transform="translate(80, 560)">
                <circle r="24" className="fill-red-50 dark:fill-red-900/20 stroke-red-500" strokeWidth="2" />
                {/* Chip Icon */}
                <rect x="-8" y="-8" width="16" height="16" stroke="currentColor" className="text-red-600 dark:text-red-400" strokeWidth="2" fill="none"/>
                <path d="M-8 0 H-12 M8 0 H12 M0 -8 V-12 M0 8 V12" stroke="currentColor" className="text-red-600 dark:text-red-400" strokeWidth="2"/>
                <text x="0" y="40" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">Model Eng</text>

                {/* Connection to AI (Inside K8s) */}
                <path d="M30 0 L160 0" stroke="currentColor" className="ops-line text-gray-300 dark:text-gray-700" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead-ops)"/>
                
                {/* Label Background */}
                <rect x="50" y="-8" width="54" height="16" rx="4" className="fill-gray-50 dark:fill-[#080808]" />
                <text x="77" y="4" textAnchor="middle" className="text-[10px] font-bold fill-gray-500 dark:fill-gray-400 uppercase tracking-wide">Weights</text>
            </g>


            {/* --- CONNECTION LINES (Static pipes - CENTERED AT X=400) --- */}
            <path d="M400 80 L400 120" stroke="currentColor" className="link-path text-gray-300 dark:text-gray-700" strokeWidth="2" />
            <path d="M400 220 L400 260" stroke="currentColor" className="link-path text-gray-300 dark:text-gray-700" strokeWidth="2" />
            <path d="M400 360 L400 400" stroke="currentColor" className="link-path text-gray-300 dark:text-gray-700" strokeWidth="2" />
            <path d="M400 540 L400 580" stroke="currentColor" className="link-path text-gray-300 dark:text-gray-700" strokeWidth="2" />

            {/* --- ANIMATION PATHS (Hidden, shifted +100) --- */}
            <path id="path-user-sys" d="M400 50 L400 120" fill="none" />
            <path id="path-sys-run" d="M400 170 L400 260" fill="none" />
            <path id="path-run-k8s" d="M400 360 L400 440" fill="none" />
            <path id="path-k8s-ai" d="M400 540 L400 600" fill="none" />


            {/* --- LAYERS (Shifted +100) --- */}

            {/* 1. USER (Top) */}
            <g id="user-node" transform="translate(400, 50)">
                <circle r="20" className="fill-gray-200 dark:fill-gray-800 stroke-gray-400" strokeWidth="2" />
                <path d="M-7 5 Q0 12 7 5 M-7 -2 A 2 2 0 0 1 -3 -2 M3 -2 A 2 2 0 0 1 7 -2" stroke="currentColor" className="text-gray-600 dark:text-gray-400" strokeWidth="2" fill="none" />
                <text x="30" y="5" className="text-xs font-bold fill-gray-500 dark:fill-gray-400">User</text>
            </g>

            {/* 2. SYSTEM LAYER */}
            <g transform="translate(250, 120)">
                <rect id="box-sys" width="300" height="100" rx="12" className="fill-white dark:fill-[#111] stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />
                
                <text x="24" y="40" className="text-sm font-bold fill-gray-800 dark:fill-white">System Layer</text>
                <text x="24" y="60" className="text-xs fill-gray-500">API Gateway / Auth</text>
                <text x="24" y="75" className="text-xs fill-gray-500">React Frontend</text>

                {/* UI Wireframe Icon (RIGHT) */}
                <g transform="translate(220, 25)">
                   <rect x="0" y="0" width="60" height="50" rx="4" fill="none" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1.5" />
                   <line x1="0" y1="15" x2="60" y2="15" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
                   <rect x="5" y="22" width="20" height="4" rx="1" fill="currentColor" className="text-gray-300 dark:text-gray-700" />
                   <rect x="5" y="30" width="35" height="4" rx="1" fill="currentColor" className="text-gray-300 dark:text-gray-700" />
                </g>
            </g>

            {/* 3. RUNTIME LAYER */}
            <g transform="translate(250, 260)">
                <rect id="box-run" width="300" height="100" rx="12" className="fill-white dark:fill-[#111] stroke-gray-300 dark:stroke-gray-700" strokeWidth="1" />
                
                <text x="24" y="40" className="text-sm font-bold fill-gray-800 dark:fill-white">Runtime / Agent</text>
                <text x="24" y="60" className="text-xs fill-gray-500">LangGraph Orchestration</text>
                <text x="24" y="75" className="text-xs fill-gray-500">Tool Execution / History</text>

                {/* Compass/Star Icon (RIGHT) */}
                <g id="compass-icon" transform="translate(250, 50)">
                    {/* 4-point star shape */}
                    <path d="M0 -18 L5 -5 L18 0 L5 5 L0 18 L-5 5 L-18 0 L-5 -5 Z" fill="none" stroke="#0F9D58" strokeWidth="2" strokeLinejoin="round" />
                    <circle r="3" fill="#0F9D58" />
                </g>
            </g>

            {/* 4. KUBERNETES LAYER - Container for AI */}
            <g transform="translate(200, 400)">
                <rect id="box-k8s" width="400" height="260" rx="20" className="fill-blue-50/50 dark:fill-blue-900/10 stroke-gray-300 dark:stroke-gray-700" strokeDasharray="8 4" strokeWidth="1" />
                
                <text x="24" y="30" className="text-sm font-bold fill-blue-600 dark:fill-blue-400">Kubernetes Cluster</text>
                <text x="24" y="45" className="text-xs fill-gray-500">KServe / Kueue / Auto-scaling</text>

                {/* Load Balancer Visualization */}
                <line x1="200" y1="40" x2="200" y2="80" stroke="currentColor" className="lb-line text-gray-400" strokeWidth="2" />
                <line x1="150" y1="80" x2="250" y2="80" stroke="currentColor" className="lb-line text-gray-400" strokeWidth="2" />
                <line x1="150" y1="80" x2="150" y2="100" stroke="currentColor" className="lb-line text-gray-400" strokeWidth="2" />
                <line x1="250" y1="80" x2="250" y2="100" stroke="currentColor" className="lb-line text-gray-400" strokeWidth="2" />
                
                <circle cx="200" cy="80" r="4" fill="#4285F4" />

                {/* 5. AI RUNTIME LAYER - Inside K8s */}
                <g transform="translate(50, 110)">
                    <rect id="box-ai" width="300" height="120" rx="12" className="fill-white dark:fill-[#0a0a0a] stroke-gray-300 dark:stroke-gray-600" strokeWidth="1" />
                    
                    <text x="24" y="30" className="text-sm font-bold fill-gray-800 dark:fill-white">AI Runtime</text>
                    <text x="24" y="45" className="text-xs fill-gray-500">vLLM Engine / PyTorch</text>

                    {/* GPU Matrix Visualization (RIGHT) */}
                    <g transform="translate(160, 30)">
                        <text x="60" y="-10" textAnchor="middle" className="text-[10px] fill-gray-400">NVIDIA H100</text>
                        {[0, 1, 2].map(row => (
                            <g key={row} transform={`translate(0, ${row * 25})`}>
                                {[0, 1, 2, 3].map(col => (
                                    <rect 
                                        key={col} 
                                        x={col * 30} 
                                        width="24" 
                                        height="18" 
                                        rx="2" 
                                        className="gpu-core fill-gray-300 dark:fill-gray-800"
                                    />
                                ))}
                            </g>
                        ))}
                    </g>
                </g>
            </g>

            {/* --- ANIMATED ELEMENTS --- */}
            
            {/* Request Packet */}
            <circle className="request-packet" r="6" fill="#1A73E8" stroke="white" strokeWidth="2" />

            {/* Response Token Stream (Particles) */}
            <g transform="translate(400, 600)">
                {[0,1,2,3,4].map(i => (
                    <rect 
                        key={i}
                        className="token-particle"
                        x="-15"
                        y={i * 12}
                        width="30"
                        height="6"
                        rx="3"
                        fill={i % 2 === 0 ? '#4285F4' : '#0F9D58'}
                    />
                ))}
            </g>

        </svg>
      </div>
    </div>
  );
};