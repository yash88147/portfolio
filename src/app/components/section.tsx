import { useState } from "react";

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string>("GSAP & ScrollTrigger");

  const skills = [
    { name: "GSAP & ScrollTrigger", level: "Expert timeline choreography & scrubbing" },
    { name: "React & Next.js", level: "App Router, Server Actions, & SSR performance" },
    { name: "TypeScript", level: "Strict type-safe architecture & generics" },
    { name: "Tailwind CSS", level: "Responsive design systems & custom tokens" },
    { name: "Node.js & Postgres", level: "REST/GraphQL APIs, caching, & ORM modeling" },
    { name: "Three.js / WebGL", level: "Custom GLSL shaders & 3D scene integration" },
  ];

  return (
    <div className="flex flex-col justify-center h-full space-y-6">
      <h2 className="text-3xl md:text-5xl font-bold text-white">
        04. <span className="text-blue-400">Technical Stack</span>
      </h2>
      <p className="text-sm md:text-base text-zinc-400">
        Click a skill badge below to inspect proficiency focus:
      </p>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <button
            key={skill.name}
            onClick={() => setSelectedSkill(skill.name)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
              selectedSkill === skill.name
                ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20"
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600"
            }`}
          >
            {skill.name}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 max-w-xl">
        <p className="text-xs font-mono uppercase text-blue-400">
          Selected Focus: {selectedSkill}
        </p>
        <p className="text-base text-zinc-200 mt-1">
          {skills.find((s) => s.name === selectedSkill)?.level}
        </p>
      </div>
    </div>
  );
}