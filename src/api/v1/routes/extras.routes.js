import { Router } from 'express'
import { extrasControllers } from '../controllers/index.js'
import {
  authorization,
  authToken,
} from '../../../middlewares/authentication/index.js'
import { extrasDto } from '../../../middlewares/validations/index.js'

const extrasRoutes = Router()

extrasRoutes.get('/', authToken, authorization, extrasControllers.getExtras)
extrasRoutes.get(
  '/:idExtra',
  authToken,
  authorization,
  extrasControllers.getExtra,
)
extrasRoutes.post(
  '/',
  authToken,
  authorization,
  extrasDto.createExtra,
  extrasControllers.createExtra,
)
extrasRoutes.patch(
  '/:idExtra',
  authToken,
  authorization,
  extrasDto.updateExtra,
  extrasControllers.updateExtra,
)
extrasRoutes.delete(
  '/:idExtra',
  authToken,
  authorization,
  extrasControllers.deleteExtra,
)

export default extrasRoutes
