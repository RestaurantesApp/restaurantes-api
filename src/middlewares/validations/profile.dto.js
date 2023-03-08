import { Type } from '@sinclair/typebox'
import { validateAJV } from '../../core/helpers/index.js'

//Controlador para actualizar la información del perfil (name,email y password)
const updateProfile = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req

  try {
    const updateProfileShema = Type.Object(
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
      },
      {
        additionalProperties: false,
        errorMessage: {
          type: t('VALID_Object'),
          additionalProperties: t('VALID_FormatObject'),
        },
      },
    )
    validateAJV(body, updateProfileShema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

export default { updateProfile }
