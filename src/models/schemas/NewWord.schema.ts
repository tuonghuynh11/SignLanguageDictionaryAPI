import { ObjectId } from 'mongodb'
import Word from './Word.schema'
import { NewWordStatus } from '~/constants/enums'

interface NewWordType {
  _id?: ObjectId
  idUser: ObjectId
  name: string
  description: string
  example: string[]
  videos: string[] // video url array
  relativeWords?: Word[]
  topic?: ObjectId
  created_at?: Date
  updated_at?: Date
  status?: NewWordStatus
}

export default class NewWord {
  _id?: ObjectId
  idUser: ObjectId
  name: string
  description: string
  example: string[]
  videos: string[] // video url array
  relativeWords?: Word[]
  topic?: ObjectId
  created_at?: Date
  updated_at?: Date
  status?: NewWordStatus

  constructor(word: NewWordType) {
    const date = new Date()
    this._id = word._id
    this.idUser = word.idUser
    this.name = word.name
    this.description = word.description || ''
    this.example = word.example || ''
    this.videos = word.videos || []
    this.relativeWords = word.relativeWords || []
    this.topic = word.topic || ('' as any)
    this.created_at = word.created_at || date
    this.updated_at = word.updated_at || date
    this.status = word.status || NewWordStatus.Pending
  }
}
