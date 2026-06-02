const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

// Fallback to .env if not found
if (!process.env.DATABASE_URL) {
  require('dotenv').config({ path: '.env' });
}

console.log("Using Database URL:", process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  try {
    await client.connect();
    console.log("Connected to Neon DB successfully!");

    console.log("Adding NextAuth columns to User table...");
    await client.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "emailVerified" TIMESTAMP(3);`);
    await client.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "image" TEXT;`);
    await client.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;`);

    console.log("Creating NextAuth tables...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS "auth_accounts" (
        "id" TEXT NOT NULL,
        "userId" INTEGER NOT NULL,
        "type" TEXT NOT NULL,
        "provider" TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        "refresh_token" TEXT,
        "access_token" TEXT,
        "expires_at" INTEGER,
        "token_type" TEXT,
        "scope" TEXT,
        "id_token" TEXT,
        "session_state" TEXT,

        CONSTRAINT "auth_accounts_pkey" PRIMARY KEY ("id")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "auth_sessions" (
        "id" TEXT NOT NULL,
        "sessionToken" TEXT NOT NULL,
        "userId" INTEGER NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,

        CONSTRAINT "auth_sessions_pkey" PRIMARY KEY ("id")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "auth_verification_tokens" (
        "identifier" TEXT NOT NULL,
        "token" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL
      );
    `);

    console.log("Creating NextAuth indexes...");
    await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS "auth_accounts_provider_providerAccountId_key" ON "auth_accounts"("provider", "providerAccountId");`);
    await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS "auth_sessions_sessionToken_key" ON "auth_sessions"("sessionToken");`);
    await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS "auth_verification_tokens_token_key" ON "auth_verification_tokens"("token");`);
    await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS "auth_verification_tokens_identifier_token_key" ON "auth_verification_tokens"("identifier", "token");`);

    console.log("Creating Foreign Keys...");
    try {
      await client.query(`ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch (e) {
      console.log("FK auth_accounts already exists or error:", e.message);
    }
    
    try {
      await client.query(`ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;`);
    } catch (e) {
      console.log("FK auth_sessions already exists or error:", e.message);
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.end();
  }
}

main();
