import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { WORD_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/models/requests/User.requests'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import wordService from '~/services/words.services'
export const searchWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const keywords = req.query.keywords as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { words, total } = await wordService.searchWords({ keywords, page, limit })
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
export const getWordDetailController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const _id = req.params.word_id as string

  const wordDetail = await wordService.getWordDetail(_id)
  return res.json({
    message: WORD_MESSAGES.GET_WORD_DETAIL_SUCCESS,
    result: wordDetail
  })
}
export const createWordController = async (req: Request<ParamsDictionary, any, WordRequestBody>, res: Response) => {
  const result = await wordService.createWord(req.body)
  return res.json({
    message: WORD_MESSAGES.CREATE_WORD_SUCCESSFULLY,
    result
  })
}
export const updateWordController = async (
  req: Request<ParamsDictionary, any, UpdateWordRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await wordService.updateWord(req.params.word_id, req.body)
  return res.json({
    message: WORD_MESSAGES.UPDATE_WORD_SUCCESSFULLY,
    result
  })
}
export const deleteWordController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await wordService.deleteWord(req.params.word_id)
  return res.json({
    message: result ? WORD_MESSAGES.DELETE_WORD_SUCCESSFULLY : WORD_MESSAGES.DELETE_WORD_FAILED
  })
}
