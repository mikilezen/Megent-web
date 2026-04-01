"use client";

import { Loader2, Mic, Sparkles, Volume2 } from "lucide-react";
import { useState } from "react";

const DEMO_REPLIES = [
  {
    summary: "Masked contact info and returned safe payload.",
    details: [
      "Detected phone + email and applied reversible masks.",
      "Logged policy match with low latency (142 ms).",
      "Forwarded sanitized object to analytics bus."
    ],
    confidence: 0.92
  },
  {
    summary: "Policy guard denied request and suggested fallback.",
    details: [
      "User intent flagged as unsupported for public channel.",
      "Recommended sending billing portal link instead.",
      "Escalation route opened for human review."
    ],
    confidence: 0.81
  },
  {
    summary: "Summarized account status with inline redactions.",
    details: [
      "Kept loyalty tier + usage metrics intact.",
      "Blurred PII fields per SOC2 profile.",
      "Attached synthetic voice note for CS team."
    ],
    confidence: 0.88
  }
];

const VOICES = ["Nova", "Flow", "Pulse"] as const;
const VOICES_ = ["Nova", "Flow", "Pulse"] as const;
const MODES = ["delete_data", "read_data", "send_email"] as const;

type DemoReply = (typeof DEMO_REPLIES)[number];

export default function AgentPlayground() {
  const [mode, setMode] = useState<(typeof MODES)[number]>("Policy Guard");
  const [voice, setVoice] = useState<(typeof VOICES)[number]>("Nova");
  const [input, setInput] = useState("How do we share the latest payout info with Alice without leaking PII?");
  const [response, setResponse] = useState<DemoReply>(DEMO_REPLIES[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isGenerating) return;

    setIsGenerating(true);
    const next = DEMO_REPLIES[Math.floor(Math.random() * DEMO_REPLIES.length)];

    setTimeout(() => {
      setResponse(next);
      setIsGenerating(false);
    }, 900);
  };

  const handleReset = () => {
    setInput("");
    setResponse(DEMO_REPLIES[0]);
    setIsGenerating(false);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-5 sm:px-10 pt8 pb-16">
      <div className="rounded-[34px] border border-white/5 bg-white from-slate-950 via-slate-950/80 to-black/70 p-8 lg:p-10 shadow-[0_40px_80px_-45px_rgba(15,23,42,0.85)]">
        <div className="flex flex-col gap-10 lg:flex-row">
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.1em] text-indigo-300">Try the agent with megent</p>
              {/* Craft a prompt, pick a mode, and preview the sanitized response + synthetic voice payload. Backend hookup optional. */}
              {/* </p> */}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Tools</p>
              <div className="flex flex-wrap gap-3">
                {MODES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      mode === item
                        ? "border-emerald-400/80 bg-emerald-400/10 text-black"
                        : "border-white/10 text-slate-300 hover:border-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            

            <label className="flex flex-1 flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Prompt</span>
              <div className="relative flex-1">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask anything you want the agent to transform."
                  className="min-h-[160px] w-full resize-none rounded-3xl border border-black bg-grey-200 px-5 py-4 text-sm text-black placeholder:text-slate-500 focus:border-emerald-00/70 focus:outline-none"
                />
                <span className="pointer-events-none absolute bottom-4 right-5 text-xs text-slate-500">
                  {input.length}/320
                </span>
              </div>
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!input.trim() || isGenerating}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/90 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                {isGenerating ? "Sending" : "Send to agent"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-2xl border border-white/15 px-5 py-3 text-sm text-slate-200 transition hover:border-white/40"
              >
                Reset
              </button>
              <span className="inline-flex items-center rounded-2xl border border-dashed border-white/15 px-4 py-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                Live preview only
              </span>
            </div>
          </form>

          <div className="flex flex-1 flex-col gap-5 rounded-[28px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap gap-3">
                
                  <button
                    
                    className='rounded-full border px-4 py-2 text-sm transition'
                      >Preview
                  </button>
                  <button
                    
                    className='rounded-full border px-4 py-2 text-sm transition'
                      >Code
                  </button>
              </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Output</p>
              {/* <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                {mode} · {voice} 
              </span> */}
            </div>

            <div className="rounded-3xl border border-black bg-white p-6 shadow-inner">
              <p className="text- text-black">{response.summary}</p>
              {/* <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {response.details.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul> */}
            </div>
            {/* <div className="flex flex-1 flex-col gap-5 rounded-[28px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl"> */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Policy</p>
              {/* <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                {mode} · {voice} 
              </span> */}
            </div>
            <div className="rounded-3xl border border-black bg-white p-6 shadow-inner">
              <p className="text- text-black">{response.summary}</p>
              {/* <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {response.details.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul> */}
            </div>

            {/* <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Confidence</span>
                <span>{Math.round(response.confidence * 100)}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400"
                  style={{ width: `${Math.round(response.confidence * 100)}%` }}
                />
              </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
