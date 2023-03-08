import { Router } from 'express'
import { complementsControllers } from '../controllers/index.js'
import {
  authorization,
  authToken,
} from '../../../middlewares/authentication/index.js'
import { complementsDto } from '../../../middlewares/validations/index.js'

const complementsRoutes = Router()

complementsRoutes.get(
  '/',
  authToken,
  authorization,
  complementsControllers.getComplements,
)
complementsRoutes.get(
  '/:idComplement',
  authToken,
  authorization,
  complementsControllers.getComplement,
)
complementsRoutes.post(
  '/',
  authToken,
  authorization,
  complementsDto.createComplement,
  complementsControllers.createComplement,
)
complementsRoutes.patch(
  '/:idComplement',
  authToken,
  authorization,
  complementsDto.updateComplement,
  complementsControllers.updateComplement,
)
complementsRoutes.delete(
  '/:idComplement',
  authToken,
  authorization,
  complementsControllers.deleteComplement,
)
export default complementsRoutes
