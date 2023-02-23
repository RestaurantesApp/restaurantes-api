import { Router } from 'express'
import { categoriesControllers } from '../controllers/index.js'
import {
  authorization,
  authToken,
} from '../../../middlewares/authentication/index.js'

import { categoriesDto } from '../../../middlewares/validations/index.js'

const categoriesRoutes = Router()
//Contenido de las rutas de categoria ()
categoriesRoutes.get(
  '/',
  authToken,
  authorization,
  categoriesControllers.getCategories,
)
categoriesRoutes.get(
  '/:idCategory',
  authToken,
  authorization,
  categoriesControllers.getCategory,
)
categoriesRoutes.post(
  '/',
  authToken,
  authorization,
  categoriesDto.createCategory,
  categoriesControllers.createCategory,
)
categoriesRoutes.patch(
  '/:idCategory',
  authToken,
  categoriesDto.updateCategory,
  categoriesControllers.updateCategory,
)
categoriesRoutes.delete(
  '/:idCategory',
  authToken,
  categoriesControllers.deleteCategory,
)

export default categoriesRoutes
