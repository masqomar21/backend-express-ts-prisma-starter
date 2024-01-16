import { userAuthorization } from './authMiddleware'
import { adminMiddleware } from './roleMiddleware'

export const middleware = {
  authtentication: userAuthorization,
  role: {
    admin: adminMiddleware
  }

}
