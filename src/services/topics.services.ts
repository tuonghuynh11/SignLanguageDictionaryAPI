import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { TopicRequestBody, UpdateTopicRequestBody } from '~/models/requests/Topic.requests'
import Topic from '~/models/schemas/Topic.schema'

class TopicService {
  async getALlTopics({ page, limit }: { page: number; limit: number }) {
    const [topics, totalTopics] = await Promise.all([
      databaseService.topics
        .aggregate([
          {
            $project: {
              words: 0
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
      databaseService.topics.find().toArray()
    ])
    return {
      topics: topics,
      total: totalTopics.length
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
  async createTopic(payload: TopicRequestBody) {
    const result = await databaseService.topics.insertOne(
      new Topic({
        name: payload.name,
        words: payload.words.map((word) => new ObjectId(word))
      })
    )
    const inserted_word = await databaseService.topics.findOne({ _id: result.insertedId })
    return inserted_word
  }

  async updateTopic(topic_id: string, payload: UpdateTopicRequestBody) {
    // eslint-disable-next-line prefer-const
    let _payload: {
      name?: string
      words?: ObjectId[]
      numberOfWords?: number
    } = {}
    if (payload.name) {
      _payload.name = payload.name
    }
    if (payload.words) {
      _payload.words = payload.words.map((word) => new ObjectId(word))
      _payload.numberOfWords = payload.words.length
    }
    const result = await databaseService.topics.findOneAndUpdate(
      {
        _id: new ObjectId(topic_id)
      },
      {
        $set: {
          ..._payload
        }
      },
      {
        returnDocument: 'after'
      }
    )

    return result
  }
  async deleteTopic(topic_id: string) {
    const result = await databaseService.topics.deleteOne({
      _id: new ObjectId(topic_id)
    })
    return result.deletedCount !== 0
  }
}

const topicService = new TopicService()
export default topicService
