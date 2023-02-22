import { complementsModels } from '../../../common/models/index.js'

//Obtener Complementos
const getComplements = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  try {
    const complements = await complementsModels.find().exec()
    const complementsFormat = complements.map(complements => ({
      id: complements.id,
      name: complements.name,
      active: complements.active,
      createBy: complements.createBy,
      createdAt: complements.createdAt,
      updateBy: complements.updateBy,
      updatedAt: complements.updatedAt,
    }))
    dataResponse.message = t('COMPLEMENTS_GetComplements')
    dataResponse.data = complementsFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Obtener un Complemento
const getComplement = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idComplement = req.params.idComplement
  try {
    const complement = await complementsModels.findById(idComplement).exec()
    //Validaciones
    if (!complement) {
      dataResponse.message = t('COMPLEMENTS_NotFound')
      return res.status(404).send(dataResponse)
    }
    //Acciones
    const complementsFormat = {
      id: complement.id,
      name: complement.name,
      active: complement.active,
      createBy: complement.createBy,
      updateBy: complement.updateBy,
      createdAt: complement.createdAt,
      updatedAt: complement.updatedAt,
    }
    dataResponse.message = t('COMPLEMENTS_GetComplement')
    dataResponse.data = complementsFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Crear un Complemento
const createComplement = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const newComplement = {
      name: body.name,
      active: body.active,
      createBy: body.createBy,
      updateBy: '',
    }

    // Validations
    const complementFind = await complementsModels
      .findOne({ name: newComplement.name })
      .exec()
    if (complementFind) {
      dataResponse.message = t('COMPLEMENTS_AlreadyExists')
      return res.status(409).send(dataResponse)
    }

    // Actions
    const complementModel = new complementsModels(newComplement)
    await complementModel.save()
    dataResponse.message = t('COMPLEMENTS_CreateComplement')
    dataResponse.data = {
      id: complementModel._id,
      ...newComplement,
    }
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Actualizar un Complemento

const updateComplement = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body: newComplement, t } = req
  const idComplement = req.params.idComplement
  try {
    const complement = await complementsModels.findById(idComplement).exec()
    const complementFind = await complementsModels
      .findOne({ name: newComplement.name })
      .exec()

    //Validaciones
    if (!complement) {
      dataResponse.message = t('COMPLEMENTS_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (complementFind?.name && complementFind.name !== complement.name) {
      dataResponse.message = t('COMPLEMENTS_AlreadyExists')
      return res.status(409).send(dataResponse)
    }
    complement.name = newComplement.name || complement.name
    complement.active = newComplement.active || complement.active
    complement.position = newComplement.position || complement.position
    complement.updateBy = newComplement.updateBy || complement.updateBy
    await complement.save()
    dataResponse.message = t('COMPLEMENTS_UpdateComplement')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Desactivar un complemento

const deleteComplement = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idComplement = req.params.idComplement
  try {
    const complement = await complementsModels.findById(idComplement).exec()
    //Validaciones
    if (!complement) {
      dataResponse.message = t('COMPLEMENTS_NotFound')
      return res.status(404).send(dataResponse)
    }

    //Acciones
    const deactivate = false
    complement.active = deactivate || deactivate
    await complement.save()
    dataResponse.message = t('COMPLEMENTS_DeactivateComplement')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

export default {
  getComplements,
  createComplement,
  getComplement,
  updateComplement,
  deleteComplement,
}
