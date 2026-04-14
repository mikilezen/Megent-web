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

    const handlePageShow = (event: PageTransitionEvent) => {
      // Force a clean document when returning via back/forward cache.
      if (event.persisted) {
        window.location.reload();
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      if (rawHref.startsWith("#")) return;
      if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.href === window.location.href) return;

      event.preventDefault();
      window.location.assign(url.href);
    };

    clearUiLocks();
    window.addEventListener("pageshow", clearUiLocks);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", clearUiLocks);
    document.addEventListener("visibilitychange", clearUiLocks);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("pageshow", clearUiLocks);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", clearUiLocks);
      document.removeEventListener("visibilitychange", clearUiLocks);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  return null;
}
