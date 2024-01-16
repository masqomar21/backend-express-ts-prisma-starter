import dotenv from 'dotenv'
import ip from 'ip'

dotenv.config()

export const CONFIG = {
  appName: process.env.APP_NAME,
  appVersion: process.env.APP_VERSION,
  appMode: process.env.APP_MODE || 'dev',
  appLog: (Boolean(process.env.APP_LOG)) || false,
  appURL : process.env.APP_URL || `http://${ip.address()}`,
  TargetURL : process.env.TARGET_URL || `http://${ip.address()}`,
  port: process.env.APP_PORT || 5001,
  host: process.env.APP_HOST || ip.address(),
  secret: {
    keyEncryption: process.env.SECRET_KEY_ENCRYIPTION,
    passwordEncryption: process.env.SECRET_PASSWORD_ENCRYPTION,
    secretToken: process.env.SECRET_TOKEN,
    secreReferstToken: process.env.SECRET_REFRESS_TOKEN,
    secretOTP: process.env.SECRET_OTP
  },
  maximumUploadFile: process.env.MAXIMUM_UPLOAD_FILE || 1024,
  dataBase: {
    development: {
      url: process.env.DATABASE_URL,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: process.env.DB_LOG === 'true'
    },
    testing: {
      url: process.env.DATABASE_URL,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: process.env.DB_LOG === 'true'
    },
    production: {
      url: process.env.DATABASE_URL,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_PRODUCTION,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: process.env.DB_LOG === 'true'
    }
  },
  smtp: {
    sender : process.env.SMTP_SENDER || 'no-reply@test.com',
    host: process.env.VERIFICATION_HOST || 'smtp.ethereal.email',
    port: process.env.VERIFICATION_PORT || '587',
    email: process.env.VERIFICATION_EMIAL || 'alda.hilpert@ethereal.email',
    password: process.env.VERIFICATION_EMIAL_PASSWORD || 'aSBRhVyCmHnVUXGtaR'
  }
}
  
