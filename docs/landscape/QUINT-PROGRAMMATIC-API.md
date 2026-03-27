# Quint Programmatic API Assessment

**Date**: 17 March 2026
**Purpose**: Determine whether Quint's simulator/evaluator can be used programmatically from TypeScript, and recommend the integration approach for SpecVerse.

---

## Finding: Quint Exposes Its Simulator as TypeScript — But Not as Public API

The `@informalsystems/quint` npm package (v0.29.1) is written entirely in TypeScript and contains a full evaluator/simulator. However, only the parser and IR types are exported publicly.

### What's Inside the Package

| Module | What It Does | Exported from index.ts? |
|--------|-------------|------------------------|
| **`runtime/impl/evaluator.ts`** | Core `Evaluator` class — executes expressions, runs simulations, runs tests | **No** |
| **`simulation.ts`** | `SimulatorOptions`, `Outcome`, `SimulationTrace` interfaces | **No** |
| **`parsing/quintParserFrontend`** | Parser — source code → IR | **Yes** |
| **`ir/quintIr`** | IR types (`QuintEx`, `QuintModule`, etc.) | **Yes** |
| **`ir/quintTypes`** | Type definitions for the IR | **Yes** |
| **`ir/IRVisitor`** | Visitor pattern for walking IR trees | **Yes** |
| **`ir/IRFinder`** | Find expressions/types/definitions by ID | **Yes** |
| **`quintAnalyzer`** | Type checking, effect analysis | **Yes** |
| **`names/base`** | `LookupTable` for name resolution | **Yes** |
| **`errorTree`** | Error reporting types | **Yes** |
| **`idGenerator`** | `IdGenerator` for IR node IDs | **Yes** |

### The Evaluator (Internal, Not Exported)

The `Evaluator` class in `runtime/impl/evaluator.ts` is the core runtime:

- **Inputs**: Parsed Quint IR (AST nodes), lookup table for name resolution, RNG, config (max steps, max samples)
- **Core operations**:
  - `evaluate()` — executes single Quint expressions
  - `simulate()` — runs multiple randomised traces through init→step→invariant cycles
  - `test()` — executes test definitions repeatedly until failure
  - `shift()` — transitions context from current to next state
- **Returns**: `Either<QuintError, RuntimeValue>` — proper functional error handling
- **Features**: Progress bars, early exit for deterministic tests, witness tracking, error trace collection

### The Simulation Layer (Internal, Not Exported)

`simulation.ts` defines:

- `SimulatorOptions` — config object with init/step/invariant strings, execution limits, RNG
- `SimulationTrace` — sequence of states from a simulation run
- `Outcome` — status (ok/violation/error), error traces, statistics, violated invariant indices
- `TraceStatistics` — sample count, trace lengths (min/max/average)

---

## Integration Options for SpecVerse

### Option 1: Build-Time Transpilation (Recommended)

```
Quint spec (.qnt)
  → parse with Quint parser (public export)
  → walk IR with IRVisitor (public export)
  → generate TypeScript guard functions
  → app-demo uses generated guards at runtime
```

**Why this is the SpecVerse way:**

This follows the exact pattern already established:

```
.specly (structural spec)  → convention processor → TypeScript/Prisma/Express
.qnt   (behavioural spec)  → Quint IR walker     → TypeScript guard functions
```

The Quint parser and IR types are stable public exports. We parse the `.qnt` file, extract invariants and transition guards from the IR, and generate runtime predicates. The generated guards are plain TypeScript — no Quint runtime dependency needed. App-demo just imports and calls them like any other generated code.

**Advantages:**
- No runtime Quint dependency
- Generated guards are fast (plain JS functions)
- Fits the spec→generate→execute pattern
- Uses only public, stable Quint exports
- Convention layer works naturally: human-readable invariants → Quint syntax → Quint parser validates → generator transpiles to runtime guards

**The pipeline in app-demo context:**

```
1. Author writes .specly (structural) + .qnt (behavioural)
2. Convention processor expands both
3. Quint parser validates .qnt syntax
4. IR walker extracts invariants and guards
5. Generator produces TypeScript predicates
6. app-demo loads predicates alongside parsed spec
7. Before lifecycle transitions: check guard predicate
8. After state changes: check invariant predicates
9. Violations surfaced in real-time via WebSocket
```

### Option 2: Shell Out to `quint run`

```
app-demo → child_process.exec('quint run --invariant=X spec.qnt')
```

**Advantages:** Simple, uses Quint's full simulator
**Disadvantages:** Requires Quint CLI installed, adds latency, not suitable for real-time guard evaluation. Better for batch verification than runtime checks.

### Option 3: Deep Import the Evaluator

```typescript
import { Evaluator } from '@informalsystems/quint/dist/runtime/impl/evaluator'
```

**Advantages:** Full Quint simulation capabilities at runtime
**Disadvantages:** Fragile — breaks on any internal refactor. Undocumented. Could be viable if Informal Systems adds the evaluator to their public exports (worth filing an issue/PR).

---

## Recommendation

**Option 1 (build-time transpilation) is the clear winner.** It:

1. Follows SpecVerse's established pattern (spec → generate → execute)
2. Uses only stable, public Quint exports (parser, IR, visitor, analyser)
3. Produces zero runtime dependencies on Quint
4. Enables real-time invariant checking in app-demo without latency
5. Makes the convention layer work naturally — human-readable invariants → Quint → TypeScript guards

Option 2 (shell out) is a useful complement for **verification** (running full model checking via `quint verify`), but not for **runtime interpretation**.

Option 3 should be tracked as a future opportunity — if Quint exports the evaluator publicly, it would enable richer runtime simulation. Worth filing an issue with Informal Systems.

---

## How This Fits the Entity Module Architecture

In the 8-facet entity module structure:

```
entities/models/
  ├── conventions.yaml       ← structural conventions
  ├── schema.json            ← structural schema
  ├── inference-rules/       ← structural inference
  ├── behaviour.qnt          ← behavioural spec (Quint)
  ├── behaviour-conventions/ ← behavioural conventions
  ├── generators/
  │   ├── prisma.ts          ← structural generator
  │   └── guards.ts          ← behavioural generator (Quint IR → TS predicates)
  ├── docs/
  └── tests/
```

The **behavioural generator** (`guards.ts`) would:
1. Parse `behaviour.qnt` using `@informalsystems/quint` parser
2. Walk the IR with `IRVisitor` to find invariants and action guards
3. Generate TypeScript predicate functions
4. Export them for use by app-demo's runtime engines

This keeps the Quint dependency at **build time only** — the generated output is plain TypeScript.

---

## Key Quint Public API Surface (for implementation reference)

```typescript
// Parsing
import { parse } from '@informalsystems/quint'
// Returns: { modules: QuintModule[], table: LookupTable, ... }

// IR Types
import { QuintEx, QuintModule, QuintDef } from '@informalsystems/quint'

// IR Walking
import { IRVisitor, walkModule } from '@informalsystems/quint'

// Analysis
import { quintAnalyzer } from '@informalsystems/quint'

// Name Resolution
import { LookupTable } from '@informalsystems/quint'

// ID Generation
import { newIdGenerator } from '@informalsystems/quint'
```

These are the building blocks for the build-time transpilation approach. The visitor pattern (`IRVisitor`) is particularly important — it lets us walk the parsed Quint IR and extract exactly the invariants and guards we need.

---

## Sources

- [Quint GitHub Repository](https://github.com/informalsystems/quint)
- [@informalsystems/quint on npm](https://www.npmjs.com/package/@informalsystems/quint)
- [Quint Connect — Model-based testing framework](https://github.com/informalsystems/quint-connect)
- [Quint Official Site](https://quint-lang.org/)
