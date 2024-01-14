import { CONFIG } from '../config'

interface otpMailVerifyAtributes {
  html: string
  text: string
}

export const otpMailVerify = function (otp: string): otpMailVerifyAtributes {
  const html = `
  <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <title>Verification email address</title>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
        rel="stylesheet" media="screen">
      <style>
        .hover-underline:hover {
          text-decoration: underline !important;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ping {

          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse {
          50% {
            opacity: .5;
          }
        }

        @keyframes bounce {

          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }

          50% {
            transform: none;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        @media (max-width: 600px) {
          .sm-px-24 {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }

          .sm-py-32 {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }

          .sm-w-full {
            width: 100% !important;
          }
        }
      </style>
    </head>

    <body
      style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1;">
      
      <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en">
        <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%"
          cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center"
              style="--bg-opacity: 1; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
              <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600"
                cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="sm-py-32 sm-px-24"
                    style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;"
                    align="center">
                    <a href=""
                        style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle;">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif; background-color: #1C5F7B; border-radius: 20px;">
                    <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%; background-color: #1C5F7B; border-radius: 20px;" cellpadding="0"
                      cellspacing="0" role="presentation">
                      <tr>
                        <td class="sm-px-24" style=" --bg-opacity: 0.3;  background-color: #1C5F7B; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding-bottom: 40px; padding-top: 20px; border-radius: 20px 20px 0 0; text-align: center;">
                            <span style="font-weight: 800; font-size: 32px; line-height: normal; margin-bottom: 0; color: #eceff1;">${CONFIG.appName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="sm-px-24"
                          style="--bg-opacity: 1; transform: translateY(-20px); background-color: #ffffff;  border-radius: 20px 20px  20px 20px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262;"
                           align="left">
                          <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hey there,</p>

                          <p style="margin: 0 0 24px;">
                            Your OTP (One-Time Password) for password reset.
                          </p>
                          
                          <table cellpadding="0" style="width: 100%;"
                          cellspacing="0" role="presentation">
                            <tr >
                              <td align="center" style="padding: 10px 0;">
                                <span style="font-size: 32px; margin: 10px 0; padding: 10px 0; font-weight: bolder;">${otp}</span>
            
                              </td>
                            </tr>
                          </table>

                          
                          <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0"
                          role="presentation">
                            <tr>
                                <td
                                style=" --bg-opacity: 1; background-color: #7367f0; padding: 10px 0 5px 0;  border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 24px 0 0 0; ">
                            This code is valid for 1 minute
                          </p>
                          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%"
                            cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td
                                style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                <div
                                  style="--bg-opacity: 1; background-color: #eceff1; height: 1px; line-height: 1px;">
                                  &zwnj;</div>
                              </td>
                            </tr>
                          </table>
      
                          <p style="margin: 0 0 16px;">Thanks, <br>The ${CONFIG.appName} Support Team</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                </tr>
                <tr>
                  <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>

    </html>`
  const text = `
        Verify Email, A request to reset your password for your ${CONFIG.appName} account was received.
        Use this OTP to confirm your account`
  return {
    html,
    text
  }
}
