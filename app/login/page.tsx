"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("magent_demo_user", "true");
        if (remember) {
          localStorage.setItem("magent_demo_email", email);
        }
      }
      router.push("/demo");
    } catch {
      // swallow errors silently per requirement to avoid exposed messages
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3f5f8]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-[-8%] h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl" />
        <div className="absolute -bottom-20 right-[-6%] h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-8">


        <Card className="w-full border border-slate-200/80 bg-white/95 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.75)]">
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2 text-center">
              <Image src="/ll.png" alt="Megent logo" width={40} height={40} className="mx-auto h-10 w-10" />
              <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
              <p className="text-sm text-slate-600">Use your work account to continue</p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-slate-200 text-slate-800 hover:bg-slate-100"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/api/auth/sso";
                }
              }}
            >
              Continue with Enterprise SSO
            </Button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-200" />
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
                  placeholder="name@company.com"
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
                    placeholder="********"
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

              <Button type="submit" className="w-full bg-[var(--indigo)] text-white hover:bg-indigo-600">
                Enter enterprise demo
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
