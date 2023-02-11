import { compare } from 'bcrypt'
import { usersModels } from '../../../common/models/index.js'
import { Methods, Paths, Roles } from '../../../common/types/index.js'
import { jwt } from '../../../core/helpers/index.js'

const login = async (req, res) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const newUser = {
      email: body.email,
      password: body.password,
    }

    // Validations
    const user = await usersModels.findOne({ email: newUser.email }).exec()
    if (!user) {
      dataResponse.message = t('RES_InvalidCredentials')
      return res.status(401).send(dataResponse)
    }
    const checkPassword = await compare(newUser.password, user.password)
    if (!checkPassword) {
      dataResponse.message = t('RES_InvalidCredentials')
      return res.status(401).send(dataResponse)
    }

    // Actions
    const userFormat = {
      id: user.id,
      email: user.email,
      role: user.role,
    }
    const token = jwt.generateToken(userFormat)
    const paths = [
      { id: Paths.users, label: t('PATHS_Users') },
      { id: Paths.permissions, label: t('PATHS_Permissions') },
    ]
    const methods = [
      { id: Methods.get, label: t('METHODS_GET') },
      { id: Methods.post, label: t('METHODS_POST') },
      { id: Methods.patch, label: t('METHODS_PATCH') },
      { id: Methods.delete, label: t('METHODS_DELETE') },
    ]
    const roles = [
      { id: Roles.SuperAdmin, label: t('ROLES_SuperAdmin') },
      { id: Roles.Admin, label: t('ROLES_Admin') },
      { id: Roles.user, label: t('ROLES_User') },
    ]
    dataResponse.message = t('USERS_Login')
    dataResponse.data = {
      user: {
        ...userFormat,
        name: user.name,
        permissions: user.permissions,
      },
      paths,
      methods,
      roles,
      token,
    }
    return res.status(200).send(dataResponse)
  } catch (error) {
    dataResponse.message = t('RES_ServerError')
    dataResponse.data = error
    return res.status(500).send(dataResponse)
  }
}

export default { login }
