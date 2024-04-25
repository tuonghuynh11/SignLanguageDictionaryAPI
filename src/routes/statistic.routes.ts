import { Router } from 'express'
import {
  createFeedbackController,
  getAllFeedbackController,
  updateFeedbackStatusController
} from '~/controllers/feedbacks.controllers'
import {
  getStatisticIn7DaysController,
  getStatisticInMonthController,
  getStatisticInYearController,
  getStatisticOfUserController,
  getTopTenWordsController,
  updateStatisticInformationController
} from '~/controllers/statistics.controllers'

import {
  createFeedbackValidator,
  feedbackIdValidator,
  feedbackStatusValidator,
  updateFeedbackStatusValidator
} from '~/middlewares/feedbacks.middlewares'
import {
  durationStatisticValidator,
  updateStatisticInformationValidator,
  yearStatisticValidator
} from '~/middlewares/statistic.middlewares'

import { accessTokenValidator, adminRoleValidator, verifiedUSerValidator } from '~/middlewares/users.middlewares'
import { paginationNavigator } from '~/middlewares/words.middlewares'
import { wrapRequestHandler } from '~/utils/handles'

const statisticsRouter = Router()
/**
 * Description: Get Statistic In 7 days (Mặc định là 7 ngày tính từ ngày hiện tại)
 * Path: /7-days
 * Method: GET
 * **/
statisticsRouter.get(
  '/7-days',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  wrapRequestHandler(getStatisticIn7DaysController)
)

/**
 * Description: Get Statistic In 1 month
 * Path: /month ? month = 1 & year = 2024
 * Method: GET
 * **/
statisticsRouter.get(
  '/month',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  durationStatisticValidator,
  wrapRequestHandler(getStatisticInMonthController)
)

/**
 * Description: Get Statistic In 1 Year
 * Path:/year ? year = 2024
 * Method: GET
 * **/
statisticsRouter.get(
  '/year',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  yearStatisticValidator,
  wrapRequestHandler(getStatisticInYearController)
)
/**
 * Description: Get Top 10 words
 * Path:/top-ten-words
 * Method: GET
 * **/
statisticsRouter.get(
  '/top-ten-words',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  wrapRequestHandler(getTopTenWordsController)
)

/**
 * Description: -	Get User Statistic
 * Path:/user
 * Method: GET
 * **/
statisticsRouter.get('/', accessTokenValidator, verifiedUSerValidator, wrapRequestHandler(getStatisticOfUserController))

/**
 * Description: Update statistic information
 * Path: /
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body: ( cần body chỉ cần gọi là tự tăng accesses lên)
 *
 * **/
statisticsRouter.patch(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  adminRoleValidator,
  updateStatisticInformationValidator,
  wrapRequestHandler(updateStatisticInformationController)
)

export default statisticsRouter
