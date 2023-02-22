import { Type } from '@sinclair/typebox'
import { validateAJV } from '../../core/helpers/index.js'

//Validaciones para crear una categoria
const createCategory = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req

  try {
    const createCategoryShema = Type.Object(
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
        position: Type.Number({
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
            position: t('REQUIRED_Position'),
            createBy: t('REQUIRED_UserById'),
          },
        },
      },
    )
    validateAJV(body, createCategoryShema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

//Validaciones para actualizar una categoria
const updateCategory = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req

  try {
    const updateCategoryShema = Type.Object(
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
        position: Type.Optional(
          Type.Number({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_Number'),
            },
          }),
        ),
        updateBy: Type.Optional(
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
    validateAJV(body, updateCategoryShema)
  } catch (error) {
    //Por si las cosas estan yendo mal :c
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

export default { createCategory, updateCategory }
