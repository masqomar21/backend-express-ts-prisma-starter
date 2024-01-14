import express, { type Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { CONFIG } from './src/config'
import { CONSOLE } from './src/utilities'
import { appRouterv1 } from './src/router'

dotenv.config()

const app: Express = express()

const port = CONFIG.port

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, content-type, Authorization, Content-Type'
  )
  CONSOLE.info(`[${req.method}] - ${req.url} - ${req.ip} - ${new Date().toISOString()} `)
  next()
})

app.use('/public', express.static('public'))

app.routes = appRouterv1(app)

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/api/v1`)
})
