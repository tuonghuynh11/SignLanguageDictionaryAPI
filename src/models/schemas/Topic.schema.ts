import { ObjectId } from 'mongodb'

interface TopicType {
  _id?: ObjectId
  name: string
  numberOfWords?: number
  words?: ObjectId[]
}

export default class Topic {
  _id?: ObjectId
  name: string
  numberOfWords?: number
  words?: ObjectId[]

  constructor(word: TopicType) {
    this._id = word._id
    this.name = word.name
    // this.numberOfWords = word.numberOfWords || 0
    this.numberOfWords = word.words ? word.words.length : 0
    this.words = word.words || []
  }
}
