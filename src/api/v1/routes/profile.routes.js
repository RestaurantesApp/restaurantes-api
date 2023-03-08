import { Router } from 'express'
import { profileControllers } from '../controllers/index.js'

import { authToken } from '../../../middlewares/authentication/index.js'
import { profileDto } from '../../../middlewares/validations/index.js'

const profileRoutes = Router()

//Ruta para traer los datos del perfil
profileRoutes.get('/:idUser', 
authToken, profileControllers.getProfile)

//Ruta para actualizar el perfil de usuario
profileRoutes.patch(
  '/:idUser',
  authToken,
  profileDto.updateProfile,
  profileControllers.updateProfile,
)

export default profileRoutes
