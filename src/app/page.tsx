"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Home() {
  const arrowRef = useRef(null);
  useEffect(() => {
    gsap.to(arrowRef.current,{
      rotation : -90,
      duration : 1,
      ease : "power2.inOut",
    })
  },[]);
  useEffect(() => {
    gsap.to(".rectangle_horizontal", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 10,
      delay : 1,
      ease: "power2.inOut",
    });
  },[]);
  useEffect(() => {
    gsap.to(".slide-up", {
      y: "-80vh",
      duration: 10,
      delay: 1,
      ease: "power2.inOut",
    });
  })
  useEffect(() => {
    gsap.from(".emerge", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1,
      ease: "power2.out",
    });
  },[])
  return ( 
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <div className="slide-up rectangle_horizontal bg-amber-400 h-[10vh] w-[197vh] top-[5vh] left-[5vh] absolute">

      </div>
      <div className="slide-up bg-amber-300 h-[80vh] w-[10vh] top-[5vh] left-[5vh] absolute">

      </div>
      <div ref={arrowRef} className="slide-up bg-amber-200 h-[10vh] w-[10vh] [clip-path:polygon(0%_0%,100%_0%,50%_100%)] top-[85vh] left-[5vh] absolute">

      </div>
      <div className="slide-up emerge bg-amber-400 h-[10vh] w-[197vh] top-[85vh] left-[5vh] absolute">

      </div>
    </div>
  );
}
