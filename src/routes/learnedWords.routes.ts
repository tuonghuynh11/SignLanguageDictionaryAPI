import { Router } from 'express'
import {
  createLearnedWordController,
  deleteLearnedWordController,
  getLearnedWordOfUserController,
  searchLearnedWordController,
  updateLearnedWordProcessController
} from '~/controllers/learnedWords.controllers'
import {
  createWordController,
  deleteWordController,
  getWordDetailController,
  searchWordController,
  updateWordController
} from '~/controllers/words.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  createLearnedWordValidator,
  learnedWordIdValidator,
  updateLearnedWordProcessValidator
} from '~/middlewares/learnedWords.middlewares'
import { accessTokenValidator, verifiedUSerValidator } from '~/middlewares/users.middlewares'
import {
  createWordValidator,
  paginationNavigator,
  updateWordValidator,
  wordDeleteValidator,
  wordSearchValidator
} from '~/middlewares/words.middlewares'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import { wrapRequestHandler } from '~/utils/handles'

const learnedWordsRouter = Router()

/**
 * Description: Update process learned of a word
 * Path: /update-process/:learned_word_id
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Body:{process:number}
 * **/
learnedWordsRouter.patch(
  '/update-process/:learned_word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  learnedWordIdValidator,
  updateLearnedWordProcessValidator,
  wrapRequestHandler(updateLearnedWordProcessController)
)
/**
 * Description: Get All learned words of user
 * Path: /? page=1&limit=10
 * Method: GET
 * **/
learnedWordsRouter.get(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  wrapRequestHandler(getLearnedWordOfUserController)
)

/**
 * Description: Search learned words by keywords
 * Path: /search?keywords = "" &page = 1 &limit = 10
 * Method: GET
 * **/
learnedWordsRouter.get(
  '/search',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  wrapRequestHandler(searchLearnedWordController)
)

/**
 * Description: Add new learned word
 * Path: /
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body: LearnedWordRequestBody
 *
 * **/
learnedWordsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  createLearnedWordValidator,
  wrapRequestHandler(createLearnedWordController)
)

/**
 * Description: Delete a learned word
 * Path: /:learned_word_id
 * Method: DELETE
 * Header:{Authorization:Bearer <access_token>}
 * Body:WordSchema
 * **/
learnedWordsRouter.delete(
  '/:learned_word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  learnedWordIdValidator,
  wrapRequestHandler(deleteLearnedWordController)
)
export default learnedWordsRouter
