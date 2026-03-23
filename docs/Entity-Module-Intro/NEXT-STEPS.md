# Next Steps — Post Entity Module Architecture

Phases A-E are complete. All 9 entity modules have the full 8-facet structure, Quint behavioural specs typecheck, and behavioural convention grammars expand human intent into Quint invariants.

This document captures what comes next.

---

## Immediate: Wire It Up

### 1. ~~Wire entity modules into the actual build~~ ✅ COMPLETE

Entity modules are now the source of truth. Build-time composition wires them into the runtime:

- **Inference rules**: Entity module JSON files composed into `dist/` via `compose-inference-rules.cjs`. Old `src/inference-engine/rules/` removed.
- **Schema**: Per-entity schema fragments composed into `schema/SPECVERSE-SCHEMA.json` via `compose-schema.cjs`. 13 fragments, 59 `$defs`.
- **Convention processors**: `ConventionProcessor` discovers processors from entity registry at runtime via `bootstrapEntityModules()`.
- **Diagram plugins**: CLI uses `createPluginsFromRegistry()` to discover plugins from entity module declarations.
- **Generators**: Already manifest-driven, entity module declarations verified.

All 2,431 tests pass. `npm pack` succeeds. Commits: `ed7ec46`, `9f98cc2`.

### 2. ~~`quint verify` — Prove invariants hold~~ ✅ COMPLETE

Verification modules created for models (9 invariants), controllers (5), and services (7). Apalache model checking proves all 21 invariants hold. Added `npm run test:quint:verify`. Commit: `9b380bc`.

### 3. ~~`quint test` — Model-based testing~~ ✅ COMPLETE

Test modules created for models (6 tests), controllers (5), and services (5). Simulation-based tests exercise state machines and verify rule application. Added `npm run test:quint:test`. Commit: `a4aa539`.

---

## Medium-Term: The Convention Engine

### 4. ~~Wire BehaviouralConventionProcessor into the convention engine~~ ✅ COMPLETE

Users can now write `constraints:` in `.specly` files. The convention engine expands human-readable constraints into typed Quint invariants at parse time, matching against 52 grammar patterns across 9 entity modules. 6 new parser tests. Commit: `43112fc`.

### 5. Quint → TypeScript guard transpilation

From the QUINT-PROGRAMMATIC-API analysis: parse `.qnt` with the `@informalsystems/quint` public API, walk the IR, generate TypeScript guard functions. No runtime Quint dependency needed.

**What this enables:**
- Each entity's `generators/guards.ts` transpiles `behaviour/*.qnt` → TypeScript predicates
- Runtime validation using the same invariants defined in Quint
- Guards can be used in services, controllers, and middleware

**Approach (from analysis):**
1. Parse `.qnt` files with the public parser API
2. Walk the IR using `IRVisitor`
3. Generate TypeScript predicate functions
4. No runtime Quint dependency — build-time only

---

## Broader: Platform & Ecosystem

### 6. Phase 3.4 — Validate MCP server + AI orchestrator

The MCP server (v3.5.1) and AI orchestrator (v3.3.0) already exist in `tools/`. Validate them against the entity module system.

**Key questions:**
- Can the MCP server discover and serve entity module metadata?
- Can the AI orchestrator use entity module structure for better inference?
- What needs to change to make them entity-module-aware?

### 7. Phase 4 — Domain expansion, SDD integration, community

Four parallel tracks:

1. **Domain expansion** — Use the entity module system in domain model repos (retail-commerce, company-model). Exercise the extension mechanism with real domain-specific entities.

2. **Meta-specification platform** — Build the registry for distributing extension entities as npm packages (`@specverse/entity-*`). Test the `npm install → auto-discover → build` workflow.

3. **SDD tool integration** — Position SpecVerse as the specification engine beneath SDD workflow tools (OpenSpec, Spec Kit, GSD). Build adapter layers.

4. **Community** — Documentation site updates, contribution guides for extension entities, showcase the behavioural convention system.

---

## Reference

| Phase | Status | Commit |
|-------|--------|--------|
| Phase A: Prove pattern (models) | Complete | `792f25d` |
| Phase B: Extract core entities | Complete | `98ebb81` |
| Phase C: Extension entities | Complete | `e829e5b` |
| Phase D: Quint behavioural specs | Complete | `d6a0e95` |
| Phase D: Typecheck tests | Complete | `5f7ed61` |
| Phase E: Behavioural conventions | Complete | `4ebc133` |
| CI fixes (TS, ajv, security) | Complete | `345c188` |

**Key files:**
- Entity modules: `src/entities/`
- Shared types: `src/entities/_shared/behaviour/types.qnt`
- Convention processor: `src/entities/_shared/behaviour/convention-processor.ts`
- Tests: `src/entities/__tests__/behaviour-*.test.ts`
- Architecture doc: `docs/Entity-Module-Intro/ENTITY-MODULE-ARCHITECTURE.md`
