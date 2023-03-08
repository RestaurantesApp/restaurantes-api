import { extrasModels } from '../../../common/models/index.js'

//Función para obtener una lista de extras
const getExtras = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  try {
    const extras = await extrasModels.find().exec()
    const extrasFormat = extras.map(extra => ({
      id: extra.id,
      name: extra.name,
      active: extra.active,
      price: extra.price,
      createBy: extra.createBy,
      updateBy: extra.updateBy,
      createdAt: extra.createdAt,
      updatedAt: extra.updatedAt,
    }))
    dataResponse.message = t('EXTRAS_GetExtras')
    dataResponse.data = extrasFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}
//Función para obtener la información de un extra
const getExtra = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idExtra = req.params.idExtra
  try {
    const extra = await extrasModels.findById(idExtra).exec()
    //Validaciones
    if (!extra) {
      dataResponse.message = t('EXTRAS_NotFoun')
      return res.status(404).send(dataResponse)
    }
    //Acciones
    const extrasFormat = {
      id: extra.id,
      name: extra.name,
      active: extra.active,
      price: extra.price,
      createBy: extra.createBy,
      updateBy: extra.updateBy,
      createdAt: extra.createdAt,
      updatedAt: extra.updatedAt,
    }
    dataResponse.message = t('EXTRAS_GetExtra')
    dataResponse.data = extrasFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}
//Función para crear un nuevo extra
const createExtra = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const newExtra = {
      name: body.name,
      active: body.active,
      price: body.price,
      createBy: body.createBy,
      updateBy: '',
    }
    //Validaciones
    const extraFind = await extrasModels.findOne({ name: newExtra.name }).exec()
    if (extraFind) {
      dataResponse.message = t('EXTRAS_AlreadyExists')
      return res.status(409).send(dataResponse)
    }
    //Acciones
    const extraModel = new extrasModels(newExtra)
    await extraModel.save()
    dataResponse.message = t('EXTRAS_CreateExtra')
    dataResponse.data = {
      id: extraModel._id,
      ...newExtra,
    }
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}
//Función para actaulizar un extra
const updateExtra = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body: newExtra, t } = req
  const idExtra = req.params.idExtra
  try {
    const extra = await extrasModels.findById(idExtra).exec()
    const extraFind = await extrasModels.findOne({ name: newExtra.name }).exec()
    //Validaciones
    if (!extra) {
      dataResponse.message = t('EXTRAS_NotFoun')
      return res.status(404).send(dataResponse)
    }
    if (extraFind?.name && extraFind.name !== extra.name) {
      dataResponse.message = t('EXTRAS_AlreadyExists')
      return res.status(409).send(dataResponse)
    }

    extra.name = newExtra.name || extra.name
    extra.active = newExtra.active || extra.active
    extra.price = newExtra.price || extra.price
    extra.updateBy = newExtra.updateBy || extra.updateBy
    await extra.save()
    dataResponse.message = t('EXTRAS_UpdateExtra')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}
//Función para desactivar un extra
const deleteExtra = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idExtra = req.params.idExtra
  try {
    const extra = await extrasModels.findById(idExtra).exec()
    //Validaciones
    if (!extra) {
      dataResponse.message = t('EXTRAS_NotFoun')
      return res.status(404).send(dataResponse)
    }
    //Acciones
    const newActive = false
    //Se le da el nuevo valor a active de newActive ,la cual es false
    extra.active = newActive || newActive
    await extra.save()
    dataResponse.message = t('EXTRAS_DeleteExtra')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

export default {
  getExtra,
  getExtras,
  createExtra,
  updateExtra,
  deleteExtra,
}
