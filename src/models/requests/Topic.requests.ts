import Word from '../schemas/Word.schema'

export interface TopicRequestBody {
  name: string
  words: string[]
}
export interface UpdateTopicRequestBody {
  name?: string
  words?: string[]
}
