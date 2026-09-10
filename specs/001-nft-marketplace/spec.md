# Feature Specification: NFT Marketplace Frontend

**Feature Branch**: `nft-marketplace`

**Created**: 2026-09-09

**Status**: Draft

**Input**: User description: "Implement a complete NFT Marketplace frontend for the Jungle Gaming frontend challenge, following the requirements in README.md and the project constitution..."

## Clarifications

### Session 2026-09-09
- Q: How should overlapping NFT items be handled when merging a guest cart with an authenticated cart upon login? (FR-004) → A: Add quantities together (up to the available edition limit).
- Q: After a successful checkout, should the entire cart be cleared, or only the purchased items? (Checkout Lifecycle) → A: Remove only the successfully purchased items/quantities (preserving items that failed or were unavailable).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - NFT Discovery & Catalog (Priority: P1)

As a user, I want to browse, search, filter, sort, and paginate through the NFT catalog so that I can discover NFTs to purchase. The state of my discovery session must persist in the URL so I can share links or refresh the page without losing my place.

**Why this priority**: Discovery is the entry point for the marketplace. Without a functional catalog, users cannot find items to buy.

**Independent Test**: Can be fully tested by verifying that URL parameters update correctly upon interaction, and that reloading the page with specific URL parameters loads the corresponding catalog state using the correct REST API query parameters.

**Acceptance Scenarios**:

1. **Given** a user is viewing the catalog, **When** they apply a search term and filter, **Then** the URL updates, pagination resets to page 1, and the catalog displays the filtered results.
2. **Given** a user is viewing page 3 of the catalog, **When** they reload the page, **Then** the catalog correctly fetches and displays page 3 using the persisted URL state.
3. **Given** a user changes a filter, **When** the network request is delayed or out of order, **Then** the UI correctly handles loading states and displays the final, most recent state without race conditions.

---

### User Story 2 - Authenticated Checkout & Order Creation (Priority: P1)

As an authenticated user, I want to add NFTs to my cart, apply coupons, select my wallet/network, and finalize my order so that I can purchase NFTs. The system must use server-validated totals and handle network failures gracefully.

**Why this priority**: The checkout process is the core conversion funnel of the marketplace.

**Independent Test**: Can be fully tested by proceeding from an empty cart to a confirmed order receipt, with validation that totals are exclusively sourced from the API and idempotent retries succeed on timeout.

**Acceptance Scenarios**:

1. **Given** a user has items in their cart, **When** they apply a valid coupon, **Then** the API re-calculates the totals and the UI reflects the server-provided discount and fees.
2. **Given** a user submits an order, **When** the network connection drops before confirmation, **Then** the user can retry and the system safely recovers the same order using idempotency keys without charging them twice.
3. **Given** an item's price changes while in the cart, **When** the user attempts to check out, **Then** the system requires re-confirmation of the new price before allowing order submission.

---

### User Story 3 - Real-time Price and Availability Updates (Priority: P2)

As a user browsing the catalog or viewing my cart, I want to see real-time updates for NFT prices and availability so that I always act on accurate information.

**Why this priority**: Accuracy of pricing and availability prevents failed checkout attempts and ensures a trustworthy marketplace experience.

**Independent Test**: Can be fully tested by dispatching Socket.IO events for price/availability changes and verifying that the UI updates immediately across all active views (catalog, detail, cart) without requiring a page reload.

**Acceptance Scenarios**:

1. **Given** a user is viewing an NFT detail page, **When** a Socket.IO event indicates the price has increased, **Then** the UI updates to reflect the new price.
2. **Given** a user reconnects after a brief network drop, **When** the Socket.IO connection is re-established, **Then** the client state reconciles with the REST API to ensure no events were missed.
3. **Given** a stale or duplicate Socket.IO event arrives, **When** the client processes it, **Then** the system ignores it and does not regress the UI state to an older version.

---

### User Story 4 - User Account & Profile Management (Priority: P2)

As a user, I want to create an account, log in, manage my profile, and link wallets so that I can access authenticated features like favorites and checkout.

**Why this priority**: User identity is required for checkout, favorites, and persistent cart features.

**Independent Test**: Can be fully tested by registering a new user, updating their profile and wallet, logging out, and verifying that session data is cleared.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user with items in their guest cart, **When** they log in, **Then** their guest cart merges with their authenticated cart.
2. **Given** a user logs out, **When** they log in as a different user, **Then** all previous session data, including query caches and subscriptions, is completely cleared and isolated.

---

### Edge Cases

- What happens when a user navigates directly to a URL for an NFT that does not exist? (Must display an appropriate 404/Not Found state).
- How does the system handle an item selling out while the user is mid-checkout? (Must block the checkout and require user acknowledgment).
- How does the system handle rapid, overlapping clicks on the "Submit Order" button? (Must be disabled during flight and backed by idempotent API calls).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST persist catalog search, filters, sort, and pagination state in the URL.
- **FR-002**: System MUST reset pagination to the first page whenever filters, search, or sort parameters change.
- **FR-003**: System MUST display skeleton loaders (shimmer effect) during data fetching and gracefully handle empty, error, and out-of-order request states.
- **FR-004**: System MUST merge guest shopping cart contents with the user's persistent cart upon authentication, adding quantities for overlapping items up to the maximum available edition limit.
- **FR-005**: System MUST validate coupons against the API and derive all checkout totals (subtotal, discount, fees, total) exclusively from API responses.
- **FR-006**: System MUST explicitly require user re-validation immediately before order creation if price or availability changes.
- **FR-007**: System MUST submit orders using idempotency keys to prevent duplicate purchases during timeouts or retries.
- **FR-008**: System MUST reflect real-time updates via Socket.IO for NFT prices and availability across the catalog, detail view, and cart.
- **FR-009**: System MUST ignore duplicate or stale Socket.IO events and reconcile state with REST APIs upon reconnection.
- **FR-010**: System MUST clear all user-specific cached data and subscriptions upon logout to prevent data leaks between sessions.
- **FR-011**: System MUST preserve items in the cart on failure; after confirmation, only the successfully purchased items and quantities MUST be removed from the cart.

### Key Entities *(include if feature involves data)*

- **NFT**: Represents a digital asset, including attributes like price, total editions, available editions, and metadata.
- **Cart/Order**: Represents the user's intent to purchase, including selected NFTs, quantities, applied coupons, and calculated totals/fees.
- **User/Profile**: Represents an authenticated collector, including credentials, profile data, and linked wallets (principal and secondary).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: E2E tests execute and pass 100% of the critical user journeys (discovery, auth, cart, checkout, failures) in a deterministic MSW environment.
- **SC-002**: Lighthouse audits achieve median scores of ≥90 Performance, ≥95 Accessibility, ≥95 Best Practices, and ≥90 SEO on both Desktop and Mobile profiles.
- **SC-003**: The UI layout strictly conforms to the provided Figma design across 390px, 768px, and 1440px viewports without horizontal overflow or layout shifting during loading.
- **SC-004**: System handles simulated 500ms network latency and 20% packet loss (via MSW) without entering invalid states or presenting stale data to the user.

## Assumptions

- Users have modern browsers that support WebSockets and standard React/Tailwind features.
- All backend functionality is fully mocked via MSW and `@mswjs/socket.io-binding`; no real backend or blockchain integration is required or provided.
- The Figma design provides the complete visual language; any missing interactive states (e.g., hover, focus, disabled) will be extrapolated consistently using shadcn/ui and Tailwind.
