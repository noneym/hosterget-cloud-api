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
- Production-ready authentication system using Passport.js with three strategies:
  1. Local authentication (email/password with bcrypt hashing, 10 rounds)
  2. Google OAuth 2.0
  3. GitHub OAuth
- Session management using express-session with PostgreSQL store (connect-pg-simple)
- Cookie-based sessions with httpOnly, secure flags in production (7-day TTL)
- Middleware (`isAuthenticated`) protects authenticated routes
- Public `/api/auth/user` endpoint returns user or null (no 401 redirect)

**Security Features**
- SESSION_SECRET required (no fallback defaults) to prevent session forgery
- OAuth pre-hijacking prevention: Local accounts with passwords cannot be auto-linked to OAuth
- Cross-provider collision detection: Users cannot link to different OAuth providers with same email
- Google/GitHub OAuth require verified emails (no private email fallbacks)
- TLS certificate validation disabled for development (NODE_TLS_REJECT_UNAUTHORIZED='0')

**API Design**
- Authentication routes:
  - POST /api/register - Register with email/password
  - POST /api/login - Login with email/password
  - GET /api/auth/google - Initiate Google OAuth
  - GET /api/auth/google/callback - Google OAuth callback
  - GET /api/auth/github - Initiate GitHub OAuth
  - GET /api/auth/github/callback - GitHub OAuth callback
  - POST /api/logout - Logout current user
  - GET /api/auth/user - Get current authenticated user
- User management: CRUD operations for user profiles
- Subscription management: Stripe integration for checkout, webhooks, subscription lifecycle
- API key management: Generate, list, delete keys with usage tracking
- Usage analytics: Request logging and aggregation by service

**Rationale for Session-Based Auth**
- Production-ready security without dependency on Replit infrastructure
- Secure cookie storage prevents XSS attacks
- PostgreSQL session store ensures scalability and persistence
- Supports multiple authentication methods (local + OAuth) seamlessly

### Data Storage

**Database**
- PostgreSQL (via Neon serverless driver with WebSocket support)
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with Drizzle migrations

**Data Models**
- `sessions`: Session storage for authentication (required by connect-pg-simple)
- `users`: User profiles with multiple auth methods
  - id (serial primary key)
  - email (unique, not null)
  - password (nullable - for OAuth users)
  - authProvider (nullable - 'local', 'google', 'github')
  - providerId (nullable - OAuth provider user ID)
  - firstName, lastName, profileImageUrl (nullable)
- `subscriptions`: Plan details (free/pro/enterprise), Stripe integration, status tracking
- `apiKeys`: User-generated keys with usage tracking and last-used timestamps
- `usageLogs`: Request audit trail (userId, service, endpoint, statusCode, timestamp)

**Design Decisions**
- Users can authenticate via email/password or OAuth (Google/GitHub)
- Password field nullable to support OAuth-only users
- authProvider and providerId track OAuth identity for security checks
- Cascade deletes ensure referential integrity (subscriptions/keys deleted when user removed)
- Indexes on session expiry for efficient cleanup
- Usage logs enable per-service analytics and rate limiting

### External Dependencies

**Payment Processing**
- Stripe API (v2025-09-30.clover) for subscription billing
- Stripe Checkout for hosted payment pages
- Stripe webhooks for subscription lifecycle events (creation, cancellation, payment failures)
- Client-side integration via @stripe/stripe-js and @stripe/react-stripe-js

**Authentication Providers**
- Google OAuth 2.0 for social authentication
- GitHub OAuth for developer-focused authentication
- Passport.js strategies for all authentication methods

**Database**
- Neon serverless PostgreSQL with WebSocket connections (`@neondatabase/serverless`)
- TLS certificate validation disabled for development (NODE_TLS_REJECT_UNAUTHORIZED='0')
- Connection pooling for production workloads
- Environment variable: `DATABASE_URL`

**Email/Support**
- Mailto links for support (`support@hosterget.com`)
- No transactional email service currently integrated

**Development Tools**
- Replit-specific plugins: cartographer (code mapping), dev banner, runtime error overlay
- Google Fonts CDN for Inter and JetBrains Mono typography

**Environment Variables Required**
- `DATABASE_URL`: PostgreSQL connection string (required)
- `SESSION_SECRET`: Express session encryption key (required - no defaults)
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key for frontend
- `GOOGLE_CLIENT_ID`: Google OAuth client ID (optional - enables Google login)
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret (optional)
- `GOOGLE_CALLBACK_URL`: Google OAuth callback URL (optional, defaults to /api/auth/google/callback)
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID (optional - enables GitHub login)
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret (optional)
- `GITHUB_CALLBACK_URL`: GitHub OAuth callback URL (optional, defaults to /api/auth/github/callback)

**Deployment Considerations**
- Sessions stored in PostgreSQL (not in-memory) for horizontal scaling
- Static assets served from `dist/public` after Vite build
- API server and static file serving in single Express app
- Production mode disables Replit dev plugins