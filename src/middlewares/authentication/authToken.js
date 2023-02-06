import { usersModels } from '../../common/models/index.js'
import { jwt } from '../../core/helpers/index.js'

const authToken = async (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  try {
    // Validation token
    const headerToken = req.headers.authorization ?? ''
    if (!headerToken?.toLowerCase().startsWith('bearer')) {
      dataResponse.message = t('RES_InvalidToken')
      return res.status(401).send(dataResponse)
    }
    const token = headerToken.replace('Bearer ', '')
    if (!token) {
      dataResponse.message = t('RES_InvalidToken')
      return res.status(401).send(dataResponse)
    }
    // Validation with JWT
    const userToken = jwt.verifyToken(token)

    // Validation user
    const user = await usersModels.findById(userToken.id).exec()
    if (!user) {
      dataResponse.message = t('RES_InvalidToken')
      return res.status(401).send(dataResponse)
    }
    req.user = userToken
    return next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      dataResponse.message = t('RES_ExpiredToken')
      return res.status(401).send(dataResponse)
    }
    if (error.name === 'JsonWebTokenError') {
      dataResponse.message = t('RES_InvalidToken')
      return res.status(401).send(dataResponse)
    }
    dataResponse.message = t('RES_ServerError')
    return res.status(500).send(dataResponse)
  }
}

export default authToken
