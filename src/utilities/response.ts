/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { CONFIG } from '../config'
import { CONSOLE } from './log'

export interface ResponseDataAtributes {
  request_param: any | null
  status: string
  error_message: any | null
  data: any | null
  next: any | null
  user: any | null
  date: any
  version: any | null
}

export const ResponseData = {
  error: (message?: any) => {
    CONSOLE.error(message)

    return {
      request_param: '',
      status: 'error',
      error_message: message,
      data: null,
      next: '',
      user: '',
      date: new Date(Date.now()),
      version: { code: CONFIG.appVersion, name: CONFIG.appName }
    } as ResponseDataAtributes
  },

  default: {
    request_param: '',
    status: 'success',
    error_message: null,
    data: null,
    next: '',
    user: '',
    date: new Date(Date.now()),
    version: { code: CONFIG.appVersion, name: CONFIG.appName }
  } as ResponseDataAtributes

}
