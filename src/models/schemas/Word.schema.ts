import { ObjectId } from 'mongodb'

interface WordType {
  _id?: ObjectId
  name: string
  description: string
  example: string[]
  videos: string[] // video url array
  relativeWords?: Word[]
  viewers?: number
  numberOfLiked?: number //(số người đã thêm vào favorite)
  contributor: string
  topic: ObjectId
  created_at?: Date
  updated_at?: Date
  rating?: number
}

export default class Word {
  _id?: ObjectId
  name: string
  description: string
  example: string[]
  videos: string[] // video url array
  relativeWords?: Word[]
  viewers?: number
  numberOfLiked?: number //(số người đã thêm vào favorite)
  contributor: string
  topic: ObjectId
  created_at?: Date
  updated_at?: Date
  rating?: number

  constructor(word: WordType) {
    const date = new Date()
    this._id = word._id
    this.name = word.name
    this.description = word.description || ''
    this.example = word.example || ''
    this.videos = word.videos || []
    this.relativeWords = word.relativeWords || []
    this.viewers = word.viewers || 0
    this.numberOfLiked = word.numberOfLiked || 0
    this.contributor = word.contributor || ''
    this.topic = word.topic || ''
    this.created_at = word.created_at || date
    this.updated_at = word.updated_at || date
    this.rating = word.rating || 0
  }
}
