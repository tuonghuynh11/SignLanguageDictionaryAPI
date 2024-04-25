import { Router } from 'express'
import {
  createWordController,
  deleteWordController,
  getWordDetailController,
  searchWordController,
  updateWordController
} from '~/controllers/words.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
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

const wordsRouter = Router()
/**
 * Description: Get Word Detail by ID
 * Path: /search/:id
 * Method: GET
 * **/
wordsRouter.get('/detail/:word_id', wordDeleteValidator, wrapRequestHandler(getWordDetailController))

/**
 * Description: Search vocabulary by keywords
 * Path: /search?keywords = "" &page = 1 &limit = 10
 * Method: GET
 * **/
wordsRouter.get('/search', paginationNavigator, wordSearchValidator, wrapRequestHandler(searchWordController))

/**
 * Description: Add new word
 * Path: /
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body: WordRequestBody
 *
 * **/
wordsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  createWordValidator,
  wrapRequestHandler(createWordController)
)

/**
 * Description: Update a Word
 * Path: /update/:word_id
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Body:WordSchema
 * **/
wordsRouter.patch(
  '/update/:word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  updateWordValidator,
  filterMiddleware<UpdateWordRequestBody>([
    'name',
    'description',
    'example',
    'videos',
    'relativeWords',
    'contributor',
    'topic'
  ]),
  wrapRequestHandler(updateWordController)
)

/**
 * Description: Update a Word
 * Path: /update/:word_id
 * Method: DELETE
 * Header:{Authorization:Bearer <access_token>}
 * Body:WordSchema
 * **/
wordsRouter.delete(
  '/:word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  wordDeleteValidator,
  wrapRequestHandler(deleteWordController)
)
export default wordsRouter
