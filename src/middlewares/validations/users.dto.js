import { Type } from '@sinclair/typebox'
import { validateAJV } from '../../core/helpers/index.js'

const createUser = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const createUserSchema = Type.Object(
      {
        name: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
        email: Type.String({
          format: 'email',
          errorMessage: {
            type: t('VALID_String'),
            format: t('VALID_Email'),
          },
        }),
        password: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
        role: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
      },
      {
        additionalProperties: false,
        errorMessage: {
          type: t('VALID_Object'),
          additionalProperties: t('VALID_FormatObject'),
          required: {
            name: t('REQUIRED_Name'),
            email: t('REQUIRED_Email'),
            password: t('REQUIRED_Password'),
            role: t('REQUIRED_Role'),
          },
        },
      },
    )
    validateAJV(body, createUserSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

const updateUser = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const updateUserSchema = Type.Object(
      {
        name: Type.Optional(
          Type.String({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_String'),
            },
          }),
        ),
        email: Type.Optional(
          Type.String({
            format: 'email',
            errorMessage: {
              type: t('VALID_String'),
              format: t('VALID_Email'),
            },
          }),
        ),
        password: Type.Optional(
          Type.String({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_String'),
            },
          }),
        ),
        role: Type.Optional(
          Type.String({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_String'),
            },
          }),
        ),
      },
      {
        additionalProperties: false,
        errorMessage: {
          type: t('VALID_Object'),
          additionalProperties: t('VALID_FormatObject'),
        },
      },
    )
    validateAJV(body, updateUserSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

const login = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const loginSchema = Type.Object(
      {
        email: Type.String({
          format: 'email',
          errorMessage: {
            type: t('VALID_String'),
            format: t('VALID_Email'),
          },
        }),
        password: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
      },
      {
        additionalProperties: false,
        errorMessage: {
          type: t('VALID_Object'),
          additionalProperties: t('VALID_FormatObject'),
          required: {
            email: t('REQUIRED_Email'),
            password: t('REQUIRED_Password'),
          },
        },
      },
    )
    validateAJV(body, loginSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

export default { createUser, updateUser, login }
