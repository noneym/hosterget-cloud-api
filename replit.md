# HosterGet Cloud API Platform

## Overview

HosterGet is a developer-focused SaaS platform providing enterprise-grade cloud APIs for GPU acceleration, AI-powered face analysis, and identity verification services. The platform offers a tiered subscription model (Free, Pro, Enterprise) with usage-based pricing and comprehensive API documentation. Built with a modern tech stack emphasizing developer experience, the application features a marketing website for unauthenticated users and a full-featured dashboard for authenticated users to manage API keys, monitor usage, and handle subscriptions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite for fast development builds and optimized production bundles
- Wouter for lightweight client-side routing
- React Query (TanStack Query) for server state management and API caching

**UI Component System**
- shadcn/ui component library with Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom CSS variables for theming (light/dark mode support via ThemeProvider)
- Design system based on Material Design principles with modern SaaS aesthetics (inspired by Stripe, Vercel, Linear)

**Design Decisions**
- Dark theme optimized for developer workflows with light mode support
- Typography: Inter for UI/body text, JetBrains Mono for code snippets
- Responsive grid layouts: 3-column desktop → 2-column tablet → single mobile
- Information density balanced with breathing room using consistent spacing primitives (Tailwind units)

**State Management**
- React Query for asynchronous state and API data fetching
- Local component state with React hooks
- Session-based authentication state retrieved from backend
- Custom `useAuth` hook abstracts authentication logic

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- RESTful API design with `/api/*` prefix for all endpoints
- Session-based middleware for request logging and performance monitoring

**Authentication & Authorization**
- OpenID Connect (OIDC) integration via Replit Auth (Passport.js strategy)
- Session management using express-session with PostgreSQL store
- Cookie-based sessions with httpOnly, secure flags (7-day TTL)
- Middleware (`isAuthenticated`) protects authenticated routes
- Public `/api/auth/user` endpoint returns user or null (no 401 redirect)

**API Design**
- User management: CRUD operations for user profiles
- Subscription management: Stripe integration for checkout, webhooks, subscription lifecycle
- API key management: Generate, list, delete keys with usage tracking
- Usage analytics: Request logging and aggregation by service

**Rationale for Session-Based Auth**
- Simplifies integration with Replit's OIDC provider
- Secure cookie storage prevents XSS attacks
- PostgreSQL session store ensures scalability and persistence
- Avoids JWT complexity for server-rendered authentication flows

### Data Storage

**Database**
- PostgreSQL (via Neon serverless driver with WebSocket support)
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with Drizzle migrations

**Data Models**
- `sessions`: Session storage for authentication (required by connect-pg-simple)
- `users`: OIDC user profiles (id, email, firstName, lastName, profileImageUrl)
- `subscriptions`: Plan details (free/pro/enterprise), Stripe integration, status tracking
- `apiKeys`: User-generated keys with usage tracking and last-used timestamps
- `usageLogs`: Request audit trail (userId, service, endpoint, statusCode, timestamp)

**Design Decisions**
- User IDs from OIDC provider used as primary keys (no separate username/password)
- Cascade deletes ensure referential integrity (subscriptions/keys deleted when user removed)
- Indexes on session expiry for efficient cleanup
- Usage logs enable per-service analytics and rate limiting

### External Dependencies

**Payment Processing**
- Stripe API (v2025-09-30.clover) for subscription billing
- Stripe Checkout for hosted payment pages
- Stripe webhooks for subscription lifecycle events (creation, cancellation, payment failures)
- Client-side integration via @stripe/stripe-js and @stripe/react-stripe-js

**Authentication Provider**
- Replit OIDC (OpenID Connect) for user authentication
- Discovery endpoint: `https://replit.com/oidc` (configurable via ISSUER_URL)
- Supports standard OAuth 2.0 flows with token refresh

**Database**
- Neon serverless PostgreSQL with WebSocket connections (`@neondatabase/serverless`)
- Connection pooling for production workloads
- Environment variable: `DATABASE_URL`

**Email/Support**
- Mailto links for support (`support@hosterget.com`)
- No transactional email service currently integrated

**Development Tools**
- Replit-specific plugins: cartographer (code mapping), dev banner, runtime error overlay
- Google Fonts CDN for Inter and JetBrains Mono typography

**Environment Variables Required**
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `SESSION_SECRET`: Express session encryption key
- `REPLIT_DOMAINS`: Allowed domains for OIDC redirect
- `ISSUER_URL` (optional): Custom OIDC provider URL
- `REPL_ID`: Replit environment identifier

**Deployment Considerations**
- Sessions stored in PostgreSQL (not in-memory) for horizontal scaling
- Static assets served from `dist/public` after Vite build
- API server and static file serving in single Express app
- Production mode disables Replit dev plugins