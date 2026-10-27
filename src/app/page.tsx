"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================================
   1. CUSTOM INTERACTIVE SECTION COMPONENTS
   ============================================================================ */

function HeroSection() {
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

function AboutSection() {
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

function ProjectsGrid() {
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

function SkillsSection() {
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

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col justify-center h-full max-w-xl space-y-6">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          05. <span className="text-lime-400">Get In Touch</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 mt-1">
          Have a project in mind? Send a direct message below.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-xl bg-lime-500/10 border border-lime-500/40 text-lime-300 space-y-3">
          <h3 className="text-xl font-bold">Message Sent!</h3>
          <p className="text-sm text-zinc-300">
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs underline text-lime-400 cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
            />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
            />
          </div>
          <textarea
            rows={3}
            required
            placeholder="Tell me about your project or timeline..."
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 resize-none"
          />
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-black bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors cursor-pointer"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

/* ============================================================================
   2. PAGES CONFIGURATION
   ============================================================================ */

const PAGES = [
  {
    id: "hero",
    hBarColor: "bg-cyan-500",
    vBarColor: "bg-emerald-500",
    component: <HeroSection />,
  },
  {
    id: "about",
    hBarColor: "bg-fuchsia-500",
    vBarColor: "bg-pink-500",
    component: <AboutSection />,
  },
  {
    id: "projects",
    hBarColor: "bg-red-600",
    vBarColor: "bg-amber-500",
    component: <ProjectsGrid />,
  },
  {
    id: "skills",
    hBarColor: "bg-blue-500",
    vBarColor: "bg-indigo-500",
    component: <SkillsSection />,
  },
  {
    id: "contact",
    hBarColor: "bg-lime-500",
    vBarColor: "bg-teal-500",
    component: <ContactForm />,
  },
];

/* ============================================================================
   3. MAIN PORTFOLIO COMPONENT & GSAP TIMELINE
   ============================================================================ */

export default function Home() {
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const totalTransitions = PAGES.length - 1;
      const getArrowMaxX = () => window.innerWidth - window.innerHeight * 0.2;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalTransitions * 1800}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < totalTransitions; i++) {
        const isEvenStep = i % 2 === 0; // true: Left -> Right | false: Right -> Left
        const curr = i;
        const next = i + 1;

        // 1. Rotate arrow to point toward the opposite side
        tl.to(arrowRef.current, {
          rotation: isEvenStep ? -90 : 90,
          duration: 1,
          delay: 1,
        })
          // 2. Slide current vertical bar up
          .fromTo(
            `.v-bar-${curr}`,
            { y: "0vh" },
            {
              y: "-80vh",
              duration: 8,
              immediateRender: false,
            },
            ">"
          )
          // Slide current page content up AND disable pointer-events so it won't block the next page
          .fromTo(
            `.page-content-${curr}`,
            { y: "0vh", autoAlpha: 1, pointerEvents: "auto" },
            {
              y: "-80vh",
              autoAlpha: 0,
              pointerEvents: "none",
              duration: 8,
              immediateRender: false,
            },
            "<"
          )
          // Slide current horizontal bar up
          .fromTo(
            `.h-bar-${curr}`,
            { y: curr === 0 ? "0vh" : "-80vh" },
            {
              y: curr === 0 ? "-80vh" : "-160vh",
              duration: 8,
              immediateRender: false,
            },
            "<"
          )
          // Slide arrow and emerging horizontal bar up from bottom (85vh) to top (5vh)
          .fromTo(
            [arrowRef.current, `.h-bar-${next}`],
            { y: "0vh" },
            {
              y: "-80vh",
              duration: 8,
              immediateRender: false,
            },
            "<"
          )
          // Move arrow horizontally across the responsive screen width
          .to(
            arrowRef.current,
            {
              x: isEvenStep ? () => getArrowMaxX() : 0,
              duration: 6,
            },
            "<"
          )
          // Emerge next horizontal bar
          .fromTo(
            `.h-bar-${next}`,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: isEvenStep ? "left center" : "right center",
              duration: 6,
              immediateRender: true,
            },
            "<"
          )
          // Vanish current horizontal bar
          .to(
            `.h-bar-${curr}`,
            {
              scaleX: 0,
              transformOrigin: isEvenStep ? "left center" : "right center",
              duration: 6,
            },
            "<"
          )
          // 3. Rotate arrow downward (0 deg)
          .to(arrowRef.current, {
            rotation: 0,
            duration: 1,
          })
          // 4. Move arrow down to bottom corner while new vertical bar emerges & old vertical bar vanishes
          .to(arrowRef.current, {
            y: "0vh",
            duration: 4,
          })
          .fromTo(
            `.v-bar-${next}`,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              duration: 4,
              immediateRender: true,
            },
            "<"
          )
          .to(
            `.v-bar-${curr}`,
            {
              scaleY: 0,
              transformOrigin: "center bottom",
              duration: 4,
            },
            "<"
          )
          // 5. Reveal next page content and enable pointer-events for interactive clicks
          .fromTo(
            `.page-content-${next}`,
            {
              autoAlpha: 0,
              y: "20vh",
              pointerEvents: "none",
            },
            {
              autoAlpha: 1,
              y: "0vh",
              pointerEvents: "auto",
              duration: 4,
              immediateRender: true,
            },
            "<"
          );
      }
    },
    { scope: mainWrapperRef }
  );

  return (
    <div ref={mainWrapperRef} className="w-full bg-black">
      <div
        ref={containerRef}
        className="relative h-screen w-screen bg-black overflow-hidden"
      >
        {PAGES.map((page, index) => {
          const isFirst = index === 0;
          const isEvenIndex = index % 2 === 0;

          return (
            <div key={page.id}>
              {/* Responsive Horizontal Bar */}
              <div
                className={`h-bar-${index} ${page.hBarColor} h-[10vh] pointer-events-none ${
                  isFirst
                    ? "w-[calc(100vw-10vh)] top-[5vh] left-[5vh]"
                    : isEvenIndex
                    ? "w-[calc(100vw-20vh)] top-[85vh] left-[15vh]"
                    : "w-[calc(100vw-20vh)] top-[85vh] left-[5vh]"
                } absolute`}
              />

              {/* Responsive Vertical Bar */}
              <div
                className={`v-bar-${index} ${page.vBarColor} h-[80vh] w-[10vh] top-[5vh] pointer-events-none ${
                  isEvenIndex ? "left-[5vh]" : "left-[calc(100vw-15vh)]"
                } absolute`}
              />

              {/* Interactive Portfolio Page Content Wrapper */}
              <div
                className={`page-content-${index} absolute top-[18vh] left-[18vh] w-[calc(100vw-36vh)] h-[64vh] px-4 md:px-10 text-white ${
                  isFirst
                    ? "opacity-100 visible pointer-events-auto z-10"
                    : "opacity-0 invisible pointer-events-none z-10"
                }`}
              >
                {page.component}
              </div>
            </div>
          );
        })}

        {/* Shared Violet Arrow Cursor */}
        <div
          ref={arrowRef}
          className="z-20 pointer-events-none bg-violet-500 h-[10vh] w-[10vh] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] top-[85vh] left-[5vh] absolute"
        />
      </div>
    </div>
  );
}