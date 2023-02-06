import { Router } from 'express'
import { permissionsControllers } from '../controllers/index.js'
import {
  authorization,
  authToken,
} from '../../../middlewares/authentication/index.js'
import { permissionsDto } from '../../../middlewares/validations/index.js'

const permissionsRoutes = Router()

/* Auth */
permissionsRoutes.get(
  '/',
  authToken,
  authorization,
  permissionsControllers.getPermissions,
)
permissionsRoutes.post(
  '/',
  authToken,
  authorization,
  permissionsDto.createPermission,
  permissionsControllers.createPermission,
)
permissionsRoutes.delete(
  '/:idPermission',
  authToken,
  authorization,
  permissionsControllers.deletePermission,
)

export default permissionsRoutes
