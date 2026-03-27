# Release Audit — Actions To Be Done

Running list of issues found during the v4.0.0 release audit.
Each item has a severity, source step, and status.

## Actions

| # | Severity | Step | Rule | Action | Status |
|---|----------|------|------|--------|--------|
| 1 | HIGH | 1 | — | specverse-lang/CLAUDE.md rewritten (90 lines, accurate) | DONE |
| 2 | MEDIUM | 1 | — | Update specverse-self/CLAUDE.md — done (974 lines, 9 commands) | DONE |
| 3 | MEDIUM | 1 | — | Create specverse-engines README.md | DONE |
| 4 | MEDIUM | 7 | R7 | Check generated deployments in demo-self Phase 1+2 — both present, bridge logical→physical (SQLite/PostgreSQL) | DONE |
| 5 | HIGH | 4 | R13 | specverse-engines: knownEnginePackages documented as discovery seed, additionalEngines as extension point | DONE |
| 6 | MEDIUM | 4 | R13 | command-generator.ts entity section iteration made dynamic (filters object-valued keys, excludes known non-entity keys) | DONE |
| 7 | LOW | 4 | R18 | DiagramGeneratorV31 renamed to UnifiedDiagramGenerator in example code | DONE |
| 8 | LOW | 4 | R18 | test-v33-generation.ts renamed to test-generation.ts, function name updated | DONE |
| 9 | MEDIUM | 4 | R17 | claude-executor.ts bare catch blocks — comments added explaining why silenced | DONE |
| 10 | HIGH | 4 | R11 | CLI uses ConfigLoader.getSchema() — consolidated from 8 search paths | DONE |
| 11 | MEDIUM | 4 | — | 5 stale scripts removed from package.json | DONE |
| 12 | LOW | 4 | — | tools/diagram-generator/tsconfig.json stale src/parser reference removed | DONE |
| 13 | NOTED | 4 | R19 | 215 `: any` in specverse-lang src/ (pre-existing debt, not blocking) | NOTED |
| 14 | NOTED | 4 | R19 | 1,099 `: any` in specverse-engines (pre-existing, mostly tests/templates) | NOTED |
| 15 | HIGH | 4 | R24 | CurvedOperationsSpec type added, CuredOperationsSpec deprecated alias | DONE |
| 16 | HIGH | 4 | R26 | Hardcoded path removed — uses HOME env variable | DONE |
| 17 | HIGH | 4 | R18 | Version strings removed from generators — uses spec context or generic | DONE |
| 18 | HIGH | 4 | R26 | `@specverse/lang` references fixed in MCP templates, VSCode extension, pattern-adapter-generator — now reference engine packages | DONE |
| 19 | MEDIUM | 4 | R8 | specverse-lang libs/instance-factories/ replaced with symlink to engines (single source of truth) | DONE |
| 20 | MEDIUM | 4 | — | Duplicate instance factory libs eliminated — symlink replaces manual cp sync | DONE |
| 21 | MEDIUM | 4 | R18 | v3.1 removed from parser file headers | DONE |
| 22 | MEDIUM | 4 | R18 | JSON rule files named v3.1-*.json and v3.4-*.json — version in data file names (acceptable per R18 "genuinely version-specific data") | NOTED |
| 23 | MEDIUM | 4 | R18 | Test files named v3.3-*.test.ts and v3.4-*.test.ts | NOTED |
| 24 | LOW | 4 | — | 29 TODOs in engine generator templates (stubs for Redis, MongoDB, SDK generators, etc.) | NOTED |
| 25 | LOW | 4 | — | 356 console.log/warn/error calls in engine src/ — no structured logging | NOTED |
| 26 | LOW | 4 | — | 5 process.exit() calls in engine packages (should throw, not exit) — in examples/test code only | NOTED |
| 27 | HIGH | 4 | R18 | manifest-loader validates semver format, not hardcoded 3.3 | DONE |
| 28 | MEDIUM | 4 | R11 | 17 process.cwd() calls in engine src/ — should accept basePath config | NOTED |
| 29 | MEDIUM | 6 | R18 | MCP EntityModuleService.ts — @specverse/lang replaced with @specverse/engine-entities | DONE |
| 30 | MEDIUM | 6 | R18 | MCP CLIProxyService.test.ts — @specverse/lang mock replaced with engine packages | DONE |
| 31 | MEDIUM | 6 | R18 | pattern-adapter-generator.ts — @specverse/lang/browser replaced with @specverse/engine-realize | DONE |
| 32 | MEDIUM | 6 | R18 | "v3.4.0" removed from adapter descriptions (shadcn, antd, mui, atomic-components-registry) | DONE |
| 33 | MEDIUM | 6 | R18 | react package-json-generator.ts — @specverse/lang@^3.4.0 dependency removed | DONE |
| 34 | HIGH | 8 | — | spec-helpers test import fixed — uses @specverse/engine-inference | DONE |
| 35 | MEDIUM | 8 | — | specverse-lang libs/instance-factories/ symlinked to engines (eliminates 1.3MB duplicate) | DONE |
| 36 | MEDIUM | 8 | — | specverse-lang package.json: stale scripts already removed (same as #11) | DONE |
| 37 | LOW | 8 | — | specverse-lang tools/ — hand-written, still in active use (VSCode published, MCP works). Generated equivalents from instance factories will replace them at v4.0.0 release | NOTED |
| 38 | NOTED | 9 | — | realize depends on engine-parser + engine-generators — acceptable (generates code that references both) | NOTED |
| 39 | NOTED | 9 | — | All file: references in specverse-lang and demo-self are to local engine packages (expected pre-npm-publish) | NOTED |
| 40 | NOTED | 9 | — | No circular dependencies found between engine packages | PASS |
| 41 | NOTED | 9 | — | All 7 packages have exports with default + ./package.json | PASS |
| 42 | MEDIUM | — | R8 | Cross-repo content indexing tools (repo-indexer, repo-compare) — tracks 379 duplicated source files | DONE |
| 43 | HIGH | — | R8 | Examples decomposed into entity modules (9th facet) — 54 files distributed to owners with .example.yaml sidecars | DONE |
| 44 | HIGH | — | R8 | compose-examples.mjs in specverse-self — composes 54 examples from 10 sources into 15 categories | DONE |
| 45 | MEDIUM | — | — | Doc generation scripts moved from lang to self (generate-diagrams, generate-sidebar, build.sh) | DONE |
| 46 | MEDIUM | — | — | specverse-lang-doc sync repointed from lang to self (default ../specverse-self) | DONE |
| 47 | MEDIUM | — | — | Flat examples deleted from realize/assets/examples/ — entity modules are source of truth | DONE |
| 48 | LOW | — | — | Archive prompt versions v1-v8 (only default/v9 actively used) | TODO |
| 49 | LOW | — | — | Prompts + templates in lang symlinked to engines (eliminates 159 file duplicates) | DONE |
| 50 | MEDIUM | — | — | Entity-Module-Intro docs deleted from lang (canonical copy in self) | DONE |
| 51 | HIGH | — | — | ai-orchestrator merged into @specverse/engine-ai (providers, orchestrator, config) | DONE |
| 52 | MEDIUM | — | — | Compose scripts (schema, inference rules) moved to engine-entities/scripts/ | DONE |
| 53 | MEDIUM | — | — | Lang old compose scripts deleted, postbuild calls engine-entities versions | DONE |

## Rule Compliance Summary

| Rule | Engines | Lang | Notes |
|------|---------|------|-------|
| R1 | PASS | — | |
| R2 | PASS | — | |
| R3 | PASS | — | |
| R4 | PASS | — | |
| R5 | PASS | — | |
| R6 | PASS | — | |
| R7 | PASS | — | Check demo-self deployments (#4) |
| R8 | PASS | PASS | Symlink eliminates duplicate (#19) |
| R9 | PASS | — | |
| R10 | PASS | — | |
| R11 | PASS | PASS | ConfigLoader.getSchema() (#10) |
| R12 | PASS | — | |
| R13 | PASS | — | Dynamic entity iteration (#6) |
| R14 | PASS | — | |
| R15 | PASS | — | |
| R16 | PASS | PASS | |
| R17 | PASS | PASS | Bare catches commented (#9) |
| R18 | PASS | PASS | All version strings and @specverse/lang refs fixed |
| R19 | NOTED | NOTED | pre-existing any debt |
| R20 | PASS | N/A | |
| R21-R24 | — | — | Verified in Phase 6 testing |
| R25 | PASS | PASS | |
| R26 | PASS | PASS | |
| R27 | PASS | — | |

## Completed

| # | Step | Action | Done |
|---|------|--------|------|
| | 1 | Update CURRENT-STATE-AND-PLAN.md — Phase 6+7 complete | 25 Mar |
| | 1 | Update MEMORY.md — current state | 25 Mar |
| | 1 | Update project_engine-extraction.md | 25 Mar |
| | 1 | Update specverse-self/CLAUDE.md | 25 Mar |
| | 1 | Add warning banner to specverse-lang/CLAUDE.md | 25 Mar |
| | 2-3 | 27 Golden Rules documented in GOLDEN-RULES.md | 25 Mar |
| | 4 | Golden Rules audit — engines + lang | 25 Mar |
| | 4-8 | Fix all HIGH/MEDIUM audit items (#3-#36) | 25 Mar |
| | — | Cross-repo content indexing tools added to all 4 repos | 26 Mar |
| | — | Examples decomposed into entity modules (9th facet) + compose-examples.mjs | 26 Mar |
| | — | Doc pipeline moved to self, lang-doc repointed | 26 Mar |
| | — | Flat examples deleted, lang symlinks for examples/prompts/templates | 26 Mar |
| | — | ai-orchestrator merged into engine-ai | 26 Mar |
| | — | Compose scripts moved to engine-entities | 26 Mar |
| | — | Schema generation scripts moved to engine-entities | 26 Mar |
| | — | Prompt versions v1-v8 archived | 26 Mar |
| | — | Published 8 packages @ 3.5.3 (final 3.x release) | 26 Mar |
| | — | Bumped engines to 4.0.0, published to npm | 26 Mar |
| | — | specverse-self v4.0.0 released | 26 Mar |
| | — | 44 READMEs (engines, entity modules, factories, AI layers) | 26-27 Mar |
| | — | SPECVERSE-GUIDE.md (1,200 lines, complete user guide with diagrams) | 27 Mar |
| | — | L3 behavior generation — all 3 phases complete (conventions, Quint actions, pipeline wiring) | 27 Mar |
| | — | Stale docs removed from lang (guides, CURRENT-STATE, documentation scripts) | 27 Mar |
| | — | ItsTimeToTrade repo created — first real-world SpecVerse project | 27 Mar |
