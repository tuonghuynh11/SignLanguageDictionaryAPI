import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LEARNED_PACKAGE_MESSAGES } from '~/constants/messages'
import {
  AddLearnedWordToPackageRequestBody,
  DeleteLearnedWordToPackageRequestBody,
  LearnedPackageRequestBody,
  UpdatePackageRequestBody
} from '~/models/requests/LearnedPackage.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import learnedPackageService from '~/services/learnedPackages.services'
export const searchLearnedPackageController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const keywords = req.query.keywords as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { packages, total } = await learnedPackageService.searchLearnedPackage({ user_id, keywords, page, limit })
  return res.json({
    message: LEARNED_PACKAGE_MESSAGES.SEARCH_PACKAGE_SUCCESS,
    result: {
      packages: packages,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const getAllLearnedPackageOfUserController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { packages, total } = await learnedPackageService.getAllLearnedPackageOfUser({ user_id, page, limit })
  return res.json({
    message: LEARNED_PACKAGE_MESSAGES.GET_PACKAGE_OF_USER_SUCCESS,
    result: {
      packages: packages,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const getAllWordInLearnedPackageController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const learned_package_id = req.params.learned_package_id as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { learned_words, total } = await learnedPackageService.getAllWordInLearnedPackage({
    learned_package_id,
    page,
    limit
  })
  return res.json({
    message: LEARNED_PACKAGE_MESSAGES.GET_ALL_WORDS_OF_PACKAGE_SUCCESS,
    result: {
      learned_words: learned_words,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const createLearnedPackageController = async (
  req: Request<ParamsDictionary, any, LearnedPackageRequestBody>,
  res: Response
) => {
  const result = await learnedPackageService.createLearnedPackage(req.body)
  return res.json({
    message: LEARNED_PACKAGE_MESSAGES.CREATE_LEARNED_PACKAGE_SUCCESSFULLY,
    result
  })
}
export const addWordLearnedPackageController = async (
  req: Request<ParamsDictionary, any, AddLearnedWordToPackageRequestBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await learnedPackageService.addNewWordTOLearnedPackage(
    user_id,
    req.params.learned_package_id,
    req.body
  )
  return res.json({
    message: LEARNED_PACKAGE_MESSAGES.CREATE_LEARNED_PACKAGE_SUCCESSFULLY,
    result
  })
}
export const deleteWordLearnedPackageController = async (
  req: Request<ParamsDictionary, any, DeleteLearnedWordToPackageRequestBody>,
  res: Response
) => {
  const result = await learnedPackageService.deleteNewWordToLearnedPackage(req.params.learned_package_id, req.body)
  return res.json({
    message: LEARNED_PACKAGE_MESSAGES.DELETE_LEARNED_WORDS_OF_PACKAGE_SUCCESSFULLY,
    package: result
  })
}
export const updateLearnedPackageController = async (
  req: Request<ParamsDictionary, any, UpdatePackageRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await learnedPackageService.updateLearnedPackage(req.params.learned_package_id, req.body)
  return res.json({
    message: LEARNED_PACKAGE_MESSAGES.UPDATE_LEARNED_PACKAGE_SUCCESSFULLY,
    result
  })
}
