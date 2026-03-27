# The Dogfood Test: Specifying SpecVerse in .specly

## What's Missing When the Specification Language Tries to Specify Itself

---

## Executive Summary

If you attempted to specify SpecVerse itself — the parser, inference engine, CLI, MCP server, AI orchestrator, diagram generator, VSCode extension, and registry — using `.specly`, you would cover approximately 40-50% of the architecture cleanly. The CRUD/data/lifecycle/event layer maps well to existing primitives.

The remaining 50-60% reveals **17 specific gaps** that cluster around a single insight: `.specly` is excellent at expressing *what* a system consists of but weak at expressing *how* a system transforms, processes, generates, or extends itself.

Critically, most of these gaps do **not** require new entity types. Rigorous examination shows that 5 of the originally proposed 8 new entity types collapse into existing `.specly` primitives — `services` and `models` — with new conventions. Only **3 genuinely new entity types** are needed (`commands`, `conventions`, `measures`), plus **Quint** for transformation logic. This is a validation of `.specly`'s existing abstractions: they're stronger than they first appear.

More importantly, the 3 new entity types reveal a **general extension pattern**: each is a pure *definition* (what to compute, what to invoke, how to expand) that can be *delivered* through any existing primitive (service, controller, view, event, library) and *distributed* through the registry. This "definition → delivery → distribution" pattern is the natural extension pocket for any future domain SpecVerse needs to support.

---

## The Abstraction Principle

Before examining the gaps, one principle must be stated clearly: **specification must be implementation-independent**.

SpecVerse's thesis is "Define Once, Implement Anywhere." If you specify a protocol using OpenAPI, you've already said "implement with HTTP." If you specify infrastructure using Terraform, you've already said "implement on AWS/GCP/Azure." That's implementation leaking into specification — the exact problem SpecVerse exists to solve.

| Language | Abstract or Implementation? | Why |
|----------|---------------------------|-----|
| **.specly** | **Abstract** | `retrieve: {}` says nothing about HTTP vs gRPC vs CLI |
| **Quint** | **Abstract** | State machines, invariants, temporal properties — implementation-independent |
| **Lean** | **Abstract** | Mathematical proofs are the purest abstraction possible |
| **Wolfram/SymPy** | **Abstract** | `f(x) = x² + 2x + 1` is independent of Python vs C vs Julia |
| **OpenAPI** | **Implementation** | `GET /users/{id}` with `200 OK` — that's HTTP, not abstract |
| **Terraform** | **Implementation** | `aws_rds_instance` — that's AWS, not abstract |
| **dbt** | **Mixed** | Semantic layer (measures, dimensions) is abstract; Jinja SQL templates are implementation |
| **Protobuf/gRPC** | **Implementation** | Specific RPC transport binding |
| **AsyncAPI** | **Implementation** | Specific async protocol binding |

**OpenAPI, Terraform, Protobuf, and AsyncAPI are implementation contracts, not abstract specifications.** They are *realization targets* — outputs of the `realize` step, not inputs to the specify step.

`.specly` already embodies this distinction in its three-tier structure:

```
components:    → WHAT (abstract specification)
deployments:   → WHERE (abstract topology)
manifests:     → HOW (implementation mapping)
```

A `.specly` controller says `retrieve: {}`. The *manifest* maps that to a Fastify route. OpenAPI describes the resulting HTTP contract. These are *outputs*, not inputs:

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

Every gap analysis below follows this principle. Solutions are proposed at the abstract specification level, with implementation languages noted only as realization targets.

---

## What .specly CAN Express About Itself

The good news — quite a lot of SpecVerse's architecture maps cleanly to existing primitives:

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

## What's Missing: 17 Gaps in 5 Categories

### Category A: Transformation & Rule Systems

#### Gap #1: Transformation Rules / Rule Engine

This is the biggest gap. The inference engine — SpecVerse's most distinctive feature — is a rule engine with 21+ rules. Each rule has conditions ("when a model has a lifecycle..."), actions ("...generate a lifecycle management service"), priorities, and ordering. There is no way to express this in `.specly`.

**Solution: Quint** — Quint's `action` definitions provide guarded state transitions with conditions (`all { guard, effect }`), non-deterministic choice (`any { ... }`), and composable steps. Inference rules expressed as Quint actions can be model-checked for consistency and completeness. You could prove that no two rules conflict, that every model eventually gets a controller, and that the expansion always terminates.

**Verification: Lean** can prove properties like "the inference engine never produces a controller without a model" and "lifecycle transitions form a DAG."

#### Gap #2: Convention / Pattern Definitions

The convention processor parses `Email required unique verified` into structured AST. But `.specly` can't express the *convention grammar itself* — the rules that define how `Email` maps to format validation, `required` maps to nullability, `unique` maps to a constraint, etc.

**Solution: New `.specly` entity type `conventions`** — this is genuinely new because it's self-referential: the convention grammar defines how conventions are processed, which is how the language itself works. No existing primitive can express "when you see `Email`, it implies format=email and validation=RFC5322, and when modified by `verified`, it adds verification_token and verified_at fields":

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

**Verification: Lean** can prove convention expansion is deterministic — `Email required unique` always produces the same structured output regardless of parser state.

#### Gap #3: Template / Code Generation Logic

Instance factories transform specifications into code (Prisma schemas, Express routes, React components). `.specly` has no concept of templates, string interpolation, output format definitions, or generation rules.

**Solution: Wolfram/SymPy (optional)** — pattern matching and symbolic rewriting for template logic. Alternatively, Quint's rule-based rewriting could express "pattern → result with conditions."

This is the least critical gap — template logic is inherently close to implementation. A pragmatic approach may be to accept this as a gap that lives at the realization level rather than the specification level.

---

### Category B: Interface Definitions

#### Gap #4: CLI / Command-Line Interface

SpecVerse has 30+ CLI commands with subcommands, flags, arguments, help text, stdin/stdout piping, and interactive prompts. `.specly` has controllers with actions, but no CLI-specific constructs.

**Solution: New `.specly` entity type `commands`** — CLI is a genuinely different interface paradigm from controllers or services. Arguments, flags, exit codes, subcommands, positional parameters — none of this maps to CURED operations. A controller says "retrieve Product"; a command says `validate --strict --json file.specly` with exit code 1:

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

**Realization targets**: Commander.js, Click, Cobra — the implementation choice is separate from the specification.

#### Gap #5: Protocol / Interface Definitions

The MCP server implements the Model Context Protocol — tools, resources, prompts, transport layers, capability negotiation. `.specly` can express API endpoints but not protocol semantics.

**Solution: Existing `services` with contract conventions.** A service already defines operations with inputs and outputs. Protocol semantics can be expressed through conventions on service operations:

```yaml
services:
  SpecificationEngine:
    operations:
      validate: { input: Specification, output: ValidationResult, idempotent: true }
      infer: { input: Specification, output: ExpandedSpecification }
      generate: { input: Specification, output: Artifacts }
    contracts:
      - "infer expands but never removes"
      - "generate preserves all specification semantics"
    provides:
      schema: SchemaDefinition
      examples: ExampleCollection
```

Whether this gets realized as MCP over stdio, REST over HTTP, gRPC over TCP, or a CLI is a manifest concern. No new entity type needed — `services` already does this.

**Realization targets**: OpenAPI, gRPC, MCP, CLI adapters.

#### Gap #6: Plugin / Extension Architecture

Convention processors, instance factories, and diagram renderers are all pluggable. `.specly` has no concept of extension points, hooks, plugin interfaces, or registration patterns.

**Solution: Existing `services` (for the interface) + `manifests` (for registration).** The abstract part — "a plugin must implement parse and expand" — is a service definition. The implementation part — "register plugins from this directory" — is a manifest concern:

```yaml
# In components (abstract):
services:
  ConventionProcessor:
    operations:
      parse: { input: String, output: AttributeAST }
      expand: { input: AttributeAST, output: StructuredAttribute }

# In manifests (implementation):
manifests:
  plugins:
    conventionProcessors:
      registration: "convention-processors/"
      loader: "dynamic-import"
```

No new entity type needed — the abstraction is a service, the registration is a manifest.

---

### Category C: Data & Type System Limitations

#### Gap #7: Recursive / Tree Data Structures

The parsed specification is an AST — a tree of nodes where nodes contain other nodes. `.specly` models are essentially flat: attributes are leaf values, not recursive structures. You can't express "a Node has children which are also Nodes."

**Solution: Quint** — handles recursive data via functional patterns (`fold`, `map` over recursive structures).

Existing `.specly` relationship syntax (`hasMany ASTNode` on ASTNode) *might* partially work, but the inference engine and convention processor don't handle self-referential models, and there's no depth/recursion constraint.

#### Gap #8: Union / Sum Types

The convention processor handles multiple input formats (string shorthand, object syntax, array syntax). `.specly` has `values=[a,b,c]` for enums but no proper union types where a field can be "String OR Object OR Array."

**Solution: Quint** — native sum types: `type AttributeInput = StringShorthand(str) | ObjectSyntax(obj) | ArraySyntax(list)`

#### Gap #9: Generic / Parameterised Types

Instance factories are generic over their input type — a `PrismaGenerator<Model>` operates on any model. `.specly` has no way to express type parameters or generics.

**Solution: Quint** — polymorphic types: `type Result[a, e] = Ok(a) | Err(e)`

---

### Category D: Operational Concerns

#### Gap #10: Configuration Hierarchies

`.specverse.yml` has environment variables, provider configs, defaults with overrides, cascading configuration. `.specly` has no concept of configuration schemas with environment-specific overrides.

**Solution: Existing `models` with new conventions.** A configuration schema is structurally a model with attributes. The only additions are default values, environment variable bindings, and environment-specific overrides — all expressible as conventions:

```yaml
models:
  DatabaseConnection:
    attributes:
      host: String required
      port: Integer default=5432 env=PORT
      pool: Integer default=10 env=DB_POOL min=1 max=100
    constraints:
      - "pool >= 1"
      - "pool <= 100"
```

Environment-specific overrides are a deployment concern — they belong in `deployments`, not a new entity type:

```yaml
deployments:
  production:
    config:
      DatabaseConnection: { pool: 50 }
  development:
    config:
      DatabaseConnection: { host: "localhost" }
```

**Realization targets**: Terraform vars, .env, K8s ConfigMap, Docker Compose.

#### Gap #11: Error Handling / Diagnostics

Structured error types, error codes, severity levels, recovery strategies, diagnostic messages with source locations. `.specly` has `requires` and `ensures` for pre/post-conditions but no error type definitions.

**Solution: Existing `models` with severity/code conventions.** An error type is a model:

```yaml
models:
  ValidationError:
    attributes:
      code: String required unique pattern="SPEC_\\d{3}"
      severity: String required values=[error,warning,info]
      message: String required
      file: String
      line: Integer
      column: Integer
      recovery: String
```

No new entity type needed — this is a model with attributes that happen to describe an error. The convention processor could recognise `severity` and `code` patterns and infer error-specific behaviours.

#### Gap #12: Caching Strategies

MCP server has 5-minute TTL caching for command discovery. `.specly` has no concept of caching policies, TTLs, invalidation rules, cache key patterns.

**Solution**: Quality attribute on services or deployment configuration. Caching is an operational concern, not a structural one.

#### Gap #13: Build Pipelines / Multi-Target Compilation

The MCP server builds to 4 targets (local, web, extension, enterprise) with different bundling, dependencies, and entry points. `.specly` has manifests for deployment mapping but not build pipeline definitions.

**Solution**: Manifest-level build definitions. This is inherently implementation-adjacent and best left at the realization level.

---

### Category E: Already-Acknowledged Gaps

These are already noted in the V2 roadmap as known language coverage limits:

#### Gap #14: Testing Contracts

Test cases, assertions, fixtures, mocking strategies, coverage targets. No way to express "given this input, expect this output" or "this property must always hold."

**Solution: Quint** — invariants + simulator + model checker: `val no_invalid_transitions = lifecycles.forall(lc => lc.isValid)` — then `quint verify` proves it.

**Verification: Lean** can go further — proofs, not just tests.

#### Gap #15: Workflow / Saga Orchestration

Multi-step, multi-entity workflows with compensation logic, approval gates, parallel execution, timeout handling. The AI orchestrator has multi-step workflows with approval gates. `.specly` has lifecycles (state machines) but not multi-entity sagas.

**Solution: Quint** — temporal properties (`always`, `eventually`, `weakFair`): "eventually all compensations complete," "a payment is always followed by a receipt or a refund."

#### Gap #16: External API Contracts

Calling external services (OpenAI, Anthropic, Azure, Ollama), authentication methods, retry policies, circuit breakers, rate limits.

**Solution: Existing `services` (abstract need) + `manifests` (provider binding).** "I need something that provides completions" is a service definition. "Bind it to OpenAI" is a manifest:

```yaml
# In components (abstract):
services:
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

# In manifests (provider binding):
manifests:
  ai:
    LanguageModelProvider:
      provider: "openai"
      model: "gpt-4"
      auth: { env: "OPENAI_API_KEY" }
```

The specification says "I need a language model that accepts prompts and returns completions" — not "I need to POST to api.openai.com." The provider binding is a manifest concern. No new entity type needed.

**Realization targets**: OpenAI SDK, Anthropic SDK, Ollama, Azure OpenAI.

#### Gap #17: Analytics / Metrics Definitions

KPIs, dashboards, measures, dimensions, alerting thresholds. The MCP server has monitoring instances but no way to define what to measure or how to alert.

**Solution: New `.specly` entity type `measures`** — this is genuinely new because aggregation semantics are fundamentally different from models. A model says "this field exists"; a measure says "this value is computed by aggregating that field across these dimensions." The semantics (sum, count, avg, with filters and dimensional breakdowns) don't exist in any current `.specly` primitive:

```yaml
measures:
  revenue:
    description: "Total completed order revenue"
    source: Order
    aggregation: sum
    field: totalAmount
    filter: "status = completed"
    dimensions: [time, region, product_category]

  specExpansionRatio:
    description: "Ratio of inferred to authored spec lines"
    source: Specification
    aggregation: avg
    computation: "expandedLines / authoredLines"
    dimensions: [specType, complexity]
```

Whether this gets realized as a dbt model, a Cube.js measure, a Looker dimension, or a SQL view is an implementation choice.

**Realization targets**: dbt, Cube.js, Looker, SQL views.

---

## Priority Assessment

### Tier 1: Would Block the Dogfood Attempt

| Gap | Why It Blocks | Solution | Effort |
|-----|---------------|----------|--------|
| **#1 Transformation Rules** | Can't specify the inference engine — SpecVerse's core value | Quint actions + model checking | Large |
| **#4 CLI Definitions** | Can't specify the primary user interface | New `.specly` `commands` entity type | Medium |
| **#2 Convention Definitions** | Can't specify how conventions work — meta-circular dependency | New `.specly` `conventions` entity type | Large (self-referential) |

### Tier 2: Would Force Awkward Workarounds

| Gap | Workaround | Solution | Effort |
|-----|-----------|----------|--------|
| **#5 Protocol Definitions** | Model as controllers with custom actions | `services` with contract conventions | Small (conventions only) |
| **#6 Plugin Architecture** | Describe informally | `services` (interface) + `manifests` (registration) | Small |
| **#3 Template/Generation Logic** | Document in behaviors/operations, can't validate | Wolfram/SymPy (optional) | Medium |
| **#7 Recursive Data Structures** | Flatten the tree, lose structural accuracy | Quint recursive types | Small |
| **#10 Configuration Hierarchies** | Model as regular models, lose env-override semantics | `models` with default/env conventions | Small (conventions only) |
| **#11 Error Handling** | Model as events or primitives | `models` with severity/code conventions | Small (conventions only) |
| **#16 External Dependencies** | Describe informally | `services` (abstract need) + `manifests` (binding) | Small |
| **#8 Union Types** | Use String with values, lose type safety | Quint sum types | Small |

### Tier 3: Nice-to-Have (Already on Roadmap)

| Gap | Solution | Already Planned? |
|-----|----------|-----------------|
| #14 Testing Contracts | Quint invariants + model checking | Yes (Phase 4 Track A) |
| #15 Workflow Orchestration | Quint temporal properties | Yes (Phase 4 Track A) |
| #17 Analytics/Metrics | New `.specly` `measures` entity type | Yes (Phase 4 Track A) |
| #12 Caching Strategies | Quality attribute on services | No |
| #13 Build Pipelines | Manifest-level definitions | No |
| #9 Generic Types | Quint polymorphic types | No |

---

## The Two-Language Thesis

With implementation languages properly excluded from the specification level, and existing primitives properly credited, the dogfood test simplifies dramatically.

**At the specification level, SpecVerse needs only two languages:**

| Language | Domain | Gaps Covered |
|----------|--------|-------------|
| **`.specly` (extended)** | Enterprise systems — structure, commands, conventions, measures | 3 gaps via new entity types (#2, #4, #17) + 5 gaps via conventions on existing types (#5, #6, #10, #11, #16) |
| **Quint** | Transformation logic — rules, state machines, temporal properties, type system | 6 gaps via abstract formal language (#1, #7, #8, #9, #14, #15) |

Plus **Lean** at Level 2 for verification of both.

Plus **OpenAPI, Terraform, dbt, etc.** at Level 1 as realization targets (outputs, not inputs).

Plus **Wolfram/SymPy** optionally for computational transformation patterns (#3).

### What's Genuinely New vs What's Already There

The initial dogfood analysis proposed 8 new entity types. Rigorous examination — asking "is this actually different from an existing primitive?" — reduces this to 3:

| Proposed Entity Type | Verdict | Why |
|---------------------|---------|-----|
| **`commands`** | **Genuinely new** | CLI is a fundamentally different interface paradigm. Arguments, flags, exit codes, subcommands, positional parameters — none maps to CURED operations or service operations. |
| **`conventions`** | **Genuinely new** | Self-referential grammar definitions. Nothing in `.specly` can express "Email implies format=email, and when modified by `verified`, adds verification_token". This is the meta-circular gap. |
| **`measures`** | **Genuinely new** | Aggregation semantics with dimensions. `revenue: sum of Order.totalAmount where completed, by [time, region]` isn't a model — it's derived, computed, aggregated data with specific semantics. |
| ~~`interfaces`~~ | **= `services`** | A service already defines operations with inputs and outputs. Add contract conventions (`idempotent`, `provides`). |
| ~~`configurations`~~ | **= `models`** | A config schema is a model with default/env conventions: `port: Integer default=3000 env=PORT`. Environment overrides belong in `deployments`. |
| ~~`errors`~~ | **= `models`** | An error type is a model: `severity: String values=[error,warning,info]`, `code: String required unique`. |
| ~~`extensionPoints`~~ | **= `services` + `manifests`** | The interface is a service. The registration mechanism is a manifest concern (implementation). |
| ~~`dependencies`~~ | **= `services` + `manifests`** | "I need completions" is a service. "Bind to OpenAI" is a manifest. |

**This is a validation of `.specly`'s existing abstractions.** The convention system and the components/manifests split are more powerful than they first appear. Most "new" concepts are actually existing concepts viewed through new conventions.

### The 3 New `.specly` Entity Types

| Entity Type | Gap Solved | What It Specifies | Why It Can't Be an Existing Primitive |
|-------------|-----------|-------------------|--------------------------------------|
| **`commands`** | #4 | CLI definitions (arguments, flags, subcommands, exit codes) | Fundamentally different interface paradigm from controllers/services |
| **`conventions`** | #2 | Convention grammar definitions (self-referential meta-rules) | Nothing in `.specly` can define how `.specly` itself processes conventions |
| **`measures`** | #17 | Analytics definitions (aggregations, dimensions, KPIs) | Computed/derived semantics (sum, avg, count with filters) don't exist in models |

### What Quint Covers (Behavioural Half of the Definition Layer)

Quint provides the behavioural half of the extension pocket's definition layer. Where `.specly` entity types define *what exists* (structural), Quint defines *how things behave* (behavioural). Both are pure definitions delivered through the same existing primitives.

| Gap | How Quint Helps | Delivered Through |
|-----|----------------|-------------------|
| **#1 Transformation Rules** | `action` definitions: guarded state transitions with conditions (`all { guard, effect }`), non-deterministic choice (`any { ... }`), composable steps. | `services`: InferenceEngine, `commands`: `specverse infer` |
| **#7 Recursive Structures** | Functional patterns (`fold`, `map` over recursive structures). | `models`: type system extensions |
| **#8 Union / Sum Types** | Native sum types: `type AttributeInput = StringShorthand(str) \| ObjectSyntax(obj) \| ArraySyntax(list)` | `models`: type system extensions |
| **#9 Generic Types** | Polymorphic types: `type Result[a, e] = Ok(a) \| Err(e)` | `models`: type system extensions |
| **#14 Testing Contracts** | Invariants + simulator + model checker: `val no_invalid_transitions = lifecycles.forall(lc => lc.isValid)` — then `quint verify` proves it. | `services`: Validator, `events`: ValidationComplete |
| **#15 Workflow / Sagas** | Temporal properties (`always`, `eventually`, `weakFair`): "eventually all compensations complete," "a payment is always followed by a receipt or a refund." | `services`: WorkflowEngine, `events`: SagaCompleted |

If the inference engine's rules were specified in Quint, they could be model-checked for consistency and completeness. You could prove that no two rules conflict, that every model eventually gets a controller, and that the expansion always terminates. This moves SpecVerse's core from "tested with 1,900 unit tests" to "formally verified."

Quint definitions connect to `.specly` specs via the `behaviour` reference on services (see the extension pocket pattern above), keeping the structural "what" and behavioural "how" cleanly separated but linked.

### New Conventions Needed on Existing Types

The 5 collapsed entity types don't disappear — they become new conventions that extend existing primitives:

| Convention | On Primitive | Example | Gap Solved |
|-----------|-------------|---------|-----------|
| `idempotent` | `services` operations | `validate: { ..., idempotent: true }` | #5 |
| `contracts` | `services` | `contracts: ["infer expands but never removes"]` | #5 |
| `provides` | `services` | `provides: { schema: SchemaDefinition }` | #5 |
| `default` | `models` attributes | `port: Integer default=5432` | #10 |
| `env` | `models` attributes | `host: String env=DATABASE_HOST` | #10 |
| `min`/`max` | `models` attributes | `pool: Integer min=1 max=100` | #10 |
| `severity` | `models` attributes | `severity: String values=[error,warning,info]` | #11 |
| `code` pattern | `models` attributes | `code: String pattern="SPEC_\\d{3}"` | #11 |
| `qualities` | `services` | `qualities: { latency: "< 30s" }` | #16 |
| plugin registration | `manifests` | `registration: "convention-processors/"` | #6 |
| provider binding | `manifests` | `provider: "openai", auth: { env: "..." }` | #16 |

---

## The Extension Pocket Pattern

The 3 genuinely new entity types share a structural insight that goes beyond the dogfood test: **each is a pure definition that is independent of its delivery mechanism**.

A `measure` like `revenue: sum of Order.totalAmount where completed` defines *what* to compute. But it says nothing about *how* that computation reaches a user. The same measure could be:

| Delivery Mechanism | Existing Primitive | Example |
|-------------------|-------------------|---------|
| API operation | `services` | `AnalyticsService.getRevenue(filters, dimensions)` |
| CLI tool | `commands` | `specverse analytics revenue --dimension=region` |
| REST endpoint | `controllers` | `GET /analytics/revenue?dimension=region` |
| Dashboard widget | `views` | A chart component bound to the revenue measure |
| Reactive trigger | `events` | `RevenueThresholdBreached` when revenue crosses a threshold |
| Reusable package | registry `library` | `@specverse/analytics-revenue` |

The analytical *definition* is identical in every case. The delivery is a separate concern — and `.specly` already has primitives for every delivery mechanism.

### The Three-Layer Pattern

This generalises into a clean extension architecture:

```
┌─────────────────────────────────────────────────────────────┐
│  Definition Layer (pure semantics, no delivery)              │
│  ─────────────────                                           │
│                                                              │
│  Structural definitions (.specly entity types):              │
│    measures:     what to compute                             │
│    conventions:  how to expand                               │
│    commands:     what to invoke                              │
│                                                              │
│  Behavioural definitions (Quint):                            │
│    rules:        when to act, what changes                   │
│    invariants:   what must always be true                    │
│    temporal:     what must eventually happen                 │
│                                                              │
│  (future domains follow the same shape —                     │
│   structural via .specly, behavioural via Quint)             │
├─────────────────────────────────────────────────────────────┤
│  Delivery Layer (existing .specly primitives)                │
│  ─────────────────                                           │
│  services, controllers, views,                               │
│  events, lifecycles, models                                  │
│  (universal infrastructure — already built)                  │
├─────────────────────────────────────────────────────────────┤
│  Distribution Layer (registry)                               │
│  ──────────────────                                          │
│  libraries, packages, profiles                               │
│  (already exists at v3.3.2)                                  │
└─────────────────────────────────────────────────────────────┘
```

Each layer is independent:
- **Definition** says *what* a concept means (pure semantics, no implementation)
- **Delivery** says *how* it reaches users (through existing primitives — no new infrastructure)
- **Distribution** says *where* it lives (registry packages — already built)

### Structural and Behavioural Definitions

The definition layer has two complementary halves:

**Structural definitions** (`.specly` entity types) express *what exists* — what to compute, what to invoke, how to expand. These are the 3 new entity types plus any future structural domains.

**Behavioural definitions** (Quint) express *how things behave* — when to act, what must always be true, what must eventually happen. These cover transformation rules, invariants, and temporal properties.

Both halves are pure definitions. Neither says anything about delivery. And both deliver through the same existing primitives:

| Definition | Type | Delivered As | Existing Primitive |
|-----------|------|-------------|-------------------|
| `revenue: sum of Order.totalAmount` | Structural (measure) | API operation | `services`: `Analytics.getRevenue()` |
| `revenue: sum of Order.totalAmount` | Structural (measure) | CLI tool | `commands`: `specverse analytics revenue` |
| `revenue: sum of Order.totalAmount` | Structural (measure) | Dashboard | `views`: revenue chart component |
| `revenue: sum of Order.totalAmount` | Structural (measure) | Alert | `events`: `RevenueThresholdBreached` |
| `action expandLifecycle = all { ... }` | Behavioural (rule) | API operation | `services`: `InferenceEngine.expand()` |
| `action expandLifecycle = all { ... }` | Behavioural (rule) | CLI tool | `commands`: `specverse infer file.specly` |
| `action expandLifecycle = all { ... }` | Behavioural (rule) | Event | `events`: `InferenceComplete` |
| `val noOrphanControllers = ...` | Behavioural (invariant) | Validation step | `services`: `Validator.checkInvariants()` |
| `eventually(compensated)` | Behavioural (temporal) | Test/verification | `services`: `Verifier.checkProperty()` |

The structural definition and the behavioural definition are different things — but they share the same delivery and distribution infrastructure. This is why the two-language thesis works: `.specly` and Quint aren't competing, they're complementary halves of the definition layer, both feeding into the same delivery pipeline.

### How Quint Definitions Connect to .specly Specs

A `.specly` service references its Quint behaviour, creating the bridge between structural and behavioural definitions:

```yaml
# .specly component (structural — what the service is)
services:
  InferenceEngine:
    operations:
      expand: { input: Specification, output: ExpandedSpecification }
    behaviour: "inference-rules.qnt"    # ← Quint definitions
    contracts:
      - "expansion always terminates"   # ← human-readable summary
      - "no two rules conflict"         #    of Quint invariants
```

```
# inference-rules.qnt (behavioural — how the service behaves)
action expandLifecycle = all {
  model.hasLifecycle,
  model' = model.with("services",
    model.services.union(Set(lifecycleService)))
}

val noConflictingRules = rules.forall(r1 =>
  rules.forall(r2 =>
    r1 != r2 implies not(r1.conflicts(r2))))

val expansionTerminates = eventually(state.isFullyExpanded)
```

The service is the delivery mechanism. The Quint file is the behavioural definition. The contract statements are human-readable summaries of what the Quint invariants prove. The manifest binds it all to a TypeScript implementation.

### The Convention Layer: Making Quint Accessible

There's a problem with the picture above. The `.specly` structural half has a convention layer — you write `Email required unique verified` and the convention processor expands it into format validation, uniqueness constraints, verification tokens. That's what makes `.specly` accessible to every developer, not just schema experts.

**Quint has no convention layer.** You have to write:

```
action expandLifecycle = all {
  model.hasLifecycle,
  model' = model.with("services",
    model.services.union(Set(lifecycleService)))
}

val noConflictingRules = rules.forall(r1 =>
  rules.forall(r2 =>
    r1 != r2 implies not(r1.conflicts(r2))))
```

That's expert-level formal specification. The accessibility gap between `.specly`'s convention syntax and Quint's raw syntax is enormous. A developer who can write `email: Email required unique verified` cannot write that Quint.

**The convention processor is precisely what closes this gap** — for both halves of the definition layer:

| Human intent (convention) | Formal expansion |
|--------------------------|------------------|
| `when model has lifecycle, generate lifecycleService` | `action expandLifecycle = all { model.hasLifecycle, model' = model.with("services", model.services.union(Set(lifecycleService))) }` |
| `rules must not conflict` | `val noConflict = rules.forall(r1 => rules.forall(r2 => r1 != r2 implies not(r1.conflicts(r2))))` |
| `saga eventually completes compensation` | `temporal eventually(saga.compensations.forall(c => c.isComplete))` |
| `expansion always terminates` | `temporal eventually(state.isFullyExpanded)` |
| `no orphan controllers` | `val noOrphans = controllers.forall(c => models.exists(m => m.name == c.model))` |

And here's where it gets recursive: **the `conventions` entity type — one of the 3 genuinely new types — is the mechanism for defining Quint's convention layer.** Behavioural convention grammars are defined using the same `conventions` entity type that defines structural convention grammars:

```yaml
# Structural conventions (already exist — .specly expansion)
conventions:
  Email:
    baseType: String
    implies:
      format: "email"
      validation: "RFC 5322"
    when_modified_by:
      verified: { adds: [verification_token, verified_at] }

# Behavioural conventions (new — Quint expansion)
conventions:
  when_has_generate:
    domain: "quint"
    pattern: "when {entity} has {property}, generate {target}"
    expands_to: "quint:action"
    template:
      guard: "{entity}.has{Property}"
      effect: "{entity}' = {entity}.with({target})"

  must_not_conflict:
    domain: "quint"
    pattern: "{collection} must not conflict"
    expands_to: "quint:invariant"
    template:
      body: "{collection}.forall(a => {collection}.forall(b =>
              a != b implies not(a.conflicts(b))))"

  eventually_completes:
    domain: "quint"
    pattern: "{process} eventually completes {phase}"
    expands_to: "quint:temporal"
    template:
      body: "eventually({process}.{phase}.forall(s => s.isComplete))"
```

Both convention grammars — structural and behavioural — are defined using the same entity type, processed by convention processors that follow the same architecture, delivered through the same services, and distributed through the same registry.

This completes the picture of what Level 5 (Meta-Specification Platform) actually means:

```
Level 5: Convention Layer (human intent → formal specification)
    │
    ├── Structural conventions     → .specly convention processor → .specly definitions
    │   "Email required unique"
    │
    └── Behavioural conventions    → Quint convention processor   → Quint definitions
        "rules must not conflict"
    │
    ▼
Level 3: Definition Layer (formal, verified)
    ├── .specly (structural — what exists)
    └── Quint (behavioural — how it behaves)
    │
    ▼
Delivery Layer (existing primitives)
    services, controllers, views, events
    │
    ▼
Distribution Layer (registry)
    libraries, packages, profiles
```

**Without convention processors, each domain is an expert tool.** `.specly` without conventions would require spelling out every attribute, constraint, and validation rule. Quint without conventions requires expert knowledge of formal methods.

**With convention processors, every domain is accessible to every developer.** You write `Email required unique verified` for structural intent and `rules must not conflict` for behavioural intent. The convention processors expand both into formal specifications. The human never needs to write raw Quint any more than they need to write raw JSON Schema.

This is what makes Level 5 the meta-specification *platform* rather than just two specification languages bolted together. The convention processor pattern — human-readable intent expanded into formal specifications — applies uniformly to both halves of the definition layer. And the `conventions` entity type makes this self-describing: the convention grammars for both halves are themselves defined in `.specly`.

### Why This Matters for Extensibility

When someone wants to add a new domain to SpecVerse, the pattern is:

1. **Define** the domain's concepts at the definition layer:
   - Structural concepts as a new `.specly` entity type (what exists)
   - Behavioural concepts in Quint (how it behaves, what must be true)
2. **Deliver** through existing primitives — no new controllers, services, or views needed
3. **Distribute** as a registry library — immediately shareable

Each of the 3 new entity types already follows this pattern:

**`conventions`** — *Structural*: define how `Email required unique verified` expands. *Behavioural*: Quint invariants proving expansion is deterministic and total. *Delivery*: convention processor as a service, `specverse conventions list` as a command. *Distribution*: `@specverse/conventions-auth`.

**`commands`** — *Structural*: define what `validate --strict file.specly` means. *Behavioural*: Quint state machine for command parsing and execution flow. *Delivery*: Commander.js (manifest), MCP (service). *Distribution*: `@specverse/cli-validate`.

**`measures`** — *Structural*: define what `revenue = sum of Order.totalAmount` means. *Behavioural*: Quint invariant that revenue is never negative, temporal property that alerts eventually fire. *Delivery*: service operation, CLI command, dashboard view, alerting event. *Distribution*: `@specverse/analytics-ecommerce`.

### The Extension Pocket

This creates a natural **pocket** where new domains slot in without disrupting existing architecture:

```
Delivery infrastructure (already built — doesn't grow):
  models, controllers, services, events, views, lifecycles,
  storage, deployments, manifests

Definition pocket (extensible — new domains go here):
  Structural (.specly)         Behavioural (Quint)
  ───────────────────          ────────────────────
  commands                     command execution rules
  conventions                  expansion determinism proofs
  measures                     aggregation invariants
  (future structural)          (future behavioural)

Distribution infrastructure (already built — doesn't grow):
  registry, libraries, packages, profiles
```

The existing primitives become **universal delivery infrastructure**. New domains don't need to invent their own controllers, services, events, or views — they define their structural and behavioural concepts and plug into what's already there.

This is also the answer to "how does the meta-specification platform scale?" Each new domain is a definition-layer addition — structural entity types in `.specly` plus behavioural specifications in Quint, with a convention processor bridging them. It gets delivered through existing primitives and distributed through the existing registry. **The platform grows at the definition layer only.** The delivery and distribution layers are already built and don't need to change.

### Future Domains Follow the Same Shape

Any domain SpecVerse might add in the future fits the same pocket — structural definition, behavioural definition, convention grammar for accessibility, delivery through existing primitives, distribution through the registry:

| Future Domain | Structural (.specly) | Behavioural (Quint) | Convention Grammar | Distribution |
|--------------|---------------------|--------------------|--------------------|-------------|
| **Formal verification** | Proof obligations, correctness criteria | Lean proofs (via Quint bridge) | `"totalAmount never negative"` → Lean theorem | `@specverse/verification-core` |
| **Workflow orchestration** | Saga definitions, compensation steps | Temporal properties, fairness | `"approval required before deploy"` → Quint saga | `@specverse/workflows-approval` |
| **Data pipelines** | Pipeline stages, data sources | Ordering invariants, completeness | `"daily ETL from orders"` → pipeline definition | `@specverse/pipelines-etl` |
| **External integrations** | API contracts, retry policies | Circuit breaker state machines | `"retry 3 times with backoff"` → Quint state machine | `@specverse/integrations-stripe` |

The pattern is always: define → deliver → distribute. Structure in `.specly`, behaviour in Quint, convention grammars for accessibility, delivery through existing primitives, distribution through the registry. The convention layer ensures that every domain is accessible to every developer, not just domain experts.

---

## The Gap × Language Map

```
┌───────────────────────────────────────────────────────────────────────┐
│                       GAP × LANGUAGE MAP                              │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ABSTRACT SPECIFICATION (Level 3)                                     │
│  ────────────────────────────────                                     │
│                                                                       │
│  .specly — 3 new entity types:                                        │
│  #2  Convention Definitions      conventions: { ... }                 │
│  #4  CLI Definitions             commands: { ... }                    │
│  #17 Analytics/Metrics           measures: { ... }                    │
│                                                                       │
│  .specly — existing primitives with new conventions:                  │
│  #5  Interface Contracts         services with contract conventions   │
│  #6  Plugin Architecture         services + manifests                 │
│  #10 Configuration               models with default/env conventions  │
│  #11 Error Handling              models with severity/code patterns   │
│  #16 External Dependencies       services + manifest bindings         │
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
│  REALIZATION TARGETS (Level 1) — outputs, not inputs                  │
│  ───────────────────────────────────────────────────                  │
│  services      → realized as →   OpenAPI, gRPC, MCP, CLI              │
│  services      → realized as →   SDK bindings, REST clients           │
│  models        → realized as →   Terraform vars, .env, K8s ConfigMap  │
│  measures      → realized as →   dbt models, Cube.js, SQL views       │
│  commands      → realized as →   Commander.js, Click, Cobra           │
│  #12 Caching   →                 quality attribute on services        │
│  #13 Pipelines →                 manifest-level build definitions     │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## The Specification Hierarchy

```
Level 5: Meta-Specification Platform (SpecVerse)
         Convention processors bridge human intent → formal spec
         ┌─────────────────────────────────────────────────┐
         │  STRUCTURAL CONVENTIONS  │  BEHAVIOURAL CONVNS  │
         │  ──────────────────────  │  ──────────────────  │
         │  "Email required unique" │  "rules must not     │
         │  → .specly attributes   │   conflict"          │
         │                          │  → Quint invariant   │
         └─────────────────────────────────────────────────┘
         Convention grammars for both halves are defined
         using the `conventions` entity type (self-describing)

Level 4: Workflow Orchestration (SDD Tools)
         Spec Kit, OpenSpec, GSD, Kiro, Tessl, BMAD

Level 3: Abstract Specification — the Definition Layer
         ┌─────────────────────────────────────────────────┐
         │  STRUCTURAL              │  BEHAVIOURAL          │
         │  (.specly)               │  (Quint)              │
         │  ──────────────────      │  ──────────────────   │
         │                          │                       │
         │  Delivery primitives:    │  Transformation:      │
         │  models, controllers     │  rules, actions       │
         │  services, events        │  state machines       │
         │  views, lifecycles       │                       │
         │                          │  Verification:        │
         │  Definition pocket:      │  invariants           │
         │  + commands              │  temporal properties  │
         │  + conventions           │                       │
         │  + measures              │  Type system:         │
         │  + (future domains)      │  sum types, generics  │
         │                          │  + (future domains)   │
         │  (plus new conventions   │                       │
         │   on existing types)     │                       │
         └─────────────────────────────────────────────────┘
         Both halves deliver through the same primitives
         and distribute through the same registry.

Level 2: Verification
         Lean (proofs), Apalache/Z3 (model checking via Quint)

Level 1: Implementation Contracts (realization targets)
         OpenAPI, Terraform, Protobuf, Prisma, SQL/DDL,
         AsyncAPI, dbt (templates), Commander.js, Docker

Level 0: Implementation
         Generated code
```

**Key architectural alignment:**
- Level 5 convention processors serve **both halves** of Level 3 — structural conventions expand into `.specly`, behavioural conventions expand into Quint
- Convention grammars for both halves are defined using the `conventions` entity type, making the platform self-describing
- Level 3 has two complementary halves: structural (`.specly`) and behavioural (Quint)
- Both halves share the same delivery primitives and distribution registry
- The "definition pocket" is where new domains slot in — structural concepts as `.specly` entity types, behavioural concepts in Quint, both with convention grammars
- Level 1 is "implementation contracts" — technology-specific realizations (outputs, not inputs)
- Convention processors bridge L5→L3 (intent → abstract spec, for both halves)
- Instance factories bridge L3→L1 (abstract spec → implementation contract)
- Code generators bridge L1→L0 (implementation contract → code)
- `.specly` `components` live at **Level 3** (abstract)
- `.specly` `manifests` live at **Level 1** (implementation contracts)
- `realize` is the bridge between them

---

## The Meta-Insight

The dogfood test reveals three things:

**First, the gaps cluster around "how things work" rather than "what things are."** `.specly` is excellent at expressing *what* a system consists of (models, relationships, lifecycles, events, endpoints). It is weak at expressing *how* a system transforms, processes, generates, or extends itself. This is exactly where Quint belongs as a peer domain language.

**Second, `.specly`'s existing abstractions are stronger than they first appear.** The initial reaction to each gap was "we need a new entity type." But rigorous examination — asking "is `interfaces` actually different from `services`?" and "is `configurations` actually different from `models`?" — shows that 5 of 8 proposed entity types collapse into existing primitives with new conventions. The components/deployments/manifests three-tier split already handles the abstract-vs-implementation distinction for most cases.

**Third, the 3 genuinely new entity types and Quint together reveal a general extension pattern.** The definition layer has two halves — structural (`.specly` entity types: what exists) and behavioural (Quint: how it behaves). Both deliver through the same existing primitives and distribute through the same registry. This "definition → delivery → distribution" pattern is the natural pocket where any future domain slots in. The platform scales at the definition layer — adding structural concepts in `.specly` and behavioural concepts in Quint — without growing at the delivery or distribution layers, because those layers are already built.

**Fourth, the convention layer must serve both halves.** Quint without conventions is an expert tool — raw formal methods syntax that most developers can't write. The same convention processor pattern that makes `.specly` accessible ("Email required unique" → structured attributes) must also make Quint accessible ("rules must not conflict" → formal invariant). The `conventions` entity type is the mechanism for defining convention grammars for *both* halves, making the platform self-describing. This is what makes Level 5 a platform rather than two expert languages.

This means the real work is:
- **3 genuinely new entity types** (commands, conventions, measures) as instances of the definition → delivery → distribution pattern
- **~11 new conventions** on existing types (idempotent, default, env, severity, contracts, qualities, etc.) for concepts that are structurally the same but semantically richer
- **Quint** for transformation logic that is fundamentally different from enterprise structure
- **Convention processors for both halves** — structural conventions expanding into `.specly`, behavioural conventions expanding into Quint
- **The extension pocket** as a documented, repeatable pattern for adding future domains (each with structural + behavioural definitions + convention grammars)

---

## Connection to Previous Analyses

| Analysis | Relevant Gap |
|----------|-------------|
| **Quint** | Quint has transformation rules (state transitions with invariants) and model checking. SpecVerse's Tier 1 gaps overlap with what Quint already solves for distributed systems. |
| **SDD Landscape** | The SDD tools lack everything `.specly` already has (formal language, validation, inference). But they have workflow orchestration (Gap #15) that `.specly` lacks. |
| **Lean/de Moura** | Testing contracts (Gap #14) and formal verification connect directly to the L3→L2 bridge that Lean provides. |
| **Wolfram** | Computational specification (Gap #3, templates/generation) is what Wolfram Language does for mathematical domains. |
| **VSDD** | Convention definitions (Gap #2) are the formal version of what VSDD calls "domain purity boundaries." |
| **Meta-Specification Proposal** | The Tier 1 gaps are precisely the extension points that domain-specific spec languages need. Solving them enables the platform. |

---

## Recommendation

**Don't try to solve all 17 gaps at once.** Instead, use the dogfood test strategically:

1. **Write the `.specly` spec for SpecVerse using current primitives** — cover the 40-50% that works today. This is a powerful demonstration and identifies exactly where the language hits its limits in practice, not theory.

2. **Prioritise Tier 1 gaps based on which enables the most downstream value:**
   - **Transformation Rules** → enables specifying inference engines, convention processors, and any rule-based system
   - **Convention Definitions** → enables self-describing convention processors and the meta-specification platform
   - **CLI Definitions** → enables specifying developer tools (valuable but less strategic)

3. **Add conventions to existing types before adding new entity types.** The 11 new conventions (idempotent, default, env, severity, contracts, qualities, etc.) are lower effort and higher leverage than the 3 new entity types. They extend what already works.

4. **Use Tier 2 workarounds** for the immediate dogfood attempt — model protocols as services with contract conventions, flatten recursive structures, use String for union types. Accept the compromises and document where they hurt.

5. **Let Tier 3 gaps follow the existing Phase 4 roadmap** — they're already planned and their priority is validated by the dogfood test.

6. **Use the dogfood attempt to validate the two-language thesis.** Write the SpecVerse spec using `.specly` for enterprise structure and Quint for transformation rules. Do NOT use OpenAPI, Terraform, or dbt at the specification level — if you find yourself reaching for them, you've dropped from specification into implementation.

7. **Design new conventions and entity types as abstract-first.** If a convention can't be expressed without naming a specific technology, it's not abstract enough.

8. **Document the extension pocket pattern.** Every new entity type should follow definition → delivery → distribution. If a proposed entity type can't be delivered through existing primitives, question whether it's truly a definition or whether it's leaking delivery concerns. This pattern is how the meta-specification platform scales.

The dogfood test isn't just an exercise — it's the fastest path to discovering which language extensions actually matter, because you experience the gaps firsthand instead of theorising about them.

---

## The Strategic Conclusion

**The dogfood test proves that `.specly`'s existing abstractions cover more than initially expected.** It reveals that:

1. **`.specly` needs only 3 genuinely new entity types** (commands, conventions, measures) — not 8. The other 5 collapse into existing `services` and `models` with new conventions, validating the strength of `.specly`'s current primitives.

2. **The 3 new entity types and Quint together reveal a general extension pattern** — definition → delivery → distribution. The definition layer has two complementary halves: structural (`.specly` entity types) and behavioural (Quint). Both define pure semantics, both get delivered through existing primitives (services, controllers, views, events), and both get distributed through the registry. This is the repeatable pocket where any future domain slots in — structural concepts as `.specly` entity types, behavioural concepts in Quint.

3. **~11 new conventions on existing types** extend `.specly`'s coverage without new structural concepts — idempotent operations, default values, env bindings, severity levels, contracts, quality attributes, and manifest-level provider bindings.

4. **Quint is the behavioural half of the definition layer** — for transformation logic, state machines, and temporal properties. It complements `.specly`'s structural half, and both deliver through the same existing primitives.

5. **Quint needs a convention layer**, just as `.specly` has one. Without it, Quint is an expert tool inaccessible to most developers. The `conventions` entity type defines convention grammars for *both* halves — structural (`Email required unique` → `.specly` attributes) and behavioural (`rules must not conflict` → Quint invariant). This is what makes Level 5 a platform.

6. **OpenAPI, Terraform, dbt, etc. are realization targets**, not specification peers. They belong in manifests, not components. `.specly` already has the architecture for this distinction.

7. **Lean provides verification** that both `.specly` and Quint specifications are correct — bridging Level 3 to Level 2.

The convention processor pattern bridges each gap at the right abstraction level — for both structural and behavioural specifications:

| Convention | Type | Formal Expansion | Realization Target |
|-----------|------|-----------------|-------------------|
| `"retrieve Product"` | Structural | `.specly` controller action | OpenAPI GET endpoint |
| `"email: Email required unique"` | Structural | `.specly` structured attributes | Prisma field + Express validator |
| `"need language model with completions"` | Structural | `.specly` service definition | OpenAI SDK client |
| `"database connection, pool 10-100"` | Structural | `.specly` model with conventions | Terraform variable / .env file |
| `"revenue = sum of Order.totalAmount"` | Structural | `.specly` measure | dbt model / SQL view |
| `"when model has lifecycle, generate service"` | Behavioural | Quint action with guard | TypeScript inference rule |
| `"rules must not conflict"` | Behavioural | Quint invariant | Model checker verification |
| `"saga eventually completes compensation"` | Behavioural | Quint temporal property | Runtime saga monitor |
| `"lifecycle transitions form a DAG"` | Verification | Lean theorem | Property test suite |

**The dogfood test proves that SpecVerse needs SpecVerse** — but less of it than we thought. The existing abstractions are strong. Extend them with conventions, add 3 genuinely new structural entity types, bring in Quint as the behavioural complement with its own convention layer, and the definition layer is complete. Both halves deliver through the same existing primitives, distribute through the same registry, and are made accessible through convention processors defined using the same `conventions` entity type. The extension pocket pattern then provides a repeatable, scalable way for any future domain to slot in — structural concepts in `.specly`, behavioural concepts in Quint, convention grammars for accessibility, all delivered and distributed through infrastructure that's already built.

---

*Analysis produced March 2026. Based on specverse-lang v3.5.1 capabilities, the existing tool inventory, and six external analyses (Wolfram, VSDD, Lean, SDD Landscape, Quint, Meta-Specification Proposal). Four principles applied throughout: (1) implementation languages are realization targets, not specification peers; (2) existing primitives should be extended via conventions before proposing new entity types; (3) new entity types should follow the definition → delivery → distribution extension pocket pattern; (4) every domain — including Quint — needs a convention layer to be accessible, and the `conventions` entity type is the self-describing mechanism for defining them all.*
