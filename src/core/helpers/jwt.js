import jwt from 'jsonwebtoken'
import { jwtSingOptions, jwtVerifyOptions } from '../../config/index.js'
import { privateKeyFile, publicKeyFile } from '../../common/constants/index.js'

const generateToken = payload => {
  let token = ''
  try {
    const key = {
      key: privateKeyFile,
      passphrase: process.env.JWT_PASSPHRASE ?? '',
    }
    token = jwt.sign(payload, key, jwtSingOptions)
  } catch (error) {
    throw { name: 'AsymmetricEncryptionError', data: error }
  }
  return token
}

const verifyToken = token => {
  const tokenVerificated = jwt.verify(token, publicKeyFile, jwtVerifyOptions)
  const userToken = {
    id: tokenVerificated.id,
    email: tokenVerificated.email,
    role: tokenVerificated.role,
  }
  return userToken
}

export default { generateToken, verifyToken }
