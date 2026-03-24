---
name: YAML schema validation runs twice
description: Schema validation happens before AND after convention processing — both passes must succeed, and the data shape differs between them
type: feedback
---

Schema validation runs twice in the parser pipeline:
1. **Before convention processing** — validates raw YAML against the JSON Schema (object format, e.g., `commands: { validate: { ... } }`)
2. **After convention processing** — validates the processed AST (array format, e.g., `commands: [{ name: 'validate', ... }]`)

**Why this matters:** When adding a new entity type to the component pipeline, both the raw YAML format AND the processed AST format must be valid against the schema. This is why extension entity types (commands, conventions, measures) need different handling from core types — core types' schemas accept both object (pre-processing) and array (post-processing) forms, but extension types may not.

**How to apply:** When integrating a new entity type:
- The schema `$def` (e.g., `CommandsSection`) defines the raw YAML format
- The convention processor transforms it to the AST format
- If the AST format differs from the raw format (e.g., object → array), the processed output must NOT be present during the second validation pass, OR the schema must accept both forms
- Currently solved by: extension types are omitted from processed output when not present in source (no empty `[]` default)
