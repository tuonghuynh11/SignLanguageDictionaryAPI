import { ObjectId } from 'mongodb'

interface StatisticType {
  _id?: ObjectId
  numberOfUser?: number
  numberOfOnlineUser?: number
  numberOfAccesses?: number
  created_at?: Date
  updated_at?: Date
}

export default class Statistic {
  _id?: ObjectId
  numberOfUser?: number
  numberOfOnlineUser?: number
  numberOfAccesses?: number
  created_at?: Date
  updated_at?: Date
  constructor(statistic: StatisticType) {
    const date = new Date()
    this._id = statistic._id
    this.numberOfUser = statistic.numberOfUser || 0
    this.numberOfOnlineUser = statistic.numberOfOnlineUser || 0
    this.numberOfAccesses = statistic.numberOfAccesses || 0
    this.created_at = statistic.created_at || date
    this.updated_at = statistic.updated_at || date
  }
}
