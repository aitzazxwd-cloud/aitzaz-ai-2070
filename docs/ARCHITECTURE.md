# AITZAZ AI 2070 — Architecture

A modular personal AI operating system. The long-term pipeline:

```
AI BRAIN → AGENTS → TOOLS → COMPUTER CONTROL → MEMORY → VERIFICATION → SECURE AUTONOMY
```

## Core principle

- The **AI Brain** reasons and plans (it can think freely).
- **Agents** and **tools** do the work.
- **Security** separates reasoning from privileged actions: every sensitive or
  irreversible action passes a permission gate and lands in the activity log.
- **Verification** checks the actual result — the system never claims success
  without checking.

## Modules (Phase 1 foundation)

| Path | Module | Status |
|---|---|---|
| `src/lib/agents/` | Agent types + registry (9 agents) | Typed, registry ready |
| `src/lib/tools/` | Tool types + registry (9 tools, permission-tagged) | Typed, registry ready |
| `src/lib/memory/` | Memory types + store contract | Interface only (Phase 4) |
| `src/lib/security/` | Permission + activity log types | Interface only (Phase 7) |
| `src/lib/ai/` | AI provider abstraction | Interface only (Phase 2) |
| `src/app/(app)/` | Command-center sections (15 pages) | UI shell live |

## Adding a new agent (modularity rule)

1. Add an entry to `src/lib/agents/registry.ts`.
2. Implement its logic behind the `AgentDefinition` contract in its phase.
3. The brain routes to it by id — nothing else changes.

## Security rules (locked in from day one)

- API keys live **only** in `.env.local` (server-side) — never in the frontend or repo.
- `safe` tools may run freely; `sensitive` tools ask; `irreversible` tools always
  require explicit approval (`[APPROVE] [REJECT]`).
- Every action is written to the activity log with an outcome.
- The AI reports actual verified results, never assumed success.
