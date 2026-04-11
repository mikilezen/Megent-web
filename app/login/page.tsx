"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const DEMO_EMAIL = "demo@megent.dev";
const DEMO_PASSWORD = "demo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("this page is under construction");
      setIsSubmitting(false);
      return;
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("magent_demo_user", "true");
        if (remember) {
          localStorage.setItem("magent_demo_email", DEMO_EMAIL);
        } else {
          localStorage.removeItem("magent_demo_email");
        }
      }
      router.push("/dashboard");
    } catch {
      setError("Unable to sign in right now. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eef4ff]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-15%] h-96 w-96 rounded-full bg-[#8dc7ff]/50 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-[#7de0c9]/45 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.45),transparent_40%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <section className="hidden rounded-3xl border border-white/60 bg-white/65 p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.7)] backdrop-blur-xl md:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Megent Demo Environment</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900">Explore your AI workflow in under a minute</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Sign in with the official demo account to preview orchestration, prompts, and dashboards in a safe sandbox.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-700">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-medium text-white">1</span>
              <span>Use the fixed demo credentials.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-medium text-white">2</span>
              <span>Keep this browser signed in if needed.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-medium text-white">3</span>
              <span>Enter the demo workspace instantly.</span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Demo Credentials</p>
            <p className="mt-2 font-medium text-slate-900">{DEMO_EMAIL}</p>
            <p className="text-slate-600">Password: {}</p>
          </div>
        </section>

        <Card className="w-full border border-slate-200/80 bg-white/95 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.75)]">
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2 text-center">
              <Image src="/ll.jpg" alt="Megent logo" width={40} height={40} className="mx-auto h-10 w-10" />
              <h2 className="text-2xl font-semibold text-slate-900">Welcome to Megent</h2>
              <p className="text-sm text-slate-600">Sign in with the demo account to continue</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label className="text-slate-700" htmlFor="email">
                  Work email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder={DEMO_EMAIL}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700" htmlFor="password">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="demo"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="pr-10 text-sm"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* <p className="text-xs text-slate-500">Password for demo login: demo</p> */}
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600" htmlFor="remember">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Keep me signed in on this device
              </label>

              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Enter demo workspace"}
              </Button>

              {/* <p className="text-center text-xs text-slate-500">Only demo@megent.dev and demo are allowed.</p> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
