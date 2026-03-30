"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("magent_demo_user", "true");
      }
      router.push("/demo");
    } catch (err) {
      // swallow errors silently per requirement to avoid exposed messages
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border border-[var(--indigo)]/20 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
        <CardContent className="space-y-6 p-6 bg-white/90 backdrop-blur">
          <div className="space-y-2 text-center">
            <img src="/ll.png" alt="Megent logo" className="mx-auto h-10 w-10" />
            <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
            <p className="text-sm text-slate-600">Access your Megent account</p>
          </div>
          <div className="space-y-3">
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
              Continue with SSO
            </Button>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
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
            <div className="space-y-2">
              <Button type="submit" className="w-full bg-[var(--indigo)] text-white hover:bg-indigo-600">
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
