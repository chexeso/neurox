"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function CosmicBg() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const layerA = useRef<HTMLDivElement>(null);
  const layerB = useRef<HTMLDivElement>(null);
  const layerC = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let raf = 0;
    let targetY = 0;
    let y = 0;
    let mx = 0.5;
    let my = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    let t = 0;

    const onScroll = () => {
      targetY = window.scrollY || 0;
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / Math.max(window.innerWidth, 1);
      my = e.clientY / Math.max(window.innerHeight, 1);
    };

    const tick = () => {
      t += 0.004;
      y += (targetY - y) * 0.07;
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;

      const px = (cx - 0.5) * 30;
      const py = (cy - 0.5) * 20;

      if (layerA.current) {
        layerA.current.style.transform = `translate3d(${px * 0.4}px, ${y * -0.15 + py * 0.4}px, 0) scale(1.15)`;
      }
      if (layerB.current) {
        layerB.current.style.transform = `translate3d(${px * -0.9}px, ${y * -0.32 + py * -0.6}px, 0) scale(1.25)`;
        layerB.current.style.opacity = String(0.45 + Math.sin(t) * 0.12);
      }
      if (layerC.current) {
        layerC.current.style.transform = `translate3d(${px * 1.2}px, ${y * -0.5 + Math.sin(t * 0.7) * 8}px, 0) scale(1.3)`;
        layerC.current.style.opacity = String(0.35 + Math.cos(t * 1.1) * 0.15);
      }
      if (glow.current) {
        glow.current.style.transform = `translate3d(${(cx - 0.5) * 80}px, ${(cy - 0.5) * 50 + y * -0.05}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const active = (theme || resolvedTheme || "dark") as string;
  const showSpace = !mounted || active === "dark" || active === "black";
  const showMedium = mounted && active === "medium";
  const hidden = mounted && active === "light";

  // Always render the same tree (hooks stay stable). Hide via CSS on light theme.
  return (
    <div
      ref={root}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: showMedium ? "#2e2f35" : "#020205",
        opacity: hidden ? 0 : showSpace ? 1 : showMedium ? 0.25 : 0,
        visibility: hidden ? "hidden" : "visible",
        transition: "opacity .35s ease",
      }}
    >
      <div
        ref={layerA}
        style={{
          position: "absolute",
          inset: "-15%",
          backgroundImage: 'url("/brand/cosmos.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.95,
          willChange: "transform",
          filter: "brightness(1.05) contrast(1.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 70% 25%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(ellipse 50% 35% at 20% 70%, rgba(255,255,255,0.08), transparent 55%)",
          animation: "nxNebula 12s ease-in-out infinite alternate",
        }}
      />
      <div
        ref={layerB}
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 10% 20%, #fff, transparent),
            radial-gradient(1px 1px at 25% 65%, #fff, transparent),
            radial-gradient(2px 2px at 45% 15%, #fff, transparent),
            radial-gradient(1px 1px at 60% 50%, rgba(255,255,255,.7), transparent),
            radial-gradient(1.5px 1.5px at 80% 18%, #fff, transparent),
            radial-gradient(1px 1px at 88% 70%, rgba(255,255,255,.6), transparent),
            radial-gradient(1px 1px at 15% 85%, #fff, transparent),
            radial-gradient(2px 2px at 52% 80%, #fff, transparent),
            radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,.5), transparent),
            radial-gradient(1.5px 1.5px at 35% 35%, #fff, transparent),
            radial-gradient(1px 1px at 5% 45%, rgba(255,255,255,.4), transparent),
            radial-gradient(1px 1px at 95% 40%, #fff, transparent)
          `,
          mixBlendMode: "screen",
          opacity: 0.5,
          willChange: "transform, opacity",
        }}
      />
      <div
        ref={layerC}
        style={{
          position: "absolute",
          inset: "-25%",
          backgroundImage: `
            radial-gradient(1px 1px at 18% 30%, rgba(255,255,255,.8), transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,.5), transparent),
            radial-gradient(1.5px 1.5px at 65% 25%, rgba(255,255,255,.9), transparent),
            radial-gradient(1px 1px at 78% 60%, rgba(255,255,255,.45), transparent),
            radial-gradient(1px 1px at 30% 10%, rgba(255,255,255,.6), transparent),
            radial-gradient(1px 1px at 90% 85%, rgba(255,255,255,.55), transparent)
          `,
          mixBlendMode: "screen",
          opacity: 0.4,
          willChange: "transform, opacity",
        }}
      />
      <div
        ref={glow}
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          left: "50%",
          top: "38%",
          marginLeft: -280,
          marginTop: -280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 32%, transparent 68%)",
          filter: "blur(10px)",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 60% at 50% 25%, transparent 10%, rgba(2,2,5,0.45) 65%, rgba(2,2,5,0.88) 100%), linear-gradient(180deg, rgba(2,2,5,0.2) 0%, rgba(2,2,5,0.55) 55%, rgba(2,2,5,0.94) 100%)",
        }}
      />
      <style>{`
        @keyframes nxNebula {
          from { opacity: 0.55; transform: scale(1); }
          to { opacity: 0.95; transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
