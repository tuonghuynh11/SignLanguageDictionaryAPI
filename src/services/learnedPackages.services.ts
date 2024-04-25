import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import Word from '~/models/schemas/Word.schema'
import {
  AddLearnedWordToPackageRequestBody,
  DeleteLearnedWordToPackageRequestBody,
  LearnedPackageRequestBody,
  UpdatePackageRequestBody
} from '~/models/requests/LearnedPackage.requests'
import { LearnedPackage } from '~/models/schemas/LearnedPackage.schema'
import { LearnedWord } from '~/models/schemas/LearnedWord.schema'

class LearnedPackageService {
  async searchLearnedPackage({
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
    const [packages, totalPackages] = await Promise.all([
      databaseService.learnedPackage
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $match: {
              name: {
                $regex: keywords,
                $options: 'i'
              }
            }
          },
          {
            $addFields: {
              numberOfWords: {
                $size: '$learnedWordIds'
              }
            }
          },
          { $project: { learnedWordIds: 0 } }
        ])
        .toArray(),
      databaseService.learnedPackage
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
          {
            $match: {
              name: {
                $regex: keywords,
                $options: 'i'
              }
            }
          }
        ])
        .toArray()
    ])
    return {
      packages: packages,
      total: totalPackages.length
    }
  }
  async getAllLearnedPackageOfUser({ user_id, page, limit }: { user_id: string; page: number; limit: number }) {
    const [packages, total] = await Promise.all([
      databaseService.learnedPackage
        .find(
          {
            idUser: new ObjectId(user_id)
          },
          {
            skip: (page - 1) * limit,
            limit: limit
          }
        )
        .toArray(),
      databaseService.learnedPackage
        .find({
          idUser: new ObjectId(user_id)
        })
        .toArray()
    ])

    return {
      packages,
      total: total.length
    }
  }
  async getAllWordInLearnedPackage({
    learned_package_id,
    page,
    limit
  }: {
    learned_package_id: string
    page: number
    limit: number
  }) {
    const [learned_words, total] = await Promise.all([
      databaseService.learnedPackage
        .aggregate([
          {
            $match: {
              _id: new ObjectId(learned_package_id)
            }
          },
          {
            $lookup: {
              from: 'learned_word',
              localField: 'learnedWordIds',
              foreignField: '_id',
              as: 'result'
            }
          },
          { $unwind: { path: '$result' } },
          { $replaceRoot: { newRoot: '$result' } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: 'words',
              localField: 'idWord',
              foreignField: '_id',
              as: 'word_detail'
            }
          },
          { $unwind: { path: '$word_detail' } },
          {
            $addFields: {
              'word_detail.process': '$process'
            }
          },
          { $replaceRoot: { newRoot: '$word_detail' } },
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
              topic: 1,
              process: 1
            }
          },
          {
            $lookup: {
              from: 'topics',
              localField: 'topic',
              foreignField: '_id',
              as: 'result'
            }
          },
          { $unwind: { path: '$result' } },
          { $addFields: { topic: '$result.name' } },
          { $project: { result: 0 } }
        ])
        .toArray(),
      databaseService.learnedPackage
        .aggregate([
          {
            $match: {
              _id: new ObjectId(learned_package_id)
            }
          },
          {
            $lookup: {
              from: 'learned_word',
              localField: 'learnedWordIds',
              foreignField: '_id',
              as: 'result'
            }
          },
          { $unwind: { path: '$result' } },
          { $replaceRoot: { newRoot: '$result' } }
        ])
        .toArray()
    ])

    return {
      learned_words,
      total: total.length
    }
  }
  async createLearnedPackage(payload: LearnedPackageRequestBody) {
    const result = await databaseService.learnedPackage.insertOne(
      new LearnedPackage({
        ...payload,
        idUser: new ObjectId(payload.idUser)
      })
    )
    const inserted_learned_package = await databaseService.learnedPackage.findOne({ _id: result.insertedId })
    return inserted_learned_package
  }
  async addNewWordTOLearnedPackage(
    user_id: string,
    learned_package_id: string,
    payload: AddLearnedWordToPackageRequestBody
  ) {
    const learnedWords = await databaseService.learnedWord.insertMany(
      payload.wordIds.map(
        (wordId) =>
          new LearnedWord({
            idUser: new ObjectId(user_id),
            idWord: new ObjectId(wordId)
          })
      )
    )

    const [result, inserted_learned_package] = await Promise.all([
      databaseService.learnedPackage.updateOne(
        {
          _id: new ObjectId(learned_package_id)
        },
        {
          $push: {
            learnedWordIds: {
              $each: Object.values(learnedWords.insertedIds)
            }
          }
        }
      ),
      databaseService.learnedWord
        .find({
          _id: {
            $in: Object.values(learnedWords.insertedIds)
          }
        })
        .toArray()
    ])

    return inserted_learned_package
  }
  async deleteNewWordToLearnedPackage(learned_package_id: string, payload: DeleteLearnedWordToPackageRequestBody) {
    const result = await databaseService.learnedPackage.updateOne(
      {
        _id: new ObjectId(learned_package_id)
      },
      {
        $pull: {
          learnedWordIds: {
            $in: payload.learnedWordIds?.map((id) => new ObjectId(id)) as any
          }
        }
      }
    )
    const learned_package = await databaseService.learnedPackage.findOne({ _id: new ObjectId(learned_package_id) })
    return learned_package
  }
  async updateLearnedPackage(learned_package_id: string, payload: UpdatePackageRequestBody) {
    const temp: any = { ...payload }

    if (payload.idUser) {
      temp.idUser = new ObjectId(payload.idUser)
    }
    const result = await databaseService.learnedPackage.findOneAndUpdate(
      { _id: new ObjectId(learned_package_id) },
      {
        $set: {
          ...temp
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

const learnedPackageService = new LearnedPackageService()
export default learnedPackageService
