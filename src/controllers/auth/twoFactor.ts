import { type Response } from 'express'
import { CONSOLE, RequestCheker, ResponseData, generateAccesToken, generateOTP, verifyAccesToken } from '../../utilities'
import { StatusCodes } from 'http-status-codes'
import { CONFIG } from '../../config'
import prisma from '../../db'
import { otpMailVerify } from '../../templates'
import MailSevice from '../../service/mailSevice'

export const verifyOTPController = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as { token: string, otp: string, device: string }

  const emptyFields = RequestCheker({
    requireList: ['token', 'otp', 'device'],
    requestData: requestBody
  })

  if (emptyFields.length > 0) {
    const message = `The following fields are required: ${emptyFields}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const user = verifyAccesToken(requestBody.token, CONFIG.secret.secretOTP as string)

    console.log('userId', user)
    const result = await prisma.otp.findFirst({
      where: {
        otp: requestBody.otp,
        userAccountId: user.id
      }
    })

    if (result === null) {
      const message = 'otp is incorrect'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    await prisma.otp.delete({
      where: {
        id: result.id
      }
    })

    const newToken = generateAccesToken(user.id as string, CONFIG.secret.secreReferstToken as string, '3d')
    await prisma.userAccess.create({
      data: {
        accessToken: newToken,
        userAccountId: user.id
      }
    })

    await prisma.loginDevice.create({
      data: {
        deviceName: requestBody.device,
        userAccountId: user.id
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
  } catch (error: any) {
    CONSOLE.error(error)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const resendOTPController = async function (req: any, res: Response): Promise<any> {
  const requestParams = req.query as { token: string }

  const emptyFields = RequestCheker({
    requireList: ['token'],
    requestData: requestParams
  })

  if (emptyFields.length > 0) {
    const message = `The following fields are required: ${emptyFields}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const user = verifyAccesToken(requestParams.token, CONFIG.secret.secretOTP as string)

    const result = await prisma.usersAccount.findFirst({
      where: {
        deleted: 0,
        id: user.id
      }
    })
    if (result === null) {
      const message = `data with token = ${requestParams.token} not found`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const OTP = generateOTP(6)

    await prisma.otp.update({
      where: {
        userAccountId: user.id
      },
      data: {
        otp: OTP
      }
    })

    const mailOTP = otpMailVerify(OTP)

    const mailService = MailSevice.getInstance()
    await mailService.sendMail(result.id, {
      from: CONFIG.smtp.sender,
      to: result.email,
      subject: 'Email Verification',
      text: mailOTP.text,
      html: mailOTP.html
    })

    const response = ResponseData.default
    response.data = {
      message: 'OTP has been sent to your email address'
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error)

    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
