export const FAQS = [
  {
    q: "Does Megent work with LangChain, CrewAI, and OpenAI Agents?",
    a: "Yes - Megent works at the tool call layer, which is framework-agnostic. We have tested integrations for LangChain, LangGraph, CrewAI, OpenAI Agents SDK, and AutoGen. If your framework supports tool calling, Megent supports it. Bring your own framework.",
  },
  {
    q: "How much latency does interception actually add?",
    a: "Under 1ms for policy evaluation. Megent runs in-process - there's no network call, no external API, no proxy. The overhead is negligible compared to the actual LLM call, which takes hundreds of milliseconds. In production, you won't notice it.",
  },
  {
    q: "Is the core runtime really free? What's the business model?",
    a: "The core - interception, policy evaluation, PII masking, audit logging - is MIT licensed and free forever. Enterprise features like a centralized dashboard, SSO, managed rulesets, and SLA-backed support will eventually be commercial. We'll be honest about what's changing and when. The core stays free.",
  },
  {
    q: "Does Megent send any data to your servers?",
    a: "No. The current version is entirely self-hosted. Your tool calls, your policies, your audit logs - all of it stays in your infrastructure. We have zero visibility into your agent behavior. No telemetry, no phone-home, no analytics.",
  },
  {
    q: "Can I use Megent to control agents I didn't write?",
    a: "Yes - this is one of the core use cases. Wrap any third-party agent with Megent's guard decorator and point it at a policy file. It enforces your rules regardless of what the agent does internally. You get control without needing access to the agent's source code.",
  },
  {
    q: "What Python version do you support?",
    a: "Python 3.9 and above. We test against 3.9, 3.10, 3.11, and 3.12. Full async support (asyncio, async/await) is included from day one. TypeScript and Node.js support is on the roadmap.",
  },
  {
    q: "We're an early-stage startup. Can we get help getting set up?",
    a: "Email us at hello@megent.dev. We're a founder-stage team and we want to help early-stage companies get this right. The core is free, and we're happy to jump on a call. No sales process - just founders talking to founders.",
  },
];
