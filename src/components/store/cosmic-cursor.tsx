"use client";

import { useEffect, useRef } from "react";

export function CosmicCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x - 14}px, ${y - 14}px)`;
      requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    const id = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(id);
    };
  }, []);

  return <div ref={ref} className="nx-cursor" aria-hidden />;
}
