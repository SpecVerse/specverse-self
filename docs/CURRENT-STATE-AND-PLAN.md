# SpecVerse: Current State and Implementation Plan

**Date**: 25 March 2026 (updated)
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

| Metric | Before (17 Mar) | After (25 Mar) |
|--------|--------|-------|
| specverse-lang src/ | 269 .ts files, 92,127 lines | 69 .ts files, 26,496 lines |
| specverse-engines | (did not exist) | 351 .ts files, 83,769 lines |
| Tests (combined) | 1,752 (all in specverse-lang) | 1,689 (619 + 1,070), zero failures, zero skips |
| Lines removed from specverse-lang | — | -74,489 |
| Self-spec | 817 lines, 4 components | 881 lines, 5 components |
| Entity types | 9 (6 core + 3 extension) | 10 (6 core + 4 extension) |

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
| ai | @specverse/engine-ai | yes | AIEngine (docs/suggest/template) | passing | **yes** | generatePrompt, spec analyser, template loader |

**Missing engines for production release:**

| Engine Needed | Purpose | Exists | Status |
|---------------|---------|--------|--------|
| @specverse/engine-ai | AI prompt building, suggestions, templates | yes | **Working** — generates implementation prompts, analyses specs, loads templates |
| @specverse/engine-mcp | MCP server for Claude Desktop / LLM integration | **NO** | tools/specverse-mcp exists in specverse-lang but not extracted |
| @specverse/engine-lsp | Language Server Protocol for VSCode | **NO** | tools/vscode-extension exists but uses static grammars, not LSP |

### 1.3 CLI Commands

| Command | In Self-Spec | ENGINE_HANDLER | Engine-Wired | Working | Notes |
|---------|-------------|----------------|-------------|---------|-------|
| validate | yes | yes | yes | **PROVEN** | Byte-for-byte identical |
| infer | yes | yes | yes | **PROVEN** | Byte-for-byte identical |
| realize | yes | yes | yes | **PROVEN** | Byte-for-byte identical, uses engine realizeAll() |
| init | yes | yes | yes | **WORKING** | Templates from engine package, variable substitution, --list |
| gen diagrams | yes | yes | yes | **WORKING** | 12 Mermaid diagrams |
| gen docs | yes | yes | yes | **WORKING** | Markdown documentation |
| gen uml | yes | yes | yes | **WORKING** | PlantUML |
| dev format | yes | yes | yes | **WORKING** | Parse + re-serialize YAML, --write saves back |
| dev watch | yes | yes | yes | **WORKING** | File watcher + validate on change |
| dev quick | yes | yes | yes | **WORKING** | Fast schema-only validation |
| cache | yes | yes | yes | **WORKING** | --stats, --list, --clear via ImportResolver |
| ai docs | yes | yes | yes | **WORKING** | 635-line implementation prompt from self-spec |
| ai suggest | yes | yes | yes | **WORKING** | 101 suggestions, 3 severity levels |
| ai template | yes | yes | yes | **WORKING** | Versioned prompt YAML from engine package |
| migrate | no | no | no | n/a | Not in self-spec (deprecated) |
| validate-manifest | no | no | no | n/a | Not in self-spec |
| test/debug/schema | no | no | no | n/a | Internal tooling |

### 1.4 Tools

| Tool | In specverse-lang | In specverse-self | Status |
|------|-------------------|-------------------|--------|
| VSCode extension | yes (v3.5.2) | **Generated from spec** | 14 commands, tmLanguage, themes, schema validation |
| MCP server | yes (v3.5.1) | **Generated from spec** | Spec-driven tool/resource registry |
| AI orchestrator | yes (v3.3.0, 75 tests) | via engine-ai | Prompts, suggestions, templates working |
| Diagram generator | via engine-generators | yes (engine-wired) | 12 diagram types |

### 1.5 Assets

| Asset | In Engine Packages | Shipped by realize all | Status |
|-------|-------------------|----------------------|--------|
| Project templates (4 variants) | @specverse/engine-realize/assets/templates/ | yes | `init` finds them from engine package |
| AI prompts (v1-v9 + default) | @specverse/engine-ai/assets/prompts/ | yes | `ai template` loads them |
| Examples (53 .specly files) | @specverse/engine-realize/assets/examples/ | yes | Includes promotions domain extension |
| JSON Schema | Composed from entity module fragments | yes | Auto-discovered from core/ and extensions/ dirs |
| Build scripts | specverse-lang/scripts/ | not needed | Schema/rules composed by engine packages |
| Tests (1,689) | Split: 1,070 engines + 619 lang | — | All passing, zero failures |

### 1.6 Self-Spec Completeness

The self-specification (881 lines, 47+ models, 5 components) describes:

| Component | What it covers | Complete? |
|-----------|---------------|-----------|
| SpecLanguage | Models, controllers, services, events, views, deployments, manifests, operations | yes |
| BuildSystem | Entity modules, conventions, inference, schema, diagrams, realization | yes |
| ToolsSupport | VSCode extension (languages, commands, themes), MCP server (resources, tools) | yes |
| AISupport | AI orchestrator, workflows | yes |
| CLI | validate, infer, realize, init, gen, dev, cache, ai (8 commands, full subcommand defs) | yes |

**NOT described in self-spec:**
- Test infrastructure
- Build pipeline details (schema composition handled by engine packages)

---

## Part 2: What specverse-self Needs to Be the Release

### Tier 1: Must Have (core functionality)

| Item | What | How |
|------|------|-----|
| ~~**Working AI engine**~~ | ~~ai docs/suggest/template~~ | **DONE** — prompts, spec analyser, template loader |
| ~~**Project templates**~~ | ~~`specverse init` creates working projects~~ | **DONE** — templates in engine package, init self-contained |
| ~~**Schema composition**~~ | ~~Build pipeline composes schema~~ | **DONE** — auto-discovers from entity module directories |
| ~~**Examples**~~ | ~~Reference .specly files~~ | **DONE** — 53 examples shipped including promotions domain extension |
| **Tests** | CI/CD verification that generated CLI works | Self-hosting test as a test suite |

### Tier 2: Should Have (production quality)

| Item | What | How |
|------|------|-----|
| ~~**VSCode extension**~~ | ~~Syntax highlighting, validation~~ | **DONE** — generated from spec (14 commands, tmLanguage, themes) |
| ~~**MCP server**~~ | ~~Claude Desktop integration~~ | **DONE** — generated from spec with tool/resource registry |
| ~~**Build scripts**~~ | ~~Inference rule composition~~ | **DONE** — auto-discovers from entity directories |
| **Full test suite** | 1,689 tests (619 lang + 1,070 engines) | Run against generated output |

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

### Phase 2: Ship Assets with Generated Project (1 week) -- COMPLETE

1. ~~Templates~~ DONE — in @specverse/engine-realize/assets/templates/, `init` finds them
2. ~~Schema~~ DONE — auto-composed from entity directories, shipped by realizeAll()
3. ~~Examples~~ DONE — 53 .specly files in engine-realize/assets/examples/
4. ~~Prompts~~ DONE — v1-v9 + default in @specverse/engine-ai/assets/prompts/
5. ~~Build scripts~~ DONE — schema/rule composition auto-discovers, no scripts needed

`specverse realize all` now produces a COMPLETE self-contained SpecVerse installation.

### Phase 3: Working AI Engine (1 week) -- COMPLETE

1. ~~generatePrompt~~ DONE — structured implementation prompts from AST (635 lines for self-spec)
2. ~~`ai docs`~~ DONE — model tables, relationships, controllers, services, events
3. ~~`ai suggest`~~ DONE — spec-analyser: models, relationships, lifecycles, events, controllers (101 suggestions)
4. ~~`ai template`~~ DONE — loads versioned prompt YAML from engine package
5. ~~Ship prompts~~ DONE — in @specverse/engine-ai/assets/prompts/

### Phase 4: VSCode Extension + MCP Server (1 week) -- COMPLETE (Option B)

Went directly to Option B — specified in self-spec and generated:

1. ~~ToolsSupport component~~ DONE — 7 models (VSCodeExtension, ExtensionCommand, MCPServer, MCPTool, etc.)
2. ~~VSCode extension instance factory~~ DONE — generates package.json (14 commands), ships tmLanguage, themes, schema
3. ~~MCP server instance factory~~ DONE — ships core framework, generates spec-driven tool/resource registry
4. ~~Wired into realizeAll()~~ DONE — Step 10 generates both tools

### Phase 5: Domain Extension Example (1 week) -- COMPLETE

1. ~~`promotions` entity type~~ DONE — full 8-facet implementation (schema, conventions, inference, Quint, generators, docs, tests)
2. ~~Inference integration~~ DONE — PromotionGenerator auto-discovered, generates PromotionService (4 ops) + 2 events
3. ~~Example .specly file~~ DONE — e-commerce store with 6 promotions (shorthand + object syntax)
4. ~~Framework made generic~~ DONE — removed all hardcoded entity lists (adding new entity = 3 changes)
5. ~~Entity extension pattern proven~~ DONE — validates, infers, realizes through standard pipeline

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

- [x] `specverse validate` works (DONE)
- [x] `specverse infer` works (DONE)
- [x] `specverse realize all` works (DONE)
- [ ] `specverse init` creates a working project from templates
- [x] `specverse gen diagrams/docs/uml` works (DONE — 12 diagrams, markdown docs, PlantUML)
- [x] `specverse dev format/watch/quick` works (DONE — all tested)
- [x] `specverse ai docs/suggest/template` produces useful output (DONE — 635-line prompt, 101 suggestions)
- [x] VSCode extension ships with the generated project (DONE — generated from spec)
- [x] MCP server ships with the generated project (DONE — generated from spec)
- [x] Examples directory is included (DONE — 53 .specly files)
- [x] Build pipeline (schema composition) is included (DONE — auto-discovers from directories)
- [x] At least one domain extension example exists (DONE — promotions, full 8-facet)
- [x] Entity extension framework is fully generic (DONE — 3 changes to add entity)
- [ ] Sample business app with real business logic (behaviors, lifecycles, events)
- [ ] L3 behavior generation produces operation logic (not just CRUD stubs)
- [ ] Quint invariants transpile to runtime guards
- [ ] Test suite runs and passes
- [x] Output is byte-for-byte identical to specverse-lang for core pipeline (DONE)

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
