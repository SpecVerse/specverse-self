# SpecVerse Project Memory

## Current State (2026-03-27)

**v4.0.0 RELEASED.** All 7 engine packages published to npm. specverse-self is the production release. L3 behavior generation complete. 44 READMEs. 1,200-line user guide. Ready for first real-world app (ItsTimeToTrade).

### Repos (all on GitHub)
- **specverse-engines** (`main`): 7 engine packages @ 4.0.0, published to npm, 10 entity types
- **specverse-self** (`main`): 974-line self-spec, 9-command generated CLI, v4.0.0, doc pipeline owner
- **specverse-lang** (`main`): Legacy CLI orchestrator @ 3.5.3, published to npm, all content symlinked
- **specverse-demo-self**: 4-phase proof cycle (create, analyse, realize, materialise)
- **specverse-lang-doc**: Docusaurus site, syncs from specverse-self
- **ItsTimeToTrade**: Financial markets trading app — first real-world SpecVerse project (just created)

### Published Packages (npm)
- `@specverse/types@4.0.0` — AST types, engine interfaces
- `@specverse/engine-entities@4.0.0` — Entity modules, registry, compose scripts
- `@specverse/engine-parser@4.0.0` — YAML + Conventions parser
- `@specverse/engine-inference@4.0.0` — Rule-based inference engine, Quint transpiler
- `@specverse/engine-realize@4.0.0` — Code generation from specs, L3 behavior generation
- `@specverse/engine-generators@4.0.0` — Diagrams, docs, UML
- `@specverse/engine-ai@4.0.0` — AI prompts, LLM providers, orchestration, sessions
- `@specverse/lang@3.5.3` — Legacy CLI (final 3.x release)

### What's Proven
- 974-line self-spec → 9-command CLI with session management
- Generated apps run: Fastify + Prisma + SQLite + React (both UUID and Integer IDs)
- All CURVED operations work via API and GUI
- Lifecycle state machines enforced at runtime
- L3 behavior generation: convention patterns (15) + Quint action transpilation + stubs
- 117 Quint guards transpile to TypeScript runtime functions
- 4-phase proof cycle: requirements → spec → code, and code → spec → code
- Cross-repo content indexing: 35 duplicates (down from 379, 91% reduction)

### Documentation
- 44 READMEs across engines, entity modules, factories, AI layers
- 1,200-line SPECVERSE-GUIDE.md (syntax, toolchain, extension, architecture, 3 Mermaid diagrams)
- SPECVERSE-INTRODUCTION-V4.md (868 lines, philosophy)
- L3-BEHAVIOR-GENERATION-PLAN.md (all 3 phases complete)

## TODO

### Next
- ItsTimeToTrade — write .specly spec for financial markets trading app
- First real-world SpecVerse v4.0.0 project proving the full pipeline

### Future work
- Domain expansion — use entity module system in domain model repos
- Lang `docs/` cleanup (7.3MB historical content)

## Architecture (see docs/guides/ for full details)

```
.specly file -> [Parser Engine] -> AST -> [Inference Engine] -> Full Architecture -> [Realize Engine] -> Generated Code
                     ^                        ^                                       ^
              Entity Modules          JSON Rules from           Instance Factories from
              (convention processors)  entity modules            engine packages
```

7 engine packages: types, entities, parser, inference, realize, generators, ai
9 CLI commands: validate, infer, realize, init, gen, dev, cache, ai, session
Entity modules have 9 facets: schema, conventions, behaviour, inference, generators, docs, tests, examples

### Key pipelines
- Examples: entity modules → compose-examples.mjs → specverse-self/examples → generate-diagrams → lang-doc
- Schema: entity module fragments → compose-schema.cjs → SPECVERSE-SCHEMA.json
- Inference rules: entity modules → compose-inference-rules.cjs → rule sets
- L3 behaviors: steps → Quint actions (formal) → convention patterns (15) → stubs (throw)

### Symlinks in specverse-lang (single source of truth)
- `libs/instance-factories/` → specverse-engines realize package
- `examples/` → specverse-self composed output
- `prompts/` → specverse-engines ai package
- `templates/` → specverse-engines realize package

## User Preferences
- User is "IGM" / Mark — creator/architect of SpecVerse
- Prefers practical demonstrations over theoretical discussion
- Values honest, detailed architectural assessments
- Fix generators not generated output (never hand-edit generated files)
- Schema validation runs twice (before AND after convention processing)
- Don't paper over problems with hacks — fix the root cause properly

## Key Documents (specverse-self/docs/)
- `SPECVERSE-GUIDE.md` — Complete user guide (1,200 lines)
- `GOLDEN-RULES.md` — 27 permanent guiding principles
- `introduction/SPECVERSE-INTRODUCTION-V5.md` — Philosophy, ecosystem, proof (944 lines)
- `guides/ARCHITECTURE-GUIDE.md` — Full system architecture
- `guides/ADDING-AN-ENTITY-TYPE.md` — 11-step entity creation guide
- `guides/ADDING-AN-ENGINE.md` — Engine creation guide
- `plans/2026-03-RELEASE-AUDIT-ACTIONS.md` — 53 items, all resolved
- `plans/2026-03-L3-BEHAVIOR-GENERATION-PLAN.md` — L3 plan (all phases complete)
- `landscape/` — Quint, Lean, Wolfram, VSDD, SDD analysis
- `proposals/` — Entity module architecture, meta-specification, dogfood analysis

## Memory Files
- [project_engine-extraction.md](project_engine-extraction.md) — Engine extraction status, self-hosting results
- [project_self-spec-realization.md](project_self-spec-realization.md) — Self-spec design decisions
- [project_source-consolidation.md](project_source-consolidation.md) — specverse-lang depends on engine packages, code quality fixes
- [feedback_fix-generators-not-output.md](feedback_fix-generators-not-output.md) — Always fix generators, never hand-edit output
- [feedback_double-validation.md](feedback_double-validation.md) — Schema validation runs twice
- [feedback_fix-root-cause.md](feedback_fix-root-cause.md) — Don't hack around problems, fix the root cause
