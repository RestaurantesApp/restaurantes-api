import { Router } from 'express'
import { authControllers } from '../controllers/index.js'
import { authBasic } from '../../../middlewares/authentication/index.js'
import { usersDto } from '../../../middlewares/validations/index.js'

const authRoutes = Router()

/* Auth */
authRoutes.post('/login', authBasic, usersDto.login, authControllers.login)

export default authRoutes
