import { useState } from "react";

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string>(
    "React 18 & Next.js 14"
  );

  const skills = [
    {
      name: "React 18 & Next.js 14",
      category: "Core Frontend",
      level:
        "Modular, reusable component architecture, App Router, custom hooks, and fast Vercel builds.",
    },
    {
      name: "TypeScript & ES6+",
      category: "Core Frontend",
      level:
        "Strict type-safe UI components, predictable props, and maintainable frontend codebases.",
    },
    {
      name: "GSAP & ScrollTrigger",
      category: "Motion & UI",
      level:
        "Timeline choreography, pinned scroll experiences, and high-converting interactive animations.",
    },
    {
      name: "Tailwind CSS & DaisyUI",
      category: "Motion & UI",
      level:
        "Pixel-perfect Figma conversion, WCAG-compliant accessibility, mobile-first layouts, and dark/light theming.",
    },
    {
      name: "Redux Toolkit, Zustand & TanStack Query",
      category: "State & Data",
      level:
        "Predictable global state, minimal re-renders, and seamless async REST API caching & integration.",
    },
    {
      name: "Recharts & Data Viz",
      category: "State & Data",
      level:
        "Interactive financial and analytics charts for SaaS dashboards and admin panels.",
    },
    {
      name: "REST APIs, Prisma & Node.js (Working Knowledge)",
      category: "Integration",
      level:
        "Familiar with backend endpoints, JWT auth flows, and Prisma ORM so I can collaborate effortlessly with your backend engineers.",
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full max-w-4xl space-y-5">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          04. <span className="text-blue-400">Tech Stack</span>
        </h2>
        <p className="text-xs md:text-base text-zinc-400 mt-1">
          Click any technology below to see how I use it to deliver client
          projects:
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <button
            key={skill.name}
            onClick={() => setSelectedSkill(skill.name)}
            className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium border transition-all cursor-pointer ${
              selectedSkill === skill.name
                ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20"
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600"
            }`}
          >
            {skill.name}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-xl bg-blue-950/30 border border-blue-500/30 max-w-2xl">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono uppercase text-blue-400">
            {selectedSkill}
          </p>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
            {skills.find((s) => s.name === selectedSkill)?.category}
          </span>
        </div>
        <p className="text-sm md:text-base text-zinc-200 mt-2 leading-relaxed">
          {skills.find((s) => s.name === selectedSkill)?.level}
        </p>
      </div>
    </div>
  );
}