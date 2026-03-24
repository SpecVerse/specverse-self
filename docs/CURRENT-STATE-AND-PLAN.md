# SpecVerse: Current State and Implementation Plan

**Date**: 24 March 2026 (updated)
**Purpose**: Honest, structured assessment of where we are, what's missing, and the plan to reach the goal: **specverse-self replaces specverse-lang as the production release of SpecVerse.**

---

## The Goal

specverse-self IS specverse. The complete toolchain — CLI, engines, VSCode extension, MCP server, templates, examples, tests — generated from the self-specification. Not a demo. The actual release.

---

## Phase 1 Complete: Source Consolidation (17-24 March 2026)

### What Happened

specverse-lang was a monolith containing everything: parser, inference engine, entities, generators, realize engine, diagram engine, CLI, AI, registry, migration, and tools. Over one week (57 commits in specverse-lang, 20 in specverse-engines), we:

1. **Extracted 7 engine packages** to specverse-engines (types, entities, parser, inference, realize, generators, ai)
2. **Built a cross-package test framework** with `resolvePackage()`, `testEntityModule()`, `testEngine()`
3. **Removed all duplicate source code** from specverse-lang — it now depends entirely on @specverse/engine-* packages
4. **Fixed pre-existing bugs** found during the audit:
   - Inference rule files with wrong format (missing `ruleFileType`)
   - VSCode extension CLI discovery (missing exports)
   - `new Function()` ESM hacks replaced with `import.meta.url`
   - `file://` URL stripping with `.slice(7)` replaced with `fileURLToPath()`
   - Duplicated pluralization extracted to shared `@specverse/types` utility
   - 65-line hardcoded AI catalog fallback replaced with actionable warning
   - 8 unnecessary `@ts-ignore` directives removed
   - Brittle path resolution consolidated

### By the Numbers

| Metric | Before | After |
|--------|--------|-------|
| specverse-lang src/ | 269 .ts files, 92,127 lines | 69 .ts files, 27,136 lines |
| specverse-engines | (did not exist) | 318 .ts files, 74,194 lines |
| Tests (combined) | 1,752 (all in specverse-lang) | 1,685 (619 + 1,066), zero failures |
| Lines removed from specverse-lang | — | -74,489 |

### specverse-lang is now the CLI orchestrator

| Directory | Files | Lines | Purpose |
|-----------|------:|------:|---------|
| src/cli/ | 13 | 7,673 | CLI commands and session management |
| src/ai/ | 11 | 1,735 | AI integration (not yet in engine packages) |
| src/registry/ | 21 | 7,655 | Package registry |
| src/migration/ | 3 | 1,248 | Version migration |
| src/utils/ | 4 | 1,199 | Path resolution, config loading |

### specverse-engines: 7 independent packages

| Package | Files | Lines |
|---------|------:|------:|
| @specverse/types | 6 | 793 |
| @specverse/engine-entities | 86 | 9,510 |
| @specverse/engine-parser | 38 | 10,645 |
| @specverse/engine-inference | 29 | 13,038 |
| @specverse/engine-realize | 119 | 24,994 |
| @specverse/engine-generators | 29 | 13,449 |
| @specverse/engine-ai | 11 | 1,765 |

### The Self-Hosting Comparison

| | specverse-self | specverse-lang |
|---|---:|---:|
| **Input** | 817-line spec | hand-written |
| **CLI** | 783 lines (generated) | 7,673 lines (hand-written) |
| **src/ TypeScript** | 23,406 lines (200 files) | 26,472 lines (69 files) |
| **Total generated output** | 180,122 lines (396 files) | — |

The generated CLI is 10x smaller and does the same core job — because the engines do the work. 817 lines of spec produces 180,122 lines of code (220x expansion).

---

## Part 1: Structured Gap Analysis

### 1.1 Entity Types

| Entity | Schema | Convention Processor | Inference Rules | Quint Specs | Behavioural Convs | Generators | In Self-Spec | Notes |
|--------|--------|---------------------|-----------------|-------------|-------------------|------------|-------------|-------|
| models | done | done | done (controller + service rules) | done (9 invariants) | done | done | yes | Foundational |
| controllers | done | done | - | done (5 invariants) | done | done | yes | |
| services | done | done | - | done (7 invariants) | done | done | yes | |
| events | done | done | done (event rules) | done | done | done | yes | |
| views | done | done | done (view rules) | done | done | done | yes | |
| deployments | done | done | done (deployment rules) | done | done | done | yes | |
| commands | done | done | **empty** | done (8 invariants) | done | **empty** | yes | No inference or code gen yet |
| conventions | done | done | **empty** | done | done | **empty** | no | Meta-circular grammar defs |
| measures | done | done | **empty** | done | done | **empty** | no | Aggregation semantics |

**Missing inference rules**: commands, conventions, measures have no inference rules — they don't auto-generate anything from models.

**Missing generators**: commands, conventions, measures have no code generators — they don't produce realized code.

**Missing from self-spec**: conventions and measures entity types not described in the self-specification.

### 1.2 Engines

| Engine | Package | Builds | Engine Adapter | Tests | Fully Wired | Notes |
|--------|---------|--------|----------------|-------|-------------|-------|
| types | @specverse/types | yes | n/a | n/a | yes | AST + engine interfaces + shared utils |
| entities | @specverse/engine-entities | yes | EngineRegistry | 1,066/1,066 | yes | All passing (incl. 25 Quint tests) |
| parser | @specverse/engine-parser | yes | ParserEngine | passing | yes | Self-hosting proven |
| inference | @specverse/engine-inference | yes | InferenceEngine + model conversion | passing | yes | Self-hosting proven |
| realize | @specverse/engine-realize | yes | RealizeEngine + realizeAll() | passing | yes | Self-hosting proven |
| generators | @specverse/engine-generators | yes | GeneratorsEngine (diagrams/docs/uml) | passing | yes | Self-hosting proven |
| ai | @specverse/engine-ai | yes | AIEngine (graceful fallback) | none | **partial** | EcosystemPromptManager needs catalogPath |

**Missing engines for production release:**

| Engine Needed | Purpose | Exists | Status |
|---------------|---------|--------|--------|
| @specverse/engine-ai | AI prompt building, suggestions, templates | yes | Adapter incomplete — needs working prompt generation |
| @specverse/engine-mcp | MCP server for Claude Desktop / LLM integration | **NO** | tools/specverse-mcp exists in specverse-lang but not extracted |
| @specverse/engine-lsp | Language Server Protocol for VSCode | **NO** | tools/vscode-extension exists but uses static grammars, not LSP |

### 1.3 CLI Commands

| Command | In Self-Spec | ENGINE_HANDLER | Engine-Wired | Working | Notes |
|---------|-------------|----------------|-------------|---------|-------|
| validate | yes | yes | yes | **PROVEN** | Byte-for-byte identical |
| infer | yes | yes | yes | **PROVEN** | Byte-for-byte identical |
| realize | yes | yes | yes | **PROVEN** | Byte-for-byte identical |
| init | yes | yes | delegates | partial | Needs templates shipped with generated project |
| gen diagrams | yes | yes | yes | **PROVEN** | 14 Mermaid diagrams |
| gen docs | yes | yes | yes | **PROVEN** | 2,873 lines markdown |
| gen uml | yes | yes | yes | **PROVEN** | 360-line PlantUML |
| dev format | yes | yes | engine-wired | untested | Re-serializes YAML |
| dev watch | yes | yes | engine-wired | untested | File watching |
| dev quick | yes | yes | engine-wired | untested | Fast validation |
| cache | yes | yes | engine-wired | stub | Import cache management |
| ai docs | yes | yes | engine-wired | **not working** | Needs AI engine |
| ai suggest | yes | yes | engine-wired | **not working** | Needs AI engine |
| ai template | yes | yes | engine-wired | **not working** | Needs AI engine |
| migrate | no | no | no | n/a | Not in self-spec (deprecated) |
| validate-manifest | no | no | no | n/a | Not in self-spec |
| test/debug/schema | no | no | no | n/a | Internal tooling |

### 1.4 Tools (NOT in specverse-self)

| Tool | In specverse-lang | In specverse-self | Gap |
|------|-------------------|-------------------|-----|
| VSCode extension | yes (v3.5.2, published) | **NO** | Syntax highlighting, validation, IntelliSense |
| MCP server | yes (v3.5.1, production) | **NO** | Claude Desktop integration, AI tool access |
| AI orchestrator | yes (v3.3.0, 75 tests) | **NO** | Multi-provider LLM workflows |
| Diagram generator | via engine-generators | yes (engine-wired) | Covered |

### 1.5 Assets (NOT in specverse-self)

| Asset | In specverse-lang | In specverse-self | Gap |
|-------|-------------------|-------------------|-----|
| Project templates (4 variants) | yes (templates/) | **NO** | `specverse init` won't work |
| AI prompts (v1-v9) | yes (prompts/) | **NO** | AI commands need prompts |
| Examples (25+ .specly files) | yes (examples/) | only self-spec | Learning material missing |
| JSON Schema | composed at build time | copied manually | Need build pipeline |
| Build scripts | yes (scripts/) | **NO** | Schema composition, rule composition |
| Tests (1,685) | split across repos | **NO** | No test infrastructure in self |

### 1.6 Self-Spec Completeness

The self-specification (817 lines, 46 models, 4 components) describes:

| Component | What it covers | Complete? |
|-----------|---------------|-----------|
| SpecLanguage | Models, controllers, services, events, views, deployments, manifests, operations | yes |
| BuildSystem | Entity modules, conventions, inference, schema, diagrams, realization | yes |
| AISupport | MCP server, resources, tools, orchestrator, workflows | yes |
| CLI | validate, infer, realize, init, gen, dev, cache, ai | yes |

**NOT described in self-spec:**
- VSCode extension structure
- MCP server implementation details
- AI orchestrator workflow engine
- Project template structure
- Build pipeline / schema composition
- Test infrastructure

---

## Part 2: What specverse-self Needs to Be the Release

### Tier 1: Must Have (core functionality)

| Item | What | How |
|------|------|-----|
| **Working AI engine** | ai docs/suggest/template produce useful output | Wire EcosystemPromptManager or build simpler prompt generator |
| **Project templates** | `specverse init` creates working projects | Ship templates with the generated project (copy from specverse-lang) |
| **Schema composition** | Build pipeline composes schema from entity fragments | Ship compose-schema.cjs or make it an engine capability |
| **Examples** | At least 5 reference .specly files | Copy core examples or generate from self-spec |
| **Tests** | CI/CD verification that generated CLI works | Self-hosting test as a test suite |

### Tier 2: Should Have (production quality)

| Item | What | How |
|------|------|-----|
| **VSCode extension** | Syntax highlighting, validation | Ship existing extension with generated project OR specify it in self-spec |
| **MCP server** | Claude Desktop integration | Extract to @specverse/engine-mcp OR ship existing |
| **Build scripts** | Inference rule composition, prompt copying | Part of realize pipeline or separate engine |
| **Full test suite** | 1,685 tests (619 lang + 1,066 engines) | Run against generated output |

### Tier 3: Nice to Have (ecosystem)

| Item | What | How |
|------|------|-----|
| **AI orchestrator** | Multi-provider LLM workflows | @specverse/engine-ai with full manager |
| **Domain example** | Real domain with extension entity | Fresh example (promotions, inventory, etc.) |
| **npm published engines** | Anyone can `npm install @specverse/engine-parser` | Publish to npm registry |
| **Contribution guide** | How to add entities, engines, factories | Already written (3 guides) |

---

## Part 3: Implementation Plan

### Phase 1: Consolidate (1 week) -- COMPLETE

1. ~~Merge `feature/wire-entity-modules` to `main` in specverse-lang~~ DONE
2. ~~Fix 93 failing tests in specverse-engines~~ DONE (1,066/1,066 passing)
3. ~~Decide: specverse-engines is source of truth; specverse-lang depends on engine packages~~ DONE
4. ~~Remove duplicate source from specverse-lang~~ DONE (-74,489 lines)
5. ~~Code quality audit and fixes~~ DONE (rule formats, ESM hacks, silent catches, etc.)
6. Domain repos: deferred (not blocking)

### Phase 2: Ship Assets with Generated Project (1 week)

Make `specverse realize all` also copy the assets that specverse-self needs:

1. **Templates**: Copy `templates/` during realize → generated project has `specverse init`
2. **Schema**: Already done (copied manually). Automate in realize pipeline.
3. **Examples**: Copy core examples during realize → learning material included
4. **Prompts**: Copy `prompts/` during realize → AI commands have prompt versions
5. **Build scripts**: Copy compose-schema.cjs, compose-inference-rules.cjs

This means the realize pipeline produces a COMPLETE specverse installation, not just an app.

### Phase 3: Working AI Engine (1 week)

The AI pillar is central to SpecVerse's value proposition.

1. Build a simpler prompt generator in @specverse/engine-ai that works without full EcosystemPromptManager config
2. `ai docs` generates implementation prompts from a parsed spec
3. `ai suggest` identifies missing attributes, relationships, patterns
4. `ai template` generates framework-specific implementation templates
5. Ship prompts/core/ with the AI engine package

### Phase 4: VSCode Extension + MCP Server (1 week)

These are the developer experience tools.

**Option A** (quick): Ship existing tools as-is with the generated project
- Copy `tools/vscode-extension/` to generated project
- Copy `tools/specverse-mcp/` to generated project
- Add npm scripts to launch them

**Option B** (proper): Specify them in the self-spec and generate
- Add `ToolsSupport` component to self-spec with VSCode extension model
- VSCode extension becomes a realize target (instance factory for VSCode)
- MCP server becomes @specverse/engine-mcp

Option A first, Option B as the longer-term goal.

### Phase 5: Domain Extension Example (1 week)

Build a fresh example (NOT using stale domain repos).

1. Create a `promotions` extension entity type in a new example project
2. Full 8-facet implementation: schema, conventions, inference, Quint, generators
3. Demonstrate: `.specly` file with `promotions:` section validates, infers, realizes
4. Document as a walkthrough showing the entity extension pattern in practice
5. Add to examples/ as a reference for how to extend SpecVerse

### Phase 6: Sample Business App (1 week)

Prove SpecVerse handles real business logic, not just CRUD scaffolding.

Build a complete business application spec (e.g., order management, subscription billing, or property rental) that demonstrates:

1. **Business rules via behaviors** — operations with preconditions, postconditions, and steps:
   ```yaml
   behaviors:
     placeOrder:
       requires: ["cart is not empty", "customer is verified"]
       steps:
         - "Validate stock availability"
         - "Calculate pricing with promotions"
         - "Process payment"
         - "Create shipment"
       ensures: ["order status is confirmed", "inventory updated"]
       publishes: [OrderPlaced, InventoryReduced, PaymentProcessed]
   ```

2. **Lifecycle state machines** — orders, subscriptions, approvals with guarded transitions:
   ```yaml
   lifecycles:
     orderStatus:
       flow: draft -> submitted -> approved -> fulfilled -> completed
   ```

3. **Cross-model events** — event chains that trigger business workflows:
   ```yaml
   events:
     OrderPlaced:
       attributes:
         orderId: UUID required
         totalAmount: Decimal required
     InventoryReduced:
       attributes:
         productId: UUID required
         quantity: Integer required
   ```

4. **Domain-specific conventions** — if using the promotions extension entity, show convention expansion:
   ```yaml
   promotions:
     earlyBird:
       discount: percentage=15
       validUntil: 2026-12-31
       appliesTo: [Subscription]
       requires: "signup within 7 days"
   ```

5. **L3 behavior generation** — the realized services should have real operation logic from the behavioral spec (precondition guards, step execution, postcondition verification, event publishing), not just CRUD stubs.

**Deliverable**: A .specly file (~200-400 lines) that realizes into a working business application where the generated service code contains actual business logic derived from the spec's behaviors, lifecycles, and events.

**Why this matters**: This is the proof that SpecVerse is a business specification language, not just an ORM/API scaffolder. The L3 behavior generation should produce code that a developer can read and recognize as their business rules.

### Phase 7: Quint → Runtime Guards (1 week)

Bridge formal verification to generated code.

1. Parse .qnt files with @informalsystems/quint API
2. Walk IR, generate TypeScript guard functions
3. Wire guards into realized services/controllers
4. Each entity module's Quint invariants become runtime checks

### Phase 8: Self-Hosting as Release (1 week)

The final step: specverse-self becomes the release.

1. `specverse realize all` on the self-spec produces the complete toolchain:
   - CLI (8+ commands, engine-wired)
   - Engine packages
   - VSCode extension
   - MCP server
   - Templates, examples, prompts
   - Build pipeline
   - Test infrastructure
   - Business app example with L3 behavior generation
   - Domain extension example
2. Run the full test suite against the generated output
3. Verify the business app's generated services contain real logic (not stubs)
4. Version as specverse v4.0.0 — "generated from specification"

---

## Part 4: Success Criteria

### specverse-self IS specverse when:

- [ ] `specverse validate` works (DONE)
- [ ] `specverse infer` works (DONE)
- [ ] `specverse realize all` works (DONE)
- [ ] `specverse init` creates a working project from templates
- [ ] `specverse gen diagrams/docs/uml` works (DONE)
- [ ] `specverse dev format/watch/quick` works
- [ ] `specverse ai docs/suggest/template` produces useful output
- [ ] VSCode extension ships with the generated project
- [ ] MCP server ships with the generated project
- [ ] Examples directory is included
- [ ] Build pipeline (schema composition) is included
- [ ] At least one domain extension example exists
- [ ] Sample business app with real business logic (behaviors, lifecycles, events)
- [ ] L3 behavior generation produces operation logic (not just CRUD stubs)
- [ ] Test suite runs and passes
- [ ] Output is byte-for-byte identical to specverse-lang for core pipeline (DONE)

### The release test:

```bash
# Start from nothing
git clone specverse-self
cd specverse-self/generated/code/backend
npm install
npm run cli -- validate ../../../specs/main.specly    # Validates itself
npm run cli -- infer ../../../specs/main.specly        # Infers from itself
npm run cli -- realize all ...                          # Generates itself
npm run cli -- gen diagrams ../../../specs/main.specly  # Documents itself
npm run cli -- ai docs ../../../specs/main.specly       # AI prompt for itself
specverse init my-project                               # Creates a new project
code --install-extension specverse.vsix                  # VSCode support

# And for a real business app:
npm run cli -- validate examples/business-app.specly     # Business spec validates
npm run cli -- infer examples/business-app.specly        # Generates full architecture
npm run cli -- realize all ...                            # Generates code with business logic
# Generated services contain: precondition guards, lifecycle transitions,
# event publishing, step-by-step operation logic — not just CRUD
```

---

## Timeline

| Phase | Duration | Key Deliverable |
|-------|----------|----------------|
| 1. Consolidate | 1 week | Clean repos, branch merged, tests green |
| 2. Ship assets | 1 week | Generated project is complete (templates, examples, prompts) |
| 3. AI engine | 1 week | ai docs/suggest/template produce real output |
| 4. VSCode + MCP | 1 week | Developer tools ship with generated project |
| 5. Domain example | 1 week | promotions entity validates/infers/realizes |
| 6. Business app | 1 week | Real business logic spec → generated code with L3 behaviors |
| 7. Quint guards | 1 week | Formal invariants become runtime checks |
| 8. Release | 1 week | specverse-self v4.0.0 — "generated from specification" |

**Total: ~8 weeks**

The business app (Phase 6) is the credibility proof. The self-spec proves the toolchain works. The domain example proves extensibility. The business app proves SpecVerse is a real specification language for real applications — not a toy that can only describe itself.
