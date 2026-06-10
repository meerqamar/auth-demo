import { PrismaClient } from '@prisma/client'
import { neon } from '@neondatabase/serverless'
import { PrismaNeonHttp } from '@prisma/adapter-neon'

const globalForPrisma = globalThis

let prisma;

if (typeof window === "undefined") {
  const envUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_2L7hAMIyVYQK@ep-royal-haze-apetc5u8-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
  const connectionString = envUrl.replace(/^"|"$/g, '')
  
  const sql = neon(connectionString)
  const adapter = new PrismaNeonHttp(sql)
  
  delete globalForPrisma.prisma
  prisma = new PrismaClient({ adapter })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
}

export { prisma }
