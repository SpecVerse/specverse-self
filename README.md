# SpecVerse v4.0.0

**Define Once, Implement Anywhere.**

SpecVerse is a declarative specification language for defining business domains, models, and systems. Write a `.specly` specification, and the engine generates the complete application — backend, frontend, CLI, documentation, diagrams, and tools.

This repository is the **self-specification** — SpecVerse specifying and implementing itself. It is the production release.

## How It Works

```
974-line self-spec  -->  [7 engine packages]  -->  465+ generated files
                                                    ├── Fastify REST API
                                                    ├── Prisma + SQLite
                                                    ├── React frontend
                                                    ├── 9-command CLI
                                                    ├── VSCode extension
                                                    ├── MCP server
                                                    └── 12+ Mermaid diagrams
```

## Engine Packages

All published to npm at v4.0.0:

| Package | Purpose |
|---------|---------|
| `@specverse/types` | AST types, engine interfaces |
| `@specverse/engine-entities` | Entity modules (10 types, 9 facets), compose scripts |
| `@specverse/engine-parser` | YAML + Conventions parser |
| `@specverse/engine-inference` | Architecture generation from minimal specs |
| `@specverse/engine-realize` | Code generation via instance factories |
| `@specverse/engine-generators` | Diagrams, documentation, UML |
| `@specverse/engine-ai` | AI prompts, LLM providers, orchestration |

## Quick Start

```bash
# Install
npm install @specverse/engine-parser @specverse/engine-inference @specverse/engine-realize

# Or use the CLI
npx @specverse/lang validate my-app.specly
npx @specverse/lang infer my-app.specly
npx @specverse/lang realize all my-app.specly -o generated/ -m manifest.yaml
```

## Repository Structure

```
specverse-self/
├── specs/
│   └── main.specly              # The self-specification (974 lines, 5 components)
├── manifests/
│   └── implementation.yaml      # Fastify + Prisma + SQLite + React + Commander.js
├── generated/
│   └── code/                    # Generated output (465+ files)
│       ├── backend/             # Fastify server, Prisma ORM, CLI
│       └── frontend/            # React app with CURVED views
├── examples/                    # 54 composed examples from entity modules
├── documentation/               # Doc generation pipeline
├── scripts/
│   ├── compose-examples.mjs     # Compose examples from entity modules
│   └── indexing/                # Cross-repo content comparison tools
└── docs/
    ├── GOLDEN-RULES.md          # 27 permanent guiding principles
    ├── guides/                  # Architecture, entity, engine guides
    └── RELEASE-AUDIT-ACTIONS.md # 53 audit items, all resolved
```

## Self-Specification Components

| Component | Models | Purpose |
|-----------|-------:|---------|
| SpecLanguage | 27 | The language itself — Specification, Component, Model, Controller, Service, Event, View, Deployment |
| BuildSystem | 11 | Entity modules, convention grammars, inference rules, schema fragments |
| ToolsSupport | 7 | VSCode extension, MCP server |
| AISupport | 2 | AI orchestrator, workflows |
| CLI | 9 commands | validate, infer, realize, init, gen, dev, cache, ai, session |

## CURVED Operations

SpecVerse uses CURVED, not CRUD:

- **C**reate — instantiate a new entity
- **U**pdate — modify existing entity
- **R**etrieve — fetch one or many
- **V**alidate — check business rules and constraints
- **E**volve — lifecycle state transitions
- **D**elete — remove (soft or hard)

## Key Principles

See [GOLDEN-RULES.md](docs/GOLDEN-RULES.md) for the full 27 rules. Highlights:

- **R8**: Fix generators, never hand-edit generated output
- **R11**: Let engines handle their own initialization
- **R12**: Adding an entity type = 3 changes only
- **R18**: No version numbers in code identifiers
- **R24**: CURVED not CRUD
- **R25**: Engines live in specverse-engines, CLI orchestration separate

## Related Repositories

| Repo | Purpose |
|------|---------|
| [specverse-engines](https://github.com/SpecVerse/specverse-engines) | 7 engine packages (source of truth for all engine code) |
| [specverse-lang](https://github.com/SpecVerse/specverse-lang) | Legacy hand-written CLI (v3.5.3, superseded by this repo) |
| [specverse-lang-doc](https://github.com/SpecVerse/specverse-lang-doc) | Docusaurus documentation site |
| [specverse-demo-self](https://github.com/SpecVerse/specverse-demo-self) | 4-phase proof cycle |

## License

MIT
