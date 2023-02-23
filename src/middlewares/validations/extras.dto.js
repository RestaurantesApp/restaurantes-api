import { Type } from '@sinclair/typebox'
import { validateAJV } from '../../core/helpers/index.js'

//Validaciones iniciales para crear un extra
const createExtra = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const createExtraShema = Type.Object(
      {
        name: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
        active: Type.Boolean({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_Boolean'),
          },
        }),
        price: Type.Number({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_Number'),
          },
        }),
        createBy: Type.String({
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
            active: t('REQUIRED_Status'),
            price: t('REQUIRED_Price'),
            createBy: t('REQUIRED_UserById'),
          },
        },
      },
    )
    validateAJV(body, createExtraShema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

//Validaciones iniciales para actualizar un extra
const updateExtra = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const updateExtraShema = Type.Object(
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
        active: Type.Optional(
          Type.Boolean({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_String'),
            },
          }),
        ),
        price: Type.Optional(
          Type.Number({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_Number'),
            },
          }),
        ),
        updateBy: Type.String({
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
        },
      },
    )
    validateAJV(body, updateExtraShema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

export default { createExtra, updateExtra }
