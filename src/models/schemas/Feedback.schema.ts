import { ObjectId } from 'mongodb'
import { FeedbackStatus } from '~/constants/enums'

interface FeedbackType {
  _id?: ObjectId
  idUser: ObjectId
  firstName: string
  lastName: string
  email: string
  message: string
  created_at?: Date
  updated_at?: Date
  status?: FeedbackStatus
}

export default class Feedback {
  _id?: ObjectId
  idUser: ObjectId
  firstName: string
  lastName: string
  email: string
  message: string
  created_at?: Date
  updated_at?: Date
  status?: FeedbackStatus

  constructor(contact: FeedbackType) {
    const date = new Date()
    this._id = contact._id
    this.idUser = contact.idUser
    this.firstName = contact.firstName
    this.lastName = contact.lastName
    this.email = contact.email
    this.message = contact.message
    this.created_at = contact.created_at || date
    this.updated_at = contact.updated_at || date
    this.status = contact.status || FeedbackStatus.Pending
  }
}
