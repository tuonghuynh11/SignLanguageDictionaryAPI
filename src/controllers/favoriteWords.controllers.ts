import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { UserRole, UserVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { FAVORITE_WORD } from '~/constants/messages'
import { TokenPayload } from '~/models/requests/User.requests'
import favoriteWordService from '~/services/favoriteWords.services'
export const getMyFavoriteWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { words, total } = await favoriteWordService.getMyFavoriteWord({ user_id, page, limit })
  return res.json({
    message: FAVORITE_WORD.GET_FAVORITE_WORD_SUCCESS,
    result: {
      words: words,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const searchFavoriteWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const keywords = req.query.keywords as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { words, total } = await favoriteWordService.searchFavoriteWords({ user_id, keywords, page, limit })
  return res.json({
    message: FAVORITE_WORD.GET_FAVORITE_WORD_SUCCESS,
    result: {
      words: words,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const addNewFavoriteWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const word_id = req.params.word_id
  const response = await favoriteWordService.addNewFavoriteWord({ user_id, word_id })
  return res.json({
    message: FAVORITE_WORD.ADD_FAVORITE_WORD_SUCCESS
  })
}
export const deleteFavoriteWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const word_id = req.params.word_id
  const response = await favoriteWordService.deleteFavoriteWord({ user_id, word_id })
  return res.json({
    message: FAVORITE_WORD.DELETE_FAVORITE_WORD_SUCCESS
  })
}
