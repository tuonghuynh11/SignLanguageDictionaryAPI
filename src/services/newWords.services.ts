import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import Word from '~/models/schemas/Word.schema'
import { NewWordRequestBody, UpdateNewWordRequestBody } from '~/models/requests/NewWord.requests'
import NewWord from '~/models/schemas/NewWord.schema'
import { NewWordStatus } from '~/constants/enums'

class NewWordService {
  async searchNewWords({ keywords, page, limit }: { keywords: string; page: number; limit: number }) {
    const [words, totalWords] = await Promise.all([
      databaseService.newWord
        .aggregate([
          {
            $match: {
              $text: { $search: keywords }
            }
          },
          {
            $project: {
              example: 0,
              relativeWords: 0,
              videos: 0,
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
      databaseService.newWord
        .find({
          $text: { $search: keywords }
        })
        .toArray()
    ])
    return {
      words: words,
      total: totalWords.length
    }
  }
  async getNewWordDetail({ word_id }: { word_id: string }) {
    const response = await databaseService.newWord.findOne({ _id: new ObjectId(word_id) })

    return response
  }
  async getMyNewWord(user_id: string, page: number, limit: number) {
    const [response, total] = await Promise.all([
      databaseService.newWord
        .find(
          {
            idUser: new ObjectId(user_id)
          },
          {
            projection: {
              _id: 1,
              name: 1,
              description: 1,
              topic: 1,
              status: 1
            },
            skip: (page - 1) * limit,
            limit: limit
          }
        )
        .toArray(),
      databaseService.newWord
        .find({
          idUser: new ObjectId(user_id)
        })
        .toArray()
    ])

    return { response, total: total.length }
  }
  async getAll(page: number, limit: number) {
    const [response, total] = await Promise.all([
      databaseService.newWord
        .find(
          {},
          {
            projection: {
              _id: 1,
              name: 1,
              description: 1,
              topic: 1,
              status: 1
            },
            skip: (page - 1) * limit,
            limit: limit
          }
        )
        .toArray(),
      databaseService.newWord.find({}).toArray()
    ])

    return {
      newWords: response,
      total: total.length
    }
  }
  async createNewWord(user_id: string, payload: NewWordRequestBody) {
    const result = await databaseService.newWord.insertOne(
      new NewWord({
        name: payload.name,
        idUser: new ObjectId(user_id),
        description: payload.description,
        example: payload.example,
        videos: payload.videos, // video url array
        relativeWords: payload.relativeWords,
        topic: payload.topic && payload.topic.length !== 0 ? new ObjectId(payload.topic) : ('' as any)
      })
    )
    const inserted_word = await databaseService.newWord.findOne({ _id: result.insertedId })
    return inserted_word
  }
  async updateNewWord(new_word_id: string, payload: UpdateNewWordRequestBody) {
    const temp: any = { ...payload }

    if (payload.topic) {
      temp.topic = new ObjectId(payload.topic)
    }
    const result = await databaseService.newWord.findOneAndUpdate(
      { _id: new ObjectId(new_word_id) },
      {
        $set: {
          ...temp
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after' // Trả về giá trị mới
      }
    )

    return result
  }
  async updateNewWordStatus(new_word_id: string, status: NewWordStatus) {
    const result = await databaseService.newWord.findOneAndUpdate(
      { _id: new ObjectId(new_word_id) },
      {
        $set: {
          status: status
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        returnDocument: 'after' // Trả về giá trị mới
      }
    )

    return result
  }
  async deleteNewWord(new_word_id: string) {
    const result = await databaseService.newWord.deleteOne({ _id: new ObjectId(new_word_id) })

    return result.deletedCount !== 0
  }
}

const newWordService = new NewWordService()
export default newWordService
