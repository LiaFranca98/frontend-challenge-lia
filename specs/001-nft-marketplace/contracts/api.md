# API Contracts (MSW Handlers)

## Auth & User
- `POST /api/auth/login`: Authenticate user.
- `POST /api/auth/logout`: End session.
- `GET /api/auth/me`: Get current user profile.
- `PUT /api/user/profile`: Update user profile (name, avatar, passwords, wallets).

## Catalog
- `GET /api/nfts`: List NFTs with pagination, sort, and filters.
- `GET /api/nfts/:id`: Get single NFT details.

## Favorites
- `GET /api/favorites`: List user's favorite NFTs.
- `POST /api/favorites/:nftId`: Add to favorites.
- `DELETE /api/favorites/:nftId`: Remove from favorites.

## Cart & Checkout
- `GET /api/cart`: Get current user cart (or guest cart based on session/cookie).
- `POST /api/cart/items`: Add/update item in cart.
- `DELETE /api/cart/items/:nftId`: Remove item.
- `POST /api/cart/coupon`: Apply coupon and recalculate totals.
- `POST /api/orders`: Submit order (requires idempotency key in headers).
- `GET /api/orders/:id`: Get order receipt.

## Real-time Events (Socket.IO)
- `nft.updated`: Payload `{ id, priceEth, availableEditions, version }`
- `order.updated`: Payload `{ id, status, version }`
