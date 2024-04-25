import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { TopicRequestBody, UpdateTopicRequestBody } from '~/models/requests/Topic.requests'
import Topic from '~/models/schemas/Topic.schema'
import { FeedbackStatus, NewWordStatus } from '~/constants/enums'
import { FeedbackRequestBody, UpdateFeedbackStatusRequestBody } from '~/models/requests/Feedback.requests'
import Feedback from '~/models/schemas/Feedback.schema'
import { UpdateStatisticRequestBody } from '~/models/requests/Statistic.requests'
import Statistic from '~/models/schemas/Statistic.schema'
import Word from '~/models/schemas/Word.schema'
import { numberOfDaysBetweenTwoDates } from '~/utils/commons'
import User from '~/models/schemas/User.schema'

class StatisticService {
  async getStatisticIn7Days() {
    // eslint-disable-next-line prefer-const

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const pipeline = [
      {
        $match: {
          created_at: { $gte: sevenDaysAgo }
        }
      },
      { $sort: { created_at: -1 } }
    ]

    const result = await databaseService.statistic.aggregate(pipeline).toArray()
    return result
  }
  async getTopTenWords() {
    // eslint-disable-next-line prefer-const

    const result = await databaseService.words.find().toArray()
    result.sort((a: Word, b: Word) => (b.viewers as number) - (a.viewers as number))
    return result.slice(0, 10)
  }
  async getStatisticInMonth(month: number, year: number) {
    // eslint-disable-next-line prefer-const

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const pipeline = [
      {
        $match: {
          created_at: {
            $gte: new Date(year, month - 1, 1), // Start of the month
            $lt: new Date(year, month, 1) // Start of the next month
          }
        }
      },
      {
        $group: {
          _id: { $week: '$created_at' },
          items: { $push: '$$ROOT' }
        }
      }
    ]

    const result = await databaseService.statistic.aggregate(pipeline).toArray()
    result.forEach((week, index) => {
      week._id = `Week ${index + 1}`
      week.items = week.items.sort((a: any, b: any) => b.created_at - a.created_at)
      week.items = [week.items[0]]
    })
    return result
  }
  async getStatisticInYear(year: number) {
    // eslint-disable-next-line prefer-const
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec] = await Promise.all(
      months.map(async (item) => (await statisticService.getStatisticInMonth(item, year)).pop())
    )

    return {
      result: {
        Jan: Jan?.items,
        Feb: Feb?.items,
        Mar: Mar?.items,
        Apr: Apr?.items,
        May: May?.items,
        Jun: Jun?.items,
        Jul: Jul?.items,
        Aug: Aug?.items,
        Sep: Sep?.items,
        Oct: Oct?.items,
        Nov: Nov?.items,
        Dec: Dec?.items
      }
    }
  }

  async updateStatisticInformation(payload: UpdateStatisticRequestBody) {
    // eslint-disable-next-line prefer-const
    const numberOfUser = await databaseService.users.countDocuments()
    payload.numberOfUser = numberOfUser
    const numberOfOnlineUser = await databaseService.users
      .find({
        isOnline: true
      })
      .toArray()
    payload.numberOfOnlineUser = numberOfOnlineUser.length

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0) // Set time to the start of the day in UTC

    const filter = {
      created_at: {
        $gte: today, // Greater than or equal to the start of today
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than the start of tomorrow
      }
    }
    const isExist = await databaseService.statistic.findOne(filter)
    if (!isExist) {
      let previousStatistic = await databaseService.statistic.find().toArray()
      previousStatistic = previousStatistic.sort((a: any, b: any) => b.created_at - a.created_at)
      const response = await databaseService.statistic.insertOne(
        new Statistic({
          numberOfAccesses: (previousStatistic.at(0)?.numberOfAccesses as number) + 1,
          ...payload
        })
      )
      const inserted_statistic = await databaseService.statistic.findOne({ _id: response.insertedId })
      return inserted_statistic
    }
    const result = await databaseService.statistic.findOneAndUpdate(
      filter,
      {
        $set: { ...payload },
        $inc: { numberOfAccesses: 1 },
        $currentDate: {
          updated_at: true
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )

    return result
  }

  async getUserStatistic(user_id: string) {
    const total_learned_word = (await databaseService.learnedWord.find({ idUser: new ObjectId(user_id) }).toArray())
      .length
    const learned_word = (
      await databaseService.learnedWord.find({ idUser: new ObjectId(user_id), process: 100 }).toArray()
    ).length

    const contributed_words = (
      await databaseService.newWord
        .find({
          idUser: new ObjectId(user_id),
          status: NewWordStatus.Approved
        })
        .toArray()
    ).length
    const created_word = (
      await databaseService.newWord
        .find({
          idUser: new ObjectId(user_id)
        })
        .toArray()
    ).length

    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    const learning_time = numberOfDaysBetweenTwoDates((user as User).created_at as Date, new Date())
    return {
      result: {
        learned_Words: {
          learned: learned_word,
          total: total_learned_word
        },
        contributed_words: contributed_words,
        created_word: created_word,
        learning_time: learning_time
      }
    }
  }
}

const statisticService = new StatisticService()
export default statisticService
