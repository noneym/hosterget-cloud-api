# Design Guidelines: AI Cloud API Platform

## Design Approach

**Selected Approach:** Design System (Material Design + Modern SaaS Reference)

**Justification:** This is a developer-focused SaaS platform requiring clarity, trust, and efficiency. Drawing inspiration from Stripe, Vercel, and Linear for modern API platform patterns while maintaining utility-first principles.

**Key Design Principles:**
- Developer-first clarity with immediate value communication
- Trust through clean, professional aesthetics
- Dark theme optimized for developer workflows
- Information density balanced with breathing room

## Core Design Elements

### A. Typography

**Font Families:** 
- Primary: Inter (via Google Fonts CDN) - all UI, body text, navigation
- Monospace: JetBrains Mono - code snippets, API keys, endpoints

**Type Scale:**
- Hero Headlines: text-5xl/text-6xl, font-bold (48-60px)
- Section Headers: text-3xl/text-4xl, font-semibold (30-36px)
- Card Titles: text-xl, font-semibold (20px)
- Body Text: text-base (16px)
- API Endpoints: text-sm, font-mono (14px)
- Labels/Badges: text-xs, font-medium (12px)

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 8, 12, 16, 20
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-20
- Grid gaps: gap-4, gap-6, gap-8
- Container max-widths: max-w-7xl for content sections

**Grid Structure:**
- API Service Cards: 3-column desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), single mobile
- Dashboard Stats: 4-column desktop (lg:grid-cols-4)
- Documentation Layout: 2-column split (sidebar + content)
- Pricing Tables: Multi-column comparison layout

### C. Component Library

**Navigation:**
- Fixed header with logo left, nav center, auth buttons right
- Secondary nav for API categories (dropdown mega-menu style)
- Mobile: Hamburger menu with slide-out drawer
- User dropdown (top-right) with dashboard, API keys, billing, logout

**Cards & Containers:**
- API Service Cards: Elevated with subtle border, hover lift effect (transform), status badge top-right (Live/Beta/Free), icon top-left, title, description, key metrics row, CTA button
- Dashboard Cards: Metric cards with large number, label, trend indicator, icon
- Pricing Cards: Highlighted recommended plan, feature checkmarks, usage limits, CTA button

**Data Display:**
- API Key Management Table: Columns for key name, partial key (masked), created date, last used, actions (copy, delete)
- Usage Stats: Line/bar charts showing API calls over time
- Request Logs Table: Timestamp, endpoint, status code, response time, expandable for details
- Comparison Table: Checkmarks/x marks, feature rows, service columns

**Forms & Inputs:**
- Input fields: Dark background with lighter border, focus state with accent glow
- Code input fields: Monospace font, copy button integrated
- Payment form: Stripe Elements styling to match dark theme
- Toggle switches for settings
- Dropdown selects with custom styling

**Badges & Status:**
- Service Status: Pill badges (Live=green, Beta=blue, Free=purple)
- API Response Codes: 200=green, 4xx=yellow, 5xx=red
- Plan Badges: Free tier, Pro, Enterprise with distinct styling

**Interactive Elements:**
- API Playground: Split view with request builder (left) and response viewer (right), syntax highlighted JSON
- Code Snippets: Tabbed interface (cURL, JavaScript, Python), copy button, syntax highlighting
- Collapsible Sections: For documentation navigation and FAQ

**CTAs & Buttons:**
- Primary: Solid accent background, medium weight
- Secondary: Outlined with accent border
- Danger: For delete actions (red accent)
- Icon buttons: For copy, expand, settings actions

### D. Page-Specific Layouts

**Landing Page:**
- Hero: Full-width with centered headline, subheadline, dual CTA buttons (primary + secondary), trust indicators below ("Trusted by X developers", "X API calls/month")
- API Ecosystem Grid: 6 service cards in 3-column grid, each with icon, badge, title, brief description, metrics, explore link
- Features Section: 6 feature cards in 3-column grid with icons
- Comparison Table: Full-width responsive table
- Final CTA: Centered with benefits list below

**Dashboard:**
- Top Stats Row: 4 metric cards (Total API Calls, Active Keys, Credits Remaining, Response Time)
- Main Content: 2-column layout - left has usage chart and recent activity, right has quick actions and API key summary
- Quick Links: Cards for common actions (Create API Key, View Docs, Add Credits)

**API Documentation Pages:**
- Sticky sidebar navigation (left): Expandable sections for endpoints, authentication, rate limits, examples
- Content area (right): Endpoint documentation with method badge, URL, parameters table, request/response examples, code snippets in tabs
- Top breadcrumb navigation
- Interactive "Try it" section at bottom of each endpoint

**Pricing Page:**
- Hero with pricing headline
- 3-4 pricing tiers in cards (Free, Starter, Pro, Enterprise)
- Feature comparison table below
- FAQ section (collapsible)
- Final CTA section

**API Key Management:**
- Create new key button (top-right)
- Table of existing keys
- Modal for key creation (name input, permissions checkboxes)
- Alert/toast for successful key creation showing key once

**Billing/Payment:**
- Current balance card (top)
- Add credits section with preset amounts ($12, $25, $50, $100, Custom)
- Stripe payment form
- Transaction history table

### E. Visual Treatment Specifics

**Dark Theme Implementation:**
- Base backgrounds use dark neutrals
- Cards slightly lighter than base for depth
- Borders use subtle lighter shades for definition
- Text hierarchy through opacity variations (100%, 70%, 50%)

**Iconography:**
- Use Heroicons for UI icons via CDN
- Service-specific icons: GPU (chip), Face Analysis (face scan), Identity (shield/checkmark)
- Consistent 20-24px sizing for card icons

**Code Presentation:**
- Syntax highlighting with accessible contrast
- Line numbers for multi-line examples
- Inline code uses monospace with subtle background

**Interactive States:**
- Hover: Subtle transform (scale or lift), opacity changes
- Active/Focus: Accent glow/ring around interactive elements
- Loading: Skeleton screens for async content, spinner for actions
- Success/Error: Toast notifications with icons

### F. Responsive Behavior

**Breakpoints:**
- Mobile: Single column, stacked cards, hamburger nav
- Tablet (md:): 2-column grids, simplified tables
- Desktop (lg:): Full multi-column layouts, expanded nav
- Sticky elements: Header on all sizes, sidebar nav on desktop only

**Mobile Optimizations:**
- Touch-friendly tap targets (min 44px)
- Bottom navigation for key actions
- Swipeable cards/tabs where appropriate
- Simplified tables become cards on mobile

## Images

**Hero Section:** 
Abstract technology background - neural network visualization, circuit board pattern, or gradient mesh with floating geometric shapes. Should convey AI/cloud computing aesthetics without being too literal. Image should be full-width, slightly darkened overlay to ensure text readability.

**Service Cards:**
Icon-based visual treatment rather than images - use geometric shapes or abstract representations of GPU chips, facial recognition grids, security shields.

**Dashboard:**
Charts and graphs generated from data - no decorative images needed.

**Documentation:**
Diagrams showing API flow, authentication process, request/response cycles - clean, minimal line-art style.