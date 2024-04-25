import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { FeedbackStatus } from '~/constants/enums'
import { FEEDBACK_MESSAGES, TOPICS_MESSAGES, USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
const feedbackStatus = Object.values(FeedbackStatus)
export const feedbackIdValidator = validate(
  checkSchema(
    {
      feedback_id: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const feedback_id = value as string
            if (!ObjectId.isValid(feedback_id)) {
              throw new Error(FEEDBACK_MESSAGES.FEEDBACK_ID_INVALID)
            }
            const isExist = await databaseService.feedBack.findOne({ _id: new ObjectId(feedback_id) })
            if (!isExist) {
              throw new Error(FEEDBACK_MESSAGES.FEEDBACK_IS_NOT_EXISTED)
            }
          }
        }
      }
    },
    ['params']
  )
)
export const createFeedbackValidator = validate(
  checkSchema(
    {
      firstName: {
        notEmpty: true,
        isLength: {
          options: {
            min: 1,
            max: 200
          },
          errorMessage: FEEDBACK_MESSAGES.FIRST_NAME_LENGTH_MUST_BE_FROM_10_TO_200
        },
        isString: {
          errorMessage: FEEDBACK_MESSAGES.FIRST_NAME_MUST_BE_A_STRING
        },

        trim: true
      },
      lastName: {
        notEmpty: true,
        isLength: {
          options: {
            min: 1,
            max: 200
          },
          errorMessage: FEEDBACK_MESSAGES.LAST_NAME_LENGTH_MUST_BE_FROM_10_TO_200
        },
        isString: {
          errorMessage: FEEDBACK_MESSAGES.LAST_NAME_MUST_BE_A_STRING
        },
        trim: true
      },
      email: {
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_NOT_VALID
        },
        trim: true
      },
      message: {
        notEmpty: true,
        isLength: {
          options: {
            min: 10,
            max: 500
          },
          errorMessage: FEEDBACK_MESSAGES.MESSAGE_LENGTH_MUST_BE_FROM_10_TO_500
        },
        isString: {
          errorMessage: FEEDBACK_MESSAGES.MESSAGE_MUST_BE_A_STRING
        },
        trim: true
      }
    },
    ['body']
  )
)

export const updateFeedbackStatusValidator = validate(
  checkSchema(
    {
      status: {
        optional: true,
        isNumeric: true,
        isIn: {
          options: [feedbackStatus],
          errorMessage: FEEDBACK_MESSAGES.INVALID_FEEDBACK_STATUS
        }
      }
    },
    ['body']
  )
)

export const feedbackStatusValidator = validate(
  checkSchema(
    {
      status: {
        optional: true,
        isNumeric: true,
        isIn: {
          options: [feedbackStatus],
          errorMessage: FEEDBACK_MESSAGES.INVALID_FEEDBACK_STATUS
        }
      }
    },
    ['query']
  )
)
