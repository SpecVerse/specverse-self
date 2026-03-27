# L3 Behavior Generation Plan

## Problem

The realize engine generates method CALLS from behavior steps but not the method IMPLEMENTATIONS. Given:

```yaml
steps:
  - "Validate payment details"
  - "Charge payment provider"
  - "Record transaction"
```

We generate `await this.chargePaymentProvider(...)` but `chargePaymentProvider` doesn't exist.

## Design: Three-Layer Step Resolution

Steps are resolved in priority order:

### Layer 1: Convention-Expanded Steps (immediate)

Extend `matchStepPattern` in `behavior-generator.ts` with common patterns that map to real code:

| Pattern | Example step | Generated code |
|---------|-------------|----------------|
| `Validate {target}` | "Validate payment details" | Validation call with error throwing |
| `Update {model} {field} to {value}` | "Update order status to paid" | `prisma.{model}.update({ data: { {field}: {value} } })` |
| `Create {model}` | "Create transaction record" | `prisma.{model}.create({ data: params })` |
| `Find {model} by {field}` | "Find order by id" | `prisma.{model}.findUnique({ where: { {field} } })` |
| `Delete {model}` | "Delete draft order" | `prisma.{model}.delete({ where: { id } })` |
| `Calculate {metric}` | "Calculate total from line items" | Sum/aggregate with inline logic |
| `Check {condition}` | "Check sufficient stock" | Guard check with error |
| `Send {event} event` | "Send PaymentProcessed event" | `this.emit('{event}', context)` |
| `Send {type} notification` | "Send email notification" | `this.events.emit('{type}Notification', context)` |
| `Call {service}.{operation}` | "Call InventoryService.reserve" | Service method call |
| `Set {field} to {value}` | "Set paidAt to current time" | Field assignment |
| `Increment {field} by {amount}` | "Increment stock by quantity" | Prisma increment |
| `Decrement {field} by {amount}` | "Decrement stock by quantity" | Prisma decrement with guard |
| `Transition {model} to {state}` | "Transition order to shipped" | Lifecycle evolve with validation |
| `Return {value}` | "Return updated order" | Return statement |

Convention patterns are defined in a data structure, not hardcoded if/else chains. New patterns added by extending the array.

### Layer 2: Quint Action Transpilation (next phase)

When a behavior has a corresponding Quint action in the entity module's `behaviour/rules.qnt`, the transpiler generates the full method body:

```quint
action processPayment(order, amount) = all {
  order.status == "confirmed",        // → precondition guard
  amount == order.total,              // → precondition guard
  order' = { ...order, status: "paid" }, // → prisma update
  emit(PaymentProcessed, { orderId: order.id }) // → event emission
}
```

Transpiles to:

```typescript
async processPayment(orderId: string, amount: number): Promise<Order> {
  const order = await this.prisma.order.findUniqueOrThrow({ where: { id: orderId } });
  if (order.status !== "confirmed") throw new Error("Order must be confirmed");
  if (amount !== order.total) throw new Error("Amount must match total");
  const result = await this.prisma.order.update({
    where: { id: orderId },
    data: { status: "paid" }
  });
  this.emit("PaymentProcessed", { orderId: result.id });
  return result;
}
```

This extends the existing Quint transpiler (which handles invariants) to also handle actions.

### Layer 3: Stub Generation (fallback)

Steps that match no convention pattern and have no Quint action generate a clearly-marked stub:

```typescript
// Step 3: Charge payment provider
// TODO: Implement — no convention pattern matched, no Quint action found
async chargePaymentProvider(paymentMethod: string, amount: number): Promise<void> {
  throw new Error('Not implemented: chargePaymentProvider');
}
```

The stub is a real method (code compiles), throws at runtime (fails fast), and has a clear TODO.

## Implementation

### Phase 1: Convention-Expanded Steps

**File**: `specverse-engines/packages/realize/libs/instance-factories/services/templates/prisma/behavior-generator.ts`

Changes:
1. Replace the hardcoded `matchStepPattern` if/else chain with a data-driven pattern matcher
2. Add 15 common step patterns (table above)
3. Generate actual helper methods for each matched pattern (not just the call site)
4. Each pattern produces both the call AND the method definition

**New file**: `specverse-engines/packages/realize/libs/instance-factories/services/templates/prisma/step-conventions.ts`

Contains the pattern definitions as a typed array:

```typescript
interface StepConvention {
  pattern: RegExp;
  description: string;
  generateCall: (match: RegExpMatchArray, context: BehaviorContext) => string;
  generateMethod: (match: RegExpMatchArray, context: BehaviorContext) => string;
}

export const STEP_CONVENTIONS: StepConvention[] = [
  // ... 15 patterns
];
```

**File**: `specverse-engines/packages/realize/libs/instance-factories/services/templates/prisma/controller-generator.ts`

Changes:
- Import step conventions
- When generating a service class, collect all step methods needed and append them to the class body

### Phase 2: Quint Action Transpilation

**File**: `specverse-engines/packages/inference/src/quint-transpiler.ts`

Changes:
- Extend to handle `action` definitions (currently only handles `val` invariants and `pure def` functions)
- Generate async methods from Quint actions with `all { }` guard-effect blocks
- Map Quint state updates (`order' = ...`) to Prisma update calls
- Map Quint `emit()` to event emission

### Phase 3: Wire Into Realize Pipeline

**File**: `specverse-engines/packages/realize/libs/instance-factories/services/templates/prisma/service-generator.ts`

Changes:
- For each behavior operation: try Quint transpilation first, then convention matching, then stub
- Collect all generated helper methods and append to class body
- Track which patterns were used vs stubbed for build output summary

## Verification

1. `npm run build` in specverse-engines — all packages compile
2. Re-realize specverse-self — generated services should have real method bodies, not just calls
3. The generated code should compile without errors (no calls to undefined methods)
4. Run the generated app — behaviors with convention-matched steps should work end-to-end
5. Behaviors with stubs should throw "Not implemented" at runtime (fail fast, not silently)
