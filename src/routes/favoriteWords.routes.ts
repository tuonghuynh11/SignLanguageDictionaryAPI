import { Router } from 'express'
import {
  addNewFavoriteWordController,
  deleteFavoriteWordController,
  getMyFavoriteWordController,
  searchFavoriteWordController
} from '~/controllers/favoriteWords.controllers'
import { addNewFavoriteWordValidator, favoriteWordDeleteValidator } from '~/middlewares/favoriteWords.middlewares'
import { accessTokenValidator, verifiedUSerValidator } from '~/middlewares/users.middlewares'
import { paginationNavigator, wordSearchValidator } from '~/middlewares/words.middlewares'

import { wrapRequestHandler } from '~/utils/handles'

const favoriteWordsRouter = Router()
/**
 * Description: Get My Favorite Words
 * Path: / ? page =1 & limit = 10
 * Method: GET
 * Header:{Authorization:Bearer <access_token>}
 * **/
favoriteWordsRouter.get(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  wrapRequestHandler(getMyFavoriteWordController)
)

/**
 * Description: Search vocabulary by keywords
 * Path: /search?keywords = "" &page = 1 &limit = 10
 * Method: GET
 * **/
favoriteWordsRouter.get(
  '/search',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  wrapRequestHandler(searchFavoriteWordController)
)

/**
 * Description: Add new favorite word
 * Path: /add/:word_id
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 *
 * **/
favoriteWordsRouter.post(
  '/add/:word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  addNewFavoriteWordValidator,
  wrapRequestHandler(addNewFavoriteWordController)
)

/**
 * Description: Delete a Word
 * Path: /delete/:word_id
 * Method: DELETE
 * Header:{Authorization:Bearer <access_token>}
 * Body:WordSchema
 * **/
favoriteWordsRouter.delete(
  '/delete/:word_id',
  accessTokenValidator,
  verifiedUSerValidator,
  favoriteWordDeleteValidator,
  wrapRequestHandler(deleteFavoriteWordController)
)
export default favoriteWordsRouter
