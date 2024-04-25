import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { LEARNED_WORD_MESSAGES, USERS_MESSAGES, WORD_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const updateLearnedWordProcessValidator = validate(
  checkSchema(
    {
      process: {
        notEmpty: true,
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            const process = value as number
            const learned_word_id = req.learned_word_id

            const learnedWord = await databaseService.learnedWord.findOne({ _id: new ObjectId(learned_word_id) })
            if (learnedWord?.process === 100) {
              throw new Error(LEARNED_WORD_MESSAGES.WORD_IS_FINISHED_LEARNING)
            }
            if ((learnedWord?.process as number) + process > 100) {
              throw new Error(LEARNED_WORD_MESSAGES.PROCESS_IS_GREATER_THAN_100)
            }
          }
        }
      }
    },
    ['body', 'params']
  )
)
export const learnedWordIdValidator = validate(
  checkSchema(
    {
      learned_word_id: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const learned_word_id = value as string
            if (!ObjectId.isValid(learned_word_id)) {
              throw new Error(LEARNED_WORD_MESSAGES.LEARNED_WORD_ID_INVALID)
            }
            const isExist = await databaseService.learnedWord.findOne({ _id: new ObjectId(learned_word_id) })
            if (!isExist) {
              throw new Error(LEARNED_WORD_MESSAGES.LEARNED_WORD_IS_NOT_EXISTED)
            }
            req.learned_word_id = learned_word_id
          }
        }
      }
    },
    ['params']
  )
)
export const createLearnedWordValidator = validate(
  checkSchema(
    {
      idWord: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const word_id = value as string
            if (!ObjectId.isValid(word_id)) {
              throw new Error(WORD_MESSAGES.WORD_ID_INVALID)
            }
            const isExist = await databaseService.words.findOne({ _id: new ObjectId(word_id) })
            if (!isExist) {
              throw new Error(WORD_MESSAGES.WORD_IS_NOT_EXISTED)
            }
          }
        }
      },
      idUser: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const user_id = value as string
            const word_id = req.body.idWord
            if (!ObjectId.isValid(user_id)) {
              throw new Error(USERS_MESSAGES.USER_ID_INVALID)
            }
            const isExist = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
            if (!isExist) {
              throw new Error(USERS_MESSAGES.USER_IS_NOT_EXISTED)
            }
            const isLearnedWordExist = await databaseService.learnedWord.findOne({
              idUser: new ObjectId(user_id),
              idWord: new ObjectId(word_id)
            })
            if (isLearnedWordExist) {
              throw new Error(LEARNED_WORD_MESSAGES.WORD_ALREADY_EXISTED)
            }
          }
        }
      }
    },
    ['body']
  )
)
