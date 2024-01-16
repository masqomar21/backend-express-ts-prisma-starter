import { type Express, type Request, type Response } from 'express'

import { StatusCodes } from 'http-status-codes'
import { CONSOLE, ResponseData } from '../utilities'
import { authRouter } from './v1/authRouter'
import { CONFIG } from '../config'
import { middleware } from '../middleware'
import { type UsersAccount } from '@prisma/client'
export const appRouterv1 = async (app: Express): Promise<any> => {
  app.get(
    '/',
    async (req: Request, res: Response) => {
      const data = {
        message: `Welcome to ${CONFIG.appName} for more function use /api/v1 as main router`
      }
      const response = ResponseData.default
      response.data = data
      return res.status(StatusCodes.OK).json(response)
    }
  )

  app.get(
    '/api/v1',
    async (req: any, res: Response) => {
      const data = {
        message: `Welcome to ${CONFIG.appName} v1`
      }
      const response = ResponseData.default
      response.data = data
      return res.status(StatusCodes.OK).json(response)
    }
  )

  authRouter(app)

  // app.use(middleware.authtentication, middleware.role.admin)
  app.get(
    '/api/v1/test_auth',
    middleware.authtentication,
    middleware.role.admin,
    async (req: any, res: Response) => {
      const user = req.user as UsersAccount
      CONSOLE.log(user)
      const data = {
        message: `Welcome ${user.username} to ${CONFIG.appName} v1`
      }
      const response = ResponseData.default
      response.data = data
      return res.status(StatusCodes.OK).json(response)
    }
  )
}
