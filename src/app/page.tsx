"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          // markers: true, // Shows green/red scroll markers on the right so you can verify scroll
        },
      });

      tl.to(arrowRef.current, {
        rotation: -90,
        duration: 1,
        delay: 1,
      })
        .to(
          ".slide-up",
          {
            y: "-80vh",
            duration: 8,
          },
          ">"
        )
        .to(
          arrowRef.current,
          {
            x: "187vh",
            duration: 6,
            ease: "power2.inOut",
          },
          "<"
        )
        .from(
          ".emerge",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 6,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          ".rectangle_horizontal",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 6,
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
        .from(
          ".left-emerge",
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 4,
          },
          "<"
        )
        .to(
          ".vanish",
          {
            scaleY: 0,
            transformOrigin: "center bottom",
            duration: 4,
          },
          "<"
        )
        .to(arrowRef.current,
          {
            rotate: 90,
            duration : 1,
            delay : 1,
          }
        )
        .from(".second-emerge",{
            scaleX: 0,
            transformOrigin: "right center",
            duration: 6,
            ease: "power2.inOut",
        })
        .to(arrowRef.current,{
            x: "0vh",
            duration: 6,
            ease: "power2.inOut",
        },"<")
        .to(".second-vanish",{
          scaleX: 0,
          transformOrigin : "right center",
          duration : 6,
          ease: "power2.inOut"
        },"<")
        .to(
          ".second-slide-up",
          {
            y: "-80vh",
            duration: 8,
          },
          "<"
        )
    },
    { scope: mainWrapperRef } // Scope to the outer wrapper
  );

  return (
    /* 1. Outer wrapper allows ScrollTrigger to safely insert its 3000px pin-spacer */
    <div ref={mainWrapperRef} className="w-full bg-black">
      {/* 2. Inner pinned stage holds your exact animation layout */}
      <div
        ref={containerRef}
        className="relative h-screen w-screen bg-black overflow-hidden"
      >
        <div className="slide-up rectangle_horizontal bg-cyan-500 h-[10vh] w-[197vh] top-[5vh] left-[5vh] absolute" />
        <div className="slide-up vanish bg-emerald-500 h-[80vh] w-[10vh] top-[5vh] left-[5vh] absolute" />
        <div
          ref={arrowRef}
          className="slide-up second-slide-up bg-violet-500 h-[10vh] w-[10vh] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] top-[85vh] left-[5vh] absolute"
        />
        <div className="slide-up second-slide-up emerge second-vanish bg-fuchsia-500 h-[10vh] w-[187vh] top-[85vh] left-[5vh] absolute" />
        <div className="left-emerge second-slide-up bg-pink-500 h-[80vh] w-[10vh] top-[5vh] left-[192vh] absolute" />
        <div className="second-emerge second-slide-up bg-red-600 h-[10vh] w-[187vh] top-[85vh] left-[15vh] absolute" />
      </div>
    </div>
  );
}