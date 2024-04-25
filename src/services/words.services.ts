import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import Word from '~/models/schemas/Word.schema'

class WordService {
  async searchWords({ keywords, page, limit }: { keywords: string; page: number; limit: number }) {
    const [words, totalWords] = await Promise.all([
      databaseService.words
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
          $text: { $search: keywords }
        })
        .toArray()
    ])
    return {
      words: words,
      total: totalWords.length
    }
  }
  async getWordDetail(word_id: string) {
    await databaseService.words.updateOne({ _id: new ObjectId(word_id) }, { $inc: { viewers: 1 } })
    const response = await databaseService.words.findOne({ _id: new ObjectId(word_id) })

    return response
  }
  async updateNumberOfLiked(word_id: string, isIncrease: boolean) {
    const response = databaseService.words.updateOne(
      { _id: new ObjectId(word_id) },
      { $inc: { viewers: isIncrease ? 1 : -1 } }
    )

    return response
  }
  async createWord(payload: WordRequestBody) {
    const result = await databaseService.words.insertOne(
      new Word({
        name: payload.name,
        description: payload.description,
        example: payload.example,
        videos: payload.videos, // video url array
        relativeWords: payload.relativeWords,
        contributor: payload.contributor,
        topic: new ObjectId(payload.topic)
      })
    )
    const inserted_word = await databaseService.words.findOne({ _id: result.insertedId })
    return inserted_word
  }
  async updateWord(word_id: string, payload: UpdateWordRequestBody) {
    const temp: any = { ...payload }

    if (payload.topic) {
      temp.topic = new ObjectId(payload.topic)
    }
    const result = await databaseService.words.findOneAndUpdate(
      { _id: new ObjectId(word_id) },
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

  async deleteWord(word_id: string) {
    const result = await databaseService.words.deleteOne({ _id: new ObjectId(word_id) })

    return result.deletedCount !== 0
  }
}

const wordService = new WordService()
export default wordService
