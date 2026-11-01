"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HeroSection({
  onExplore,
  onContact,
}: {
  onExplore: () => void;
  onContact: () => void;
}) {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const dpWrapperRef = useRef<HTMLDivElement>(null);
  const dpRingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Smooth entry animation for Hero text & Circular DP
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-anim",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, delay: 0.2 }
      ).fromTo(
        dpWrapperRef.current,
        { scale: 0.6, autoAlpha: 0, rotate: -8 },
        {
          scale: 1,
          autoAlpha: 1,
          rotate: 0,
          duration: 1.2,
          ease: "back.out(1.4)",
        },
        "-=0.7"
      );

      // Subtle continuous floating animation for the DP circle
      gsap.to(dpWrapperRef.current, {
        y: -10,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Slow rotation for the decorative outer ring
      gsap.to(dpRingRef.current, {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: heroContainerRef }
  );

  return (
    <div
      ref={heroContainerRef}
      className="flex flex-col-reverse lg:flex-row items-center justify-between h-full gap-8 lg:gap-12"
    >
      {/* Left Column: Niche Positioning & Call to Action */}
      <div className="flex flex-col items-start justify-center space-y-4 md:space-y-5 max-w-2xl">
        <span className="hero-anim px-3.5 py-1 text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
          Frontend Specialist • Available for Freelance
        </span>

        <h1 className="hero-anim text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Hi, I&apos;m{" "}
          <span className="text-cyan-400">Yashwardhan Singh</span>.
        </h1>

        <p className="hero-anim text-lg md:text-2xl font-semibold text-zinc-200">
          Interactive Frontend &amp; SaaS UI Engineer{" "}
          <span className="text-cyan-400 text-base md:text-xl font-mono">
            (Next.js • TypeScript • GSAP)
          </span>
        </p>

        <p className="hero-anim text-sm md:text-base text-zinc-400 leading-relaxed">
          I help startups, agencies, and founders turn Figma designs into
          high-converting animated landing pages and responsive SaaS dashboards.
          100% focused on pixel-perfect frontend architecture, state management,
          and smooth 60fps motion—ready to plug into your existing backend or
          APIs.
        </p>

        <div className="hero-anim flex flex-wrap gap-3 pt-2">
          <button
            onClick={onContact}
            className="px-6 py-3 text-sm md:text-base font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
          >
            Hire Me for Frontend
          </button>
          <button
            onClick={onExplore}
            className="px-5 py-3 text-sm md:text-base font-medium text-white border border-zinc-700 hover:border-cyan-400 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
          >
            What I Build →
          </button>
          <a
            href="https://github.com/yash88147"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 text-sm md:text-base font-medium text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white rounded-lg transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Right Column: Circular Face DP Area with Smooth Entry Animation */}
      <div className="relative flex items-center justify-center shrink-0">
        <div
          ref={dpWrapperRef}
          className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center"
        >
          {/* Rotating Dashed Accent Ring */}
          <div
            ref={dpRingRef}
            className="absolute -inset-3 rounded-full border-2 border-dashed border-cyan-400/50 pointer-events-none"
          />

          {/* Soft Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-emerald-500/30 blur-xl pointer-events-none" />

          {/* Circular DP Frame — Replace src="/dp.jpg" with your photo in /public */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400 bg-zinc-900 flex flex-col items-center justify-center text-center shadow-2xl">
            <img
              src="/dp.jpg"
              alt="Yashwardhan Singh"
              onError={(e) => {
                // Fallback styling if /dp.jpg isn't placed in /public yet
                e.currentTarget.style.display = "none";
              }}
              className="w-full h-full object-cover"
            />
            <span className="text-xs md:text-sm font-mono text-zinc-400 px-4">
              Place <code className="text-cyan-400">/public/dp.jpg</code> here
            </span>
          </div>

          {/* Floating Status Badge */}
          <div className="absolute -bottom-2 bg-zinc-950 border border-cyan-500/40 px-3 py-1 rounded-full shadow-lg">
            <span className="text-xs font-mono text-cyan-400">
              ⚡ IIIT B.Tech IT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}