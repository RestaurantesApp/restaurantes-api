import { hash } from 'bcrypt'
import { bcryptSalt } from '../../../config/index.js'
import { usersModels } from '../../../common/models/index.js'

//Controlador para traer el perfil del usuario
const getProfile = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idUser = req.params.idUser
  try {
    const user = await usersModels.findById(idUser).exec()
    // Validations
    if (!user) {
      dataResponse.message = t('PROFILE_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (req.user.id !== idUser) {
      dataResponse.message = t('PROFILE_NotChangeProfile')
      return res.status(400).send(dataResponse)
    }
    // Actions
    const userFormat = {
      id: user.id,
      name: user.name,
      email: user.email,
    }
    dataResponse.message = t('PROFILE_GetProfile')
    dataResponse.data = userFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

//Controlador para actualizar el perfil de usuario
const updateProfile = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body: newUser, t } = req
  const idUser = req.params.idUser
  try {
    const user = await usersModels.findById(idUser).exec()
    const userFind = await usersModels.findOne({ email: newUser.email }).exec()

    // Validations
    if (!user) {
      dataResponse.message = t('PROFILE_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (userFind?.email && userFind.email !== user.email) {
      dataResponse.message = t('USERS_AlreadyExists')
      return res.status(400).send(dataResponse)
    }

    if (req.user.id !== idUser) {
      dataResponse.message = t('PROFILE_NotChangeProfile')
      return res.status(409).send(dataResponse)
    }
    // Actions
    let newPassword = ''
    if (newUser.password) {
      newPassword = await hash(newUser.password, bcryptSalt)
    }
    user.name = newUser.name || user.name
    user.email = newUser.email || user.email
    user.password = newPassword || user.password
    await user.save()
    dataResponse.message = t('PROFILE_UpdateProfile')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

export default { getProfile, updateProfile }
