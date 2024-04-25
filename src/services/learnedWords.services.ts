import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { UpdateWordRequestBody, WordRequestBody } from '~/models/requests/Word.request'
import Word from '~/models/schemas/Word.schema'
import { response } from 'express'
import { LearnedWordRequestBody } from '~/models/requests/LearnedWord.requests'
import { LearnedWord } from '~/models/schemas/LearnedWord.schema'

class LearnedWordService {
  async searchLearnedWords({
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
      databaseService.learnedWord
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
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
            $match: {
              'word_detail.name': {
                $regex: keywords,
                $options: 'i'
              }
            }
          },
          {
            $project: {
              _id: 1,
              idWord: 1,
              process: 1,
              'word_detail.name': 1,
              'word_detail.description': 1
            }
          }
        ])
        .toArray(),
      databaseService.learnedWord
        .find({
          idUser: new ObjectId(user_id)
        })
        .toArray()
    ])
    return {
      learned_words: words,
      total: totalWords.length
    }
  }
  async getLearnedWordOfUser({ user_id, page, limit }: { user_id: string; page: number; limit: number }) {
    const [result, total] = await Promise.all([
      databaseService.learnedWord
        .aggregate([
          {
            $match: {
              idUser: new ObjectId(user_id)
            }
          },
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
            $project: {
              'word_detail._id': 0,
              'word_detail.example': 0,
              'word_detail.videos': 0,
              'word_detail.relativeWords': 0,
              'word_detail.contributor': 0,
              idUser: 0
            }
          }
        ])
        .toArray(),
      databaseService.learnedWord.find({ idUser: new ObjectId(user_id) }).toArray()
    ])

    return { learned_words: result, total: total.length }
  }
  async createLearnedWord(payload: LearnedWordRequestBody) {
    const result = await databaseService.learnedWord.insertOne(
      new LearnedWord({
        idUser: new ObjectId(payload.idUser),
        idWord: new ObjectId(payload.idWord)
      })
    )
    const inserted_learned_word = await databaseService.learnedWord.findOne({ _id: result.insertedId })
    return inserted_learned_word
  }
  async updateLearnedWordProcess(learned_word_id: string, process: number) {
    const result = await databaseService.learnedWord.findOneAndUpdate(
      { _id: new ObjectId(learned_word_id) },
      {
        $inc: { process: process }
      },
      {
        returnDocument: 'after' // Trả về giá trị mới
      }
    )

    return result
  }

  async deleteLearnedWord(learned_word_id: string) {
    const result = await databaseService.learnedWord.deleteOne({ _id: new ObjectId(learned_word_id) })

    return result.deletedCount !== 0
  }
}

const learnedWordService = new LearnedWordService()
export default learnedWordService
