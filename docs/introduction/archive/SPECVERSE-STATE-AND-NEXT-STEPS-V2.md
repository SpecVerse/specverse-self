# SpecVerse: Current State of Thinking & Next Steps (V2)

**Original**: 22 February 2026
**Updated**: 12 March 2026
**Purpose**: Honest assessment of where we are, what we've clarified, what the external landscape has revealed, and a disciplined path forward.

---

## Where We Are Right Now

### The Honest Picture

SpecVerse has been dormant since early December 2025. All 10 repositories show their last commits between August and December 2025, with nothing in the last 3+ months. The core language (specverse-lang v3.5.1) has 1,900/1,901 tests passing -- the foundation is solid. But the ecosystem around it has version drift, incomplete pillars, and no clear path from "here's a .specly file" to "here's a running application."

Through the original analysis session we stepped back and identified what SpecVerse actually is. Since then, six deep external analyses have dramatically sharpened the picture -- validating the thesis, revealing SpecVerse's unique market position, and clarifying the strategic direction.

### What We Clarified (February 2026)

**1. The old narrative was wrong.**
"Write 90% less code" positions SpecVerse against every AI coding tool on the market -- a fight it can't win. The actual proposition is different and more defensible.

**2. The Four Pillars are the strategy, not a feature list.**
Pillar 1 (Human-Writable) works. Pillar 2 (AI-Writable) partially works -- `create` is validated with measured results (4x-7.6x expansion). Pillar 3 (AI-Describable) has been demonstrated (JobHunter) but not productised. Pillar 4 (AI-Implementable) works through `realize` for known patterns but the AI path is incomplete. The pillars are the moat -- and half the moat is unbuilt.

**3. The realize system is smarter than it looks.**
`realize` and `ai template` aren't competing -- they're stages in a maturity lifecycle. AI explores, human validates, the solution is captured as a deterministic instance factory. This is LLM knowledge distillation: generate once, replay forever. It's the strongest technical story SpecVerse has, and it's essentially undocumented.

**4. The language has real coverage limits.**
SpecVerse excels at CRUD/SaaS/event-driven applications. It has no primitives for analytics, data pipelines, external integrations, workflow orchestration, or testing contracts. This is fine if acknowledged -- CRUD/SaaS is a massive market. It's a problem if you claim to be a universal specification language.

**5. The ecosystem is comprehensive but disconnected.**
Parser, inference engine, CLI, VSCode extension, runtime interpreter, AI test lab, registry, documentation site, diagram generator, MCP server, AI orchestrator, 3D visualiser -- the pieces exist. The tooling is more mature than it appears:

- **MCP Server** (v3.5.1, production-ready): Dynamically exposes all CLI commands as MCP tools, multi-environment deployment (local/web/VSCode/Docker), deployed on Vercel, ready for Claude Desktop integration
- **AI Orchestrator** (v3.3.0): Multi-provider LLM orchestration (OpenAI, Anthropic, Azure, Ollama), YAML-based prompt management, multi-step workflows with session management, 75 tests
- **Diagram Generator** (v3.3.0): Mermaid diagrams for models, relationships, lifecycles, profiles, controllers, services, events; batch processing; Docusaurus integration
- **VSCode Extension** (v3.5.1): Syntax highlighting, real-time validation, IntelliSense, hover docs, 50+ commands auto-synced from CLI, published to marketplace

The infrastructure for LLM integration and SDD tool consumption *already exists*. What's missing is the end-to-end developer experience connecting them, and the validation/documentation to prove they work together.

### What We've Learned Since (March 2026)

Six deep analyses of external tools, languages, and movements have transformed the strategic picture:

**6. The market has validated the thesis -- overwhelmingly.**
The Spec-Driven Development movement exploded in 2025-2026. GitHub's Spec Kit (75K stars), OpenSpec (28.5K stars), and GSD (26.3K stars) amassed 130K+ combined stars. AWS built a dedicated IDE (Kiro). Tessl raised venture capital. Thoughtworks certified SDD as a key practice. Martin Fowler's site published a three-tool comparison. The debate about whether spec-first development matters is over. The only question is the format.

**7. Every SDD tool uses Markdown -- none has a specification language.**
This is the single most important finding. Spec Kit, OpenSpec, GSD, Kiro, Tessl, BMAD -- every workflow tool uses natural-language Markdown as its specification format. No parser. No inference. No schema validation. No convention processing. Martin Fowler's article confirms: "None use formal specification languages." The entire SDD movement built the process layer. The language layer is empty -- except for SpecVerse.

**8. The numbers are devastating for Markdown specs.**
Scott Logic found that Spec Kit generates 2,067 lines of Markdown to produce 689 lines of code -- a 0.3x *contraction*. It was 10x slower than iterative prompting with no quality improvement. Compare this with SpecVerse's 4x-7.6x *expansion*. These are opposite philosophies: Markdown specs require you to write *more* than the code; SpecVerse requires you to write *less* than the architecture.

**9. Quint proves formal specification languages work in production.**
Quint (Informal Systems) is an executable specification language for distributed systems with an ANTLR parser, type checker, simulator, REPL, and model checker (Apalache/Z3). It's been used on 18+ production projects including Circle's Malachite consensus engine and Solana's Alpenglow. Their Malachite case study: "couple of months" reduced to one week, two bugs caught in the English spec before code was written. Their thesis: "LLMs don't think, they translate. Quint's deterministic tools do the reasoning." This is the strongest external validation that SpecVerse's approach -- formal language with real tooling -- is correct.

**10. Convention processors are SpecVerse's unique differentiator.**
Every analysis confirmed this. Quint requires hand-writing every spec (defensible for bespoke consensus protocols). SDD tools use prose. Wolfram is an expert tool. Convention processors (`email: Email required unique verified` → schema + DDL + validation + endpoints) are what make formal specification *accessible*. No one else has this. Without convention processors, each domain is an expert tool. With them, every domain is accessible to every developer.

**11. SpecVerse occupies a unique quadrant in the competitive landscape.**

```
                    FORMAL ────────────────────── INFORMAL
                      │                              │
    LANGUAGE LAYER    │  SpecVerse (.specly)          │
    (What to build)   │    enterprise systems         │
                      │  Quint (.qnt)                 │
                      │    distributed systems        │
                      │                              │
    ──────────────────┼──────────────────────────────┼──
                      │                              │
    PROCESS LAYER     │                              │  Spec Kit
    (How to build it) │                              │  OpenSpec
                      │                              │  GSD
                      │                              │  Kiro
                      │                              │  Tessl
                      │                              │  BMAD
                      │                              │
```

Every SDD workflow tool is in the informal-process quadrant. Only SpecVerse and Quint are in the formal-language quadrant -- serving entirely different domains.

**12. The meta-specification platform direction is validated.**
Five independent analyses (Wolfram, VSDD, Lean, SDD landscape, Quint) all converge on the same architecture: a platform that orchestrates domain-specific specification languages with convention processors bridging human intent to formal language. No one else is building this platform.

### The New Narrative

The old narrative ("write 90% less code") was wrong. The intermediate narrative ("communication protocol between humans and AI") was too abstract. The analyses have revealed a sharper, more defensible positioning:

> **SpecVerse is the only formal specification language for enterprise software -- in a market that has proven it desperately needs one.**

Supporting evidence:
- 130K+ stars on SDD tools prove the market wants spec-first development
- Every SDD tool uses Markdown, and every serious evaluation says Markdown specs are insufficient
- Quint proves formal spec languages work in production (different domain)
- SpecVerse's convention processors make formal specs accessible (unique capability)
- Spec Kit's 0.3x contraction vs SpecVerse's 4x-7.6x expansion is the killer comparison

The strategic position: **SpecVerse is the language layer beneath the workflow layer.** It doesn't compete with SDD tools -- it completes them. Every SDD workflow needs a specification format. Currently they all use Markdown. SpecVerse offers one that is minimal, expandable, validatable, portable, and convention-driven.

---

## The Specification Hierarchy

Emerged from six analyses (Wolfram, VSDD, Lean, SDD Landscape, Quint):

```
Level 5: Meta-Specification Platform (SpecVerse)
         Orchestration, cross-domain validation, convention processor registry

Level 4: Workflow Orchestration (SDD Tools)
         Spec Kit, OpenSpec, GSD, Kiro, Tessl, BMAD
         Process management, agent coordination, context engineering

Level 3: Domain Specification Languages
         .specly (enterprise), Quint (distributed systems),
         OpenAPI (APIs), Terraform (infrastructure), dbt (analytics)

Level 2: Computational Specification
         Wolfram/SymPy/Julia (precise math definitions)

Level 1: Formal Verification
         Lean (mathematical proofs), Apalache/Z3 (model checking)
         Quint bridges L3 → L1 via Apalache

Level 0: Implementation
         AI-generated code
```

Convention processors bridge Level 5 to Level 3 (human intent → domain language). SDD tools bridge Level 4 to Level 0 (process → code). The gap between Level 4 and Level 3 -- workflow to formal language -- is where the integration opportunity lives. SpecVerse can become the specification engine beneath any SDD workflow tool.

---

## Repository Health Check (March 2026)

| Repository | Version | Last Commit | Tests | State |
|------------|---------|-------------|-------|-------|
| **specverse-lang** | 3.5.1 | 6 Dec 2025 | 1,900/1,901 pass | Solid, minor uncommitted changes |
| **specverse-lang-doc** | 3.2.0 | 6 Dec 2025 | N/A | 3 minor versions behind lang |
| **specverse-lang-registry** | 3.3.2 | 6 Dec 2025 | 49 pass | Deployed, functional |
| **specverse-app-demo** | 0.1.0 | 6 Dec 2025 | 203/205 pass | Functional runtime interpreter |
| **specverse-demo-ai** | N/A | 5 Dec 2025 | Framework ready | demo-create validated, rest untested recently |
| **specverse-demo-guesthouse** | 2.0.0 | 14 Aug 2025 | N/A | Stale -- 7 months without commit |
| **specverse-domain-company-model** | 3.1.0 | 5 Dec 2025 | N/A | 4 minor versions behind lang |
| **specverse-domain-retail-commerce-model** | 3.1.0 | 10 Aug 2025 | N/A | 4 minor versions behind, stale |
| **specverse-app-portal** | 0.12.0 | 3 Oct 2025 | N/A | Stale -- 5+ months |
| **layered-3d-graph** | 1.0.0 | 22 Oct 2025 | N/A | Stable, no changes needed |

### Embedded Tools (inside specverse-lang)

| Tool | Version | State | Key Capability |
|------|---------|-------|----------------|
| **specverse-mcp** | 3.5.1 | Production-ready | Dynamic CLI proxy exposes all commands as MCP tools; multi-env deployment; Vercel-deployed |
| **ai-orchestrator** | 3.3.0 | Functional, inactive | Multi-provider LLM orchestration; YAML prompts; workflow engine; 75 tests |
| **diagram-generator** | 3.3.0 | Mature | Mermaid diagrams for all entity types; batch processing; Docusaurus output |
| **vscode-extension** | 3.5.1 | Production-ready | Full language support; 50+ auto-synced commands; published to marketplace |

**Key observations**:
- Everything was touched in a burst around December 2025, then nothing. Version drift is real and visible.
- The MCP server and VSCode extension are at v3.5.1 (current) -- these are the most up-to-date tools.
- The AI orchestrator is 2 minor versions behind (3.3.0 vs 3.5.1) and has an `OrchestratorBridge` in the MCP server that may need validation.
- The tooling is significantly more mature than the dormant commit history suggests.

---

## What Needs to Happen (In Order)

The temptation is to keep building features. The discipline is to **finish what's started, align what exists, and demonstrate what works** before adding anything new.

### Phase 1: Clean House (Do First)

The ecosystem looks abandoned to anyone discovering it. Before any new feature work, make what exists consistent and current.

#### 1.1 Align Versions Across All Repositories

Every repo should declare compatibility with specverse-lang v3.5.1. This doesn't mean rewriting code -- it means:

- Update `package.json` version references in domain models (3.1.0 → 3.5.x compatible)
- Update specverse-lang-doc to reference v3.5.1 (currently references v3.2.0)
- Validate all existing .specly examples against current schema
- Fix any that break
- Commit with a consistent message across all repos: "Align with specverse-lang v3.5.1"

**Effort**: 1-2 days
**Signal it sends**: This project is maintained and current.

#### 1.2 Clean Up specverse-lang

- Commit the uncommitted changes (documentation.html, documentation.md)
- Add `.test-temp/` to `.gitignore`
- Verify the 1 expected test failure is documented
- Ensure `npm test` runs clean from a fresh clone

**Effort**: 1 hour

#### 1.3 Decide on Dormant Repositories

Three repos need a decision -- maintain or archive:

| Repository | Last Active | Decision Needed |
|------------|------------|-----------------|
| **specverse-demo-guesthouse** | Aug 2025 | Is this the canonical demo app? If yes, update it. If superseded by app-demo, archive it. |
| **specverse-app-portal** | Oct 2025 | Is this part of the story? If not in the next 6 months' plan, archive it. |
| **specverse-domain-retail-commerce-model** | Aug 2025 | Update to v3.5.1 or archive. Having a stale domain model undermines the "living specification" pitch. |

**Effort**: 1 day for decisions, 1-2 days for execution

#### 1.4 Write a Root-Level README

The `/Volumes/Dev24/GitHub/SpecVerse/` directory has analysis documents but no README that orients someone arriving at the organisation level. The existing `CLAUDE.md` is for AI assistants, not humans.

Create a `README.md` that:
- States what SpecVerse is (the formal specification language positioning, not "90% less code")
- Maps the repositories with one-line descriptions
- Shows the competitive map and specification hierarchy
- Points to the introduction document and documentation site
- Shows the Four Pillars diagram

**Effort**: Half a day

---

### Phase 2: Prove the Story (Do Next)

The introduction document tells a compelling story. The analyses provide external validation. Now prove it works end-to-end.

#### 2.1 Get All Four AI Operations Working in demo-ai

Current state:
- `demo-create`: Working, validated (4x expansion, $0.38/run)
- `pro-create`: Ready but not recently tested
- `demo-analyse`: Ready but not recently tested
- `pro-analyse`: Ready but not recently tested

What needs to happen:
1. Run `pro-create` and validate it still produces the 7.6x expansion
2. Run both `analyse` operations and assess quality
3. Fix the array syntax issue noted in Notes-Todo.md
4. Complete `materialise` and `realize` prompt validation
5. Generate a full comparison report (v1 vs v2 vs current prompts)

**Effort**: 1-2 weeks
**Why it matters**: Without all four operations working, the Four Pillars story is aspirational, not demonstrable. This is the single highest-leverage work.

#### 2.2 Build the End-to-End Demo

Take one specification through the complete pipeline:

```
1. Start with a natural language description
2. AI generates a .specly spec (Pillar 2 - demo-create)
3. Human reviews and tweaks (Pillar 1)
4. Validate and infer (inference engine)
5. Load in runtime interpreter (app-demo) → working app
6. Extract spec from running system (Pillar 3 - analyse)
7. Compare extracted spec against original (closed-loop verification)
```

Document this as a step-by-step walkthrough with actual outputs. This becomes the "wow" demo and the proof that the architecture works.

**Effort**: 1 week (assuming 2.1 is done)
**Why it matters**: This is the demo that sells the vision. Nobody else can show this loop.

#### 2.3 Update Messaging with Competitive Positioning

The analyses provide concrete material that the old messaging lacked. Update everywhere:

**Kill**: "Write 90% less code"

**Replace with** (context-dependent):
- **For developers**: "The specification language that SDD tools forgot to build. 4x-7.6x expansion from convention-driven inference -- while Spec Kit generates 3x more Markdown than code."
- **For architects**: "The formal language layer beneath the workflow layer. Validatable, expandable, portable specifications -- not Markdown with headings."
- **For the market**: "130K+ stars on SDD tools prove the industry wants spec-first development. Every one uses Markdown. SpecVerse is the only formal specification language for enterprise software."

Update in:
- specverse-lang README (lead with competitive positioning)
- specverse-lang-doc introduction page
- Organisation-level README (new, from 1.4)
- Introduction document

**Effort**: 1-2 days

---

### Phase 3: Strengthen the Core (Do After)

Once the house is clean and the story is provable, strengthen the technical foundations.

#### 3.1 Productise Pillar 3 (AI-Describable)

The JobHunter analysis proved this works: an Express+Drizzle+React app was reverse-engineered into a 1,396-line `.specly` spec with 0 errors, 0 warnings (22 models, 18 controllers, ~150+ endpoints, 9 services, 3 lifecycles). The capability is demonstrated. Now productise it:

1. Package the reverse-engineering workflow into a repeatable CLI command
2. Support common stacks: Express/Fastify + Prisma/Drizzle + React/Next.js
3. Use the guesthouse demo as the accuracy benchmark (you know what the spec should look like)
4. Target 70%+ accuracy on first extraction, with human refinement to 95%+

This is the **zero-risk adoption path**: "Point it at your existing code. Get a `.specly` file back. See what SpecVerse sees in your architecture." No commitment required.

**Effort**: 2-4 weeks
**Why it matters**: Completes the Four Pillars and enables the closed-loop verification story.

#### 3.2 Document the Distillation Pattern

The realize system (AI explores → human validates → capture as deterministic template → replay forever) is SpecVerse's most distinctive technical innovation. It's currently undocumented.

Create:
- A dedicated section in the docs explaining the pattern
- CLI documentation showing the `ai template` → `realize` lifecycle
- A worked example: "Here's how a Prisma schema generator went from AI-generated to deterministic"

**Effort**: 2-3 days

#### 3.3 Fix the CLI Identity

The CLI tries to serve spec authors and AI workflow operators with 30+ commands in a single interface. Restructure the documentation (not necessarily the code) into clear paths:

**Path A: Specification Author**
```
init → edit → validate → infer → gen → realize
```

**Path B: AI Workflow Operator**
```
ai template create → validate-fix → ai template analyse → ai template materialise → ai template realize
```

**Path C: Explorer**
```
app-demo (runtime interpreter) → inspect → diagram → document
```

**Effort**: 1-2 days for documentation, 1 week if refactoring the CLI

#### 3.4 Validate and Extend Existing LLM Integration

**Critical discovery: The MCP server and AI orchestrator already exist.**

The `specverse-mcp` server (v3.5.1) already dynamically exposes every CLI command as an MCP tool. It has multi-environment deployment (local, web, VSCode, Docker enterprise), is deployed on Vercel, and has a ready-made Claude Desktop configuration. The `ai-orchestrator` (v3.3.0) provides multi-provider LLM orchestration with YAML-based prompt management and multi-step workflow execution.

**What already works:**
- All CLI commands exposed as MCP tools (validate, infer, gen, realize, etc.)
- Core AI tools: `get_creation_prompt`, `get_library_suggestions`, `get_validation_instructions`
- Optional orchestrator integration via `--enable-orchestrator` flag
- `CLIProxyService` (50K+ lines) with dynamic command discovery, 5-minute TTL caching
- Multi-environment deployment with hybrid resource system (auto-detects filesystem vs embedded)

**What needs to happen (validate, not build):**
1. **Validate MCP server works with current Claude Code/Desktop** -- test the existing `specverse-mcp` command and Claude Desktop config
2. **Validate orchestrator bridge** -- test `--enable-orchestrator` flag and assess the `OrchestratorBridge` integration
3. **Update documentation** -- the MCP server's capabilities are essentially undocumented in user-facing materials
4. **Add specialised agent definitions** -- inspired by Quint LLM Kit's architecture (analyser, implementer, verifier), define three specialist roles as orchestrator workflows
5. **Add a `/specly:next` command** -- could build on the existing `ai suggest` command to provide contextual guidance on spec completeness

**From Quint LLM Kit (patterns to adopt):**
- MCP servers for language server features + documentation access ← *already built*
- Specialised agents for analysis/implementation/verification ← *orchestrator framework exists, agent definitions needed*
- `/spec:next` contextual guidance ← *`ai suggest` exists as foundation*

**From GSD (patterns to adopt):**
- Fresh context windows per agent (prevent context rot)
- File-based inter-agent communication
- Selective context loading (expanded specs, not raw files)

**Effort**: 1-2 weeks (validation and extension, not greenfield build)
**Why it matters**: The SDD integration play is much closer to reality than previously thought. The MCP server already exposes SpecVerse as a composable service -- it just needs validation, documentation, and promotion.

#### 3.5 Model-Based Testing (Lifecycle Conformance)

Quint Connect demonstrated model-based testing: replaying specification scenarios against implementation code to verify conformance. SpecVerse should build the equivalent for its domain:

1. Take lifecycle definitions from `.specly` files
2. Generate test cases for each valid state transition
3. Generate negative test cases for invalid transitions
4. Assert that the implementation's state machine matches the specification
5. Run as part of CI -- continuous conformance assurance

This closes the loop between specification and implementation. It addresses the criticism (from Scott Logic, Fowler, et al.) that specs drift from code. With model-based testing, they can't -- any drift breaks CI.

**Effort**: 2-3 weeks
**Why it matters**: Moves SpecVerse from "specs that generate code" to "specs that *continuously verify* code." This is the bridge from Level 3 to Level 1 that Quint demonstrated for distributed systems.

---

### Phase 4: Expand and Position (Do Later)

Only after Phases 1-3 are complete. Phase 4 has two tracks: tactical domain expansion and strategic platform positioning.

#### Track A: Domain Expansion

Priority order based on user demand:
1. **Analytics & Reporting** -- measures, dimensions, KPIs, dashboards with data semantics
2. **External Integrations** -- API contracts, webhooks, retry policies, circuit breakers
3. **Workflow Orchestration** -- cross-entity sagas, approval chains
4. **Data Pipelines** -- ETL, stream processing, scheduling

Each expansion follows the same pattern:
- Define schema primitives (JSON Schema additions)
- Add inference rules that understand the new domain
- Create instance factory templates
- Validate with the AI loop

**Effort**: 2-4 weeks per domain
**Gate**: Don't start until Phases 1-3 are complete

#### Track B: Meta-Specification Platform Direction

The six analyses converge on a bigger strategic direction: SpecVerse as a **meta-specification platform** that orchestrates domain-specific specification languages.

The architecture that emerged:

```
┌────────────────────────────────────────────────────────────┐
│  Level 5: SpecVerse Meta-Specification Platform             │
│  Cross-domain orchestration, convention processor registry  │
├────────────────────────────────────────────────────────────┤
│  Level 3: Domain Specification Languages                    │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  .specly      │  │  Quint       │  │  OpenAPI         │ │
│  │  Enterprise   │  │  Distributed │  │  API contracts   │ │
│  │  systems      │  │  systems     │  │                  │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  Terraform   │  │  dbt         │  │  Lean            │ │
│  │  Infra       │  │  Analytics   │  │  Formal proofs   │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
├────────────────────────────────────────────────────────────┤
│  Convention processors bridge intent → domain language      │
│                                                            │
│  "standard consensus" → Quint state machine spec           │
│  "email: Email"       → .specly schema + validation        │
│  "never negative"     → Lean theorem + proof harness       │
└────────────────────────────────────────────────────────────┘
```

This is the long-term vision. `.specly` is the first domain language, not the only one. The platform orchestrates multiple domain languages with convention processors bridging human intent to each domain's formal language. Cross-domain validation ensures that your enterprise models, API contracts, infrastructure specs, and (eventually) formal proofs are consistent with each other.

**This is not actionable now.** But it should inform every decision in Phases 1-3. Design choices that close off the platform direction should be avoided. Design choices that enable it -- like the MCP server (3.4), model-based testing (3.5), and convention processor architecture -- should be prioritised.

**Key references**: [META-SPECIFICATION-PROPOSAL.md](./META-SPECIFICATION-PROPOSAL.md) for the detailed architectural proposal.

#### Track C: SDD Integration Play

The MCP server already exists (v3.5.1, production-ready). The integration play can begin as soon as the server is validated and documented (Phase 3.4). Target integrations:

- **OpenSpec + SpecVerse**: Replace Markdown specs with `.specly` files in `changes/` directories. OpenSpec's propose-apply-archive workflow operates on formal, expandable specifications.
- **Spec Kit + SpecVerse**: Replace spec.md and data-model.md with `.specly` files; constitution maps to project-level convention profiles. `/speckit.analyze` gets actual schema validation via MCP instead of LLM-based opinion.
- **GSD + SpecVerse**: Replace REQUIREMENTS.md with `.specly` specs; GSD's multi-agent architecture routes expanded specifications to specialised executor agents via MCP tools.
- **Kiro + SpecVerse**: Replace requirements.md with `.specly` files; agent hooks trigger re-expansion via MCP.

Each integration proves the "language layer beneath the workflow layer" positioning. Even one successful integration would be a powerful proof point. **The barrier is no longer technical (MCP server exists) -- it's documentation and outreach.**

**Effort**: 1-2 weeks per integration

#### Track D: Community and Content

Seed the registry and create audience-specific content:

**Registry libraries** (5-10 high-quality):
- Authentication (JWT, OAuth, sessions)
- Multi-tenancy patterns
- Audit logging
- Notification system
- File upload/management
- Common UI patterns (admin dashboard, user profile)

**Articles** (3 pieces):
1. **For developers**: "Why your AI coding tool needs a specification language -- and why Markdown isn't one"
2. **For architects**: "The language layer the SDD movement forgot to build"
3. **For the SDD community**: "How to give Spec Kit / OpenSpec / GSD a formal specification engine"

**Effort**: 2-3 weeks total

---

## The Disciplined Path

```
Phase 1: Clean House (1-2 weeks)
├── 1.1 Align versions
├── 1.2 Clean specverse-lang
├── 1.3 Decide on dormant repos
└── 1.4 Write root README (with competitive positioning)

Phase 2: Prove the Story (2-3 weeks)
├── 2.1 Get all four AI operations working
├── 2.2 Build end-to-end demo
└── 2.3 Update messaging with competitive positioning

Phase 3: Strengthen the Core (6-10 weeks)
├── 3.1 Productise Pillar 3 (AI-Describable)
├── 3.2 Document distillation pattern
├── 3.3 Fix CLI identity
├── 3.4 Validate & extend existing MCP server + orchestrator   ← ALREADY BUILT
└── 3.5 Model-Based Testing (lifecycle conformance)            ← NEW

Phase 4: Expand and Position (ongoing)
├── Track A: Domain expansion (analytics first)
├── Track B: Meta-specification platform direction              ← NEW
├── Track C: SDD integration play                               ← NEW
└── Track D: Community, registry, and content
```

### The Rules

1. **No new features until existing ones are aligned.** Version drift is a credibility killer.
2. **No new repositories.** 10 is enough. Consolidate before expanding.
3. **Every change must be testable.** If you can't write a test for it, don't ship it.
4. **The spec is the demo.** If you can't show a .specly file going through the pipeline, the feature isn't done.
5. **Finish pillars before adding domains.** Four working pillars for CRUD/SaaS is worth more than six coverage domains with two working pillars.
6. **Design for the platform.** Don't make choices that close off the meta-specification direction. ← NEW
7. **Validate and document before building new.** The MCP server, AI orchestrator, and VSCode extension already exist. Prove they work before adding more. ← UPDATED

---

## What Success Looks Like

**End of Phase 1** (~2 weeks from restart):
- All repos at consistent versions
- Dormant repos decided (maintained or archived)
- Root README with competitive positioning and specification hierarchy
- Clean `npm test` from fresh clone

**End of Phase 2** (~5 weeks from restart):
- All four AI operations demonstrated with metrics
- One end-to-end walkthrough from natural language to running app to extracted spec
- Updated messaging everywhere: formal specification language positioning, competitive map, SDD landscape context
- The "Spec Kit generates 3x more Markdown than code; SpecVerse generates 4x-7.6x more architecture from less spec" comparison is front and centre

**End of Phase 3** (~15 weeks from restart):
- Pillar 3 productised as CLI command, 70%+ accuracy on guesthouse demo
- Distillation pattern documented and demonstrable
- CLI user journeys documented
- Existing MCP server validated with Claude Code/Desktop, documented, and promoted as the SDD integration point
- AI orchestrator bridge validated; specialised agent definitions (spec author, code generator, conformance tester) working
- Lifecycle conformance testing generating test suites from `.specly` files
- The "closed loop" (spec → implement → extract → compare) demonstrated end-to-end

**In 6 months from restart**:
- At least one SDD tool integration (OpenSpec or GSD most likely)
- Analytics specification domain added
- Registry seeded with useful libraries
- External adoption or serious interest from at least one team outside the creator
- The meta-specification platform direction validated with at least one cross-domain proof-of-concept

---

## Summary

SpecVerse has a solid foundation (the language, parser, inference engine) and a compelling vision (Four Pillars as formal specification for enterprise software). The six external analyses have transformed the strategic picture: the market has validated spec-first development, Markdown specs have been proven insufficient, Quint has proven formal languages work in production, and SpecVerse occupies a unique quadrant in the competitive landscape.

What SpecVerse lacks is:

1. **Consistency** -- versions are drifted, some repos are stale
2. **Completeness** -- only Pillar 1 and half of Pillar 2 work end-to-end
3. **Visibility** -- the MCP server, AI orchestrator, and VSCode extension exist and are production-ready, but are essentially undocumented and unvalidated as an integrated system. The composability infrastructure is *built* but not *demonstrated*
4. **Conformance** -- no model-based testing to verify implementation matches spec

The path forward isn't about building more things -- in fact, more has been built than previously recognised. It's about validating what exists, making it coherent, demonstrating the vision with a working end-to-end pipeline, and then exposing SpecVerse's capabilities so the SDD ecosystem can consume them. Clean house, prove the story, strengthen the core, then expand and position. In that order.

The SDD tools built the house. Quint proved the foundation works. SpecVerse is pouring that foundation for the domain where 90% of software gets built.

---

## Reference: Analysis Documents

| Document | Key Finding |
|----------|-------------|
| [SDD-LANDSCAPE-ANALYSIS.md](./SDD-LANDSCAPE-ANALYSIS.md) | Every SDD tool uses Markdown; SpecVerse is alone in the formal-language quadrant |
| [QUINT-ANALYSIS.md](./QUINT-ANALYSIS.md) | Formal spec languages work in production; convention processors are SpecVerse's unique advantage |
| [LEAN-DEMOURA-ANALYSIS.md](./LEAN-DEMOURA-ANALYSIS.md) | "Verification has always been the bottleneck, not implementation" |
| [WOLFRAM-ANALYSIS.md](./WOLFRAM-ANALYSIS.md) | Spec languages need convention processors for accessibility |
| [VSDD-ANALYSIS.md](./VSDD-ANALYSIS.md) | SpecVerse is a language without a methodology; VSDD is a methodology without a language |
| [META-SPECIFICATION-PROPOSAL.md](./META-SPECIFICATION-PROPOSAL.md) | Platform direction: orchestrate domain-specific spec languages |
