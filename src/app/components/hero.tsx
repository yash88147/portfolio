export default function HeroSection({onExplore} : {onExplore:() => void}) {
  return (
    <div className="flex flex-col items-start justify-center h-full space-y-6">
      <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
        Available for Freelance & Full-Time
      </span>
      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white">
        Creative <span className="text-cyan-400">Developer</span> & Engineer.
      </h1>
      <p className="text-base md:text-xl text-zinc-400 max-w-2xl">
        Crafting motion-driven interfaces, scalable web applications, and
        interactive digital experiences with Next.js, TypeScript, and GSAP.
      </p>
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={() => window.scrollBy({ top: 1800, behavior: "smooth" })}
          className="px-6 py-3 font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
        >
          Explore Work
        </button>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 font-medium text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 rounded-lg transition-colors"
        >
          GitHub Profile
        </a>
      </div>
    </div>
  );
}