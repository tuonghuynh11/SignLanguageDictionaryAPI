import { Router } from 'express'
import {
  createTopicController,
  deleteTopicController,
  getAllTopicController,
  getWordsOfTopicController,
  updateTopicController
} from '~/controllers/topics.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  createTopicValidator,
  topicDeleteValidator,
  topicIdValidator,
  updateTopicValidator
} from '~/middlewares/topic.middlewares'
import { accessTokenValidator, verifiedUSerValidator } from '~/middlewares/users.middlewares'
import { paginationNavigator } from '~/middlewares/words.middlewares'
import { UpdateTopicRequestBody } from '~/models/requests/Topic.requests'
import { wrapRequestHandler } from '~/utils/handles'

const topicsRouter = Router()
/**
 * Description: Get ALL topics
 * Path: /
 * Method: GET
 * **/
topicsRouter.get('/', paginationNavigator, wrapRequestHandler(getAllTopicController))

/**
 * Description: Get Word in specific topic
 * Path: /words/:topic_id
 * Method: GET
 * **/
topicsRouter.get(
  '/words/:topic_id',
  paginationNavigator,
  topicIdValidator,
  wrapRequestHandler(getWordsOfTopicController)
)

/**
 * Description: Add new Topic
 * Path: /
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body: TopicRequestBody
 *
 * **/
topicsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  createTopicValidator,
  wrapRequestHandler(createTopicController)
)

/**
 * Description: Update a Topic
 * Path: /update/:topic_id
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Body:WordSchema
 * **/
topicsRouter.patch(
  '/update/:topic_id',
  accessTokenValidator,
  verifiedUSerValidator,
  updateTopicValidator,
  filterMiddleware<UpdateTopicRequestBody>(['name', 'words']),
  wrapRequestHandler(updateTopicController)
)

/**
 * Description: Delete a topic
 * Path: /:topic_id
 * Method: DELETE
 * Header:{Authorization:Bearer <access_token>}
 * Body:
 * **/
topicsRouter.delete(
  '/:topic_id',
  accessTokenValidator,
  verifiedUSerValidator,
  topicDeleteValidator,
  wrapRequestHandler(deleteTopicController)
)
export default topicsRouter
