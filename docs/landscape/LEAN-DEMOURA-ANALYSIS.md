# When AI Writes the World's Software: A SpecVerse Analysis

**Date**: March 2026
**Source**: Leonardo de Moura, ["When AI Writes the World's Software, Who Verifies It?"](https://leodemoura.github.io/blog/2026/02/28/when-ai-writes-the-worlds-software.html)
**Author**: Leonardo de Moura — Senior Principal Applied Scientist at AWS, Chief Architect and co-founder of the Lean FRO, creator of Lean
**Analysis**: Claude (Opus 4.6)

---

## What De Moura Is Arguing

Leonardo de Moura — the creator of Lean, arguably the most important formal verification tool in the world right now — makes a stark argument:

AI is writing 25-30% of code at Google and Microsoft today. Microsoft's CTO predicts 95% by 2030. Anthropic built a 100,000-line C compiler in two weeks for under $20,000. Code Metal raised $125 million to rewrite defense industry code using AI. AWS modernised 40 million lines of COBOL for Toyota.

**Nobody is formally verifying any of it.**

Andrej Karpathy admits: "I 'Accept All' always, I don't read the diffs anymore." Nearly half of AI-generated code fails basic security tests. Larger models don't generate significantly more secure code than their predecessors. The same defenses that missed Heartbleed for two years are the ones being relied upon for AI-generated code — except now the code arrives at a thousand times the speed.

De Moura's thesis: **"Verification, testing, and specification have always been the bottleneck, not implementation."**

That sentence is SpecVerse's entire reason for existing, stated by one of the most credible people in computer science.

---

## The Core Arguments

### The Verification Crisis

Poor software quality already costs the US economy $2.41 trillion per year — and that figure predates widespread AI code generation. De Moura identifies several compounding threats:

- **Overfitting to tests**: The Claude C Compiler demonstration showed AI can hard-code values to satisfy test suites without actually implementing the general algorithm. "For any fixed testing strategy, a sufficiently adversarial system can overfit to it. A proof cannot be gamed."

- **Shared assumptions**: "When your tests and your code share the same wrong assumptions, testing finds nothing. The act of proving forces every assumption to be explicit." This is the deepest line in the article.

- **Supply chain attacks at scale**: Adversaries could poison training data or compromise AI model APIs to inject subtle vulnerabilities. Traditional code review cannot reliably detect deliberately subtle vulnerabilities — and AI generates code at a thousand times the speed of human development.

- **Reviewer fatigue**: When AI code is "good enough most of the time," reviewers stop carefully examining it. The review bottleneck that barely worked for human-written code collapses entirely under AI-generated volume.

### Why Proof, Not Testing

De Moura draws a sharp distinction: "Testing provides confidence. Proof provides a guarantee."

His constant-time TLS example illustrates this perfectly: a TLS library specification requires constant-time execution to prevent timing side-channel attacks. Code can pass all tests while still containing subtle conditionals that vary with secret key bits — invisible to testing and code review, but instantly caught by a formal proof of constant-time behaviour.

The economic argument has shifted: proof was previously impractical at scale due to the cost of manual effort. AI changes this fundamentally. "When AI can generate verified software as easily as unverified software, verification is no longer a cost. It is a catalyst."

### Why Lean

De Moura makes the case for Lean specifically:

**Technical requirements for a verification platform:**
- A small, trusted kernel (thousands of lines) that mechanically checks every proof step
- Code and proofs unified in one system — no translation gap
- Rich, extensible tactic framework providing structured feedback to AI (goal states, hypotheses, step-by-step changes)
- Rejection of "push-button solvers" that return binary pass/fail — AI needs the intermediate reasoning steps
- Open source, vendor-independent

**Lean's position:**
- Backed by Mathlib: 200,000+ formalised theorems, 750 contributors, five Fields Medalists engaged
- Every major AI reasoning system that achieved medal-level IMO performance used Lean (AlphaProof, SEED Prover, Aristotle, Axiom, Aleph). No competing platform was used by any of them.
- Production deployment: AWS verified Cedar (authorisation), Microsoft verified SymCrypt (cryptography)
- 200,000+ users, 8,000+ GitHub repos, ACM SIGPLAN 2025 Programming Languages Software Award

**The zlib demonstration:**
Kim Morrison converted zlib (a ubiquitous C compression library) to Lean using Claude with minimal human guidance. The capstone theorem: "Decompressing a compressed buffer always returns original data at every compression level for the full zlib format." During the proof, the team discovered assumptions that testing could never have surfaced — because the tests shared the same assumptions as the code.

### The Reconstructed Software Stack

De Moura outlines priority components for formal verification:
1. **Cryptography** — everything else trusts it
2. **Core libraries** — data structures, algorithms, compression
3. **Storage engines** — SQLite (embedded in every smartphone, browser, OS)
4. **Parsers and protocols** — JSON, HTTP, DNS, certificate validation
5. **Compilers and runtimes**

The vision: verified components become "a permanent public good" — open source, mathematically guaranteed, impossible to degrade or hold hostage by any single company.

---

## Relevance to SpecVerse

### 1. The Bottleneck Shift Validates the Entire SpecVerse Thesis

De Moura states what SpecVerse is built on: implementation is no longer the bottleneck. Specification, verification, and testing are. When you can generate 100,000 lines of C in two weeks for $20,000, the value concentrates entirely in:

- **Defining what should be built** (specification)
- **Validating the specification is correct and complete** (validation)
- **Proving the implementation matches** (verification)
- **Maintaining alignment over time** (the closed loop)

This is SpecVerse's value proposition stated from the formal verification angle. The meta-specification platform sits precisely at this bottleneck — providing the specification layer that AI-generated code is measured against.

### 2. Specification Independence Is Spec Supremacy

De Moura's argument about tests sharing assumptions with code is the formal verification version of SpecVerse's "spec supremacy" principle. A specification must be **independent** of the implementation it governs. If the spec and the code share assumptions, neither can catch the other's errors.

A .specly file defines what the system should be, independently of how it's built. If the AI generates code that doesn't match the spec, the spec catches it — not because tests failed, but because the formal definition of correctness exists outside the code. This is exactly what de Moura means when he says "formal specifications define correctness independently of the AI that produced code."

### 3. The Composition Argument Is the Cross-Domain Argument

De Moura: "Passing unit tests on two components tells you nothing about whether they work together. With verified components sharing specifications, composition is guaranteed correct."

This maps directly to the meta-specification proposal's cross-domain validation. If the enterprise-services domain spec and the analytics domain spec are both independently validated, AND the cross-domain references between them are validated, then the composed system is correct by construction.

Without cross-domain validation, integration is where bugs accumulate. De Moura's observation from the verification world confirms what the meta-specification proposal argues from the architecture world: **composition requires formal interfaces.**

### 4. Lean Is the Strongest Candidate for the Formal Verification Domain

Compared to the other formal verification tools we surveyed (Kani, Dafny, TLA+, Coq, Alloy, SPIN, F*, CBMC, Frama-C), Lean stands out:

| Criterion | Lean | Dafny | TLA+ | Coq |
|-----------|------|-------|------|-----|
| **Maturity** | 200,000+ theorems in Mathlib | Moderate | Moderate | High (but older) |
| **AI adoption** | Every major AI reasoning system | Limited | Limited | Some |
| **Language + prover** | Both in one — no translation gap | Separate concerns | Design-level only | Both, but steeper learning curve |
| **Open source** | Yes | Yes | Yes | Yes |
| **Production use** | AWS Cedar, Microsoft SymCrypt | Limited | Amazon (informal) | CompCert compiler, seL4 kernel |
| **Community** | 200,000+ users, 8,000+ repos | Small | Small | Medium |
| **AI feedback quality** | Rich — goal states, hypotheses, steps | Binary pass/fail | Binary pass/fail | Moderate |
| **Ecosystem momentum** | Accelerating rapidly | Stable | Stable | Stable/declining |

Lean's advantage for SpecVerse specifically: it provides **structured feedback** to AI. It doesn't just say "proof failed" — it shows the current goal state, available hypotheses, and what changed at each step. This is exactly what SpecVerse's Generative mode → Validate → Fix loop needs. The AI can iteratively refine proof attempts because Lean tells it what's wrong and what's available to work with.

Lean is also open source and vendor-independent — unlike Wolfram Language (proprietary). This removes the licensing blocker identified in the Wolfram analysis.

### 5. The Convention Processor Gap Exists Here Too

Despite all of Lean's strengths, it has the same accessibility problem we identified across all formal verification tools. The zlib capstone theorem in human-readable form:

> "Decompressing a compressed buffer always returns original data at every compression level for the full zlib format."

In Lean, this is thousands of lines of formal proof. De Moura's solution is to have AI write the Lean — Claude translated C to Lean with "minimal human guidance." But the **specification of what to prove** is still human-readable intent.

The convention processor bridges this:

```yaml
models:
  CompressedData:
    invariants:
      - decompress(compress(data)) equals data          # roundtrip
      - compress never increases size by more than 0.1%  # bounded expansion
      - compress is deterministic                        # same input → same output
```

The formal-verification domain's convention processor would recognise these as:
- A **roundtrip invariant** (function composition equals identity)
- A **bounded output property** (output size is bounded relative to input)
- A **determinism property** (function is pure)

And generate the appropriate Lean theorem statements. The AI then constructs the proofs. The developer never writes Lean directly — they express what should be true in human-readable conventions, and the toolchain handles the formal encoding and proof construction.

### 6. The Phased Approach Parallels SpecVerse's

De Moura's roadmap:
- Phase 1: Verify existing code (translate to Lean, prove properties)
- Phase 2: Reconstruct the stack in Lean from the ground up with proofs built in

SpecVerse's roadmap:
- Phase 1: Refactor .specly as domain #1 in the meta-framework
- Phase 2: Add second domain, prove cross-domain orchestration works
- Phase 3+: Build new systems correctly with all domains integrated from the start

Both recognise you can't rebuild everything at once. Both start by proving the approach works on existing systems (SpecVerse's JobHunter analysis, Lean's zlib verification), then move to building new systems correctly from the ground up.

### 7. The "Qualitative Difference" Maps to SpecVerse's Two Modes

De Moura: "An AI that generates provably correct code is qualitatively different from one that merely generates plausible code. Verification transforms AI code generation from a productivity tool into a trust infrastructure."

This maps precisely to SpecVerse's two modes:
- **Generative mode** = AI generates plausible specifications (productivity tool)
- **Deterministic mode** = validated specifications produce verified implementation (trust infrastructure)

The gap between these two modes is exactly the gap de Moura describes. SpecVerse's closed loop — Generate → Validate → Fix → Realise → Verify — is the mechanism that bridges it. And if Lean is in the verification domain, that "Verify" step becomes mathematical proof, not just testing.

---

## What De Moura Gets Right That Wolfram Gets Wrong

The contrast between de Moura's article and Wolfram's "Foundation Tool" article is instructive:

| Dimension | Wolfram's Framing | De Moura's Framing |
|-----------|-------------------|-------------------|
| **Problem** | LLMs need computation | AI-generated code needs verification |
| **Solution** | Tool calling (MCP/API) | Formal specification + proof |
| **Persistence** | Ephemeral (conversation) | Permanent (proofs are forever) |
| **Scope** | Individual answers | Entire software infrastructure |
| **AI's role** | Calls Wolfram as a tool | Generates both code AND proofs |
| **Public good** | Proprietary | Open source, permanent |
| **Specification** | Not discussed | Central to the thesis |
| **Independence** | Tool depends on LLM calling it | Proof is independent of the AI that wrote the code |

De Moura understands that the value isn't in AI calling a tool for better answers — it's in AI producing **verified artifacts** that can be trusted, composed, and maintained. Wolfram is selling a calculator. De Moura is building trust infrastructure.

Both are valuable. Both could be SpecVerse domains. But de Moura's framing is architecturally correct in a way Wolfram's isn't.

---

## The Specification Hierarchy

Putting de Moura's article together with the meta-specification proposal, the Wolfram analysis, and the VSDD analysis, a complete hierarchy emerges:

```
Level 4: Meta-Specification Platform (SpecVerse)
         Orchestrates all domains, cross-domain validation, cross-domain inference
             │
Level 3: Domain Specification Languages
         .specly (services), OpenAPI (APIs), Terraform (infra), dbt (analytics)
             │
Level 2: Computational Specification (Wolfram / SymPy / Julia)
         Precise mathematical definitions of business rules, formulas, constraints
             │
Level 1: Formal Verification (Lean)
         Mathematical proofs that Level 2-3 specifications are satisfied by implementation
             │
Level 0: Implementation (AI-generated code)
         The actual running software — generated, not hand-written
```

Each level provides guarantees to the level above:
- **Level 0** (implementation) is generated from Level 3 specifications
- **Level 1** (Lean) proves the implementation satisfies the specifications
- **Level 2** (Wolfram/SymPy) provides mathematically precise definitions for Level 3's conventions
- **Level 3** (domain specs) captures human intent in domain-appropriate formal languages
- **Level 4** (SpecVerse) orchestrates everything and validates cross-domain consistency

Convention processors bridge each level, making the formal language of each level accessible as human-readable conventions at the level above.

---

## The Landscape of Validation

Four independent sources have now converged on the same insight:

| Source | Domain | Core Claim | SpecVerse Relevance |
|--------|--------|-----------|-------------------|
| **De Moura / Lean** | Formal verification | Specification and proof are the bottleneck, not implementation | Lean is the verification domain; proofs provide Level 1 guarantees |
| **Wolfram** | Computational precision | AI needs formal, precise computational language | WL is the computational domain; formulas provide Level 2 definitions |
| **VSDD** | Development methodology | Specs drive development; adversarial review catches gaps | The workflow/pipeline that SpecVerse domains execute within |
| **SpecVerse** | System architecture | Multiple domain-specific spec languages need orchestration | The meta-platform that connects all of the above |

None of these is building a meta-specification platform. De Moura is building the verification layer. Wolfram is building the computation layer. VSDD is defining the process. Each is a domain, not a platform.

**The platform is the missing piece. That's SpecVerse.**

---

## What This Means Concretely

### Lean as a SpecVerse Domain

```yaml
domain:
  name: "formal-verification"
  version: "1.0.0"
  description: "Mathematical proof of specification compliance"
  engine: "Lean 4"

  scope:
    primary: "Provable correctness guarantees"
    covers:
      - "Functional correctness proofs (roundtrip, idempotency, commutativity)"
      - "Security properties (constant-time, information flow)"
      - "Concurrency properties (race-freedom, deadlock-freedom)"
      - "Data invariants (conservation, bounds, uniqueness)"
      - "Protocol correctness (distributed consensus, ordering)"
    excludes:
      - "Performance benchmarks"
      - "UI/UX properties"
      - "Business process correctness (see: workflow domain)"

  conventions:
    processor: "./src/conventions/verification"
    vocabulary:
      - pattern: "decompress(compress(data)) equals data"
        expandsTo: "roundtrip-invariant"
        leanTheorem: "theorem roundtrip (d : Data) : decompress (compress d) = d"
      - pattern: "never negative"
        expandsTo: "non-negative-invariant"
        leanTheorem: "theorem non_neg (x : Field) : x ≥ 0"
      - pattern: "conserved across {operation}"
        expandsTo: "conservation-law"
        leanTheorem: "theorem conserved (pre post : State) (h : op pre = post) : measure pre = measure post"
      - pattern: "constant-time"
        expandsTo: "timing-independence"
        leanTheorem: "theorem const_time (s1 s2 : Secret) : time (f s1) = time (f s2)"

  imports:
    - domain: "enterprise-services"
      entityTypes: [model, service]
      usage: "Source the entities and operations to verify"
    - domain: "computational-logic"
      entityTypes: [formula, constraint]
      usage: "Mathematical definitions of properties to prove"

  implementation:
    mode: "ai-assisted"  # AI generates proofs, Lean kernel checks them
    engine: "Lean 4"
    proofLibrary: "Mathlib"
    aiIntegration:
      feedback: "structured"  # goal states, hypotheses, step-by-step
      iterative: true          # AI refines proofs through Lean's feedback

  repository:
    existing: "Mathlib"
    theorems: "200,000+"
    contributors: "750+"
```

### The Workflow Across Domains

For a concrete feature — "monthly loan payment calculation":

**Level 3** — Enterprise services (.specly):
```yaml
models:
  Loan:
    attributes:
      principal: Currency required
      interestRate: Decimal required
      termMonths: Integer required
      monthlyPayment: Currency computed
    invariants:
      - monthlyPayment: standard amortisation of principal at interestRate over termMonths
      - monthlyPayment never negative
      - monthlyPayment never exceeds principal
```

**Level 2** — Computational logic (convention processor → Wolfram/SymPy):
```
MonthlyPayment[p, r, n] := p * (r/12) / (1 - (1 + r/12)^(-n))
```

**Level 1** — Formal verification (convention processor → Lean):
```lean
theorem payment_non_negative (p r n : ℝ) (hp : p ≥ 0) (hr : r > 0) (hn : n > 0) :
  monthlyPayment p r n ≥ 0 := by ...

theorem payment_bounded (p r n : ℝ) (hp : p > 0) (hr : 0 < r) (hn : n ≥ 1) :
  monthlyPayment p r n ≤ p := by ...

theorem amortisation_correct (p r n : ℝ) (hp : p > 0) (hr : 0 < r) (hn : n ≥ 1) :
  totalPaid (monthlyPayment p r n) n = p + totalInterest p r n := by ...
```

**Level 0** — Implementation (AI-generated, verified against all levels above):
```typescript
function calculateMonthlyPayment(principal: number, rate: number, term: number): number {
  const monthlyRate = rate / 12;
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term));
}
```

The developer wrote three lines of human-readable invariants. The convention processors at each level expanded them into mathematical formulas, formal theorems, and implementation. The AI generated proofs that the implementation satisfies the theorems. The Lean kernel verified the proofs are correct.

At no point did the developer write Wolfram Language, Lean, or even think about formal verification. They expressed intent. The platform handled the rest.

---

## Bottom Line

De Moura's article is the strongest external validation of SpecVerse's direction encountered so far. He's arguing, from the most credible possible position in formal verification:

1. **Specification is the bottleneck**, not implementation — SpecVerse's founding thesis
2. **Formal verification must scale** with AI code generation — the verification domain
3. **Proofs are independent of implementation** — spec supremacy
4. **Composition requires formal interfaces** — cross-domain validation
5. **The tools exist** (Lean) but need accessibility and orchestration — convention processors + meta-platform
6. **Verified artifacts are permanent public goods** — the specification repository

Every one of these maps directly to a SpecVerse concept. And crucially, de Moura isn't building a meta-specification platform — he's building the verification layer that slots into one.

Lean is a domain, not a platform. Wolfram is a domain, not a platform. OpenAPI is a domain, not a platform. VSDD is a methodology, not a platform.

**The platform is the missing piece. That's SpecVerse.**

---

*Analysis produced during SpecVerse architectural review, March 2026.*
