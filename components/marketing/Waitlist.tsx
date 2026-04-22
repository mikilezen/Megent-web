"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

export default function Waitlist() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    root.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
    });

    const timeouts: number[] = [];
    const revealAll = () => {
      root.querySelectorAll(".reveal").forEach((el, i) => {
        const timeoutId = window.setTimeout(() => el.classList.add("visible"), i * 80);
        timeouts.push(timeoutId);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAll();
            return;
          }

          root.querySelectorAll(".reveal").forEach((el) => {
            el.classList.remove("visible");
          });
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(root);

    const fallbackTimeout = window.setTimeout(() => {
      if (!root.querySelector(".reveal.visible")) {
        revealAll();
      }
    }, 260);
    timeouts.push(fallbackTimeout);

    return () => {
      observer.disconnect();
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [pathname]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email || !emailRegex.test(email.trim())) {
      setState("error");
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        emailStatus?: "sent" | "not-configured" | "failed";
      };

      if (!response.ok) {
        throw new Error(data.message || "Failed to join waitlist.");
      }

      setState("done");
      setEmail("");
      setSuccessMessage(data.message || "Thank you. Your registration is confirmed.");
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-28 bg-[var(--text)] relative overflow-hidden" ref={ref}>
      <div
        className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(35%, -35%)" }}
      />
      <div
        className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(-40%, 40%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <span className="reveal inline-block text-[11px] uppercase tracking-[0.14em] text-[#b0aea5] mb-4">
          Early access
        </span>
        <h2 className="reveal reveal-d1 text-[clamp(32px,5vw,58px)] font-medium tracking-[-0.02em] leading-[1.05] text-[#faf9f5] mb-5 [font-family:var(--font-serif)]">
          Stay informed
          <br />
          as we launch.
        </h2>
        <p className="reveal reveal-d2 text-[17px] text-[#b0aea5] leading-[1.75] max-w-lg mx-auto mb-10">
          We are currently onboarding early teams, with priority for fintech and healthcare.
          Please share your email address, and our team will contact you directly.
        </p>

        {state !== "done" ? (
          <>
            <form onSubmit={handleSubmit} className="reveal reveal-d3 flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 px-4 py-3 text-[14px] [font-family:var(--font-mono-ui)] text-[var(--text)] placeholder:text-[var(--text3)] bg-[#faf9f5] border border-[var(--border2)] rounded-xl outline-none focus:ring-2 focus:ring-[#faf9f5]/50 transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 font-medium text-[14px] bg-[var(--primary)] text-[#faf9f5] rounded-xl hover:brightness-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all shrink-0 shadow-[0_0_0_1px_var(--primary)]"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </button>
            </form>

            {state === "error" && (
              <p className="reveal visible text-sm text-[#f4b6a7] mb-5">{errorMessage || "Failed to join waitlist."}</p>
            )}
          </>
        ) : (
          <div className="reveal visible py-5 px-6 bg-white/10 border border-white/20 rounded-xl max-w-md mx-auto mb-5">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <CheckIcon />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Registration Complete</p>
                <p className="text-[#e8e6dc] text-[13px]">{successMessage || "Thank you for your interest."}</p>
              </div>
            </div>
          </div>
        )}

        <p className="reveal reveal-d4 text-[11px] text-[#87867f]">
          {/* No spam. A real message from the founders when it's time. Unsubscribe any time. */}
        </p>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
