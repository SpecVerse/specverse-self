---
name: Engine Extraction and Self-Hosting
description: Engines extracted to specverse-engines. Self-hosting proven. Generated CLI has 8 commands, all engine-wired. 7 engine packages.
type: project
---

## Status: SELF-HOSTING COMPLETE. 8 CLI commands, 7 engine packages, byte-for-byte identical output.

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
- specverse-lang: 4,407-line monolithic CLI → orchestrator
- Generated CLI: 410 lines, 8 modular command files, engine-discovered
- 7 engine packages in specverse-engines (all build, all strict)
- ENGINE_HANDLERS in command generator: all 8 commands + subcommands keyed as 'parent.sub'
- Regeneration is idempotent — produces engine-wired code every time

## Engine Packages (specverse-engines)
| Package | Status |
|---------|--------|
| @specverse/types | builds, strict |
| @specverse/engine-entities | builds, strict, includes EngineRegistry |
| @specverse/engine-parser | builds, strict, engine adapter |
| @specverse/engine-inference | builds, strict, engine adapter + model conversion |
| @specverse/engine-realize | builds, strict, engine adapter + realizeAll() |
| @specverse/engine-generators | builds, strict, engine adapter (diagrams/docs/uml) |
| @specverse/engine-ai | builds, engine adapter (graceful degradation) |

## Guides Written
- docs/guides/ARCHITECTURE-GUIDE.md — full system overview
- docs/guides/ADDING-AN-ENTITY-TYPE.md — 11-step entity creation guide
- docs/guides/ADDING-AN-ENGINE.md — engine package creation guide
- Guide accuracy verified during implementation (EngineRegistry discovery docs corrected)
