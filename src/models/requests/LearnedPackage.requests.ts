import { ObjectId } from 'mongodb'

export interface LearnedPackageRequestBody {
  idUser: ObjectId
  name: string
  learnedWordIds?: ObjectId[]
  process?: number
}

export interface AddLearnedWordToPackageRequestBody {
  wordIds: ObjectId[]
}
export interface DeleteLearnedWordToPackageRequestBody {
  learnedWordIds?: ObjectId[]
}
export interface UpdatePackageRequestBody {
  idUser?: ObjectId
  name?: string
  learnedWordIds?: ObjectId[]
  process?: number
}
