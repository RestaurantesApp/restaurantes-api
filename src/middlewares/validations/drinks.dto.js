import { Type } from '@sinclair/typebox'
import { validateAJV } from '../../core/helpers/index.js'

const createDrink = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const createDrinksSchema = Type.Object(
      {
        name: Type.String({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_String'),
            },
          }),
        active: Type.Boolean({
          isNotEmpty: false,
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
        image: Type.String({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_String'),
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
           price: t('REQUIRED_Price'),
           image: t('REQUIRED_Image'),
           createBy: t('REQUIRED_CreateBy'),
          },
        },
      },
    )
    validateAJV(body, createDrinksSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

const updateDrink = (req, res, next) => {
    const dataResponse = { message: '', data: null }
    const { body, t } = req
    try {
      const updateDrinksSchema = Type.Object(
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
          price: Type.Optional(
            Type.Number({
              isNotEmpty: true,
              errorMessage: {
                isNotEmpty: t('VALID_NotEmpty'),
                type: t('VALID_Number'),
              },
            }),
          ),
          image: Type.Optional(
            Type.String({
              isNotEmpty: true,
              errorMessage: {
                isNotEmpty: t('VALID_NotEmpty'),
                type: t('VALID_String'),
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
      validateAJV(body, updateDrinksSchema)
    } catch (error) {
      dataResponse.message = t('RES_InvalidDataFormat')
      dataResponse.data = error
      return res.status(400).send(dataResponse)
    }
    return next()
  }

export default { createDrink, updateDrink }