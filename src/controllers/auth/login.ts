/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type UsersAccount } from '@prisma/client'
import { type Response } from 'express'
import { CONSOLE, RequestCheker, ResponseData, comparePassword, generateAccesToken, generateOTP } from '../../utilities'
import prisma from '../../db'
import { StatusCodes } from 'http-status-codes'
import { CONFIG } from '../../config'
import { otpMailVerify } from '../../templates'
import MailService from '../../service/MailService'

export const loginComtroller = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as UsersAccount
  const requestQuery = req.query as { device: string }

  const emptyFields = RequestCheker({
    requireList: ['email', 'password'],
    requestData: requestBody
  })

  if (emptyFields.length > 0) {
    const message = `The following fields are required: ${emptyFields}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await prisma.usersAccount.findFirst({
      where: {
        deleted: 0,
        email: requestBody.email
      },
      include: {
        otp: true
      }
    })

    if (result === null) {
      const message = `data with email = ${requestBody.email} not found`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    if (!await comparePassword(requestBody.password, result.password)) {
      const message = 'password is incorrect'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const deviceLogin = await prisma.loginDevice.findFirst({
      where: {
        deviceName: requestQuery.device,
        userAccountId: result.id
      }
    })
    if (deviceLogin !== null) {
      const newToken = generateAccesToken(result.id, CONFIG.secret.secreReferstToken as string, '3d')
      await prisma.userAccess.create({
        data: {
          accessToken: newToken,
          userAccountId: result.id
        }
      })
      res.cookie('token', newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3
      })

      const response = ResponseData.default
      response.data = {
        message: 'Success'
      }
      return res.status(StatusCodes.OK).json(response)
    }

    if (result.otp !== null) {
      const message = 'can not login, you have already sent OTP to your email address'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const OTP = generateOTP(6)

    await prisma.otp.create({
      data: {
        otp: OTP,
        userAccountId: result.id
      }
    })

    const mailOTP = otpMailVerify(OTP)

    const mailService = MailService.getInstance()
    void mailService.sendMail(result.id, {
      from: CONFIG.smtp.sender,
      to: result.email,
      subject: 'Email Verification',
      text: mailOTP.text,
      html: mailOTP.html
    })

    const token = generateAccesToken(result.id, CONFIG.secret.secretOTP as string, '24h')

    const otp = CONFIG.appMode === 'dev' ? OTP : 'OTP has been sent to your email address'

    const response = ResponseData.default
    response.data = {
      message: 'Login Success, OTP has been sent to your email address',
      token,
      otp
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
