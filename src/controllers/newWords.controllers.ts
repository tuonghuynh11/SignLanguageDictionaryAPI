import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { NewWordStatus } from '~/constants/enums'
import { NEW_WORD_MESSAGES, WORD_MESSAGES } from '~/constants/messages'
import { NewWordRequestBody, UpdateNewWordRequestBody } from '~/models/requests/NewWord.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import newWordService from '~/services/newWords.services'
import wordService from '~/services/words.services'
export const searchNewWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const keywords = req.query.keywords as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { words, total } = await newWordService.searchNewWords({ keywords, page, limit })
  return res.json({
    message: WORD_MESSAGES.SEARCH_WORD_SUCCESS,
    result: {
      words: words,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const getNewWordDetailController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const word_id = req.params.new_word_id as string
  const wordDetail = await newWordService.getNewWordDetail({ word_id })
  return res.json({
    message: NEW_WORD_MESSAGES.GET_NEW_WORD_DETAIL_SUCCESS,
    result: wordDetail
  })
}
export const getAllNewWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { newWords, total } = await newWordService.getAll(page, limit)
  return res.json({
    message: NEW_WORD_MESSAGES.GET_ALL_NEW_WORD_SUCCESS,
    result: {
      newWords,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const getMyNewWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { response, total } = await newWordService.getMyNewWord(user_id, page, limit)
  return res.json({
    message: NEW_WORD_MESSAGES.GET_MY_NEW_WORD_SUCCESS,
    result: {
      new_words: response,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const createNewWordController = async (
  req: Request<ParamsDictionary, any, NewWordRequestBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await newWordService.createNewWord(user_id, req.body)
  return res.json({
    message: NEW_WORD_MESSAGES.CREATE_NEW_WORD_SUCCESSFULLY,
    result
  })
}
export const updateNewWordController = async (
  req: Request<ParamsDictionary, any, UpdateNewWordRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await newWordService.updateNewWord(req.params.new_word_id, req.body)
  return res.json({
    message: NEW_WORD_MESSAGES.UPDATE_NEW_WORD_SUCCESSFULLY,
    result
  })
}
export const updateNewWordStatusController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await newWordService.updateNewWordStatus(req.params.new_word_id, req.body.status as NewWordStatus)
  return res.json({
    message: NEW_WORD_MESSAGES.UPDATE_NEW_WORD_STATUS_SUCCESSFULLY,
    result
  })
}
export const deleteNewWordController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await newWordService.deleteNewWord(req.params.new_word_id)
  return res.json({
    message: result ? NEW_WORD_MESSAGES.DELETE_NEW_WORD_SUCCESSFULLY : NEW_WORD_MESSAGES.DELETE_NEW_WORD_FAILED
  })
}
