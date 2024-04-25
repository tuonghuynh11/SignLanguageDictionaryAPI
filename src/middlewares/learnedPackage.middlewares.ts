import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { LEARNED_PACKAGE_MESSAGES, LEARNED_WORD_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const learnedPackageSearchValidator = validate(
  checkSchema(
    {
      keywords: {
        isString: true,
        notEmpty: {
          errorMessage: LEARNED_PACKAGE_MESSAGES.KEYWORDS_NOT_BE_EMPTY
        }
      }
    },
    ['query']
  )
)

export const createLearnedPackageValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: true,
        isLength: {
          options: {
            min: 1,
            max: 25
          },
          errorMessage: LEARNED_PACKAGE_MESSAGES.PACKAGE_NAME_LENGTH_MUST_BE_FROM_1_TO_25
        },
        custom: {
          options: async (value, { req }) => {
            const name = value as string
            const isExist = await databaseService.learnedPackage.findOne({ name: name })
            if (isExist) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.PACKAGE_NAME_EXISTED)
            }
            return true
          }
        },
        isString: {
          errorMessage: LEARNED_PACKAGE_MESSAGES.PACKAGE_NAME_MUST_BE_A_STRING
        },
        trim: true
      },
      idUser: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const user_id = value as string
            if (!ObjectId.isValid(user_id)) {
              throw new Error(USERS_MESSAGES.USER_ID_INVALID)
            }
            const isExist = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
            if (!isExist) {
              throw new Error(USERS_MESSAGES.USER_IS_NOT_EXISTED)
            }
          }
        }
      },
      learnedWordIds: {
        optional: true,
        isArray: true,
        custom: {
          options: (value, { req }) => {
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => ObjectId.isValid(item))) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.LEARNED_WORDS_ID_MUST_BE_AN_ARRAY_OF_WORD_OBJECT)
            }
            return true
          }
        }
      },
      process: {
        optional: true,
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            const process = value as number
            if (process < 0) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.PROCESS_IS_GREATER_THAN_0)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const learnedPackageIdValidator = async (req: Request, res: Response, next: NextFunction) => {
  const learned_package_id = req.params.learned_package_id
  if (!ObjectId.isValid(learned_package_id)) {
    return next(
      new ErrorWithStatus({
        message: LEARNED_PACKAGE_MESSAGES.LEARNED_PACKAGE_ID_INVALID,
        status: HTTP_STATUS.BAD_REQUEST
      })
    )
  }
  const packages = await databaseService.learnedPackage.findOne({ _id: new ObjectId(learned_package_id) })
  if (!packages) {
    return next(
      new ErrorWithStatus({
        message: LEARNED_PACKAGE_MESSAGES.LEARNED_PACKAGE_IS_NOT_EXIST,
        status: HTTP_STATUS.CONFLICT
      })
    )
  }
  next()
}
export const addWordLearnedPackageValidator = validate(
  checkSchema(
    {
      wordIds: {
        isArray: true,
        custom: {
          options: (value, { req }) => {
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => ObjectId.isValid(item))) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.MUST_BE_AN_ARRAY_OF_WORD_IDS)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const deleteWordLearnedPackageValidator = validate(
  checkSchema(
    {
      learnedWordIds: {
        notEmpty: true,
        isArray: true,
        custom: {
          options: async (value, { req }) => {
            if (value.length === 0) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.LEARNED_WORDS_NOT_BE_EMPTY)
            }
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => ObjectId.isValid(item))) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.LEARNED_WORDS_MUST_BE_AN_ARRAY_OF_OBJECT_IDS)
            }
            const learnedPackage = await databaseService.learnedPackage.findOne({
              _id: new ObjectId((req.params as any).learned_package_id as string)
            })

            if (
              !value.every(
                (item1: any) =>
                  learnedPackage?.learnedWordIds?.find((item) => item.equals(new ObjectId(item1))) !== undefined
              )
            ) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.LEARNED_WORDS_MUST_BE_AN_ARRAY_OF_LEARNED_WORD_IDS)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updateLearnedPackageValidator = validate(
  checkSchema(
    {
      name: {
        optional: true,
        notEmpty: true,
        isLength: {
          options: {
            min: 1,
            max: 25
          },
          errorMessage: LEARNED_PACKAGE_MESSAGES.PACKAGE_NAME_LENGTH_MUST_BE_FROM_1_TO_25
        },
        custom: {
          options: async (value, { req }) => {
            const name = value as string
            const isExist = await databaseService.learnedPackage.findOne({ name: name })
            if (isExist) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.PACKAGE_NAME_EXISTED)
            }
            return true
          }
        },
        isString: {
          errorMessage: LEARNED_PACKAGE_MESSAGES.PACKAGE_NAME_MUST_BE_A_STRING
        },
        trim: true
      },
      idUser: {
        optional: true,
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const user_id = value as string
            if (!ObjectId.isValid(user_id)) {
              throw new Error(USERS_MESSAGES.USER_ID_INVALID)
            }
            const isExist = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
            if (!isExist) {
              throw new Error(USERS_MESSAGES.USER_IS_NOT_EXISTED)
            }
          }
        }
      },
      learnedWordIds: {
        optional: true,
        isArray: true,
        custom: {
          options: (value, { req }) => {
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => ObjectId.isValid(item))) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.LEARNED_WORDS_ID_MUST_BE_AN_ARRAY_OF_WORD_OBJECT)
            }
            return true
          }
        }
      },
      process: {
        optional: true,
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            const process = value as number
            if (process < 0) {
              throw new Error(LEARNED_PACKAGE_MESSAGES.PROCESS_IS_GREATER_THAN_0)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
