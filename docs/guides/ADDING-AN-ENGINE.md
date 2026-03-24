# Adding a New Engine

This guide walks through adding a new engine to the SpecVerse ecosystem. Engines are independent npm packages that process specifications. They're discovered at runtime by the EngineRegistry.

## What Is an Engine?

An engine is a package that:
1. Implements the `SpecVerseEngine` interface
2. Exports a singleton engine instance
3. Is discoverable by name (`@specverse/engine-*`)
4. Has defined capabilities that other tools can query

Existing engines:
- `@specverse/engine-parser` — capabilities: `parse`, `validate`, `convention-processing`
- `@specverse/engine-inference` — capabilities: `infer`, `logical-inference`, `deployment-inference`
- `@specverse/engine-realize` — capabilities: `realize`, `code-generation`, `manifest-resolution`
- `@specverse/engine-generators` — capabilities: `generate-diagrams`, `generate-docs`, `generate-uml`

## Example: Adding an AI Engine (`@specverse/engine-ai`)

### Step 1: Create the package

```
specverse-engines/packages/ai/
  src/
    index.ts           -- Engine adapter + exports
    prompt-manager.ts  -- Core logic
    commands/          -- AI command implementations
  package.json
  tsconfig.json
```

### Step 2: Define package.json

```json
{
  "name": "@specverse/engine-ai",
  "version": "3.5.2",
  "description": "SpecVerse AI engine -- prompt building, suggestions, templates",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@specverse/types": "3.5.2"
  },
  "files": ["dist"],
  "license": "MIT"
}
```

### Step 3: Implement the SpecVerseEngine interface

```typescript
// src/index.ts
import type { SpecVerseEngine, EngineInfo } from '@specverse/types';

// Your engine-specific interface
export interface AIEngine extends SpecVerseEngine {
  generatePrompt(spec: any, options?: PromptOptions): Promise<string>;
  suggest(spec: any, context?: string): Promise<Suggestion[]>;
  template(name: string, options?: TemplateOptions): Promise<string>;
}

class SpecVerseAIEngine implements AIEngine {
  name = 'ai';
  version = '3.5.2';
  capabilities = ['ai-prompts', 'ai-suggestions', 'ai-templates'];

  private manager: any = null;

  async initialize(config?: any): Promise<void> {
    // Load prompt templates, configure AI provider, etc.
    this.manager = new PromptManager(config);
  }

  getInfo(): EngineInfo {
    return {
      name: this.name,
      version: this.version,
      capabilities: this.capabilities,
    };
  }

  async generatePrompt(spec: any, options?: PromptOptions): Promise<string> {
    if (!this.manager) throw new Error('AI engine not initialized.');
    return this.manager.buildPrompt(spec, options);
  }

  async suggest(spec: any, context?: string): Promise<Suggestion[]> {
    if (!this.manager) throw new Error('AI engine not initialized.');
    return this.manager.generateSuggestions(spec, context);
  }

  async template(name: string, options?: TemplateOptions): Promise<string> {
    if (!this.manager) throw new Error('AI engine not initialized.');
    return this.manager.loadTemplate(name, options);
  }
}

// Singleton for EngineRegistry discovery
export const engine = new SpecVerseAIEngine();
export default engine;
export { SpecVerseAIEngine };
```

### Step 4: Register with EngineRegistry

The EngineRegistry discovers engines from a known list of package names. To add your engine:

1. Name the package `@specverse/engine-ai`
2. Export `engine` as default (or named `engine`, or via `createEngine()`)
3. Add the package name to `knownEnginePackages` in `packages/entities/src/engine-registry.ts`
4. Install it in the project that uses it

Alternatively, pass it as an additional engine without modifying the registry:

```typescript
const registry = new EngineRegistry({
  additionalEngines: ['@specverse/engine-ai']
});
```

The registry finds it on `discover()`:

```typescript
const registry = new EngineRegistry();
await registry.discover();

const ai = registry.getEngineForCapability('ai-prompts');
if (ai) {
  await ai.initialize({ provider: 'anthropic' });
  const prompt = await (ai as AIEngine).generatePrompt(spec);
}
```

To add non-standard package names, pass them in options:

```typescript
const registry = new EngineRegistry({
  additionalEngines: ['my-custom-engine-package']
});
```

### Step 5: Add CLI commands (optional)

If your engine provides CLI commands, add them to the self-spec:

```yaml
# In the CLI component's commands section:
ai:
  description: "AI prompt building commands"
  subcommands:
    docs:
      description: "Generate AI documentation prompts"
      arguments:
        file:
          type: FilePath
          required: true
          positional: true
      flags:
        --provider:
          type: String
          default: "anthropic"
    suggest:
      description: "Get AI suggestions for a spec"
      arguments:
        file:
          type: FilePath
          required: true
          positional: true
```

Then add an engine handler in `libs/instance-factories/cli/engine-handlers.ts`:

```typescript
ai: {
  capability: 'ai-prompts',
  imports: `import { EngineRegistry } from '@specverse/engine-entities';`,
  handler: `
    const registry = new EngineRegistry();
    await registry.discover();
    const ai = registry.getEngineForCapability('ai-prompts');
    if (!ai) { console.error('AI engine not found.'); process.exit(1); }
    await ai.initialize();
    // ... call ai methods
  `
}
```

### Step 6: Add to specverse-engines workspace

In `specverse-engines/package.json`, the workspace already includes `packages/*`, so your new `packages/ai/` directory is automatically part of the workspace.

Build with the workspace:
```bash
cd specverse-engines
npm run build    # builds all packages including yours
npm test         # runs all tests
```

## Engine Interface Requirements

### Required exports:

```typescript
// ONE of these must exist for EngineRegistry discovery:
export default engine;           // Preferred
export const engine = ...;       // Alternative
export function createEngine() { return new MyEngine(); }  // Factory
```

### Required interface members:

```typescript
name: string              // Unique engine identifier
version: string           // Semver
capabilities: string[]    // Capability strings for lookup
initialize(): Promise<void>  // Setup (may be called multiple times)
getInfo(): EngineInfo     // Metadata
```

### Capabilities naming convention:

Use kebab-case, scoped by engine:
- Parser: `parse`, `validate`, `convention-processing`, `import-resolution`
- Inference: `infer`, `logical-inference`, `deployment-inference`, `rule-engine`
- Realize: `realize`, `code-generation`, `manifest-resolution`, `instance-factories`
- Generators: `generate-diagrams`, `generate-docs`, `generate-uml`
- AI: `ai-prompts`, `ai-suggestions`, `ai-templates`

## How Engines Relate to Entity Modules

Engines consume entity module facets:

| Engine | Entity Facet Used | How |
|--------|-------------------|-----|
| Parser | `schema`, `conventionProcessor` | Validates and expands entity syntax |
| Inference | `inferenceRules` | Loads rules for pattern matching |
| Realize | `generators` | Discovers instance factory metadata |
| Generators | `diagramPlugins` | Discovers available diagram types |

When a new entity type is registered, all engines automatically discover its facets via the entity registry. You don't need to modify engines to support new entity types -- the entity module provides everything the engines need.

## Testing Your Engine

Use the `testEngine()` helper for baseline coverage, then add engine-specific tests:

```typescript
import { describe, it, expect } from 'vitest';
import { testEngine } from '../../test-helpers.js';
import { engine } from './index.js';

// Standard engine tests (metadata, capabilities, initialize)
testEngine(engine);

// Engine-specific tests
describe('AI Engine specific', () => {
  it('generates prompts', async () => {
    await engine.initialize();
    const prompt = await engine.generatePrompt({ models: [] });
    expect(prompt).toBeTruthy();
  });
});
```

### Cross-Package Tests

If your engine needs files from other packages (e.g., entity grammar files, schema):

```typescript
import { resolvePackage } from '../../test-helpers.js';

// Resolve a file in another package
const schema = resolvePackage('engine-parser', 'schema/SPECVERSE-SCHEMA.json');
const grammar = resolvePackage('engine-entities', 'src/core/models/behaviour/conventions/grammar.yaml');
```

This uses workspace symlinks — no hardcoded paths.

### Test Types

| Type | What | Pattern |
|------|------|---------|
| **Single-package** | Tests using only your engine's code | Local imports + fixtures/ directory |
| **Cross-package** | Tests needing data from other engines | `resolvePackage()` from test-helpers |
| **Conditional** | Tests needing external tools (quint, etc.) | `itIfQuint` / `itIfExamples` |

See `docs/TEST-STRATEGY.md` for the full test strategy.

## Checklist

- [ ] Package named `@specverse/engine-*`
- [ ] Implements `SpecVerseEngine` interface
- [ ] Exports singleton as `default` or `engine`
- [ ] Has `capabilities` array for registry lookup
- [ ] `initialize()` is idempotent (safe to call multiple times)
- [ ] Added to specverse-engines workspace
- [ ] Builds with `npm run build`
- [ ] Tests pass with `npm test`
- [ ] CLI commands added to self-spec (if applicable)
- [ ] Engine handler added to engine-handlers.ts (if CLI commands exist)
