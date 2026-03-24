---
name: Source Consolidation — specverse-lang depends on engine packages
description: Removed ~200 duplicate source files from specverse-lang. All engine code lives in specverse-engines. Code quality audit and fixes applied.
type: project
---

## Status: COMPLETE (2026-03-24)

specverse-lang `refactor/depend-on-engines` branch now depends entirely on @specverse/engine-* packages.

## What Was Done

### Source removal (specverse-lang)
Removed ~200 duplicate files from 7 directories:
- src/parser/ (36 files) -> @specverse/engine-parser
- src/inference-engine/ (29 files) -> @specverse/engine-inference
- src/entities/ (81 files) -> @specverse/engine-entities
- src/generators/ (9 files) -> @specverse/engine-generators
- src/diagram-engine/ (25 files) -> @specverse/engine-generators
- src/types/ (2 files) -> @specverse/types
- src/realize/ (18 files) -> @specverse/engine-realize
- packages/types/ (dead local package)

### What remains in specverse-lang src/
- src/cli/ (13 files) — CLI orchestrator
- src/ai/ (11 files) — AI integration (not yet in engine packages)
- src/registry/ (21 files) — package registry
- src/migration/ (3 files) — version migration
- src/utils/ (4 files) — path resolution, config loading, spec helpers
- src/browser.ts, src/index.ts — entry points
- libs/ — instance factory templates

### Imports updated
- All static imports: `../../parser/` etc -> `@specverse/engine-parser` etc
- All dynamic imports: `await import('../../realize/')` -> `await import('@specverse/engine-realize')`
- 57 instance factory templates: `../../../../../src/realize/types/` -> `@specverse/engine-realize`
- Build scripts (compose-schema.cjs, compose-inference-rules.cjs): `src/entities` -> `node_modules/@specverse/engine-entities/src`

### Missing exports added to engine packages
- parser: SpeclyConverter (was in core/ but not re-exported), ComponentSpec, ProfileAttachmentSpec, DeploymentSpec, PrimitiveSpec, ExpandedConstraint, ImportResolver, parseNamespace, validateNamespace
- realize: TemplateContext (types/index.ts), mapping-migration
- inference: SpeclyConverter

## Code Quality Fixes (same session)

### Rule file format fix
Two v3.4 rule files (`v3.4-specialist-view-rules.json`, `v3.4-view-component-inference.json`) were missing `ruleFileType` field and wrapping data in `logical_inference` envelope. Converted to proper domain-specific format. This fixed inference rule loading errors that existed on main.

### VSCode extension CLI discovery
`parseCliCommands`/`parseGroupedCommands` weren't exported from index.ts. Added exports. VSCode extension now generates 35 commands (was 26 with fallback).

### Hack/legacy cleanup
1. Replaced `new Function('return import.meta.url')()` with `import.meta.url` directly (ES modules)
2. Replaced `.slice(7)` file:// stripping with `fileURLToPath()`
3. Replaced 65-line hardcoded AI catalog fallback with empty catalog + actionable warning
4. Removed 8 unnecessary `@ts-ignore` on engine imports in CLI
5. Removed commented-out migration imports (dead code)
6. Deduplicated naive pluralization to shared `@specverse/types/utils.ts`
7. Added `findFirstExisting()` utility to consolidate path resolution
8. CLI version loading now uses `ConfigLoader.getPackageJson()` (was duplicated)
9. Removed old backward-compat schema paths from config-loader

## Test Results
- specverse-lang: 23/23 files, 619/619 tests passing
- specverse-engines: 53/53 files, 1066/1066 tests passing (entity-schema test fixed, quint installed globally)
- Combined: 76/76 files, 1685/1685 tests, zero failures, zero skips
- CLI: validate, infer, realize all working

## Branches
- specverse-lang: `refactor/depend-on-engines`
- specverse-engines: `refactor/source-of-truth`
