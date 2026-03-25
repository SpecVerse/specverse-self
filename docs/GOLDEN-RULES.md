# SpecVerse Golden Rules

**The permanent guiding principles for SpecVerse development.**
Established 25 March 2026. Updated as part of the v4.0.0 release audit.

---

## 1. ARCHITECTURE

### R1: Define Once, Implement Anywhere
Specifications describe WHAT, not HOW. The same .specly file generates Fastify, NestJS, or any target — the spec doesn't change, only the manifest and instance factories.

### R2: Three-Layer Pipeline
Every spec goes through: **Parse → Infer → Realize**. The parser validates and expands conventions. The inference engine generates controllers, services, events, views. The realize engine generates code from instance factory templates.

### R3: Engines Are Independent Packages
Each engine is a standalone npm package (`@specverse/engine-*`) with its own interface, tests, and initialization. Engines discover each other via EngineRegistry, never via direct imports.

### R4: Entity Modules Are the Unit of Extensibility
Every entity type (models, controllers, services, events, views, deployments, commands, promotions, etc.) is an entity module with up to 8 facets: schema, conventions, inference, generators, behaviour, behavioural conventions, docs, tests.

### R5: Entity Modules Bridge Specs and Engines
Each facet connects to exactly one engine. Schema → parser. Conventions → parser. Inference → inference engine. Generators → realize engine. Diagram plugins → generators engine. Adding a facet means that engine automatically discovers it.

### R6: No Circular Dependencies Between Packages
Shared interfaces live in `@specverse/types`. Both parser and entities import from types. Neither imports from the other.

### R7: Deployments Bridge Logical and Physical
Deployments are a core entity type but live at the top level of the spec (not inside components). They define the runtime topology: instances (storage, controllers, communications), channels, bindings, and environment configuration. The logical spec (components) describes WHAT; deployments describe WHERE and HOW it runs. Deployment inference generates instances from controllers, channels from events, and bindings from relationships.

---

## 2. CODE GENERATION

### R8: Fix Generators, Never Hand-Edit Output
Generated code is throwaway. When output has issues, fix the generator template. Generated files are regenerated every time realize runs.

### R9: Manifest Controls Technology, Spec Controls Logic
The spec defines models, behaviors, events, lifecycles. The manifest maps capabilities to instance factories (which ORM, which framework, which frontend). Changing technology = changing manifest, not spec.

### R10: Instance Factories Declare Capabilities
Each factory YAML declares what it provides (`orm.schema`, `api.rest`, `ui.components`). The resolver maps manifest capability mappings to factories. Templates generate code with full context.

### R11: Let Engines Handle Their Own Initialization
CLI commands and handlers call `engine.initialize()` without passing schema, rules, or config. Each engine knows how to find its own resources. No manual schema loading in command handlers.

---

## 3. EXTENSION

### R12: Adding an Entity Type = 3 Changes
1. Create the entity module directory with 8 facets
2. Add one property to `root.schema.json` ComponentsContainer
3. Import and register in `_bootstrap.ts`

Everything else auto-discovers: schema composition, inference rules, convention processing, CLI extension data, generator registration, tests.

### R13: No Hardcoded Entity or Engine Lists
Discovery is directory-based or registry-based. Schema composition scans `core/` and `extensions/` directories. Inference generators auto-discover from the generators directory. Test counts derive from the registry. The only exclude-list is `NON_COMPONENT_TYPES` (3 items: deployments, conventions, measures).

### R14: Core vs Extension Is Packaging, Not Architecture
Core and extension entity modules have identical structure. Core modules get `[]` defaults when absent. Extension modules are omitted when not present. The difference is deployment, not implementation.

### R15: Schema Accepts Both Pre- and Post-Processing Forms
JSON Schema must accept shorthand (pre-convention-processing) and expanded (post-convention-processing) forms using `oneOf`. Convention processors transform between forms. Both schema validation passes must succeed.

---

## 4. QUALITY

### R16: Fix Root Causes, Don't Hack Around Problems
If a validation fails, the check is probably right — the input is wrong. No skip-validation flags, no hardcoded fallbacks, no silent catches that hide real errors. If it was "always broken," fix it properly now.

### R17: No Silent Error Swallowing
Every catch block either logs meaningfully or re-throws. Empty catch blocks must have a comment explaining why silence is correct (e.g., "grammars optional in packaged builds"). The realize pipeline reports all errors, not just a count.

### R18: No Version Numbers in Code Identifiers
No `parseV31()`, `V3ControllerGenerator`, or `v3.1-controller-rules.json` in function/class/variable names. Version comes from package.json or config. File names with versions are acceptable only for genuinely version-specific data (migration files, rule JSON with version metadata).

### R19: Proper TypeScript Typing
No `@ts-ignore` or `@ts-expect-error`. Minimize `as any` — document acceptable ones. Engine interfaces, template contexts, and CLI handlers should be properly typed. Pre-existing `: any` debt in specverse-lang is noted but not blocking.

### R20: Tests Derive Counts From the Registry
Test assertions should not hardcode entity counts, module counts, or grammar counts. Derive from directory scanning or registry queries. `toBeGreaterThanOrEqual` for minimum counts, not exact `toBe`.

---

## 5. SELF-HOSTING

### R21: The Generated CLI IS the Product
specverse-self generates a CLI that does everything the hand-written CLI does. The generated CLI is smaller (410 lines vs 4,407) because engines do the work. Self-hosting is proven: output is byte-for-byte identical.

### R22: specverse-self IS specverse
The self-spec repository is the production release. Not a demo. Everything — CLI, engines, VSCode extension, MCP server, templates, examples, prompts — ships from this specification.

### R23: Generated Apps Must Be Runnable
`specverse realize all` produces code that runs: `npm install → prisma db push → npx tsx src/main.ts → working API + GUI`. If it doesn't run, the generator is broken.

### R24: CURVED, Not CRUD
**C**reate, **U**pdate, **R**etrieve, **V**alidate, **E**volve, **D**elete. Validate is a dry-run endpoint that checks data without side effects. Evolve enforces lifecycle state machines from the spec (e.g., `pending → confirmed → checked_in → checked_out`). This is what distinguishes SpecVerse from an ORM scaffolder.

---

## 6. SEPARATION

### R25: Three Repos, Clear Boundaries
- **specverse-engines**: Source of truth for all engine code. 7 packages. Entity modules live here.
- **specverse-lang**: CLI orchestrator only. Depends on engine packages. Being replaced by specverse-self.
- **specverse-self**: The self-specification and generated output. Future production release.

### R26: No Cross-Repo Runtime Dependencies
specverse-self does not import from specverse-lang at runtime. specverse-engines does not import from specverse-lang. Generated code does not reference specverse-lang paths. The only connection is build-time: specverse-lang's CLI is used to realize the self-spec.

### R27: Memory Lives in specverse-self
Project memory (`.claude/memory/`) lives in specverse-self as the source of truth. specverse-lang symlinks to it. Global Claude project memory symlinks to it. One source of truth, multiple access points.

---

## Summary

27 golden rules across 6 categories. They define:
- How the architecture works (R1-R7)
- How code generation works (R8-R11)
- How to extend the system (R12-R15)
- What quality means (R16-R20)
- What self-hosting means (R21-R24)
- Where things live (R25-R27)

Every change to SpecVerse should be evaluated against these rules.
