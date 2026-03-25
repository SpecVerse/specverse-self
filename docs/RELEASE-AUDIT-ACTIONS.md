# Release Audit — Actions To Be Done

Running list of issues found during the v4.0.0 release audit.
Each item has a severity, source step, and status.

## Actions

| # | Severity | Step | Rule | Action | Status |
|---|----------|------|------|--------|--------|
| 1 | HIGH | 1 | — | Rewrite specverse-lang/CLAUDE.md — references deleted src/ directories | TODO |
| 2 | MEDIUM | 1 | — | Update specverse-self/CLAUDE.md — done (974 lines, 9 commands) | DONE |
| 3 | MEDIUM | 1 | — | Create specverse-engines README.md | TODO |
| 4 | MEDIUM | 7 | R7 | Check generated deployments in demo-self Phase 1+2 | TODO |
| 5 | HIGH | 4 | R13 | specverse-engines: knownEnginePackages documented as discovery seed, additionalEngines as extension point | DONE |
| 6 | MEDIUM | 4 | R13 | command-generator.ts:284 hardcodes entity section iteration | TODO |
| 7 | LOW | 4 | R18 | DiagramGeneratorV31 class name in realize/assets/examples (example code) | TODO |
| 8 | LOW | 4 | R18 | test-v33-generation.ts function name has version | TODO |
| 9 | MEDIUM | 4 | R17 | claude-executor.ts:44,176,191 — bare catch blocks, no comments | TODO |
| 10 | HIGH | 4 | R11 | specverse-lang CLI manually loads schema (lines 36-68) — parser should self-init | TODO |
| 11 | MEDIUM | 4 | — | specverse-lang package.json has 5 scripts referencing deleted src/ dirs | TODO |
| 12 | LOW | 4 | — | tools/diagram-generator/tsconfig.json references deleted src/parser | TODO |
| 13 | NOTED | 4 | R19 | 215 `: any` in specverse-lang src/ (pre-existing debt, not blocking) | NOTED |
| 14 | NOTED | 4 | R19 | 1,099 `: any` in specverse-engines (pre-existing, mostly tests/templates) | NOTED |
| 15 | HIGH | 4 | R24 | CurvedOperationsSpec type added, CuredOperationsSpec deprecated alias | DONE |
| 16 | HIGH | 4 | R26 | Hardcoded path removed — uses HOME env variable | DONE |
| 17 | HIGH | 4 | R18 | Version strings removed from generators — uses spec context or generic | DONE |
| 18 | HIGH | 4 | R26 | `@specverse/lang` referenced in MCP static templates, VSCode extension, pattern-adapter-generator — should reference engine packages or be generic | TODO |
| 19 | MEDIUM | 4 | R8 | specverse-lang has FULL COPY of all instance factory libs (identical to engines) — should only exist in engines, lang should reference via package | TODO |
| 20 | MEDIUM | 4 | — | Duplicate instance factory libs are synced manually (cp command) — fragile, will drift | TODO |
| 21 | MEDIUM | 4 | R18 | v3.1 removed from parser file headers | DONE |
| 22 | MEDIUM | 4 | R18 | JSON rule files named v3.1-*.json and v3.4-*.json — version in data file names (acceptable per R18 "genuinely version-specific data") | NOTED |
| 23 | MEDIUM | 4 | R18 | Test files named v3.3-*.test.ts and v3.4-*.test.ts | NOTED |
| 24 | LOW | 4 | — | 29 TODOs in engine generator templates (stubs for Redis, MongoDB, SDK generators, etc.) | NOTED |
| 25 | LOW | 4 | — | 356 console.log/warn/error calls in engine src/ — no structured logging | NOTED |
| 26 | LOW | 4 | — | 5 process.exit() calls in engine packages (should throw, not exit) — in examples/test code only | NOTED |
| 27 | HIGH | 4 | R18 | manifest-loader validates semver format, not hardcoded 3.3 | DONE |
| 28 | MEDIUM | 4 | R11 | 17 process.cwd() calls in engine src/ — should accept basePath config | NOTED |
| 29 | MEDIUM | 6 | R18 | MCP EntityModuleService.ts references @specverse/lang for entity registry — should use @specverse/engine-entities | TODO |
| 30 | MEDIUM | 6 | R18 | MCP CLIProxyService.test.ts mocks @specverse/lang — should mock engine packages | TODO |
| 31 | MEDIUM | 6 | R18 | pattern-adapter-generator.ts stub references @specverse/lang/browser — should be self-contained (real adapter ships, stub is fallback) | TODO |
| 32 | MEDIUM | 6 | R18 | "v3.4.0" in adapter descriptions (shadcn-adapter, antd-adapter, mui-adapter, atomic-components-registry) | TODO |
| 33 | MEDIUM | 6 | R18 | react package-json-generator.ts references @specverse/lang@^3.4.0 as dependency | TODO |
| 34 | HIGH | 8 | — | specverse-lang src/utils/__tests__/spec-helpers.test.ts imports from deleted ../../inference-engine/ | TODO |
| 35 | MEDIUM | 8 | — | specverse-lang has 1.3MB duplicate libs/instance-factories/ (engines has 1.9MB authoritative copy) | TODO |
| 36 | MEDIUM | 8 | — | specverse-lang package.json: 5 stale scripts referencing deleted dirs (same as #11) | TODO |
| 37 | LOW | 8 | — | specverse-lang tools/ (ai-orchestrator, diagram-generator, specverse-mcp, vscode-extension) — are these still used or should they move to engines? | TODO |
| 38 | NOTED | 9 | — | realize depends on engine-parser + engine-generators — acceptable (generates code that references both) | NOTED |
| 39 | NOTED | 9 | — | All file: references in specverse-lang and demo-self are to local engine packages (expected pre-npm-publish) | NOTED |
| 40 | NOTED | 9 | — | No circular dependencies found between engine packages | PASS |
| 41 | NOTED | 9 | — | All 7 packages have exports with default + ./package.json | PASS |

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
| R8 | PASS | — | |
| R9 | PASS | — | |
| R10 | PASS | — | |
| R11 | PASS | FAIL | CLI loads schema manually (#10) |
| R12 | PASS | — | |
| R13 | FAIL | — | Hardcoded engine list (#5), entity sections (#6) |
| R14 | PASS | — | |
| R15 | PASS | — | |
| R16 | PASS | PASS | |
| R17 | PARTIAL | PASS | bare catches in claude-executor (#9) |
| R18 | PARTIAL | PASS | version in example code (#7, #8) |
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
