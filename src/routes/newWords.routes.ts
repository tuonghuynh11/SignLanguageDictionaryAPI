import { Router } from 'express'
import {
  createNewWordController,
  deleteNewWordController,
  getAllNewWordController,
  getMyNewWordController,
  getNewWordDetailController,
  searchNewWordController,
  updateNewWordController,
  updateNewWordStatusController
} from '~/controllers/newWords.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  createNewWordValidator,
  newWordDeleteValidator,
  newWordStatusValidator,
  updateNewWordStatusValidator,
  updateNewWordValidator
} from '~/middlewares/newWords.middlewares'
import { accessTokenValidator, adminRoleValidator, verifiedUSerValidator } from '~/middlewares/users.middlewares'
import { paginationNavigator, wordSearchValidator } from '~/middlewares/words.middlewares'
import { UpdateNewWordRequestBody } from '~/models/requests/NewWord.requests'
import { wrapRequestHandler } from '~/utils/handles'

const newWordsRouter = Router()

/**
 * Description: Get All New Word
 * Path: /all ? page = 1&imit=2
 * Method: GET
 * Header:{Authorization:Bearer <access_token>}
 * Role: Admin
 * **/
newWordsRouter.get(
  '/all',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  paginationNavigator,
  wrapRequestHandler(getAllNewWordController)
)

/**
 * Description: Get Word Detail by ID
 * Path: /detail/:id
 * Method: GET
 * **/
newWordsRouter.get(
  '/detail/:new_word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  newWordDeleteValidator,
  wrapRequestHandler(getNewWordDetailController)
)
/**
 * Description: Get My New Word
 * Path: /? page = 1&imit=2
 * Method: GET
 * Header:{Authorization:Bearer <access_token>}
 * **/
newWordsRouter.get(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  wrapRequestHandler(getMyNewWordController)
)

/**
 * Description: Search new word
 * Path: /search?keywords = "" &page = 1 &limit = 10
 * Method: GET
 * **/
newWordsRouter.get('/search', paginationNavigator, wordSearchValidator, wrapRequestHandler(searchNewWordController))

/**
 * Description: Add new word
 * Path: /
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body: WordRequestBody
 *
 * **/
newWordsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  createNewWordValidator,
  wrapRequestHandler(createNewWordController)
)

/**
 * Description: Update a New Word
 * Path: /update/:new_word_id
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Body:UpdateNewWordRequestBody
 * **/
newWordsRouter.patch(
  '/update/:new_word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  newWordDeleteValidator,
  updateNewWordValidator,
  filterMiddleware<UpdateNewWordRequestBody>(['name', 'description', 'example', 'videos', 'relativeWords', 'topic']),
  wrapRequestHandler(updateNewWordController)
)

/**
 * Description: Update new Word Status
 * Path: /update-status/:new_word_id
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Role: Admin
 * Body:{status:newWordStatus}
 * **/
newWordsRouter.patch(
  '/update-status/:new_word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  newWordDeleteValidator,
  updateNewWordStatusValidator,
  wrapRequestHandler(updateNewWordStatusController)
)
/**
 * Description: Delete new Word
 * Path: /:new_word_id
 * Method: DELETE
 * Header:{Authorization:Bearer <access_token>}
 * Body:WordSchema
 * **/
newWordsRouter.delete(
  '/:new_word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  newWordDeleteValidator,
  newWordStatusValidator,
  wrapRequestHandler(deleteNewWordController)
)
export default newWordsRouter
