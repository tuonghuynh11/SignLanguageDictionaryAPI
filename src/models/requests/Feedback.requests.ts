import { ObjectId } from 'mongodb'
import { FeedbackStatus } from '~/constants/enums'

export interface FeedbackRequestBody {
  firstName: string
  lastName: string
  email: string
  message: string
}

export interface UpdateFeedbackStatusRequestBody {
  status?: FeedbackStatus
}
