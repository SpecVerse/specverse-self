# The SpecVerse Guide

A complete guide to writing `.specly` specifications, using the toolchain, and extending the system.

---

## Part 1: Writing Specifications

### Your First Spec

A `.specly` file defines WHAT your system does, not HOW it's built:

```yaml
components:
  TaskManager:
    version: "1.0.0"
    description: "A simple task management system"

    models:
      Task:
        attributes:
          id: UUID required unique
          title: String required
          description: String
          priority: String values=[low,medium,high] default=medium
          dueDate: DateTime
        lifecycles:
          status:
            flow: todo -> in_progress -> done
```

That's a complete, valid spec. The inference engine generates the rest — controllers, services, events, views — from this minimal definition.

### Models

Models are the foundation. Everything else is derived from them.

**Attributes** use convention shorthand — type followed by modifiers:

```yaml
attributes:
  id: UUID required unique           # Type + boolean modifiers
  email: Email required unique        # Built-in Email type
  price: Money min=0 default=9.99    # Key=value modifiers
  status: String values=[a,b,c]      # Enum values
  tags: String[]                      # Array type
```

Available types: `String`, `Integer`, `Number`, `Boolean`, `UUID`, `DateTime`, `Date`, `Email`, `URL`, `Money`, `JSON`

Available modifiers: `required`, `optional`, `unique`, `searchable`, `verified`, `default=`, `min=`, `max=`, `values=[]`, `auto=`

**Metadata** generates synthetic fields automatically:

```yaml
models:
  Post:
    metadata:
      id: uuid              # Generates UUID id field
      audit: true            # Generates createdAt, updatedAt
      softDelete: true       # Generates deletedAt, isDeleted
      status: publishing     # Derives from lifecycle name
      version: true          # Generates version field for optimistic locking
      label: [title]         # Display label field(s)
```

### Relationships

```yaml
relationships:
  orders: hasMany Order cascade       # One-to-many, cascade delete
  customer: belongsTo Customer        # Many-to-one (FK on this model)
  profile: hasOne Profile             # One-to-one
  tags: manyToMany Tag through=PostTag  # Many-to-many via junction
```

Four types: `hasMany`, `belongsTo`, `hasOne`, `manyToMany`

Modifiers: `cascade`, `dependent`, `eager`, `lazy`, `optional`, `through=`

### Lifecycles

State machines on models. The shorthand syntax:

```yaml
lifecycles:
  order:
    flow: draft -> submitted -> confirmed -> shipped -> delivered
```

This generates states, transitions, and the `evolve` operation for state changes.

### Behaviors

Declarative business logic with contracts:

```yaml
behaviors:
  calculateTotal:
    description: "Calculate order total from line items"
    parameters:
      discountRate: Number min=0 max=1
    returns: Money
    requires: ["Order has at least one item", "discountRate is valid"]
    ensures: ["Total reflects all items minus discount"]
    publishes: [OrderTotalCalculated]

  processPayment:
    parameters:
      paymentMethod: String required values=[card,bank,crypto]
      amount: Money required
    requires: ["Amount matches order total", "Payment method is valid"]
    ensures: ["Payment recorded", "Order status updated"]
    publishes: [PaymentProcessed]
    steps:
      - "Validate payment details"
      - "Charge payment provider"
      - "Record transaction"
      - "Update order status"
```

- `requires` — preconditions (must be true before execution)
- `ensures` — postconditions (guaranteed after execution)
- `publishes` — domain events emitted on success
- `steps` — ordered execution steps for complex workflows

### Controllers

Define API endpoints. Usually inferred from models, but can be explicit:

```yaml
controllers:
  ProductController:
    model: Product
    description: "Product management API"
    actions:
      restock:
        parameters:
          quantity: Integer required min=1
        returns: Product
        requires: ["Product exists"]
        ensures: ["Stock increased by quantity"]
        publishes: [ProductRestocked]
```

The inference engine generates standard CURVED operations automatically:
- **C**reate — `POST /api/products`
- **U**pdate — `PATCH /api/products/:id`
- **R**etrieve — `GET /api/products/:id` and `GET /api/products`
- **V**alidate — business rule checking
- **E**volve — lifecycle state transitions
- **D**elete — `DELETE /api/products/:id`

### Services

Business logic that spans multiple models:

```yaml
services:
  OrderFulfillmentService:
    description: "Coordinates order processing across models"
    operations:
      fulfillOrder:
        parameters:
          orderId: UUID required
        returns: Boolean
        requires: ["Order exists and is confirmed"]
        ensures: ["Inventory reserved", "Shipping label created"]
        publishes: [OrderFulfilled]
```

### Events

Domain events with typed payloads:

```yaml
events:
  OrderPlaced:
    description: "Customer placed a new order"
    attributes:
      orderId: UUID required
      customerId: UUID required
      total: Money required
      itemCount: Integer required
```

Events are usually inferred from model behaviors and controller actions. Define them explicitly when you need custom payload shapes.

### Views

UI specifications:

```yaml
views:
  ProductCatalog:
    description: "Product browsing and search"
    model: Product
    type: list

  ProductDetail:
    description: "Single product view"
    model: Product
    type: detail

  OrderDashboard:
    description: "Order management dashboard"
    type: dashboard
```

View types: `list`, `detail`, `form`, `dashboard`, `page`, `custom`

The realize engine generates React components from view specs — list views with sortable columns, detail views with attribute grids, form views with typed inputs and FK dropdowns.

### Deployments

Bridge the logical specification to the physical infrastructure:

```yaml
deployments:
  development:
    version: "1.0.0"
    environment: development
    instances:
      storage:
        mainDb:
          component: MyApp
          type: relational
          provider: sqlite
          persistence: durable
```

Instance types: `controllers`, `services`, `views`, `communications`, `storage`, `security`, `infrastructure`, `monitoring`

### Imports and Exports

Share types and models between specs:

```yaml
components:
  MyApp:
    import:
      - from: "@specverse/primitives"
        select: [Money, Email]
      - from: "./shared-models"
        select: [Address, PhoneNumber]

    export:
      models: [Customer, Order]
      events: [OrderPlaced]
```

---

## Part 2: The Toolchain

### Pipeline

```
.specly file → [parse] → AST → [infer] → Full Architecture → [realize] → Generated Code
```

1. **Parse** — validates syntax, expands conventions (shorthand → full form)
2. **Infer** — generates controllers, services, events, views from models
3. **Realize** — generates production code using instance factories and manifests

### CLI Commands

```bash
# Validate a spec
specverse validate app.specly

# Infer architecture (generates controllers, services, events, views)
specverse infer app.specly -o app-inferred.specly --deployment --verbose

# Generate code
specverse realize all app-inferred.specly -o generated/ -m manifest.yaml

# Generate diagrams
specverse gen diagrams app.specly

# Generate documentation
specverse gen docs app.specly

# Initialize a new project
specverse init my-project --template default

# AI suggestions
specverse ai suggest app.specly

# Quick validation
specverse dev quick app.specly
```

### Manifests

Manifests map capabilities to technologies. They define HOW the spec gets realized:

```yaml
specVersion: "4.0.0"
version: "1.0.0"
name: "my-project"

implementationTypes:
  - name: "FastifyPrismaAPI"
    source: "@specverse/factories-fastify-prisma"

capabilityMappings:
  - capability: "api.rest"
    instanceFactory: FastifyPrismaAPI
  - capability: "storage.database"
    instanceFactory: PrismaPostgres
```

Swap the manifest to change the entire technology stack — Express instead of Fastify, MongoDB instead of PostgreSQL — without changing the spec.

### Generated Output

A single `realize all` produces:

```
generated/
├── backend/
│   ├── src/
│   │   ├── main.ts              # Fastify server with auto-wired routes
│   │   ├── routes/              # Route handlers per model
│   │   ├── services/            # Business logic with L3 behaviors
│   │   ├── controllers/         # CURVED controllers
│   │   └── guards.ts            # Runtime guards from Quint specs
│   └── prisma/
│       └── schema.prisma        # Database schema from models
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # React app with sidebar navigation
│   │   ├── components/          # List, detail, form views per model
│   │   └── api/                 # Type-safe API client
│   └── package.json
└── tools/
    ├── vscode-extension/        # Language support (14 commands)
    └── specverse-mcp/           # MCP server for AI assistants
```

---

## Part 3: Extending SpecVerse

### Adding a New Entity Type

Entity types are the building blocks (models, controllers, services, etc.). Adding a new one requires changes in the entities package:

1. **Create the module directory** at `packages/entities/src/core/{name}/` or `extensions/{name}/`

2. **Implement 9 facets:**

| Facet | File | Purpose |
|-------|------|---------|
| Module definition | `module.yaml` | Name, type, version, dependencies, facet paths |
| Schema | `schema/{name}.schema.json` | JSON Schema fragment defining the entity's properties |
| Conventions | `conventions/{name}-processor.ts` | Expand shorthand syntax into full form |
| Inference | `inference/index.ts` + `.json` rules | Generate this entity from other entities |
| Generators | `generators/index.ts` | Diagram plugins for this entity |
| Behaviour | `behaviour/rules.qnt` | Quint formal specifications |
| Behavioural conventions | `behaviour/conventions/grammar.yaml` | Human-readable invariant patterns |
| Docs | `docs/index.ts` | Documentation references |
| Tests | `tests/index.ts` | Entity-specific test specs |
| Examples | `examples/*.specly` | Example specs demonstrating this entity |

3. **Register in bootstrap** — add to `_bootstrap.ts`

See [ADDING-AN-ENTITY-TYPE.md](guides/ADDING-AN-ENTITY-TYPE.md) for the full 11-step guide.

### Adding a New Instance Factory

Instance factories generate code for specific technologies:

1. Create a YAML definition in `packages/realize/libs/instance-factories/{category}/`
2. Write TypeScript generator functions in `templates/{technology}/`
3. Map capabilities in your manifest

```yaml
# my-factory.yaml
name: ExpressAPI
version: "1.0.0"
type: api-server
capabilities:
  provides: ["api.rest", "api.rest.crud"]
technology:
  runtime: node
  framework: express
codeTemplates:
  routes:
    engine: typescript
    generator: "templates/express/routes-generator.ts"
    outputPattern: "routes/{controller}.ts"
```

### Adding a New LLM Provider

The AI engine supports pluggable LLM providers:

1. Create a class extending `LLMProvider` in `packages/ai/src/providers/`
2. Implement `complete()` and optionally `stream()`
3. Register in `ProviderFactory`
4. Configure in `.specverse.yml`

```typescript
import { LLMProvider, LLMCompletionOptions, LLMCompletionResponse } from './llm-provider.js';

export class MyProvider extends LLMProvider {
  async complete(options: LLMCompletionOptions): Promise<LLMCompletionResponse> {
    // Call your LLM API
    const response = await fetch(this.config.baseURL, { ... });
    return { content: response.text, usage: { ... } };
  }
}
```

### Formal Verification with Quint

Each entity type has Quint specifications that formally verify invariants. Quint specs define:

**Rules** — transformation actions:
```quint
action generateController(m: Model): bool = all {
  not(m.hasParentRelationship),
  controllers' = controllers.union(Set({
    name: m.name + "Controller",
    model: m.name,
    operations: Set("create", "retrieve", "update", "delete")
  }))
}
```

**Invariants** — properties that must always hold:
```quint
val modelsHaveAttributes: bool =
  models.forall(m => m.attributes.keys().size() > 0)

val lifecycleStatesNonEmpty: bool =
  models.forall(m => m.lifecycles.forall(lc => lc.states.size() > 0))

val relationshipTargetsExist: bool =
  models.forall(m => m.relationships.forall(r =>
    models.exists(target => target.name == r.target)))
```

The Quint transpiler converts these to TypeScript runtime guards:
```
117 Quint guards → TypeScript functions in guards.ts
```

These guards are called at runtime to enforce the invariants defined in your spec.

### Behavioural Conventions

Human-readable patterns that compile to Quint invariants:

```yaml
# behaviour/conventions/grammar.yaml
conventions:
  must_have_attributes:
    pattern: "{entities} must have attributes"
    body: "{entities}.forall(m => m.attributes.keys().size() > 0)"

  must_not_be_orphaned:
    pattern: "{entities} must not be orphaned"
    body: "{entities}.forall(e => components.exists(c => c.{entities}.contains(e)))"
```

Write constraints in your spec using natural language:
```yaml
constraints:
  - "model names must be unique"
  - "models must have attributes"
```

---

## Part 4: Architecture

### Engine Packages

| Package | Role | Published |
|---------|------|-----------|
| `@specverse/types` | AST types, engine interfaces | npm |
| `@specverse/engine-entities` | Entity modules, convention processors, compose scripts | npm |
| `@specverse/engine-parser` | Parse .specly → AST, validate schema | npm |
| `@specverse/engine-inference` | Generate architecture from models | npm |
| `@specverse/engine-realize` | Generate code from AST + manifest | npm |
| `@specverse/engine-generators` | Diagrams, documentation, UML | npm |
| `@specverse/engine-ai` | AI prompts, LLM providers, orchestration | npm |

### Entity Module System

Each entity type (models, controllers, etc.) is a self-contained module with 9 facets. The system is composable:

- **Schema fragments** → composed into unified `SPECVERSE-SCHEMA.json`
- **Inference rules** → composed into rule sets (logical + deployment)
- **Examples** → composed into numbered learning progression
- **Convention processors** → chained in dependency order
- **Quint specs** → transpiled to runtime guards

### Separation of Concerns

```
WHAT (specification)  →  defined in .specly files
WHERE (deployment)    →  defined in deployments section
HOW (implementation)  →  defined in manifests + instance factories
```

Change the manifest → change the technology stack.
Change the deployment → change the infrastructure.
The spec stays the same.

---

## Quick Reference

### Convention Shorthand Cheat Sheet

```yaml
# Attributes
fieldName: Type                        # Basic
fieldName: Type required               # Required
fieldName: Type required unique        # Required + unique
fieldName: Type default=value          # With default
fieldName: Type values=[a,b,c]         # Enum
fieldName: Type min=0 max=100          # Bounded
fieldName: Type[]                      # Array

# Relationships
name: hasMany Target                   # One-to-many
name: belongsTo Target                 # Many-to-one
name: hasOne Target                    # One-to-one
name: manyToMany Target through=Join   # Many-to-many

# Lifecycles
flow: state1 -> state2 -> state3      # State machine
```

### CURVED Operations

| Operation | HTTP | Purpose |
|-----------|------|---------|
| Create | POST | Instantiate new entity |
| Update | PATCH | Modify existing entity |
| Retrieve | GET | Fetch one or many |
| Validate | — | Check business rules |
| Evolve | PATCH | Lifecycle state transition |
| Delete | DELETE | Remove entity |

### File Structure

```yaml
components:
  ComponentName:
    version: "1.0.0"
    import: [...]
    export: [...]
    models: { ... }
    controllers: { ... }
    services: { ... }
    events: { ... }
    views: { ... }
    constraints: [...]

deployments:
  name:
    environment: development
    instances: { ... }
```
