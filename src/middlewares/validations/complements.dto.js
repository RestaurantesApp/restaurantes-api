import { Type } from '@sinclair/typebox'
import { validateAJV } from '../../core/helpers/index.js'

const createComplement = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const createComplementsSchema = Type.Object(
      {
        name: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
        active: Type.Boolean({
          errorMessage: {
            type: t('VALID_Boolean'),
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
            active: t('REQUIRED_Active'),
            createBy: t('REQUIRED_CreateBy'),
          },
        },
      },
    )
    validateAJV(body, createComplementsSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

const updateComplement = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const updateComplementsSchema = Type.Object(
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
            errorMessage: {
              type: t('VALID_Boolean'),
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
    validateAJV(body, updateComplementsSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}
export default { createComplement, updateComplement }
