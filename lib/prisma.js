import { PrismaClient } from '@prisma/client'
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

const globalForPrisma = globalThis

neonConfig.webSocketConstructor = ws

function createPrismaClient() {
  const connectionString = (process.env.DATABASE_URL || '').replace(/^"|"$/g, '')
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  // WebSocket adapter supports transactions (required by Auth.js PrismaAdapter)
  const adapter = new PrismaNeon({ connectionString })
  return new PrismaClient({ adapter })
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()
globalForPrisma.prisma = prisma

export { prisma }
