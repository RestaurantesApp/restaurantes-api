import { drinksModels } from '../../../common/models/index.js'

const getDrinks = async (req, res) => {
    const dataResponse = { message: '', data: null }
    const { t } = req
    try {
      const drinks = await drinksModels.find().exec()
      const drinksFormat = drinks.map(drink => ({
        id: drink.id,
        name: drink.name,
        active: drink.active,
        price: drink.price,
        createBy: drink.createBy,
        createdAt: drink.createdAt,
        updateBy: drink.updateBy,
        updatedAt: drink.updatedAt,
      }))
      dataResponse.message = t('DRINKS_GetDrinks')
      dataResponse.data = drinksFormat
      return res.status(200).send(dataResponse)
    } catch (error) {
      dataResponse.message = t('RES_ServerError')
      dataResponse.data = error
      return res.status(500).send(dataResponse)
    }
  }
  
  const getDrink = async (req, res) => {
    const dataResponse = { message: '', data: null }
    const { t } = req
    const idDrink = req.params.idDrink
    try {
      const drink = await drinksModels.findById(idDrink).exec()
      //Validaciones
      if (!drink) {
        dataResponse.message = t('DRINKS_NotFound')
        return res.status(404).send(dataResponse)
      }
      //Acciones
      const drinksFormat = {
        id: drink.id,
        name: drink.name,
        active: drink.active,
        price: drink.price,
        image: drink.image,
        createBy: drink.createBy,
        updateBy: drink.updateBy,
        createdAt: drink.createdAt,
        updatedAt: drink.updatedAt,
      }
      dataResponse.message = t('DRINKS_GetDrink')
      dataResponse.data = drinksFormat
      return res.status(200).send(dataResponse)
    } catch (error) {
      dataResponse.message = t('RES_ServerError')
      dataResponse.data = error
      return res.status(500).send(dataResponse)
    }
  }

//Crear 
const createDrink = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req

  try {
    const newDrink = {
      name: body.name,
      active: body.active,
      price: body.price,
      image: body.image,
      createBy: body.createBy,
      updateBy: '',
    }

    // Validations
    const drinkFind = await drinksModels.findOne({ name: newDrink.name }).exec()
    if (drinkFind) {
      dataResponse.message = t('DRINKS_AlreadyExists')
      return res.status(409).send(dataResponse)
    }

    // Actions
    const drinkModel = new drinksModels(newDrink)
    await drinkModel.save()
    dataResponse.message = t('DRINKS_CreateDrink')
    dataResponse.data = {
      id: drinkModel._id,
      ...newDrink,
    }
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

const updateDrink = async (req, res) => {
    const dataResponse = { message: '', data: null }
    const { body: newDrink, t } = req
    const idDrink = req.params.idDrink
    
    try {
      const drink = await drinksModels.findById(idDrink).exec()
      const drinkFind = await drinksModels
        .findOne({ name: newDrink.name })
        .exec()
  
      //Validaciones
      if (!drink) {
        dataResponse.message = t('DRINKS_NotFound')
        return res.status(404).send(dataResponse)
      }
      if (drinkFind?.name && drinkFind.name !== drink.name) {
        dataResponse.message = t('DRINKS_AlreadyExists')
        return res.status(409).send(dataResponse)
      }
      drink.name = newDrink.name || drink.name
      drink.active = newDrink.active 
      drink.price = newDrink.price || drink.price
      drink.updateBy = newDrink.updateBy || drink.updateBy
      drink.image = newDrink.image || drink.image
      await drink.save()
      dataResponse.message = t('DRINKS_UpdateDrink')
      return res.status(200).send(dataResponse)
    } catch (error) {
      dataResponse.message = t('RES_ServerError')
      dataResponse.data = error
      return res.status(500).send(dataResponse)
    }
  }
  
  const deleteDrink = async (req, res) => {
    const dataResponse = { message: '', data: null }
    const { t } = req
    const idDrink = req.params.idDrink
    try {
      const drink = await drinksModels.findById(idDrink).exec()
      //Validaciones
      if (!drink) {
        dataResponse.message = t('DRINKS_NotFound')
        return res.status(404).send(dataResponse)
      }
  
      //Acciones
      const deactivate = false
      drink.active = deactivate || deactivate
      await drink.save()
      dataResponse.message = t('DRINKS_DeactivateDrink')
      return res.status(200).send(dataResponse)
    } catch (error) {
      dataResponse.message = t('RES_ServerError')
      dataResponse.data = error
      return res.status(500).send(dataResponse)
    }
  }
  

export default {
    getDrinks,
    getDrink,
    createDrink,
    updateDrink,
    deleteDrink,
  }