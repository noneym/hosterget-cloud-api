import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import session from "express-session";
import bcrypt from "bcryptjs";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import type { User } from "@shared/schema";

// Session store setup
function getSession() {
  const PgSession = connectPg(session);
  
  return session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
      tableName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
    },
  });
}

// Configure Passport strategies
export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // ========== LOCAL STRATEGY (Email/Password) ==========
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Check if user is OAuth user (no password)
        if (!user.password) {
          return done(null, false, { message: 'Please use OAuth to login' });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // ========== GOOGLE OAUTH STRATEGY ==========
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          
          if (!email) {
            return done(new Error('No email from Google'));
          }

          // Check if user exists
          let user = await storage.getUserByEmail(email);

          if (user) {
            // Update user info from Google profile
            user = await storage.updateUser(user.id, {
              firstName: profile.name?.givenName || user.firstName,
              lastName: profile.name?.familyName || user.lastName,
              profileImageUrl: profile.photos?.[0]?.value || user.profileImageUrl,
            }) as User;
          } else {
            // Create new user
            user = await storage.createUser({
              email,
              authProvider: 'google',
              providerId: profile.id,
              firstName: profile.name?.givenName || null,
              lastName: profile.name?.familyName || null,
              profileImageUrl: profile.photos?.[0]?.value || null,
            });

            // Create free subscription for new user
            await storage.createSubscription({
              userId: user.id,
              plan: 'free',
              status: 'active',
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    ));
  }

  // ========== GITHUB OAUTH STRATEGY ==========
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || '/api/auth/github/callback',
        scope: ['user:email'],
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          // GitHub might not provide email if it's private
          const email = profile.emails?.[0]?.value || `${profile.username}@github.local`;

          // Check if user exists
          let user = await storage.getUserByEmail(email);

          if (user) {
            // Update user info from GitHub profile
            user = await storage.updateUser(user.id, {
              firstName: profile.displayName || profile.username || user.firstName,
              profileImageUrl: profile.photos?.[0]?.value || user.profileImageUrl,
            }) as User;
          } else {
            // Create new user
            user = await storage.createUser({
              email,
              authProvider: 'github',
              providerId: profile.id,
              firstName: profile.displayName || profile.username || null,
              lastName: null,
              profileImageUrl: profile.photos?.[0]?.value || null,
            });

            // Create free subscription for new user
            await storage.createSubscription({
              userId: user.id,
              plan: 'free',
              status: 'active',
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    ));
  }

  // ========== PASSPORT SERIALIZATION ==========
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || null);
    } catch (error) {
      done(error);
    }
  });
}

// ========== MIDDLEWARE ==========
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};
