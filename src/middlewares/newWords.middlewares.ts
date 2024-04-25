import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { NewWordStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { NEW_WORD_MESSAGES, WORD_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

const newWordStatus = Object.values(NewWordStatus)
export const paginationNavigator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 1 || num > 100) {
              throw new Error(WORD_MESSAGES.PAGE_SIZE_MAXIMUM_IS_100_AND_MINIMAL_IS_ONE)
            }
            return true
          }
        }
      },
      page: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 1) {
              throw new Error(WORD_MESSAGES.PAGE_IS_ALWAYS_GREATER_THAN_OR_EQUAL_TO_ONE)
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)
export const wordSearchValidator = validate(
  checkSchema(
    {
      keywords: {
        isString: true,
        notEmpty: {
          errorMessage: WORD_MESSAGES.KEYWORDS_NOT_BE_EMPTY
        }
      }
    },
    ['query']
  )
)

export const createNewWordValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isLength: {
        options: {
          min: 1,
          max: 25
        },
        errorMessage: WORD_MESSAGES.WORD_LENGTH_MUST_BE_FROM_1_TO_25
      },
      custom: {
        options: async (value, { req }) => {
          const name = value as string
          const isExist = await databaseService.words.findOne({ name: name })
          if (isExist) {
            throw new Error(WORD_MESSAGES.WORD_EXISTED)
          }
          return true
        }
      },
      isString: {
        errorMessage: WORD_MESSAGES.NAME_MUST_BE_A_STRING
      },

      trim: true
    },
    description: {
      notEmpty: true,
      isLength: {
        options: {
          min: 10,
          max: 200
        },
        errorMessage: WORD_MESSAGES.DESCRIPTION_LENGTH_MUST_BE_FROM_10_TO_200
      },
      isString: {
        errorMessage: WORD_MESSAGES.DESCRIPTION_MUST_BE_A_STRING
      },

      trim: true
    },
    example: {
      isArray: true,
      custom: {
        options: (value, { req }) => {
          //Yêu cầu mỗi phần tử trong array là string
          if (!value.every((item: any) => typeof item === 'string')) {
            throw new Error(WORD_MESSAGES.EXAMPLES_MUST_BE_AN_ARRAY_OF_STRING)
          }
          return true
        }
      }
    },
    videos: {
      isArray: true,
      custom: {
        options: (value, { req }) => {
          //Yêu cầu mỗi phần tử trong array là string
          if (!value.every((item: any) => typeof item === 'string')) {
            throw new Error(WORD_MESSAGES.VIDEOS_MUST_BE_AN_ARRAY_OF_STRING)
          }
          return true
        }
      }
    },
    relativeWords: {
      isArray: true,
      custom: {
        options: (value, { req }) => {
          //Yêu cầu mỗi phần tử trong array là string
          if (!value.every((item: any) => typeof item === 'object')) {
            throw new Error(WORD_MESSAGES.RELATIVES_MUST_BE_AN_ARRAY_OF_WORD_OBJECT)
          }
          return true
        }
      }
    },
    topic: {
      isString: {
        errorMessage: WORD_MESSAGES.TOPIC_MUST_BE_A_STRING
      },
      custom: {
        options: async (value, { req }) => {
          if (value === '') {
            return true
          }
          //Yêu cầu ID Topic phai ton tai trong database
          const isExist = await databaseService.topics.findOne({ _id: new ObjectId(value) })
          if (!isExist) {
            throw new Error(WORD_MESSAGES.TOPIC_NOT_EXISTED)
          }
          return true
        }
      }
    }
  })
)
export const updateNewWordValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: true,
        optional: true,
        isLength: {
          options: {
            min: 1,
            max: 25
          },
          errorMessage: WORD_MESSAGES.WORD_LENGTH_MUST_BE_FROM_1_TO_25
        },
        custom: {
          options: async (value, { req }) => {
            const name = value as string
            const isExist = await databaseService.words.findOne({ name: name })
            if (isExist) {
              throw new Error(WORD_MESSAGES.WORD_EXISTED)
            }
            return true
          }
        },
        isString: {
          errorMessage: WORD_MESSAGES.NAME_MUST_BE_A_STRING
        },

        trim: true
      },
      description: {
        notEmpty: true,
        optional: true,

        isLength: {
          options: {
            min: 10,
            max: 200
          },
          errorMessage: WORD_MESSAGES.DESCRIPTION_LENGTH_MUST_BE_FROM_10_TO_200
        },
        isString: {
          errorMessage: WORD_MESSAGES.DESCRIPTION_MUST_BE_A_STRING
        },

        trim: true
      },
      example: {
        isArray: true,
        optional: true,

        custom: {
          options: (value, { req }) => {
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => typeof item === 'string')) {
              throw new Error(WORD_MESSAGES.EXAMPLES_MUST_BE_AN_ARRAY_OF_STRING)
            }
            return true
          }
        }
      },
      videos: {
        isArray: true,
        optional: true,

        custom: {
          options: (value, { req }) => {
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => typeof item === 'string')) {
              throw new Error(WORD_MESSAGES.VIDEOS_MUST_BE_AN_ARRAY_OF_STRING)
            }
            return true
          }
        }
      },
      relativeWords: {
        isArray: true,
        optional: true,

        custom: {
          options: (value, { req }) => {
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => typeof item === 'object')) {
              throw new Error(WORD_MESSAGES.RELATIVES_MUST_BE_AN_ARRAY_OF_WORD_OBJECT)
            }
            return true
          }
        }
      },
      topic: {
        isString: {
          errorMessage: WORD_MESSAGES.TOPIC_MUST_BE_A_STRING
        },
        optional: true,

        custom: {
          options: async (value, { req }) => {
            if (value === '') {
              return true
            }
            //Yêu cầu ID Topic phai ton tai trong database
            const isExist = await databaseService.topics.findOne({ _id: new ObjectId(value) })
            if (isExist) {
              throw new Error(WORD_MESSAGES.TOPIC_NOT_EXISTED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const newWordDeleteValidator = validate(
  checkSchema(
    {
      new_word_id: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const new_word_id = value as string
            if (!ObjectId.isValid(new_word_id)) {
              throw new Error(NEW_WORD_MESSAGES.NEW_WORD_ID_INVALID)
            }
            const isExist = await databaseService.newWord.findOne({ _id: new ObjectId(new_word_id) })
            if (!isExist) {
              throw new Error(NEW_WORD_MESSAGES.NEW_WORD_IS_NOT_EXISTED)
            }
          }
        }
      }
    },
    ['params']
  )
)

export const newWordStatusValidator = async (req: Request, res: Response, next: NextFunction) => {
  const new_word_id = req.params.new_word_id
  const newWord = await databaseService.newWord.findOne({ _id: new ObjectId(new_word_id) })
  if (newWord?.status?.toString() !== NewWordStatus.Rejected) {
    return next(
      new ErrorWithStatus({
        message: NEW_WORD_MESSAGES.NEW_WORD_IS_NOT_IN_REJECT_STATUS,
        status: HTTP_STATUS.CONFLICT
      })
    )
  }
  next()
}
export const updateNewWordStatusValidator = validate(
  checkSchema(
    {
      status: {
        notEmpty: true,
        isNumeric: true,
        isIn: {
          options: [newWordStatus],
          errorMessage: NEW_WORD_MESSAGES.INVALID_NEW_WORD_STATUS
        }
      }
    },
    ['body']
  )
)
