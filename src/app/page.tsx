"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });
      tl.to(
        arrowRef.current,
        {
          rotation: -90,
          duration: 1,
          delay : 1,
        },
      ).to(
        ".slide-up",
        {
          y: "-80vh",
          duration: 8,
        },
        ">"
      ).to(arrowRef.current,{
          x: "187vh",
          duration: 6,
          ease: "power2.inOut"
        },"<"
      ).from(".emerge", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 6,
          ease: "power2.inOut",
        },"<"
      )
      .to(
        ".rectangle_horizontal",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 6,
        },"<"
      ).to(
        arrowRef.current,
        {
          rotation: 0,
          duration: 1,
        },
      ).to(arrowRef.current,{
        y: "0vh",
        duration : 4,
      })
      .from(".left-emerge",{
        scaleY : 0,
        transformOrigin: "top center",
        duration : 4,
      },"<")
      .to(".vanish" , {
        scaleY : 0,
        transformOrigin: "center bottom",
        duration : 4,
      },"<")
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen bg-black overflow-hidden"
    >
      <div className="slide-up rectangle_horizontal bg-amber-400 h-[10vh] w-[197vh] top-[5vh] left-[5vh] absolute" />
      <div className="slide-up vanish bg-amber-300 h-[80vh] w-[10vh] top-[5vh] left-[5vh] absolute" />
      <div
        ref={arrowRef}
        className="slide-up bg-amber-200 h-[10vh] w-[10vh] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] top-[85vh] left-[5vh] absolute"
      />
      <div className="slide-up emerge bg-amber-400 h-[10vh] w-[187vh] top-[85vh] left-[5vh] absolute" />
      <div className="left-emerge bg-amber-500 h-[80vh] w-[10vh] top-[5vh] left-[192vh] absolute" />
    </div>
  );
}