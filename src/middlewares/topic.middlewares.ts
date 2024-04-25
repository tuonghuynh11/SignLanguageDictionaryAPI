import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { TOPICS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const topicIdValidator = validate(
  checkSchema(
    {
      topic_id: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const topic_id = value as string
            if (!ObjectId.isValid(topic_id)) {
              throw new Error(TOPICS_MESSAGES.TOPIC_ID_INVALID)
            }
            const isExist = await databaseService.topics.findOne({ _id: new ObjectId(topic_id) })
            if (!isExist) {
              throw new Error(TOPICS_MESSAGES.TOPIC_IS_NOT_EXISTED)
            }
          }
        }
      }
    },
    ['params']
  )
)
export const createTopicValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isLength: {
        options: {
          min: 1,
          max: 25
        },
        errorMessage: TOPICS_MESSAGES.TOPIC_LENGTH_MUST_BE_FROM_1_TO_25
      },
      custom: {
        options: async (value, { req }) => {
          const name = value as string
          const isExist = await databaseService.topics.findOne({ name: name })
          if (isExist) {
            throw new Error(TOPICS_MESSAGES.TOPIC_EXISTED)
          }
          return true
        }
      },
      isString: {
        errorMessage: TOPICS_MESSAGES.NAME_MUST_BE_A_STRING
      },

      trim: true
    },

    words: {
      isArray: true,
      custom: {
        options: (value, { req }) => {
          //Yêu cầu mỗi phần tử trong array là string
          if (!value.every((item: any) => typeof item === 'string')) {
            throw new Error(TOPICS_MESSAGES.WORDS_MUST_BE_AN_ARRAY_OF_OBJECTID)
          }
          return true
        }
      }
    }
  })
)
export const updateTopicValidator = validate(
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
          errorMessage: TOPICS_MESSAGES.TOPIC_LENGTH_MUST_BE_FROM_1_TO_25
        },
        custom: {
          options: async (value, { req }) => {
            const name = value as string
            const isExist = await databaseService.topics.findOne({ name: name })
            if (isExist) {
              throw new Error(TOPICS_MESSAGES.TOPIC_EXISTED)
            }
            return true
          }
        },
        isString: {
          errorMessage: TOPICS_MESSAGES.NAME_MUST_BE_A_STRING
        },

        trim: true
      },

      words: {
        optional: true,
        isArray: true,
        custom: {
          options: (value, { req }) => {
            //Yêu cầu mỗi phần tử trong array là string
            if (!value.every((item: any) => typeof item === 'string')) {
              throw new Error(TOPICS_MESSAGES.WORDS_MUST_BE_AN_ARRAY_OF_OBJECTID)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const topicDeleteValidator = validate(
  checkSchema(
    {
      topic_id: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const topic_id = value as string
            if (!ObjectId.isValid(topic_id)) {
              throw new Error(TOPICS_MESSAGES.TOPIC_ID_INVALID)
            }
            const isExist = await databaseService.topics.findOne({ _id: new ObjectId(topic_id) })
            if (!isExist) {
              throw new Error(TOPICS_MESSAGES.TOPIC_IS_NOT_EXISTED)
            }
          }
        }
      }
    },
    ['params']
  )
)
