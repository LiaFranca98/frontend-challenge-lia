# Implementation Tasks: NFT Marketplace Frontend

## Phase 1: Setup (Shared Infrastructure)
**Purpose**: Project initialization and basic structure

- [x] T001 Initialize React project with TypeScript and Vite
- [x] T002 [P] Install core dependencies: TanStack Router, TanStack Query, Axios, Socket.IO Client, Tailwind CSS
- [x] T003 [P] Configure Tailwind CSS and shadcn/ui foundation
- [x] T004 [P] Configure MSW and Playwright testing environment
- [x] T005 Create project structure per implementation plan (api, domain, hooks, components, features, routes, mocks)

---

## Phase 2: Foundational (Blocking Prerequisites)
**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Setup MSW in-memory database and base mock handlers in `src/mocks/`
- [x] T007 Configure TanStack Query Client (`src/api/queryClient.ts`) with cache isolation rules
- [x] T008 Setup TanStack Router configuration (`src/routes/router.ts`)
- [x] T009 [P] Create base layout and navigation shell (`src/components/Layout.tsx`)
- [x] T010 [P] Define core domain types (`src/domain/types.ts`) mapping to data-model.md, ensuring `priceEth` and `totalEth` are strings to preserve precision.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - NFT Discovery & Catalog (Priority: P1) 🎯 MVP
**Goal**: Browse, search, filter, sort, and paginate through the NFT catalog with URL state persistence.
**Independent Test**: URL parameters update correctly upon interaction, and reloading loads the state from URL.

### Implementation for User Story 1
- [ ] T011 [P] [US1] Implement MSW handler for `GET /api/nfts` supporting pagination and filters in `src/mocks/handlers/catalog.ts`
- [ ] T012 [P] [US1] Create TanStack Query hook `useCatalog` in `src/hooks/useCatalog.ts`
- [ ] T013 [P] [US1] Implement Catalog route component with TanStack Router URL sync in `src/routes/catalog.tsx`
- [ ] T014 [US1] Build NFT Card component and Skeleton loader in `src/features/catalog/NFTCard.tsx`
- [ ] T015 [US1] Build Filters and Pagination UI in `src/features/catalog/CatalogFilters.tsx`
- [ ] T016 [US1] Implement NFT Detail route and UI in `src/routes/nft.tsx` and `src/features/catalog/NFTDetail.tsx`, ensuring explicit coverage for: 404/Not Found, loading/error states, edition availability, quantity limit selection, add to cart action, and realtime price/stock sync capability.
- [ ] T017 [US1] Implement E2E test for MVP vertical slice (Catalog → Detail → Add to Guest Cart) in `tests/e2e/catalog.spec.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 4 - User Account & Profile Management (Priority: P2)
**Goal**: Create account, log in, manage profile, and link wallets to enable authenticated features.
**Independent Test**: Register, update profile/wallet, log out, and verify session data is cleared.

### Implementation for User Story 4
- [ ] T018 [P] [US4] Implement MSW handlers for Auth (Login & Signup) and User Profile in `src/mocks/handlers/auth.ts`
- [ ] T019 [P] [US4] Implement MSW handlers for Favorites (`GET/POST/DELETE /api/favorites`) in `src/mocks/handlers/favorites.ts`
- [ ] T020 [P] [US4] Create TanStack Query hooks for `useAuth` and `useProfile` in `src/hooks/useAuth.ts`
- [ ] T021 [P] [US4] Implement Login and Signup UI and routes in `src/routes/login.tsx` and `src/routes/signup.tsx`
- [ ] T022 [US4] Implement Profile view and Wallet management in `src/routes/profile.tsx`
- [ ] T023 [US4] Implement global logout logic to explicitly call `queryClient.clear()` in `src/api/queryClient.ts`
- [ ] T024 [US4] Implement Favorites UI and hooks in `src/features/favorites/Favorites.tsx` and `src/hooks/useFavorites.ts`

**Checkpoint**: User authentication, signup, favorites, and session isolation are working.

---

## Phase 5: User Story 2 - Authenticated Checkout & Order Creation (Priority: P1)
**Goal**: Add NFTs to cart, apply coupons, select wallet/network, and finalize order with server-validated totals.
**Independent Test**: Proceed from empty cart to confirmed order receipt, handling failures, timeouts, and state transitions.

### Implementation for User Story 2
- [ ] T025 [P] [US2] Implement MSW handlers for Cart and Orders in `src/mocks/handlers/checkout.ts`, validating quantity ≤ availableEditions, handling session expiration (401), invalid coupons (400), and simulating timeouts/5xx errors.
- [ ] T026 [P] [US2] Define CheckoutState state machine (`idle → validating → ready → submitting → pending → confirmed/rejected`) in `src/domain/checkoutMachine.ts`
- [ ] T027 [P] [US2] Create TanStack Query hooks for Cart and Orders in `src/hooks/useCart.ts`
- [ ] T028 [US2] Implement Cart UI (drawer or page) in `src/features/cart/CartView.tsx`
- [ ] T029 [US2] Implement guest cart merging logic upon successful login in `src/features/cart/cartLogic.ts` (Cart domain takes responsibility, not Auth).
- [ ] T030 [US2] Implement Checkout flow UI handling all states from `CheckoutState` in `src/features/checkout/CheckoutFlow.tsx`, explicitly rendering pending, confirmed, and rejected states, and handling price/stock changes during checkout.
- [ ] T031 [US2] Add client-generated `idempotencyKey` to Order submission in `src/hooks/useCheckout.ts` to allow safe retries after timeouts or 5xx errors.
- [ ] T032 [US2] Implement cart failure logic in `src/mocks/handlers/checkout.ts` and UI so cart only removes successfully purchased items on confirmation, preserving failed items.

**Checkpoint**: Cart and Checkout flows fully functional and resilient to network/state errors.

---

## Phase 6: User Story 3 - Real-time Price and Availability Updates (Priority: P2)
**Goal**: Receive real-time updates for NFT prices and availability across catalog and cart.
**Independent Test**: Scenario: v5 → apply; v5 duplicate → ignore; v4 → ignore; v6 → apply; disconnect → reconnect → REST reconciliation.

### Implementation for User Story 3
- [ ] T033 [P] [US3] Setup MSW Socket.IO bindings and mock event dispatcher in `src/mocks/socket.ts`
- [ ] T034 [P] [US3] Implement Socket.IO client connection manager in `src/api/socket.ts` handling explicit states: connecting, connected, disconnected, reconnecting. Prevent duplicate subscriptions on reconnect.
- [ ] T035 [US3] Create `useRealtimeSync` hook to listen to events and update TanStack Query cache in `src/hooks/useRealtimeSync.ts`
- [ ] T036 [US3] Implement logic in `src/domain/eventValidation.ts` to explicitly reject stale events (version < current), ignore duplicate events, and handle out-of-order events using versioning. Verify scenario: v5(apply) → v5(ignore) → v4(ignore) → v6(apply).
- [ ] T037 [US3] Implement REST reconciliation (invalidate queries) on Socket.IO `reconnect` event in `src/api/socket.ts`
- [ ] T038 [US3] Add checkout interrupt logic to transition back to `validating` on price/stock change during checkout in `src/features/checkout/CheckoutFlow.tsx`

**Checkpoint**: Realtime sync is robust, deterministic, and handles network drops perfectly.

---

## Phase 7: Polish & E2E
**Purpose**: Improvements that affect multiple user stories

- [ ] T039 [P] Setup Playwright tests for Authenticated Checkout (including timeouts, idempotency retries, and session expiration) in `tests/e2e/checkout.spec.ts`
- [ ] T040 Setup Playwright tests for Socket.IO interrupts and reconciliation during checkout in `tests/e2e/realtime.spec.ts`
- [ ] T041 Review and verify Lighthouse audits explicitly ensuring Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
- [ ] T042 Conduct visual QA and responsive verification comparing against Figma for exact fidelity across 390px, 768px, and 1440px viewports.
- [ ] T043 Verify full keyboard navigation and screen reader semantics (A11y) across the application.

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **US1 & US4 (Phases 3 & 4)**: Can start after Foundational
- **US2 (Phase 5)**: Depends on US4 for auth and US1 for catalog logic
- **US3 (Phase 6)**: Depends on all prior phases for full realtime sync
- **Polish (Final Phase)**: Depends on all desired user stories being complete
