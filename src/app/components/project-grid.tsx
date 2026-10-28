export default function ProjectsGrid() {
  const projects = [
    {
      title: "Nebula AI Studio",
      tech: "Next.js • WebGL • Tailwind",
      desc: "Real-time generative visual workspace with node-based workflows.",
      link: "#",
    },
    {
      title: "Pulse Analytics",
      tech: "TypeScript • D3.js • Prisma",
      desc: "High-frequency financial telemetry dashboard with sub-second updates.",
      link: "#",
    },
    {
      title: "Kinetix UI",
      tech: "React • GSAP • Motion",
      desc: "Open-source collection of scroll-driven physics primitives.",
      link: "#",
    },
  ];

  return (
    <div className="flex flex-col justify-center h-full space-y-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          03. <span className="text-amber-400">Selected Works</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 mt-1">
          Hover and click any project card to inspect details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            onClick={(e) => {
              e.preventDefault();
              alert(`Opening project: ${project.title}`);
            }}
            className="group p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono text-amber-400">
                {project.tech}
              </span>
              <h3 className="text-xl font-bold text-white mt-2 group-hover:text-amber-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-400 mt-2">{project.desc}</p>
            </div>
            <span className="text-xs font-semibold text-zinc-300 group-hover:translate-x-1 transition-transform inline-block mt-4">
              View Case Study →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}