# AITZAZ AI 2070 — Personal AI Operating System

A futuristic personal AI OS: an **AI brain** that understands goals, plans
multi-step tasks, uses **specialized agents** and **tools**, controls the
computer **with permission**, remembers context, **verifies its work** and
provides a premium command-center experience.

> Built phase by phase. See `docs/ROADMAP.md` and `docs/ARCHITECTURE.md`.

## Quick start (Phase 1)

```bash
# 1. Requirements
node --version        # needs v18.18+ (v22 recommended)
npm --version
df -h                # make sure you have ~2GB free

# 2. Install
npm install

# 3. Run
npm run dev
```

Open http://localhost:3000 — you land on the Command Center dashboard.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (hot reload) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint (wired in a later phase) |

## Environment

Copy `.env.example` → `.env.local` and fill in real values. Secrets are
**server-side only** and never committed.

## Project layout

```text
src/
├── app/(app)/          # 15 command-center sections (dashboard, assistant, agents, …)
├── components/shell/   # sidebar, top bar, section layout
└── lib/
    ├── agents/         # agent types + registry
    ├── tools/          # tool types + registry (permission-tagged)
    ├── memory/         # memory contract (Phase 4)
    ├── security/       # permission + activity log contract (Phase 7)
    └── ai/             # swappable AI provider abstraction (Phase 2)
docs/                   # architecture + roadmap
```

## Phase 2 — Real AI Brain (live chat)

The AI Assistant now calls a real server-side AI provider through a clean
abstraction. To make chat actually respond:

1. Create your env file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and set ONE provider:
   - `AI_PROVIDER=openai` + `OPENAI_API_KEY=sk-...`
   - or `AI_PROVIDER=anthropic` + `ANTHROPIC_API_KEY=...`
   - or `AI_PROVIDER=custom` + `CUSTOM_AI_BASE_URL=...` (local models)
3. Restart the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000/assistant and chat.

Check configuration anytime: http://localhost:3000/api/status

Without a key, the chat shows an honest "not configured" message — nothing is faked.
