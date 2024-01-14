import jwt from 'jsonwebtoken'

export interface jwtPayloadInterface {
  id: string
  role: string | undefined
}

// export const generateAccesToken = function (account: jwtPayloadInterface, secretToken: string, expiresIn: string): string {
//   return jwt.sign(account, secretToken, { expiresIn })
// }

export const generateAccesToken = function (userId: string, secretToken: string, expiresIn: string): string {
  return jwt.sign({ id: userId }, secretToken, { expiresIn })
}

export const verifyAccesToken = function (token: string, secretToken: string): any | null {
  try {
    return jwt.verify(token, secretToken)
  } catch (error: any) {
    return null
  }
}
