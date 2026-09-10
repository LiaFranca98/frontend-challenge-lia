<!-- Sync Impact Report:
- Version change: initial → 1.0.0
- Added sections: Core Principles, Architecture & Stack Constraints, Testing & Quality Gates, Governance
- Removed sections: N/A
- Follow-up TODOs: N/A
-->
# NFT Marketplace Constitution

## Core Principles

### I. Strict Stack Adherence
The project MUST exclusively use the mandated technology stack: React, TypeScript, TanStack Router, TanStack Query, Axios, Tailwind CSS, and shadcn/ui. Alternative tools for these specific domains are strictly prohibited to ensure uniform architecture and compliance with challenge constraints.

### II. Mock-Driven Reliability
All network interactions MUST be simulated via MSW for REST APIs and `@mswjs/socket.io-binding` for Socket.IO. The application MUST handle latency, out-of-order events, network failures, session expiration, and reconnections seamlessly. Components MUST NOT contain hardcoded mock data or bypass the network layer.

### III. Inclusive and Accessible Design
The interface MUST strictly adhere to the provided Figma design while maintaining WCAG accessibility standards. This includes full keyboard navigation, visible focus management, appropriate ARIA semantics, loading skeletons (shimmer effect), and respecting "prefers-reduced-motion".

### IV. Resilient State Management
Client state MUST accurately reflect remote state with proper cache invalidation, optimistic updates (with rollback), and idempotent operations. Real-time events MUST reconcile cleanly with REST data, ignoring duplicates and stale messages without regressing the UI state.

## Architecture & Stack Constraints

- **Routing & State:** TanStack Router for route management and URL state; TanStack Query for remote state synchronization.
- **Styling:** Tailwind CSS combined with customized shadcn/ui components to match the exact visual identity.
- **Data Types:** TypeScript for strict end-to-end typing. Values in ETH must travel as decimal strings; quantities as integers.
- **Real-time:** `socket.io-client` MUST be used. Mocking must occur at the transport layer, not by stubbing the client itself.

## Testing & Quality Gates

- **E2E & Visual Regression:** Playwright MUST be used to validate all core flows, edge cases, and network failure scenarios in isolated, deterministic environments.
- **Performance:** Lighthouse audits for Mobile and Desktop MUST meet the following medians: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
- **Idempotency & Concurrency:** Tests must verify that overlapping requests, concurrent realtime events, and timeouts resolve into a consistent state.

## Governance

This constitution dictates all architectural and implementation decisions for the NFT Marketplace Challenge. All PRs and commits MUST be reviewed against these principles. Adjustments to the core stack or evaluation criteria require an amendment to this document and subsequent approval.

**Version**: 1.0.0 | **Ratified**: 2026-09-09 | **Last Amended**: 2026-09-09
