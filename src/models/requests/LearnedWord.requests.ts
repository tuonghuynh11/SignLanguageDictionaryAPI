import { ObjectId } from 'mongodb'

export interface LearnedWordRequestBody {
  idWord: ObjectId
  idUser: ObjectId
}
