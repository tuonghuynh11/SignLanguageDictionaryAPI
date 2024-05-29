import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { UserRole, UserVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import {
  BanUserReqParams,
  ChangePasswordReqBody,
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  UpdateMeReqBody,
  VerifyForgotPasswordReqBody,
  VerifyReqReqBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await userService.login({
    user_id: user_id.toString(),
    verify: user.verify as UserVerifyStatus,
    user_role: user.role as UserRole
  })
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result: result
  })
}
export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await userService.logout(refresh_token)
  return res.json({
    message: result.message
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await userService.register(req.body)
  return res.json({
    message: 'Success',
    result
  })
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { decoded_refresh_token } = req

  const { exp, verify } = decoded_refresh_token as TokenPayload
  const expTime: number = (exp as number) - Math.floor(Date.now() / 1000)

  const result = await userService.refreshToken({
    old_refresh_token: refresh_token,
    user_id: decoded_refresh_token?.user_id as string,
    role: decoded_refresh_token?.role as UserRole,
    verify: verify,
    exp: expTime
  })
  return res.json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESSFUL,
    result: result
  })
}
export const verifyEmailController = async (req: Request<ParamsDictionary, any, VerifyReqReqBody>, res: Response) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  //Nếu không tìm thây user
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  //Đã verify rồi thì không báo lỗi
  //Trả về status OK với message là đã verify trước đó rồi
  if (user.email_verify_token === '') {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await userService.verifyEmail(user_id, user.role as UserRole)
  return res.json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result: result
  })
}
export const resendVerifyEmailController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }

  const result = await userService.resendVerifyEmail(user_id)
  return res.json(result)
}
export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id, verify } = req.user as User
  const result = await userService.forgotPassword({
    user_id: (_id as ObjectId).toString(),
    verify: verify as UserVerifyStatus,
    email: req.body.email
  })
  return res.json(result)
}
export const verifyForgotPasswordTokenController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}
export const resetPasswordTokenController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayload
  const { password } = req.body
  const result = await userService.resetPassword(user_id, password)
  return res.json(result)
}
export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await userService.getMe(user_id)
  return res.json({
    message: USERS_MESSAGES.GET_MY_PROFILE_SUCCESS,
    result: user
  })
}
export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdateMeReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { body } = req
  const user = await userService.updateMe(user_id, body)
  return res.json({
    message: USERS_MESSAGES.UPDATE_MY_PROFILE_SUCCESS,
    result: user
  })
}
export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { new_password } = req.body
  const result = await userService.changePassword(user_id, new_password)
  return res.json(result)
}
export const banUserController = async (req: Request<BanUserReqParams>, res: Response, next: NextFunction) => {
  const { user_id } = req.params
  const user = await userService.banUser(user_id)
  return res.json({
    message: USERS_MESSAGES.BAN_USER_SUCCESS,
    result: user
  })
}

export const unBanUserController = async (req: Request<BanUserReqParams>, res: Response, next: NextFunction) => {
  const { user_id } = req.params
  const user = await userService.unBanUser(user_id)
  return res.json({
    message: USERS_MESSAGES.UNBAN_USER_SUCCESS,
    result: user
  })
}
