# SpecVerse: A Structured Language for Human-AI Software Collaboration

## The Problem

Software development is being transformed by AI. Developers describe what they want in natural language, and AI generates code. This is fast, flexible, and increasingly capable. It's also fundamentally unreliable.

### The Vibe Coding Trap

AI coding tools - Cursor, Copilot, Windsurf, Claude Code - generate code from loose prompts. The same prompt produces different results on different days. There's no schema validating the output against the intent. No way to verify the generated system matches what was asked for. No mechanism to replay a successful generation reliably.

The faster we generate code, the faster we accumulate **architectural drift** - the gap between what was intended and what was built. Every AI-generated function that's "close enough" compounds the problem. What starts as a productivity boost becomes a maintenance liability, because nobody can point to a single document and say "this is what the system is supposed to do."

This is vibe coding: it feels productive, but there's no structural guarantee that what's built matches what was wanted.

### The Limits of Traditional Specification

Previous attempts to solve this problem - UML, formal methods, Model-Driven Architecture - failed for the opposite reason. They were precise but impractical:

- **Too rigid**: Specifications couldn't evolve at the pace of development
- **Too complex**: Learning the specification language was harder than writing the code
- **Disconnected from implementation**: The spec and the code were separate artifacts, so one always drifted from the other
- **Write-once**: Specs were created at the start and abandoned once coding began

The result: specifications became shelf-ware. Nobody maintained them because maintaining a spec *and* the code was double the work with no enforced connection between them.

### The Gap

We need something that doesn't exist yet: a format for describing software systems that is **precise enough for machines** but **natural enough for humans**, that can be **validated automatically**, and that stays **connected to implementation** because it *is* the implementation's source of truth.

---

## The Insight: From Non-Deterministic Generation to Verifiable Creation

The core insight behind SpecVerse is that AI-generated software doesn't have to be non-deterministic. The problem isn't that AI generates code - it's that AI generates code **without a verifiable specification to validate against**.

If there were a structured format that captured architectural intent - one that both humans and AI could read and write - then:

1. **AI generation becomes verifiable**: Generate a spec, validate it against a schema. Pass or fail. No ambiguity.
2. **Proven solutions become replayable**: When an AI solves a problem well, capture the solution as a deterministic template. Replay it reliably forever - zero tokens, millisecond execution, identical output every time.
3. **Architecture becomes auditable**: The spec is the source of truth. Compare the running system against the spec. If they match, the implementation is faithful. If they diverge, you can see exactly where.

This is the shift from **hallucinogenic generation to verifiable creation**: AI explores non-deterministically, humans validate, and proven solutions crystallise into deterministic, replayable artifacts.

```mermaid
flowchart LR
    subgraph "The Problem"
        VC["Vibe Coding
        Non-deterministic
        No validation
        Architectural drift"]
    end

    subgraph "The Bridge"
        SV["Structured Specification
        Schema-validated
        Human + AI readable
        Single source of truth"]
    end

    subgraph "The Outcome"
        VE["Verifiable Creation
        Validated output
        Replayable solutions
        Auditable architecture"]
    end

    VC -->|"SpecVerse"| SV --> VE

    style VC fill:#f5b7b1
    style SV fill:#e8daef,stroke:#7d3c98,stroke-width:2px
    style VE fill:#a8e6cf
```

SpecVerse implements this through a two-mode system:

**Exploration mode** (`ai template`): An LLM generates a solution - a specification, a code template, a deployment configuration. The output is validated against the SpecVerse schema. Errors are automatically fixed through a validate-fix loop until the spec passes 100%. This costs tokens and takes seconds, but produces verified output.

**Replay mode** (`realize`): A proven solution is captured as an **instance factory** - a TypeScript template generator stored in version control. Execution is deterministic, takes milliseconds, costs nothing, and produces identical output every time.

Solutions graduate from exploration to replay as they mature. When requirements change, they return to exploration mode, get re-validated, and are re-captured:

```
AI Exploration          Human Validation          Deterministic Replay
(creative, costly)  →   (quality gate)    →     (reliable, free)
                                                       │
                         Requirements Change ←─────────┘
```

The instance factory templates in SpecVerse - Prisma schema generators, Fastify route generators, React hook generators - are themselves **distilled LLM knowledge**: the best solution an AI produced, validated by a human, crystallised for reliable reuse.

---

## The Philosophy

> **Structured intent as the single source of truth.**

Software architecture should be expressed in a single, structured format that serves as the source of truth for both humans and machines. This format should be writable by anyone, verifiable automatically, and precise enough to implement from - eliminating the gap between intent and implementation.

SpecVerse is that format. A .specly file is:

- **Readable** by any developer who can read YAML
- **Writable** by humans and AI systems alike
- **Validatable** against a formal JSON Schema - pass or fail, no ambiguity
- **Precise enough** to generate implementations from, or to execute directly at runtime
- **Extractable** from existing codebases, creating a zero-risk adoption path

```
Human Intent  ←→  SpecVerse (.specly)  ←→  AI Systems
```

It captures the *what* and *why* of a system without dictating the *how*. The same specification can target Prisma or TypeORM, Fastify or Express, React or Vue - technology choices are made in the manifest, not the spec.

---

## The Structure: Four Pillars

The philosophy manifests through four structural capabilities - four directions that specifications can flow between humans and machines:

### Pillar 1: Human-Writable

Developers write specifications naturally using YAML with convention shortcuts:

```yaml
models:
  User:
    attributes:
      email: Email required unique verified
      name: String required
      role: String default=member values=[member, admin, moderator]
    lifecycles:
      account:
        flow: pending -> active -> suspended -> deleted
```

No special tools required. Any developer who can read YAML can read and modify a .specly file. Conventions like `Email required unique verified` expand into structured schema definitions automatically.

### Pillar 2: AI-Writable (from Human Request)

An AI system receives a natural language request - "build me a property management system with bookings, guest profiles, and multi-property support" - and generates a complete, valid .specly specification. The specification is validated against the SpecVerse schema, and any errors are automatically fixed through the validate-fix loop until the spec passes 100%.

### Pillar 3: AI-Describable (from System Analysis)

An AI system examines an existing codebase - Express routes, database schemas, React components - and extracts a .specly specification describing what that system does. This creates an adoption path with zero risk: try SpecVerse on your existing code before committing to it.

### Pillar 4: AI-Implementable

A .specly specification is precise and structured enough that an AI system can generate a working implementation from it - database schemas, API routes, service logic, UI components - targeting whatever technology stack is specified in the manifest.

### The Closed Loop: Verification Through Round-Trip

The four pillars aren't just independent capabilities - they form a **verification loop**:

```mermaid
flowchart LR
    A["Original Spec
    (intent)"] -->|"Pillar 4: Implement"| B["Running System
    (reality)"]
    B -->|"Pillar 3: Extract"| C["Extracted Spec
    (observed)"]
    C -->|"Compare"| D{"Match?"}
    D -->|"Yes"| E["Implementation
    is faithful"]
    D -->|"No"| F["Divergence detected
    Fix spec or code"]

    style A fill:#a8e6cf
    style B fill:#a8d8ea
    style C fill:#f9e2ae
    style E fill:#a8e6cf
    style F fill:#f5b7b1
```

After an AI implements a system from a spec (Pillar 4), you can use Pillar 3 to extract a spec from the running implementation and compare it against the original. If they match, the implementation is faithful to intent. If they diverge, you can see exactly where and decide whether to fix the code or update the spec.

This closes the loop that traditional specification approaches left open. The spec doesn't drift from reality because you can always verify alignment - and the spec format is structured enough that comparison is meaningful, not just a text diff.

### The Workflow

The four pillars combine into a continuous cycle:

```mermaid
flowchart LR
    subgraph Human
        A[Requirements] --> B[Review & Refine]
    end

    subgraph SpecVerse
        C[.specly Specification]
    end

    subgraph AI
        D[Generate Spec]
        E[Extract Spec]
        F[Generate Code]
    end

    A -->|Pillar 2: AI writes spec| D --> C
    B -->|Pillar 1: Human edits spec| C
    C -->|Pillar 4: AI implements| F
    F -->|Deployed System| G[Running Application]
    G -->|Pillar 3: AI extracts spec| E --> C
```

The specification is always the source of truth. Humans and AI both read it, both write it, and the system stays in sync.

---

## Inside a .specly Specification

### Three Architectural Layers

A SpecVerse specification describes a system at three levels of abstraction:

```mermaid
flowchart TB
    subgraph "Layer 1: Components — WHAT"
        M[Models] --> C[Controllers]
        M --> S[Services]
        M --> E[Events]
        M --> V[Views]
        M --> L[Lifecycles]
    end

    subgraph "Layer 2: Deployments — WHERE"
        I[Instances] --> ST[Storage]
        I --> SE[Security]
        I --> IN[Infrastructure]
        I --> MO[Monitoring]
    end

    subgraph "Layer 3: Manifests — HOW"
        MF[Instance Factories] --> PR[Prisma / TypeORM / Drizzle]
        MF --> FA[Fastify / Express / NestJS]
        MF --> RE[React / Vue / Svelte]
    end

    C --> I
    S --> I
    V --> I
    I --> MF
```

**Components** (Layer 1) define what the system does: data models with attributes and relationships, controllers with CURVED operations (Create, Update, Retrieve, Retrieve_many, Validate, Evolve, Delete), services with business logic and event subscriptions, views with UI specifications, and lifecycles governing entity state transitions.

**Deployments** (Layer 2) define where it runs: storage instances (databases, caches, queues), security (authentication, authorisation, encryption), infrastructure (gateways, load balancers, CDN), and monitoring (metrics, logging, tracing, alerting).

**Manifests** (Layer 3) define how it's built: instance factories bind abstract capabilities to concrete technologies. The same spec can generate a Prisma + Fastify + React application or a TypeORM + NestJS + Vue application by changing the manifest, not the spec.

### The Inference Engine

Between a minimal human specification and a complete architecture sits the inference engine: 21 deterministic rules that expand models into controllers, services, events, and views.

```mermaid
flowchart LR
    A["50-line .specly
    (models + relationships)"] --> B[Inference Engine
    21 Rules]
    B --> C["200-400 line .specly
    (controllers + services
    + events + views)"]
    C --> D[Validate]
    D -->|Valid| E[Complete Specification]
    D -->|Invalid| B
```

This isn't AI in the LLM sense - it's codified architectural knowledge. "Every model with a lifecycle gets an `evolve` operation." "Every `hasMany` relationship generates cascade delete handling." "Every model gets list, detail, and form views." The output is predictable, testable, and version-controlled.

### A Minimal Example

```yaml
components:
  BlogSystem:
    version: "3.5.0"
    models:
      Post:
        attributes:
          title: String required
          content: String required
          author: String required
        lifecycles:
          publication:
            flow: draft -> published -> archived
      Comment:
        attributes:
          content: String required
        relationships:
          post: belongsTo Post
```

From these 16 lines, the inference engine generates: PostController and CommentController with full CURVED operations, PostService and CommentService with event subscriptions, lifecycle events (PostPublished, PostArchived), CRUD events (PostCreated, CommentDeleted), and list/detail/form views for both models. The 16-line input becomes a ~80-line complete architecture.

---

## The Ecosystem

SpecVerse isn't just a language - it's a complete platform built around the .specly file as the central artifact. Every component reads, writes, validates, interprets, or shares specifications.

```mermaid
flowchart TB
    SPEC[".specly Specification"] --> WRITE
    SPEC --> VALIDATE
    SPEC --> RUN
    SPEC --> SHARE
    SPEC --> LEARN

    subgraph WRITE ["Write & Generate"]
        LANG["specverse-lang
        Parser, Inference, CLI
        1,901 tests"]
        AI["specverse-demo-ai
        AI Test Laboratory
        4x-7.6x measured expansion"]
    end

    subgraph VALIDATE ["Validate & Realize"]
        REAL["Realize System
        Instance Factories
        Capability Resolution"]
        VFL["Validate-Fix Loop
        Generate → Validate →
        Fix → Re-validate"]
    end

    subgraph RUN ["Run & Visualise"]
        DEMO["specverse-app-demo
        Runtime Interpreter
        7-tab browser UI"]
        VIZ["3D Architecture
        5-layer Three.js
        visualisation"]
    end

    subgraph SHARE ["Share & Reuse"]
        REG["specverse-lang-registry
        Community Library Platform
        Fastify + React + CLI"]
    end

    subgraph LEARN ["Learn & Reference"]
        DOC["specverse-lang-doc
        136+ pages, 24 examples
        Docusaurus v3"]
        VSC["VSCode Extension
        Syntax, IntelliSense
        Validation"]
    end

    style SPEC fill:#e8daef,stroke:#7d3c98,stroke-width:3px
    style LANG fill:#a8e6cf
    style DOC fill:#a8e6cf
    style VSC fill:#a8e6cf
    style REG fill:#a8d8ea
    style DEMO fill:#a8d8ea
    style REAL fill:#a8d8ea
    style AI fill:#f9e2ae
    style VFL fill:#f9e2ae
    style VIZ fill:#a8d8ea
```

### specverse-lang — The Core Language

The heart of the ecosystem. Contains the parser, inference engine, CLI, code generation system, and all language definitions.

- **Parser**: Fast YAML + Conventions processing with JSON Schema validation. Conventions like `email: Email required unique verified` expand into structured type definitions automatically.
- **Inference Engine**: 21 deterministic rules that expand minimal models into complete architectures (controllers, services, events, views). Produces 4x-7.6x spec expansion depending on system complexity.
- **CLI**: 30+ commands spanning core operations (validate, infer, gen), code realisation (realize orm/services/routes), AI workflows (ai template analyse/create/materialise/realize), session management, and registry integration.
- **Realize System**: Manifest-driven code generation. Instance factories (Prisma, Fastify, React) are resolved via capability mapping, so the same spec generates different tech stacks by changing the manifest.
- **VSCode Extension**: Full syntax highlighting, IntelliSense, real-time validation, and diagram preview for .specly files.
- **MCP Server**: Model Context Protocol server enabling AI assistant integration across Claude Desktop, web interfaces, and enterprise environments. 7 core tools + 6 orchestrator tools for specification creation, analysis, validation, and implementation prompting.
- **Diagram Generator**: 15 Mermaid diagram types covering ER relationships, lifecycle state machines, event flows, architecture layers, deployment topology, capability bindings, and technology stacks.
- **Documentation Generator**: Auto-generates comprehensive documentation from specifications.
- **TypeScript API**: Full programmatic access for building custom tools, IDE integrations, and build pipelines.
- **1,901 tests** across 5 tiers: parser, grammar, examples, inference, and CLI.

### specverse-app-demo — The Runtime Interpreter

A full-stack application that **executes .specly files at runtime without compilation**. Load a specification and instantly get a working application with REST API, WebSocket events, web UI, and in-memory database - all dynamically generated from the spec.

```
blog.specly → Parser → RuntimeEngine → Working Application
                                        ├── REST API (CURVED operations)
                                        ├── WebSocket (real-time events)
                                        ├── Web UI (7 tabs)
                                        ├── State Machines (lifecycles)
                                        └── In-Memory Database
```

**Seven browser tabs**: Models (CRUD interface with relationship dropdowns and lifecycle transitions), Views (custom dashboards and forms from spec), Events (live event stream), Diagrams (auto-generated Mermaid), 3D Graph (interactive Three.js architecture visualisation across 5 layers), Specly (live editor with hot reload), Help (built-in docs).

**Multi-server mode**: A manager UI orchestrates multiple spec servers simultaneously - upload .specly files through the browser, each runs on its own port.

This proves a key claim: a .specly specification is **precise enough to execute directly**. The spec isn't just a design document - it contains enough information to create a working application. This provides the fastest possible feedback loop: write spec → see running app → modify spec → hot reload.

Built with Express, React, Vite, Tailwind, React Query, and Three.js. 203/205 tests passing.

### specverse-demo-ai — The AI Testing Laboratory

A comprehensive test suite proving that SpecVerse's AI workflow actually works, with measurable quality metrics. Three generations of testing frameworks, culminating in an automated system that validates AI-generated specifications against hard benchmarks.

**Four test operations**:

| Operation | What It Tests | Result |
|-----------|---------------|--------|
| demo-create | AI generates spec from simple requirements | 40 lines → 200 lines (4x expansion) |
| pro-create | AI generates spec from enterprise requirements | 80 lines → 3,600+ lines (7.6x expansion) |
| demo-analyse | AI extracts spec from clean codebase | In progress |
| pro-analyse | AI extracts spec from production code | In progress |

**The scale recognition story**: The same language format handles radically different scales. The inference engine doesn't just produce more lines at enterprise scale - it recognises the *kind* of system being described and generates architecturally appropriate patterns. Multi-tenancy appears only when multiple organisations are described. RBAC appears only when role hierarchies are specified. International support appears only when multiple countries are mentioned.

**The validate-fix loop**: Generate → validate against schema → fix errors automatically → re-validate until 100% pass. Combined with session caching (98% token savings, ~$0.40/generation), this makes AI-assisted specification development both reliable and economical.

**Test infrastructure**: Automated runners, prompt version comparison (v1 through v7+), metrics calculation (expansion ratio, benchmark compliance ±20% tolerance), HTML report generation.

### specverse-lang-registry — The Community Library Platform

A production-deployed registry for sharing and discovering reusable .specly specifications. Think npm for specifications.

```yaml
# Use community libraries in your specs
import:
  - from: "@specverse/auth"
    select: [User, AuthController]
  - from: "@specverse/commerce"
    select: [Product, Order, OrderItem]
```

**Three components in a monorepo**:
- **API** (Fastify): 25+ endpoints, GitHub OAuth, server-side .specly validation, PostgreSQL/Prisma, download tracking, star system. Deployed on Vercel.
- **Web UI** (React + Vite): Browse libraries with tag/type/category filtering, publish with drag-and-drop upload, version history, README display.
- **CLI** (@specverse/reg on npm): 8 commands for login, publish, search, info, star/unstar. Device flow OAuth for terminal authentication.

**Integration with specverse-lang CLI**:
```bash
specverse lib search authentication       # Search by keyword
specverse lib search --tags auth,oauth    # Search by tags
specverse lib info @specverse/auth        # Get library details
specverse lib tags                        # Browse categories
```

Import resolution checks the registry before local files, caches results locally, and falls back gracefully when offline.

**Published libraries** include authentication patterns, e-commerce models, REST API conventions, event-driven architecture templates, and domain-specific models for company and retail commerce.

**Meta-story**: The registry itself was designed from a 719-line .specly specification (`spec/registry.specly`), serving as both the community hub and a real-world validation of specification-driven architecture.

### specverse-lang-doc — Documentation & Learning

136+ pages of Docusaurus v3 documentation covering the complete SpecVerse language, tooling, and ecosystem.

**Content**:
- **7 Getting Started pages**: Introduction, installation, quick start, architecture, AI integration, progressive examples, troubleshooting
- **18 Language Reference pages**: Complete syntax specification for every construct - models, controllers, services, events, views, imports, types, lifecycles, profiles, and the AI inference engine
- **60+ Example pages**: 24 core examples progressing from basic models to full enterprise architectures, each pairing a .specly source file with generated documentation. Categories span fundamentals, profiles, architecture, domains, meta-programming, deployment, legacy migration, and comprehensive reference.
- **6 Registry pages**: Platform overview, publishing workflow, discovery, CLI integration, API reference
- **15 Reference pages**: CLI reference, JSON schemas, glossary, build system, test framework
- **8 Tool pages**: Parser, validator, VSCode extension, language server, diagram generator, MCP server, runtime interpreter

**Automatic sync**: A 515-line script synchronises documentation from specverse-lang - examples, diagrams, metadata, sidebar configuration - ensuring docs stay current as the language evolves. CI/CD-safe with pre-generated fallbacks.

**Learning paths for different audiences**:

| Audience | Entry Point | Time |
|----------|------------|------|
| Beginner | Introduction → Quick Start → Fundamentals examples | 2-3 hours |
| Developer | Quick Start → Architecture → Services & Events | 1-2 hours |
| Architect | Introduction → Component Architecture → Advanced examples | 1-2 hours |
| DevOps | Deployment docs → Deployment examples → Registry | 1 hour |

---

## Language Coverage: What .specly Can and Cannot Express

### Strong Coverage

These domains have well-defined schema primitives, inference rules, and tooling support:

```mermaid
flowchart TB
    subgraph "Strong Coverage"
        DM["Data Models
        14 types, relationships,
        constraints, metadata"]
        CT["Controllers / APIs
        CURVED operations,
        parameters, events"]
        SV["Business Services
        Operations, event subscriptions,
        compensation handling"]
        EV["Event Architecture
        Pub/sub, typed payloads,
        lifecycle events"]
        UI["UI / Views
        49 components, 10 view types,
        layouts, charts"]
        DP["Deployment
        8 instance categories,
        capabilities, environments"]
        LC["Lifecycles
        State machines, transitions,
        per-entity flow control"]
    end

    style DM fill:#a8e6cf
    style CT fill:#a8e6cf
    style SV fill:#a8e6cf
    style EV fill:#a8e6cf
    style UI fill:#a8e6cf
    style DP fill:#a8e6cf
    style LC fill:#a8e6cf
```

**What this enables**: SaaS applications, CRUD-heavy systems, booking platforms, CMS platforms, project management tools, e-commerce storefronts - any system primarily concerned with entities, their lifecycles, and CRUD operations.

### Gaps: What's Missing from a Complete Specification Language

```mermaid
flowchart TB
    subgraph "Major Gaps"
        AN["Analytics & Reporting
        No measures, dimensions, KPIs,
        report schedules, dashboard data"]
        PL["Data Pipelines
        No ETL, batch processing,
        stream processing, scheduling"]
        IN["External Integrations
        No API contracts, webhooks,
        retry policies, circuit breakers"]
    end

    subgraph "Moderate Gaps"
        WF["Workflow Orchestration
        No cross-entity sagas,
        approval chains, BPMN"]
        TQ["Testing & Quality
        No contracts, acceptance criteria,
        performance requirements"]
        SC["Security Policies
        No ABAC rules, compliance mapping,
        data classification"]
    end

    subgraph "Minor Gaps"
        I18["Internationalisation
        No locale definitions,
        content translation mappings"]
        MT["Multi-Tenancy
        No isolation strategies,
        resource quotas, billing"]
        CF["Configuration
        No schema-based config,
        feature flags, secrets mgmt"]
    end

    style AN fill:#f9e2ae
    style PL fill:#f9e2ae
    style IN fill:#f9e2ae
    style WF fill:#ffd3b6
    style TQ fill:#ffd3b6
    style SC fill:#ffd3b6
    style I18 fill:#dcedc1
    style MT fill:#dcedc1
    style CF fill:#dcedc1
```

#### The Analytics Gap (Most Significant)

Every business application needs reporting. SpecVerse can describe a `dashboard` view with `chart` components, but it's a UI description with no data semantics. You can say "put a bar chart here" but you can't say:

> "This chart shows monthly revenue by product category, filtered by region, with a target line at $100K and an alert when it drops below for 2 consecutive months."

What's needed:

```yaml
# What analytics specs might look like in .specly
analytics:
  RevenueAnalysis:
    sources:
      - model: Order
        join: OrderItem on Order.id = OrderItem.orderId

    measures:
      totalRevenue:
        expression: SUM(OrderItem.price * OrderItem.quantity)
        format: currency
      averageOrderValue:
        expression: totalRevenue / COUNT(DISTINCT Order.id)

    dimensions:
      time: Order.createdAt granularity=[day, week, month, quarter]
      category: Product.category
      region: Order.shippingRegion

    kpis:
      monthlyTarget:
        measure: totalRevenue
        target: 100000
        alert: below_target for 2 consecutive periods
```

#### The Pipeline Gap

Modern applications process data - ETL jobs, event stream processing, batch transformations, data quality checks. No .specly primitives exist for expressing data flow.

#### The Integration Gap

SpecVerse describes internal services well but has no way to specify how your system talks to the outside world - external API contracts, webhook handling, retry policies, circuit breakers, authentication with third-party services.

#### The Workflow Gap

Lifecycles are per-entity state machines. But real business processes span multiple entities - an order fulfillment saga touching inventory, payment, shipping, and notification services. SpecVerse has no cross-entity orchestration primitives.

### Coverage Summary

| Specification Domain | Coverage | Priority to Add |
|---------------------|----------|-----------------|
| Data Models & Relationships | Complete | - |
| Controllers / CRUD APIs | Complete | - |
| Business Services & Events | Complete | - |
| UI Views & Components | Complete | - |
| Lifecycle State Machines | Complete | - |
| Deployment Infrastructure | Complete | - |
| **Analytics & Reporting** | **None** | **High** |
| **Data Pipelines** | **None** | **Medium** |
| **External Integrations** | **None** | **High** |
| **Workflow Orchestration** | **None** | **Medium** |
| Testing & Quality Contracts | None | Medium |
| Security Policies (ABAC) | Minimal | Medium |
| Internationalisation | None | Low |
| Multi-Tenancy (explicit) | Minimal | Low |
| Configuration Management | Minimal | Low |

The language is excellent for its core domain (CRUD/SaaS applications). The path to a universal specification language requires incremental expansion, starting with analytics and integrations - the two gaps most commonly encountered in real-world applications.

---

## What Makes This Different

There are many specification languages (OpenAPI, AsyncAPI, Terraform, Pulumi) and many AI coding tools (Cursor, Copilot, Windsurf). SpecVerse occupies a different space:

**It's not a code generator.** It's a format for expressing software architecture that happens to be implementable. The specification is the artifact, not the generated code. The runtime interpreter proves this: load a .specly file and get a running application without generating a single line of code.

**It's not an API spec.** OpenAPI describes HTTP endpoints. SpecVerse describes entire systems - models, business logic, events, UI, deployment, and the relationships between them.

**It's not an IaC tool.** Terraform describes infrastructure. SpecVerse describes applications and maps them onto infrastructure through its deployment and manifest layers.

**It's not a solo tool.** The registry enables community sharing of proven specification patterns. Import authentication, e-commerce, or domain models instead of writing them from scratch.

**It's a human-AI interface.** The specification format is designed so that humans can write it (Pillar 1), AI can generate it (Pillar 2), AI can extract it from existing systems (Pillar 3), and AI can implement from it (Pillar 4). No other tool is designed for all four.

The bet is that as AI becomes central to software development, the bottleneck shifts from "writing code" to "communicating intent precisely." SpecVerse is purpose-built for that world.

---

## The Full Picture

```mermaid
flowchart TB
    subgraph "Human"
        REQ[Requirements]
        REV[Review & Refine]
    end

    subgraph "Write & Generate"
        P1["Pillar 1
        Human writes spec"]
        P2["Pillar 2
        AI generates spec
        4x-7.6x expansion"]
    end

    subgraph "The Specification"
        SPEC[".specly File
        Source of Truth"]
    end

    subgraph "Validate & Expand"
        VAL[Schema Validation]
        INF["Inference Engine
        21 Rules"]
        VFL["Validate-Fix Loop
        Until 100% pass"]
    end

    subgraph "Use"
        RUN["Runtime Interpreter
        Instant working app"]
        REAL["Realize
        Deterministic code gen"]
        AI4["AI Implement
        LLM-driven code gen"]
    end

    subgraph "Verify"
        P3["Pillar 3
        AI extracts spec
        from running system"]
        CMP["Compare
        Original vs Extracted"]
    end

    subgraph "Share & Learn"
        REG["Registry
        Community libraries"]
        DOC["Documentation
        136+ pages"]
    end

    REQ --> P2
    REQ --> P1
    REV --> P1
    P1 --> SPEC
    P2 --> VFL
    VFL --> SPEC
    SPEC --> VAL
    VAL --> INF
    INF --> SPEC
    SPEC --> RUN
    SPEC --> REAL
    SPEC --> AI4
    SPEC --> REG
    SPEC --> DOC
    AI4 -->|Running System| P3
    RUN -->|Running System| P3
    P3 --> CMP
    CMP -->|"Faithful"| SPEC
    CMP -->|"Diverged"| REV

    style SPEC fill:#e8daef,stroke:#7d3c98,stroke-width:3px
    style P1 fill:#a8e6cf
    style P2 fill:#f9e2ae
    style P3 fill:#f9e2ae
    style AI4 fill:#f9e2ae
    style VAL fill:#a8e6cf
    style INF fill:#a8e6cf
    style VFL fill:#f9e2ae
    style RUN fill:#a8d8ea
    style REAL fill:#a8d8ea
    style REG fill:#a8d8ea
    style DOC fill:#a8e6cf
    style CMP fill:#e8daef
```

Everything revolves around the .specly file. It's written by humans and AI. It's validated, expanded, and inferred. It's executed at runtime, realised into code, and shared through the registry. It's extracted from running systems and compared against the original intent.

One file format. One source of truth. Readable by humans. Writable by machines. Verifiable by both. That's the idea.

---

## Appendix: Detailed Component Status

### Maturity Overview

```mermaid
flowchart LR
    subgraph "Production-Ready"
        direction TB
        P["Parser
        Fast, 1,901 tests"]
        IE["Inference Engine
        21 rules, deterministic"]
        CLI["CLI Core
        validate, infer, gen"]
        VSC["VSCode Extension
        Syntax, IntelliSense"]
        DG["Diagrams
        15 types, 100%"]
        DOC["Documentation
        136+ pages"]
    end

    subgraph "Functional / Emerging"
        direction TB
        REAL["Realize System
        Prisma, Fastify, React"]
        REG["Registry
        Deployed, real content"]
        DEMO["Runtime Interpreter
        203/205 tests"]
        MCP["MCP Server
        13 tools"]
        SESS["Sessions
        98% token savings"]
    end

    subgraph "In Progress"
        direction TB
        P2["AI Create
        Working, validated"]
        P3["AI Analyse
        Prompts need updates"]
        P4["AI Materialise
        Not started"]
        VFL["Validate-Fix Loop
        Proven for create only"]
    end

    subgraph "Not Yet Built"
        direction TB
        E2E["End-to-end pipeline
        Spec → running app"]
        REV["Reverse engineering
        Code → spec extraction"]
        TEAM["Team collaboration
        Shared sessions"]
        MKT["Template marketplace
        Community factories"]
    end

    style P fill:#a8e6cf
    style IE fill:#a8e6cf
    style CLI fill:#a8e6cf
    style VSC fill:#a8e6cf
    style DG fill:#a8e6cf
    style DOC fill:#a8e6cf
    style REAL fill:#a8d8ea
    style REG fill:#a8d8ea
    style DEMO fill:#a8d8ea
    style MCP fill:#a8d8ea
    style SESS fill:#a8d8ea
    style P2 fill:#f9e2ae
    style P3 fill:#f9e2ae
    style P4 fill:#f9e2ae
    style VFL fill:#f9e2ae
    style E2E fill:#f5b7b1
    style REV fill:#f5b7b1
    style TEAM fill:#f5b7b1
    style MKT fill:#f5b7b1
```

### Detailed Status Table

| Component | Maturity | Evidence |
|-----------|----------|---------|
| Parser + Schema | Production | Fast parsing, 1,901 tests, convention processing |
| Inference Engine | Production | 21 rules, 4x-7.6x expansion, deterministic |
| CLI (core commands) | Production | validate, infer, gen, init, migrate |
| VSCode Extension | Production | Syntax, IntelliSense, validation, diagram preview |
| Diagram Generator | Production | 15 Mermaid types, 100% complete |
| Documentation Site | Production | 136+ pages, auto-sync, Docusaurus v3 |
| TypeScript API | Production | Programmatic access, verified examples |
| MCP Server | Functional | 7 core + 6 orchestrator tools, multi-environment |
| Realize System | Functional | Instance factories for Prisma, Fastify, React |
| Registry Platform | Functional | Deployed on Vercel, real libraries, 49 API tests |
| Runtime Interpreter | Functional | 7-tab UI, multi-server, 203/205 tests |
| Session Management | Functional | Claude Code integration, 98% token savings |
| AI Create (Pillar 2) | Validated | 4x-7.6x measured, validate-fix loop working |
| AI Analyse (Pillar 3) | Early | Prompts exist, need updating |
| AI Materialise/Realize (Pillar 4) | Not started | Framework and infrastructure ready |
| End-to-end pipeline | Not built | No spec → running app single command |
| Code → spec extraction | Not built | Cannot yet reverse-engineer existing systems |
