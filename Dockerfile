# Multi-stage build for HosterGet Cloud API Platform
# Stage 1: Build frontend and backend
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build arguments (these are passed from docker build command)
ARG VITE_STRIPE_PUBLIC_KEY
ARG NODE_ENV=production

# Set environment variables for build process
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY
ENV NODE_ENV=$NODE_ENV

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build frontend (Vite) and backend (esbuild)
# This creates dist/public/ for frontend and dist/index.js for backend
# Mark vite and nanoid as external to avoid bundling them into dist/index.js
RUN npx vite build && \
    npx esbuild server/index.ts \
    --platform=node \
    --packages=external \
    --external:vite \
    --external:nanoid \
    --bundle \
    --format=esm \
    --outdir=dist

# Stage 2: Production image
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Set default production environment
ENV NODE_ENV=production
ENV PORT=5000

# Runtime secrets should be passed via docker run -e or --env-file
# NOT as build arguments for security reasons
# The following will be available at runtime:
# - DATABASE_URL
# - SESSION_SECRET
# - STRIPE_SECRET_KEY
# - STRIPE_WEBHOOK_SECRET
# - VITE_STRIPE_PUBLIC_KEY (for frontend)

# Install all dependencies (including dev) to ensure vite/nanoid are available
# The esbuild bundle marks these as external, so they're needed at runtime
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Copy shared schema (needed by backend at runtime)
COPY shared ./shared

# Copy Drizzle config (for potential runtime migrations)
COPY drizzle.config.ts ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (default 5000)
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/auth/user', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/index.js"]
