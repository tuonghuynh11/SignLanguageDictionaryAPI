import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { TopicRequestBody, UpdateTopicRequestBody } from '~/models/requests/Topic.requests'
import Topic from '~/models/schemas/Topic.schema'
import { FeedbackStatus } from '~/constants/enums'
import { FeedbackRequestBody, UpdateFeedbackStatusRequestBody } from '~/models/requests/Feedback.requests'
import Feedback from '~/models/schemas/Feedback.schema'

class FeedbackService {
  async getALlFeedbacks({ status, page, limit }: { status: FeedbackStatus | undefined; page: number; limit: number }) {
    // eslint-disable-next-line prefer-const
    const filter = {
      $match: {
        status: {
          $in: status !== undefined ? [Number(status)] : [0, 1]
        }
      }
    }
    const [feedBacks, total] = await Promise.all([
      databaseService.feedBack.aggregate([filter, { $skip: (page - 1) * limit }, { $limit: limit }]).toArray(),
      databaseService.feedBack.aggregate([filter]).toArray()
    ])
    return {
      feedBacks: feedBacks,
      total: total.length
    }
  }
  async getWordsOfTopic({ topic_id, page, limit }: { topic_id: string; page: number; limit: number }) {
    const [words, totalWords] = await Promise.all([
      databaseService.words
        .aggregate([
          {
            $match: {
              topic: new ObjectId(topic_id)
            }
          },
          {
            $project: {
              topic: 0,
              example: 0,
              relativeWords: 0,
              videos: 0,
              contributor: 0,
              updated_at: 0,
              created_at: 0
            }
          },
          {
            $skip: (page - 1) * limit
          },
          {
            $limit: limit
          }
        ])
        .toArray(),
      databaseService.words
        .find({
          topic: new ObjectId(topic_id)
        })
        .toArray()
    ])
    return {
      words: words,
      total: totalWords.length
    }
  }
  async createFeedback(user_id: string, payload: FeedbackRequestBody) {
    const result = await databaseService.feedBack.insertOne(
      new Feedback({
        ...payload,
        idUser: new ObjectId(user_id)
      })
    )
    const inserted_feedback = await databaseService.feedBack.findOne({ _id: result.insertedId })
    return inserted_feedback
  }

  async updateFeedbackStatus(feedback_id: string, payload: UpdateFeedbackStatusRequestBody) {
    // eslint-disable-next-line prefer-const
    const result = await databaseService.feedBack.findOneAndUpdate(
      {
        _id: new ObjectId(feedback_id)
      },
      {
        $set: {
          ...payload
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after'
      }
    )

    return result
  }
}

const feedbackService = new FeedbackService()
export default feedbackService
