# Data Model

## NFT
Represents a digital asset in the marketplace.
- `id` (string): Unique identifier.
- `title` (string): Name of the NFT.
- `image` (string): URL to the NFT asset.
- `priceEth` (string): Current price in ETH (stored as a string to preserve precision).
- `totalEditions` (number): Maximum number of editions.
- `availableEditions` (number): Number of editions currently available for purchase.
- `version` (number): Used for Socket.IO event ordering and staleness checks.

## Favorite
Represents a user's bookmarked NFT.
- `nftId` (string): Reference to the NFT.
- `userId` (string): Reference to the User.

## CartItem
Represents an item added to the shopping cart.
- `nftId` (string): Reference to the NFT.
- `quantity` (number): Quantity selected (must be ≤ availableEditions).

## Cart
Represents the user's current shopping session.
- `items` (CartItem[]): List of selected items.
- `couponCode` (string | null): Applied discount code.
- `subtotalEth` (string): Derived from API.
- `discountEth` (string): Derived from API.
- `feesEth` (string): Derived from API.
- `totalEth` (string): Derived from API.

## CheckoutState (UI State Machine)
Represents the strictly modeled checkout flow on the client.
- States: `idle` → `validating` (checking price/stock) → `ready` (awaiting user submit) → `submitting` (network flight) → `pending` (awaiting confirmation) → `confirmed` / `rejected`.

## User
Represents an authenticated collector.
- `id` (string): Unique identifier.
- `email` (string): Login email.
- `name` (string): Display name.
- `avatar` (string | null): Avatar URL.
- `principalWallet` (string | null): Linked primary wallet address.
- `secondaryWallet` (string | null): Linked secondary wallet address.

## Order
Represents a completed or pending purchase.
- `id` (string): Unique identifier.
- `status` (enum: 'pending', 'confirmed', 'rejected'): Current state.
- `items` (CartItem[]): Snapshot of purchased items.
- `totalEth` (string): Final charged amount.
- `createdAt` (string): ISO timestamp.
- `idempotencyKey` (string): Client-generated key for safe retries.
