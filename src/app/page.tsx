"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import ProjectsGrid from "./components/project-grid";
import SkillsSection from "./components/section";
import ContactForm from "./components/contact";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Home", index: 0 },
  { label: "About", index: 1 },
  { label: "Project", index: 2 },
  { label: "Tech Stack", index: 3 },
  { label: "Contact Me", index: 4 },
];

export default function Home() {
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Smoothly scrubs through all intermediate GSAP animations to reach the target section
  const scrollToSection = (targetIndex: number) => {
    const tl = tlRef.current;
    if (!tl || !tl.scrollTrigger) return;

    const targetScrollY = tl.scrollTrigger.labelToScroll(`page-${targetIndex}`);
    const scrollProxy = { y: window.scrollY };

    gsap.to(scrollProxy, {
      y: targetScrollY,
      duration: 1.8,
      ease: "power2.inOut",
      overwrite: true,
      onUpdate: () => {
        window.scrollTo({ top: scrollProxy.y, behavior: "instant" });
      },
    });
  };

  const PAGES = [
    {
      id: "hero",
      hBarColor: "bg-cyan-500",
      vBarColor: "bg-emerald-500",
      component: <HeroSection onExplore={() => scrollToSection(2)} />,
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

      tlRef.current = tl;

      // Mark initial resting position for Page 0 (Home)
      tl.addLabel("page-0", 0);

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
          // Slide current page content up AND disable pointer-events
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
          // Slide current horizontal navbar up and disable clicks while leaving
          .fromTo(
            `.h-bar-${curr}`,
            { y: curr === 0 ? "0vh" : "-80vh", pointerEvents: "auto" },
            {
              y: curr === 0 ? "-80vh" : "-160vh",
              pointerEvents: "none",
              duration: 8,
              immediateRender: false,
            },
            "<"
          )
          // Slide arrow and emerging horizontal navbar up from bottom (85vh) to top (5vh)
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
          // Emerge next horizontal navbar using clipPath so nav text never stretches
          .fromTo(
            `.h-bar-${next}`,
            {
              clipPath: isEvenStep
                ? "inset(0% 100% 0% 0%)"
                : "inset(0% 0% 0% 100%)",
              pointerEvents: "none",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              pointerEvents: "auto",
              duration: 6,
              immediateRender: true,
            },
            "<"
          )
          // Vanish current horizontal navbar using clipPath
          .fromTo(
            `.h-bar-${curr}`,
            { clipPath: "inset(0% 0% 0% 0%)" },
            {
              clipPath: isEvenStep
                ? "inset(0% 100% 0% 0%)"
                : "inset(0% 0% 0% 100%)",
              duration: 6,
              immediateRender: false,
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
          // 5. Reveal next page content and enable pointer-events
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
          )
          // Mark resting position for this page so navbar buttons can scrub directly here
          .addLabel(`page-${next}`);
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

          // Even index pages (0, 2, 4): Home -> About -> Project -> Tech Stack -> Contact Me
          // Odd index pages (1, 3): Contact Me -> Tech Stack -> Project -> About -> Home
          const orderedNavItems = isEvenIndex
            ? NAV_ITEMS
            : [...NAV_ITEMS].reverse();

          return (
            <div key={page.id}>
              {/* Top Horizontal Bar Acting as Interactive Navbar */}
              <nav
                className={`h-bar-${index} ${
                  page.hBarColor
                } h-[10vh] z-30 flex items-center justify-around px-4 md:px-12 shadow-lg ${
                  isFirst
                    ? "w-[calc(100vw-10vh)] top-[5vh] left-[5vh] pointer-events-auto"
                    : isEvenIndex
                    ? "w-[calc(100vw-20vh)] top-[85vh] left-[15vh] pointer-events-none"
                    : "w-[calc(100vw-20vh)] top-[85vh] left-[5vh] pointer-events-none"
                } absolute`}
              >
                {orderedNavItems.map((navItem) => {
                  const isActive = navItem.index === index;
                  return (
                    <button
                      key={navItem.label}
                      onClick={() => scrollToSection(navItem.index)}
                      className={`text-xs sm:text-sm md:text-lg font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-black text-white shadow-md scale-105"
                          : "text-black/80 hover:text-black hover:bg-black/10"
                      }`}
                    >
                      {navItem.label}
                    </button>
                  );
                })}
              </nav>

              {/* Responsive Vertical Bar */}
              <div
                className={`v-bar-${index} ${page.vBarColor} h-[80vh] w-[10vh] top-[5vh] pointer-events-none z-20 ${
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
          className="z-30 pointer-events-none bg-violet-500 h-[10vh] w-[10vh] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] top-[85vh] left-[5vh] absolute"
        />
      </div>
    </div>
  );
}