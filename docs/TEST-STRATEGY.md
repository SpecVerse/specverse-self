# SpecVerse Test Strategy

## Principles

1. **Tests live with the code they test** — not in a separate repo
2. **Each package is self-contained for testing** — fixtures included, no external dependencies
3. **Cross-package tests use resolvePackage()** — discovers other packages via workspace symlinks
4. **Conditional tests skip gracefully** — Quint tests skip when quint binary isn't installed
5. **The test framework follows the same pattern as everything else** — entity modules declare tests, engines declare tests, the framework discovers them

## Test Categories

### Single-Package Tests

Tests that only need code and data from one package.

```
packages/parser/src/__tests__/
  specverse-parser.test.ts       # Uses parser code + local schema fixture
  fixtures/
    complete-example.specly      # Test fixture — self-contained
```

**Pattern**: Import from the package, use local `fixtures/` directory.

```typescript
import { UnifiedSpecVerseParser } from '../unified-parser.js';
import { readFileSync } from 'fs';
import { join } from 'path';

const schema = JSON.parse(readFileSync(join(__dirname, '../../../schema/SPECVERSE-SCHEMA.json'), 'utf8'));
const fixture = readFileSync(join(__dirname, 'fixtures/complete-example.specly'), 'utf8');
```

### Cross-Package Tests

Tests that need files from another engine package.

```typescript
import { resolvePackage } from '../../../../../../test-helpers.js';

// Resolve a file in the entities package
const rulesPath = resolvePackage('engine-entities', 'src/core/views/inference/v3.4-specialist-views.json');
```

**How it works**: `resolvePackage()` finds the package via `node_modules/@specverse/` workspace symlinks, then resolves the relative path within the real package directory.

**When to use**: When a test in one engine needs data declared in another engine's entity modules (e.g., inference tests loading grammar files from entities).

### Conditional Tests

Tests that depend on external tools or the full repo structure.

```typescript
import { itIfQuint } from '../../../../../../test-helpers.js';

itIfQuint('should typecheck invariants', () => {
  // Only runs when quint binary is available
  execSync(`npx quint typecheck "${qntFile}"`);
});
```

**Available conditions**:
- `itIfQuint` — skips when quint binary not installed
- `itIfExamples` — skips when specverse-lang examples not available

The `test-setup.ts` detects capabilities at startup and sets `globalThis.__TEST_ENV__`.

## Test Infrastructure

### Files

```
specverse-engines/
  vitest.config.ts    # Discovers tests from all packages
  test-setup.ts       # Detects environment (quint, examples, schema)
  test-helpers.ts     # resolvePackage(), testEntityModule(), testEngine()
```

### vitest.config.ts

```typescript
export default defineConfig({
  test: {
    include: ['packages/*/src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 30000,
    setupFiles: ['./test-setup.ts'],
    globals: true,
  },
});
```

### test-setup.ts

Runs before all tests. Detects:
- Quint binary available?
- specverse-lang repo present (for examples)?
- Schema file location

Sets `globalThis.__TEST_ENV__` for all tests to read.

### test-helpers.ts

Exports:
- `resolvePackage(name, path)` — cross-package file resolution
- `packageRoot(name)` — get package root directory
- `loadSchema()` — load SPECVERSE-SCHEMA.json
- `createTestContext()` — create ProcessorContext for convention tests
- `testEntityModule(module)` — standard entity module test suite
- `testEngine(engine)` — standard engine test suite
- `itIfQuint`, `itIfExamples` — conditional test helpers

## What Each Package Tests

### Entity Modules (packages/entities)

Each entity module tests through its `tests/index.ts` declaration:

| Test Type | What | Example |
|-----------|------|---------|
| Registration | Module registers with registry | `bootstrap-integration.test.ts` |
| Schema | JSON Schema fragment is valid | `entity-schema.test.ts` |
| Conventions | Processor expands shorthand correctly | `models-convention-processor.test.ts` |
| Parity | Entity processor matches original parser processor | per-entity `.test.ts` |
| Inference | Inference rules match expectations | `models-inference-rules.test.ts` |
| Behaviour | Quint specs typecheck (conditional) | `behaviour-typecheck.test.ts` |
| Docs/Tests | Metadata is correct (titles, categories) | `models-docs-tests.test.ts` |

### Parser Engine (packages/parser)

| Test Type | What | Example |
|-----------|------|---------|
| Parsing | YAML → AST conversion | `specverse-parser.test.ts` |
| Schema validation | Pre/post convention validation | `v3.3-metadata-validate.test.ts` |
| Constraints | Behavioural constraint expansion | `constraints.test.ts` |
| Integration | Full spec through pipeline | `complete-example.test.ts` |

### Inference Engine (packages/inference)

| Test Type | What | Example |
|-----------|------|---------|
| Rule engine | Pattern matching, priority ordering | `rule-engine.test.ts` |
| Context | Relationship analysis | `context.test.ts` |
| Rule loading | JSON rule file loading | `rule-loader.test.ts` |
| End-to-end | Models → full architecture | `end-to-end.test.ts` |
| Regression | All rules produce valid output | `rule-regression.test.ts` |
| Specialist views | View expansion rules | `specialist-view-expander.test.ts` |

### Generators Engine (packages/generators)

| Test Type | What | Example |
|-----------|------|---------|
| Diagram plugins | Individual diagram generation | `ERDiagramPlugin.test.ts` etc. |
| Integration | Full diagram pipeline | `ERDiagram-integration.test.ts` etc. |

### Realize Engine (packages/realize)

| Test Type | What | Example |
|-----------|------|---------|
| Composite patterns | View pattern validation | `composite-patterns.test.ts` |

**Gap**: Realize is severely undertested. Needs tests for instance factory loading, capability resolution, and code generation.

## Adding Tests for a New Entity Type

When you add a new entity module (per ADDING-AN-ENTITY-TYPE.md), create tests that follow this structure:

```
src/entities/extensions/myentity/
  tests/
    index.ts                    # Declares test references
  __tests__/                    # Optional: entity-specific tests
    myentity-conventions.test.ts
```

The `testEntityModule()` helper gives you baseline coverage:

```typescript
import { testEntityModule } from '../../test-helpers.js';
import { myEntityModule } from '../extensions/myentity/index.js';

testEntityModule(myEntityModule);
```

This automatically tests: metadata, convention processor, schema, diagram plugins, inference rules.

For entity-specific tests (e.g., testing convention expansion):

```typescript
import { describe, it, expect } from 'vitest';
import { createTestContext } from '../../test-helpers.js';
import { MyEntityProcessor } from '../extensions/myentity/conventions/myentity-processor.js';

describe('MyEntity conventions', () => {
  it('should expand shorthand', () => {
    const ctx = createTestContext();
    const processor = new MyEntityProcessor(ctx);
    const result = processor.process({ myField: 'value' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('myField');
  });
});
```

## Adding Tests for a New Engine

When you add a new engine (per ADDING-AN-ENGINE.md), use the `testEngine()` helper:

```typescript
import { testEngine } from '../../test-helpers.js';
import { engine } from '../index.js';

testEngine(engine);

describe('MyEngine specific tests', () => {
  it('should do its thing', async () => {
    await engine.initialize();
    const result = await engine.doSomething();
    expect(result).toBeTruthy();
  });
});
```

If your engine tests need files from other packages:

```typescript
import { resolvePackage } from '../../test-helpers.js';

const schemaPath = resolvePackage('engine-parser', 'schema/SPECVERSE-SCHEMA.json');
```

## Current State

| Package | Tests | Passed | Failed | Skipped |
|---------|-------|--------|--------|---------|
| entities | ~500 | all | 0 | 25 (Quint) |
| parser | ~300 | all | 0 | 0 |
| inference | ~150 | all | 0 | 0 |
| generators | ~80 | all | 0 | 0 |
| realize | ~50 | all | 0 | 0 |
| ai | 0 | - | - | - |
| **Total** | **1057** | **1032** | **0** | **25** |

100% pass rate on non-conditional tests.
