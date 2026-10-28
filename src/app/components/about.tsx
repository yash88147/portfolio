import { useState } from "react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"bio" | "experience">("bio");

  return (
    <div className="flex flex-col justify-center h-full max-w-3xl space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          02. <span className="text-fuchsia-400">About Me</span>
        </h2>
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab("bio")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "bio"
                ? "bg-fuchsia-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Biography
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === "experience"
                ? "bg-fuchsia-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Experience
          </button>
        </div>
      </div>

      {activeTab === "bio" ? (
        <div className="space-y-4 text-zinc-300 text-base md:text-lg leading-relaxed">
          <p>
            I bridge the gap between design engineering and full-stack
            architecture. With a focus on 60fps animations and accessible
            component systems, I turn static layouts into memorable products.
          </p>
          <p>
            When I&apos;m not tweaking GSAP timelines or optimizing React
            renders, I explore WebGL shaders and contribute to open-source UI
            libraries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <p className="text-xs text-fuchsia-400 font-mono">2024 — PRESENT</p>
            <h3 className="text-lg font-semibold text-white mt-1">
              Senior Frontend Engineer
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Leading interactive web architecture & design systems.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <p className="text-xs text-pink-400 font-mono">2022 — 2024</p>
            <h3 className="text-lg font-semibold text-white mt-1">
              Full-Stack Developer
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Built real-time SaaS dashboards with Next.js and Node.js.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
