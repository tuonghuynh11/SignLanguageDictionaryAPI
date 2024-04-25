import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { FAVORITE_WORD, WORD_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/models/requests/User.requests'
import Word from '~/models/schemas/Word.schema'
import databaseService from '~/services/database.services'
import wordService from '~/services/words.services'
import { validate } from '~/utils/validation'
export const addNewFavoriteWordValidator = validate(
  checkSchema(
    {
      word_id: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const { user_id } = req.decoded_authorization as TokenPayload
            const word_id = value as string
            if (!ObjectId.isValid(word_id)) {
              throw new Error(WORD_MESSAGES.WORD_ID_INVALID)
            }
            const isExist = await databaseService.words.findOne({ _id: new ObjectId(word_id) })
            if (!isExist) {
              throw new Error(WORD_MESSAGES.WORD_IS_NOT_EXISTED)
            }
            const myFavoriteWordIds = await databaseService.favoriteWord.findOne({
              idUser: new ObjectId(user_id)
            })
            const isExistInFavorites = myFavoriteWordIds?.words.filter((wordId) => wordId.equals(new ObjectId(word_id)))
            if (isExistInFavorites && isExistInFavorites.length > 0) {
              throw new Error(FAVORITE_WORD.WORD_IS_EXISTED_IN_FAVORITES)
            }
          }
        }
      }
    },
    ['params']
  )
)
export const favoriteWordDeleteValidator = validate(
  checkSchema(
    {
      word_id: {
        notEmpty: true,
        isString: true,
        custom: {
          options: async (value, { req }) => {
            const { user_id } = req.decoded_authorization as TokenPayload
            const word_id = value as string
            if (!ObjectId.isValid(word_id)) {
              throw new Error(WORD_MESSAGES.WORD_ID_INVALID)
            }
            const isExist = await databaseService.words.findOne({ _id: new ObjectId(word_id) })
            if (!isExist) {
              throw new Error(WORD_MESSAGES.WORD_IS_NOT_EXISTED)
            }
            const myFavoriteWordIds = await databaseService.favoriteWord.findOne({
              idUser: new ObjectId(user_id)
            })
            const isExistInFavorites = myFavoriteWordIds?.words.filter((wordId) => wordId.equals(new ObjectId(word_id)))
            if (!isExistInFavorites || isExistInFavorites.length === 0) {
              throw new Error(FAVORITE_WORD.WORD_NOT_EXISTED_IN_FAVORITES)
            }
          }
        }
      }
    },
    ['params']
  )
)
