import { Router } from 'express'
import { localControllers } from '../controllers/index.js'
import {
  authorization,
  authToken,
} from '../../../middlewares/authentication/index.js'
import { localDto } from '../../../middlewares/validations/index.js'

const localRoutes = Router()

localRoutes.get('/', authToken, authorization, localControllers.getLocals)

localRoutes.get(
  '/:idLocal',
  authToken,
  authorization,
  localControllers.getLocal,
)

localRoutes.patch(
  '/:idLocal',
  authToken,
  authorization,
  localDto.updateLocal,
  localControllers.updateLocal,
)

localRoutes.post(
  '/',
  authToken,
  authorization,
  localDto.createLocal,
  localControllers.createLocal,
)

localRoutes.delete(
  '/:idLocal',
  authToken,
  authorization,
  localControllers.deleteLocal,
)
export default localRoutes
