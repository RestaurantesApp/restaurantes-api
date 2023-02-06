import { compare } from 'bcrypt'
import { usersModels } from '../../../common/models/index.js'
import { Methods, Paths } from '../../../common/types/index.js'
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
    dataResponse.message = t('USERS_Login')
    dataResponse.data = {
      user: {
        ...userFormat,
        name: user.name,
        permissions: user.permissions,
      },
      paths: Object.values(Paths),
      methods: Object.values(Methods),
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
