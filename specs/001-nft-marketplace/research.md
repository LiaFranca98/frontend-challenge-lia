# Research & Decisions

## Routing & State Management
- **Decision**: TanStack Router (URL state) + TanStack Query (Server state). No external state managers like Zustand.
- **Rationale**: Strict adherence to the constitution. URL state (search, filters, pagination) lives entirely in TanStack Router. Server state (cart, user, nfts) lives in TanStack Query. Local UI state uses standard React state/Context.
- **Cache Isolation**: Query keys will incorporate the user ID (or session status) to guarantee isolation. Upon logout, `queryClient.clear()` will be invoked to purge all cached data and prevent cross-session leaks.

## Real-time Integration (Socket.IO)
- **Decision**: `socket.io-client` with Socket.IO event versioning.
- **Robustness Strategy**: 
  - **Versioning**: Every event includes a `version` or timestamp. The client drops events older than the current cache version to prevent stale updates.
  - **Idempotency**: Duplicate events are ignored based on event ID or version parity.
  - **Reconciliation**: On Socket.IO `reconnect`, TanStack Query will explicitly invalidate and refetch active queries (catalog, cart) via REST to ensure no events were missed during the disconnect.
  - **Checkout Interrupts**: If a price/availability change arrives via Socket.IO during checkout, the checkout state machine transitions back from `ready` to `validating`, requiring user re-confirmation.

## Network Mocking (MSW & Socket.IO)
- **Decision**: MSW v2 for REST + `@mswjs/socket.io-binding` (or MSW v2 `ws` API) for WebSocket/Socket.IO interception.
- **Shared Mutable State**: MSW will maintain an in-memory database (using a simple object or `@mswjs/data`) to ensure state consistency across REST and Socket.IO.
- **Deterministic Scenarios**: We will implement specific MSW scenarios/handlers for:
  - 4xx (Validation errors, Unauthorized)
  - 5xx & Latency/Timeout (to test idempotency and retries)
  - Stock out / Price change during checkout
  - Session expiration midway through a flow
- **Technical Validation**: MSW v2's WebSocket interceptor provides low-level WS interception. Since Socket.IO uses HTTP polling before WS upgrade, we will either intercept the Socket.IO polling requests directly or use `@mswjs/socket.io-binding` if compatible with the MSW v2 setup. The exact transport will be documented in `ARCHITECTURE.md` post-implementation.

## UI & Styling
- **Decision**: Tailwind CSS + shadcn/ui.
- **Fidelity & Responsive**: Strict adherence to Figma at 390px, 768px, and 1440px breakpoints.
- **Accessibility**: Full keyboard navigation, ARIA semantics, and shimmer skeletons.
- **Simplicity**: No overengineering; we will stick to standard shadcn/ui patterns.
