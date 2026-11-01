import { useState } from "react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<
    "niche" | "education" | "achievements"
  >("niche");

  return (
    <div className="flex flex-col justify-center h-full max-w-4xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl md:text-5xl font-bold text-white">
            02. <span className="text-fuchsia-400">About &amp; Role</span>
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">
            Clear frontend specialization so you know exactly how I fit into
            your team.
          </p>
        </div>

        <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab("niche")}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "niche"
                ? "bg-fuchsia-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Frontend Scope
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "education"
                ? "bg-fuchsia-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "achievements"
                ? "bg-fuchsia-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Achievements
          </button>
        </div>
      </div>

      {activeTab === "niche" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-fuchsia-500/30">
            <p className="text-xs font-mono uppercase text-fuchsia-400">
              01. Motion &amp; Marketing Sites
            </p>
            <h3 className="text-base md:text-lg font-bold text-white mt-1">
              GSAP &amp; Next.js Landing Pages
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 mt-2">
              Scroll-driven storytelling, interactive product reveals, and
              WCAG-accessible responsive layouts that convert visitors into
              customers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <p className="text-xs font-mono uppercase text-pink-400">
              02. SaaS UI &amp; Dashboards
            </p>
            <h3 className="text-base md:text-lg font-bold text-white mt-1">
              Data-Driven React Interfaces
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 mt-2">
              Modular component architectures, interactive Recharts data
              visualizations, dark/light theming, and complex state with
              Zustand, Redux Toolkit, &amp; TanStack Query.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <p className="text-xs font-mono uppercase text-emerald-400">
              03. Clear Role Boundary
            </p>
            <h3 className="text-base md:text-lg font-bold text-white mt-1">
              Seamless API Integration
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 mt-2">
              I focus 100% on the frontend experience and connect cleanly to
              your existing REST/GraphQL APIs, Firebase, Supabase, or headless
              CMS—no messy backend guesswork.
            </p>
          </div>
        </div>
      )}

      {activeTab === "education" && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-fuchsia-400">
                2022 — 2026 • INDORE / BHOPAL, MP
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Indian Institute of Information Technology (IIIT)
              </h3>
              <p className="text-sm text-zinc-300 mt-1">
                Bachelor of Technology (B.Tech.) in Information Technology
              </p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono shrink-0">
              Strong Algorithmic Foundation
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Combining strong computer science fundamentals with modern UI
            engineering allows me to write clean, maintainable TypeScript code
            with minimal re-renders and smooth performance across all devices.
          </p>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <p className="text-xs text-fuchsia-400 font-mono">
              ALGORITHMIC PROBLEM SOLVING
            </p>
            <h3 className="text-base font-semibold text-white mt-1">
              1000+ Problems Solved
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Across LeetCode (Top 14%), GeeksforGeeks, and Coding Ninjas—bringing
              fast logic and optimization to complex frontend state.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <p className="text-xs text-pink-400 font-mono">
              COMPETITIVE PROGRAMMING
            </p>
            <h3 className="text-base font-semibold text-white mt-1">
              3-Star Coder on CodeChef
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Ranked under Global Top 200 in CodeChef Starters.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <p className="text-xs text-amber-400 font-mono">HACKATHONS</p>
            <h3 className="text-base font-semibold text-white mt-1">
              Smart India Hackathon
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Built an interactive AR-based Web Experience for Historical
              Places.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <p className="text-xs text-cyan-400 font-mono">CERTIFICATIONS</p>
            <h3 className="text-base font-semibold text-white mt-1">
              Web Dev &amp; DSA Workshops
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Certified by GeeksforGeeks &amp; IIT Patna.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}