"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Add or remove portfolio pages here — the GSAP loop handles all transitions automatically!
const PAGES = [
  {
    id: "hero",
    title: "01. Hero / Intro",
    subtitle: "Full-Stack Developer & Creative Technologist",
    hBarColor: "bg-cyan-500",
    vBarColor: "bg-emerald-500",
  },
  {
    id: "about",
    title: "02. About Me",
    subtitle: "Building interactive web experiences with Next.js & GSAP",
    hBarColor: "bg-fuchsia-500",
    vBarColor: "bg-pink-500",
  },
  {
    id: "projects",
    title: "03. Selected Works",
    subtitle: "Featured architecture, design systems, and web apps",
    hBarColor: "bg-red-600",
    vBarColor: "bg-amber-500",
  },
  {
    id: "skills",
    title: "04. Technical Skills",
    subtitle: "TypeScript, React, Next.js, Node.js, WebGL, Tailwind",
    hBarColor: "bg-blue-500",
    vBarColor: "bg-indigo-500",
  },
  {
    id: "contact",
    title: "05. Get In Touch",
    subtitle: "Let's collaborate on your next project",
    hBarColor: "bg-lime-500",
    vBarColor: "bg-teal-500",
  },
];

export default function Home() {
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const totalTransitions = PAGES.length - 1;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Automatically scales scroll distance based on number of pages
          end: `+=${totalTransitions * 1800}`,
          scrub: 1,
          pin: true,
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
          // 2. Slide current page's vertical bar & content up
          .fromTo(
            [`.v-bar-${curr}`, `.page-content-${curr}`],
            { y: "0vh" },
            {
              y: "-80vh",
              duration: 8,
              immediateRender: false,
            },
            ">"
          )
          // Slide current horizontal bar up:
          // Page 0 starts at top: 5vh (0 -> -80vh). Subsequent bars emerged at 85vh and are already at -80vh (-80vh -> -160vh)
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
          // Move arrow horizontally across the screen
          .to(
            arrowRef.current,
            {
              x: isEvenStep ? "187vh" : "0vh",
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
          // Fade & slide in the next portfolio page's content
          .fromTo(
            `.page-content-${next}`,
            { opacity: 0, y: "20vh" },
            {
              opacity: 1,
              y: "0vh",
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
        {/* Render Horizontal & Vertical Bars for Each Page */}
        {PAGES.map((page, index) => {
          const isFirst = index === 0;
          const isEvenIndex = index % 2 === 0; // 0, 2, 4 have vertical bars on LEFT; 1, 3, 5 on RIGHT

          return (
            <div key={page.id}>
              {/* Horizontal Bar */}
              <div
                className={`h-bar-${index} ${page.hBarColor} h-[10vh] ${
                  isFirst
                    ? "w-[197vh] top-[5vh] left-[5vh]"
                    : isEvenIndex
                    ? "w-[187vh] top-[85vh] left-[15vh]"
                    : "w-[187vh] top-[85vh] left-[5vh]"
                } absolute`}
              />

              {/* Vertical Bar */}
              <div
                className={`v-bar-${index} ${page.vBarColor} h-[80vh] w-[10vh] top-[5vh] ${
                  isEvenIndex ? "left-[5vh]" : "left-[192vh]"
                } absolute`}
              />

              {/* Portfolio Page Content Area (sits neatly inside the bars) */}
              <div
                className={`page-content-${index} absolute top-[20vh] left-[20vh] w-[165vh] h-[60vh] flex flex-col justify-center px-12 text-white pointer-events-auto`}
              >
                <h1 className="text-6xl font-bold tracking-tight mb-4">
                  {page.title}
                </h1>
                <p className="text-2xl text-zinc-400 max-w-2xl">
                  {page.subtitle}
                </p>
              </div>
            </div>
          );
        })}

        {/* Shared Violet Arrow Cursor */}
        <div
          ref={arrowRef}
          className="z-20 bg-violet-500 h-[10vh] w-[10vh] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] top-[85vh] left-[5vh] absolute"
        />
      </div>
    </div>
  );
}