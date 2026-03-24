---
name: Fix root causes, don't hack around problems
description: When a problem is found, fix it properly rather than adding workarounds, skip-validation hacks, or hardcoded fallbacks
type: feedback
---

Don't paper over problems with hacks — fix the root cause properly.

**Why:** When fixing inference rule loading errors, I first added a hack to skip validation for certain rule categories. Mark called it out: "is this the right answer?" The proper fix was converting the two malformed rule files to the correct format. The hack would have masked future format errors.

**How to apply:** When encountering a failure:
1. Trace the root cause (don't stop at symptoms)
2. Fix the source data/code that's wrong, not the code that correctly rejects it
3. If a validation/check is failing, the check is probably right — the input is wrong
4. Hardcoded fallbacks, skip-validation flags, and silent catches are red flags
5. If something was "always broken," that's even more reason to fix it properly now
