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
| 5 | HIGH | 4 | R13 | specverse-engines: knownEnginePackages hardcoded in engine-registry.ts:61-67 | TODO |
| 6 | MEDIUM | 4 | R13 | command-generator.ts:284 hardcodes entity section iteration | TODO |
| 7 | LOW | 4 | R18 | DiagramGeneratorV31 class name in realize/assets/examples (example code) | TODO |
| 8 | LOW | 4 | R18 | test-v33-generation.ts function name has version | TODO |
| 9 | MEDIUM | 4 | R17 | claude-executor.ts:44,176,191 — bare catch blocks, no comments | TODO |
| 10 | HIGH | 4 | R11 | specverse-lang CLI manually loads schema (lines 36-68) — parser should self-init | TODO |
| 11 | MEDIUM | 4 | — | specverse-lang package.json has 5 scripts referencing deleted src/ dirs | TODO |
| 12 | LOW | 4 | — | tools/diagram-generator/tsconfig.json references deleted src/parser | TODO |
| 13 | NOTED | 4 | R19 | 215 `: any` in specverse-lang src/ (pre-existing debt, not blocking) | NOTED |
| 14 | NOTED | 4 | R19 | 1,099 `: any` in specverse-engines (pre-existing, mostly tests/templates) | NOTED |
| 15 | HIGH | 4 | R24 | "CURED" used throughout codebase — should be "CURVED". Types (CuredOperationsSpec), parser, tests, generators all say "cured" not "curved". ~80+ occurrences across engines | TODO |
| 16 | HIGH | 4 | R26 | Hardcoded absolute path `/Users/cainen/.claude/local/claude` in claude-executor.ts (both engines AND lang copies) | TODO |
| 17 | HIGH | 4 | R18 | Hardcoded version "3.5.2" in VSCode extension generator, "v3.4.0" in component adapters/generators, "@specverse/lang@^3.4.0" in package-json-generator | TODO |
| 18 | HIGH | 4 | R26 | `@specverse/lang` referenced in MCP static templates, VSCode extension, pattern-adapter-generator — should reference engine packages or be generic | TODO |
| 19 | MEDIUM | 4 | R8 | specverse-lang has FULL COPY of all instance factory libs (identical to engines) — should only exist in engines, lang should reference via package | TODO |
| 20 | MEDIUM | 4 | — | Duplicate instance factory libs are synced manually (cp command) — fragile, will drift | TODO |

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
