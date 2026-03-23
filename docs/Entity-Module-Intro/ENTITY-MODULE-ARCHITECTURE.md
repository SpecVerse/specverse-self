# Entity Module Architecture: The Build System for SpecVerse's Definition Layer

## How Every Entity Type — Core and Extension — Follows the Same Modular Pattern

---

## Executive Summary

The dogfood analysis revealed that `.specly` needs 3 genuinely new entity types (commands, conventions, measures), ~11 new conventions on existing types, and Quint as the behavioural complement — all following the definition → delivery → distribution extension pocket pattern.

This document answers the next question: **what does the build system look like?**

Every entity type — whether core (models, controllers, services) or extension (commands, conventions, measures) — is a self-contained module with the same 8 facets: convention grammar, schema, inference rules, behavioural spec, behavioural conventions, generators, documentation, and tests. The build system discovers modules, compiles each facet, registers them with the runtime engines, and verifies correctness through model checking and testing.

Adding a new entity type to SpecVerse becomes: create a module directory, implement the facets, the build system does the rest. Core entities ship with specverse-lang. Extension entities distribute through the registry as self-contained packages. The module structure is identical — only the packaging differs.

---

## The 8 Facets of an Entity Module

Every entity type, without exception, has these facets:

### 1. Convention Grammar

**What**: How humans write this entity type using shorthand.

The convention grammar defines the human-readable syntax that the convention processor expands into structured form. This is what makes `.specly` accessible — you write `email: Email required unique verified` instead of spelling out every attribute, constraint, and validation rule.

**Structural conventions** expand into `.specly` definitions:
```yaml
# entities/core/models/conventions/grammar.yaml
conventions:
  Email:
    baseType: String
    implies:
      format: "email"
      validation: "RFC 5322"
    when_modified_by:
      verified: { adds: [verification_token, verified_at] }
      unique: { adds: [unique_index] }
```

**Behavioural conventions** expand into Quint definitions (see facet 5).

**Produces**: Convention processor module that registers with the convention engine.

### 2. Schema

**What**: The formal definition of what this entity type looks like after parsing.

The schema is a JSON Schema document that defines the structure, required fields, allowed values, and relationships of the entity type. The parser validates `.specly` files against these schemas.

```json
// entities/core/models/schema/model.schema.json
{
  "$id": "specverse://entities/model",
  "type": "object",
  "properties": {
    "attributes": {
      "type": "object",
      "additionalProperties": { "$ref": "#/definitions/attribute" }
    },
    "relationships": {
      "type": "object",
      "additionalProperties": { "$ref": "#/definitions/relationship" }
    },
    "lifecycles": {
      "type": "object",
      "additionalProperties": { "$ref": "#/definitions/lifecycle" }
    }
  }
}
```

**Produces**: Validator module + TypeScript type definitions that register with the parser.

### 3. Inference Rules

**What**: What the inference engine does when it encounters this entity type.

Each entity type contributes rules to the inference engine. These rules express patterns like "when a model has a lifecycle, generate a lifecycle management service" or "when a controller has CURED operations, generate standard REST endpoints."

```typescript
// entities/core/models/inference/rules.ts
export const modelInferenceRules: InferenceRule[] = [
  {
    name: "generateLifecycleService",
    when: { entity: "Model", condition: "has lifecycle" },
    then: { generate: "Service", with: { operations: ["transition", "getState", "getHistory"] } },
    priority: 10,
    phase: "logical-inference"
  },
  {
    name: "generateModelController",
    when: { entity: "Model", condition: "exists" },
    then: { generate: "Controller", with: { operations: "CURED" } },
    priority: 20,
    phase: "logical-inference"
  }
];
```

**Produces**: Rule definitions that register with the inference engine.

### 4. Behavioural Specification

**What**: Quint specification of the entity's transformation rules, invariants, and temporal properties.

This is the formal behavioural definition — what rules must hold, what properties must be true, how transformations behave. The Quint spec is the source of truth; the TypeScript inference rules (facet 3) are the implementation that must match.

```
// entities/core/models/behaviour/invariants.qnt
module modelInvariants {

  // Every model must have at least one attribute
  val modelsHaveAttributes = models.forall(m =>
    m.attributes.size() > 0)

  // No orphan models (every model is reachable from a component)
  val noOrphanModels = models.forall(m =>
    components.exists(c => c.models.contains(m)))

  // Lifecycle transitions form a DAG (no cycles)
  val lifecyclesAreDAGs = models.forall(m =>
    m.lifecycles.forall(lc => isDAG(lc.transitions)))
}
```

```
// entities/core/models/behaviour/rules.qnt
module modelRules {

  // When a model has a lifecycle, generate a lifecycle service
  action expandLifecycle = all {
    model.hasLifecycle,
    model' = model.with("services",
      model.services.union(Set(lifecycleService)))
  }

  // Expansion is deterministic — order of rule application doesn't matter
  val expansionIsConfluent = forall(ordering1, ordering2 =>
    applyRules(spec, ordering1) == applyRules(spec, ordering2))

  // Expansion always terminates
  temporal expansionTerminates = eventually(state.isFullyExpanded)
}
```

**Produces**: Verification results via `quint verify` (CI gate) + model-based tests via `quint test`.

### 5. Behavioural Conventions

**What**: Human-readable convention grammars that expand into Quint specifications.

Just as structural conventions make `.specly` accessible, behavioural conventions make Quint accessible. A developer writes `"models must not be orphaned"` and the convention processor expands it into the formal Quint invariant.

```yaml
# entities/core/models/behaviour/conventions/grammar.yaml
conventions:
  must_not_be_orphaned:
    domain: "quint"
    pattern: "{entities} must not be orphaned"
    expands_to: "quint:invariant"
    template:
      name: "noOrphan{Entities}"
      body: "{entities}.forall(e => components.exists(c => c.{entities}.contains(e)))"

  transitions_form_dag:
    domain: "quint"
    pattern: "{entity} transitions form a DAG"
    expands_to: "quint:invariant"
    template:
      name: "{entity}TransitionsAreDAG"
      body: "{entity}.lifecycles.forall(lc => isDAG(lc.transitions))"

  expansion_is_deterministic:
    domain: "quint"
    pattern: "{process} expansion is deterministic"
    expands_to: "quint:invariant"
    template:
      name: "{process}IsConfluent"
      body: "forall(o1, o2 => applyRules(spec, o1) == applyRules(spec, o2))"
```

**Produces**: Behavioural convention processor module that registers with the convention engine alongside structural conventions.

### 6. Generators

**What**: Instance factories that realize this entity type into technology-specific implementations.

Each generator targets a specific technology stack. A model entity might generate Prisma schemas, Express routes, React forms, SQL DDL, etc. Generators are pluggable — new realization targets can be added without modifying the entity module.

```typescript
// entities/core/models/generators/prisma.ts
export const prismaModelGenerator: Generator = {
  target: "prisma",
  canHandle: (entity) => entity.type === "Model",
  generate: (model, context) => ({
    file: `prisma/schema.prisma`,
    content: generatePrismaModel(model, context),
    append: true
  })
};
```

```typescript
// entities/core/models/generators/express.ts
export const expressModelGenerator: Generator = {
  target: "express",
  canHandle: (entity) => entity.type === "Model",
  generate: (model, context) => ({
    file: `src/routes/${model.name.toLowerCase()}.ts`,
    content: generateExpressRoutes(model, context)
  })
};
```

**Produces**: Instance factory modules that register with the `realize` command.

### 7. Documentation

**What**: Reference documentation, syntax guides, and worked examples.

Each entity module contains its own documentation. The doc build system aggregates these into the documentation site (specverse-lang-doc).

```
entities/core/models/docs/
  ├── reference.md          # Complete syntax reference
  ├── conventions.md        # Convention grammar documentation
  ├── inference.md          # What the inference engine does
  ├── behaviour.md          # Quint specs (human-readable summary)
  └── examples/
      ├── basic-model.specly
      ├── model-with-lifecycle.specly
      └── model-with-relationships.specly
```

**Produces**: Documentation pages that publish to the doc site.

### 8. Tests

**What**: Unit tests, integration tests, and model checking runs.

Each entity module has comprehensive tests covering every facet. The test structure mirrors the facets.

```
entities/core/models/tests/
  ├── conventions.test.ts    # Convention parsing + expansion
  ├── schema.test.ts         # Schema validation (valid + invalid inputs)
  ├── inference.test.ts      # Inference rule application
  ├── generators.test.ts     # Generated output correctness
  ├── behaviour.test.ts      # Quint model check runs
  └── integration.test.ts    # End-to-end: convention → parse → infer → realize
```

**Produces**: Test results (CI gate — must pass).

---

## The Module Directory Structure

### Complete Layout

```
specverse-lang/
  entities/
    ├── _registry.ts                    # Entity discovery + registration
    ├── _shared/                        # Shared utilities
    │   ├── types.ts                    # Common type definitions
    │   ├── convention-engine.ts        # Convention processor framework
    │   ├── inference-engine.ts         # Inference rule framework
    │   ├── generator-engine.ts         # Instance factory framework
    │   └── behaviour-engine.ts         # Quint integration framework
    │
    ├── core/                           # Ships with specverse-lang
    │   ├── models/
    │   │   ├── conventions/
    │   │   │   ├── grammar.yaml        # Structural convention definitions
    │   │   │   └── processor.ts        # Convention expansion logic
    │   │   ├── schema/
    │   │   │   ├── model.schema.json   # JSON Schema definition
    │   │   │   └── types.ts            # Generated TypeScript types
    │   │   ├── inference/
    │   │   │   └── rules.ts            # Inference rule definitions
    │   │   ├── behaviour/
    │   │   │   ├── rules.qnt           # Quint transformation specs
    │   │   │   ├── invariants.qnt      # Quint invariants
    │   │   │   └── conventions/
    │   │   │       └── grammar.yaml    # Behavioural convention grammars
    │   │   ├── generators/
    │   │   │   ├── prisma.ts
    │   │   │   ├── express.ts
    │   │   │   └── react.ts
    │   │   ├── docs/
    │   │   │   ├── reference.md
    │   │   │   ├── conventions.md
    │   │   │   └── examples/
    │   │   └── tests/
    │   │       ├── conventions.test.ts
    │   │       ├── schema.test.ts
    │   │       ├── inference.test.ts
    │   │       ├── generators.test.ts
    │   │       ├── behaviour.test.ts
    │   │       └── integration.test.ts
    │   │
    │   ├── controllers/                # Same 8-facet structure
    │   │   ├── conventions/
    │   │   ├── schema/
    │   │   ├── inference/
    │   │   ├── behaviour/
    │   │   ├── generators/
    │   │   ├── docs/
    │   │   └── tests/
    │   │
    │   ├── services/                   # Same structure
    │   ├── events/                     # Same structure
    │   ├── views/                      # Same structure
    │   ├── lifecycles/                 # Same structure
    │   ├── storage/                    # Same structure
    │   ├── deployments/                # Same structure
    │   └── manifests/                  # Same structure
    │
    └── extensions/                     # Definition pocket
        ├── commands/                   # Same 8-facet structure
        │   ├── conventions/
        │   ├── schema/
        │   ├── inference/
        │   ├── behaviour/
        │   ├── generators/
        │   ├── docs/
        │   └── tests/
        │
        ├── conventions/                # Same structure (meta-circular)
        │   ├── conventions/            # Convention grammar for convention grammars
        │   ├── schema/                 # What a convention definition looks like
        │   ├── inference/              # How convention grammars compose
        │   ├── behaviour/              # Quint: expansion is deterministic
        │   ├── generators/             # Generate convention processors
        │   ├── docs/
        │   └── tests/
        │
        └── measures/                   # Same structure
            ├── conventions/
            ├── schema/
            ├── inference/
            ├── behaviour/
            ├── generators/
            ├── docs/
            └── tests/
```

### Core vs Extension — Structurally Identical

| Aspect | Core Entity | Extension Entity |
|--------|------------|-----------------|
| **Module structure** | 8 facets | 8 facets (identical) |
| **Discovery** | `entities/core/` | `entities/extensions/` or `node_modules/@specverse/entity-*` |
| **Ships with** | specverse-lang (always available) | Registry package (opt-in) |
| **Build pipeline** | Same | Same |
| **Registration** | Automatic at build time | Automatic at install time |
| **Promotion** | N/A | Move from `extensions/` to `core/` if proven essential |

An extension entity is just a core entity that hasn't been promoted yet. The build system treats them identically.

---

## The Build Pipeline

### Per-Entity Build

Each entity module goes through the same compilation pipeline:

```
┌─────────────────────────────────────────────────────────┐
│                   ENTITY BUILD PIPELINE                   │
│                   (per entity module)                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1. SCHEMA                                                │
│     model.schema.json                                     │
│         ↓ compile                                         │
│     Validator module + TypeScript types                    │
│         ↓ register                                        │
│     → Parser registry                                     │
│                                                           │
│  2. STRUCTURAL CONVENTIONS                                │
│     conventions/grammar.yaml                              │
│         ↓ compile                                         │
│     Convention processor module                           │
│         ↓ register                                        │
│     → Convention engine                                   │
│                                                           │
│  3. INFERENCE RULES                                       │
│     inference/rules.ts                                    │
│         ↓ compile                                         │
│     Rule definitions                                      │
│         ↓ register                                        │
│     → Inference engine                                    │
│                                                           │
│  4. BEHAVIOURAL CONVENTIONS                               │
│     behaviour/conventions/grammar.yaml                    │
│         ↓ compile                                         │
│     Behavioural convention processor                      │
│         ↓ register                                        │
│     → Convention engine (behavioural domain)              │
│                                                           │
│  5. BEHAVIOURAL SPEC                                      │
│     behaviour/rules.qnt + invariants.qnt                  │
│         ↓ quint typecheck                                 │
│     Type-checked Quint modules                            │
│         ↓ quint verify                                    │
│     Verification results (CI GATE — must pass)            │
│                                                           │
│  6. GENERATORS                                            │
│     generators/*.ts                                       │
│         ↓ compile                                         │
│     Instance factory modules                              │
│         ↓ register                                        │
│     → Realize command                                     │
│                                                           │
│  7. DOCUMENTATION                                         │
│     docs/*.md + docs/examples/                            │
│         ↓ build                                           │
│     Documentation pages                                   │
│         ↓ publish                                         │
│     → Doc site (specverse-lang-doc)                       │
│                                                           │
│  8. TESTS                                                 │
│     tests/*.test.ts                                       │
│         ↓ npm test                                        │
│     Test results (CI GATE — must pass)                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Full Build Orchestration

```
npm run build
│
├── 1. DISCOVER
│   ├── Scan entities/core/*
│   ├── Scan entities/extensions/*
│   ├── Scan node_modules/@specverse/entity-*
│   └── Build entity registry (ordered by dependencies)
│
├── 2. COMPILE (per entity, dependency order)
│   ├── Schema → validator + types
│   ├── Structural conventions → convention processors
│   ├── Inference rules → rule definitions
│   ├── Behavioural conventions → behavioural processors
│   └── Generators → instance factories
│
├── 3. REGISTER
│   ├── All validators → parser registry
│   ├── All convention processors → convention engine
│   ├── All inference rules → inference engine
│   └── All instance factories → realize command
│
├── 4. VERIFY (can run in parallel)
│   ├── quint typecheck (all .qnt files)
│   └── quint verify (all invariants + temporal properties)
│
├── 5. TEST
│   ├── npm test (all .test.ts files)
│   └── quint test (model-based tests against implementation)
│
└── 6. DOCUMENT
    ├── Aggregate docs from all entity modules
    └── Build documentation site
```

### Dependency Order

Entity modules can depend on other entity modules. The build system resolves dependencies:

```yaml
# entities/core/controllers/module.yaml
name: controllers
depends_on: [models, services]     # Controllers reference models and services
```

```yaml
# entities/extensions/measures/module.yaml
name: measures
depends_on: [models]               # Measures aggregate over model fields
```

The build compiles entities in dependency order. Core entities with no dependencies (models) build first. Entities that reference others (controllers, measures) build after their dependencies.

---

## The Module Manifest

Each entity module has a manifest file that declares its facets and metadata:

```yaml
# entities/core/models/module.yaml
name: models
type: core                          # core | extension
version: 3.5.1
depends_on: []                      # No dependencies — foundational entity

facets:
  schema: schema/model.schema.json
  conventions:
    structural: conventions/grammar.yaml
    behavioural: behaviour/conventions/grammar.yaml
  inference: inference/rules.ts
  behaviour:
    rules: behaviour/rules.qnt
    invariants: behaviour/invariants.qnt
  generators:
    - generators/prisma.ts
    - generators/express.ts
    - generators/react.ts
  docs: docs/
  tests: tests/

delivery:                           # How this entity connects to delivery primitives
  parser: true                      # Entity appears in parsed .specly files
  inference: true                   # Entity participates in inference expansion
  realize: true                     # Entity can be realized to implementation
  cli: true                         # Entity has CLI commands (validate, inspect, etc.)
```

```yaml
# entities/extensions/measures/module.yaml
name: measures
type: extension
version: 0.1.0
depends_on: [models]

facets:
  schema: schema/measure.schema.json
  conventions:
    structural: conventions/grammar.yaml
    behavioural: behaviour/conventions/grammar.yaml
  inference: inference/rules.ts
  behaviour:
    rules: behaviour/rules.qnt
    invariants: behaviour/invariants.qnt
  generators:
    - generators/dbt.ts
    - generators/cubejs.ts
    - generators/sql-view.ts
  docs: docs/
  tests: tests/

delivery:
  parser: true
  inference: true
  realize: true
  cli: true

registry:                           # Extension-specific: how to distribute
  package: "@specverse/entity-measures"
  description: "Analytics definitions — aggregations, dimensions, KPIs"
  keywords: [analytics, measures, metrics, kpi, dimensions]
```

The build system reads these manifests to discover facets, resolve dependencies, and orchestrate compilation.

---

## The Meta-Circular Case: conventions/conventions

The `conventions` extension entity is unique because it's self-referential. It defines the grammar for defining grammars:

```
entities/extensions/conventions/
  ├── conventions/                    # How to write convention definitions
  │   └── grammar.yaml               # Convention shorthand for conventions!
  ├── schema/
  │   └── convention.schema.json      # What a convention definition looks like
  ├── inference/
  │   └── rules.ts                    # How convention grammars compose + inherit
  ├── behaviour/
  │   ├── invariants.qnt              # "expansion is deterministic"
  │   │                               # "conventions don't conflict"
  │   │                               # "expansion is total (every input produces output)"
  │   └── conventions/
  │       └── grammar.yaml            # Behavioural conventions for convention invariants
  ├── generators/
  │   └── processor.ts                # Generates convention processor code from grammar
  ├── docs/
  └── tests/
```

The schema defines what a convention grammar looks like:

```json
// entities/extensions/conventions/schema/convention.schema.json
{
  "$id": "specverse://entities/convention",
  "type": "object",
  "properties": {
    "baseType": { "type": "string" },
    "implies": { "type": "object" },
    "when_modified_by": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "adds": { "type": "array", "items": { "type": "string" } }
        }
      }
    },
    "domain": {
      "type": "string",
      "enum": ["specly", "quint"],
      "default": "specly"
    },
    "pattern": { "type": "string" },
    "expands_to": { "type": "string" },
    "template": { "type": "object" }
  }
}
```

The inference rules define how convention grammars compose:

```typescript
// entities/extensions/conventions/inference/rules.ts
export const conventionInferenceRules: InferenceRule[] = [
  {
    name: "inheritBaseTypeConventions",
    when: { entity: "Convention", condition: "has baseType" },
    then: { action: "inherit conventions from baseType" },
    priority: 5,
    phase: "convention-expansion"
  },
  {
    name: "registerWithDomain",
    when: { entity: "Convention", condition: "has domain" },
    then: { action: "register with appropriate convention engine (specly or quint)" },
    priority: 10,
    phase: "convention-registration"
  }
];
```

The Quint invariants prove that convention expansion is well-behaved:

```
// entities/extensions/conventions/behaviour/invariants.qnt
module conventionInvariants {

  // Convention expansion is deterministic
  val expansionIsDeterministic = conventions.forall(c =>
    forall(input1, input2 =>
      input1 == input2 implies c.expand(input1) == c.expand(input2)))

  // No two conventions conflict (produce contradictory outputs for same input)
  val noConflictingConventions = conventions.forall(c1 =>
    conventions.forall(c2 =>
      c1 != c2 and c1.matches(input) and c2.matches(input)
        implies c1.expand(input).compatible(c2.expand(input))))

  // Expansion is total (every valid input produces an output)
  val expansionIsTotal = conventions.forall(c =>
    validInputs.forall(input => c.canExpand(input)))
}
```

This is the meta-specification platform in its most concrete form: a convention entity that specifies how conventions work, using conventions to define its own grammar, with Quint proving its own correctness properties.

---

## Registry Distribution

Extension entities distribute through the registry as self-contained npm packages:

```
@specverse/entity-measures/
  ├── module.yaml                   # Module manifest
  ├── conventions/
  │   ├── grammar.yaml
  │   └── processor.ts
  ├── schema/
  │   ├── measure.schema.json
  │   └── types.ts
  ├── inference/
  │   └── rules.ts
  ├── behaviour/
  │   ├── rules.qnt
  │   ├── invariants.qnt
  │   └── conventions/
  │       └── grammar.yaml
  ├── generators/
  │   ├── dbt.ts
  │   ├── cubejs.ts
  │   └── sql-view.ts
  ├── docs/
  │   ├── reference.md
  │   ├── conventions.md
  │   └── examples/
  ├── tests/
  │   ├── conventions.test.ts
  │   ├── schema.test.ts
  │   ├── inference.test.ts
  │   ├── generators.test.ts
  │   ├── behaviour.test.ts
  │   └── integration.test.ts
  └── package.json
```

### Installation and Discovery

```bash
# Install an extension entity
npm install @specverse/entity-measures

# The build system discovers it automatically
npm run build
# → discovers @specverse/entity-measures in node_modules
# → reads module.yaml
# → compiles all facets
# → registers with parser, convention engine, inference engine, realize command
# → runs quint verify + tests
```

From the build system's perspective, an installed extension is identical to a core entity. The discovery path differs (`node_modules/` vs `entities/core/`), but the compilation pipeline is the same.

### Publishing

```bash
# Develop a new entity type
mkdir entities/extensions/workflows/
# ... implement 8 facets ...

# Test locally
npm run build && npm test

# Publish to registry
cd entities/extensions/workflows/
npm publish --registry https://registry.specverse.dev
```

---

## Cross-Entity Interactions

Entity modules don't operate in isolation. The build system manages interactions:

### Inference Chain

One entity's inference rule may generate another entity. The inference engine processes rules across all registered entities:

```
models inference:     "model with lifecycle → generate lifecycleService (service)"
services inference:   "service with operations → generate serviceController (controller)"
controllers inference: "controller with CURED → generate REST endpoints"
```

The dependency declarations in module manifests ensure correct ordering.

### Convention Composition

Conventions from different entities can compose. A model attribute convention (`Email required unique verified`) may trigger controller inference (generate validation endpoint) and event inference (generate `EmailVerified` event):

```
models convention:      "Email required unique verified" → structured attribute
  → triggers inference: "model has verified field → generate verification event"
events inference:       "verification event → generate EmailVerified event definition"
controllers inference:  "verification event → generate verify endpoint"
```

### Generator Coordination

Multiple generators may contribute to the same output file. The generator engine coordinates:

```
models/generators/prisma.ts       → prisma/schema.prisma (model definitions)
controllers/generators/prisma.ts  → prisma/schema.prisma (index definitions)
storage/generators/prisma.ts      → prisma/schema.prisma (connection config)
```

The manifest for each generator declares its output targets and append/overwrite behaviour.

---

## Implementation Plan

### Phase A: Prove the Pattern (1-2 weeks)

**Goal**: Extract one core entity (`models`) into the modular structure. Prove the build pipeline works.

1. Create `entities/core/models/` directory structure
2. Extract model schema from existing `src/schema/` into `entities/core/models/schema/`
3. Extract model conventions from existing `src/conventions/` into `entities/core/models/conventions/`
4. Extract model inference rules from existing `src/inference/` into `entities/core/models/inference/`
5. Extract model generators from existing `src/instance-factories/` into `entities/core/models/generators/`
6. Extract model tests from existing `tests/` into `entities/core/models/tests/`
7. Create `module.yaml` manifest
8. Build the entity registry (`_registry.ts`) — discovers and loads entity modules
9. Update the build system to compile from entity modules
10. Verify all 1,900+ existing tests still pass

**Key risk**: The existing code may not have clean boundaries between entity types. Extraction may require refactoring shared logic into `_shared/`.

**Success criteria**: `npm run build && npm test` passes with models loaded from the entity module system. No functionality changes. All tests green.

### Phase B: Extract Remaining Core Entities (3-4 weeks)

**Goal**: Move all core entities to the modular structure, one at a time.

Order (based on dependencies):
1. **models** (done in Phase A — no dependencies)
2. **storage** (no dependencies)
3. **events** (depends on models)
4. **lifecycles** (depends on models)
5. **services** (depends on models)
6. **controllers** (depends on models, services)
7. **views** (depends on models, controllers)
8. **deployments** (depends on all above)
9. **manifests** (depends on all above)

Each extraction follows the same pattern as Phase A. Tests validate nothing breaks at each step.

**Success criteria**: All core entities loaded from entity modules. Build system uses entity registry exclusively. All tests green. Old source directories can be removed.

### Phase C: Add Extension Entities (2-3 weeks)

**Goal**: Implement the 3 new entity types as extension modules.

1. **`commands`** — define schema, convention grammar, inference rules, generators (Commander.js)
2. **`measures`** — define schema, convention grammar, inference rules, generators (dbt, Cube.js, SQL)
3. **`conventions`** — define schema, convention grammar (meta-circular), inference rules, generators (processor code)

Each follows the 8-facet module structure. They live in `entities/extensions/` initially, with the option to promote to `core/` later.

**Success criteria**: All 3 extension entities load via the entity registry. Convention grammars parse correctly. Inference rules fire. Generators produce output. Tests pass.

### Phase D: Add Quint Behavioural Specs (2-3 weeks, parallel with B/C)

**Goal**: Write Quint specifications for each entity's rules and invariants. Add `quint verify` to the build pipeline.

1. Write `behaviour/invariants.qnt` for each core entity
2. Write `behaviour/rules.qnt` for entities with inference rules
3. Add `quint typecheck` to the build pipeline
4. Add `quint verify` as a CI gate
5. Set up Quint Connect for model-based testing (validate TypeScript matches Quint spec)

This can run in parallel with Phases B and C since it's additive — it doesn't change existing functionality, it adds formal verification on top.

**Success criteria**: All Quint specs type-check. Key invariants verify. Model-based tests pass against existing TypeScript implementation.

### Phase E: Add Behavioural Convention Grammars (1-2 weeks)

**Goal**: Make Quint accessible through convention grammars. Complete the convention layer for both halves.

1. Define behavioural convention grammars for each entity (`behaviour/conventions/grammar.yaml`)
2. Implement the behavioural convention processor (expands human intent → Quint)
3. Register behavioural conventions alongside structural conventions in the convention engine
4. Write tests validating expansion correctness
5. Document the behavioural convention syntax

**Success criteria**: Developers can write `"models must not be orphaned"` and the convention processor generates correct Quint invariants. Both structural and behavioural conventions work through the same convention engine.

### Phase Summary

```
Phase A: Prove the Pattern                    (1-2 weeks)
  └── Extract models into entity module
  └── Build entity registry + build pipeline

Phase B: Extract Core Entities                (3-4 weeks)
  └── 9 core entities, dependency order
  └── Tests validate at each step           ──┐
                                               │ parallel
Phase C: Add Extension Entities               (2-3 weeks)
  └── commands, measures, conventions          │
  └── 8-facet structure for each            ──┤
                                               │ parallel
Phase D: Add Quint Behavioural Specs          (2-3 weeks)
  └── Invariants + rules for each entity       │
  └── quint verify in CI pipeline           ──┘

Phase E: Behavioural Convention Grammars      (1-2 weeks)
  └── Human-readable → Quint expansion
  └── Convention engine serves both halves

Total: ~8-12 weeks (with B/C/D in parallel)
```

---

## Connection to the Extension Pocket Pattern

This module architecture is the concrete implementation of the extension pocket pattern from the dogfood analysis:

```
Extension Pocket (from DOGFOOD-ANALYSIS-V2.md):

  Definition Layer    →  Entity modules (schema + conventions + inference + behaviour)
  Delivery Layer      →  Existing primitives (services, controllers, views, events)
  Distribution Layer  →  Registry packages (@specverse/entity-*)
```

The 8 facets map to the architectural layers:

| Facet | Layer | Role |
|-------|-------|------|
| Schema | Definition | What the entity type looks like (formal structure) |
| Structural Conventions | Definition (L5→L3) | How humans write it accessibly |
| Inference Rules | Definition | How the entity participates in expansion |
| Behavioural Spec | Definition | Formal properties that must hold (Quint) |
| Behavioural Conventions | Definition (L5→L3) | How humans write behavioural intent accessibly |
| Generators | Delivery (L3→L1) | How the entity gets realized to implementation |
| Documentation | Distribution | How the entity is documented and discovered |
| Tests | Verification | How the entity is validated (unit + model checking) |

The convention layer (facets 2 and 5) bridges Level 5 → Level 3 for both structural and behavioural definitions. The generators (facet 6) bridge Level 3 → Level 1. The schema (facet 1) and behavioural spec (facet 4) live at Level 3. Tests and model checking (facets 5 and 8) provide Level 2 verification.

The entire specification hierarchy is encoded in the 8 facets of a single entity module.

---

## Design Principles

1. **Structural identity**: Core and extension entities have the same 8-facet structure. No special cases.

2. **Discovery over registration**: The build system discovers entity modules by scanning directories and node_modules. No manual registration.

3. **Dependency order**: Entity modules declare dependencies. The build system compiles in dependency order.

4. **Facets are optional**: A minimal entity module needs only a schema. All other facets are optional — an entity without generators can still be parsed and inferred, just not realized.

5. **Convention grammars for both halves**: Every entity has structural conventions (`.specly` shorthand) and can have behavioural conventions (Quint shorthand). Both are processed by the same convention engine.

6. **Generators are pluggable**: New realization targets can be added to any entity module without modifying existing generators. Third-party packages can contribute generators.

7. **Quint specs are additive**: Behavioural specifications can be added to any entity at any time without changing existing functionality. They provide verification, not implementation.

8. **Self-describing**: The `conventions` entity module defines how convention grammars work, using the same convention grammar syntax it defines. The system can specify itself.

---

*Architecture document produced March 2026. Based on the dogfood analysis (DOGFOOD-ANALYSIS-V2.md), the extension pocket pattern, the two-language thesis (.specly structural + Quint behavioural), and the convention layer for both halves. Designed to be implemented incrementally against specverse-lang v3.5.1.*
