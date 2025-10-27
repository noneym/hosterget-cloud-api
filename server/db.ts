import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Disable TLS certificate validation for development (allows self-signed certs)
// WARNING: Only use in development/testing environments
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Configure Neon WebSocket with custom ws library
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create pool for database connection
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
