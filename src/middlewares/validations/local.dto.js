import { Type } from '@sinclair/typebox'
import { validateAJV } from '../../core/helpers/index.js'

const createLocal = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const createLocalSchema = Type.Object(
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
        phoneNumber: Type.String({
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
        address: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
        image: Type.String({
          isNotEmpty: true,
          errorMessage: {
            isNotEmpty: t('VALID_NotEmpty'),
            type: t('VALID_String'),
          },
        }),
        location: Type.Object(
          {
            latitud: Type.Number({
              errorMessage: {
                type: t('VALID_Number'),
              },
            }),
            longitud: Type.Number({
              errorMessage: {
                type: t('VALID_Number'),
              },
            }),
          },
          {
            errorMessage: {
              type: t('VALID_Object'),
            },
          },
        ),
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
            email: t('REQUIRED_Email'),
            address: t('REQUIRED_Address'),
            phoneNumber: t('REQUIRED_Phone'),
            image: t('REQUIRED_Image'),
            location: t('REQUIRED_Location'),
            latitud: t('REQUIRED_Latitud'),
            longitud: t('REQUIRED_Longitud'),
            createBy: t('REQUIRED_CreateBy'),
          },
        },
      },
    )
    validateAJV(body, createLocalSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

const updateLocal = (req, res, next) => {
  const dataResponse = { message: '', data: null }
  const { body, t } = req
  try {
    const updateLocalsSchema = Type.Object(
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
        phoneNumber: Type.Optional(
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
        address: Type.Optional(
          Type.String({
            isNotEmpty: true,
            errorMessage: {
              isNotEmpty: t('VALID_NotEmpty'),
              type: t('VALID_String'),
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
        location: Type.Optional(
          Type.Object(
            {
              latitud: Type.Number({
                errorMessage: {
                  type: t('VALID_Number'),
                },
              }),
              longitud: Type.Number({
                errorMessage: {
                  type: t('VALID_Number'),
                },
              }),
            },
            {
              errorMessage: {
                type: t('VALID_Object'),
              },
            },
          ),
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
    validateAJV(body, updateLocalsSchema)
  } catch (error) {
    dataResponse.message = t('RES_InvalidDataFormat')
    dataResponse.data = error
    return res.status(400).send(dataResponse)
  }
  return next()
}

export default { createLocal, updateLocal }
