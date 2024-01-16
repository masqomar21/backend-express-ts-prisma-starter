/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response, type NextFunction } from 'express'
// import { CONSOLE, ResponseData, verifyAccesToken } from '../utilities'
import { StatusCodes } from 'http-status-codes'
// import { CONFIG } from '../config'
// import prisma from '../db'
import { type UsersAccount } from '@prisma/client'
import { ResponseData } from '../utilities'

export const adminMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user as UsersAccount

  if (user.role !== 'ADMIN') {
    const response = ResponseData.error('Unauthorized')
    return res.status(StatusCodes.UNAUTHORIZED).json(response)
  }
  next()
}
