"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const PANEL_BASE = "relative overflow-hidden flex flex-col rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950 via-slate-950/90 to-black shadow-[0_30px_60px_-35px_rgba(15,23,42,0.75)] w-full";
const HEADER_CLASSES = "flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/60";
const CODE_SURFACE =
  "flex-1 overflow-x-auto bg-black/60 px-5 py-6 text-[13px] leading-7 font-mono text-slate-200 min-h-[320px]";
const COPY_BUTTON =
  "inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white transition hover:bg-white/10";

export default function PythonPreview() {
  const [copiedPython, setCopiedPython] = useState(false);
  const [copiedPolicy, setCopiedPolicy] = useState(false);

  const pythonSnippet = `import megent

mgnt = megent.init(policy="policy.yaml")

@mgnt.guard
def get_user(user_id: str):
    return {
        "email": "alice@company.com",
        "phone": "555-0192"
    }

print(get_user("u_001"))`;

  const policySnippet = `name: Financial_Policy
description: Redact PII fields

rules:
  - resource: "user_data"
    actions: ["read"]
    effect: "mask"
    fields:
      - phone
      - email`;

  const handleCopy = async (
    snippet: string,
    toggleState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await navigator.clipboard.writeText(snippet);
      toggleState(true);
      setTimeout(() => toggleState(false), 1400);
    } catch {
      toggleState(false);
    }
  };

  return (
    <section className="mx-auto wl gap-5 flex max-w-6xl px-5 sm:px-10 pb-12 items-stretch flex-col lg:flex-row">
      <div className={PANEL_BASE}>
        <div className={HEADER_CLASSES}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] text-slate-500">policy-preview.py</span>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(pythonSnippet, setCopiedPython)}
            className={COPY_BUTTON}
            aria-label={copiedPython ? "Code copied" : "Copy code"}
            title={copiedPython ? "Copied" : "Copy"}
          >
            {copiedPython ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        <pre className={CODE_SURFACE}>
          <code>
            <span className="text-indigo-300">import</span> <span className="text-cyan-300">megent</span>
            {"\n\n"}
            <span className="text-cyan-300">mgnt</span> = <span className="text-cyan-300">megent</span>.<span className="text-sky-300">init</span>(<span className="text-emerald-300">policy</span>=<span className="text-emerald-300">{"\"policy.yaml\""}</span>)
            {"\n\n"}
            <span className="text-fuchsia-300">@mgnt.guard</span>
            {"\n"}
            <span className="text-indigo-300">def</span> <span className="text-sky-300">get_user</span>(<span className="text-cyan-300">user_id</span>: <span className="text-violet-300">str</span>):
            {"\n    "}
            <span className="text-indigo-300">return</span> {'{'}
            {"\n        "}
            <span className="text-emerald-300">{"\"email\""}</span>: <span className="text-emerald-300">{"\"alice@company.com\""}</span>,
            {"\n        "}
            <span className="text-emerald-300">{"\"phone\""}</span>: <span className="text-amber-300">{"\"555-0192\""}</span>
            {"\n    "}
            {'}'}
            {"\n\n"}
            <span className="text-cyan-300">print</span>(<span className="text-sky-300">get_user</span>(<span className="text-emerald-300">{"\"u_001\""}</span>))
          </code>
        </pre>
      </div>
      <div className={PANEL_BASE}>
        <div className={HEADER_CLASSES}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] text-slate-500">policy.yaml</span>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(policySnippet, setCopiedPolicy)}
            className={COPY_BUTTON}
            aria-label={copiedPolicy ? "Code copied" : "Copy code"}
            title={copiedPolicy ? "Copied" : "Copy"}
          >
            {copiedPolicy ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        <pre className={CODE_SURFACE}>
          <code>
            <span className="text-indigo-300">name:</span> <span className="text-cyan-300">Financial_Policy</span>
            {"\n"}
            <span className="text-indigo-300">description:</span> <span className="text-emerald-300">Redact PII fields</span>
            {"\n\n"}
            <span className="text-indigo-300">rules:</span>
            {"\n"}
            <span className="text-slate-400">  -</span> <span className="text-indigo-300">resource:</span> <span className="text-emerald-300">{"\"user_data\""}</span>
            {"\n"}
            <span className="text-slate-400">    </span><span className="text-indigo-300">actions:</span> <span className="text-slate-400">[</span><span className="text-emerald-300">{"\"read\""}</span><span className="text-slate-400">]</span>
            {"\n"}
            <span className="text-slate-400">    </span><span className="text-indigo-300">effect:</span> <span className="text-emerald-300">{"\"mask\""}</span>
            {"\n"}
            <span className="text-slate-400">    </span><span className="text-indigo-300">fields:</span>
            {"\n"}
            <span className="text-slate-400">      -</span> <span className="text-cyan-300">phone</span>
            {"\n"}
            <span className="text-slate-400">      -</span> <span className="text-cyan-300">email</span>
          </code>
        </pre>
      </div>
    </section>
  );
}
