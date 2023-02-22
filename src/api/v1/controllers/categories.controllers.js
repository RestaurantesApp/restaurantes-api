//Controladores para la sessión de categorias
import { categoryModels,usersModels } from '../../../common/models/index.js'

//Función para obtener la lista de categorias
const getCategories = async (req, res) => {}

//Función para obtener la informació de una categoria
const getCategory = async (req, res) => {}

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
      updateBy :'',
    }
    //Validaciones
    const categoryFind = await categoryModels.findOne({ name: newCategory.name }).exec()
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

//Función para actulizar una categoria
const updateCategory = async (req, res) => {}

//Función para eliminar una categoria
const deleteCategory = async (req, res) => {}

export default {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
