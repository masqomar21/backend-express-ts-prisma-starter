import { loginComtroller } from './login'
import { logoutController } from './logout'
import { registerController } from './register'
import { resendOTPController, verifyOTPController } from './twoFactor'

export const authController = {
  login: loginComtroller,
  verifyOTP: verifyOTPController,
  resendOTP: resendOTPController,
  logout: logoutController,
  register: registerController
}
