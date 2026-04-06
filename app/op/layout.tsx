import type { ReactNode } from "react";

export default function OpLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-teal-700">Megent</span>
            <span className="text-sm text-slate-500">/ OP</span>
          </div>
          <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            Light
          </span>
        </div>
      </header>
      {children}
    </div>
  );
}
