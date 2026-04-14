"use client";

import { useEffect } from "react";

export default function GlobalUiReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const clearUiLocks = () => {
      // Clear stale lock styles/classes that can leave the page unclickable after navigation.
      document.documentElement.classList.remove("loading", "no-motion");
      document.body.classList.remove("loading", "no-motion");
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };

    clearUiLocks();
    window.addEventListener("pageshow", clearUiLocks);
    window.addEventListener("popstate", clearUiLocks);
    document.addEventListener("visibilitychange", clearUiLocks);

    return () => {
      window.removeEventListener("pageshow", clearUiLocks);
      window.removeEventListener("popstate", clearUiLocks);
      document.removeEventListener("visibilitychange", clearUiLocks);
    };
  }, []);

  return null;
}
