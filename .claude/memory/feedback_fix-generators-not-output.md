---
name: Fix generators not generated output
description: When realize pipeline output has issues, fix the generator code in specverse-lang, never hand-edit generated files
type: feedback
---

When the realize pipeline generates code with issues (e.g., invalid Prisma schema), fix the generator, not the output.

**Why:** Mark stopped me mid-edit when I was hand-fixing Prisma relation annotations in the generated schema. The generated output is throwaway — it gets regenerated every time. The fix must go into the generator code so ALL future realizations produce correct output.

**How to apply:** When reviewing `specverse realize` output and finding errors:
1. Identify the root cause in the generator (e.g., `libs/instance-factories/orms/templates/prisma/schema-generator.ts`)
2. Fix the generator
3. Re-run realize to verify
4. Never edit files under `generated/`
