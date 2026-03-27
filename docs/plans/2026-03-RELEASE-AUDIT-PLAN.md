# SpecVerse v4.0.0 Release Audit Plan

**Date**: 25 March 2026
**Purpose**: Systematic audit and cleanup before releasing specverse-self as the production release of SpecVerse.

## Context

Phases 1-7 are complete. The system works end-to-end:
- 974-line self-spec generates a 9-command CLI
- Generated CLI validates, infers, realizes, generates diagrams/docs/UML
- Generated apps run with full CURED operations, lifecycle state machines, L3 behaviors
- 117 Quint runtime guards transpile to TypeScript
- 1,689 tests pass across both repos

This audit ensures the codebase is clean, consistent, and ready for release.

---

## Step 1: Update All Documentation

Update these files to reflect the current state (Phases 1-7 complete):

- [ ] `specverse-self/docs/CURRENT-STATE-AND-PLAN.md` — mark Phase 6+7 complete, update all tables
- [ ] `specverse-self/.claude/memory/MEMORY.md` — update TODO, current state
- [ ] `specverse-self/.claude/memory/project_engine-extraction.md` — update test counts, completion status
- [ ] `specverse-self/.claude/memory/project_source-consolidation.md` — final state
- [ ] `specverse-engines/README.md` — if exists, update package descriptions
- [ ] `specverse-lang/CLAUDE.md` — remove references to deleted src/ directories
- [ ] `specverse-self/CLAUDE.md` — update with current commands and capabilities

---

## Step 2: Extract Golden Rules

Read all documentation and code to extract the guiding principles that define how SpecVerse should work. Sources:

- Architecture guides (ARCHITECTURE-GUIDE.md, ADDING-AN-ENTITY-TYPE.md, ADDING-AN-ENGINE.md)
- CLAUDE.md files (specverse-lang, specverse-self)
- Memory files (feedback rules, project decisions)
- The self-spec itself (what the language specifies about itself)
- Code patterns established during Phases 1-7

Categories:
- **Architecture**: how engines, entities, and the pipeline relate
- **Code generation**: what realize produces and why
- **Extension**: how new entities/engines are added
- **Quality**: typing, error handling, testing
- **Self-hosting**: the generated CLI IS the product
- **Separation**: what lives where (engines vs lang vs self)

---

## Step 3: Review Golden Rules

Joint review of the extracted principles. Refine, challenge, finalize. These become the permanent reference for all future work.

Deliverable: `specverse-self/docs/GOLDEN-RULES.md`

---

## Step 4: Golden Rules Audit

For each golden rule, verify the codebase complies:

- [ ] Every rule checked against actual code
- [ ] Violations documented with file:line references
- [ ] Each violation classified: fix now / acceptable / deferred
- [ ] Fixes applied for "fix now" items

---

## Step 5: Test Audit

Verify all tests pass after any changes from Step 4:

- [ ] specverse-engines: `npx vitest run` — expect 53/53 files, 1070+ tests
- [ ] specverse-lang: `npx vitest run` — expect 23/23 files, 619 tests
- [ ] No skipped tests (quint installed globally)
- [ ] No conditional skips hiding failures

---

## Step 6: Code Quality Audit

Systematic review of code quality:

### 6a: No shortcuts
- [ ] No `as any` casts that bypass real types (document acceptable ones)
- [ ] No `@ts-ignore` or `@ts-expect-error`
- [ ] No `// TODO` in generated output (stubs are acceptable in generators)
- [ ] No hardcoded entity/engine lists (verified in Phase 5b)

### 6b: Proper typing
- [ ] Engine interfaces properly typed (not `any`)
- [ ] Template contexts typed
- [ ] CLI command handlers typed
- [ ] No implicit `any` in new code (pre-existing 670 in specverse-lang noted)

### 6c: No cross-repo calls
- [ ] specverse-self does not import from specverse-lang at runtime
- [ ] specverse-engines does not import from specverse-lang
- [ ] Generated code does not reference specverse-lang paths
- [ ] No hardcoded absolute paths in generated output

### 6d: No version numbers in code identifiers
- [ ] No version numbers in function/class/variable names (e.g., `parseV31`, `V3ControllerGenerator`)
- [ ] No version numbers in file names except where genuinely version-specific (e.g., migration files)
- [ ] No hardcoded version strings in comments that will go stale (e.g., "v3.1 format")
- [ ] Version comes from package.json or config, not embedded in code

### 6e: No silent error swallowing
- [ ] Every catch block either logs or re-throws
- [ ] No empty catch blocks (document acceptable ones with comments)
- [ ] Realize pipeline reports all errors, not just count

---

## Step 7: Generator Output Audit

Verify the generated apps are complete and runnable:

### Phase 3 (from requirements — UUID IDs)
- [ ] `realize all` produces all expected files
- [ ] `npm install && npx prisma generate && npx prisma db push` succeeds
- [ ] `npx tsx src/main.ts` starts Fastify server
- [ ] All CURED operations work via API
- [ ] Evolve enforces lifecycle transitions
- [ ] Frontend builds and renders
- [ ] List views show correct fields with FK links
- [ ] Form views have FK select dropdowns
- [ ] Create/Update/Delete work through GUI

### Phase 4 (from existing code — Integer IDs)
- [ ] Same checks as Phase 3 but with Integer ID handling
- [ ] FK connect uses parseInt for Integer targets

### Both apps
- [ ] guards.ts is generated with 117 guards
- [ ] No pattern adapter stub warning
- [ ] Vite proxy works (frontend → backend)
- [ ] BookingService has L3 behavior code (preconditions, postconditions)

---

## Step 8: Dead Code / Redundant Code Cleanup

### specverse-lang (priority — this is being replaced)
- [ ] No remaining references to deleted src/ directories (parser, inference-engine, entities, generators, diagram-engine, realize, types)
- [ ] No unused imports
- [ ] No orphan test files that test deleted code
- [ ] No duplicate instance factory templates (should be in specverse-engines only)
- [ ] Remove any code that's only needed for the hand-written CLI and not the generated one
- [ ] Identify what remains that IS needed (CLI orchestrator, AI integration, registry, migration, utils)

### specverse-engines
- [ ] No backup files (.bak, .backup, .old)
- [ ] No commented-out code blocks
- [ ] No unused exports
- [ ] No dead generator code (generators that produce nothing useful)

### specverse-self
- [ ] Generated output is gitignored (not committed)
- [ ] No stale generated files in the repo

---

## Step 9: Dependency Audit

- [ ] No circular dependencies between engine packages
- [ ] All `file:` references in package.json documented (acceptable pre-npm-publish)
- [ ] No unused dependencies in any package.json
- [ ] No missing dependencies (code imports something not in package.json)
- [ ] All engine packages have proper `exports` field with `default` condition
- [ ] `./package.json` self-reference export in all packages

---

## Step 10: Final Consistency Check

- [ ] MEMORY.md matches actual codebase state
- [ ] CURRENT-STATE-AND-PLAN.md success criteria all checked
- [ ] Test counts in docs match actual test counts
- [ ] Line counts in docs are reasonable (don't need exact, but not wildly wrong)
- [ ] All three repos clean (no uncommitted changes)
- [ ] All three repos pushed to origin

---

## Success Criteria

The release audit is complete when:

1. All golden rules documented and verified
2. All tests pass (1,689+)
3. Both generated apps build and run with full CURED + GUI
4. No dead code in specverse-lang
5. No cross-repo runtime dependencies
6. No silent error swallowing
7. Documentation matches reality
8. All repos clean and pushed

After this audit, specverse-self is ready to be tagged as v4.0.0.
