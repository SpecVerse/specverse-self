# Adding a New Entity Type

This guide walks through adding a new entity type to SpecVerse. When you're done, your entity type will be:
- Parseable in `.specly` files
- Validated against a JSON Schema
- Expandable via convention syntax
- Formally specified via Quint invariants
- Discoverable by all engines (inference, realize, diagrams)

## Example: Adding a `workflows` entity type

### Step 1: Create the entity module directory

```
src/entities/extensions/workflows/
  module.yaml
  index.ts
  schema/
    workflows.schema.json
  conventions/
    workflow-processor.ts
  inference/
    index.ts
  generators/
    index.ts
  behaviour/
    invariants.qnt
    rules.qnt
    conventions/
      grammar.yaml
  docs/
    index.ts
  tests/
    index.ts
```

### Step 2: Define the module manifest (module.yaml)

```yaml
name: workflows
type: extension      # 'core' or 'extension'
version: 0.1.0
depends_on: [models, services]  # entity types this depends on

facets:
  schema: schema/workflows.schema.json
  conventions:
    structural: conventions/workflow-processor.ts
    behavioural: behaviour/conventions/grammar.yaml
  behaviour:
    rules: behaviour/rules.qnt
    invariants: behaviour/invariants.qnt
  inference:
    entry: inference/index.ts
  generators: generators/index.ts
  docs: docs/index.ts
  tests: tests/index.ts

diagrams:
  - type: workflow    # registers a 'workflow' diagram type

delivery:
  parser: true        # convention processor is available
  inference: false     # no inference rules yet
  realize: false       # no code generators yet
  cli: false           # not a CLI entity
```

### Step 3: Define the JSON Schema (schema/workflows.schema.json)

This defines what `workflows:` looks like in a `.specly` file.

```json
{
  "$id": "specverse://entities/workflows",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Workflow definitions for orchestrating multi-step processes",
  "$defs": {
    "WorkflowsSection": {
      "type": "object",
      "patternProperties": {
        "^[a-z][a-zA-Z0-9_]*$": {
          "type": "object",
          "properties": {
            "description": { "type": "string" },
            "trigger": { "type": "string" },
            "steps": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "service": { "type": "string" },
                  "operation": { "type": "string" },
                  "onFailure": { "type": "string" }
                }
              }
            },
            "compensations": {
              "type": "object",
              "additionalProperties": { "type": "string" }
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  }
}
```

### Step 4: Create the convention processor (conventions/workflow-processor.ts)

The convention processor transforms raw YAML into a structured array.

```typescript
import { AbstractProcessor, ProcessorContext } from '@specverse/types';

export interface WorkflowSpec {
  name: string;
  description?: string;
  trigger?: string;
  steps: WorkflowStep[];
  compensations?: Record<string, string>;
}

export interface WorkflowStep {
  name: string;
  service?: string;
  operation?: string;
  onFailure?: string;
}

export class WorkflowProcessor extends AbstractProcessor<any, WorkflowSpec[]> {
  process(workflowsData: any): WorkflowSpec[] {
    return Object.entries(workflowsData).map(([name, def]: [string, any]) => ({
      name,
      description: def.description,
      trigger: def.trigger,
      steps: (def.steps || []).map((step: any) => ({
        name: step.name,
        service: step.service,
        operation: step.operation,
        onFailure: step.onFailure,
      })),
      compensations: def.compensations,
    }));
  }
}
```

### Step 5: Create the module entry point (index.ts)

```typescript
import type { EntityModule, EntityConventionProcessor } from '../../_shared/types.js';
import { WorkflowProcessor } from './conventions/workflow-processor.js';
import type { WorkflowSpec } from './conventions/workflow-processor.js';
import type { ProcessorContext } from '@specverse/types';

export { WorkflowProcessor, type WorkflowSpec };

function createWorkflowConventionProcessor(): EntityConventionProcessor<any, WorkflowSpec[]> {
  return {
    process(input: any, context: ProcessorContext): WorkflowSpec[] {
      const processor = new WorkflowProcessor(context);
      return processor.process(input);
    }
  };
}

export const workflowsModule: EntityModule = {
  name: 'workflows',
  type: 'extension',
  version: '0.1.0',
  dependsOn: ['models', 'services'],

  conventionProcessor: createWorkflowConventionProcessor(),

  inferenceRules: [],     // Add later when you have rules

  generators: [],         // Add later for code generation

  diagramPlugins: [
    { type: 'workflow' },  // Registers a workflow diagram type
  ],

  docs: [],
  tests: [],
};

export default workflowsModule;
```

### Step 6: Register the module

In `src/entities/_bootstrap.ts`, add the import:

```typescript
import { workflowsModule } from './extensions/workflows/index.js';

// In the bootstrap function, add:
registry.register(workflowsModule);
```

The entity module also needs to be listed in `src/entities/extensions/` and exported from `src/entities/index.ts`.

### Step 7: Add to the component schema

In `src/entities/_shared/schema/root.schema.json`, add `workflows` to the component properties:

```json
"workflows": {
  "$ref": "#/$defs/WorkflowsSection"
}
```

The schema composition script (`scripts/build-tools/compose-schema.cjs`) already loads extension schemas automatically.

### Step 8: Add to the component entity filter

In `src/parser/convention-processor.ts`, add `workflows` to the filter:

```typescript
const COMPONENT_ENTITY_TYPES = new Set([
  'models', 'controllers', 'services', 'views', 'events', 'commands', 'workflows'
]);
```

Also add `workflows?: any[]` to `ComponentSpec` in `src/types/ast.ts`.

### Step 9: Handle in astToExpandedYaml

In `src/parser/unified-parser.ts`, add `workflows` to `knownProps` and add a conversion block (if the processed format differs from the raw format):

```typescript
const knownProps = new Set([..., 'workflows']);

// Convert workflows back to object format for post-validation
if (component.workflows && component.workflows.length > 0) {
  result.components[component.name].workflows = {};
  for (const wf of component.workflows as any[]) {
    const { name, ...def } = wf;
    result.components[component.name].workflows[name] = def;
  }
}
```

### Step 10: Add behavioural specifications (behaviour/)

Create Quint invariants and rules:

```quint
// invariants.qnt
module workflowInvariants {
  import specverseTypes.* from "../../../_shared/behaviour/types"

  var workflows: Set[Workflow]

  // Every workflow must have at least one step
  val workflowsHaveSteps: bool =
    workflows.forall(w => w.steps.size() > 0)

  // Workflow step service references must exist
  val stepServicesExist: bool =
    workflows.forall(w =>
      w.steps.forall(s => s.serviceRef != ""))
}
```

### Step 11: Add tests

Use the `testEntityModule()` helper for baseline coverage, then add entity-specific tests:

```typescript
// __tests__/workflows-entity.test.ts
import { describe, it, expect } from 'vitest';
import { testEntityModule, createTestContext } from '../../test-helpers.js';
import { workflowsModule } from '../extensions/workflows/index.js';
import { WorkflowProcessor } from '../extensions/workflows/conventions/workflow-processor.js';

// Standard entity module tests (metadata, schema, processor, diagrams)
testEntityModule(workflowsModule);

// Entity-specific tests
describe('Workflows convention processing', () => {
  it('should expand workflow definition', () => {
    const ctx = createTestContext();
    const processor = new WorkflowProcessor(ctx);
    const result = processor.process({
      checkout: {
        description: 'Checkout process',
        steps: [{ name: 'validate', service: 'CartService' }]
      }
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('checkout');
    expect(result[0].steps).toHaveLength(1);
  });
});
```

If your tests need files from other packages, use cross-package resolution:

```typescript
import { resolvePackage } from '../../test-helpers.js';
const schemaPath = resolvePackage('engine-parser', 'schema/SPECVERSE-SCHEMA.json');
```

See `docs/TEST-STRATEGY.md` for the full test strategy, including conditional tests and cross-package patterns.

### Step 12: Build and verify

```bash
npm run build          # Rebuilds schema, compiles TypeScript
npm test               # All tests should pass
specverse validate examples/my-workflow-spec.specly  # Test your entity
```

## What Happens Automatically

Once registered, your entity type is automatically:

1. **Parsed** — the convention processor runs when `workflows:` appears in a component
2. **Schema-validated** — both pre and post convention processing
3. **Discoverable** — `getEntityRegistry().getModule('workflows')` returns your module
4. **Available to inference** — if you add inference rules, they're loaded automatically
5. **Available to realize** — if you add generators, they're discovered by the realize engine
6. **Available to diagrams** — your `diagramPlugins` declaration registers diagram types

## What You Need to Do Manually

1. **Add inference rules** — JSON rule files that pattern-match models and generate architecture
2. **Add code generators** — instance factory YAMLs + template generators
3. **Add diagram plugins** — implement a diagram plugin class and register it
4. **Add to the self-spec** — if this is a core SpecVerse concept, add it to the self-spec
5. **Add Quint types** — extend `src/entities/_shared/behaviour/types.qnt` with your type definition

## Common Patterns

### Convention Syntax
Follow the existing pattern: `name: Type modifiers` for simple values, structured YAML for complex ones. The convention processor expands shorthand into full objects.

### Cross-Entity References
If your entity references models (e.g., `workflows.steps[].service` references a service), add semantic validation in `unified-parser.ts` to the `SEMANTIC_RULES` array.

### Extension vs Core
- **Core**: Ships with SpecVerse, always available, deeply integrated. Examples: models, controllers, services.
- **Extension**: Installed separately, optional, can be distributed via npm. Examples: commands, measures, workflows.

The code structure is identical. The only difference is packaging (core is in `src/entities/core/`, extensions in `src/entities/extensions/`).
