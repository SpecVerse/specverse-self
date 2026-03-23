# CLAUDE.md — specverse-self

## What This Repo Is

SpecVerse self-specification — the language specifying and implementing itself. This is the future production release of SpecVerse (targeting v4.0.0).

## Goal

specverse-self replaces specverse-lang as the production release. The complete toolchain — CLI, engines, VSCode extension, MCP server, templates, examples, tests — generated from the self-specification.

## Structure

```
specverse-self/
├── specs/
│   └── main.specly              # The self-spec (817 lines, 46 models, 4 components, 8 CLI commands)
├── manifests/
│   └── implementation.yaml      # Fastify + Prisma + PostgreSQL + React + Commander.js
├── generated/
│   └── code/                    # Generated output (390+ files)
│       ├── backend/
│       │   ├── src/cli/         # Generated CLI (8 engine-wired commands)
│       │   ├── src/controllers/ # 43 CURED controllers
│       │   ├── src/services/    # 12 relationship services
│       │   ├── src/routes/      # 43 Fastify route handlers
│       │   ├── prisma/          # 43-model Prisma schema
│       │   └── schema/          # SPECVERSE-SCHEMA.json for validation
│       └── frontend/            # React app (types, hooks, components, forms)
├── docs/
│   ├── CURRENT-STATE-AND-PLAN.md  # 8-phase implementation plan
│   └── guides/                    # Architecture, entity, engine guides
├── .claude/memory/                # Project memory for AI assistants
└── package.json
```

## Key Facts

- Self-hosting is PROVEN: generated CLI produces byte-for-byte identical output to hand-written CLI
- 7 engine packages in specverse-engines repo (types, entities, parser, inference, realize, generators, ai)
- Generated CLI: 410 lines vs hand-written 4,407 lines — same functionality
- All engines discovered at runtime via EngineRegistry

## Dependencies

- specverse-lang: the hand-written CLI (orchestrator, to be replaced by this)
- specverse-engines: 7 engine packages (parser, inference, realize, generators, entities, types, ai)

## Commands

```bash
# From generated/code/backend:
npm run cli -- validate ../../../specs/main.specly     # Validate self-spec
npm run cli -- infer ../../../specs/main.specly         # Infer architecture
npm run cli -- realize all <file> -o <dir> -m <manifest>  # Generate code
npm run cli -- gen diagrams ../../../specs/main.specly  # Generate diagrams
npm run cli -- gen docs ../../../specs/main.specly      # Generate documentation
```

## See Also

- docs/CURRENT-STATE-AND-PLAN.md — full gap analysis and 8-phase plan
- docs/guides/ARCHITECTURE-GUIDE.md — how the whole system works
- docs/guides/ADDING-AN-ENTITY-TYPE.md — how to add entity types
- docs/guides/ADDING-AN-ENGINE.md — how to add engines
