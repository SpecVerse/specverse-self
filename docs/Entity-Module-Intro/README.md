# SpecVerse Analysis Documents

Research, architecture decisions, and external analyses that shaped the SpecVerse language and platform.

## Vision & Introduction

| Document | Description |
|----------|-------------|
| [SPECVERSE-INTRODUCTION-V4](./SPECVERSE-INTRODUCTION-V4.md) | "Intent Is All You Need" — the current SpecVerse vision document |
| [PAI-SpecVerse-Lang-Deep-Dive-v3](./PAI-SpecVerse-Lang-Deep-Dive-v3-2026-02-19.md) | Deep dive into the language and ecosystem |
| [SPECVERSE-ECOSYSTEM-SUMMARIES](./SPECVERSE-ECOSYSTEM-SUMMARIES.md) | Overview of all repositories in the ecosystem |
| [SPECVERSE-CRITIQUE-2026-02](./SPECVERSE-CRITIQUE-2026-02.md) | Honest critical assessment of SpecVerse |

## Architecture & Dogfooding

| Document | Description |
|----------|-------------|
| [ENTITY-MODULE-ARCHITECTURE](./ENTITY-MODULE-ARCHITECTURE.md) | 8-facet entity module build system — the pattern every entity type follows |
| [ENTITY-MODULE-IMPLEMENTATION-PLAN](./ENTITY-MODULE-IMPLEMENTATION-PLAN.md) | 5-phase implementation plan (Phases A-E, all complete) |
| [DOGFOOD-ANALYSIS-V2](./DOGFOOD-ANALYSIS-V2.md) | Self-application analysis: 17 gaps, 3 new entity types, extension pocket pattern |
| [META-SPECIFICATION-PROPOSAL](./META-SPECIFICATION-PROPOSAL.md) | Go meta — multiple domain-specific spec languages orchestrated by SpecVerse |
| [SPECVERSE-STATE-AND-NEXT-STEPS-V2](./SPECVERSE-STATE-AND-NEXT-STEPS-V2.md) | Current state assessment and roadmap |

## External Analyses

Research into related tools and approaches that informed SpecVerse's direction.

| Document | Subject | Key Finding |
|----------|---------|-------------|
| [QUINT-ANALYSIS](./QUINT-ANALYSIS.md) | Quint (Informal Systems) | Peer domain language for distributed systems; needs convention processors |
| [QUINT-PROGRAMMATIC-API](./QUINT-PROGRAMMATIC-API.md) | Quint npm package | Build-time transpilation recommended: parse .qnt → walk IR → generate TS guards |
| [LEAN-DEMOURA-ANALYSIS](./LEAN-DEMOURA-ANALYSIS.md) | Lean / Leonardo de Moura | Strongest candidate for formal verification domain; open source, Mathlib |
| [WOLFRAM-ANALYSIS](./WOLFRAM-ANALYSIS.md) | Wolfram Language | Excellent spec language for computational domains; blocker: proprietary |
| [VSDD-ANALYSIS](./VSDD-ANALYSIS.md) | VSDD methodology | "VSDD is methodology without a language. SpecVerse is language without methodology. Together complete." |
| [SDD-LANDSCAPE-ANALYSIS](./SDD-LANDSCAPE-ANALYSIS.md) | SDD movement (OpenSpec, Spec Kit, GSD, Kiro, etc.) | Every SDD tool uses Markdown — none has a formal spec language |
| [OPENSPEC-ANALYSIS](./OPENSPEC-ANALYSIS.md) | OpenSpec | Change isolation patterns worth adopting |

## Technical Analyses

| Document | Description |
|----------|-------------|
| [schema-extensibility-analysis](./schema-extensibility-analysis.md) | JSON Schema extensibility assessment |
| [extensibility-solution-summary](./extensibility-solution-summary.md) | Solution summary for schema extensibility |
| [registry-realization-feasibility](./registry-realization-feasibility.md) | Registry and realization feasibility study |
| [realize-views-linter-integration](./realize-views-linter-integration.md) | View realization and linter integration |
| [VERSION-REFERENCE-ANALYSIS](./VERSION-REFERENCE-ANALYSIS.md) | Version reference analysis |

## The Specification Hierarchy

Emerged from the external analyses:

```
Level 5: Meta-Specification Platform (SpecVerse)
         Convention processors for BOTH halves (structural + behavioural)
Level 4: Workflow Orchestration (SDD Tools)
Level 3: Abstract Specification
         Structural: .specly | Behavioural: Quint
Level 2: Verification — Lean (proofs), Apalache/Z3 (model checking)
Level 1: Implementation Contracts — OpenAPI, Terraform, Prisma, dbt
Level 0: Implementation — generated code
```

## Archive

Superseded versions of documents are in [archive/](./archive/):

| Document | Superseded By |
|----------|---------------|
| SPECVERSE-INTRODUCTION (v1) | V4 |
| SPECVERSE-INTRODUCTION-V2 | V4 |
| SPECVERSE-INTRODUCTION-V3 | V4 |
| DOGFOOD-ANALYSIS (v1) | V2 |
| SPECVERSE-STATE-AND-NEXT-STEPS (v1) | V2 |
