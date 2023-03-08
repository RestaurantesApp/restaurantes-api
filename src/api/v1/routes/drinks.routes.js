import { Router } from 'express'
import { drinksControllers } from '../controllers/index.js'
import {
    authorization,
    authToken,
} from '../../../middlewares/authentication/index.js'
import { drinksDto } from '../../../middlewares/validations/index.js'

const drinksRoutes = Router()

drinksRoutes.get('/', authToken, authorization, drinksControllers.getDrinks)
drinksRoutes.get('/:idDrink', authToken, authorization, drinksControllers.getDrink)
drinksRoutes.post(
    '/',
    authToken,
    authorization,
    drinksDto.createDrink,
    drinksControllers.createDrink,
)
drinksRoutes.patch(
    '/:idDrink',
    authToken,
    authorization,
    drinksDto.updateDrink,
    drinksControllers.updateDrink,
)
drinksRoutes.delete(
    '/:idDrink',
    authToken,
    authorization,
    drinksControllers.deleteDrink,
)

export default drinksRoutes