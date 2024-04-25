import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { FeedbackStatus } from '~/constants/enums'
import { FEEDBACK_MESSAGES, TOPICS_MESSAGES } from '~/constants/messages'
import { FeedbackRequestBody, UpdateFeedbackStatusRequestBody } from '~/models/requests/Feedback.requests'
import { TopicRequestBody, UpdateTopicRequestBody } from '~/models/requests/Topic.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import feedbackService from '~/services/feedbacks.services'
import topicService from '~/services/topics.services'
export const getAllFeedbackController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const status: FeedbackStatus | undefined = req.query.status as FeedbackStatus
  const { feedBacks, total } = await feedbackService.getALlFeedbacks({ status, page, limit })
  return res.json({
    message: FEEDBACK_MESSAGES.GET_FEEDBACKS_SUCCESS,
    result: {
      feedBacks: feedBacks,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}

export const createFeedbackController = async (
  req: Request<ParamsDictionary, any, FeedbackRequestBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await feedbackService.createFeedback(user_id, req.body)
  return res.json({
    message: FEEDBACK_MESSAGES.CREATE_FEEDBACK_SUCCESSFULLY,
    result
  })
}

export const updateFeedbackStatusController = async (
  req: Request<ParamsDictionary, any, UpdateFeedbackStatusRequestBody>,
  res: Response
) => {
  const result = await feedbackService.updateFeedbackStatus(req.params.feedback_id, req.body)
  return res.json({
    message: TOPICS_MESSAGES.UPDATE_TOPIC_SUCCESSFULLY,
    result
  })
}
