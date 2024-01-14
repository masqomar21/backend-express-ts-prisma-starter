import { type Response } from 'express'
import { CONSOLE, RequestCheker, ResponseData, hashPassword } from '../../utilities'
import { StatusCodes } from 'http-status-codes'
import { type UsersAccount } from '@prisma/client'
import { v4 as uuidV4 } from 'uuid'
import prisma from '../../db'

export const registerController = async function (req: any, res: Response): Promise<any> {
  const requestBody = req.body as UsersAccount

  const emptyfield = RequestCheker({
    requireList: ['email', 'password', 'username'],
    requestData: requestBody
  })

  if (emptyfield.length > 0) {
    const message = `unable to process request! error( ${emptyfield})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const emailChecker = await prisma.usersAccount.findFirst({
      where: {
        email: requestBody.email
      },
      select: {
        email: true
      }
    })

    if (emailChecker !== null) {
      const message = 'email already exists'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }
    requestBody.id = uuidV4()
    requestBody.password = await hashPassword(requestBody.password)
    await prisma.usersAccount.create({
      data: {
        ...requestBody
      }

    })

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
