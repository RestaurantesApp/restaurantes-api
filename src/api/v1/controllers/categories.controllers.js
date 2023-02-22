//Controladores para la sessión de categorias
import { categoryModels } from '../../../common/models/index.js'

//Función para obtener la lista de categorias
const getCategories = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  try {
    const categories = await categoryModels.find().exec()
    const categoriesFormat = categories.map(category => ({
      id: category.id,
      name: category.name,
      active: category.active,
      position: category.position,
      createBy: category.createBy,
      updateBy: category.updateBy,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }))
    dataResponse.message = t('CATEGORIES_GetCategories')
    dataResponse.data = categoriesFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Función para obtener la informació de una categoria
const getCategory = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idCategory = req.params.idCategory
  try {
    const category = await categoryModels.findById(idCategory).exec()
    //Validaciones
    if (!category) {
      dataResponse.message = t('CATEGORIES_NotFoun')
      return res.status(404).send(dataResponse)
    }
    //Acciones
    const categoriesFormat = {
      id: category.id,
      name: category.name,
      active: category.active,
      position: category.position,
      createBy: category.createBy,
      updateBy: category.updateBy,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
    dataResponse.message = t('CATEGORIES_GetCategory')
    dataResponse.data = categoriesFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Función para crear una categoria
const createCategory = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const newCategory = {
      name: body.name,
      active: body.active,
      position: body.position,
      createBy: body.createBy,
      updateBy: '',
    }
    //Validaciones
    const categoryFind = await categoryModels
      .findOne({ name: newCategory.name })
      .exec()
    const positionFind = await categoryModels
      .findOne({ position: newCategory.position })
      .exec()
    if (categoryFind) {
      dataResponse.message = t('CATEGORIES_AlreadyExists')
      return res.status(409).send(dataResponse)
    }
    if (positionFind) {
      dataResponse.message = t('CATEGORIES_AlreadyExistsPosition')
      return res.status(409).send(dataResponse)
    }
    //Acciones
    const categoryModel = new categoryModels(newCategory)
    await categoryModel.save()
    dataResponse.message = t('CATEGORIES_CreateCategory')

    dataResponse.data = {
      id: categoryModel._id,
      ...newCategory,
    }
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Función para actualizar una categoria
const updateCategory = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body: newCategory, t } = req
  const idCategory = req.params.idCategory
  try {
    const category = await categoryModels.findById(idCategory).exec()
    const categoryFind = await categoryModels
      .findOne({ name: newCategory.name })
      .exec()
    const positionFind = await categoryModels
      .findOne({ position: newCategory.position })
      .exec()
    //Validaciones
    if (!category) {
      dataResponse.message = t('CATEGORIES_NotFoun')
      return res.status(404).send(dataResponse)
    }
    if (categoryFind?.name && categoryFind.name !== category.name) {
      dataResponse.message = t('CATEGORIES_AlreadyExists')
      return res.status(409).send(dataResponse)
    }
    if (positionFind?.position && positionFind.position !== category.position) {
      dataResponse.message = t('CATEGORIES_AlreadyExistsPosition')
      return res.status(409).send(dataResponse)
    }
    category.name = newCategory.name || category.name
    category.active = newCategory.active || category.active
    category.position = newCategory.position || category.position
    category.updateBy = newCategory.updateBy || category.updateBy
    await category.save()
    dataResponse.message = t('CATEGORIES_UpdateCategory')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Función para desactivar  una categoria (cambio a false)
const deleteCategory = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idCategory = req.params.idCategory
  try {
    const category = await categoryModels.findById(idCategory).exec()
    //Validaciones
    if (!category) {
      dataResponse.message = t('CATEGORIES_NotFoun')
      return res.status(404).send(dataResponse)
    }
    //Acciones
    const newActive = false
    //Se le da el nuevo valor a active de newActive ,la cual es false
    category.active = newActive || newActive
    await category.save()
    dataResponse.message = t('CATEGORIES_DeleteCategory')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

export default {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
