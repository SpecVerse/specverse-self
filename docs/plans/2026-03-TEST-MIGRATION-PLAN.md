# Test Migration Plan

**Date**: 24 March 2026
**Purpose**: Consolidate tests into a single source of truth with a generic test framework that automatically discovers and runs tests from entity modules and engine packages.

---

## Current State

### The Problem

Tests are duplicated across two repos:
- **specverse-lang**: 74 test files, 1,752 tests, 100% pass
- **specverse-engines**: 54 test files, 980 tests, 90.5% pass (93 environmental failures)
- **42 test files are duplicated** — changes in one repo don't propagate to the other

### Test Inventory

| Category | Files | Tests (approx) | Location | Notes |
|----------|-------|----------------|----------|-------|
| Parser | 16 | ~400 | both repos | duplicated |
| Inference | 9 | ~200 | both repos | duplicated |
| Entity modules | 18 | ~300 | both repos | duplicated |
| Diagram engine | 11 | ~150 | both repos | duplicated |
| AI view generator | 5 | ~100 | specverse-lang only | |
| CLI | 6 | ~150 | specverse-lang only | |
| Registry | 8 | ~200 | specverse-lang only | |
| Integration | 2 | ~50 | specverse-lang only | |
| Migration | 1 | ~20 | specverse-lang only | |
| Utilities | 1 | ~10 | specverse-lang only | |
| Instance factories | 1 | ~50 | specverse-engines only | |

### By Entity Module

| Entity | Test Files | Facets Tested | Gap |
|--------|-----------|---------------|-----|
| models | 5 | conventions, generators, inference, schema, docs | Well covered |
| controllers | 1 | all (parity) | Single monolithic test |
| services | 1 | all (parity) | Single monolithic test |
| events | 1 | all (parity) | Single monolithic test |
| views | 2 | all + composite patterns | OK |
| deployments | 1 | all (parity) | Single monolithic test |
| commands | 1 | all | OK |
| conventions | 1 | all | OK |
| measures | 1 | all | OK |

### By Engine

| Engine | Test Files | Gap |
|--------|-----------|-----|
| Parser | 16 | Good coverage |
| Inference | 9 | Good coverage |
| Realize | 1 | **Severely undertested** — only workflow integration |
| Generators | 16 | Good (AI view + diagrams) |
| Entities | 18 | Good (per-module) |
| AI | 0 | **No tests** |
| MCP | 0 | **No tests** |

### Environmental Failures (93 in specverse-engines)

| Type | Count | Cause | Fix |
|------|-------|-------|-----|
| Quint typecheck | ~25 | Needs quint binary | Conditional: skip if quint not installed |
| File existence | ~24 | Reference specverse-lang example paths | Fixtures or conditional skip |
| Schema paths | ~10 | Different relative paths | Resolved (symlinks added) |
| Rule file paths | ~7 | Specialist view rules not copied | Copy or fixture |
| Other | ~27 | Various path/import issues | Case-by-case |

---

## Target: Generic Test Framework

### Principle

Tests should be **co-located with what they test** and **automatically discovered** by the test framework. Just as entity modules are discovered by the entity registry, tests should be discovered by the test runner.

### Structure

Each entity module already declares its tests in `tests/index.ts`:

```typescript
// src/entities/core/models/tests/index.ts
export const modelTests: EntityTestReference[] = [
  { title: 'Convention Processor Tests', category: 'unit', path: '...', description: '...' },
  { title: 'Inference Rule Tests', category: 'unit', path: '...', description: '...' },
  // etc.
];
```

Each engine package exports its test configuration similarly.

### Generic Test Runner

A test runner that discovers and executes tests from entity modules and engine packages:

```typescript
// test-framework/entity-test-runner.ts

import { bootstrapEntityModules, getEntityRegistry } from '@specverse/engine-entities';

/**
 * Discover and run all entity module tests.
 * Each entity module declares its tests in tests/index.ts.
 * The runner resolves paths, loads test files, and executes them.
 */
export function discoverEntityTests(): TestSuite[] {
  bootstrapEntityModules();
  const registry = getEntityRegistry();
  const suites: TestSuite[] = [];

  for (const module of registry.getAllModules()) {
    if (module.tests && module.tests.length > 0) {
      suites.push({
        name: `${module.name} entity`,
        type: module.type,    // 'core' or 'extension'
        tests: module.tests,
        // Each test has: title, category, path, description
      });
    }
  }

  return suites;
}
```

### Test Categories (Auto-Discovered)

For each entity module, the framework runs tests in this order:

| Category | What it tests | Auto-discoverable |
|----------|--------------|-------------------|
| **schema** | JSON Schema validates correct/incorrect .specly input | Yes — load schema from entity, validate fixtures |
| **conventions** | Convention processor expands shorthand correctly | Yes — load processor from entity, test expansion |
| **inference** | Inference rules generate correct output from models | Yes — load rules from entity, test pattern matching |
| **behaviour** | Quint invariants typecheck and hold | Conditional — needs quint binary |
| **generators** | Code generators produce correct output | Yes — load generators, test against fixtures |
| **parity** | Entity processor matches original parser processor | Yes — compare outputs for same input |
| **docs** | Referenced doc files exist | Conditional — needs full repo |
| **integration** | Entity works in the full pipeline | Yes — validate → infer → realize |

### For Engines

Each engine package has a standard test interface:

```typescript
// Standard engine test structure
describe(`${engine.name} engine`, () => {
  it('has correct metadata', () => {
    expect(engine.name).toBeDefined();
    expect(engine.capabilities).toBeInstanceOf(Array);
  });

  it('initializes successfully', async () => {
    await engine.initialize();
    expect(engine.getInfo().name).toBe(engine.name);
  });

  // Engine-specific tests discovered from package
});
```

### Vitest Configuration

```typescript
// vitest.config.ts (root)
export default defineConfig({
  test: {
    include: [
      // Entity module tests (auto-discovered structure)
      'packages/entities/src/__tests__/**/*.test.ts',
      'packages/entities/src/core/*/tests/**/*.test.ts',
      'packages/entities/src/extensions/*/tests/**/*.test.ts',

      // Engine package tests
      'packages/*/src/__tests__/**/*.test.ts',
      'packages/*/src/**/__tests__/**/*.test.ts',
    ],
    exclude: ['**/node_modules/**', '**/dist/**'],

    // Conditional test groups
    testTimeout: 30000,
    setupFiles: ['./test-setup.ts'], // Checks for quint binary, sets fixtures path
  },
});
```

### Test Setup (Conditional Execution)

```typescript
// test-setup.ts
import { execSync } from 'child_process';

// Check environment capabilities
globalThis.__TEST_ENV__ = {
  hasQuint: (() => {
    try { execSync('quint --version', { stdio: 'pipe' }); return true; }
    catch { return false; }
  })(),
  hasExamples: existsSync(resolve(__dirname, '../specverse-lang/examples')),
  schemaPath: resolve(__dirname, 'packages/parser/schema/SPECVERSE-SCHEMA.json'),
};
```

Tests use this:
```typescript
import { it } from 'vitest';

const conditionalIt = globalThis.__TEST_ENV__?.hasQuint ? it : it.skip;

conditionalIt('should typecheck invariants', () => { ... });
```

---

## Migration Steps

### Step 1: Establish specverse-engines as test source of truth

All engine and entity tests live in specverse-engines. specverse-lang keeps only:
- CLI tests (depend on CLI environment)
- Registry tests (depend on registry infrastructure)
- Integration tests that need the full monolith

### Step 2: Fix environmental tests

| Test Category | Fix |
|---------------|-----|
| Quint typecheck | Conditional: `it.skipIf(!hasQuint)` |
| File existence (docs) | Provide fixture paths or skip |
| Schema paths | Already fixed (symlinks) |
| Rule file paths | Copy rules to engines or use dynamic path resolution |

### Step 3: Add missing test suites

| What | Priority | Approach |
|------|----------|----------|
| Realize/instance factories | HIGH | Test each factory's template output against fixtures |
| AI engine | HIGH | Test prompt generation, suggestions |
| MCP server | MEDIUM | Test tool discovery, resource serving |
| CLI (generated) | HIGH | Test generated CLI commands against expected output |
| Self-hosting parity | HIGH | Automated test: generated CLI output == hand-written CLI output |

### Step 4: Implement generic test runner

Create a test utility that:
1. Discovers entity modules from registry
2. For each module, loads its declared tests
3. Runs standard test categories (schema, conventions, inference, behaviour, generators)
4. Reports per-entity and per-facet pass rates

### Step 5: Add to CI/CD

```yaml
# .github/workflows/test.yml
jobs:
  test:
    steps:
      - run: npm run build --workspaces
      - run: npm test                    # All engine + entity tests
      - run: npm run test:quint          # Quint verification (conditional)
      - run: npm run test:self-hosting   # Generated CLI parity check
```

---

## Target Pass Rates

| Category | Current | Target | Notes |
|----------|---------|--------|-------|
| Entity module tests | 90.5% | 100% | Fix environmental issues |
| Engine unit tests | 100% | 100% | Maintain |
| Realize/factory tests | ~0% | 80%+ | New tests needed |
| AI engine tests | 0% | 80%+ | New tests needed |
| Self-hosting parity | manual | automated | New test needed |
| Quint verification | conditional | conditional | Depends on quint binary |
| **Overall** | **~90%** | **95%+** | Excluding conditional Quint |

---

## Generic Entity Test Template

When adding a new entity type, the test framework should automatically generate a test skeleton:

```typescript
// Auto-generated test for a new entity module
import { describe, it, expect } from 'vitest';

describe('${entityName} entity module', () => {
  // 1. Module registration
  describe('registration', () => {
    it('should register with entity registry', () => { ... });
    it('should declare correct dependencies', () => { ... });
  });

  // 2. Schema validation
  describe('schema', () => {
    it('should have a valid JSON Schema fragment', () => { ... });
    it('should validate correct input', () => { ... });
    it('should reject invalid input', () => { ... });
  });

  // 3. Convention processing
  describe('conventions', () => {
    it('should have a convention processor', () => { ... });
    it('should process valid input', () => { ... });
    it('should expand shorthand correctly', () => { ... });
  });

  // 4. Inference rules (if any)
  describe('inference', () => {
    it('should declare inference rules (or empty)', () => { ... });
  });

  // 5. Quint behaviour (conditional)
  describe('behaviour', () => {
    it.skipIf(!hasQuint)('should typecheck invariants', () => { ... });
  });

  // 6. Generators (if any)
  describe('generators', () => {
    it('should declare generators (or empty)', () => { ... });
  });

  // 7. Diagram plugins (if any)
  describe('diagrams', () => {
    it('should declare diagram plugins (or empty)', () => { ... });
  });
});
```

This template is what the ADDING-AN-ENTITY-TYPE guide's Step 11 ("Build and test") should generate automatically.
