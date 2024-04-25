import { Router } from 'express'
import {
  createFeedbackController,
  getAllFeedbackController,
  updateFeedbackStatusController
} from '~/controllers/feedbacks.controllers'

import {
  createFeedbackValidator,
  feedbackIdValidator,
  feedbackStatusValidator,
  updateFeedbackStatusValidator
} from '~/middlewares/feedbacks.middlewares'

import { accessTokenValidator, adminRoleValidator, verifiedUSerValidator } from '~/middlewares/users.middlewares'
import { paginationNavigator } from '~/middlewares/words.middlewares'
import { wrapRequestHandler } from '~/utils/handles'

const feedbacksRouter = Router()
/**
 * Description: Get ALL Feedback (can be filter by status)
 * Path: /all ? status = 1
 * Method: GET
 * **/
feedbacksRouter.get(
  '/all',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  paginationNavigator,
  feedbackStatusValidator,
  wrapRequestHandler(getAllFeedbackController)
)

/**
 * Description: Add new feedback
 * Path: /
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body: FeedbackRequestBody
 *
 * **/
feedbacksRouter.post(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  createFeedbackValidator,
  wrapRequestHandler(createFeedbackController)
)

/**
 * Description: Update a feedback Status
 * Path: /:feedback_id
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Body:UpdateFeedbackStatusRequest
 * **/
feedbacksRouter.patch(
  '/:feedback_id',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  feedbackIdValidator,
  updateFeedbackStatusValidator,
  wrapRequestHandler(updateFeedbackStatusController)
)

export default feedbacksRouter
