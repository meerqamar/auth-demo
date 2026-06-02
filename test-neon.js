const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

const connectionString = "postgresql://neondb_owner:npg_2L7hAMIyVYQK@ep-royal-haze-apetc5u8-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const products = await prisma.product.findMany();
    console.log("Success:", products.length);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
