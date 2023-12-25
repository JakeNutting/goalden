import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

export default function createPrismaClient() {
  const libsql = createClient({
    url: `${process.env.NUXT_TURSO_DB_URL}`,
    authToken: `${process.env.NUXT_TURSO_DB_AUTH_TOKEN}`,
  })
  
  const adapter = new PrismaLibSQL(libsql)
  const prisma = new PrismaClient({ adapter })

  return prisma;
}