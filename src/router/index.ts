import { type Express, type Request, type Response } from 'express'

import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../utilities'
import { authRouter } from './v1/authRouter'
import { CONFIG } from '../config'
import { middleware } from '../middleware'
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
    async (req: Request, res: Response) => {
      const data = {
        message: `Welcome to ${CONFIG.appName} v1`
      }
      const response = ResponseData.default
      response.data = data
      return res.status(StatusCodes.OK).json(response)
    }
  )

  authRouter(app)

  app.get(
    '/api/v1/testauth',
    middleware.authtentication,
    async (req: Request, res: Response) => {
      const data = {
        message: 'Welcome to Tiket Papa API v1'
      }
      const response = ResponseData.default
      response.data = data
      return res.status(StatusCodes.OK).json(response)
    }
  )
}
