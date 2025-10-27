# Multi-stage build for HosterGet Cloud API Platform
# Stage 1: Build frontend and backend
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build arguments (these are passed from docker build command)
ARG VITE_STRIPE_PUBLIC_KEY

# Set environment variables for build process
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY
# DO NOT set NODE_ENV=production here - we need devDependencies (vite) for building!

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build frontend (Vite) and backend (esbuild)
# This creates dist/public/ for frontend and dist/index.js for backend
# Set NODE_ENV=production only during build (not during npm ci)
# Mark vite and nanoid as external to avoid bundling them into dist/index.js
RUN NODE_ENV=production npx vite build && \
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

# Copy package files (for reference only)
COPY package*.json ./

# Copy ALL node_modules from builder stage
# This includes vite, nanoid, and all their dependencies (needed by server/vite.ts)
# The esbuild bundle marks these as external, so they must be available at runtime
COPY --from=builder /app/node_modules ./node_modules

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
