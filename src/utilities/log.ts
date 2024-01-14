/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CONFIG } from '../config'

export const CONSOLE = {
  log: function (message: any, ...optionalParams: any): void {
    CONFIG.appLog && console.log(message, ...optionalParams)
  },

  info: function (message: any, ...optionalParams: any): void {
    CONFIG.appLog && console.info(message, ...optionalParams)
  },

  warn: function (message: any, ...optionalParams: any): void {
    CONFIG.appLog && console.warn(message, ...optionalParams)
  },

  error: function (message: any, ...optionalParams: any): void {
    CONFIG.appLog && console.error(message, ...optionalParams)
  },

  table: function (message: any, ...optionalParams: any): void {
    CONFIG.appLog && console.table(message, ...optionalParams)
  }
}
