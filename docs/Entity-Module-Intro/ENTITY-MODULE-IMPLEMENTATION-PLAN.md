# Entity Module Implementation Plan

## Detailed Phased Plan for Restructuring specverse-lang into Entity Modules

---

## Current State Assessment

### How the Code Is Organised Today

The codebase is organised **by subsystem**, not by entity type:

```
src/
├── parser/                    # ALL entity parsing in one place
│   ├── unified-parser.ts      # 52KB monolith — parses everything
│   ├── convention-processor.ts # Convention processing for all entities
│   └── processors/            # Per-entity processors (11 files)
│       ├── ModelProcessor.ts
│       ├── ControllerProcessor.ts
│       ├── ServiceProcessor.ts
│       ├── EventProcessor.ts
│       ├── ViewProcessor.ts
│       ├── LifecycleProcessor.ts
│       ├── DeploymentProcessor.ts
│       ├── AttributeProcessor.ts
│       ├── RelationshipProcessor.ts
│       ├── ExecutableProcessor.ts
│       └── AbstractProcessor.ts
├── inference-engine/          # ALL entity inference in one place
│   ├── core/                  # Rule engine framework
│   └── logical/generators/    # Per-entity generators
│       ├── controller-generator.ts
│       ├── service-generator.ts
│       ├── event-generator.ts
│       └── view-generator.ts
├── realize/                   # ALL code generation in one place
├── generators/                # AI view generation
├── diagram-engine/            # ALL diagram generation
│   └── plugins/               # Per-entity diagram plugins
├── cli/                       # ALL CLI commands
├── registry/                  # Package registry
├── ai/                        # AI integration
└── types/
    └── ast.ts                 # ALL entity type definitions in one file
```

### Key Files That Need Splitting

| File | Size | Contains | Challenge |
|------|------|----------|-----------|
| `schema/SPECVERSE-SCHEMA.json` | 117KB | All entity schemas in one file | Must split into per-entity schemas |
| `src/types/ast.ts` | ~500 lines | All entity type definitions | Must split into per-entity types |
| `src/parser/unified-parser.ts` | 52KB | All parsing logic | Must extract entity-specific logic |
| `src/parser/convention-processor.ts` | 10KB | All convention processing | Must split per-entity |
| `src/cli/specverse-cli.ts` | 1,900+ lines | All CLI commands | Must modularise |

### Test Distribution

Tests are organised by subsystem, not by entity. A "model" change touches tests in:

| Test Location | Blocks | Tests Relevant to Models |
|--------------|--------|------------------------|
| `src/parser/__tests__/` | 63 | Convention parsing, schema validation |
| `src/inference-engine/__tests__/` | 109 | Rule application, context management |
| `src/generators/__tests__/` | 113 | AI view generation |
| `src/diagram-engine/__tests__/` | 161 | ER diagrams, architecture diagrams |
| `tests/instance-factories/views/__tests__/` | 383 | View rendering from models |
| `src/registry/__tests__/` | 271 | Manifest validation |

**Total: ~1,400+ test blocks across 80 files, 1,900/1,901 passing.**

---

## Target State

### What We're Building Towards

```
src/
├── entities/
│   ├── _registry.ts                 # Entity discovery + registration
│   ├── _shared/                     # Shared frameworks
│   │   ├── types.ts                 # Common type definitions
│   │   ├── convention-engine.ts     # Convention processor framework
│   │   ├── inference-engine.ts      # Inference rule framework
│   │   ├── generator-engine.ts      # Instance factory framework
│   │   ├── behaviour-engine.ts      # Quint integration framework
│   │   └── abstract-processor.ts    # Base processor class
│   │
│   ├── core/
│   │   ├── models/                  # 8-facet module
│   │   ├── controllers/             # 8-facet module
│   │   ├── services/                # 8-facet module
│   │   ├── events/                  # 8-facet module
│   │   ├── views/                   # 8-facet module
│   │   ├── lifecycles/              # 8-facet module
│   │   ├── storage/                 # 8-facet module
│   │   ├── deployments/             # 8-facet module
│   │   └── manifests/               # 8-facet module
│   │
│   └── extensions/
│       ├── commands/                # 8-facet module
│       ├── conventions/             # 8-facet module (meta-circular)
│       └── measures/                # 8-facet module
│
├── parser/                          # Slim — delegates to entity processors
├── inference-engine/                # Slim — delegates to entity rules
├── realize/                         # Slim — delegates to entity generators
├── diagram-engine/                  # Slim — delegates to entity diagram plugins
├── cli/                             # Slim — delegates to entity commands
├── registry/                        # Unchanged
└── ai/                              # Unchanged
```

The subsystem directories (`parser/`, `inference-engine/`, etc.) become thin orchestration layers that delegate to entity modules. The entity modules contain the actual logic.

---

## Phase A: Prove the Pattern with Models (1-2 Weeks)

### Goal

Extract the `models` entity into the 8-facet module structure. Prove the build pipeline works. All 1,900+ tests must continue passing.

### Why Models First

- Most mature entity type with the best test coverage
- No dependencies on other entity types (foundational)
- Touches all subsystems — parser, inference, generators, diagrams
- If models can be extracted cleanly, everything else can follow

### Step A.1: Create the Entity Framework (2-3 days)

**Create the shared entity infrastructure that all entity modules will use.**

```
src/entities/
├── _registry.ts              # Entity module discovery + registration
├── _shared/
│   ├── types.ts              # EntityModule interface definition
│   ├── convention-engine.ts  # Convention processor registration API
│   ├── inference-engine.ts   # Inference rule registration API
│   ├── generator-engine.ts   # Instance factory registration API
│   └── abstract-processor.ts # Base processor (move from parser/processors/)
└── module.schema.json        # JSON Schema for module.yaml manifests
```

**Key interfaces to define:**

```typescript
// src/entities/_shared/types.ts

interface EntityModule {
  name: string;
  type: 'core' | 'extension';
  version: string;
  dependsOn: string[];

  // Facets (all optional except schema)
  schema?: JSONSchema;
  conventionProcessor?: ConventionProcessor;
  inferenceRules?: InferenceRule[];
  generators?: Generator[];
  diagramPlugin?: DiagramPlugin;
}

interface EntityRegistry {
  register(module: EntityModule): void;
  getModule(name: string): EntityModule;
  getAllModules(): EntityModule[];
  getInDependencyOrder(): EntityModule[];
}
```

**The registry must:**
1. Discover entity modules in `entities/core/`, `entities/extensions/`, and `node_modules/@specverse/entity-*`
2. Resolve dependencies between entity modules
3. Provide access to entity facets for the subsystem orchestrators
4. Support hot-reload for development

**Tests to write:**
- Registry discovery finds modules in expected locations
- Dependency ordering is correct
- Missing dependency throws clear error
- Duplicate entity name throws clear error

### Step A.2: Extract Model Schema (1 day)

**Split the monolithic schema into a per-entity schema for models.**

**Source**: `schema/SPECVERSE-SCHEMA.json` (117KB)

**Target**: `src/entities/core/models/schema/model.schema.json`

**Approach:**
1. Read `SPECVERSE-SCHEMA.json` and identify the model-related definitions
2. Extract into a standalone schema file with `$ref` references to shared types
3. Create a schema composition step that assembles per-entity schemas into the full schema
4. Verify the composed schema is identical to the original

**Critical constraint**: The composed schema must produce identical validation results. Run all parser tests against both the original and composed schemas.

```
schema/SPECVERSE-SCHEMA.json (117KB, monolith)
    ↓ split
src/entities/core/models/schema/model.schema.json (model definitions)
src/entities/_shared/schema/primitives.schema.json (shared types)
schema/SPECVERSE-SCHEMA.json (now auto-generated from entity schemas)
```

**Tests:**
- All existing parser tests pass with composed schema
- Model schema validates correct `.specly` model definitions
- Model schema rejects invalid model definitions
- Composed schema is byte-identical to original (or functionally equivalent)

### Step A.3: Extract Model Convention Processor (1-2 days)

**Move model-specific convention processing into the entity module.**

**Source files:**
- `src/parser/processors/ModelProcessor.ts`
- `src/parser/processors/AttributeProcessor.ts`
- `src/parser/processors/RelationshipProcessor.ts`
- Relevant parts of `src/parser/convention-processor.ts`

**Target:**
```
src/entities/core/models/conventions/
├── grammar.yaml            # Convention grammar definitions (NEW)
├── processor.ts            # ModelProcessor (MOVED from parser/processors/)
├── attribute-processor.ts  # AttributeProcessor (MOVED)
└── relationship-processor.ts # RelationshipProcessor (MOVED)
```

**Approach:**
1. Move `ModelProcessor.ts` → `entities/core/models/conventions/processor.ts`
2. Move `AttributeProcessor.ts` → `entities/core/models/conventions/attribute-processor.ts`
3. Move `RelationshipProcessor.ts` → `entities/core/models/conventions/relationship-processor.ts`
4. Update import paths in the unified parser
5. Register the model convention processor via the entity registry
6. Update `src/parser/unified-parser.ts` to load processors from the entity registry instead of direct imports
7. Create `grammar.yaml` that declares the convention grammar (initially as documentation, later machine-readable)

**Critical constraint**: The unified parser must continue to work identically. The parser becomes a thin orchestrator that discovers processors from the entity registry.

**Tests:**
- All existing `convention-processor.test.ts` tests pass
- All existing `specverse-parser.test.ts` tests pass
- Model convention processor loads correctly from entity registry
- Convention expansion produces identical results

### Step A.4: Extract Model Inference Rules (1 day)

**Move model-specific inference rules into the entity module.**

**Source files:**
- Parts of `src/inference-engine/logical/logical-engine.ts` that handle models
- `src/inference-engine/logical/generators/controller-generator.ts` (generates controllers FROM models)
- `src/inference-engine/logical/generators/service-generator.ts` (generates services FROM models)
- Rule JSON files: `v3.1-controller-rules.json`, `v3.1-service-rules.json`

**Target:**
```
src/entities/core/models/inference/
├── rules.ts                # Model inference rules (extracted)
├── rules.json              # Rule definitions (MOVED from dist/)
└── index.ts                # Exports
```

**Approach:**
1. Identify which inference rules are triggered by model entities
2. Extract those rules into `entities/core/models/inference/rules.ts`
3. Move the relevant JSON rule files
4. Register model inference rules via the entity registry
5. Update the inference engine to load rules from the entity registry

**Nuance**: Some inference rules span entity types — "model with lifecycle → generate service" involves both models and services. These cross-entity rules should live with the entity that *triggers* them (models in this case), not the entity that's *generated* (services).

**Tests:**
- All existing inference engine tests pass
- Model inference rules load from entity registry
- End-to-end inference produces identical results

### Step A.5: Extract Model Generators (1 day)

**Move model-specific instance factories into the entity module.**

**Source files:**
- `libs/instance-factories/orms/prisma.yaml` (model → Prisma schema)
- `libs/instance-factories/orms/templates/prisma/` (Prisma templates)
- `libs/instance-factories/storage/` (model → database DDL)

**Target:**
```
src/entities/core/models/generators/
├── prisma.ts               # Prisma generator (wraps existing factory)
├── prisma.yaml             # Prisma instance factory definition (MOVED)
├── templates/              # Prisma templates (MOVED)
└── index.ts                # Exports + registration
```

**Approach:**
1. Move model-related instance factory YAML definitions
2. Move model-related template files
3. Create generator wrapper that registers with the entity registry
4. Update the realize command to discover generators from the entity registry

**Tests:**
- All existing realize/generator tests pass
- Model generators load from entity registry
- `specverse realize` produces identical output

### Step A.6: Extract Model Documentation and Tests (1 day)

**Move model-specific docs and tests into the entity module.**

**Source files (tests):**
- Model-related tests from `src/parser/__tests__/`
- Model-related tests from `src/inference-engine/__tests__/`
- Model-related tests from `src/diagram-engine/__tests__/` (ER diagrams)

**Target:**
```
src/entities/core/models/
├── docs/
│   ├── reference.md         # Model syntax reference (extract from lang-doc)
│   ├── conventions.md       # Convention syntax documentation
│   └── examples/
│       ├── basic-model.specly
│       ├── model-with-lifecycle.specly
│       └── model-with-relationships.specly
└── tests/
    ├── conventions.test.ts  # Convention parsing tests (extracted)
    ├── schema.test.ts       # Schema validation tests (extracted)
    ├── inference.test.ts    # Inference rule tests (extracted)
    ├── generators.test.ts   # Generator output tests (extracted)
    └── integration.test.ts  # End-to-end model pipeline test (NEW)
```

**Approach:**
1. Identify model-specific tests in each subsystem test directory
2. Copy (not move) them into the entity module — keep originals until Phase B
3. Create a new integration test that exercises the full model pipeline
4. Extract model documentation from existing docs

**Critical constraint**: Don't move tests yet — copy them. The originals stay in place and continue running. Phase B will remove the duplicates after all entities are extracted.

### Step A.7: Create Model Module Manifest (half day)

**Create the module.yaml that ties everything together.**

```yaml
# src/entities/core/models/module.yaml
name: models
type: core
version: 3.5.1
depends_on: []

facets:
  schema: schema/model.schema.json
  conventions:
    structural: conventions/grammar.yaml
  inference: inference/rules.ts
  generators:
    - generators/prisma.ts
  docs: docs/
  tests: tests/

delivery:
  parser: true
  inference: true
  realize: true
  cli: true
```

### Step A.8: Wire Up and Validate (1 day)

**Connect the entity module to the build system and verify everything works.**

1. Update `src/index.ts` to initialise the entity registry
2. Update `src/parser/unified-parser.ts` to load model processor from registry
3. Update `src/inference-engine/comprehensive-engine.ts` to load model rules from registry
4. Update `src/realize/` to load model generators from registry
5. Run full test suite — all 1,900+ tests must pass
6. Run examples validation — all 25+ examples must parse
7. Run `npm run build` — must compile cleanly
8. Verify CLI commands work end-to-end

**Acceptance criteria for Phase A:**
- [ ] Entity registry exists and discovers the models module
- [ ] Model convention processor loads from entity module
- [ ] Model inference rules load from entity module
- [ ] Model generators load from entity module
- [ ] All 1,900+ existing tests pass unchanged
- [ ] `npm run build && npm test` clean from fresh clone
- [ ] CLI commands produce identical output
- [ ] No functionality changes — pure structural refactor

---

## Phase B: Extract Remaining Core Entities (3-4 Weeks)

### Goal

Move all remaining core entities to the 8-facet module structure, following the proven pattern from Phase A.

### Extraction Order (Dependency-Based)

```
Week 1:
  B.1  storage       (no deps — foundational like models)
  B.2  events        (depends on: models)
  B.3  lifecycles    (depends on: models)

Week 2:
  B.4  services      (depends on: models, events)
  B.5  controllers   (depends on: models, services)

Week 3:
  B.6  views         (depends on: models, controllers, services)
  B.7  deployments   (depends on: all above)

Week 4:
  B.8  manifests     (depends on: all above)
  B.9  Cleanup — remove duplicate code from old locations
```

### Per-Entity Extraction Template

Each entity follows the same steps as Phase A:

```
For entity X:
  1. Extract schema from SPECVERSE-SCHEMA.json → entities/core/X/schema/
  2. Move XProcessor.ts → entities/core/X/conventions/processor.ts
  3. Extract X inference rules → entities/core/X/inference/rules.ts
  4. Move X instance factories → entities/core/X/generators/
  5. Move X diagram plugin → entities/core/X/diagrams/ (if applicable)
  6. Copy X tests → entities/core/X/tests/
  7. Create module.yaml
  8. Register with entity registry
  9. Run full test suite — must pass
```

### Entity-Specific Notes

#### B.1: Storage (1-2 days)
- Source: `src/parser/processors/` (storage instance parsing in unified-parser)
- Schema: storage instance definitions in `SPECVERSE-SCHEMA.json`
- Generators: `libs/instance-factories/storage/` (postgresql.yaml, mongodb.yaml, redis.yaml)
- No inference rules — storage is specified directly, not inferred
- Tests: `src/parser/__tests__/storage-instances.test.ts`

#### B.2: Events (2 days)
- Source: `src/parser/processors/EventProcessor.ts`
- Inference: `src/inference-engine/logical/generators/event-generator.ts`
- Rules: `v3.1-event-rules.json`
- Generators: `libs/instance-factories/communication/` (rabbitmq-events.yaml, event-emitter.yaml)
- Diagram: `src/diagram-engine/plugins/event-flow/` (3 variants: layered, sequence, swimlane)
- Tests: diagram event flow tests, inference event tests

#### B.3: Lifecycles (1-2 days)
- Source: `src/parser/processors/LifecycleProcessor.ts`
- Inference: lifecycle-related rules in logical engine
- Diagram: `src/diagram-engine/plugins/lifecycle/`
- No generators — lifecycles inform services, not generated code
- Tests: diagram lifecycle tests, parser lifecycle tests

#### B.4: Services (2 days)
- Source: `src/parser/processors/ServiceProcessor.ts`
- Inference: `src/inference-engine/logical/generators/service-generator.ts`
- Rules: `v3.1-service-rules.json`
- Generators: `libs/instance-factories/services/prisma-services.yaml`
- Tests: inference service tests, generator tests

#### B.5: Controllers (2 days)
- Source: `src/parser/processors/ControllerProcessor.ts`
- Inference: `src/inference-engine/logical/generators/controller-generator.ts`
- Rules: `v3.1-controller-rules.json`
- Generators: `libs/instance-factories/controllers/fastify.yaml`
- Tests: inference controller tests, generator tests

#### B.6: Views (3 days — most complex)
- Source: `src/parser/processors/ViewProcessor.ts`
- Inference: `src/inference-engine/logical/generators/view-generator.ts`, `specialist-view-expander.ts`
- Rules: `v3.1-view-rules.json`, `v3.4-specialist-view-rules.json`, `v3.4-view-component-inference.json`
- Generators: `libs/instance-factories/views/react-components.yaml`, `src/generators/ai-view-generator.ts`
- Diagram: architecture diagram plugins
- Tests: 383 test blocks in view instance factories + generator tests
- **Challenge**: Views have the most complex inference and generation. Multiple rule files, specialist expander, AI view generator.

#### B.7: Deployments (2 days)
- Source: `src/parser/processors/DeploymentProcessor.ts`
- Inference: `src/inference-engine/deployment/deployment-generator.ts`
- Rules: `v3.1-deployment-rules.json`
- Diagram: `src/diagram-engine/plugins/deployment/`
- Tests: deployment parser tests, deployment diagram tests

#### B.8: Manifests (1-2 days)
- Schema: manifest definitions in `SPECVERSE-SCHEMA.json`
- Validation: `src/registry/validators/manifest-validator.ts`
- Diagram: `src/diagram-engine/plugins/manifest/`
- Tests: manifest validator tests, manifest diagram tests

### Phase B.9: Cleanup (2-3 days)

Once all entities are extracted:

1. **Remove old processor files** from `src/parser/processors/` (replaced by entity modules)
2. **Remove old generator files** from `src/inference-engine/logical/generators/` (replaced by entity modules)
3. **Remove old diagram plugins** from `src/diagram-engine/plugins/` (replaced by entity modules)
4. **Slim down `unified-parser.ts`** — it becomes a thin orchestrator that calls entity registry
5. **Slim down `comprehensive-engine.ts`** — it becomes a thin orchestrator
6. **Remove duplicate tests** — entity module tests replace subsystem tests
7. **Update the composed schema generation** — auto-generate from all entity schemas
8. **Update build scripts** in `package.json`

**Acceptance criteria for Phase B:**
- [ ] All 9 core entities loaded from entity modules
- [ ] Old source directories cleaned up (no duplicate code)
- [ ] Subsystem files are thin orchestrators (~100-200 lines each)
- [ ] All 1,900+ tests pass
- [ ] Schema auto-generates from entity schemas
- [ ] Build pipeline uses entity registry exclusively
- [ ] No functionality changes — pure structural refactor

---

## Phase C: Add Extension Entities (2-3 Weeks)

### Goal

Implement the 3 genuinely new entity types as extension modules, following the same 8-facet structure.

### C.1: Commands Entity (1 week)

**What**: CLI definitions — arguments, flags, exit codes, subcommands.

```
src/entities/extensions/commands/
├── module.yaml
├── conventions/
│   ├── grammar.yaml            # How humans write command definitions
│   └── processor.ts            # Convention expansion logic
├── schema/
│   └── command.schema.json     # JSON Schema for command definitions
├── inference/
│   └── rules.ts                # "command with subcommands → generate help text"
├── generators/
│   ├── commander.ts            # Generate Commander.js CLI code
│   └── mcp-tool.ts             # Generate MCP tool definitions
├── docs/
│   ├── reference.md
│   └── examples/
│       └── cli-commands.specly
└── tests/
    ├── conventions.test.ts
    ├── schema.test.ts
    ├── inference.test.ts
    ├── generators.test.ts
    └── integration.test.ts
```

**Convention grammar example:**
```yaml
conventions:
  positional:
    pattern: "{ type: FilePath, required: true, positional: true }"
    implies: { position: "first", validation: "file-exists" }
  flag_boolean:
    pattern: "{ type: Boolean, default: false }"
    implies: { cli_flag: true, no_value: true }
```

**Schema**: Defines what a command definition looks like — name, description, arguments, flags, returns, exitCodes, subcommands.

**Inference rules**:
- Command with subcommands → generate help subcommand
- Command with `--json` flag → generate JSON output formatter
- Command with file argument → generate file validation

**Generators**:
- Commander.js: generate Node.js CLI code from command definitions
- MCP tool: generate MCP tool definitions from command definitions

**Validation**: Write the existing 30+ CLI commands as `.specly` command definitions. Verify the generated Commander.js code matches the existing CLI behaviour.

### C.2: Measures Entity (1 week)

**What**: Analytics definitions — aggregations, dimensions, KPIs.

```
src/entities/extensions/measures/
├── module.yaml
├── conventions/
│   ├── grammar.yaml            # "revenue: sum of Order.totalAmount where completed"
│   └── processor.ts
├── schema/
│   └── measure.schema.json
├── inference/
│   └── rules.ts                # "measure with dimensions → generate dimension filters"
├── generators/
│   ├── dbt.ts                  # Generate dbt model
│   ├── cubejs.ts               # Generate Cube.js measure
│   └── sql-view.ts             # Generate SQL view
├── docs/
│   ├── reference.md
│   └── examples/
│       └── ecommerce-analytics.specly
└── tests/
    ├── conventions.test.ts
    ├── schema.test.ts
    ├── inference.test.ts
    ├── generators.test.ts
    └── integration.test.ts
```

**Convention grammar example:**
```yaml
conventions:
  sum_of:
    pattern: "sum of {model}.{field}"
    expands_to: { aggregation: "sum", source: "{model}", field: "{field}" }
  where:
    pattern: "where {condition}"
    expands_to: { filter: "{condition}" }
  by:
    pattern: "by [{dimensions}]"
    expands_to: { dimensions: "{dimensions}" }
```

**Schema**: Defines what a measure looks like — name, description, source model, aggregation type, field, filter, dimensions, thresholds.

**Inference rules**:
- Measure referencing a model → validate model and field exist
- Measure with dimensions → generate dimension filter operations
- Measure with threshold → generate threshold alert event

**Generators**:
- dbt: generate dbt model SQL from measure definition
- Cube.js: generate Cube.js schema from measure definition
- SQL view: generate raw SQL view from measure definition

### C.3: Conventions Entity (1 week)

**What**: Convention grammar definitions — self-referential, meta-circular.

```
src/entities/extensions/conventions/
├── module.yaml
├── conventions/
│   ├── grammar.yaml            # Convention grammar for defining conventions!
│   └── processor.ts
├── schema/
│   └── convention.schema.json  # What a convention grammar looks like
├── inference/
│   └── rules.ts                # How convention grammars compose and inherit
├── generators/
│   └── processor-generator.ts  # Generate convention processor code from grammar
├── docs/
│   ├── reference.md
│   └── examples/
│       ├── structural-conventions.specly
│       └── behavioural-conventions.specly
└── tests/
    ├── conventions.test.ts     # Meta: convention conventions work
    ├── schema.test.ts
    ├── inference.test.ts
    ├── generators.test.ts
    └── integration.test.ts
```

**Schema**: Defines what a convention grammar looks like — name, baseType, implies, when_modified_by, domain (specly/quint), pattern, expands_to, template.

**Inference rules**:
- Convention with `baseType` → inherit conventions from base type
- Convention with `domain: quint` → register with behavioural convention engine
- Convention with `when_modified_by` → validate modifiers are known conventions

**Generator**: Generates a convention processor TypeScript module from a convention grammar YAML definition. This is the code generation step that makes new conventions executable.

**Meta-circular validation**: Define the existing `.specly` conventions (Email, UUID, DateTime, etc.) using the conventions entity type. Verify the generated convention processor produces identical results to the current hand-written processor.

### Phase C Acceptance Criteria

- [ ] All 3 extension entities follow the 8-facet module structure
- [ ] Entity registry discovers and loads extension entities
- [ ] Convention grammars parse and expand correctly
- [ ] Schemas validate correct and reject invalid definitions
- [ ] Inference rules fire and produce expected results
- [ ] Generators produce correct output for each target
- [ ] Tests cover all facets
- [ ] `.specly` files with new entity types parse correctly
- [ ] Existing tests still pass (extensions are additive)

---

## Phase D: Add Quint Behavioural Specs (2-3 Weeks)

### Goal

Write Quint specifications for each entity's rules and invariants. Add `quint verify` to the build pipeline.

**This phase can run in parallel with Phases B and C** — it's additive, not structural.

### D.1: Set Up Quint Infrastructure (2-3 days)

1. Add `@quint-lang/quint` as a dev dependency
2. Create `src/entities/_shared/behaviour-engine.ts` — Quint integration framework
3. Create a `quint/` directory structure convention for entity modules
4. Add `quint typecheck` and `quint verify` to the build pipeline
5. Create a CI step that runs Quint verification

```json
// package.json additions
{
  "scripts": {
    "quint:typecheck": "quint typecheck src/entities/**/behaviour/*.qnt",
    "quint:verify": "quint verify src/entities/**/behaviour/*.qnt",
    "test:behaviour": "npm run quint:typecheck && npm run quint:verify"
  }
}
```

### D.2: Write Invariants for Core Entities (1-2 weeks)

Write Quint invariants for each core entity, starting with the most critical:

**Priority order:**

#### Models (highest priority)
```
src/entities/core/models/behaviour/
├── invariants.qnt
│   - modelsHaveAttributes (every model has ≥1 attribute)
│   - noOrphanModels (every model belongs to a component)
│   - lifecyclesAreDAGs (lifecycle transitions form directed acyclic graphs)
│   - attributeNamesUnique (no duplicate attribute names within a model)
│   - relationshipTargetsExist (every relationship references an existing model)
└── rules.qnt
    - expandLifecycle (model with lifecycle → generate service)
    - generateController (model → generate CURED controller)
    - expansionIsConfluent (rule order doesn't matter)
```

#### Controllers
```
src/entities/core/controllers/behaviour/
├── invariants.qnt
│   - controllersHaveModels (every controller references an existing model)
│   - curedOperationsComplete (CURED generates all 5 operations)
│   - noOrphanControllers (every controller belongs to a component)
└── rules.qnt
    - generateCURED (controller with CURED → 5 standard operations)
    - generateCustomActions (controller with custom → custom endpoints)
```

#### Services
```
src/entities/core/services/behaviour/
├── invariants.qnt
│   - servicesHaveOperations (every service has ≥1 operation)
│   - operationInputsValid (operation inputs reference existing types)
└── rules.qnt
    - generateFromLifecycle (lifecycle model → lifecycle management service)
```

#### Events
```
src/entities/core/events/behaviour/
├── invariants.qnt
│   - eventsHavePayloads (every event has a defined payload)
│   - subscribersExist (every subscription references an existing event)
│   - publishersExist (every publish references an existing event)
└── rules.qnt
    - generateFromLifecycle (lifecycle transition → state change event)
    - generateFromCRUD (controller operation → CRUD event)
```

#### Inference Engine (cross-entity)
```
src/entities/_shared/behaviour/
├── inference-invariants.qnt
│   - noConflictingRules (no two rules produce contradictory outputs)
│   - expansionTerminates (inference always reaches a fixed point)
│   - expansionIsMonotonic (inference only adds, never removes)
│   - rulesAreConfluent (application order doesn't affect result)
└── expansion-rules.qnt
    - Full expansion cycle specified as Quint state machine
```

### D.3: Set Up Quint Connect (3-5 days)

**Quint Connect validates that the TypeScript implementation matches the Quint specification** via model-based testing.

1. Create test harness that runs Quint scenarios against TypeScript inference engine
2. For each Quint action, verify the TypeScript produces the same state transition
3. For each Quint invariant, verify the TypeScript never violates it
4. Add to CI pipeline

```typescript
// src/entities/_shared/behaviour-engine.ts
interface QuintConnectRunner {
  // Run a Quint scenario and compare against TypeScript implementation
  validateScenario(quintFile: string, tsImplementation: Function): ValidationResult;

  // Check that an invariant holds across all reachable states
  verifyInvariant(quintFile: string, invariantName: string, tsImplementation: Function): VerificationResult;
}
```

### Phase D Acceptance Criteria

- [ ] Quint type-checks all `.qnt` files
- [ ] `quint verify` passes for all invariants
- [ ] Key properties proven: no conflicting rules, expansion terminates, expansion is monotonic
- [ ] Quint Connect validates TypeScript matches Quint spec
- [ ] CI pipeline includes Quint verification step
- [ ] Quint failures block the build (CI gate)
- [ ] All existing tests still pass (Quint is additive)

---

## Phase E: Behavioural Convention Grammars (1-2 Weeks)

### Goal

Make Quint accessible through convention grammars. Developers write `"models must not be orphaned"` and the convention processor generates the formal Quint invariant.

### E.1: Define Behavioural Convention Grammar Format (2-3 days)

**Extend the conventions entity schema to support behavioural conventions:**

```yaml
# Schema addition for behavioural conventions
convention:
  domain: "quint"                    # Target: Quint (not .specly)
  pattern: "{entities} must not be orphaned"
  expands_to: "quint:invariant"
  template:
    name: "noOrphan{Entities}"
    body: "{entities}.forall(e => components.exists(c => c.{entities}.contains(e)))"
```

### E.2: Implement Behavioural Convention Processor (3-4 days)

1. Extend the convention engine to handle `domain: "quint"` conventions
2. Implement pattern matching for behavioural convention syntax
3. Implement Quint code generation from templates
4. Register behavioural convention processors alongside structural ones
5. Verify generated Quint type-checks and verifies correctly

### E.3: Write Behavioural Convention Grammars for Core Entities (3-5 days)

For each core entity, create `behaviour/conventions/grammar.yaml`:

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

  must_have:
    domain: "quint"
    pattern: "{entities} must have {property}"
    expands_to: "quint:invariant"
    template:
      name: "{entities}Have{Property}"
      body: "{entities}.forall(e => e.{property}.size() > 0)"

  transitions_form_dag:
    domain: "quint"
    pattern: "{entity} transitions form a DAG"
    expands_to: "quint:invariant"
    template:
      name: "{entity}TransitionsAreDAG"
      body: "{entity}.lifecycles.forall(lc => isDAG(lc.transitions))"

  expansion_always_terminates:
    domain: "quint"
    pattern: "{process} always terminates"
    expands_to: "quint:temporal"
    template:
      name: "{process}Terminates"
      body: "eventually(state.isFullyExpanded)"

  must_not_conflict:
    domain: "quint"
    pattern: "{collection} must not conflict"
    expands_to: "quint:invariant"
    template:
      name: "noConflicting{Collection}"
      body: "{collection}.forall(a => {collection}.forall(b => a != b implies not(a.conflicts(b))))"
```

### E.4: Validate Round-Trip (2-3 days)

**Prove that behavioural conventions produce correct Quint:**

1. Write behavioural intent in convention syntax
2. Expand via convention processor
3. Type-check the generated Quint
4. Verify the generated Quint
5. Compare against hand-written Quint (must be semantically equivalent)

```
"models must not be orphaned"
    ↓ convention processor
val noOrphanModels = models.forall(e =>
  components.exists(c => c.models.contains(e)))
    ↓ quint typecheck
✓ type-checks
    ↓ quint verify
✓ invariant holds
    ↓ compare with hand-written
✓ semantically equivalent
```

### Phase E Acceptance Criteria

- [ ] Behavioural convention grammar format defined and documented
- [ ] Convention processor handles `domain: "quint"` conventions
- [ ] Generated Quint type-checks and verifies
- [ ] Behavioural conventions exist for all core entity invariants
- [ ] Round-trip validation passes (convention → Quint → verify)
- [ ] Both structural and behavioural conventions work through same convention engine
- [ ] All existing tests still pass

---

## Timeline Summary

```
Week 1-2:   Phase A — Prove pattern with models
            ├── A.1 Entity framework (2-3 days)
            ├── A.2 Extract model schema (1 day)
            ├── A.3 Extract model conventions (1-2 days)
            ├── A.4 Extract model inference (1 day)
            ├── A.5 Extract model generators (1 day)
            ├── A.6 Extract model docs/tests (1 day)
            ├── A.7 Create module manifest (half day)
            └── A.8 Wire up and validate (1 day)

Week 3-6:   Phase B — Extract remaining core entities
            ├── B.1 storage (1-2 days)
            ├── B.2 events (2 days)
            ├── B.3 lifecycles (1-2 days)
            ├── B.4 services (2 days)
            ├── B.5 controllers (2 days)
            ├── B.6 views (3 days)
            ├── B.7 deployments (2 days)
            ├── B.8 manifests (1-2 days)
            └── B.9 cleanup (2-3 days)
                                                    ──┐
Week 4-6:   Phase C — Add extension entities           │ parallel
            ├── C.1 commands (1 week)                  │ with B
            ├── C.2 measures (1 week)                  │
            └── C.3 conventions (1 week)               │
                                                    ──┤
Week 3-6:   Phase D — Add Quint behavioural specs      │ parallel
            ├── D.1 Quint infrastructure (2-3 days)    │ with B/C
            ├── D.2 Write invariants (1-2 weeks)       │
            └── D.3 Quint Connect (3-5 days)           │
                                                    ──┘

Week 7-8:   Phase E — Behavioural convention grammars
            ├── E.1 Grammar format (2-3 days)
            ├── E.2 Convention processor (3-4 days)
            ├── E.3 Write grammars (3-5 days)
            └── E.4 Validate round-trip (2-3 days)
```

**Total: ~8-10 weeks** with B/C/D running in parallel during weeks 3-6.

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Monolithic schema hard to split** | Blocks Phase A | Start with copy-and-reference approach; full split can come later |
| **Tests have cross-entity dependencies** | Slows Phase B | Copy tests first (don't move); remove duplicates only after all entities extracted |
| **Convention processor has shared state** | Breaks extraction | Keep shared state in `_shared/`; entity processors are stateless |
| **Inference rules span entities** | Unclear ownership | Rules live with the triggering entity; cross-entity validation in `_shared/` |
| **Views are too complex to extract cleanly** | Blocks B.6 | Extract views last; accept partial extraction if needed |
| **Quint learning curve** | Slows Phase D | Start with simple invariants; escalate to temporal properties later |
| **Behavioural convention templates are fragile** | Breaks Phase E | Extensive round-trip testing; keep hand-written Quint as fallback |

## Invariants (Rules That Must Hold Throughout)

1. **All 1,900+ existing tests pass at every phase boundary.** No exceptions. If tests break, the phase is not complete.
2. **No functionality changes.** This is a structural refactor. Behaviour must be identical.
3. **Build from fresh clone works.** `git clone && npm install && npm run build && npm test` must succeed.
4. **CLI commands produce identical output.** Before/after comparison for all commands.
5. **Extension entities are additive.** Installing an extension entity must not break existing functionality.

---

*Plan produced March 2026. Based on specverse-lang v3.5.1 codebase analysis, the entity module architecture (ENTITY-MODULE-ARCHITECTURE.md), and the dogfood analysis (DOGFOOD-ANALYSIS-V2.md).*
