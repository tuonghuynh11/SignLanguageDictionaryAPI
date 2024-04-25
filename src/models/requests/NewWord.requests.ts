import Word from '../schemas/Word.schema'

export interface NewWordRequestBody {
  name: string
  description: string
  example: string[]
  videos: string[] // video url array
  relativeWords: Word[]
  topic: string
}
export interface UpdateNewWordRequestBody {
  name?: string
  description?: string
  example?: string[]
  videos?: string[] // video url array
  relativeWords?: Word[]
  topic?: string
}
