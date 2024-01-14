/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PrismaClient } from '@prisma/client'
import { CONFIG } from '../config'

interface CostumeNodeJsGlobal extends Global {
  prisma: PrismaClient
}

declare const global: CostumeNodeJsGlobal

const prisma = global.prisma || new PrismaClient()
if (CONFIG.appMode === 'dev') {
  global.prisma = prisma
}

export default prisma
