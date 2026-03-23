# SpecVerse Project Memory

## Current State (2026-03-23)

**Self-hosting is complete.** The generated CLI produces byte-for-byte identical output to the hand-written CLI.

### Repos (all on GitHub)
- **specverse-lang** (`feature/wire-entity-modules`): Orchestrator + CLI, 1,752 tests passing
- **specverse-engines** (`main`): 7 engine packages, all building
- **specverse-self** (`main`): Self-spec realization, generated CLI works

### What Self-Hosting Means
817-line self-spec → generates 410-line CLI → that CLI validates/infers/realizes the self-spec → produces 390 files byte-for-byte identical to the hand-written CLI's output.

## TODO

### Near-term
- [ ] Wire AI engine properly (EcosystemPromptManager needs config; currently graceful fallback)
- [ ] Wire cache command to parser engine's ImportResolver
- [ ] Fix 31 failing test files in specverse-engines (stale import paths from extraction)
- [ ] Merge `feature/wire-entity-modules` to main in specverse-lang
- [ ] Publish engine packages to npm (currently `file:` references)
- [ ] Remove duplicated src/ code from specverse-lang (both copies exist)

### Technical Debt
- 690 `: any` usages across specverse-lang src/ (pre-existing)
- `COMPONENT_ENTITY_TYPES` is a hardcoded set (pragmatic — documented)
- Naive pluralization in schema generator
- L3 behavior generation is proof-of-concept (postconditions log, don't verify)

### Future
- Quint → TypeScript guard transpilation (Step 5 from NEXT-STEPS.md)
- Full AI engine with working prompt manager
- Publish engine packages to npm
- Domain expansion — use entity module system in domain model repos

## Architecture (see docs/guides/ for full details)

```
.specly file → [Parser Engine] → AST → [Inference Engine] → Full Architecture → [Realize Engine] → Generated Code
                     ↑                        ↑                                       ↑
              Entity Modules          JSON Rules from           Instance Factories from
              (convention processors)  entity modules            engine packages
```

7 engine packages: types, entities, parser, inference, realize, generators, ai
8 CLI commands: validate, infer, realize, init, gen (diagrams/docs/uml), dev (format/watch/quick), cache, ai (docs/suggest/template)

## User Preferences
- User is "IGM" / Mark — creator/architect of SpecVerse
- Prefers practical demonstrations over theoretical discussion
- Values honest, detailed architectural assessments
- Fix generators not generated output (never hand-edit generated files)
- Schema validation runs twice (before AND after convention processing)

## Key Documents
- `docs/guides/ARCHITECTURE-GUIDE.md` — Full system architecture
- `docs/guides/ADDING-AN-ENTITY-TYPE.md` — 11-step entity creation guide
- `docs/guides/ADDING-AN-ENGINE.md` — Engine package creation guide
- `docs/Entity-Module-Intro/` — Analysis documents (Quint, Lean, Wolfram, VSDD, SDD landscape, etc.)

## Memory Files
- [project_engine-extraction.md](project_engine-extraction.md) — Engine extraction status, self-hosting results, TODO
- [project_self-spec-realization.md](project_self-spec-realization.md) — Self-spec design decisions
- [feedback_fix-generators-not-output.md](feedback_fix-generators-not-output.md) — Always fix generators, never hand-edit output
- [feedback_double-validation.md](feedback_double-validation.md) — Schema validation runs twice
