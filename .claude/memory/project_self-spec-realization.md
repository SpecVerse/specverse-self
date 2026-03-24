---
name: Self-Specification and Realization Progress
description: SpecVerse self-specification (language specifies itself) reviewed, corrected, and first realization attempted — Prisma generator needs relation name fixes
type: project
---

## Self-Specification (09-01-specverse-self-spec.specly)

**Location**: `specverse-lang/examples/09-advanced/09-01-specverse-self-spec.specly`
**Status**: Reviewed and corrected (2026-03-21). 594 lines, 46 models, 3 components.

### Key Design Decisions Made During Review

1. **Unified Operation model** — `Behaviour`, `CuredOperation`, and `ServiceOperation` were all separate models but they all resolve to `ExecutableProperties` in the schema. Unified into single `Operation` model with attributes: name, description, returns, requires, ensures, plus relationships to parameters (Attribute), publishes (Event), steps (Step).

2. **CURED operations have NO implementation details** — removed `httpMethod` and `path` from operations. HTTP method mapping is a Quint invariant (`httpMethodMapping` in `invariants.qnt`), not a spec-level attribute. Same CURED operation could be REST, gRPC, or CLI.

3. **Step = oneOf [String, Operation]** — progressive disclosure pattern. Step has `instruction` (string form) and optional `expandedOperation: hasOne Operation` (for complex steps). Matches the convention pattern used everywhere else in SpecVerse — user writes at the level of detail they need.

4. **Controller has `curedOperations` + `actions`** — `cured:` is a closed set of 7 operations, `actions:` is open. Both are `hasMany Operation`.

5. **Event now has typed payload** — `attributes: hasMany Attribute`, `version: Integer`, plus `EventVersion` model for compatibility tracking.

6. **View** — `viewType` is open (not a closed enum), added `layout`, `subscriptions`, `tags`, `export`.

7. **Component** — added `tags`, `Import`, `Export` models.

8. **MCPServer/AIOrchestrator** — added missing relationships to their child models.

### Realization Attempt (specverse-self repo)

**Location**: `specverse-self/` (sibling to specverse-lang)
**Status**: Pipeline runs successfully but generated Prisma schema has ambiguous relation errors.

**What worked**:
- `specverse validate` — clean
- `specverse infer` — 1717% expansion (594 lines → 10,884 lines), 46 models fully expanded
- `specverse realize all` — generated 392 files, 49,545 lines of TypeScript/Prisma across backend (Fastify) + frontend (React)
- 43 Prisma models, 43 controllers, 43 route handlers, 43 hooks, 179 React components

**What broke**:
- Prisma schema generator doesn't add `@relation("name")` annotations when multiple fields across different models reference the same target. Example: `Operation` is referenced by `Model.behaviors`, `Controller.curedOperations`, `Controller.actions`, `Service.operations`, `Step.operation`, `Step.expandedOperation` — Prisma requires explicit relation names to disambiguate.

**Why**: The fix must be in the Prisma schema generator (`specverse-lang/libs/instance-factories/orms/templates/prisma/schema-generator.ts`), NOT in the generated output.

**How to apply**: Next step is to fix the Prisma schema generator to detect when a target model is referenced by multiple source fields and automatically add `@relation("RelationName")` annotations.

### Key Insight: ExecutableProperties Is Universal

All "doable things" in SpecVerse share the same shape:

| Context | Syntax | Schema type |
|---------|--------|-------------|
| Model `behaviors:` | named operations | ExecutableProperties |
| Controller `cured:` | 7 standard ops | ExecutableProperties |
| Controller `actions:` | custom ops | ExecutableProperties |
| Service `operations:` | service methods | ExecutableProperties |

ExecutableProperties = { description, parameters, returns, requires, ensures, steps, publishes }
