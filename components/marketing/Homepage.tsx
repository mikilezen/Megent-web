"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  Github,
  ShieldCheck,
} from "lucide-react";
import { FAQS } from "@/data/faq";

const GITHUB_URL = "https://github.com/megents/megent";
const INSTALL_COMMAND = "pip install megent";

const EXAMPLES = {
  "megent.yaml": `version: "1"
default_action: deny

tools:
  send_email:
    allow: true
    pii_mask: [email, phone]`,
  "agent.py": `import megent as mg

mg.configure(policy_path="megent.yaml")

@mg.guard
def send_email(to: str, body: str) -> str:
    # Your existing tool implementation
    return "sent"

send_email(
    to="ops@example.com",
    body="Call me at +1 555 111 2222",
)`,
};

export default function Homepage() {
  const [activeFile, setActiveFile] = useState<keyof typeof EXAMPLES>("megent.yaml");
  const [copied, setCopied] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied("Copy unavailable — select the text instead");
      window.setTimeout(() => setCopied(null), 2600);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="site-shell">
      <aside className="announcement-bar" aria-label="New: Megent CLI">
        <div className="site-container announcement-inner">
          <span className="announcement-label">NEW</span>
          <p><strong>Megent CLI</strong><span> — open-source policy checks, from your terminal.</span></p>
          <a href={`${GITHUB_URL}#quickstart`} target="_blank" rel="noreferrer">
            View more <ArrowRight aria-hidden="true" size={15} />
          </a>
        </div>
      </aside>
      <header className="site-header">
        <div className="site-container header-inner">
          <a className="wordmark" href="#top" aria-label="Megent home" onClick={closeMenu}>
            <span className="wordmark-symbol" aria-hidden="true">M</span>
            <span>Megent</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#controls" onClick={closeMenu}>Policy controls</a>
            <a href="#quickstart" onClick={closeMenu}>Quickstart</a>
            <a className="nav-github" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" size={16} /> GitHub
            </a>
            <a className="button button-dark nav-cta" href="#quickstart" onClick={closeMenu}>
              Get started <ArrowRight aria-hidden="true" size={16} />
            </a>
          </nav>
        </div>
      </header>

      <section className="hero site-container" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" /> Open-source runtime policy for AI agents</p>
          <h1>Your agent proposes the call.<br /><span>Megent checks the policy.</span></h1>
          <p className="hero-description">
            Decide which tools an agent may run. Megent checks guarded Python functions against your policy before they execute.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#quickstart">
              Start with the quickstart <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a className="button button-light" href={GITHUB_URL} target="_blank" rel="noreferrer">
              View the source <Github aria-hidden="true" size={16} />
            </a>
          </div>
          <div className="proof-line" aria-label="Project details">
            <span><ShieldCheck aria-hidden="true" size={16} /> Apache-2.0</span>
            <span>Python package</span>
            <span>YAML policies</span>
          </div>
        </div>

        <div className="code-panel" aria-label="Megent quickstart code example">
          <div className="code-panel-top">
            <div className="file-tabs" role="tablist" aria-label="Quickstart example files">
              {(Object.keys(EXAMPLES) as Array<keyof typeof EXAMPLES>).map((file) => (
                <button
                  key={file}
                  type="button"
                  role="tab"
                  id={`tab-${file}`}
                  aria-selected={activeFile === file}
                  aria-controls="quickstart-code"
                  className={activeFile === file ? "file-tab is-active" : "file-tab"}
                  onClick={() => setActiveFile(file)}
                >
                  {file}
                </button>
              ))}
            </div>
            <button
              className="copy-button"
              type="button"
              aria-label={`Copy ${activeFile}`}
              onClick={() => copyText(EXAMPLES[activeFile], activeFile)}
            >
              {copied === activeFile ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied === activeFile ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="code-content" id="quickstart-code" role="tabpanel" aria-labelledby={`tab-${activeFile}`}>
            <code>{EXAMPLES[activeFile]}</code>
          </pre>
          <div className="code-panel-bottom">
            <span>Example from the Megent quickstart</span>
            <span className="code-language">{activeFile.endsWith("yaml") ? "YAML" : "PYTHON"}</span>
          </div>
          <span className="sr-only" aria-live="polite">{copied}</span>
        </div>
        <a className="scroll-cue" href="#how-it-works" aria-label="Scroll to how it works">
          <ArrowDown aria-hidden="true" size={17} />
        </a>
      </section>

      <section className="intro-band">
        <div className="site-container intro-band-inner">
          <p className="eyebrow"><span aria-hidden="true" /> The execution boundary</p>
          <h2>A model can suggest an action.<br /><span>Your policy decides if the tool runs.</span></h2>
          <p>Megent is an open-source Python runtime you run with your own application—not a hosted dashboard or web service. Guard the functions that matter, keep policy in your project, and inspect the code on GitHub.</p>
        </div>
      </section>

      <section className="section site-container" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow"><span aria-hidden="true" /> From policy to execution</p>
          <h2>Three steps. Your code stays yours.</h2>
          <p>Keep your agent and tools. Add a policy file and guard the functions that need a decision at runtime.</p>
        </div>
        <ol className="steps-list">
          <li>
            <span className="step-number">01</span>
            <div><h3>Write the rule</h3><p>Start with a default action, then explicitly allow the tools your agent needs.</p></div>
            <code>default_action: deny</code>
          </li>
          <li>
            <span className="step-number">02</span>
            <div><h3>Guard the tool</h3><p>Wrap the Python function that performs the action with Megent.</p></div>
            <code>@mg.guard</code>
          </li>
          <li>
            <span className="step-number">03</span>
            <div><h3>Review decisions</h3><p>Use structured audit events to see which calls were allowed or blocked.</p></div>
            <code>allow · block</code>
          </li>
        </ol>
      </section>

      <section className="controls-section" id="controls">
        <div className="site-container controls-layout">
          <div className="controls-heading">
            <p className="eyebrow"><span aria-hidden="true" /> Policy controls</p>
            <h2>Small rules.<br />Clear decisions.</h2>
            <p>Keep the first policy readable. Add controls where the workflow needs them.</p>
          </div>
          <div className="controls-list">
            <article>
              <span className="control-index">01</span>
              <div><h3>Allow or deny tools</h3><p>Set a default action and name the tools that may run.</p></div>
            </article>
            <article>
              <span className="control-index">02</span>
              <div><h3>Mask configured fields</h3><p>Apply pattern-based masking to fields such as email addresses and phone numbers.</p></div>
            </article>
            <article>
              <span className="control-index">03</span>
              <div><h3>Keep an audit trail</h3><p>Emit structured events with the tool and policy decision.</p></div>
            </article>
            <article>
              <span className="control-index">04</span>
              <div><h3>Add identity and rate limits</h3><p>Optional JWT identity and per-agent rate limits are available in the runtime.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="boundary-note site-container">
        <span className="boundary-mark" aria-hidden="true"><ShieldCheck size={22} /></span>
        <div>
          <p className="eyebrow"><span aria-hidden="true" /> Know the boundary</p>
          <h2>Tool-call policy is one layer of security.</h2>
          <p>Megent governs the calls you wrap. It does not inspect every prompt or model response, and it does not secure the tools themselves. Keep the rest of your application security controls in place.</p>
        </div>
      </section>

      <section className="faq-section">
        <div className="site-container faq-layout">
          <div className="section-heading">
            <p className="eyebrow"><span aria-hidden="true" /> Common questions</p>
            <h2>Clear answers before you install.</h2>
            <a className="text-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
              Read the project README <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
          <div className="faq-list">
            {FAQS.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta" id="quickstart">
        <div className="site-container closing-cta-inner">
          <p className="eyebrow"><span aria-hidden="true" /> Start small</p>
          <h2>Put a policy at the tool boundary.</h2>
          <p>Install the Python package, read the quickstart, and guard one tool function first.</p>
          <div className="install-command">
            <code>{INSTALL_COMMAND}</code>
            <button type="button" onClick={() => copyText(INSTALL_COMMAND, "install") }>
              {copied === "install" ? <Check size={16} /> : <Copy size={16} />}
              {copied === "install" ? "Copied" : "Copy command"}
            </button>
          </div>
          <p className="install-status" aria-live="polite">{copied === "install" ? "Command copied to clipboard." : copied?.startsWith("Copy unavailable") ? copied : ""}</p>
          <a className="button button-cream" href={`${GITHUB_URL}#quickstart`} target="_blank" rel="noreferrer">
            Open the quickstart <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-container footer-main">
          <div className="footer-brand">
            <a className="wordmark wordmark-light" href="#top" aria-label="Megent home">
              <span className="wordmark-symbol" aria-hidden="true">M</span><span>Megent</span>
            </a>
            <p>Runtime policy for AI agent tool calls.</p>
          </div>
          <div className="footer-links">
            <a href="#how-it-works">How it works</a>
            <a href="#controls">Policy controls</a>
            <a href="https://github.com/megents/megent/blob/main/LICENSE" target="_blank" rel="noreferrer">Apache-2.0 license</a>
            <a href="mailto:hello@megent.dev">Contact</a>
          </div>
        </div>
        <div className="site-container footer-bottom">
          <span>© {new Date().getFullYear()} Megent</span>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github size={15} /> Open source on GitHub</a>
        </div>
      </footer>
    </main>
  );
}
