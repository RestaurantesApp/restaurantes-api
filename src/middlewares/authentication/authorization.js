import { usersModels } from '../../common/models/index.js'
import { Roles } from '../../common/types/index.js'

const authorization = async (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const userToken = req.user
  const { t } = req
  if (userToken.role === Roles.SuperAdmin) return next()
  const paths = req.baseUrl.split('/')
  const path = paths[paths.length - 1]
  const method = req.method
  const user = await usersModels.findById(userToken.id).exec()
  const permission = user?.permissions.find(
    permission => permission.path === path && permission.method === method,
  )
  if (!permission) {
    dataResponse.message = t('RES_Forbiden')
    return res.status(403).send(dataResponse)
  }
  return next()
}

export default authorization
