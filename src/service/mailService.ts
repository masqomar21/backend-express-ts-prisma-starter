import nodemailer from 'nodemailer'
import { CONFIG } from '../config'
import { CONSOLE } from '../utilities'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import type SESTransport from 'nodemailer/lib/ses-transport'

const mailHost = CONFIG.smtp.host
const mailPort = parseInt(CONFIG.smtp.port)
const isSecure = CONFIG.smtp.host === 'smtp.gmail.com'

console.log('mailHost', mailHost, 'mailPort', mailPort, 'isSecure', isSecure)

export interface MailInterface {
  from?: string
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  text?: string
  html?: string
}

export default class MailService {
  private static instance: MailService

  private readonly transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    // secure: isSecure,
    auth: {
      user: CONFIG.smtp.email,
      pass: CONFIG.smtp.password
    }
  })

  private constructor () { }

  static getInstance (): MailService {
    if (typeof MailService.instance === 'undefined') {
      MailService.instance = new MailService()
    }
    return MailService.instance
  }

  async sendMail (
    requestId: string | number | string[],
    options: MailInterface
  ): Promise<any> {
    CONSOLE.info('sendMail from request -> ', requestId)
    await this.transporter.sendMail({
      from: `"${CONFIG.appName} team" <${options.from ?? CONFIG.smtp.sender}>`,
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html: options.html
    })
      .then((info: SMTPTransport.SentMessageInfo | SESTransport.SentMessageInfo) => {
        CONSOLE.info('Message sent: %s', info.messageId)
        CONSOLE.info(`${requestId as string} -> mail sent successfully`)
        CONSOLE.info(`-> [Mail Response] = ${info.response} -> [Mail Message] = ${info.messageId}`)
        if (!isSecure) {
          CONSOLE.info(`${requestId as string} - Nodemailer ethereal URL : ${nodemailer.getTestMessageUrl(info)}`)
        }
        return info
      })
  }

  async verifyConnection (): Promise<boolean> {
    return await this.transporter.verify()
  }

  getTransporter (): nodemailer.Transporter {
    return this.transporter
  }
}
