"use client";

import { useRef } from "react";

export function ProductTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 10;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    el.style.setProperty("--shine-x", `${px * 100}%`);
    el.style.setProperty("--shine-y", `${py * 100}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  }

  return (
    <div ref={ref} className="product-tilt" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
