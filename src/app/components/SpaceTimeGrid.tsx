"use client";

import { useEffect, useRef } from "react";

export default function SpaceTimeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Sparse grid configuration & gravitational physics parameters
    const SPACING = 45; // Sparse distance between grid lines
    const GRAVITY_RADIUS = 360; // Radius of the gravitational field
    const GRAVITY_STRENGTH = 28; // How strongly the planet bends spacetime
    const SPRING = 0.08; // How quickly spacetime snaps back
    const DAMPING = 0.82; // Smooths out oscillation

    interface Point {
      ox: number; // Original X
      oy: number; // Original Y
      x: number; // Current X
      y: number; // Current Y
      vx: number; // Velocity X
      vy: number; // Velocity Y
    }

    let cols = 0;
    let rows = 0;
    let points: Point[][] = [];

    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / SPACING) + 2;
      rows = Math.ceil(height / SPACING) + 2;
      points = [];

      for (let r = 0; r < rows; r++) {
        const row: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const ox = (c - 0.5) * SPACING;
          const oy = (r - 0.5) * SPACING;
          row.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
        points.push(row);
      }
    };

    initGrid();

    const mouse = {
      x: -9999,
      y: -9999,
      smoothX: -9999,
      smoothY: -9999,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.active) {
        mouse.smoothX = e.clientX;
        mouse.smoothY = e.clientY;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", initGrid);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate planet position so the gravity well glides
      if (mouse.active) {
        mouse.smoothX += (mouse.x - mouse.smoothX) * 0.18;
        mouse.smoothY += (mouse.y - mouse.smoothY) * 0.18;
      }

      // 1. Update grid vertex physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          let targetX = p.ox;
          let targetY = p.oy;

          if (mouse.active) {
            const dx = mouse.smoothX - p.ox;
            const dy = mouse.smoothY - p.oy;
            const distSq = dx * dx + dy * dy;
            const maxDistSq = GRAVITY_RADIUS * GRAVITY_RADIUS;

            if (distSq < maxDistSq && distSq > 1) {
              const dist = Math.sqrt(distSq);
              // Smooth bell-curve gravitational pull toward the cursor
              const pull =
                Math.pow(1 - dist / GRAVITY_RADIUS, 2) * GRAVITY_STRENGTH;
              targetX += (dx / dist) * pull;
              targetY += (dy / dist) * pull;
            }
          }

          // Hooke's Law spring physics back to target position
          p.vx = (p.vx + (targetX - p.x) * SPRING) * DAMPING;
          p.vy = (p.vy + (targetY - p.y) * SPRING) * DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // 2. Draw ultra-thin warped spacetime grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.16)"; // Subtle slate/cyan tint

      // Horizontal curved lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[r][c - 1];
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.stroke();
      }

      // Vertical curved lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = points[r][c];
          if (r === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[r - 1][c];
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.stroke();
      }

      // 3. Draw subtle planet core & gravitational halo at cursor
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.smoothX,
          mouse.smoothY,
          2,
          mouse.smoothX,
          mouse.smoothY,
          GRAVITY_RADIUS * 0.65
        );
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.14)");
        gradient.addColorStop(0.4, "rgba(139, 92, 246, 0.05)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          mouse.smoothX,
          mouse.smoothY,
          GRAVITY_RADIUS * 0.65,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Small glowing planet dot
        ctx.fillStyle = "rgba(34, 211, 238, 0.7)";
        ctx.beginPath();
        ctx.arc(mouse.smoothX, mouse.smoothY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", initGrid);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}