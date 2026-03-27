# SpecVerse: Current State of Thinking & Next Steps

**Date**: 22 February 2026
**Purpose**: Honest assessment of where we are, what we've clarified, and a disciplined path forward.

---

## Where We Are Right Now

### The Honest Picture

SpecVerse has been dormant since early December 2025. All 10 repositories show their last commits between August and December 2025, with nothing in the last 2.5 months. The core language (specverse-lang v3.5.1) has 1,900/1,901 tests passing - the foundation is solid. But the ecosystem around it has version drift, incomplete pillars, and no clear path from "here's a .specly file" to "here's a running application."

Through this analysis session we've done something valuable: we've stepped back, looked at the whole picture, and identified what SpecVerse actually is versus what it's been presenting itself as. That clarity is the starting point for disciplined progress.

### What We've Clarified

**1. The narrative was wrong.**
"Write 90% less code" positions SpecVerse against every AI coding tool on the market - a fight it can't win. The actual proposition is different and more defensible: SpecVerse is a **structured communication protocol between humans and AI** for expressing software intent. Nothing else does this.

**2. The Four Pillars are the strategy, not a feature list.**
Pillar 1 (Human-Writable) works. Pillar 2 (AI-Writable) partially works - `create` is validated with measured results (4x-7.6x expansion). Pillar 3 (AI-Describable) barely exists. Pillar 4 (AI-Implementable) works through `realize` for known patterns but the AI path is incomplete. The pillars are the moat - and half the moat is unbuilt.

**3. The realize system is smarter than it looks.**
`realize` and `ai template` aren't competing - they're stages in a maturity lifecycle. AI explores, human validates, the solution is captured as a deterministic instance factory. This is LLM knowledge distillation: generate once, replay forever. It's the strongest technical story SpecVerse has, and it's essentially undocumented.

**4. The language has real coverage limits.**
SpecVerse excels at CRUD/SaaS/event-driven applications. It has no primitives for analytics, data pipelines, external integrations, workflow orchestration, or testing contracts. This is fine if acknowledged - CRUD/SaaS is a massive market. It's a problem if you claim to be a universal specification language.

**5. The ecosystem is comprehensive but disconnected.**
Parser, inference engine, CLI, VSCode extension, runtime interpreter, AI test lab, registry, documentation site, diagram generator, MCP server, 3D visualiser - the pieces exist. But there's no end-to-end developer experience connecting them.

---

## Repository Health Check (22 Feb 2026)

| Repository | Version | Last Commit | Tests | State |
|------------|---------|-------------|-------|-------|
| **specverse-lang** | 3.5.1 | 6 Dec 2025 | 1,900/1,901 pass | Solid, minor uncommitted changes |
| **specverse-lang-doc** | 3.2.0 | 6 Dec 2025 | N/A | 3 minor versions behind lang |
| **specverse-lang-registry** | 3.3.2 | 6 Dec 2025 | 49 pass | Deployed, functional |
| **specverse-app-demo** | 0.1.0 | 6 Dec 2025 | 203/205 pass | Functional runtime interpreter |
| **specverse-demo-ai** | N/A | 5 Dec 2025 | Framework ready | demo-create validated, rest untested recently |
| **specverse-demo-guesthouse** | 2.0.0 | 14 Aug 2025 | N/A | Stale - 6 months without commit |
| **specverse-domain-company-model** | 3.1.0 | 5 Dec 2025 | N/A | 4 minor versions behind lang |
| **specverse-domain-retail-commerce-model** | 3.1.0 | 10 Aug 2025 | N/A | 4 minor versions behind, stale |
| **specverse-app-portal** | 0.12.0 | 3 Oct 2025 | N/A | Stale - 5 months |
| **layered-3d-graph** | 1.0.0 | 22 Oct 2025 | N/A | Stable, no changes needed |

**Key observation**: Everything was touched in a burst around December 2025, then nothing. The domain models and guesthouse demo haven't been updated through 4 minor language versions. Version drift is real and visible.

---

## What Needs to Happen (In Order)

The temptation is to keep building features. The discipline is to **finish what's started, align what exists, and demonstrate what works** before adding anything new.

### Phase 1: Clean House (Do First)

The ecosystem looks abandoned to anyone discovering it. Before any new feature work, make what exists consistent and current.

#### 1.1 Align Versions Across All Repositories

Every repo should declare compatibility with specverse-lang v3.5.1. This doesn't mean rewriting code - it means:

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

Three repos need a decision - maintain or archive:

| Repository | Last Active | Decision Needed |
|------------|------------|-----------------|
| **specverse-demo-guesthouse** | Aug 2025 | Is this the canonical demo app? If yes, update it. If superseded by app-demo, archive it. |
| **specverse-app-portal** | Oct 2025 | Is this part of the story? If not in the next 6 months' plan, archive it. |
| **specverse-domain-retail-commerce-model** | Aug 2025 | Update to v3.5.1 or archive. Having a stale domain model undermines the "living specification" pitch. |

**Effort**: 1 day for decisions, 1-2 days for execution

#### 1.4 Write a Root-Level README

The `/Volumes/Dev24/GitHub/SpecVerse/` directory has analysis documents (critique, introduction, ecosystem summaries) but no README that orients someone arriving at the organisation level. The existing `CLAUDE.md` is for AI assistants, not humans.

Create a `README.md` that:
- States what SpecVerse is (the communication protocol story, not "90% less code")
- Maps the repositories with one-line descriptions
- Points to the introduction document and documentation site
- Shows the Four Pillars diagram

**Effort**: Half a day

---

### Phase 2: Prove the Story (Do Next)

The v3 introduction document tells a compelling story. Now prove it works end-to-end.

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

#### 2.3 Update the Introduction and Messaging

The v3 introduction document is ready. It needs to become the canonical description:
- Promote it to the org-level README (condensed)
- Update specverse-lang README to lead with the communication protocol story
- Kill "write 90% less code" wherever it appears
- Update specverse-lang-doc introduction page

**Effort**: 1 day

---

### Phase 3: Strengthen the Core (Do After)

Once the house is clean and the story is provable, strengthen the technical foundations.

#### 3.1 Make Pillar 3 (AI-Describable) Real

This is the killer feature that doesn't exist yet. If someone can point SpecVerse at an existing Express + Prisma + React app and get a .specly file back, that's:

- An instantly compelling demo
- A zero-risk adoption path ("try it on your code first")
- A unique capability

Start with a limited scope:
1. Extract models from a Prisma schema
2. Extract controllers from Express/Fastify routes
3. Extract events from event bus patterns
4. Combine into a valid .specly file

Use the guesthouse demo app as the test subject - you already know what the spec should look like, so you can measure accuracy.

**Effort**: 2-4 weeks
**Why it matters**: This completes the Four Pillars and enables the closed-loop verification story.

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

---

### Phase 4: Expand (Do Later)

Only after Phases 1-3 are complete.

#### 4.1 Language Coverage Expansion

Priority order based on user demand:
1. **Analytics & Reporting** - measures, dimensions, KPIs, dashboards with data semantics
2. **External Integrations** - API contracts, webhooks, retry policies, circuit breakers
3. **Workflow Orchestration** - cross-entity sagas, approval chains
4. **Data Pipelines** - ETL, stream processing, scheduling

Each expansion follows the same pattern:
- Define schema primitives (JSON Schema additions)
- Add inference rules that understand the new domain
- Create instance factory templates
- Validate with the AI loop

**Effort**: 2-4 weeks per domain
**Gate**: Don't start until Phases 1-3 are complete

#### 4.2 Seed the Registry

Create 5-10 high-quality community libraries:
- Authentication (JWT, OAuth, sessions)
- Multi-tenancy patterns
- Audit logging
- Notification system
- File upload/management
- Common UI patterns (admin dashboard, user profile)

**Effort**: 1-2 weeks

#### 4.3 Audience-Specific Content

Write three articles:
1. **For developers**: "How SpecVerse makes AI coding 10x more reliable" (structured spec prevents hallucination)
2. **For architects**: "Governance without bureaucracy" (specs as living architecture documentation)
3. **For teams**: "Maintaining architectural consistency when everyone uses AI to code"

**Effort**: 1 week

---

## The Disciplined Path

```
Phase 1: Clean House (1-2 weeks)
├── 1.1 Align versions
├── 1.2 Clean specverse-lang
├── 1.3 Decide on dormant repos
└── 1.4 Write root README

Phase 2: Prove the Story (2-3 weeks)
├── 2.1 Get all four AI operations working
├── 2.2 Build end-to-end demo
└── 2.3 Update messaging everywhere

Phase 3: Strengthen the Core (4-6 weeks)
├── 3.1 Make Pillar 3 real
├── 3.2 Document distillation pattern
└── 3.3 Fix CLI identity

Phase 4: Expand (ongoing)
├── 4.1 Language coverage (analytics first)
├── 4.2 Seed registry
└── 4.3 Audience content
```

### The Rules

1. **No new features until existing ones are aligned.** Version drift is a credibility killer.
2. **No new repositories.** 10 is enough. Consolidate before expanding.
3. **Every change must be testable.** If you can't write a test for it, don't ship it.
4. **The spec is the demo.** If you can't show a .specly file going through the pipeline, the feature isn't done.
5. **Finish pillars before adding domains.** Four working pillars for CRUD/SaaS is worth more than six coverage domains with two working pillars.

---

## What Success Looks Like

**In 4 weeks** (end of Phase 2):
- All repos at consistent versions
- All four AI operations demonstrated with metrics
- One end-to-end walkthrough from natural language to running app to extracted spec
- Updated messaging everywhere: communication protocol, not code replacement

**In 10 weeks** (end of Phase 3):
- Pillar 3 working at 70%+ accuracy on the guesthouse demo
- Distillation pattern documented and demonstrable
- CLI user journeys documented
- The "closed loop" (spec → implement → extract → compare) demonstrated end-to-end

**In 6 months**:
- Analytics specification domain added
- Registry seeded with useful libraries
- External adoption or serious interest from at least one team outside the creator

---

## Summary

SpecVerse has a solid foundation (the language, parser, inference engine) and a compelling vision (Four Pillars as human-AI communication protocol). What it lacks is:

1. **Consistency** - versions are drifted, some repos are stale
2. **Completeness** - only Pillar 1 and half of Pillar 2 work end-to-end
3. **Clarity** - the messaging, CLI, and documentation don't tell the right story

The path forward isn't about building more things. It's about finishing what's started, making what exists coherent, and demonstrating the vision with a working end-to-end pipeline. Clean house, prove the story, strengthen the core, then expand. In that order.
