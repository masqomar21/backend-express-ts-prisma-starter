/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response, type NextFunction } from 'express'
import { CONSOLE, ResponseData, verifyAccesToken } from '../utilities'
import { StatusCodes } from 'http-status-codes'
import { CONFIG } from '../config'
import prisma from '../db'

export const userAuthorization = async (req: any, res: Response, next: NextFunction) => {
  try {
    const requestCookie = req.cookies as { token: string }

    if (requestCookie === null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    const tokenData = verifyAccesToken(requestCookie.token, CONFIG.secret.secretToken as string)
    console.log(tokenData)
    if (tokenData == null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    const result = prisma.userAccess.findFirst({
      where: {
        accessToken: requestCookie.token
      },
      include: {
        userAcount: true
      }
    })

    console.log(result.userAcount())

    if (result === null) {
      const response = ResponseData.error('Missing Authorization.')
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }
    next()
  } catch (error: any) {
    CONSOLE.error(error.message)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
