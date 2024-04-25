import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { FEEDBACK_MESSAGES, STATISTIC_MESSAGES } from '~/constants/messages'
import { FeedbackRequestBody } from '~/models/requests/Feedback.requests'
import { UpdateStatisticRequestBody } from '~/models/requests/Statistic.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import feedbackService from '~/services/feedbacks.services'
import statisticService from '~/services/statistic.services'
export const getStatisticIn7DaysController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const statistics = await statisticService.getStatisticIn7Days()
  return res.json({
    message: STATISTIC_MESSAGES.GET_STATISTIC_IN_7_DAYS_SUCCESS,
    result: statistics
  })
}
export const getStatisticInMonthController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const month = Number(req.query.month)
  const year = Number(req.query.year)
  const statistics = await statisticService.getStatisticInMonth(month, year)
  return res.json({
    message: STATISTIC_MESSAGES.GET_STATISTIC_IN_MONTH_SUCCESS,
    result: statistics
  })
}
export const getStatisticInYearController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const year = Number(req.query.year)
  const result = await statisticService.getStatisticInYear(year)
  return res.json({
    message: STATISTIC_MESSAGES.GET_STATISTIC_IN_YEAR_SUCCESS,
    result
  })
}
export const getTopTenWordsController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await statisticService.getTopTenWords()
  return res.json({
    message: STATISTIC_MESSAGES.GET_TOP_10_WORDS_SUCCESS,
    result
  })
}

export const getStatisticOfUserController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await statisticService.getUserStatistic(user_id)
  return res.json({
    message: STATISTIC_MESSAGES.GET_USER_STATISTIC_SUCCESSFULLY,
    result
  })
}

export const updateStatisticInformationController = async (
  req: Request<ParamsDictionary, any, UpdateStatisticRequestBody>,
  res: Response
) => {
  const result = await statisticService.updateStatisticInformation(req.body)
  return res.json({
    message: STATISTIC_MESSAGES.UPDATE_STATISTIC_SUCCESSFULLY,
    result
  })
}
