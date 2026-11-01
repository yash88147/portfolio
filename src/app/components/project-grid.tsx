export default function ProjectsGrid({ onContact }: { onContact: () => void }) {
  return (
    <div className="flex flex-col justify-center h-full max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          03. <span className="text-amber-400">Selected Works</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 mt-1">
          Curating new commercial-grade frontend &amp; motion showcases.
        </p>
      </div>

      {/* Empty State Showcase Placeholder for Upcoming Freelance Projects */}
      <div className="p-8 md:p-10 rounded-2xl bg-zinc-900/60 border-2 border-dashed border-zinc-800 flex flex-col items-start justify-center space-y-4">
        <span className="px-3 py-1 text-xs font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
          New Freelance Showcases In Progress
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white">
          Fresh Interactive Case Studies Dropping Soon
        </h3>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
          I am currently crafting dedicated production templates showcasing{" "}
          <span className="text-zinc-200 font-medium">
            GSAP ScrollTrigger Landing Pages
          </span>
          ,{" "}
          <span className="text-zinc-200 font-medium">
            Next.js + Recharts SaaS Dashboards
          </span>
          , and{" "}
          <span className="text-zinc-200 font-medium">
            Figma-to-React Design Systems
          </span>
          .
        </p>
        <button
          onClick={onContact}
          className="px-5 py-2.5 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
        >
          Discuss Your Frontend Project →
        </button>
      </div>
    </div>
  );
}