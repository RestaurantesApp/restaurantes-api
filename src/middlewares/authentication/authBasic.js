import auth from 'basic-auth'

const authBasic = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { t } = req
  const user = auth(req)
  const email = user?.name ?? ''
  const password = user?.pass ?? ''
  if (
    !email ||
    !password ||
    email !== process.env.BASIC_AUTH_EMAIL ||
    password !== process.env.BASIC_AUTH_PASSWORD
  ) {
    dataResponse.message = t('RES_Application')
    return res.status(401).send(dataResponse)
  }
  return next()
}

export default authBasic
