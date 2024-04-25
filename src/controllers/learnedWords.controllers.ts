import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LEARNED_WORD_MESSAGES, WORD_MESSAGES } from '~/constants/messages'
import { LearnedWordRequestBody } from '~/models/requests/LearnedWord.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import learnedWordService from '~/services/learnedWords.services'
import wordService from '~/services/words.services'
export const updateLearnedWordProcessController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await learnedWordService.updateLearnedWordProcess(req.params.learned_word_id, req.body.process)
  return res.json({
    message: LEARNED_WORD_MESSAGES.UPDATE_PROCESS_SUCCESSFULLY,
    result
  })
}
export const getLearnedWordOfUserController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { learned_words, total } = await learnedWordService.getLearnedWordOfUser({ user_id, page, limit })
  return res.json({
    message: LEARNED_WORD_MESSAGES.GET_LEARNED_WORD_OF_USER_SUCCESS,
    result: {
      learned_words,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const searchLearnedWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const keywords = req.query.keywords as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { learned_words, total } = await learnedWordService.searchLearnedWords({ user_id, keywords, page, limit })
  return res.json({
    message: LEARNED_WORD_MESSAGES.SEARCH_LEARNED_WORD_SUCCESS,
    result: {
      learned_words: learned_words,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const createLearnedWordController = async (
  req: Request<ParamsDictionary, any, LearnedWordRequestBody>,
  res: Response
) => {
  const result = await learnedWordService.createLearnedWord(req.body)
  return res.json({
    message: LEARNED_WORD_MESSAGES.CREATE_LEARNED_WORD_SUCCESSFULLY,
    result
  })
}
export const deleteLearnedWordController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await learnedWordService.deleteLearnedWord(req.params.learned_word_id)
  return res.json({
    message: LEARNED_WORD_MESSAGES.DELETE_LEARNED_WORD_SUCCESSFULLY,
    result
  })
}
