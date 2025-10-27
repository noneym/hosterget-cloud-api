import { 
  type User, 
  type InsertUser,
  type UpsertUser,
  type Subscription,
  type InsertSubscription,
  type ApiKey,
  type InsertApiKey,
  type UsageLog,
  type InsertUsageLog,
  users,
  subscriptions,
  apiKeys,
  usageLogs,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, sql } from "drizzle-orm";
import { randomBytes } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;

  // Subscription methods
  getSubscription(userId: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;

  // API Key methods
  getApiKeys(userId: string): Promise<ApiKey[]>;
  getApiKey(key: string): Promise<ApiKey | undefined>;
  createApiKey(apiKey: Omit<InsertApiKey, 'key'>): Promise<ApiKey>;
  deleteApiKey(id: string): Promise<void>;
  updateApiKeyUsage(key: string): Promise<void>;

  // Usage log methods
  createUsageLog(log: InsertUsageLog): Promise<UsageLog>;
  getUserUsageLogs(userId: string, limit?: number): Promise<UsageLog[]>;
  getUserUsageStats(userId: string, days?: number): Promise<{
    totalRequests: number;
    requestsByService: Record<string, number>;
  }>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(user).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Subscription methods
  async getSubscription(userId: string): Promise<Subscription | undefined> {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1);
    return result[0];
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const result = await db.insert(subscriptions).values(subscription).returning();
    return result[0];
  }

  async updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const result = await db.update(subscriptions)
      .set({ ...subscription, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    return result[0];
  }

  // API Key methods
  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return db.select().from(apiKeys).where(eq(apiKeys.userId, userId)).orderBy(desc(apiKeys.createdAt));
  }

  async getApiKey(key: string): Promise<ApiKey | undefined> {
    const result = await db.select().from(apiKeys).where(eq(apiKeys.key, key)).limit(1);
    return result[0];
  }

  async createApiKey(apiKey: Omit<InsertApiKey, 'key'>): Promise<ApiKey> {
    // Generate a secure API key
    const key = `hg_${randomBytes(32).toString('hex')}`;
    const result = await db.insert(apiKeys).values({ ...apiKey, key }).returning();
    return result[0];
  }

  async deleteApiKey(id: string): Promise<void> {
    await db.delete(apiKeys).where(eq(apiKeys.id, id));
  }

  async updateApiKeyUsage(key: string): Promise<void> {
    await db.update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.key, key));
  }

  // Usage log methods
  async createUsageLog(log: InsertUsageLog): Promise<UsageLog> {
    const result = await db.insert(usageLogs).values(log).returning();
    return result[0];
  }

  async getUserUsageLogs(userId: string, limit = 100): Promise<UsageLog[]> {
    return db.select()
      .from(usageLogs)
      .where(eq(usageLogs.userId, userId))
      .orderBy(desc(usageLogs.createdAt))
      .limit(limit);
  }

  async getUserUsageStats(userId: string, days = 30): Promise<{
    totalRequests: number;
    requestsByService: Record<string, number>;
  }> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await db.select()
      .from(usageLogs)
      .where(and(
        eq(usageLogs.userId, userId),
        gte(usageLogs.createdAt, startDate)
      ));

    const requestsByService: Record<string, number> = {};
    logs.forEach(log => {
      requestsByService[log.service] = (requestsByService[log.service] || 0) + 1;
    });

    return {
      totalRequests: logs.length,
      requestsByService,
    };
  }
}

export const storage = new DbStorage();
