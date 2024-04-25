import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import Word from '~/models/schemas/Word.schema'
import FavoriteWord from '~/models/schemas/FavoriteWord.schema'
import wordService from './words.services'

class FavoriteWordsService {
  async searchFavoriteWords({
    user_id,
    keywords,
    page,
    limit
  }: {
    user_id: string
    keywords: string
    page: number
    limit: number
  }) {
    const [words, totalWords] = await Promise.all([
      databaseService.favoriteWord
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
          {
            $lookup: {
              from: 'words',
              localField: 'words',
              foreignField: '_id',
              as: 'result'
            }
          },
          { $unwind: { path: '$result' } },
          { $replaceRoot: { newRoot: '$result' } },
          {
            $match: {
              name: { $regex: keywords, $options: 'i' }
            }
          },
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ])
        .toArray(),
      databaseService.favoriteWord
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
          {
            $lookup: {
              from: 'words',
              localField: 'words',
              foreignField: '_id',
              as: 'result'
            }
          },
          { $unwind: { path: '$result' } },
          { $replaceRoot: { newRoot: '$result' } },
          {
            $match: {
              name: { $regex: keywords, $options: 'i' }
            }
          }
        ])
        .toArray()
    ])
    return {
      words: words,
      total: totalWords.length
    }
  }
  async getMyFavoriteWord({ user_id, page, limit }: { user_id: string; page: number; limit: number }) {
    const [words, total] = await Promise.all([
      databaseService.favoriteWord
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
          {
            $lookup: {
              from: 'words',
              localField: 'words',
              foreignField: '_id',
              as: 'result',
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    viewers: 1,
                    numberOfLiked: 1,
                    topic: 1
                  }
                }
              ]
            }
          },
          { $project: { result: 1, _id: 0 } },
          { $unwind: { path: '$result' } },
          { $replaceRoot: { newRoot: '$result' } },
          {
            $lookup: {
              from: 'topics',
              localField: 'topic',
              foreignField: '_id',
              as: 'topic',
              pipeline: [{ $project: { _id: 0, name: 1 } }]
            }
          },
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
              viewers: 1,
              numberOfLiked: 1,
              topic: {
                $arrayElemAt: ['$topic.name', 0]
              }
            }
          },
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ])
        .toArray(),
      databaseService.favoriteWord
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
          {
            $lookup: {
              from: 'words',
              localField: 'words',
              foreignField: '_id',
              as: 'result',
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    viewers: 1,
                    numberOfLiked: 1,
                    topic: 1
                  }
                }
              ]
            }
          },
          { $project: { result: 1, _id: 0 } },
          { $unwind: { path: '$result' } },
          { $replaceRoot: { newRoot: '$result' } },
          {
            $lookup: {
              from: 'topics',
              localField: 'topic',
              foreignField: '_id',
              as: 'topic',
              pipeline: [{ $project: { _id: 0, name: 1 } }]
            }
          },
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
              viewers: 1,
              numberOfLiked: 1,
              topic: {
                $arrayElemAt: ['$topic.name', 0]
              }
            }
          }
        ])
        .toArray()
    ])
    return {
      words,
      total: total.length
    }
  }

  async addNewFavoriteWord({ user_id, word_id }: { user_id: string; word_id: string }) {
    const isExist = await databaseService.favoriteWord.findOne({ idUser: new ObjectId(user_id) })
    if (isExist) {
      const res = await databaseService.favoriteWord.updateOne(
        { idUser: new ObjectId(user_id) },
        { $push: { words: new ObjectId(word_id) } }
      )
      return res
    }
    const result = await databaseService.favoriteWord.insertOne(
      new FavoriteWord({ idUser: new ObjectId(user_id), words: [new ObjectId(word_id)] })
    )
    wordService.updateNumberOfLiked(word_id, true)
    return result
  }

  async deleteFavoriteWord({ user_id, word_id }: { user_id: string; word_id: string }) {
    const result = await databaseService.favoriteWord.updateOne(
      { idUser: new ObjectId(user_id) },
      {
        $pull: {
          words: new ObjectId(word_id)
        }
      }
    )
    wordService.updateNumberOfLiked(word_id, false)

    return result.modifiedCount > 0
  }
}

const favoriteWordService = new FavoriteWordsService()
export default favoriteWordService
