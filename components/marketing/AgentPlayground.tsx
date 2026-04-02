// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   Clock3,
//   Copy,
//   Database,
//   Edit3,
//   Loader2,
//   Mail,
//   RefreshCw
// } from "lucide-react";

// type VisaTool = {
//   name: "read_db" | "write_db" | "edit_db" | "send_email";
//   label: string;
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   defaultDuration: number;
//   effects: string[];
// };

// type ToolState = VisaTool & {
//   active: boolean;
//   remaining: number;
// };

// type ViewMode = "preview" | "code";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: string;
// };

// const VISA_LIBRARY: VisaTool[] = [
//   {
//     name: "read_db",
//     label: "Read DB",
//     icon: Database,
//     defaultDuration: 120,
//     effects: ["audit", "mask"]
//   },
//   {
//     name: "write_db",
//     label: "Write DB",
//     icon: RefreshCw,
//     defaultDuration: 90,
//     effects: ["transaction", "mask"]
//   },
//   {
//     name: "edit_db",
//     label: "Edit DB",
//     icon: Edit3,
//     defaultDuration: 75,
//     effects: ["update", "approval"]
//   },
//   {
//     name: "send_email",
//     label: "Send Email",
//     icon: Mail,
//     defaultDuration: 60,
//     effects: ["pii_mask", "outbound"]
//   }
// ];

// const RUNTIME_POLICY = {
//   version: "1",
//   defaultAction: "deny",
//   maskFields: ["email", "phone", "ssn"]
// };

// const randomId = () => Math.random().toString(36).slice(2, 9);
// const formatSeconds = (value: number) => {
//   const minutes = Math.floor(value / 60);
//   const seconds = value % 60;
//   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
// };

// export default function AgentPlayground() {
//   const [mode, setMode] = useState<(typeof MODES)[number]>("read_data");
//   const [voice, setVoice] = useState<(typeof VOICES)[number]>("Nova");
//   const [input, setInput] = useState("How do we share the latest payout info with Alice without leaking PII?");
//   const [response, setResponse] = useState<DemoReply>(DEMO_REPLIES[0]);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!input.trim() || isGenerating) return;

//     setIsGenerating(true);
//     const next = DEMO_REPLIES[Math.floor(Math.random() * DEMO_REPLIES.length)];

//     setTimeout(() => {
//       const assistantMessage: Message = {
//         id: `assistant-${randomId()}`,
//         role: "assistant",
//         content: `visas ${toolSummary} · masks ${maskSummary} · task "${demoPrompt}"`,
//         timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
//       };
//       setMessages((prev) => [...prev, assistantMessage]);
//       setIsReplying(false);
//     }, 900);
//   };

//   return (
//     <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-10">
//       <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
//         <div className="relative overflow-hidden rounded-[36px] bg-white p-6 text-slate-900 shadow-[0_45px_90px_-60px_rgba(15,23,42,0.85)] sm:p-8">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <p className="text-base font-semibold text-slate-700">Chat with Agent</p>
//               <p className="text-xs text-slate-400">Simple demo flow</p>
//             </div>
//             <div className="text-xs text-slate-500">
//               <span className="rounded-full bg-slate-100 px-3 py-1">Demo mode</span>
//             </div>
//           </div>

//           <div className="mt-4 max-h-60 space-y-3 overflow-y-auto pr-1">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex gap-3 ${message.role === "assistant" ? "" : "flex-row-reverse"}`}
//               >
//                 <div
//                   className={`flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-semibold ${
//                     message.role === "assistant" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
//                   }`}
//                 >
//                   {message.role === "assistant" ? "M" : "You"}
//                 </div>
//                 <div
//                   className={`flex-1 rounded-3xl border px-4 py-3 text-sm leading-relaxed shadow-[0_20px_45px_-35px_rgba(15,23,42,0.9)] ${
//                     message.role === "assistant"
//                       ? "border-slate-900/30 bg-slate-900 text-white"
//                       : "border-slate-200 bg-slate-50"
//                   }`}
//                 >
//                   <p>{message.content}</p>
//                   <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
//                     <Clock3 className="h-3 w-3" />
//                     {message.timestamp}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
//             <p className="text-sm text-slate-600">Demo mode uses a fixed prompt like a real chatbot workflow.</p>
//             <button
//               type="button"
//               onClick={handleRunDemo}
//               disabled={isReplying}
//               className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
//             >
//               {isReplying ? (
//                 <span className="inline-flex items-center gap-2">
//                   <Loader2 className="h-4 w-4 animate-spin" /> Waiting response
//                 </span>
//               ) : (
//                 "Run demo"
//               )}
//             </button>
//           </div>

//           <div className="mt-6">
//             <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-slate-400">
//               <span>Visa tools</span>
//               <span>- 2 min +</span>
//             </div>
//             <div className="mt-3 grid gap-3 sm:grid-cols-2">
//               {tools.map((tool) => (
//                 <button
//                   key={tool.name}
//                   type="button"
//                   onClick={() => toggleTool(tool.name)}
//                   className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
//                     tool.active ? "border-emerald-400/50 bg-emerald-50" : "border-slate-200 bg-white"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <tool.icon className={`h-5 w-5 ${tool.active ? "text-emerald-500" : "text-slate-400"}`} />
//                     <div>
//                       <p className="font-medium text-slate-800">{tool.label}</p>
//                       <p className="text-xs text-slate-500">
//                         {tool.active ? formatSeconds(tool.remaining) : "issue visa"}
//                       </p>
//                     </div>
//                   </div>
//                   <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
//                     {tool.active ? "Stop" : "Issue"}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="rounded-[36px] border border-white/5 bg-slate-950 p-6 text-slate-100 shadow-[0_45px_90px_-60px_rgba(15,23,42,0.9)] sm:p-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">policy.yaml</p>
//               <p className="text-xs text-slate-500">Megent AI runtime policy</p>
//             </div>
//             <div className="inline-flex rounded-full border border-white/10 p-1 text-xs">
//               {(["preview", "code"] as ViewMode[]).map((mode) => (
//                 <button
//                   key={mode}
//                   type="button"
//                   onClick={() => setViewMode(mode)}
//                   className={`rounded-full px-3 py-1 transition ${
//                     viewMode === mode ? "bg-white text-slate-900" : "text-slate-400"
//                   }`}
//                 >
//                   {mode}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {viewMode === "code" ? (
//             <div className="mt-4">
//               <div className="flex items-center justify-between text-xs text-slate-500">
//                 <span>runtime yaml</span>
//                 <button
//                   type="button"
//                   onClick={handleCopyYaml}
//                   className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-slate-300"
//                 >
//                   <Copy className="h-3.5 w-3.5" /> {copiedYaml ? "copied" : "copy"}
//                 </button>
//               </div>
//               <pre className="mt-3 rounded-3xl border border-white/10 bg-black/60 p-4 text-[12px] leading-relaxed text-slate-200">
//                 <code>{policyYaml}</code>
//               </pre>
//             </div>
//           ) : (
//             <div className="mt-6 space-y-4 text-sm text-slate-300">
//               <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5">
//                 <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Flow tracker</p>
//                 <p className="mt-1 text-sm text-white/70">Exact order for this run.</p>
//                 <div className="mt-4 space-y-3">
//                   {previewFlow.map((step, index) => (
//                     <div key={step.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
//                       <span className="text-[12px] font-medium text-white">{index + 1}. {step.title}</span>
//                       <span
//                         className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
//                           step.state === "done"
//                             ? "bg-emerald-500/20 text-emerald-300"
//                             : step.state === "active"
//                               ? "bg-sky-500/20 text-sky-300"
//                               : "bg-white/10 text-white/50"
//                         }`}
//                       >
//                         {step.state}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-5">
//                 <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Request summary</p>
//                 <div className="mt-3 space-y-2 text-[13px] text-slate-100">
//                   <div>
//                     <span className="text-white/50">Task:</span> {requestedTask}
//                   </div>
//                   <div>
//                     <span className="text-white/50">Visas:</span> {activeToolSummary}
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-3xl border border-amber-300/20 bg-amber-300/5 p-5">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs uppercase tracking-[0.35em] text-amber-200">Demo response</p>
//                   <span className="rounded-full border border-amber-200/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-200">
//                     Demo
//                   </span>
//                 </div>
//                 <div className="mt-3 rounded-2xl border border-amber-100/20 bg-black/20 px-3 py-2 text-sm text-amber-50">
//                   {isReplying
//                     ? "Waiting response from assistant..."
//                     : lastAssistantMessage?.content || "Press Run demo to simulate assistant response."}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }