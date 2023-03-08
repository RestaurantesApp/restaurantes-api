import { localModels } from '../../../common/models/index.js'

//Obtener Locales
const getLocals = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  try {
    const locals = await localModels.find().exec()
    const localsFormat = locals.map(locals => ({
      id: locals.id,
      name: locals.name,
      active: locals.active,
      phoneNumber: locals.phoneNumber,
      email: locals.email,
      address: locals.address,
      image: locals.image,
      location: locals.location,
      createBy: locals.createBy,
      createdAt: locals.createdAt,
      updateBy: locals.updateBy,
      updatedAt: locals.updatedAt,
    }))
    dataResponse.message = t('LOCAL_GetLocals')
    dataResponse.data = localsFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Obtener un Local
const getLocal = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idLocal = req.params.idLocal
  try {
    const local = await localModels.findById(idLocal).exec()
    //Validaciones
    if (!local) {
      dataResponse.message = t('LOCAL_NotFound')
      return res.status(404).send(dataResponse)
    }
    //Acciones
    const localsFormat = {
      id: local.id,
      name: local.name,
      active: local.active,
      phoneNumber: local.phoneNumber,
      email: local.email,
      address: local.address,
      image: local.image,
      location: local.location,
      createBy: local.createBy,
      updateBy: local.updateBy,
      createdAt: local.createdAt,
      updatedAt: local.updatedAt,
    }
    dataResponse.message = t('LOCAL_GetLocal')
    dataResponse.data = localsFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Crear un Local
const createLocal = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const newLocal = {
      name: body.name,
      active: body.active,
      phoneNumber: body.phoneNumber,
      email: body.email,
      address: body.address,
      image: body.image,
      location: body.location,
      createBy: body.createBy,
      updateBy: '',
    }

    // Validations
    const localFind = await localModels.findOne({ name: newLocal.name }).exec()
    if (localFind) {
      dataResponse.message = t('LOCAL_AlreadyExists')
      return res.status(409).send(dataResponse)
    }

    // Actions
    const localModel = new localModels(newLocal)
    await localModel.save()
    dataResponse.message = t('LOCAL_CreateLocal')
    dataResponse.data = {
      id: localModel._id,
      ...newLocal,
    }
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Actualizar un Local

const updateLocal = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body: newLocal, t } = req
  const idLocal = req.params.idLocal
  try {
    const local = await localModels.findById(idLocal).exec()
    const localFind = await localModels.findOne({ name: newLocal.name }).exec()

    //Validaciones
    if (!local) {
      dataResponse.message = t('LOCAL_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (localFind?.name && localFind.name !== local.name) {
      dataResponse.message = t('LOCAL_AlreadyExists')
      return res.status(409).send(dataResponse)
    }
    local.name = newLocal.name || local.name
    local.active = newLocal.active || local.active
    local.email = newLocal.email || local.email
    local.phoneNumber = newLocal.phoneNumber || local.phoneNumber
    local.address = newLocal.address || local.address
    local.image = newLocal.image || local.image
    local.location = newLocal.location || local.location
    local.updateBy = newLocal.updateBy || local.updateBy
    await local.save()
    dataResponse.message = t('LOCAL_UpdateLocal')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Desactivar un Local
const deleteLocal = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idLocal = req.params.idLocal
  try {
    const local = await localModels.findById(idLocal).exec()
    //Validaciones
    if (!local) {
      dataResponse.message = t('LOCAL_NotFound')
      return res.status(404).send(dataResponse)
    }

    //Acciones
    const deactivate = false
    local.active = deactivate || deactivate
    await local.save()
    dataResponse.message = t('LOCAL_DeactivateLocal')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}
export default { getLocals, createLocal, getLocal, updateLocal, deleteLocal }
