# Implementation Plan: NFT Marketplace Frontend

**Branch**: `001-nft-marketplace` | **Date**: 2026-09-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-nft-marketplace/spec.md`

## Summary

Implement a full NFT Marketplace frontend strictly adhering to the mandated stack (React, TypeScript, TanStack Router/Query, Tailwind CSS). The application enforces clear separation of concerns (URL state vs Server state), robust realtime handling via Socket.IO, and idempotent checkout modeled as a finite state machine. All backend interactions are mocked deterministically with MSW.

## Technical Context

**Language/Version**: TypeScript (ES2022+)

**Primary Dependencies**: React 18, TanStack Router, TanStack Query, Axios, Socket.IO Client, Tailwind CSS, shadcn/ui, MSW, Playwright. (Zustand/Redux are strictly excluded).

**Storage**: In-memory (Shared mutable state in MSW); LocalStorage for guest cart persistence and idempotency keys.

**Testing**: Playwright (E2E) covering real critical flows (e.g. checkout failures, Socket.IO updates mid-flight, concurrent edits).

**Target Platform**: Web (Desktop: 1440px, Tablet: 768px, Mobile: 390px).

**Performance Goals**: Lighthouse medians: Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 90.

**Constraints**: Strict UI fidelity to Figma; resilient state (idempotent retries, Socket.IO stale/duplicate rejection, REST reconciliation on reconnect); cache isolation between users.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Stack Adherence**: Only permitted libraries. No external state managers.
- [x] **Mock-Driven Reliability**: Shared mutable state in MSW covering latency, 5xx, and out-of-order events.
- [x] **Inclusive and Accessible Design**: WCAG, skeletons, 390/768/1440 breakpoints.
- [x] **Resilient State Management**: TanStack Query handles server state. Cache is explicitly cleared on logout. Checkout relies on strict state machines.

## Project Structure

### Documentation (this feature)

```text
specs/001-nft-marketplace/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── api/             # Axios client, REST endpoints, Socket.IO setup (Infrastructure layer)
├── domain/          # Business logic, constants, state machine definitions, types
├── hooks/           # TanStack Query hooks (Server State layer)
├── components/      # Reusable UI components (shadcn/ui, layout)
├── features/        # Feature modules: Catalog, Cart, Checkout, Profile, Favorites
├── routes/          # TanStack Router definitions (URL State layer)
├── mocks/           # MSW handlers, Socket.IO bindings, shared mutable in-memory DB
└── utils/           # Formatters (e.g., precise ETH formatting), helpers

tests/
├── e2e/             # Playwright tests for critical user journeys
└── setup/           # Test environment setup
```

**Structure Decision**: 
The architecture enforces strict separation of concerns:
1. **URL State**: Managed exclusively by TanStack Router (search, filters, pagination).
2. **Server State**: Managed exclusively by TanStack Query (caching, invalidation, user isolation).
3. **UI/Local State**: Managed by standard React `useState`/`useReducer`. Checkout is modeled explicitly as a state machine (`idle → validating → ready → submitting → pending → confirmed/rejected`).
4. **Domain**: Pure business rules and data transformations, separated from UI.
5. **Infrastructure**: Axios instances and Socket.IO connection logic.
6. **Mocks**: A stateful MSW layer that provides deterministic responses for edge cases (timeouts, 500s).

## Complexity Tracking

*No constitution violations. Kept intentionally simple and domain-oriented to avoid overengineering, relying heavily on standard TanStack capabilities rather than custom abstractions.*
