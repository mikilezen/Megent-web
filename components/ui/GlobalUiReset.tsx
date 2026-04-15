"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GlobalUiReset() {
  const pathname = usePathname();

  const clearUiLocks = () => {
    // Clear stale lock styles/classes that can leave the page unclickable after navigation.
    document.documentElement.classList.remove("loading", "no-motion");
    document.body.classList.remove("loading", "no-motion");
    document.body.style.overflow = "";
    document.body.style.pointerEvents = "";
    document.body.removeAttribute("data-scroll-locked");
    document.body.removeAttribute("inert");
    document.documentElement.removeAttribute("inert");
  };

  useEffect(() => {
    clearUiLocks();
    window.addEventListener("pageshow", clearUiLocks);
    window.addEventListener("popstate", clearUiLocks);
    window.addEventListener("hashchange", clearUiLocks);
    document.addEventListener("visibilitychange", clearUiLocks);

    return () => {
      window.removeEventListener("pageshow", clearUiLocks);
      window.removeEventListener("popstate", clearUiLocks);
      window.removeEventListener("hashchange", clearUiLocks);
      document.removeEventListener("visibilitychange", clearUiLocks);
    };
  }, []);

  useEffect(() => {
    clearUiLocks();

    // Run once more after route commit in case a previous overlay left stale locks behind.
    const rafId = window.requestAnimationFrame(clearUiLocks);
    const timeoutId = window.setTimeout(clearUiLocks, 0);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
