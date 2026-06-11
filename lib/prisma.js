import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis

function createPrismaClient() {
  const connectionString = (process.env.DATABASE_URL || '').replace(/^"|"$/g, '')
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}

// Lazy proxy — avoids requiring DATABASE_URL during `next build`
export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrisma()
      const value = client[prop]
      return typeof value === 'function' ? value.bind(client) : value
    },
  }
)
