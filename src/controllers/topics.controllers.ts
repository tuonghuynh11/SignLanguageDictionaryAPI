import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TOPICS_MESSAGES } from '~/constants/messages'
import { TopicRequestBody, UpdateTopicRequestBody } from '~/models/requests/Topic.requests'
import topicService from '~/services/topics.services'
export const getAllTopicController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { topics, total } = await topicService.getALlTopics({ page, limit })
  return res.json({
    message: TOPICS_MESSAGES.GET_TOPICS_SUCCESS,
    result: {
      topics: topics,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const getWordsOfTopicController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const topic_id = req.params.topic_id as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { words, total } = await topicService.getWordsOfTopic({ topic_id, page, limit })
  return res.json({
    message: TOPICS_MESSAGES.GET_TOPICS_SUCCESS,
    result: {
      words: words,
      page: page,
      limit: limit,
      total_items: total,
      total_pages: Math.ceil(total / limit)
    }
  })
}
export const createTopicController = async (req: Request<ParamsDictionary, any, TopicRequestBody>, res: Response) => {
  const result = await topicService.createTopic(req.body)
  return res.json({
    message: TOPICS_MESSAGES.CREATE_TOPIC_SUCCESSFULLY,
    result
  })
}
export const updateTopicController = async (
  req: Request<ParamsDictionary, any, UpdateTopicRequestBody>,
  res: Response
) => {
  const result = await topicService.updateTopic(req.params.topic_id, req.body)
  return res.json({
    message: TOPICS_MESSAGES.UPDATE_TOPIC_SUCCESSFULLY,
    result
  })
}
export const deleteTopicController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await topicService.deleteTopic(req.params.topic_id)
  return res.json({
    message: result ? TOPICS_MESSAGES.DELETE_TOPIC_SUCCESSFULLY : TOPICS_MESSAGES.DELETE_TOPIC_FAILED
  })
}
