"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !emailRegex.test(email.trim())) {
      setState("error");
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setState("loading");
    setErrorMessage("");
    setSuccessMessage("");

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
    }
  };

  return (
    <section id="waitlist" className="py-32 bg-[var(--indigo)] relative overflow-hidden" ref={ref}>
      <div
        className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(35%, -35%)" }}
      />
      <div
        className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(-40%, 40%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <span className="reveal inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-indigo-200 mb-4">
          Early access
        </span>
        <h2 className="reveal reveal-d1 text-[clamp(32px,5vw,58px)] font-extrabold tracking-[-2px] leading-[1.05] text-white mb-5">
          Stay informed
          <br />
          as we launch.
        </h2>
        <p className="reveal reveal-d2 text-[17px] text-indigo-200 leading-[1.75] max-w-lg mx-auto mb-10">
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
                className="flex-1 px-4 py-3 text-[14px] font-mono text-[var(--text)] placeholder:text-[var(--text3)] bg-white border border-black rounded-lg outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="px-6 py-3 font-semibold text-[14px] bg-white text-[var(--indigo)] rounded-lg hover:bg-indigo-50 transition-all disabled:opacity-60 shrink-0 shadow-md"
              >
                {state === "loading" ? (
                  <span className="flex items-center gap-2">
                    <Spinner />
                    Submitting...
                  </span>
                ) : (
                  "Join Waitlist"
                )}
              </button>
            </form>

            {state === "error" && (
              <p className="reveal text-sm text-red-200 mb-5">{errorMessage || "Failed to join waitlist."}</p>
            )}
          </>
        ) : (
          <div className="reveal py-5 px-6 bg-white/10 border border-white/20 rounded-xl max-w-md mx-auto mb-5">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <CheckIcon />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Registration Complete</p>
                <p className="text-indigo-100 text-[13px]">{successMessage || "Thank you for your interest."}</p>
              </div>
            </div>
          </div>
        )}

        <p className="reveal reveal-d4 font-mono text-[11px] text-indigo-300">
          {/* No spam. A real message from the founders when it's time. Unsubscribe any time. */}
        </p>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-[var(--indigo)]" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
