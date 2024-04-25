import { ObjectId } from 'mongodb'

interface LearnedWordType {
  _id?: ObjectId
  idUser: ObjectId
  idWord: ObjectId
  process?: number
}

export class LearnedWord {
  _id?: ObjectId
  idWord: ObjectId
  idUser: ObjectId
  process?: number

  constructor(learnedWord: LearnedWordType) {
    this._id = learnedWord._id
    this.idUser = learnedWord.idUser
    this.idWord = learnedWord.idWord
    this.process = learnedWord.process || 0
  }
}
