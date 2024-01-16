/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { authController } from '../../controllers'

export const authRouter = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/auth', router)

  router.post(
    '/login',
    async (req: Request, res: Response) => await authController.login(req, res)
  )

  router.delete(
    '/logout',
    async (req: Request, res: Response) => await authController.logout(req, res)
  )

  router.post(
    '/otp',
    async (req: Request, res: Response) => await authController.verifyOTP(req, res)
  )

  router.get(
    '/resendotp',
    async (req: Request, res: Response) => await authController.resendOTP(req, res)
  )

  router.post(
    '/register',
    async (req: Request, res: Response) => await authController.register(req, res)
  )
}
