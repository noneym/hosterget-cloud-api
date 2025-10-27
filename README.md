# HosterGet Cloud API Platform

<div align="center">
  <h3>Enterprise-Grade Cloud APIs for Developers</h3>
  <p>GPU Acceleration • AI Face Analysis • Identity Verification</p>
</div>

---

## 🚀 Overview

HosterGet is a comprehensive SaaS platform providing developer-focused cloud APIs for GPU rental, AI-powered face analysis, and identity verification services. Built with modern web technologies and designed with DigitalOcean's minimalist aesthetic, the platform offers a seamless experience from API key management to subscription billing.

## ✨ Features

### Core Services
- **GPU Rental API** - On-demand GPU acceleration for compute-intensive tasks
- **Face Analysis API** - AI-powered facial recognition and analysis
- **Identity Verification API** - Secure identity verification and KYC services

### Platform Features
- 🔐 **Secure Authentication** - OpenID Connect (OIDC) via Replit Auth
- 💳 **Subscription Management** - Stripe-powered billing (Free, Pro $25/month, Enterprise)
- 🔑 **API Key Management** - Generate, manage, and track API keys with `hg_` prefix
- 📊 **Usage Analytics** - Real-time request tracking and usage statistics
- 📚 **Comprehensive Documentation** - Interactive API documentation
- 🎨 **Dark Mode Support** - System-aware theme with manual toggle
- 📱 **Responsive Design** - Mobile-first, fully responsive UI

## 🛠️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** - Fast build tool and dev server
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **shadcn/ui** - Accessible component library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Backend
- **Express.js** - Node.js web framework
- **PostgreSQL** - Production database (Neon serverless)
- **Drizzle ORM** - Type-safe database queries
- **Passport.js** - Authentication middleware
- **Stripe API** - Payment processing

### Authentication & Security
- **OpenID Connect (OIDC)** - via Replit Auth
- **Session-based auth** - Secure cookie storage
- **PostgreSQL session store** - Scalable session management

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payment processing)
- Replit Auth OIDC provider (or custom OIDC provider)

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Database
```bash
DATABASE_URL=postgresql://user:password@host:port/database
PGHOST=your-postgres-host
PGPORT=5432
PGUSER=your-postgres-user
PGPASSWORD=your-postgres-password
PGDATABASE=your-database-name
```

### Authentication
```bash
SESSION_SECRET=your-session-secret-key-min-32-chars
ISSUER_URL=https://replit.com/oidc  # Optional, defaults to Replit OIDC
```

### Stripe Payment Processing
```bash
# Get these from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key

# Get from https://dashboard.stripe.com/webhooks
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Test keys (automatically used in testing environment)
TESTING_STRIPE_SECRET_KEY=sk_test_your_test_key
TESTING_VITE_STRIPE_PUBLIC_KEY=pk_test_your_test_key
```

### Deployment
```bash
PORT=5000  # Default port, auto-set by hosting provider
REPL_ID=your-repl-id  # Replit environment identifier
REPLIT_DOMAINS=your-domain.replit.app  # For OIDC redirect URLs
NODE_ENV=production  # Set to 'production' for deployment
```

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/noneym/hosterget-cloud-api.git
cd hosterget-cloud-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Copy the environment variables from the section above and create a `.env` file.

### 4. Initialize Database
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗️ Project Structure

```
hosterget-cloud-api/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Route components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and helpers
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route handlers
│   ├── storage.ts        # Database abstraction layer
│   └── auth.ts           # Authentication logic
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle database schema
├── attached_assets/      # Static assets (images, videos)
└── design_guidelines.md  # UI/UX design system
```

## 🎯 API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `GET /api/auth/login` - Initiate OIDC login
- `GET /api/auth/callback` - OIDC callback handler
- `POST /api/auth/logout` - End user session

### API Keys
- `GET /api/keys` - List user's API keys
- `POST /api/keys` - Generate new API key
- `DELETE /api/keys/:id` - Delete API key

### Subscriptions
- `GET /api/subscription` - Get user's subscription
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/webhook` - Stripe webhook handler

### Cloud Services (Protected by API Key)
- `POST /api/services/gpu` - GPU rental service
- `POST /api/services/face-analysis` - Face analysis service
- `POST /api/services/identity-verification` - Identity verification

### Usage Analytics
- `GET /api/usage/stats` - Get usage statistics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates:
- `dist/public/` - Frontend static files
- `dist/index.js` - Backend server bundle

### Start Production Server
```bash
npm start
```

### Deployment Checklist
- ✅ Set `NODE_ENV=production`
- ✅ Configure all environment variables
- ✅ Set up PostgreSQL database
- ✅ Configure Stripe webhook endpoint
- ✅ Set OIDC redirect URLs
- ✅ Run database migrations (`npm run db:push`)

### Replit Deployment
This project is optimized for Replit deployment:
1. Connect your Replit account
2. Import from GitHub
3. Configure Secrets (environment variables)
4. Run `npm run build`
5. Use "Deploy" button to publish

## 💳 Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0/month | Unlimited requests (testing) |
| **Pro** | $25/month | 10,000 requests/month, All APIs |
| **Enterprise** | Custom | Unlimited requests, Dedicated support |

Minimum payment amount: $12 USD

## 🔑 API Key Format

API keys follow the format: `hg_` + 64 hexadecimal characters

Example: `hg_a1b2c3d4e5f6...` (68 chars total)

## 📖 Documentation

Visit `/docs` in the application for:
- Interactive API reference
- Authentication guides
- Code examples (cURL, JavaScript, Python)
- Rate limiting information
- Error handling

## 🧪 Testing

Run the development server with hot reload:
```bash
npm run dev
```

Check TypeScript types:
```bash
npm run check
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: Available at `/docs`
- **Support**: support@hosterget.com

## 🙏 Acknowledgments

- Design inspired by DigitalOcean's minimalist aesthetic
- Built with [Replit](https://replit.com)
- Powered by [Stripe](https://stripe.com) for payments
- UI components from [shadcn/ui](https://ui.shadcn.com)

---

<div align="center">
  <p>Built with ❤️ by the HosterGet Team</p>
  <p>
    <a href="https://github.com/noneym/hosterget-cloud-api">GitHub</a> •
    <a href="https://github.com/noneym/hosterget-cloud-api/issues">Issues</a>
  </p>
</div>
