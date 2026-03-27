# SpecVerse Meta-Specification Proposal

**Date**: February 2026
**Author**: Mark (IGM) — SpecVerse Creator
**Analysis**: Claude (Opus 4.6)

---

## The Proposal

> We have established that having a specification language is a good thing and that the areas that specly covers it does well. We have also established that specly does not cover all the use cases (analytics etc). In materialisation/realisation terms we can have well-understood parts that can use definitive libs to generate concrete, repeatable solutions and LLM-generated solutions for the less well-understood parts. Finally we can have repositories of existing components so that reuse can be established.
>
> My idea is that we should **go meta** — not have one specification language for all, but allow multiple spec languages for different problem types. We would need the SpecVerse CLI and implementation to allow the use of multiple — each spec domain would have a domain def, lang def, implementation libs and a repo. SpecVerse would then orchestrate these spec domains together to provide solutions.
>
> The key point then becomes the **meta definition of spec domains/scope** so that this orchestration could occur. The current specly would be the solution for the domain of enterprise CURVED services etc. We would then need to search for other spec languages for the other domains.

---

## Analysis

This is a genuinely interesting architectural question about the future of SpecVerse. What's being proposed is a fundamental shift: from a monolithic specification language that tries to cover everything, to a meta-specification orchestration platform that coordinates multiple domain-specific languages. Let me work through this carefully.

### Restating the Core Idea

The proposal has several interlocking parts:

1. **Accept the boundary**: Instead of extending .specly to cover analytics, pipelines, infrastructure, ML, workflows, etc., acknowledge that each of these problem domains has a fundamentally different shape and deserves its own specification language.

2. **Each domain gets a full stack**: Not just a language, but a complete package — domain definition (what it covers), language definition (syntax and schema), implementation libraries (how specs become code), and a repository (reusable components).

3. **SpecVerse becomes the orchestrator**: The CLI, toolchain, and platform coordinate across domains rather than owning a single domain's language.

4. **The current .specly becomes Domain #1**: Enterprise CURVED services — models, controllers, views, events, lifecycles, deployments — remain the flagship domain. It's not replaced; it's contextualised.

5. **Other domains adopt existing spec languages**: Rather than inventing new languages for analytics or infrastructure, adopt and integrate existing battle-tested ones (dbt, Terraform, OpenAPI, AsyncAPI, etc.).

6. **The meta-schema is the key innovation**: The definition of what constitutes a "spec domain" and how domains interact — that's where the real design challenge and value proposition lives.

### The Pros

#### 1. The Coverage Gap Disappears by Design

This is the most immediately compelling argument. The current .specly language covers enterprise CURVED services well — models, controllers, views, events, lifecycles, deployments. But the v4 introduction document honestly acknowledges significant gaps:

- **Analytics and reporting** — measures, dimensions, aggregations, dashboards
- **Data pipelines** — ETL/ELT, stream processing, transformation chains
- **ML/AI workflows** — training pipelines, model serving, feature stores
- **Infrastructure** — networking, compute, storage provisioning
- **Integration patterns** — message queues, event buses, API gateways
- **Workflow orchestration** — long-running processes, approval chains, saga patterns

Each of these has a fundamentally different shape. An analytics measure isn't a CURVED operation. A Terraform resource isn't a model with a lifecycle. A dbt transformation isn't a controller endpoint. Trying to shoehorn all of these into one grammar leads to what I'd call the "UML trap" — a language so general it loses the ability to express any domain idiomatically.

By going meta, the coverage gap stops being a weakness to apologise for and becomes an explicit architectural boundary. Each domain gets a language optimised for its specific problem space. The question shifts from "when will .specly support analytics?" to "which analytics specification language should SpecVerse integrate?"

#### 2. It Mirrors How the Industry Actually Works

The best specification languages are already domain-specific. Nobody has successfully built a single specification language that covers all of these:

| Domain | Existing Spec Languages | Maturity |
|--------|------------------------|----------|
| REST APIs | OpenAPI (Swagger) | Very high — industry standard |
| Async APIs | AsyncAPI | High — growing adoption |
| Infrastructure | Terraform HCL, Pulumi, CloudFormation | Very high |
| Data Transformation | dbt | Very high in data engineering |
| Schema Definition | JSON Schema, Protobuf, Avro | Very high |
| Workflows | Temporal definitions, Step Functions ASL | Medium-high |
| CI/CD | GitHub Actions YAML, GitLab CI | Very high |
| Event Schemas | CloudEvents, AsyncAPI | Medium-high |
| Observability | OpenTelemetry, Prometheus rules | High |
| API Gateway | Kong declarative config, AWS API Gateway | Medium-high |

The industry has voted with its feet: domain-specific wins. Each of these languages has years of refinement, active communities, extensive tooling, and battle-tested edge cases. SpecVerse positioning itself as the orchestration layer above these — providing the cross-domain intelligence that none of them individually offer — is strategically much stronger than trying to compete with each of them on their home turf.

#### 3. It Leverages Rather Than Replaces

This is a crucial strategic distinction. Building an analytics DSL from scratch means:
- Designing the grammar (months of work)
- Building the parser (significant engineering)
- Defining the inference rules (domain expertise needed)
- Creating implementation libraries (per-framework)
- Building adoption (competing with dbt's community)

Integrating dbt as a domain means:
- Defining how dbt models map to SpecVerse's entity model
- Writing a domain adapter (weeks, not months)
- Getting cross-domain inference "for free" (once the orchestration protocol exists)
- Tapping into dbt's existing community and tooling

The leverage ratio is enormous. Each domain you integrate brings its own validation, its own implementation tooling, its own community knowledge. SpecVerse adds the unique value: cross-domain orchestration, unified validation, and inference across domain boundaries.

#### 4. The Existing Architecture Has the Right Bones

Looking at the current SpecVerse codebase, several existing design decisions already point toward this future:

- **The manifest system** already abstracts implementation details behind capability mappings. A manifest says "Express provides http-server, Drizzle provides orm" — it doesn't hardcode how models become database tables. This abstraction could extend to "dbt provides data-transformation, Terraform provides infrastructure-provisioning."

- **The plugin architecture** already supports extensibility. The inference engine operates on declarative rules that could be parameterised by domain. Adding a new inference rule set for a new domain is architecturally consistent with how the engine already works.

- **The registry concept** already contemplates component repositories. Domain-specific component registries are a natural extension.

- **The CURVED model** provides a universal vocabulary for service operations. While not every domain maps cleanly to Create/Update/Retrieve/Validate/Evolve/Delete, the concept of a bounded set of operations per domain is transferable. An analytics domain might have Measure/Aggregate/Filter/Pivot/Visualise. An infrastructure domain might have Provision/Scale/Migrate/Destroy.

- **The two-mode architecture** (Generative/Deterministic) applies across domains. Any domain language benefits from having an AI-assisted exploration mode and a deterministic, repeatable realisation mode.

#### 5. The Convention Processor Pattern Transfers to Every Domain

The deepest architectural insight is that .specly's convention processor — the mechanism that expands `email: Email required unique verified` into full schema, validation, constraints, and endpoints — isn't specific to enterprise services. It's a **universal pattern** that applies to every domain.

Every domain in the meta-specification platform would have three layers:

1. **A human-readable convention layer** — the intent vocabulary developers actually write
2. **A convention processor** — deterministic expansion rules that translate intent into formal language
3. **A formal target language** — the precise, machine-verifiable output

```
Human intent (conventions) → Convention processor → Domain-specific formal language
```

This pattern repeats across domains:

| Domain | Convention (human writes) | Formal Target (machine produces) |
|--------|--------------------------|----------------------------------|
| Enterprise services | `email: Email required unique verified` | JSON Schema + DB DDL + validation middleware + controller endpoints |
| Computational logic | `totalAmount equals sum of lineItems.amount` | Wolfram Language symbolic expression |
| Formal verification | `totalAmount never negative` | Dafny contract + property-based test + proof harness |
| Analytics | `revenue: sum of Order.totalAmount where completed` | dbt model + Cube.js measure definition |
| Infrastructure | `database: postgres ha replicas:3` | Terraform HCL + monitoring config |

The convention processor is what makes each domain **accessible**. Without it, developers must learn Dafny's `forall` quantifiers, Wolfram's symbolic notation, Terraform's HCL syntax, and dbt's Jinja templating — each with its own learning curve. With it, they express intent in a bounded vocabulary of human-readable conventions, and the convention processor handles the translation.

This means the meta-schema's definition of "what constitutes a domain" must include the convention layer as a first-class component — not optional, but required. A domain without a convention processor is just another expert tool. A domain with a convention processor is accessible to every developer.

#### 6. It Transforms SpecVerse's Market Position

This shifts SpecVerse from "a specification language" (competing with individual tools) to "the specification platform" (a category of one). The value proposition becomes: "You already use OpenAPI, Terraform, and dbt. SpecVerse makes them work together intelligently." That's a much easier sell than "replace all your tools with our universal language."

It also creates a flywheel: each new domain integration makes the platform more valuable for existing users, which attracts more domain integrators, which makes the platform more valuable. This is the Kubernetes ecosystem dynamic.

### The Cons

#### 1. The Orchestration Protocol Is the Hardest Part to Design

What does it actually mean for SpecVerse to "orchestrate" multiple spec domains? This question sounds simple but hides enormous complexity. There are several possible orchestration models:

**Import model**: Specs reference entities across domains directly.
```yaml
# In analytics domain
measure:
  revenue:
    source: enterprise-services.Order.totalAmount  # cross-domain ref
    aggregation: sum
```
This is the most flexible but creates tight coupling between domains. If the Order model changes, the analytics spec breaks. You need a dependency graph, version compatibility, and change propagation.

**Shared entity model**: A common entity registry that each domain extends with its own view.
```yaml
# Meta-level shared entity
entity: Order
  enterprise-services: { model with CURVED operations }
  analytics: { measure source with aggregation rules }
  infrastructure: { table definition with partitioning }
```
This is conceptually clean but requires agreement on what constitutes a "shared entity." Is a Terraform VPC an entity in the same sense as an Order model? Probably not. The entity concept doesn't transfer uniformly across all domains.

**Pipeline model**: Domains run in sequence, each consuming the previous domain's output.
```
enterprise-services → schema-generation → infrastructure → analytics → deployment
```
This is simplest to implement but least powerful. Real systems have bidirectional dependencies — infrastructure constraints affect service design, analytics requirements shape data models.

**Runtime composition**: Domains are independent at spec time but composed at deployment.
Each domain generates its own implementation artifacts independently, and a deployment orchestrator assembles them. This is loosely coupled but loses the cross-domain validation that's a key part of the value proposition.

The right answer is probably a hybrid — shared entities where they exist naturally, import references for cross-domain dependencies, pipeline ordering for implementation, and runtime composition for deployment. But defining that hybrid cleanly is genuinely novel design work. Nobody has done this well yet.

#### 2. Cross-Domain References Create Combinatorial Complexity

A controller needs to know about analytics measures (to emit tracking events). A workflow needs to reference models (to manipulate state). An infrastructure spec needs to know about deployment requirements from the service spec (to size databases). An API gateway spec needs to know about controller endpoints (to route traffic). An observability spec needs to know about services (to configure monitoring).

Every pair of domains that can reference each other adds a new integration surface. With N domains, you get up to N(N-1)/2 potential cross-domain relationships. With 6 domains, that's 15 relationship types. With 10 domains, it's 45. Each relationship needs:

- A reference syntax (how domain A points to domain B)
- A validation rule (does the reference resolve?)
- An inference implication (what does the reference mean for code generation?)
- A change propagation model (what happens when the referenced entity changes?)

The meta-schema needs to define a clean protocol for these references — something like a universal entity identifier scheme (`domain:entityType:entityName:attribute`) and a typed reference system with version constraints. Without this, you get what Kubernetes got in its early days: resources that reference each other by string names with no compile-time validation, leading to runtime failures when references break.

#### 3. Validation Becomes Multi-Dimensional

Currently, SpecVerse validation checks one schema against one set of rules. With multiple domains, validation fractures into at least four dimensions:

- **Intra-domain validation**: Each spec validates against its own schema. Already solved per-domain — OpenAPI has its own validators, Terraform has `terraform validate`, dbt has its own checks.

- **Cross-domain reference validation**: References between domains resolve correctly. Domain A references entity X in domain B — does X exist? Is it the right type? Is the version compatible? This requires a cross-domain resolver that understands all domain schemas simultaneously.

- **Completeness validation**: The combined spec set covers all required concerns. If you define a model in the enterprise-services domain, does it have corresponding infrastructure provisioning? Does it have analytics measures if analytics is required? This requires a meta-level understanding of what "complete" means.

- **Consistency validation**: No contradictions between domain specs. A model says a field is required, but the analytics spec treats it as nullable. The infrastructure spec provisions PostgreSQL, but the service spec uses MongoDB-specific features. These cross-domain inconsistencies are subtle and hard to detect.

This is significantly harder than single-schema validation. But it's tractable — Kubernetes solved a version of this with admission controllers and validating webhooks. The key insight is that you don't need to solve all four dimensions at once. Intra-domain validation comes free. Cross-domain reference validation is the critical path. Completeness and consistency can be progressive enhancements.

#### 4. Cross-Cutting Concerns Don't Belong to Any Single Domain

Authentication spans services, APIs, infrastructure, and workflows. Logging spans everything. Error handling has different shapes in different domains but needs consistency. Authorisation rules affect controllers, analytics access, infrastructure permissions, and workflow approvals.

Where do cross-cutting concerns live in a multi-domain architecture? Options:

- **A dedicated "cross-cutting" domain**: Feels forced — authentication isn't a domain in the same sense as analytics
- **Annotations on entities across domains**: Each domain's spec includes auth metadata in its own syntax
- **A meta-level concern layer**: SpecVerse defines cross-cutting concerns at the orchestration level and projects them into each domain

None of these is clean. Cross-cutting concerns are the bane of modular architectures — they're the reason aspect-oriented programming exists, and it's the reason AOP never achieved mainstream adoption. This doesn't mean the problem is unsolvable, but it does mean the meta-schema needs to have a story for it from day one.

#### 5. Developer Experience Could Fragment

Developers would need to learn multiple spec languages instead of one. The current value proposition — "write one .specly file, get everything" — becomes "write specs in 3-5 different languages, and SpecVerse coordinates them." Each domain language has its own syntax, conventions, mental model, and documentation. The cognitive load increases.

Mitigations:

- **Unified CLI**: `specverse validate`, `specverse realize`, `specverse gen` work uniformly across all domains. The developer interacts with one tool even if it coordinates many languages.
- **AI generation**: If AI can generate specs from natural language (the Generative mode), the syntax of individual domain languages matters less. The developer describes intent; the AI picks the right domain and writes the correct syntax.
- **Progressive adoption**: You don't have to use all domains. Start with enterprise-services, add analytics when you need it, add infrastructure when you're ready. The platform grows with you.
- **Unified documentation**: SpecVerse generates cross-domain docs, diagrams, and AI-optimised views regardless of which domain languages the specs are written in.

#### 6. Existing Components Need Significant Refactoring

The current parser, inference engine, and schema validation are tightly coupled to the .specly format. Making them domain-agnostic requires:

- **Parser abstraction**: Instead of one parser that understands .specly, a parser registry where each domain registers its own parser. The SpecVerse engine calls the right parser based on file extension or domain declaration.
- **Inference engine generalisation**: Currently, inference rules reference .specly-specific concepts (models, controllers, cured operations). Domain-parameterised rules need a more abstract entity model.
- **Schema validation architecture**: Currently validates against one JSON Schema. Multi-domain validation needs a schema-per-domain registry plus cross-domain validation hooks.
- **CLI refactoring**: Commands like `validate`, `gen`, `realize` need to become domain-aware without becoming domain-specific.

This isn't a weekend project. It's a significant architectural refactor. But it's incremental — you can introduce the domain abstraction layer while keeping .specly as the only registered domain, then add new domains one at a time.

### The Kubernetes CRD Analogy

The strongest mental model for what's being proposed is **Kubernetes Custom Resource Definitions (CRDs)**. This analogy is worth developing in detail because it provides a concrete precedent for exactly this kind of meta-specification architecture.

Kubernetes doesn't enforce a single resource type. Instead, it provides:

1. **A meta-schema** for defining new resource types (the CRD specification itself)
2. **A control plane** that orchestrates all resource types uniformly (API server, etcd, scheduler)
3. **Controllers** that know how to reconcile each resource type (the operator pattern)
4. **A universal API** for CRUD operations across all resource types
5. **Cross-resource references** via namespace/name/kind tuples
6. **Admission webhooks** for cross-resource validation
7. **A status subresource** pattern for reporting reconciliation state

What you're proposing is essentially **CRDs for specification languages**:

| Kubernetes Concept | SpecVerse Meta Equivalent |
|-------------------|--------------------------|
| CRD schema | Domain language definition |
| Controller / Operator | Implementation library |
| Resource instance | Individual spec file |
| Control plane (API server) | SpecVerse CLI / orchestrator |
| Namespace | Project / scope |
| Helm chart | Composite spec template |
| `kubectl` | `specverse` CLI |
| Admission webhooks | Cross-domain validation rules |
| Status subresource | Realisation state tracking |
| Label selectors | Cross-domain entity queries |
| Finalizers | Domain dependency management |

The Kubernetes ecosystem proves several things that are directly relevant:

1. **A meta-schema approach scales**: Kubernetes has hundreds of CRD types in the ecosystem, all orchestrated by the same control plane. The pattern works at scale.

2. **Operators (domain controllers) can be built independently**: Different teams build operators for different resource types. They don't need to coordinate on syntax — they coordinate on the meta-schema contract. This maps to different teams/communities building SpecVerse domain integrations independently.

3. **Cross-resource references are solvable but require conventions**: Kubernetes uses namespace/name/kind tuples, owner references, and label selectors. It's not perfect (string references, no compile-time validation), but it works. SpecVerse could learn from both what Kubernetes got right and what it got wrong.

4. **Progressive complexity works**: You can run a Kubernetes cluster with just built-in resource types. You add CRDs when you need them. Similarly, you could run SpecVerse with just the enterprise-services domain and add analytics/infrastructure domains when the project needs them.

### A Concrete Meta-Schema Sketch

Based on the Kubernetes analogy, here's what a SpecVerse domain registration might look like:

```yaml
# specverse-domain.yaml — the meta-schema for a spec domain
domain:
  name: "enterprise-services"
  version: "3.5.0"
  description: "CURVED service architectures — models, controllers, views, events, lifecycles"

  # What conceptual scope this domain covers
  scope:
    primary: "Application service architecture"
    covers:
      - "Data models and relationships"
      - "API endpoints and operations (CURVED)"
      - "Business logic services"
      - "UI view definitions"
      - "Domain events and handlers"
      - "Entity lifecycle management"
      - "Deployment topology"
    excludes:
      - "Analytics and reporting"
      - "Infrastructure provisioning"
      - "CI/CD pipelines"
      - "Data transformation pipelines"

  # What entity types this domain defines
  entityTypes:
    - name: model
      description: "Data entity with attributes, relationships, and lifecycle"
      identifiedBy: name
      supportsLifecycle: true
      supportsEvents: true
    - name: controller
      description: "API surface with CURVED operations"
      identifiedBy: name
      referencesModels: true
    - name: service
      description: "Business logic encapsulation"
      identifiedBy: name
    - name: view
      description: "UI component definition"
      identifiedBy: name
    - name: event
      description: "Domain event with payload"
      identifiedBy: name
    - name: lifecycle
      description: "State machine for entity progression"
      identifiedBy: name

  # What this domain exports for other domains to reference
  exports:
    entities:
      - type: model
        referenceFormat: "{modelName}"
        exposedAttributes: ["name", "attributes", "relationships"]
      - type: controller
        referenceFormat: "{controllerName}"
        exposedAttributes: ["name", "endpoints", "model"]
      - type: endpoint
        referenceFormat: "{controllerName}.{operationName}"
        exposedAttributes: ["method", "path", "request", "response"]
      - type: event
        referenceFormat: "{eventName}"
        exposedAttributes: ["name", "payload", "trigger"]
    aggregates:
      - type: "service-manifest"
        description: "Complete service definition for infrastructure planning"
        includes: ["models", "controllers", "deployments"]

  # What this domain can import from other domains
  imports:
    - domain: "analytics"
      entityTypes: [measure, dimension, dashboard]
      usage: "Embed analytics tracking in controller operations"
    - domain: "infrastructure"
      entityTypes: [database, cache, queue, storage]
      usage: "Map deployment instances to infrastructure resources"
    - domain: "observability"
      entityTypes: [metric, alert, trace]
      usage: "Auto-instrument services with monitoring"

  # Convention layer (human-readable intent → formal expansion)
  conventions:
    processor: "./src/conventions"
    vocabulary:
      - pattern: "{name}: {Type} required unique"
        expandsTo: "attribute with non-null constraint, unique index, schema property"
      - pattern: "{name}: Email verified"
        expandsTo: "email attribute with format validation, verification workflow, token generation"
      # ... bounded vocabulary of domain-specific intent patterns

  # Language definition
  language:
    fileExtension: ".specly"
    schema: "./schema/specverse-schema.json"
    parser: "./src/parser"
    inferenceRules: "./src/inference/"
    inferenceRuleCount: 21

  # Implementation / realisation
  implementation:
    mode: "deterministic"  # or "generative" or "hybrid"
    libraries:
      - name: "express-drizzle"
        capabilities: [http-server, orm, auth]
        framework: "Express + Drizzle"
      - name: "nestjs-prisma"
        capabilities: [http-server, orm, auth, graphql]
        framework: "NestJS + Prisma"
      - name: "fastapi-sqlalchemy"
        capabilities: [http-server, orm, auth]
        framework: "FastAPI + SQLAlchemy"
    manifests: "./manifests/"
    templates: "./templates/"

  # Validation
  validation:
    internalRules: "./validation/internal"
    crossDomainRules: "./validation/cross-domain"
    customValidators: true

  # Repository / reusable components
  repository:
    type: "npm"  # or "git", "registry"
    components:
      - type: "domain-model"
        description: "Pre-built domain model packages"
      - type: "controller-template"
        description: "Common controller patterns"
```

And a second domain for contrast:

```yaml
domain:
  name: "analytics"
  version: "1.0.0"
  description: "Analytics measures, dimensions, and reporting specifications"

  scope:
    primary: "Business intelligence and analytics"
    covers:
      - "Measure definitions and aggregations"
      - "Dimension hierarchies"
      - "Dashboard layouts"
      - "Metric calculations"
      - "Report definitions"
    excludes:
      - "Data pipeline implementation (see: data-pipeline domain)"
      - "Infrastructure for analytics engines"

  entityTypes:
    - name: measure
      description: "Quantifiable metric with aggregation rules"
      identifiedBy: name
    - name: dimension
      description: "Categorical attribute for slicing measures"
      identifiedBy: name
    - name: dashboard
      description: "Visual layout of measures and dimensions"
      identifiedBy: name

  exports:
    entities:
      - type: measure
        referenceFormat: "{measureName}"
        exposedAttributes: ["name", "sourceField", "aggregation"]
      - type: dimension
        referenceFormat: "{dimensionName}"
        exposedAttributes: ["name", "hierarchy", "sourceField"]

  imports:
    - domain: "enterprise-services"
      entityTypes: [model]
      usage: "Source fields for measures and dimensions from data models"

  conventions:
    processor: "./src/conventions"
    vocabulary:
      - pattern: "revenue: sum of {Model}.{field} where {condition}"
        expandsTo: "measure with aggregation, filter, source binding"
      - pattern: "{name}: count distinct {Model}"
        expandsTo: "measure with distinct count aggregation"

  language:
    fileExtension: ".analytics.specly"  # or could adopt dbt's YAML format
    schema: "./schema/analytics-schema.json"
    parser: "./src/parser"

  implementation:
    mode: "hybrid"
    libraries:
      - name: "dbt-adapter"
        capabilities: [transformation, materialisation]
      - name: "cube-adapter"
        capabilities: [semantic-layer, api]
```

### Cross-Domain Interaction: A Worked Example

To make the orchestration concrete, consider how two domains interact for a real feature: "track revenue by product category."

**In the enterprise-services domain** (existing .specly):
```yaml
models:
  Order:
    attributes:
      totalAmount: Currency required
      status: String required
    relationships:
      belongsTo: [Customer, Product]

  Product:
    attributes:
      name: String required
      category: String required
      price: Currency required
```

**In the analytics domain** (new spec):
```yaml
measures:
  revenue:
    source: enterprise-services.Order.totalAmount
    aggregation: sum
    filters:
      - field: enterprise-services.Order.status
        equals: "completed"

dimensions:
  productCategory:
    source: enterprise-services.Product.category
    hierarchy: [category, subcategory]

dashboards:
  revenueDashboard:
    measures: [revenue]
    dimensions: [productCategory]
    timeGrain: daily
```

**Cross-domain validation** would check:
- Does `enterprise-services.Order.totalAmount` exist? (yes)
- Is it a numeric/currency type suitable for `sum` aggregation? (yes)
- Does `enterprise-services.Order.status` exist? (yes)
- Does `enterprise-services.Product.category` exist? (yes)
- Is the `belongsTo` relationship between Order and Product navigable? (yes — needed to join the tables)

**Cross-domain inference** could automatically:
- Infer that the Order model needs an index on `status` (for the filter)
- Infer that the Product model needs an index on `category` (for the dimension)
- Infer that a materialised view or summary table is needed (for performance)
- Infer that the Order controller's create/update operations should emit analytics events

This is the unique value that no single-domain tool provides. dbt alone doesn't know about your service architecture. SpecVerse alone doesn't know about analytics patterns. Together, orchestrated by the meta-layer, they produce insights neither could produce alone.

### How Cross-Cutting Concerns Would Work

Authentication, authorisation, logging, error handling — these span all domains. In the meta-architecture, cross-cutting concerns could be handled as a special domain type:

```yaml
domain:
  name: "security"
  type: "cross-cutting"  # special type — applies to all domains

  policies:
    authentication:
      defaultStrategy: "jwt"
      appliesTo:
        - domain: "enterprise-services"
          entityType: controller
          rule: "all endpoints require auth unless marked public"
        - domain: "analytics"
          entityType: dashboard
          rule: "all dashboards require auth with analytics-viewer role"

    authorisation:
      model: "rbac"
      roles: [admin, user, analytics-viewer, developer]
      appliesTo:
        - domain: "enterprise-services"
          entityType: controller
          rule: "infer from model ownership and operation type"
        - domain: "analytics"
          entityType: measure
          rule: "inherit from source model access rules"
```

The `cross-cutting` domain type is projected into each domain during orchestration — the SpecVerse engine takes the security policies and weaves them into each domain's realisation. This is essentially declarative aspect-oriented programming.

### The Formal Verification Domain: Convention Processors in Action

Formal verification tools (Kani, Dafny, TLA+, Coq, Alloy, SPIN, property-based testing) represent a rich landscape of domain-specific specification languages for proving code correctness. But they share a fatal adoption problem: **they're written in expert-level notation that ordinary developers can't read or write.**

Consider Dafny's contract syntax:

```dafny
requires forall i, j :: 0 <= i < j < a.Length ==> a[i] <= a[j]
ensures index >= 0 ==> 0 <= index < a.Length && a[index] == key
```

The intent is simple: "the array is sorted" and "if found, the result is correct." But the notation is impenetrable to most developers. This is the same accessibility gap that .specly solved for enterprise services.

A formal-verification domain in SpecVerse would use the convention processor pattern to bridge this gap:

```yaml
domain:
  name: "formal-verification"
  version: "1.0.0"
  description: "Formal properties, invariants, and verification specifications"

  scope:
    primary: "Provable correctness properties"
    covers:
      - "Data invariants (summation, range, uniqueness)"
      - "Temporal properties (liveness, safety, fairness)"
      - "Concurrency properties (race-freedom, deadlock-freedom)"
      - "Security properties (information flow, access control)"
      - "Property-based test specifications"
      - "Fuzz testing boundaries"
    excludes:
      - "Implementation (verified properties, not verified code)"
      - "Performance benchmarks"

  conventions:
    processor: "./src/conventions/verification"
    vocabulary:
      - pattern: "equals sum of {collection}.{field}"
        expandsTo: "summation-invariant"
        targets: [dafny-ensures, property-test, kani-harness]
      - pattern: "never negative"
        expandsTo: "non-negative-constraint"
        targets: [dafny-invariant, property-test]
      - pattern: "never empty"
        expandsTo: "non-emptiness-constraint"
        targets: [dafny-requires, property-test]
      - pattern: "conserved across {operation}"
        expandsTo: "conservation-law"
        targets: [tlaplus-invariant, property-test]
      - pattern: "idempotent"
        expandsTo: "idempotency-property"
        targets: [property-test, kani-harness]
      - pattern: "monotonically increasing"
        expandsTo: "ordering-constraint"
        targets: [dafny-invariant, property-test]
      - pattern: "eventually reaches {state}"
        expandsTo: "liveness-property"
        targets: [tlaplus-liveness]
      - pattern: "commutative"
        expandsTo: "commutativity-property"
        targets: [property-test, kani-harness]

  imports:
    - domain: "enterprise-services"
      entityTypes: [model, service]
      usage: "Source the entities and operations to verify"
    - domain: "computational-logic"
      entityTypes: [formula, constraint]
      usage: "Mathematical definitions of invariants to prove"

  implementation:
    mode: "deterministic"
    targets:
      - name: "dafny"
        generates: "design-by-contract specifications"
      - name: "tlaplus"
        generates: "distributed system invariants"
      - name: "property-test"
        generates: "Hypothesis/fast-check property tests"
      - name: "kani"
        generates: "Rust proof harnesses"
```

In practice, a developer writes human-readable invariants directly in their .specly spec:

```yaml
models:
  Order:
    attributes:
      totalAmount: Currency required
      lineItems: [LineItem]

    invariants:
      - totalAmount equals sum of lineItems.amount
      - totalAmount never negative
      - lineItems never empty
```

The formal-verification domain's convention processor expands these three lines into the appropriate formal specifications for whichever verification tools the project's manifest includes. The developer never writes `forall i, j :: 0 <= i < j` — they write intent, and the convention processor handles the translation.

This is the pattern that makes the meta-specification platform practical: **every domain has a convention processor that bridges human intent and machine-verifiable formalism.** Without it, each domain is just another expert tool. With it, every domain is accessible to every developer.

### Achievability Assessment

#### Phase 1: Meta-Schema Design (Hardest, Most Important)

Define what a "domain" is. This is pure design work — no code, just getting the abstractions right.

Key questions to answer:
- What must every domain provide? (schema, parser, entity types, exports, imports)
- What's the cross-domain reference protocol? (URI scheme, type checking, version constraints)
- What's the validation contract? (what each domain guarantees, what the orchestrator checks)
- How do cross-cutting concerns work? (projection model, policy inheritance)
- What's the inference protocol? (how cross-domain rules are defined and triggered)

The Kubernetes CRD model provides a strong starting template, but SpecVerse has a richer problem (specs are more semantically complex than Kubernetes resources). Budget significant time for this phase — getting the abstraction wrong here has cascading consequences.

**Deliverable**: A formal meta-schema specification — essentially, "the spec for specs." This is itself a specification language design problem, which is poetically appropriate for SpecVerse.

#### Phase 2: Refactor Current .specly as Domain #1

Take the existing .specly language and package it as a domain within the meta-framework. This proves the meta-schema works for at least one case.

Concretely:
- Write the domain registration file for enterprise-services
- Introduce a parser registry (initially with one parser)
- Abstract the inference engine to accept domain-parameterised rules
- Refactor the CLI to be domain-aware (initially routing everything to the single domain)
- Ensure zero regression — all existing tests pass, all existing specs work identically

This is the "strangler fig" pattern applied to language architecture. The old system keeps working while the new meta-layer grows around it.

**Deliverable**: Current SpecVerse works exactly as before, but internally structured as a domain within the meta-framework.

#### Phase 3: Add a Second Domain (The Acid Test)

This is where the design proves itself or breaks. Pick a well-defined domain with an existing spec language and integrate it as a second SpecVerse domain.

Candidates (in order of recommendation):
1. **OpenAPI** — for API contract definitions. Well-understood, enormous ecosystem, clear overlap with enterprise-services controller definitions. The cross-domain story is natural: enterprise-services defines the architecture, OpenAPI defines the precise contract.
2. **dbt** — for analytics/data transformation. Different enough from enterprise-services to test domain boundaries. Clear cross-domain references (measures source from models).
3. **Terraform HCL** — for infrastructure. Very different paradigm, tests the limits of the meta-schema.

Recommendation: Start with OpenAPI. It's close enough to enterprise-services that the cross-domain integration is tractable, but different enough that it's a genuine test of the meta-architecture. The overlap (both define APIs) is actually valuable — it forces you to define clean domain boundaries for overlapping concerns.

**Deliverable**: Two domains working together, with cross-domain validation and at least basic cross-domain inference.

#### Phase 4: Cross-Domain Inference (The Magic)

This is where SpecVerse's unique value proposition crystallises. Cross-domain inference rules that no single-domain tool can provide:

- "If a model has a monetary field and an analytics domain is present, infer a revenue measure"
- "If a controller has more than 5 endpoints, infer an API gateway route group in the infrastructure domain"
- "If an event is defined in enterprise-services, infer a corresponding CloudEvents schema in the integration domain"
- "If a model has a lifecycle with more than 3 states, infer an analytics dimension for lifecycle stage"

These rules are where the orchestration goes from "convenient" to "indispensable." No other tool does cross-domain specification inference. This is SpecVerse's moat.

**Deliverable**: A library of cross-domain inference rules that demonstrably produce insights neither domain could produce alone.

#### Phase 5: Community and Ecosystem

Once the meta-schema is stable and two domains are working, open the domain registration to the community. Third parties can build domain integrations — just as Kubernetes operators are built by the community, SpecVerse domains can be community-contributed.

This requires:
- A domain registry (like a package registry for domains)
- Domain certification / compatibility testing
- Documentation and examples for domain authors
- A domain development SDK

**Deliverable**: An open ecosystem where domain-specific specification languages can be integrated into SpecVerse by anyone.

### Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Meta-schema is too complex | Medium | High | Start with minimal viable meta-schema for 2 domains, evolve |
| Cross-domain validation is too slow | Low | Medium | Validate intra-domain first (fast), cross-domain second (incremental) |
| Developer experience fragments | Medium | High | Unified CLI, AI-assisted generation, progressive adoption |
| Existing spec languages resist integration | Medium | Medium | Don't modify them — wrap them. Domain adapters, not language forks |
| Phase 1 design paralysis | High | High | Time-box to 2-3 weeks. Design for two domains, not N domains |
| Community doesn't build domains | Medium | Low initially | Build the first 3-4 domains internally. Community follows proven value |

### Comparison with Alternative Approaches

**Alternative 1: Keep extending .specly**
- Pros: Simple, one language, one parser, one schema
- Cons: Grammar bloat, jack-of-all-trades problem, increasingly hard to maintain
- Verdict: Works for another 2-3 domains at most before complexity becomes unmanageable

**Alternative 2: Build all domain languages from scratch**
- Pros: Perfect consistency, full control, optimal integration
- Cons: Enormous engineering effort, competing with established tools, no community leverage
- Verdict: Unrealistic for a small team. You'd spend years building worse versions of existing tools

**Alternative 3: Meta-specification platform (this proposal)**
- Pros: Leverages existing languages, natural domain boundaries, scalable architecture, unique value prop
- Cons: Orchestration complexity, cross-domain design challenge, initial refactoring cost
- Verdict: Highest strategic value, most sustainable long-term, hardest to get the abstraction right

### Bottom Line

This is a **strategically sound direction** that transforms SpecVerse from "a specification language" into "the specification platform." It's the difference between being a tool and being an ecosystem.

The risk is concentrated in one place: the meta-schema design. If you get the domain abstraction right — what a domain must provide, how domains reference each other, how cross-domain validation and inference work — everything else follows. If you get it wrong, you build a coordination layer that nobody wants to coordinate through.

The key insight is: **don't try to design the perfect meta-schema upfront.** Start with two domains, make the orchestration work concretely, then extract the general pattern from the specific. This is exactly how Kubernetes evolved — built-in resources first, CRDs emerged from the pattern.

The current .specly language becomes *more* valuable in this model, not less. It's the flagship domain, the proof of concept, the reference implementation that every other domain integration is measured against. And the coverage gaps that currently feel like weaknesses become explicit domain boundaries that the meta-architecture handles by design.

The question isn't whether this direction is right — it almost certainly is. The question is whether the meta-schema design can be done well enough, quickly enough, to maintain momentum. That's a design challenge, not an engineering one. And design challenges are exactly what SpecVerse is built to think about.

---

*Analysis produced during SpecVerse architectural review session, February 2026.*
