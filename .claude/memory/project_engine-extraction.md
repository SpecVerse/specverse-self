---
name: Engine Extraction and Self-Hosting
description: Engines extracted to specverse-engines. Self-hosting proven. Source consolidation complete — specverse-lang depends on engine packages with no duplicate code.
type: project
---

## Status: SOURCE CONSOLIDATION COMPLETE (2026-03-24)

Self-hosting proven. specverse-lang now depends entirely on @specverse/engine-* packages.

## Self-Hosting Results
- validate: engine-wired — identical output
- infer: engine-wired — 3,742 lines
- realize all: engine-wired — 390 files, byte-for-byte identical
- gen diagrams: engine-wired — 14 Mermaid diagrams
- gen docs: engine-wired — 2,873 lines markdown
- gen uml: engine-wired — 360-line PlantUML
- dev format/watch/quick: engine-wired stubs (parser engine)
- cache: engine-wired stub
- ai docs/suggest/template: engine-wired, graceful degradation when engine not available

## Architecture
- specverse-lang: CLI orchestrator (54 files in src/) — imports from @specverse/engine-* packages
- Generated CLI: 410 lines, 8 modular command files, engine-discovered
- 7 engine packages in specverse-engines (all build, all strict)
- ENGINE_HANDLERS in command generator: all 8 commands + subcommands keyed as 'parent.sub'
- Regeneration is idempotent — produces engine-wired code every time

## Engine Packages (specverse-engines)
| Package | Status |
|---------|--------|
| @specverse/types | builds, strict, includes shared pluralize() utility |
| @specverse/engine-entities | builds, strict, includes EngineRegistry |
| @specverse/engine-parser | builds, strict, engine adapter |
| @specverse/engine-inference | builds, strict, engine adapter + model conversion |
| @specverse/engine-realize | builds, strict, engine adapter + realizeAll() |
| @specverse/engine-generators | builds, strict, engine adapter (diagrams/docs/uml) |
| @specverse/engine-ai | builds, engine adapter (graceful degradation) |

## Completed (previously TODO)
- [x] Remove duplicated src/ code from specverse-lang
- [x] Fix inference rule loading (v3.4 files had wrong format)
- [x] Fix VSCode extension CLI discovery (missing exports)
- [x] Fix code quality issues (ESM hacks, silent catches, duplicated pluralization, etc.)
- [x] specverse-engines test framework (1032 tests, cross-package resolution)

## Guides Written
- docs/guides/ARCHITECTURE-GUIDE.md — full system overview
- docs/guides/ADDING-AN-ENTITY-TYPE.md — 11-step entity creation guide
- docs/guides/ADDING-AN-ENGINE.md — engine package creation guide
- docs/guides/TEST-STRATEGY.md — test patterns for engine packages
