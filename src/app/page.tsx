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
import SpaceTimeGrid from "./components/SpaceTimeGrid";

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
  const arrowInnerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const scrollToSection = (targetIndex: number) => {
    const tl = tlRef.current;
    if (!tl || !tl.scrollTrigger) return;

    const clampedIndex = targetIndex % NAV_ITEMS.length;
    const targetScrollY = tl.scrollTrigger.labelToScroll(
      `page-${clampedIndex}`
    );
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

  const handleAdvanceNextPage = () => {
    const tl = tlRef.current;
    if (!tl || !tl.scrollTrigger) return;

    const totalTransitions = NAV_ITEMS.length - 1;
    const currentPageIndex = Math.round(
      tl.scrollTrigger.progress * totalTransitions
    );
    const nextIndex = (currentPageIndex + 1) % NAV_ITEMS.length;
    scrollToSection(nextIndex);
  };

  const PAGES = [
    {
      id: "hero",
      hBarColor: "bg-cyan-500",
      vBarColor: "bg-emerald-500",
      component: (
        <HeroSection
          onExplore={() => scrollToSection(1)}
          onContact={() => scrollToSection(4)}
        />
      ),
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
      component: <ProjectsGrid onContact={() => scrollToSection(4)} />,
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

      tl.addLabel("page-0", 0);

      for (let i = 0; i < totalTransitions; i++) {
        const isEvenStep = i % 2 === 0;
        const curr = i;
        const next = i + 1;

        tl.to(arrowRef.current, {
          rotation: isEvenStep ? -90 : 90,
          duration: 1,
          delay: 1,
        })
          .fromTo(
            `.v-bar-${curr}`,
            { y: "0vh", pointerEvents: "auto" },
            {
              y: "-80vh",
              pointerEvents: "none",
              duration: 8,
              immediateRender: false,
            },
            ">"
          )
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
          .to(
            arrowRef.current,
            {
              x: isEvenStep ? () => getArrowMaxX() : 0,
              duration: 6,
            },
            "<"
          )
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
          .to(arrowRef.current, {
            rotation: 0,
            duration: 1,
          })
          .to(arrowRef.current, {
            y: "0vh",
            duration: 4,
          })
          .fromTo(
            `.v-bar-${next}`,
            { scaleY: 0, pointerEvents: "none" },
            {
              scaleY: 1,
              pointerEvents: "auto",
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
              pointerEvents: "none",
              transformOrigin: "center bottom",
              duration: 4,
            },
            "<"
          )
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
          .addLabel(`page-${next}`);
      }
    },
    { scope: mainWrapperRef }
  );

  return (
    <div ref={mainWrapperRef} className="w-full bg-black ">
      <div
        ref={containerRef}
        className="relative h-screen w-screen bg-black overflow-hidden"
      >
        {/* Background Space-Time Grid (z-0, pointer-events-none) */}
        <SpaceTimeGrid />
        {PAGES.map((page, index) => {
          const isFirst = index === 0;
          const isEvenIndex = index % 2 === 0;

          const orderedNavItems = isEvenIndex
            ? NAV_ITEMS
            : [...NAV_ITEMS].reverse();

          return (
            <div key={page.id}>
              {/* Top Horizontal Bar Acting as Interactive Navbar (Sharp Corners) */}
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

              {/* Clickable Vertical Bar (Sharp Corners) */}
              <div
                onClick={() => scrollToSection((index + 1) % PAGES.length)}
                title="Click to go to next section"
                className={`v-bar-${index} ${
                  page.vBarColor
                } h-[80vh] w-[10vh] top-[5vh] z-20 cursor-pointer hover:brightness-110 transition-[filter] ${
                  isFirst ? "pointer-events-auto" : "pointer-events-none"
                } ${
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

        {/* Clickable Sharp Violet Arrow Cursor with Gentle Ribbon Oscillation */}
        <div
          ref={arrowRef}
          onClick={handleAdvanceNextPage}
          title="Click for next section"
          className="z-30 cursor-pointer h-[10vh] w-[10vh] top-[85vh] left-[5vh] absolute"
        >
          <div
            ref={arrowInnerRef}
            className="w-full h-full bg-violet-500 hover:bg-violet-400 transition-colors [clip-path:polygon(0%_0%,100%_0%,50%_100%)]"
          />
        </div>
      </div>
    </div>
  );
}