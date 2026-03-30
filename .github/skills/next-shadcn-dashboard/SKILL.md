---
name: next-shadcn-dashboard
shortName: "Next + shadcn dashboard"
description: "Use when: building or updating a Next.js App Router + shadcn dashboard with sidebar tabs (Dashboard/Agents/Guardrail/Logs/Reports), tables, light theme, and interactive button handlers."
---

## When to use
- You need to create or modify the App Router dashboard page with the sidebar nav and tabbed views.
- You are wiring button handlers (Create/Next/Settings) to real actions instead of alerts.
- You are adding or refining guardrail/system-design panels, logs, or reports views that follow the existing data-driven patterns.

## Inputs to gather
- Target page path (default: `app/demo/page.tsx`).
- Desired nav items and which view should be default.
- Real behaviors for Create, Next/pagination, Settings, Downloads (API endpoints, modal, route).
- Data shape for agents table, guardrail components, logs, and reports.

## Workflow
1) **Orient**: Open `app/demo/page.tsx`. Note `nav`, `rows`, `components`, `flowSteps`, `logsData`, `reportsData` and state (`activeNav`, `agentRows`, `page`, `activeComponent`, handlers).
2) **Nav & state**: Keep nav labels/icons aligned. Ensure `activeNav` drives conditional rendering; avoid rendering all sections at once.
3) **Handlers**:
   - `handleCreate`: replace stub with real action (modal, route, API), then update state optimistically.
   - `handleNext`: implement real paging (query or cursor); remove rotation stub when backed by data.
   - `handleSetting`: navigate to settings route or open a panel instead of just switching tabs.
4) **Agents view**: Use shadcn `Card`, `Input`, `Button`, and a table. Keep text colors readable on light theme. Show status pill with semantic colors.
5) **Guardrail view**: Data-driven accordions from `components`. Keep `activeComponent` to toggle details. Preserve request pipeline, outcomes, and performance lists; update copy/metrics as needed.
6) **Logs view**: Render table from `logsData`; add filters/search if provided. Include CTA to reports if relevant.
7) **Reports view**: List report cards with download actions. Replace alerts with real downloads/endpoints.
8) **Right-click blocker (optional)**: `onContextMenu` prevents default and records timestamp; keep or remove per requirement. Drop banner if not wanted.
9) **Styling**: Default light theme, solid white cards, subtle borders/shadows. Avoid AI-ish gradients unless requested. Respect existing class names (tailwind/shadcn).

## Quality checklist
- Nav buttons switch views and highlight correctly.
- Handlers perform real actions (no lingering `alert/console` stubs) or are clearly marked TODO.
- Tables render from state, not static arrays; pagination state updates predictably.
- Guardrail accordions open/close cleanly; no layout shift.
- Logs/Reports actions do not throw and have graceful empty states if data is absent.
- Right-click behavior matches spec (blocked or removed); no console errors in browser.

## Example prompts
- "Update the dashboard to fetch agents from /api/agents and paginate 10 per page."
- "Wire the Create button to open a modal that posts a new agent, then refreshes the table."
- "Replace alert downloads in Reports with real file links and add empty-state messaging."
- "Remove the right-click blocker and simplify the header copy."
