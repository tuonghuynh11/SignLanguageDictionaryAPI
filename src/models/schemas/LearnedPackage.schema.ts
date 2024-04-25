import { ObjectId } from 'mongodb'

interface LearnedPackageType {
  _id?: ObjectId
  idUser: ObjectId
  name: string
  learnedWordIds?: ObjectId[]
  process?: number
}

export class LearnedPackage {
  _id?: ObjectId
  idUser: ObjectId
  name: string
  learnedWordIds?: ObjectId[]
  process?: number

  constructor(learnedPackage: LearnedPackageType) {
    this._id = learnedPackage._id
    this.idUser = learnedPackage.idUser
    this.name = learnedPackage.name
    this.learnedWordIds = learnedPackage.learnedWordIds?.map((item) => new ObjectId(item)) || []
    this.process = learnedPackage.process || 0
  }
}
