# The Dogfood Test: Specifying SpecVerse in .specly

## What's Missing When the Specification Language Tries to Specify Itself

---

## Executive Summary

If you attempted to specify SpecVerse itself -- the parser, inference engine, CLI, MCP server, AI orchestrator, diagram generator, VSCode extension, and registry -- using `.specly`, you would cover approximately 40-50% of the architecture cleanly. The CRUD/data/lifecycle/event layer maps well to existing primitives.

The remaining 50-60% reveals **17 specific gaps** that cluster around a single insight: `.specly` is excellent at expressing *what* a system consists of but weak at expressing *how* a system transforms, processes, generates, or extends itself.

These gaps aren't bugs -- they're the roadmap for what SpecVerse needs to become to fulfil its meta-specification platform ambitions. The four most critical gaps (transformation rules, CLI definitions, plugin architecture, convention definitions) would make `.specly` **self-describing** -- a specification language that can specify its own specification language.

---

## What .specly CAN Express About Itself

The good news -- quite a lot of SpecVerse's architecture maps cleanly to existing primitives:

| SpecVerse Component | .specly Primitive | Coverage |
|---|---|---|
| Data structures (AST nodes, SpecFile, Component, Model, Attribute) | `models` with attributes and relationships | Good |
| Relationships (Component hasMany Models, Model hasMany Attributes) | `relationships` (hasMany, belongsTo) | Good |
| Spec lifecycle (draft → validated → inferred → expanded → realized) | `lifecycles` with flow syntax | Good |
| System events (SpecValidated, InferenceComplete, DiagramGenerated) | `events` with typed payloads | Good |
| API operations (validate, infer, generate) | `controllers` with CURED + custom actions | Good |
| Business logic (InferenceService, ConventionService, ValidationService) | `services` with operations | Good |
| Multi-environment deployment (local, web, extension, enterprise) | `deployments` with typed instances | Good |
| Storage (registry database, cache) | `storage` instances (relational, cache) | Good |
| Event-driven architecture (publish/subscribe between components) | `events` + `subscribes_to` + `publishes` | Good |

---

## What's Missing: 17 Gaps Organised by Category

### Category A: Transformation & Rule Systems

#### 1. Transformation Rules / Rule Engine

This is the biggest gap. The inference engine -- SpecVerse's most distinctive feature -- is a rule engine with 21+ rules. Each rule has conditions ("when a model has a lifecycle..."), actions ("...generate a lifecycle management service"), priorities, and ordering. There is no way to express this in `.specly`.

You'd need something like:
```yaml
rules:
  generateLifecycleService:
    when:
      entity: Model
      condition: "has lifecycle"
    then:
      generate: Service
      with:
        operations: [transition, getState, getHistory]
    priority: 10
    phase: "logical-inference"
```

Currently `.specly` can express *what* the inference engine produces (models, controllers, services) but not *how* it decides what to produce. The rule engine is invisible to the specification language.

#### 2. Convention / Pattern Definitions

The convention processor parses `Email required unique verified` into structured AST. But `.specly` can't express the *convention grammar itself* -- the rules that define how `Email` maps to format validation, `required` maps to nullability, `unique` maps to a constraint, etc.

You'd need something like:
```yaml
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

#### 3. Template / Code Generation Logic

Instance factories transform specifications into code (Prisma schemas, Express routes, React components). `.specly` has no concept of templates, string interpolation, output format definitions, or generation rules.

You'd need:
```yaml
templates:
  PrismaModel:
    input: Model
    output: "prisma/schema.prisma"
    format: "prisma"
    mapping:
      String: "String"
      Integer: "Int"
      UUID: "String @id @default(uuid())"
      DateTime: "DateTime @default(now())"
```

---

### Category B: Interface Definitions

#### 4. CLI / Command-Line Interface

SpecVerse has 30+ CLI commands with subcommands, flags, arguments, help text, stdin/stdout piping, and interactive prompts. `.specly` has controllers with actions, but no CLI-specific constructs.

You'd need:
```yaml
commands:
  validate:
    description: "Validate a .specly specification"
    arguments:
      file: { type: FilePath, required: true, positional: true }
    flags:
      --json: { type: Boolean, default: false, description: "Output as JSON" }
      --strict: { type: Boolean, default: false }
    returns: ValidationResult
    exitCodes:
      0: "Valid"
      1: "Validation errors"
    subcommands:
      fix: { description: "Auto-fix validation issues" }
```

#### 5. Protocol Definitions

The MCP server implements the Model Context Protocol -- tools, resources, prompts, transport layers, capability negotiation. `.specly` can express API endpoints but not protocol semantics.

You'd need:
```yaml
protocols:
  MCP:
    transport: ["stdio", "http"]
    capabilities:
      tools:
        validate: { input: SpecFile, output: ValidationResult }
        infer: { input: SpecFile, output: ExpandedSpec }
      resources:
        schema: { uri: "specverse://schema/v3", mimeType: "application/json" }
      prompts:
        creation: { arguments: [description], returns: Prompt }
```

#### 6. Plugin / Extension Architecture

Convention processors, instance factories, and diagram renderers are all pluggable. `.specly` has no concept of extension points, hooks, plugin interfaces, or registration patterns.

You'd need:
```yaml
extensionPoints:
  conventionProcessor:
    interface:
      parse: { input: String, output: AttributeAST }
      expand: { input: AttributeAST, output: StructuredAttribute }
    registration: "convention-processors/"

  instanceFactory:
    interface:
      canHandle: { input: InstanceType, output: Boolean }
      generate: { input: Spec, output: FileSet }
    registration: "instance-factories/"
```

---

### Category C: Data & Type System Limitations

#### 7. Recursive / Tree Data Structures

The parsed specification is an AST -- a tree of nodes where nodes contain other nodes. `.specly` models are essentially flat: attributes are leaf values, not recursive structures. You can't express "a Node has children which are also Nodes."

You'd need recursive type support:
```yaml
models:
  ASTNode:
    attributes:
      type: String required values=[model,attribute,lifecycle,action]
      value: String
    relationships:
      children: hasMany ASTNode    # Self-referential recursive
      parent: belongsTo ASTNode
```

This *might* partially work with the existing relationship syntax, but the inference engine and convention processor don't handle self-referential models, and there's no depth/recursion constraint.

#### 8. Union / Sum Types

The convention processor handles multiple input formats (string shorthand, object syntax, array syntax). `.specly` has `values=[a,b,c]` for enums but no proper union types where a field can be "String OR Object OR Array."

#### 9. Generic / Parameterised Types

Instance factories are generic over their input type -- a `PrismaGenerator<Model>` operates on any model. `.specly` has no way to express type parameters or generics.

---

### Category D: Operational Concerns

#### 10. Configuration Hierarchies

`.specverse.yml` has environment variables, provider configs, defaults with overrides, cascading configuration. `.specly` has no concept of configuration schemas with environment-specific overrides.

```yaml
# What you'd need:
configurations:
  AppConfig:
    properties:
      port: { type: Integer, default: 3000, env: "PORT" }
      database:
        url: { type: String, required: true, env: "DATABASE_URL" }
        pool: { type: Integer, default: 10 }
    environments:
      production:
        database.pool: 50
      development:
        database.url: "postgres://localhost:5432/dev"
```

#### 11. Error Handling / Diagnostics

Structured error types, error codes, severity levels, recovery strategies, diagnostic messages with source locations. `.specly` has `requires` and `ensures` for pre/post-conditions but no error type definitions.

```yaml
# What you'd need:
errors:
  ValidationError:
    code: "SPEC_001"
    severity: error     # error, warning, info
    message: "Invalid attribute syntax: {detail}"
    location: { file: String, line: Integer, column: Integer }
    recovery: "Check convention syntax documentation"
```

#### 12. Caching Strategies

MCP server has 5-minute TTL caching for command discovery. `.specly` has no concept of caching policies, TTLs, invalidation rules, cache key patterns.

#### 13. Build Pipelines / Multi-Target Compilation

The MCP server builds to 4 targets (local, web, extension, enterprise) with different bundling, dependencies, and entry points. `.specly` has manifests for deployment mapping but not build pipeline definitions.

---

### Category E: Already-Acknowledged Gaps

These are already noted in the V2 roadmap as known language coverage limits:

#### 14. Testing Contracts

Test cases, assertions, fixtures, mocking strategies, coverage targets. No way to express "given this input, expect this output" or "this property must always hold."

#### 15. Workflow / Saga Orchestration

Multi-step, multi-entity workflows with compensation logic, approval gates, parallel execution, timeout handling. The AI orchestrator has multi-step workflows with approval gates. `.specly` has lifecycles (state machines) but not multi-entity sagas.

#### 16. External API Contracts

Calling external services (OpenAI, Anthropic, Azure, Ollama), authentication methods, retry policies, circuit breakers, rate limits. `.specly` can define internal services but not external API consumption contracts.

#### 17. Analytics / Metrics Definitions

KPIs, dashboards, measures, dimensions, alerting thresholds. The MCP server has monitoring instances but no way to define what to measure or how to alert.

---

## Priority Assessment

If the goal is "specify SpecVerse in .specly," the gaps fall into three tiers:

### Tier 1: Would Block the Dogfood Attempt

| Gap | Why It Blocks | Effort to Add |
|-----|---------------|---------------|
| **Transformation Rules** | Can't specify the inference engine -- SpecVerse's core value | Large (new entity type + semantics) |
| **CLI Definitions** | Can't specify the primary user interface | Medium (new entity type) |
| **Plugin Architecture** | Can't specify the extensibility model | Medium (new entity type) |
| **Convention Definitions** | Can't specify how conventions work -- meta-circular dependency | Large (self-referential) |

### Tier 2: Would Force Awkward Workarounds

| Gap | Workaround | Effort to Add |
|-----|-----------|---------------|
| **Protocol Definitions** | Model as controllers with custom actions | Medium |
| **Template/Generation Logic** | Document in behaviors/operations, can't validate | Medium |
| **Recursive Data Structures** | Flatten the tree, lose structural accuracy | Small |
| **Configuration Hierarchies** | Model as regular models, lose env-override semantics | Small |
| **Error Handling** | Model as events or primitives | Small |
| **Union Types** | Use String with values, lose type safety | Small |

### Tier 3: Nice-to-Have (Already on Roadmap)

| Gap | Already Planned? |
|-----|-----------------|
| Testing Contracts | Yes (Phase 4 Track A) |
| Workflow Orchestration | Yes (Phase 4 Track A) |
| External API Contracts | Yes (Phase 4 Track A) |
| Analytics/Metrics | Yes (Phase 4 Track A) |
| Build Pipelines | No |
| Caching Strategies | No |
| Generic Types | No |

---

## The Meta-Insight

The dogfood test reveals something important: **the gaps cluster around "how things work" rather than "what things are."**

`.specly` is excellent at expressing *what* a system consists of (models, relationships, lifecycles, events, endpoints). It is weak at expressing *how* a system transforms, processes, generates, or extends itself.

This maps directly to the specification hierarchy:

- **Level 3 (Domain Spec Languages)**: `.specly` covers this well -- *what* the system looks like
- **Level 2 (Computational Specification)**: The transformation rules, templates, and convention definitions live here -- *how* the system processes
- **Level 1 (Formal Verification)**: Testing contracts and invariants live here -- *proof* that the system is correct

The dogfood test is essentially asking `.specly` to reach down into Levels 2 and 1, which is exactly where the meta-specification platform direction points. The gaps aren't bugs -- they're the roadmap for what SpecVerse needs to become to fulfil its Level 5 ambitions.

The four Tier 1 gaps (transformation rules, CLI definitions, plugin architecture, convention definitions) are the most strategically interesting because they would make `.specly` **self-describing** -- a specification language that can specify its own specification language. That's the meta-specification platform in its purest form.

---

## Connection to Previous Analyses

| Analysis | Relevant Gap |
|----------|-------------|
| **Quint** | Quint has transformation rules (state transitions with invariants) and model checking. SpecVerse's Tier 1 gaps overlap with what Quint already solves for distributed systems. |
| **SDD Landscape** | The SDD tools lack everything `.specly` already has (formal language, validation, inference). But they have workflow orchestration (Gap #15) that `.specly` lacks. |
| **Lean/de Moura** | Testing contracts (Gap #14) and formal verification connect directly to the L3→L1 bridge that Lean provides. |
| **Wolfram** | Computational specification (Gap #3, templates/generation) is what Wolfram Language does for mathematical domains. |
| **VSDD** | Convention definitions (Gap #2) are the formal version of what VSDD calls "domain purity boundaries." |
| **Meta-Specification Proposal** | The Tier 1 gaps are precisely the extension points that domain-specific spec languages need. Solving them enables the platform. |

---

## Recommendation

**Don't try to solve all 17 gaps at once.** Instead, use the dogfood test strategically:

1. **Write the `.specly` spec for SpecVerse using current primitives** -- cover the 40-50% that works today. This is a powerful demonstration and identifies exactly where the language hits its limits in practice, not theory.

2. **Prioritise Tier 1 gaps based on which enables the most downstream value:**
   - **Transformation Rules** → enables specifying inference engines, convention processors, and any rule-based system
   - **Convention Definitions** → enables self-describing convention processors and the meta-specification platform
   - **CLI Definitions** → enables specifying developer tools (valuable but less strategic)
   - **Plugin Architecture** → enables specifying extensible systems (valuable but less strategic)

3. **Use Tier 2 workarounds** for the immediate dogfood attempt -- model protocols as controllers, flatten recursive structures, use String for union types. Accept the compromises and document where they hurt.

4. **Let Tier 3 gaps follow the existing Phase 4 roadmap** -- they're already planned and their priority is validated by the dogfood test.

The dogfood test isn't just an exercise -- it's the fastest path to discovering which language extensions actually matter, because you experience the gaps firsthand instead of theorising about them.

---

## Part 2: The Abstraction Problem — Specification vs Implementation

### The Critical Correction

The initial instinct was to map the 17 gaps to existing domain languages: OpenAPI for protocols, Terraform for configuration, dbt for analytics. But this contains a fundamental error that contradicts SpecVerse's own thesis.

**SpecVerse's thesis is "Define Once, Implement Anywhere."** If you specify a protocol using OpenAPI, you've already said "implement with HTTP." If you specify infrastructure using Terraform, you've already said "implement on AWS/GCP/Azure." That's implementation leaking into specification — the exact problem SpecVerse exists to solve.

Let me re-examine every language through this lens:

| Language | Abstract or Implementation? | Why |
|----------|---------------------------|-----|
| **.specly** | **Abstract** | `retrieve: {}` says nothing about HTTP vs gRPC vs CLI |
| **Quint** | **Abstract** | State machines, invariants, temporal properties -- implementation-independent |
| **Lean** | **Abstract** | Mathematical proofs are the purest abstraction possible |
| **Wolfram/SymPy** | **Abstract** | `f(x) = x² + 2x + 1` is independent of Python vs C vs Julia |
| **OpenAPI** | **Implementation** | `GET /users/{id}` with `200 OK` -- that's HTTP, not abstract |
| **Terraform** | **Implementation** | `aws_rds_instance` -- that's AWS, not abstract |
| **dbt** | **Mixed** | Semantic layer (measures, dimensions) is abstract; Jinja SQL templates are implementation |
| **Protobuf/gRPC** | **Implementation** | Specific RPC transport binding |
| **AsyncAPI** | **Implementation** | Specific async protocol binding |

**OpenAPI, Terraform, Protobuf, and AsyncAPI are implementation contracts, not abstract specifications.** They belong at the *realization* level, not the specification level. Putting them alongside `.specly` and Quint is a category error.

### .specly Already Has This Right

The three-tier structure in `.specly` already embodies this distinction:

```
components:    → WHAT (abstract specification)
deployments:   → WHERE (abstract topology)
manifests:     → HOW (implementation mapping)
```

A `.specly` controller says `retrieve: {}`. The *manifest* maps that to a Fastify route. OpenAPI describes the resulting HTTP contract. Terraform describes the resulting infrastructure. These are *outputs* of the realize step, not inputs to the specify step.

```
Abstract Specification (.specly)
    "Product has CURED operations"
         │
         ▼ realize
Implementation Contract (OpenAPI / Terraform / Prisma)
    "GET /api/products/{id} → 200 ProductResponse"
         │
         ▼ generate
Code (Express / Fastify / NestJS)
    app.get('/api/products/:id', handler)
```

OpenAPI is a **realization target**, not a specification peer.

---

### What Abstract Specification Actually Looks Like

The gaps that were previously mapped to OpenAPI and Terraform actually need new **abstract entity types** in `.specly` -- transport-independent, provider-independent, implementation-independent.

#### Gap #5: Protocol/Interface Definitions (Corrected)

**Wrong**: "Use OpenAPI to specify the MCP protocol."
**Right**: Define an abstract interface contract:

```yaml
interfaces:
  SpecificationEngine:
    capabilities:
      tools:
        validate: { input: Specification, output: ValidationResult }
        infer: { input: Specification, output: ExpandedSpecification }
        generate: { input: Specification, output: Artifacts }
      resources:
        schema: { provides: SchemaDefinition }
        examples: { provides: ExampleCollection }
    contracts:
      - "validate is idempotent"
      - "infer expands but never removes"
      - "generate preserves all specification semantics"
```

Whether this gets realized as MCP over stdio, REST over HTTP, gRPC over TCP, or a CLI is an implementation choice. The *specification* says nothing about transport.

#### Gap #16: External Dependencies (Corrected)

**Wrong**: "Use OpenAPI to specify the OpenAI API contract."
**Right**: Define an abstract dependency:

```yaml
dependencies:
  LanguageModelProvider:
    operations:
      complete:
        input: { prompt: String, options: CompletionOptions }
        output: Completion
        contracts:
          - "response contains generated text"
          - "token count <= options.maxTokens"
        qualities:
          latency: "< 30s"
          availability: "99.9%"
```

Whether this is OpenAI's REST API, Anthropic's SDK, or a local Ollama instance is a realization choice. The specification says "I need a language model that accepts prompts and returns completions" -- not "I need to POST to api.openai.com."

#### Gap #10: Configuration (Corrected)

**Wrong**: "Use Terraform patterns for configuration."
**Right**: Define an abstract configuration schema:

```yaml
configurations:
  DatabaseConnection:
    properties:
      host: { type: String, required: true }
      port: { type: Integer, default: 5432 }
      pool: { type: Integer, default: 10 }
    constraints:
      - "pool >= 1"
      - "pool <= 100"
    environments:
      production: { pool: 50 }
      development: { host: "localhost" }
```

Whether this gets realized as Terraform variables, Docker Compose env files, Kubernetes ConfigMaps, or `.env` files is an implementation choice.

#### Gap #17: Analytics / Metrics (Corrected)

**Wrong**: "Use dbt for analytics definitions."
**Right**: Define abstract measures:

```yaml
measures:
  revenue:
    description: "Total completed order revenue"
    source: Order
    aggregation: sum
    field: totalAmount
    filter: "status = completed"
    dimensions: [time, region, product_category]
```

Whether this gets realized as a dbt model, a Cube.js measure, a Looker dimension, or a SQL view is an implementation choice. The abstract semantic definition (what to measure, how to aggregate, what dimensions) is independent of the analytics technology.

---

## Part 3: The Corrected Language Map

### What Genuinely Belongs at the Specification Level

With implementation languages removed, only **two external languages** belong alongside `.specly` at the abstract specification level:

#### Quint — Transformation Logic and State Machines

Quint remains the most valuable external language. Its contributions are genuinely abstract -- state machines, invariants, and temporal properties are implementation-independent:

| Gap | How Quint Helps |
|-----|----------------|
| **#1 Transformation Rules** | Quint's `action` definitions: guarded state transitions with conditions (`all { guard, effect }`), non-deterministic choice (`any { ... }`), composable steps. Inference rules as Quint actions can be model-checked for consistency and completeness. |
| **#7 Recursive Structures** | Quint handles recursive data via functional patterns (`fold`, `map` over recursive structures). |
| **#8 Union / Sum Types** | Native sum types: `type AttributeInput = StringShorthand(str) \| ObjectSyntax(obj) \| ArraySyntax(list)` |
| **#9 Generic Types** | Polymorphic types: `type Result[a, e] = Ok(a) \| Err(e)` |
| **#14 Testing Contracts** | Invariants + simulator + model checker: `val no_invalid_transitions = lifecycles.forall(lc => lc.isValid)` — then `quint verify` proves it. |
| **#15 Workflow / Sagas** | Temporal properties (`always`, `eventually`, `weakFair`): "eventually all compensations complete," "a payment is always followed by a receipt or a refund." |

**Quint covers 6 gaps** (reduced from 7 — Gap #5 Protocol Definitions is now handled as an abstract `.specly` entity type rather than a Quint state machine, though Quint could still model the *behavioural* aspects of a protocol).

If the inference engine's rules were specified in Quint, they could be model-checked for consistency and completeness. You could prove that no two rules conflict, that every model eventually gets a controller, and that the expansion always terminates. This moves SpecVerse's core from "tested with 1,900 unit tests" to "formally verified."

#### Lean — Verification of Correctness Properties

| Gap | How Lean Helps |
|-----|---------------|
| **#14 Testing Contracts** | Proofs, not just tests. Prove convention processing is total (every valid input produces output), inference rules are confluent (order doesn't matter), expanded spec always satisfies the schema. |
| **#1 Transformation Rules** (verification) | Verify properties: "the inference engine never produces a controller without a model," "lifecycle transitions form a DAG." |
| **#2 Convention Definitions** (verification) | Prove convention expansion is deterministic -- `Email required unique` always produces the same structured output regardless of parser state. |

Lean sits at the verification level -- it doesn't fill gaps directly but **proves that the gaps, once filled, are filled correctly**.

#### Wolfram/SymPy — Computational Transformations (Optional)

| Gap | How Wolfram/SymPy Helps |
|-----|------------------------|
| **#3 Template / Code Generation** | Pattern matching and symbolic rewriting for template logic. |
| **#1 Transformation Rules** (alternative expression) | Rule-based rewriting: "pattern → result with conditions." |
| **#2 Convention Definitions** | Pattern matching on convention syntax. |

Genuinely abstract (mathematical transformations are implementation-independent). But the Wolfram blocker (proprietary) remains. SymPy/Julia are open alternatives but less mature for this use case.

---

### What Becomes a .specly Extension Instead

With OpenAPI, Terraform, and dbt removed from the specification level, **more gaps become `.specly` entity type extensions**:

| New Entity Type | Gap(s) Solved | What It Specifies | Realisation Targets |
|----------------|--------------|-------------------|---------------------|
| **`interfaces`** | #5 | Abstract capability contracts (transport-independent) | OpenAPI, gRPC, MCP, CLI |
| **`dependencies`** | #16 | External system requirements (provider-independent) | OpenAI SDK, Anthropic SDK, Ollama |
| **`configurations`** | #10 | Config schemas with constraints and env overrides | Terraform vars, .env, K8s ConfigMap |
| **`errors`** | #11 | Structured error types with severity and recovery | Language-specific error hierarchies |
| **`measures`** | #17 | Analytics definitions (dimensions, metrics, KPIs) | dbt, Cube.js, Looker, SQL views |
| **`commands`** | #4 | CLI definitions (arguments, flags, subcommands) | Commander.js, Click, Cobra |
| **`extensionPoints`** | #6 | Plugin interfaces and registration patterns | Language-specific plugin loaders |
| **`conventions`** | #2 | Convention grammar definitions (self-referential) | Convention processor implementations |

That's **8 new abstract entity types** that keep `.specly` implementation-independent. Each can be *realized* into technology-specific contracts (OpenAPI, Terraform, dbt, etc.) via the existing `manifests` + `realize` architecture.

---

## The Corrected Gap × Language Map

```
┌───────────────────────────────────────────────────────────────────────┐
│              CORRECTED GAP × LANGUAGE MAP                             │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ABSTRACT SPECIFICATION (Level 3)                                     │
│  ────────────────────────────────                                     │
│                                                                       │
│  .specly extensions (new entity types):                               │
│  #2  Convention Definitions      conventions: { ... }                 │
│  #4  CLI Definitions             commands: { ... }                    │
│  #5  Interface Contracts         interfaces: { ... }                  │
│  #6  Plugin Architecture         extensionPoints: { ... }             │
│  #10 Configuration               configurations: { ... }             │
│  #11 Error Handling              errors: { ... }                      │
│  #16 External Dependencies       dependencies: { ... }               │
│  #17 Analytics/Metrics           measures: { ... }                    │
│                                                                       │
│  Quint (abstract transformation logic):                               │
│  #1  Transformation Rules        actions with guards + invariants     │
│  #7  Recursive Structures        functional patterns (fold, map)      │
│  #8  Union Types                 sum types                            │
│  #9  Generic Types               polymorphic types                    │
│  #14 Testing Contracts           invariants + model checking          │
│  #15 Workflow/Sagas              temporal properties                  │
│                                                                       │
│  Wolfram/SymPy (optional):                                            │
│  #3  Template/Generation         symbolic rewriting + pattern match   │
│                                                                       │
│  VERIFICATION (Level 2)                                               │
│  ──────────────────────                                               │
│  Lean:                                                                │
│  #1  Rule consistency            proofs that rules don't conflict     │
│  #2  Convention determinism      proofs that expansion is total       │
│  #14 Correctness properties      proofs that invariants hold          │
│                                                                       │
│  REALISATION TARGETS (Level 1) — outputs, not inputs                  │
│  ───────────────────────────────────────────────────                  │
│  interfaces    → realized as →   OpenAPI, gRPC, MCP, CLI              │
│  dependencies  → realized as →   SDK bindings, REST clients           │
│  configurations → realized as →  Terraform vars, .env, K8s ConfigMap  │
│  measures      → realized as →   dbt models, Cube.js, SQL views       │
│  commands      → realized as →   Commander.js, Click, Cobra           │
│  #12 Caching   →                 quality attribute on interfaces      │
│  #13 Pipelines →                 manifest-level build definitions     │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## The Corrected Hierarchy

The specification hierarchy needs Level 3 split from Level 1:

```
Level 5: Meta-Specification Platform (SpecVerse)
         Convention processors, cross-domain validation

Level 4: Workflow Orchestration (SDD Tools)
         Spec Kit, OpenSpec, GSD, Kiro, Tessl, BMAD

Level 3: Abstract Specification Languages (implementation-independent)
         ┌─────────────────────────────────────────────┐
         │  .specly (extended)       │  Quint           │
         │  ──────────────────       │  ─────           │
         │  models, controllers      │  rules            │
         │  services, events         │  state machines   │
         │  views, lifecycles        │  invariants       │
         │  + interfaces             │  temporal props   │
         │  + dependencies           │  sum types        │
         │  + configurations         │  generics         │
         │  + errors                 │                   │
         │  + measures               │                   │
         │  + commands               │                   │
         │  + extensionPoints        │                   │
         │  + conventions            │                   │
         └─────────────────────────────────────────────┘

Level 2: Verification
         Lean (proofs), Apalache/Z3 (model checking via Quint)

Level 1: Implementation Contracts (realisation targets)
         OpenAPI, Terraform, Protobuf, Prisma, SQL/DDL,
         AsyncAPI, dbt (templates), Commander.js, Docker

Level 0: Implementation
         Generated code
```

**Key changes from the original hierarchy:**
- Level 3 is now explicitly "abstract" -- implementation-independent specifications only
- Level 1 is repositioned as "implementation contracts" -- technology-specific realisations
- OpenAPI, Terraform, and dbt move from Level 3 to Level 1
- Convention processors bridge L5→L3 (intent → abstract spec)
- Instance factories bridge L3→L1 (abstract spec → implementation contract)
- Code generators bridge L1→L0 (implementation contract → code)

This aligns with `.specly`'s existing architecture:
- `components` lives at **Level 3** (abstract)
- `manifests` lives at **Level 1** (implementation contracts)
- `realize` is the bridge between them

---

## The Simplified Two-Language Thesis

With implementation languages properly repositioned, the dogfood test simplifies dramatically:

**At the specification level, SpecVerse needs only two languages:**

| Language | Domain | Gaps Covered |
|----------|--------|-------------|
| **`.specly` (extended)** | Enterprise systems — structure, interfaces, configuration, errors, analytics | 8 gaps via new entity types (#2, #4, #5, #6, #10, #11, #16, #17) |
| **Quint** | Transformation logic — rules, state machines, temporal properties, type system | 6 gaps via abstract formal language (#1, #7, #8, #9, #14, #15) |

Plus **Lean** at Level 2 for verification of both.

Plus **OpenAPI, Terraform, dbt, etc.** at Level 1 as realisation targets (outputs, not inputs).

Plus **Wolfram/SymPy** optionally for computational transformation patterns (#3).

This is cleaner, more honest, and more aligned with SpecVerse's own thesis. "Define Once, Implement Anywhere" means the specification level must be implementation-free. The corrected hierarchy enforces this.

---

## The Strategic Conclusion: The Dogfood Test Proves the Platform (Corrected)

The original conclusion stands, but with a sharper framing:

**The dogfood test doesn't reveal that SpecVerse needs six external languages.** It reveals that:

1. **`.specly` needs ~8 new abstract entity types** (interfaces, dependencies, configurations, errors, measures, commands, extensionPoints, conventions) to cover the structural gaps -- all at the specification level, all implementation-independent.

2. **Quint is the one external language needed at the specification level** -- for transformation logic, state machines, and temporal properties that are fundamentally different from enterprise structure and belong in a different domain language.

3. **OpenAPI, Terraform, dbt, etc. are realisation targets**, not specification peers. They belong in manifests, not components. `.specly` already has the architecture for this distinction.

4. **Lean provides verification** that both `.specly` and Quint specifications are correct -- bridging Level 3 to Level 2.

The convention processor pattern bridges each gap at the right abstraction level:

| Convention | Abstract Specification | Realisation Target |
|-----------|----------------------|-------------------|
| `"retrieve Product"` | `.specly` controller action | OpenAPI GET endpoint |
| `"when model has lifecycle, generate service"` | Quint action with guard | TypeScript inference rule |
| `"email: Email required unique"` | `.specly` convention grammar | Prisma field + Express validator |
| `"lifecycle transitions form a DAG"` | Lean theorem | Property test suite |
| `"need language model with completions"` | `.specly` dependency | OpenAI SDK client |
| `"database connection, pool 10-100"` | `.specly` configuration | Terraform variable / .env file |
| `"revenue = sum of Order.totalAmount"` | `.specly` measure | dbt model / SQL view |

**The dogfood test proves that SpecVerse needs SpecVerse.** The corrected version proves something more specific: SpecVerse needs an extended `.specly` (8 new entity types) plus Quint (transformation logic) at the specification level, with everything else as realisation targets. The meta-specification platform orchestrates two abstract languages and bridges them to many implementation contracts.

This isn't a theoretical argument. It's what falls out when you try to eat your own dog food, honestly document where the fork hits the floor, and then ask whether the fork you reached for was the right one.

---

## Updated Recommendation

The original recommendation (Part 1) stands, with corrections:

5. **Use the dogfood attempt to validate the two-language thesis.** Write the SpecVerse spec using `.specly` (with proposed new entity types) for enterprise structure and Quint for transformation rules. Do NOT use OpenAPI, Terraform, or dbt at the specification level -- if you find yourself reaching for them, you've dropped from specification into implementation. That's the test: can the abstract specification remain implementation-free?

6. **Design the new entity types as abstract-first.** Each new entity type (`interfaces`, `dependencies`, `configurations`, `errors`, `measures`, `commands`, `extensionPoints`, `conventions`) should follow `.specly`'s existing pattern: abstract specification in `components`, technology-specific binding in `manifests`, bridged by `realize`. If an entity type can't be expressed without naming a specific technology, it's not abstract enough.

---

*Analysis produced March 2026, corrected March 2026. Based on specverse-lang v3.5.1 capabilities, the existing tool inventory, and six external analyses (Wolfram, VSDD, Lean, SDD Landscape, Quint, Meta-Specification Proposal). The correction addresses the abstraction problem: implementation languages (OpenAPI, Terraform, dbt) are realisation targets, not specification peers.*
