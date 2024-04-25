import { ObjectId } from 'mongodb'
import { Gender, UserRole, UserStatus, UserVerifyStatus } from '~/constants/enums'

// Swagger UI Express Comment Format

interface UserType {
  _id?: ObjectId
  fullName?: string
  email?: string
  date_of_birth?: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus
  gender?: Gender //
  role?: UserRole
  username?: string // optional
  avatar?: string // optional
  status?: UserStatus
  isOnline?: boolean
}

export default class User {
  _id?: ObjectId
  fullName?: string
  email?: string
  date_of_birth?: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus
  gender?: Gender
  role?: UserRole
  username?: string // optional
  avatar?: string // optional
  status?: UserStatus
  isOnline?: boolean

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.fullName = user.fullName || ''
    this.email = user.email || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.role = user.role || UserRole.User
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.status = user.status || UserStatus.Normal
    this.isOnline = user.isOnline || false
  }
}
