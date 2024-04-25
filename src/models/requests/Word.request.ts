import { ObjectId } from 'mongodb'
import Word from '../schemas/Word.schema'

export interface Pagination {
  page: string
  limit: string
}
export interface WordRequestBody {
  name: string
  description: string
  example: string[]
  videos: string[] // video url array
  relativeWords: Word[]
  contributor: string
  topic: string
}
export interface UpdateWordRequestBody {
  name?: string
  description?: string
  example?: string[]
  videos?: string[] // video url array
  relativeWords?: Word[]
  contributor?: string
  topic?: string
}
