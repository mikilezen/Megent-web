"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const PANEL_BASE =
  "relative overflow-hidden w-full rounded-2xl border border-[var(--border2)] bg-[#141413] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_50px_-35px_rgba(20,20,19,0.7)]";
const HEADER_CLASSES =
  "flex items-center justify-between px-5 py-3 border-b border-[#30302e] bg-[linear-gradient(180deg,rgba(48,48,46,0.95),rgba(20,20,19,0.95))]";
const CODE_SURFACE =
  "overflow-x-auto px-6 py-7 text-[13px] leading-7 [font-family:var(--font-mono-ui)] text-[#e8e6dc] min-h-[320px]";
const COPY_BUTTON =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#4d4c48] text-[#e8e6dc] bg-[#30302e] transition hover:border-[#87867f] hover:text-[#faf9f5]";

export default function PythonPreview() {
  const [activeFile, setActiveFile] = useState<"python" | "policy">("python");
  const [copied, setCopied] = useState(false);

  const pythonSnippet = `import megent as mg

mg.configure(policy_path="megent.yaml")

@mg.guard
def send_email(to: str, body: str) -> str:
    return "sent"

send_email("ops@example.com", "Call me at +1 555 111 2222")`;

  const policySnippet = `version: "1"
  passport: M98ffF0F8
default_action: deny
pii_mask: [email]
tools:
  send_email:
    allow: true
    pii_mask: [email, phone]`;

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

  const activeSnippet = activeFile === "python" ? pythonSnippet : policySnippet;

  return (
    <section className="bg-[var(--background)] py-22" id="code-preview">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <div className="mb-8 max-w-2xl sm:mb-10">
          {/* <span className="mb-3 inline-block text-[11px] uppercase tracking-[0.12em] text-[var(--text3)]">
            Code Preview
          </span>
          <h2 className="mb-3 text-[clamp(30px,4vw,46px)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--text)] [font-family:var(--font-serif)]">
            Policy and runtime in one place
          </h2>
          <p className="text-[15px] leading-[1.7] text-[var(--text2)]">
            Write a small policy file and let Megent enforce it at runtime. */}
          {/* </p> */}
        </div>

        <div className="mx-auto w-full max-w-3xl sm:max-w-4xl">
          <div className={PANEL_BASE}>
            <div className={HEADER_CLASSES}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center rounded-md border border-[#4d4c48] bg-[#30302e] p-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveFile("python")}
                    className={`px-2.5 py-1 font-mono text-[11px] rounded ${
                      activeFile === "python"
                        ? "bg-[#4d4c48] text-[#faf9f5]"
                        : "text-[#b0aea5] hover:text-[#faf9f5]"
                    }`}
                  >
                    main.py
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFile("policy")}
                    className={`px-2.5 py-1 font-mono text-[11px] rounded ${
                      activeFile === "policy"
                        ? "bg-[#4d4c48] text-[#faf9f5]"
                        : "text-[#b0aea5] hover:text-[#faf9f5]"
                    }`}
                  >
                    megent.yaml
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(activeSnippet, setCopied)}
                className={COPY_BUTTON}
                aria-label={copied ? "Code copied" : "Copy code"}
                title={copied ? "Copied" : "Copy"}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <pre className={CODE_SURFACE}>
              <code>
                {activeFile === "python" ? (
                  <>
                    <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">megent</span> <span className="text-[#c586c0]">as</span> <span className="text-[#9cdcfe]">mg</span>
                    {"\n\n"}
                    <span className="text-[#9cdcfe]">mg</span>.<span className="text-[#dcdcaa]">configure</span>(<span className="text-[#9cdcfe]">policy_path</span>=<span className="text-[#ce9178]">{"\"megent.yaml\""}</span>)
                    {"\n\n"}
                    <span className="text-[#c586c0]">@mg.guard</span>
                    {"\n"}
                    <span className="text-[#c586c0]">def</span> <span className="text-[#dcdcaa]">send_email</span>(<span className="text-[#9cdcfe]">to</span>: <span className="text-[#4ec9b0]">str</span>, <span className="text-[#9cdcfe]">body</span>: <span className="text-[#4ec9b0]">str</span>) -&gt; <span className="text-[#4ec9b0]">str</span>:
                    {"\n    "}
                    <span className="text-[#c586c0]">return</span> <span className="text-[#ce9178]">{"\"sent\""}</span>
                    {"\n\n"}
                    <span className="text-[#dcdcaa]">send_email</span>(<span className="text-[#ce9178]">{"\"ops@example.com\""}</span>, <span className="text-[#ce9178]">{"\"Call me at +1 555 111 2222\""}</span>)
                  </>
                ) : (
                  <>
                    <span className="text-[#9cdcfe]">version</span>: <span className="text-[#ce9178]">{"\"1\""}</span>
                    {"\n"}
                    <span className="text-[#9cdcfe]">default_action</span>: <span className="text-[#c586c0]">deny</span>
                    {"\n"}
                    <span className="text-[#9cdcfe]">on_block</span>: <span className="text-[#4ec9b0]">stop_tool</span>
                    {"\n\n"}
                    <span className="text-[#9cdcfe]">budget_limit</span>:
                    {"\n  "}
                    <span className="text-[#9cdcfe]">daily_usd</span>: <span className="text-[#b5cea8]">50</span>
                    {"\n\n"}
                    <span className="text-[#9cdcfe]">human_in_the_loop</span>:
                    {"\n  "}
                    <span className="text-[#9cdcfe]">tools</span>: [<span className="text-[#4ec9b0]">search_customer_history</span>]
                    {"\n\n"}
                    <span className="text-[#9cdcfe]">awareness</span>:
                    {"\n  "}
                    <span className="text-[#9cdcfe]">detect_sensitive_data</span>: <span className="text-[#569cd6]">true</span>
                    {"\n  "}
                    <span className="text-[#9cdcfe]">rectify_before_search</span>: <span className="text-[#569cd6]">true</span>
                    {"\n\n"}
                    <span className="text-[#9cdcfe]">tools</span>:
                    {"\n  "}
                    <span className="text-[#dcdcaa]">send_email</span>:
                    {"\n    "}
                    <span className="text-[#9cdcfe]">allow</span>: <span className="text-[#569cd6]">true</span>
                    {"\n    "}
                    <span className="text-[#9cdcfe]">pii_mask</span>: [<span className="text-[#4ec9b0]">email</span>, <span className="text-[#4ec9b0]">phone</span>]
                  </>
                )}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
