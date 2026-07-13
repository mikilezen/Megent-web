"use client";

import { useEffect, useState } from "react";

export default function ScrollLight() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const next = scrollable > 0 ? window.scrollY / scrollable : 0;
        setProgress(Math.min(1, Math.max(0, next)));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const percentage = `${Math.round(progress * 100)}%`;

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-primary via-[#ffb27a] to-white shadow-[0_0_24px_rgba(201,100,66,0.55)] transition-[width] duration-150 ease-out"
        style={{ width: percentage }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <div className="h-40 w-px overflow-hidden rounded-full bg-white/10">
          <div
            className="w-full rounded-full bg-gradient-to-b from-white via-[#ffb27a] to-primary shadow-[0_0_18px_rgba(201,100,66,0.65)] transition-[height] duration-150 ease-out"
            style={{ height: percentage }}
          />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/70 backdrop-blur-md">
          {percentage}
        </span>
      </div>
    </>
  );
}
