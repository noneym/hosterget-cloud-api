import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Disable TLS certificate validation for development (allows self-signed certs)
// WARNING: Only use in development/testing environments
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create standard PostgreSQL connection pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: false // Disable SSL since we're using self-signed certs
});

export const db = drizzle(pool, { schema });
