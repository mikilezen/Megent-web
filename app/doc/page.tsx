"use client";
import { useState } from "react";

const NAV_SECTIONS = [
  { group: "Getting Started", items: [
    { id: "overview",      label: "Overview" },
    { id: "installation",  label: "Installation" },
    { id: "quickstart",    label: "Quick Start" },
  ]},
  { group: "Core Concepts", items: [
    { id: "policy-yaml",   label: "Polaicy YAML" },
    { id: "actions",       label: "Actions" },
    { id: "pii-masking",   label: "PII Masking" },
  ]},
  { group: "Frameworks", items: [
    { id: "python",        label: "Python" },
    { id: "typescript",    label: "TypeScript / Node" },
    { id: "langchain",     label: "LangChain" },
    { id: "crewai",        label: "CrewAI" },
    { id: "openai-agents", label: "OpenAI Agents SDK" },
  ]},
  { group: "Reference", items: [
    { id: "audit-logs",    label: "Audit Logs" },
    { id: "jwt-identity",  label: "JWT Identity" },
  ]},
];

const FRAMEWORKS = [
  { id: "python",    label: "Python",            icon: "🐍", lang: "python", file: "agent.py" },
  { id: "ts",        label: "TypeScript",         icon: "TS", lang: "typescript", file: "agent.ts" },
  { id: "langchain", label: "LangChain",          icon: "🔗", lang: "python", file: "agent.py" },
  { id: "crewai",    label: "CrewAI",             icon: "🤖", lang: "python", file: "crew.py" },
  { id: "openai",    label: "OpenAI Agents SDK",  icon: "✦", lang: "python", file: "agent.py" },
];

const INSTALLS = {
  python:    "pip install megent",
  ts:        "npm install @megent/sdk",
  langchain: "pip install megent langchain langchain-openai",
  crewai:    "pip install megent crewai",
  openai:    "pip install megent openai openai-agents",
};

const DEMOS = {
  python: `import megent

mgnt = megent.init(policy="policy.yaml")

@mgnt.guard
def get_user(user_id: str):
    return {
        "id": user_id,
        "email": "alice@acme.com",
        "phone": "555-0192",
        "ssn": "123-45-6789",
    }

@mgnt.guard
def delete_user(user_id: str):
    # ✗ blocked by policy — matches delete_*
    return {"deleted": user_id}

@mgnt.guard
def transfer_funds(amount: float, to: str):
    # ✗ blocked by policy — restrict-payments rule
    return {"transferred": amount, "to": to}

if __name__ == "__main__":
    # ✓ Allowed — PII masked in return value
    print(get_user("u_001"))
    # → {"id": "u_001", "email": "***", "phone": "***", "ssn": "***"}

    # ✗ Denied — rule: block-delete
    delete_user("u_001")
    # → MegentDenyError: 'block-delete' denied call: delete_user

    # ✗ Denied — rule: restrict-payments
    transfer_funds(500.00, "bob")
    # → MegentDenyError: Payment actions require human approval`,

  ts: `import { Megent } from "@megent/sdk";

const mgnt = new Megent({ policy: "./policy.yaml" });

const getUser = mgnt.guard(async (userId: string) => {
  return {
    id: userId,
    email: "alice@acme.com",
    phone: "555-0192",
    ssn: "123-45-6789",
  };
});

const deleteUser = mgnt.guard(async (userId: string) => {
  return { deleted: userId };
});

const transferFunds = mgnt.guard(
  async (from: string, to: string, amount: number) => {
    return { status: "ok", amount };
  }
);

// ✓ Allowed — PII masked automatically
const user = await getUser("u_001");
console.log(user);
// → { id: "u_001", email: "***", phone: "***", ssn: "***" }

// ✗ Denied — rule: block-delete
try {
  await deleteUser("u_001");
} catch (e) {
  console.error(e.message);
  // MegentDenyError: 'block-delete' denied call: deleteUser
}

// ✗ Denied — rule: restrict-payments
try {
  await transferFunds("u_001", "u_002", 500);
} catch (e) {
  console.error(e.message);
  // MegentDenyError: Payment actions require human approval
}`,

  langchain: `from langchain.tools import tool
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain import hub
import megent

mgnt = megent.init(policy="policy.yaml")

# Option 1: Guard individual LangChain tools
@mgnt.guard
@tool
def get_customer_data(customer_id: str) -> dict:
    """Fetch customer data from the CRM."""
    return {
        "id": customer_id,
        "email": "customer@example.com",
        "ssn": "123-45-6789",
    }

@mgnt.guard
@tool
def delete_customer(customer_id: str) -> dict:
    """Delete a customer record."""
    # ✗ blocked by policy
    return {"deleted": customer_id}

# Option 2: wrap() an entire toolkit
from langchain_community.agent_toolkits import SQLDatabaseToolkit
safe_toolkit = mgnt.wrap(SQLDatabaseToolkit(db=db, llm=llm))

llm = ChatOpenAI(model="gpt-4o")
prompt = hub.pull("hwchase17/openai-functions-agent")

agent = create_openai_functions_agent(
    llm=llm,
    tools=[get_customer_data, delete_customer],
    prompt=prompt,
)
executor = AgentExecutor(agent=agent, tools=[get_customer_data, delete_customer])

# Policy enforced on every tool call the LLM makes
result = executor.invoke({"input": "Get data for customer c_42"})
print(result["output"])
# delete_customer will be denied if the LLM tries to call it`,

  crewai: `from crewai import Agent, Task, Crew
from crewai.tools import BaseTool
import megent

mgnt = megent.init(policy="policy.yaml")

class CustomerLookupTool(BaseTool):
    name: str = "get_customer"
    description: str = "Look up a customer record by ID."

    def _run(self, customer_id: str) -> dict:
        return {
            "id": customer_id,
            "email": "user@example.com",
            "phone": "555-1234",
        }

class DeleteTool(BaseTool):
    name: str = "delete_record"
    description: str = "Delete a customer record permanently."

    def _run(self, record_id: str) -> dict:
        # ✗ will be intercepted and denied
        return {"deleted": record_id}

class PaymentTool(BaseTool):
    name: str = "transfer_funds"
    description: str = "Transfer funds between accounts."

    def _run(self, from_id: str, to_id: str, amount: float) -> dict:
        # ✗ will be intercepted and denied
        return {"status": "ok", "amount": amount}

# Wrap tools with Megent policy before passing to agents
safe_lookup  = mgnt.wrap(CustomerLookupTool())
safe_delete  = mgnt.wrap(DeleteTool())
safe_payment = mgnt.wrap(PaymentTool())

analyst = Agent(
    role="Data Analyst",
    goal="Analyze customer data with strict access controls",
    tools=[safe_lookup, safe_delete, safe_payment],
    backstory="You analyze data carefully and follow compliance rules.",
)

task = Task(
    description="Look up customer c_42 and summarize their profile.",
    agent=analyst,
    expected_output="A compliance-safe customer profile summary.",
)

crew = Crew(agents=[analyst], tasks=[task], verbose=True)
result = crew.kickoff()
# delete_record and transfer_funds will be denied automatically`,

  openai: `from openai_agents import Agent, Runner, function_tool
import megent

mgnt = megent.init(policy="policy.yaml")

@mgnt.guard
@function_tool
def get_user_profile(user_id: str) -> dict:
    """Retrieve a user profile from the database."""
    return {
        "id": user_id,
        "name": "Alice Smith",
        "email": "alice@acme.com",
        "phone": "555-0192",
        "ssn": "123-45-6789",
    }

@mgnt.guard
@function_tool
def delete_user_account(user_id: str) -> dict:
    """Permanently delete a user account and all data."""
    # ✗ blocked — rule: block-delete
    return {"deleted": user_id}

@mgnt.guard
@function_tool
def transfer_funds(from_id: str, to_id: str, amount: float) -> dict:
    """Transfer funds between two accounts."""
    # ✗ blocked — rule: restrict-payments
    return {"status": "ok", "amount": amount}

agent = Agent(
    name="Support Agent",
    instructions=(
        "You are a customer support agent. Help users with account "
        "management. You must follow all compliance policies."
    ),
    tools=[get_user_profile, delete_user_account, transfer_funds],
)

# Megent enforces policy on every tool call the agent makes:
# get_user_profile  → ✓ allowed, PII masked in output
# delete_user_account → ✗ denied by 'block-delete'
# transfer_funds    → ✗ denied by 'restrict-payments'
result = Runner.run_sync(agent, "Get the profile for user u_001")
print(result.final_output)`,
};

const YAML_POLICY = `version: "1.0"
agent: production-agent

rules:
  - id: block-delete
    description: No agent may delete any resource
    match:
      tool: "delete_*"
    action: deny

  - id: restrict-payments
    description: Payment tools require human-in-the-loop
    match:
      tool: "transfer_*"
    action: deny
    reason: "Payment actions require human approval"

  - id: mask-pii
    description: Strip PII from all tool outputs
    match:
      tool: "*"
    action: mask
    fields:
      - email
      - phone
      - ssn
      - credit_card
      - ip_address

  - id: allow-reads
    description: Read operations are permitted
    match:
      tool: "get_*"
    action: allow`;

// Lightweight syntax highlighter
function hl(code, lang) {
  const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  let s = esc(code);
  if (lang === "yaml") {
    s = s
      .replace(/(#.*$)/gm, '<i class="c">$1</i>')
      .replace(/^(\s*)([\w-]+)(:)/gm,'$1<b class="k">$2</b>$3')
      .replace(/"([^"]*)"/g,'<i class="sv">"$1"</i>')
      .replace(/\b(deny|allow|mask)\b/g,'<b class="act">$1</b>');
  } else if (lang === "bash") {
    s = `<i class="sv">${s}</i>`;
  } else {
    s = s
      .replace(/(#.*$)/gm,'<i class="c">$1</i>')
      .replace(/\b(import|from|async|await|const|let|new|return|if|else|try|catch|class|def|for|in|with|as|print)\b/g,'<b class="kw">$1</b>')
      .replace(/@([\w.]+)/g,'<b class="dc">@$1</b>')
      .replace(/("""[\s\S]*?"""|"[^"\n]*"|'[^'\n]*')/g,'<i class="sv">$1</i>')
      .replace(/\b(True|False|None|true|false|null|undefined)\b/g,'<b class="lt">$1</b>')
      .replace(/\b(\d+\.?\d*)\b/g,'<b class="nm">$1</b>')
      .replace(/# [✓✗].*$/gm, m => m.includes("✓") ? `<i class="ok">${m}</i>` : `<i class="no">${m}</i>`)
      .replace(/\/\/ [✓✗].*$/gm, m => m.includes("✓") ? `<i class="ok">${m}</i>` : `<i class="no">${m}</i>`);
  }
  return s;
}

function CodeBlock({ code, lang = "python", filename }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #161d2b", marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 16px", background: "#0c1118", borderBottom: "1px solid #161d2b" }}>
        <span style={{ fontSize: 11.5, color: "#2d3f55", fontFamily: "JetBrains Mono,monospace" }}>{filename || lang}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),1800); }}
          style={{ fontSize: 11, color: copied ? "#34d399" : "#2d3f55", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <div style={{ background: "#07090f", padding: "22px 24px", overflowX: "auto" }}>
        <style>{`
          .c{color:#253348;font-style:normal} .k{color:#6366f1;font-weight:700;font-style:normal}
          .kw{color:#818cf8;font-weight:700;font-style:normal} .sv{color:#34d399;font-style:normal}
          .act{color:#f87171;font-weight:700;font-style:normal} .lt{color:#f87171;font-style:normal}
          .nm{color:#fb923c;font-style:normal} .dc{color:#c084fc;font-style:normal}
          .ok{color:#34d399;font-style:normal} .no{color:#f87171;font-style:normal}
        `}</style>
        <pre style={{ margin: 0, fontSize: 12.5, lineHeight: 1.85, color: "#7a92b0", fontFamily: "JetBrains Mono,Fira Code,monospace", whiteSpace: "pre" }}>
          <code dangerouslySetInnerHTML={{ __html: hl(code, lang) }} />
        </pre>
      </div>
    </div>
  );
}

function FrameworkDemos() {
  const [active, setActive] = useState("python");
  const fw = FRAMEWORKS.find(f => f.id === active);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {FRAMEWORKS.map(f => {
          const on = active === f.id;
          return (
            <button key={f.id} onClick={() => setActive(f.id)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 15px", borderRadius: 8, fontSize: 13, fontWeight: on ? 600 : 400,
              border: `1px solid ${on ? "#4f46e5" : "#161d2b"}`,
              background: on ? "#1a1760" : "#0c1118",
              color: on ? "#a5b4fc" : "#3d5473",
              cursor: "pointer", transition: "all 0.12s", fontFamily: "inherit",
            }}>
              <span style={{ fontSize: 12, letterSpacing: f.id === "ts" ? "-0.05em" : 0, fontWeight: 800 }}>{f.icon}</span>
              {f.label}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#1e293b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Install</span>
      </div>
      <CodeBlock code={INSTALLS[active]} lang="bash" filename="terminal" />
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#1e293b", letterSpacing: "0.1em", textTransform: "uppercase" }}>Full example</span>
      </div>
      <CodeBlock code={DEMOS[active]} lang={fw.lang} filename={fw.file} />
    </div>
  );
}

function Section({ id, title, badge, badgeColor = "#6366f1", children }) {
  return (
    <section id={id} style={{ marginBottom: 72, scrollMarginTop: 72 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, fontFamily: "Bricolage Grotesque,sans-serif", color: "#e2e8f0", letterSpacing: "-0.025em" }}>{title}</h2>
        {badge && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 9px", borderRadius: 999, background: badgeColor + "20", color: badgeColor, border: `1px solid ${badgeColor}40` }}>{badge}</span>}
      </div>
      <div style={{ width: 28, height: 2, background: "#4f46e5", borderRadius: 2, marginBottom: 28 }} />
      {children}
    </section>
  );
}

function Callout({ type = "info", title, children }) {
  const m = {
    info:    { bg: "#0a1525", border: "#1d4ed8", icon: "ℹ", color: "#3b82f6" },
    tip:     { bg: "#071510", border: "#15803d", icon: "✦", color: "#22c55e" },
    warning: { bg: "#150e03", border: "#b45309", icon: "⚠", color: "#f59e0b" },
  };
  const s = m[type];
  return (
    <div style={{ padding: "14px 18px", borderRadius: 8, marginBottom: 20, background: s.bg, borderLeft: `3px solid ${s.color}`, border: `1px solid ${s.border}30`, borderLeftColor: s.color, display: "flex", gap: 12 }}>
      <span style={{ color: s.color, fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div>
        {title && <p style={{ margin: "0 0 3px", fontSize: 12.5, fontWeight: 700, color: s.color }}>{title}</p>}
        <p style={{ margin: 0, fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>{children}</p>
      </div>
    </div>
  );
}

function PropRow({ name, type, req, desc }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "150px 90px 1fr", gap: 16, padding: "13px 20px", borderBottom: "1px solid #0c1118", alignItems: "start" }}>
      <code style={{ color: "#a5b4fc", fontSize: 12, fontFamily: "JetBrains Mono,monospace" }}>{name}{req && <span style={{ color: "#f87171" }}> *</span>}</code>
      <code style={{ color: "#34d399", fontSize: 11.5, fontFamily: "JetBrains Mono,monospace" }}>{type}</code>
      <span style={{ color: "#3d5473", fontSize: 13, lineHeight: 1.6 }}>{desc}</span>
    </div>
  );
}

export default function MegentDocs() {
  const [active, setActive] = useState("overview");

  const go = id => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#04070e", minHeight: "100vh", color: "#e2e8f0", fontFamily: "DM Sans,system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:#04070e}
        ::-webkit-scrollbar-thumb{background:#161d2b;border-radius:2px}
        button,a{font-family:inherit}
      `}</style>

      {/* TOP NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 200, height: 58, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(4,7,14,0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid #0d1422" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#4f46e5,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px #6366f140" }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 800, fontFamily: "Bricolage Grotesque,sans-serif" }}>M</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14.5, letterSpacing: "-0.03em", fontFamily: "Bricolage Grotesque,sans-serif", color: "#f1f5f9" }}>megent</span>
          <span style={{ color: "#161d2b", fontSize: 15, margin: "0 2px" }}>/</span>
          <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>docs</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["GitHub", "PyPI", "npm"].map(l => (
            <button key={l} style={{ padding: "6px 13px", fontSize: 12.5, color: "#3d5473", background: "none", border: "none", cursor: "pointer" }}>{l}</button>
          ))}
          <button style={{ padding: "7px 18px", borderRadius: 7, background: "#4f46e5", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, boxShadow: "0 0 22px #4f46e540" }}>Get Started →</button>
        </div>
      </header>

      <div style={{ display: "flex", maxWidth: 1240, margin: "0 auto" }}>

        {/* SIDEBAR */}
        <aside style={{ width: 228, flexShrink: 0, position: "sticky", top: 58, height: "calc(100vh - 58px)", overflowY: "auto", padding: "28px 0", borderRight: "1px solid #0d1422" }}>
          {NAV_SECTIONS.map(sec => (
            <div key={sec.group} style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#161d2b", padding: "0 20px", marginBottom: 6 }}>{sec.group}</p>
              {sec.items.map(item => {
                const on = active === item.id;
                return (
                  <button key={item.id} onClick={() => go(item.id)} style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "8px 20px 8px 17px", fontSize: 13, fontWeight: on ? 600 : 400,
                    color: on ? "#a5b4fc" : "#3d5473",
                    background: on ? "#1a1760" : "transparent",
                    border: "none", borderLeft: `2px solid ${on ? "#6366f1" : "transparent"}`,
                    cursor: "pointer", transition: "all 0.12s",
                  }}>{item.label}</button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: "52px 60px 120px", maxWidth: 860, minWidth: 0 }}>

          {/* HERO */}
          <div style={{ marginBottom: 72 }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 20, flexWrap: "wrap" }}>
              {[["v0.1.0","#6366f1"],["Python","#34d399"],["TypeScript","#60a5fa"],["MIT License","#f472b6"]].map(([l,c]) => (
                <span key={l} style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.05em", padding: "2px 10px", borderRadius: 999, background: c+"18", color: c, border: `1px solid ${c}28` }}>{l}</span>
              ))}
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, fontFamily: "Bricolage Grotesque,sans-serif", letterSpacing: "-0.03em", color: "#f8fafc", marginBottom: 18 }}>
              Megent SDK<br /><span style={{ color: "#4f46e5" }}>Documentation</span>
            </h1>
            <p style={{ fontSize: 15.5, color: "#3d5473", lineHeight: 1.8, maxWidth: 500, marginBottom: 32 }}>
              A policy runtime that controls what AI agents can do. Intercept tool calls, enforce YAML rules, and mask PII — across every major agentic framework.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => go("quickstart")} style={{ padding: "10px 22px", borderRadius: 8, background: "#4f46e5", color: "#fff", border: "none", fontWeight: 700, fontSize: 13.5, cursor: "pointer", boxShadow: "0 0 26px #4f46e540" }}>Quick Start →</button>
              <button onClick={() => go("python")} style={{ padding: "10px 22px", borderRadius: 8, background: "transparent", color: "#3d5473", border: "1px solid #161d2b", fontWeight: 500, fontSize: 13.5, cursor: "pointer" }}>View Examples</button>
            </div>
          </div>

          {/* OVERVIEW */}
          <Section id="overview" title="Overview">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.85, marginBottom: 28 }}>
              Megent sits between your orchestration layer and your AI agents, intercepting every tool call before it executes. You define rules in a simple YAML file — Megent enforces them at runtime, masking PII in outputs, blocking dangerous operations, and logging every decision to a structured audit trail.
            </p>

            {/* Flow */}
            <div style={{ background: "#07090f", border: "1px solid #0d1422", borderRadius: 12, padding: "28px 20px", marginBottom: 28, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
                {[
                  { l: "LLM / Orchestrator", c: "#6366f1" }, null,
                  { l: "Megent Runtime", c: "#34d399", glow: true }, null,
                  { l: "Tool Function", c: "#f59e0b" },
                ].map((x, i) => x === null ? (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 6px" }}>
                    <div style={{ width: 24, height: 1, background: "#161d2b" }} />
                    <span style={{ color: "#1e293b", fontSize: 16, lineHeight: 1 }}>›</span>
                  </div>
                ) : (
                  <div key={i} style={{ padding: "11px 18px", borderRadius: 8, border: `1px solid ${x.c}${x.glow?"60":"22"}`, background: x.glow ? x.c+"10" : "#0c1118", boxShadow: x.glow ? `0 0 24px ${x.c}18` : "none" }}>
                    <p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, color: x.c, fontFamily: "JetBrains Mono,monospace" }}>{x.l}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 14, fontSize: 11, color: "#161d2b" }}>policy.yaml defines rules · runtime enforces · audit.log records all decisions</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { icon: "🛡", t: "Deny-by-default", d: "Block any tool call not explicitly allowed." },
                { icon: "🔏", t: "PII Masking", d: "Strip sensitive fields from tool outputs." },
                { icon: "📋", t: "Audit Trail", d: "Structured JSON log of every decision." },
                { icon: "🔗", t: "Any Framework", d: "Python, TS, LangChain, CrewAI, OpenAI." },
                { icon: "🎯", t: "Glob Matching", d: "Match tools with patterns like delete_*." },
                { icon: "🪪", t: "JWT Identity", d: "Per-agent passports with scoped permissions." },
              ].map(c => (
                <div key={c.t} style={{ padding: 16, borderRadius: 9, background: "#07090f", border: "1px solid #0d1422" }}>
                  <div style={{ fontSize: 18, marginBottom: 8 }}>{c.icon}</div>
                  <p style={{ fontSize: 12.5, fontWeight: 700, color: "#c5d2e0", marginBottom: 4 }}>{c.t}</p>
                  <p style={{ fontSize: 12, color: "#2d4059", lineHeight: 1.6 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* INSTALLATION */}
          <Section id="installation" title="Installation" badge="pip · npm">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 20 }}>
              Megent provides first-class packages for Python and TypeScript. Pick whichever matches your agent stack.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Python", cmd: "pip install megent", color: "#6366f1" },
                { label: "TypeScript / Node", cmd: "npm install @megent/sdk", color: "#60a5fa" },
              ].map(p => (
                <div key={p.label} style={{ borderRadius: 9, overflow: "hidden", border: "1px solid #161d2b" }}>
                  <div style={{ padding: "9px 15px", background: "#0c1118", borderBottom: "1px solid #161d2b" }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: p.color }}>{p.label}</span>
                  </div>
                  <div style={{ padding: "14px 16px", background: "#07090f" }}>
                    <code style={{ color: "#34d399", fontSize: 12.5, fontFamily: "JetBrains Mono,monospace" }}>{p.cmd}</code>
                  </div>
                </div>
              ))}
            </div>
            <Callout type="tip" title="Recommended: use a virtual environment">
              Run <code style={{ color: "#22c55e", fontSize: 11.5 }}>python -m venv .venv && source .venv/bin/activate</code> before pip installing to keep your project dependencies isolated.
            </Callout>
          </Section>

          {/* QUICKSTART */}
          <Section id="quickstart" title="Quick Start">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 20 }}>
              Two lines to initialize, one decorator to enforce. Here's everything you need to get running:
            </p>
            <CodeBlock lang="python" filename="main.py" code={`import megent

# Load your policy file
mgnt = megent.init(policy="policy.yaml")

# Decorate your own tools
@mgnt.guard
def get_user(user_id: str):
    return {"id": user_id, "email": "alice@acme.com"}

# Or wrap a third-party agent or toolkit
from any_agent_sdk import AgentToolkit
safe_agent = mgnt.wrap(AgentToolkit())`} />
          </Section>

          {/* POLICY YAML */}
          <Section id="policy-yaml" title="Policy YAML" badge="core">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 20 }}>
              All rules live in a single YAML file. Rules are evaluated top-to-bottom — the first match wins and evaluation stops.
            </p>
            <CodeBlock code={YAML_POLICY} lang="yaml" filename="policy.yaml" />

            <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #161d2b" }}>
              <div style={{ padding: "11px 20px", background: "#0c1118", borderBottom: "1px solid #161d2b" }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#253348", letterSpacing: "0.08em", textTransform: "uppercase" }}>Rule Schema</span>
              </div>
              <div style={{ background: "#07090f" }}>
                <PropRow name="id" type="string" req desc="Unique identifier referenced in audit logs and error messages." />
                <PropRow name="description" type="string" desc="Human-readable explanation of what this rule does." />
                <PropRow name="match.tool" type="glob" req desc="Tool name glob. Supports * wildcard. e.g. delete_*, get_user, *" />
                <PropRow name="action" type="enum" req desc="One of: allow · deny · mask" />
                <PropRow name="fields" type="string[]" desc="For mask: field names to redact from the tool output." />
                <PropRow name="reason" type="string" desc="For deny: custom message included in MegentDenyError." />
              </div>
            </div>
          </Section>

          {/* ACTIONS */}
          <Section id="actions" title="Actions">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 24 }}>
              Every rule must declare one of three actions. Actions determine what the runtime does when a tool call matches.
            </p>
            {[
              { a: "allow", c: "#22c55e", d: "The tool call is permitted to execute normally. Execution passes through to the underlying function.", code: `- id: allow-reads\n  match:\n    tool: "get_*"\n  action: allow` },
              { a: "deny", c: "#f87171", d: "The tool call is blocked before execution. A MegentDenyError is raised with an optional reason. The function is never called.", code: `- id: block-delete\n  match:\n    tool: "delete_*"\n  action: deny\n  reason: "Deletion requires human approval"` },
              { a: "mask", c: "#fb923c", d: "The tool call executes, but specified fields in the return value are redacted. Runs after the function returns, before the result reaches the LLM.", code: `- id: mask-pii\n  match:\n    tool: "*"\n  action: mask\n  fields: [email, phone, ssn]` },
            ].map(x => (
              <div key={x.a} style={{ borderRadius: 9, overflow: "hidden", border: `1px solid ${x.c}18`, background: "#07090f", marginBottom: 12 }}>
                <div style={{ padding: "14px 20px", borderBottom: `1px solid ${x.c}14`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <code style={{ color: x.c, fontWeight: 800, fontSize: 14, fontFamily: "JetBrains Mono,monospace", minWidth: 50 }}>{x.a}</code>
                  <p style={{ color: "#3d5473", fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{x.d}</p>
                </div>
                <div style={{ padding: "14px 20px", background: "#04070e" }}>
                  <pre style={{ margin: 0, fontSize: 12, color: "#2d4059", fontFamily: "JetBrains Mono,monospace", lineHeight: 1.75 }}>{x.code}</pre>
                </div>
              </div>
            ))}
          </Section>

          {/* PII MASKING */}
          <Section id="pii-masking" title="PII Masking" badge="automatic">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 20 }}>
              The <code style={{ color: "#34d399", fontSize: 12.5 }}>mask</code> action walks the return value recursively and replaces any matching key with <code style={{ color: "#34d399", fontSize: 12.5 }}>***</code>.
            </p>
            <CodeBlock lang="python" filename="masking-demo.py" code={`# policy.yaml
- id: mask-pii
  match:
    tool: "*"
  action: mask
  fields: [email, phone, ssn, credit_card]

# agent.py
@mgnt.guard
def get_user(user_id: str):
    return {
        "id": user_id,
        "name": "Alice Smith",       # ← untouched
        "email": "alice@acme.com",   # ← masked
        "phone": "555-0192",         # ← masked
        "ssn": "123-45-6789",        # ← masked
        "role": "admin",             # ← untouched
        "billing": {
            "credit_card": "4111...",# ← masked (nested)
            "plan": "enterprise",    # ← untouched
        }
    }

result = get_user("u_001")
# → {
#     "id":    "u_001",
#     "name":  "Alice Smith",
#     "email": "***",
#     "phone": "***",
#     "ssn":   "***",
#     "role":  "admin",
#     "billing": {"credit_card": "***", "plan": "enterprise"}
#   }`} />
            <Callout type="info" title="Recursive masking">
              Megent walks nested dicts and lists to any depth. You don't need to specify the path — just the field name.
            </Callout>
          </Section>

          {/* FRAMEWORK DEMOS — shared section for all 5 */}
          <Section id="python" title="Framework Examples" badge="5 SDKs">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 28 }}>
              The same <code style={{ color: "#a5b4fc", fontSize: 12.5 }}>policy.yaml</code> enforces your rules across every major framework. Switch tabs to see the full example for each SDK.
            </p>
            <FrameworkDemos />
          </Section>

          {/* AUDIT LOGS */}
          <Section id="audit-logs" title="Audit Logs" badge="auto-generated">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 20 }}>
              Every intercepted tool call is appended to <code style={{ color: "#a5b4fc", fontSize: 12.5 }}>audit.log</code> as newline-delimited JSON. No configuration required — it's on by default.
            </p>
            <CodeBlock lang="json" filename="audit.log" code={`{"ts":"2026-03-30T09:00:01Z","agent":"production-agent","tool":"get_user","action":"allow","rule":"allow-reads","masked_fields":["email","phone","ssn"],"duration_ms":4}
{"ts":"2026-03-30T09:00:02Z","agent":"production-agent","tool":"delete_user","action":"deny","rule":"block-delete","reason":"No agent may delete any resource","duration_ms":0}
{"ts":"2026-03-30T09:00:03Z","agent":"production-agent","tool":"transfer_funds","action":"deny","rule":"restrict-payments","reason":"Payment actions require human approval","duration_ms":0}`} />

            <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #161d2b" }}>
              <div style={{ padding: "11px 20px", background: "#0c1118", borderBottom: "1px solid #161d2b" }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#253348", letterSpacing: "0.08em", textTransform: "uppercase" }}>Log Fields</span>
              </div>
              <div style={{ background: "#07090f" }}>
                <PropRow name="ts" type="ISO 8601" desc="Timestamp of the intercepted call." />
                <PropRow name="agent" type="string" desc="Agent ID from policy.yaml or JWT." />
                <PropRow name="tool" type="string" desc="Name of the function that was called." />
                <PropRow name="action" type="enum" desc="Outcome: allow · deny · mask" />
                <PropRow name="rule" type="string" desc="ID of the rule that matched." />
                <PropRow name="reason" type="string" desc="Denial message if set in the rule." />
                <PropRow name="masked_fields" type="string[]" desc="Fields redacted in output, if action is mask." />
                <PropRow name="duration_ms" type="number" desc="Milliseconds from intercept to return." />
              </div>
            </div>
          </Section>

          {/* JWT IDENTITY */}
          <Section id="jwt-identity" title="JWT Identity" badge="coming soon" badgeColor="#f59e0b">
            <p style={{ fontSize: 14.5, color: "#3d5473", lineHeight: 1.8, marginBottom: 20 }}>
              Issue each agent a signed JWT passport with scoped tool permissions. Megent validates the token on every call and enforces per-agent rules.
            </p>
            <CodeBlock lang="python" filename="jwt-demo.py" code={`# Issue a scoped passport for a specific agent
token = mgnt.issue_passport(
    agent_id="data-analyst-v2",
    scopes=["get_*", "list_*"],   # only these tools are allowed
    expires_in=3600,               # 1-hour TTL
)

# Agent initializes with its passport
mgnt_agent = megent.init(
    policy="policy.yaml",
    jwt=token,                     # validated on every call
)

@mgnt_agent.guard
def get_transactions(account_id: str):
    ...  # ✓ in passport scopes

@mgnt_agent.guard
def delete_account(account_id: str):
    ...  # ✗ not in passport scopes → MegentDenyError`} />
            <Callout type="warning" title="In development — v0.2.0">
              JWT identity is on the roadmap. The API shown is a preview and may change before release.
            </Callout>
          </Section>

          {/* FOOTER CTA */}
          <div style={{ marginTop: 80, padding: 44, borderRadius: 14, textAlign: "center", background: "linear-gradient(135deg,#0a0826 0%,#07090f 60%)", border: "1px solid #1a1760", boxShadow: "0 0 60px #4f46e514" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 0 28px #4f46e540" }}>
              <span style={{ color: "#fff", fontSize: 20, fontWeight: 800, fontFamily: "Bricolage Grotesque,sans-serif" }}>M</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", fontFamily: "Bricolage Grotesque,sans-serif", letterSpacing: "-0.025em", marginBottom: 10 }}>Ready to control your agents?</h3>
            <p style={{ color: "#253348", fontSize: 14, marginBottom: 28 }}>Open source · MIT licensed · Works with any LLM framework</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button style={{ padding: "10px 24px", borderRadius: 8, background: "#4f46e5", color: "#fff", border: "none", fontWeight: 700, fontSize: 13.5, cursor: "pointer", boxShadow: "0 0 28px #4f46e548" }}>pip install megent</button>
              <button style={{ padding: "10px 24px", borderRadius: 8, background: "transparent", color: "#3d5473", border: "1px solid #161d2b", fontWeight: 500, fontSize: 13.5, cursor: "pointer" }}>View on GitHub →</button>
            </div>
          </div>
        </main>

        {/* RIGHT OUTLINE */}
        <aside style={{ width: 196, flexShrink: 0, position: "sticky", top: 58, height: "calc(100vh - 58px)", padding: "28px 20px", overflowY: "auto", borderLeft: "1px solid #0d1422" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#161d2b", marginBottom: 12 }}>On this page</p>
          {NAV_SECTIONS.flatMap(s => s.items).map(item => (
            <button key={item.id} onClick={() => go(item.id)} style={{
              display: "block", textAlign: "left", padding: "5px 0", fontSize: 12,
              color: active === item.id ? "#a5b4fc" : "#253348",
              background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
              fontWeight: active === item.id ? 600 : 400, transition: "color 0.12s",
            }}>{item.label}</button>
          ))}
        </aside>
      </div>
    </div>
  );
}
