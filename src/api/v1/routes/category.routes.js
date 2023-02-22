import { Router } from 'express'
import { categoriesControllers } from '../controllers/index.js'
import {
  authorization,
  authToken,
} from '../../../middlewares/authentication/index.js'

import { categoriesDto } from '../../../middlewares/validations/index.js'

const categoriesRoutes = Router()
//Contenido de las rutas de categoria

categoriesRoutes.post(
  '/',
  authToken,
  authorization,
  categoriesDto.createCategory,
  categoriesControllers.createCategory
)

export default categoriesRoutes
