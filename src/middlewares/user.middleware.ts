import { Request } from 'express'
import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { ErrorWithMessage } from '~/models/Error'
import { databaseService } from '~/services/databases.service'
import { usersService } from '~/services/user.service'
import { verifyToken } from '~/utills/jwt'
import { validate } from '~/utills/validation'

export const registerValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: { errorMessage: 'Email is invalid' },
        trim: true,
        custom: {
          options: async (value) => {
            if (await usersService.checkEmailExist(value)) {
              throw new Error('Email already exist')
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: { errorMessage: 'Email is invalid' },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.user.findOne({ email: value, password: req.body.password })
            if (user === null) {
              throw new Error('Account not found')
            }
            req.user = user
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithMessage({
                status: 401,
                message: 'Access token not found'
              })
            }
            const access_token = value.split(' ')[1]
            if (!access_token)
              throw new ErrorWithMessage({
                status: 401,
                message: 'Access token not found'
              })
            try {
              const decoded_access_token = await verifyToken({
                token: access_token,
                privateKey: '12344321!@#123!@#'
              })
              ;(req as Request).decoded_access_token = decoded_access_token
            } catch (error) {
              throw new ErrorWithMessage({
                status: 401,
                message: (error as JsonWebTokenError).message
              })
            }
          }
        }
      }
    },
    ['headers']
  )
)
