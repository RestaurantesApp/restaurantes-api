import { hash } from 'bcrypt'
import { bcryptSalt } from '../../../config/index.js'
import { permissionsModels, usersModels } from '../../../common/models/index.js'
import { Roles } from '../../../common/types/index.js'

const getUsers = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  try {
    const users = await usersModels.find().exec()
    const usersFormat = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    }))
    dataResponse.message = t('USERS_GetUsers')
    dataResponse.data = usersFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

const getUser = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idUser = req.params.idUser
  try {
    const user = await usersModels.findById(idUser).exec()

    // Validations
    if (!user) {
      dataResponse.message = t('USERS_NotFound')
      return res.status(404).send(dataResponse)
    }

    // Actions
    const userFormat = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    }
    dataResponse.message = t('USERS_GetUser')
    dataResponse.data = userFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

const createUser = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const newUser = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
      permissions: [],
    }

    // Validations
    const userFind = await usersModels.findOne({ email: newUser.email }).exec()
    if (userFind) {
      dataResponse.message = t('USERS_AlreadyExists')
      return res.status(409).send(dataResponse)
    }

    // Actions
    newUser.password = await hash(newUser.password, bcryptSalt)
    const userModel = new usersModels(newUser)
    const { password, ...userProfile } = newUser
    await userModel.save()
    dataResponse.message = t('USERS_CreateUser')
    dataResponse.data = {
      id: userModel._id,
      ...userProfile,
    }
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

const updateUser = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body: newUser, t } = req
  const idUser = req.params.idUser
  try {
    const user = await usersModels.findById(idUser).exec()
    const userSuperAdmin = await usersModels
      .findOne({ email: process.env.BASIC_AUTH_EMAIL })
      .exec()
    const userFind = await usersModels.findOne({ email: newUser.email }).exec()

    // Validations
    if (!user) {
      dataResponse.message = t('USERS_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (userFind?.email && userFind.email !== user.email) {
      dataResponse.message = t('USERS_AlreadyExists')
      return res.status(409).send(dataResponse)
    }
    if (user.role === Roles.SuperAdmin && req.user.role !== Roles.SuperAdmin) {
      dataResponse.message = t('USERS_EditSuperAdmin')
      return res.status(400).send(dataResponse)
    }
    if (req.user.id === idUser && req.user.role !== newUser.role) {
      dataResponse.message = t('USERS_NotChangeRoleYourself')
      return res.status(400).send(dataResponse)
    }
    if (idUser === userSuperAdmin.id) {
      dataResponse.message = t('USERS_EditThisUser')
      return res.status(400).send(dataResponse)
    }

    // Actions
    let newPassword = ''
    if (newUser.password) {
      newPassword = await hash(newUser.password, bcryptSalt)
    }
    user.name = newUser.name || user.name
    user.email = newUser.email || user.email
    user.password = newPassword || user.password
    user.role = newUser.role || user.role
    await user.save()
    dataResponse.message = t('USERS_UpdateUser')
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

const deleteUser = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const idUser = req.params.idUser
  try {
    const user = await usersModels.findById(idUser).exec()
    const userSuperAdmin = await usersModels
      .findOne({ email: process.env.BASIC_AUTH_EMAIL })
      .exec()

    // Validations
    if (!user) {
      dataResponse.message = t('USERS_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (user.email === req.user.email) {
      dataResponse.message = t('USERS_DeletYourself')
      return res.status(400).send(dataResponse)
    }
    if (user.role === Roles.SuperAdmin && req.user.role !== Roles.SuperAdmin) {
      dataResponse.message = t('USERS_DeleteSuperAdmin')
      return res.status(400).send(dataResponse)
    }
    if (idUser === userSuperAdmin.id) {
      dataResponse.message = t('USERS_DeleteThisUser')
      return res.status(400).send(dataResponse)
    }

    // Actions
    const userFormat = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions ?? [],
    }
    await user.remove()
    dataResponse.message = t('USERS_DeleteUser')
    dataResponse.data = userFormat
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

const assignPermission = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  const idUser = req.params.idUser
  const { idPermission } = body
  try {
    const user = await usersModels.findById(idUser).exec()
    const permission = await permissionsModels.findById(idPermission).exec()

    // Validations
    if (!user) {
      dataResponse.message = t('USERS_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (!permission) {
      dataResponse.message = t('Permissions_NotFound')
      return res.status(404).send(dataResponse)
    }
    const permissionFind = user.permissions.find(
      permission => permission.id.toString() === idPermission,
    )
    if (permissionFind) {
      dataResponse.message = t('USERS_AlreadyAssignPermission')
      return res.status(409).send(dataResponse)
    }
    if (user.role === Roles.SuperAdmin) {
      dataResponse.message = t('USERS_PermissionSuperAdmin')
      return res.status(400).send(dataResponse)
    }

    // Actions
    user.permissions.push({
      id: permission._id,
      path: permission.path,
      method: permission.method,
    })
    await user.save()
    dataResponse.message = t('USERS_AssignPermission')
    dataResponse.data = permission
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

const removePermission = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  const idUser = req.params.idUser
  const { idPermission } = body
  try {
    const user = await usersModels.findById(idUser).exec()
    const permission = await permissionsModels.findById(idPermission).exec()

    // Validations
    if (!user) {
      dataResponse.message = t('USERS_NotFound')
      return res.status(404).send(dataResponse)
    }
    if (!permission) {
      dataResponse.message = t('Permissions_NotFound')
      return res.status(404).send(dataResponse)
    }
    const permissionFind = user.permissions.find(
      permission => permission.id.toString() === idPermission,
    )
    if (!permissionFind) {
      dataResponse.message = t('USERS_AlreadyRemovePermission')
      return res.status(409).send(dataResponse)
    }

    // Actions
    const permissionIndex = user.permissions.findIndex(
      permission => permission.id.toString() === idPermission,
    )
    user.permissions.splice(permissionIndex, 1)
    await user.save()
    dataResponse.message = t('USERS_RemovePermission')
    dataResponse.data = permission
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  assignPermission,
  removePermission,
}
