# CLAUDE.md — specverse-self

## What This Repo Is

SpecVerse self-specification — the language specifying and implementing itself. This is the production release of SpecVerse (v4.0.0).

## Goal

specverse-self IS specverse. The complete toolchain — CLI, engines, VSCode extension, MCP server, templates, examples — generated from the self-specification.

## Structure

```
specverse-self/
├── specs/
│   └── main.specly              # The self-spec (974 lines, 5 components, 9 CLI commands)
├── manifests/
│   └── implementation.yaml      # Fastify + Prisma + SQLite + React + Commander.js
├── generated/
│   └── code/                    # Generated output (465+ files)
│       ├── backend/
│       │   ├── src/cli/         # Generated CLI (9 commands incl. session)
│       │   ├── src/controllers/ # CURED controllers
│       │   ├── src/services/    # Business logic services with L3 behaviors
│       │   ├── src/routes/      # Fastify route handlers
│       │   ├── src/guards.ts    # 117 runtime guards from Quint specs
│       │   ├── src/main.ts      # Fastify server with auto-wired routes
│       │   ├── prisma/          # Prisma schema (SQLite)
│       │   └── schema/          # SPECVERSE-SCHEMA.json
│       ├── frontend/            # React app (list/detail/form views, sidebar nav)
│       └── tools/
│           ├── vscode-extension/  # 14-command VSCode extension
│           └── specverse-mcp/     # MCP server with spec-driven registry
├── docs/
│   ├── CURRENT-STATE-AND-PLAN.md    # Phase tracker and gap analysis
│   ├── RELEASE-AUDIT-PLAN.md        # v4.0.0 release audit steps
│   ├── RELEASE-AUDIT-ACTIONS.md     # Running action list from audit
│   └── guides/                      # Architecture, entity, engine guides
├── .claude/memory/                  # Project memory (source of truth for all repos)
└── package.json
```

## Self-Spec Components (5)

1. **SpecLanguage** — 27 models: Specification, Component, Model, Controller, Service, Event, View, Deployment, etc.
2. **BuildSystem** — 11 models: EntityModule, ConventionGrammar, InferenceRule, SchemaFragment, etc.
3. **ToolsSupport** — 7 models: VSCodeExtension, ExtensionCommand, MCPServer, MCPTool, etc.
4. **AISupport** — 2 models: AIOrchestrator, AIWorkflow
5. **CLI** — 9 commands: validate, infer, realize, init, gen, dev, cache, ai, session

## Dependencies

- **specverse-engines**: 7 engine packages (types, entities, parser, inference, realize, generators, ai)
- **specverse-lang**: CLI orchestrator only (being replaced by this repo's generated CLI)

## Commands

```bash
# Using the generated CLI (via npx tsx):
CLI="npx tsx generated/code/backend/src/cli/index.ts"

$CLI validate specs/main.specly
$CLI infer specs/main.specly -o inferred.specly
$CLI realize all specs/main.specly -o generated/code -m manifests/implementation.yaml
$CLI gen diagrams specs/main.specly
$CLI gen docs specs/main.specly
$CLI gen uml specs/main.specly
$CLI dev quick specs/main.specly
$CLI ai docs specs/main.specly
$CLI ai suggest specs/main.specly
$CLI session create --name "test"
$CLI init my-project
$CLI cache --stats
```

## Key Principles

- Fix generators, never hand-edit generated output
- Fix root causes, don't hack around problems
- Schema validation runs twice (before AND after convention processing)
- Adding a new entity type requires only 3 changes (module, schema property, bootstrap)
- All engine code lives in specverse-engines, not here

## See Also

- docs/README.md — documentation index
- docs/SPECVERSE-GUIDE.md — complete user guide (1,200 lines)
- docs/GOLDEN-RULES.md — 27 guiding principles
- docs/introduction/SPECVERSE-INTRODUCTION-V5.md — philosophy and ecosystem
- docs/guides/ — architecture, entity types, engines
- docs/plans/ — dated implementation plans
- docs/landscape/ — external technology analysis
- docs/proposals/ — design proposals
