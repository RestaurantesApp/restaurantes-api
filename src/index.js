import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import { connectDB, swaggerOptions } from './config/index.js'
import { Paths } from './common/types/index.js'
import {
  authRoutes,
  permissionsRoutes,
  usersRoutes,
  profileRoutes,
  drinksRoutes,
  complementsRoutes,
  categoriesRoutes,
  localRoutes,
  extrasRoutes,
} from './api/v1/routes/index.js'
import { languages } from './middlewares/validations/index.js'

dotenv.config()
const PORT = process.env.PORT ?? 3000
const SERVER_URL_NAME = process.env.SERVER_URL_NAME ?? ''
const app = express()
const swaggerDocumentV1 = YAML.load('./src/api/v1/docs/swagger.yaml')

// Middlewares
app.use(express.json())
app.use(express.text())
app.use(cors())
app.use(
  '/',
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ')
  }),
)
app.use('/', languages)

// API
app.use(
  `/api-docs`,
  swaggerUI.serve,
  swaggerUI.setup(undefined, swaggerOptions),
)
app.get('/', (_req, res) => {
  const html = `<h1><a href="${SERVER_URL_NAME}/api-docs">Swagger api documentation</a></h1>`
  return res.status(200).send(html)
})
app.get('/api/v1/docs/swagger.yaml', (_req, res) => {
  swaggerDocumentV1.servers = [
    {
      url: `${process.env.SERVER_URL_NAME}/api/v1`,
    },
  ]
  res.json(swaggerDocumentV1)
})
app.use('/api/v1', authRoutes)
app.use(`/api/v1/${Paths.users}`, usersRoutes)
app.use(`/api/v1/${Paths.permissions}`, permissionsRoutes)
app.use(`/api/v1/${Paths.profile}`, profileRoutes)
app.use(`/api/v1/${Paths.drinks}`, drinksRoutes)
app.use(`/api/v1/${Paths.complements}`, complementsRoutes)
app.use(`/api/v1/${Paths.categories}`, categoriesRoutes)
app.use(`/api/v1/${Paths.local}`, localRoutes)
app.use(`/api/v1/${Paths.extras}`, extrasRoutes)

const bootstrap = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on ${SERVER_URL_NAME}`)
  })
}

bootstrap()
