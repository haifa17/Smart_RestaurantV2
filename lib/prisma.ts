import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('DATABASE_URL is not set. Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE')))
    throw new Error('DATABASE_URL environment variable is not set')
  }

  console.log('Creating Prisma client with DATABASE_URL:', databaseUrl.substring(0, 30) + '...')

  const neon = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaNeon(neon)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['error', 'warn'],
  })
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = createPrismaClient()
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  prisma = globalForPrisma.prisma
}

export { prisma }
