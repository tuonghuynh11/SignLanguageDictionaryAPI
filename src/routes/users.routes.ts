import { Router } from 'express'
import {
  banUserController,
  changePasswordController,
  forgotPasswordController,
  getAllUserController,
  getMeController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordTokenController,
  unBanUserController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  adminRoleValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordTokenValidator,
  updateMeValidator,
  userBannedValidator,
  userIsOnlineValidator,
  verifiedAdminValidator,
  verifiedUSerValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { paginationNavigator } from '~/middlewares/words.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handles'

const usersRouter = Router()

/**
 * Description: Get ALL User
 * Path: /
 * Method: GET
 * **/
usersRouter.get(
  '/',
  accessTokenValidator,
  adminRoleValidator,
  paginationNavigator,
  wrapRequestHandler(getAllUserController)
)

/**
 * Description: Login to an account by username
 * Path: /login-username
 * Method: POST
 * Body: {username:string, password:string}
 * **/
usersRouter.post(
  '/login',
  loginValidator,
  userBannedValidator,
  userIsOnlineValidator,
  wrapRequestHandler(loginController)
)

/**
 * Description: Register an account by username or email
 * Path: /register
 * Method: POST
 * Body: {username:string||email:string, password:string,confirm_password }
 * **/

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Refresh Token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token:string}
 * **/
usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description: Logout a user
 * Path: /logout
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 * Body: { refresh_token:string}
 * **/
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: Verify Email
 * Path: /verify-email
 * Method: POST
 * Body: {  email_verify_token:string}
 * **/
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description: Resend Verify Email
 * Path: /resend-verify-email
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 * Body: {}
 * **/
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description: Submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: {email:string}
 * **/
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description: Verify link in email to reset password
 * Path: /verify-forgot-password-token
 * Method: POST
 * Body: {forgot-password-token:string}
 * **/
usersRouter.post(
  '/verify-forgot-password-token',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordTokenController)
)

/**
 * Description: Reset password
 * Path: /reset-password
 * Method: POST
 * Body: {forgot-password-token:string, password:string,confirm-password:string}
 * **/
usersRouter.post('/reset-password', resetPasswordTokenValidator, wrapRequestHandler(resetPasswordTokenController))

/**
 * Description: Get My Profile
 * Path: /me
 * Method: GET
 * Header:{Authorization:Bearer <access_token>}
 * **/
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * Description: Update My Profile
 * Path: /me
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Body:UserSchema
 * **/
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUSerValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>(['fullName', 'date_of_birth', 'gender', 'avatar']),
  wrapRequestHandler(updateMeController)
)

/**
 * Description: Change Password
 * Path: /change-password
 * Method: PUT
 * Header:{Authorization:Bearer <access_token>}
 * Body:{old_password:string,new_password:string, confirm_password:string}
 * **/
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUSerValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

/**
 * Description: Ban User
 * Path: /ban/:user_id
 * Method: POST
 * **/
usersRouter.post(
  '/ban/:user_id',
  accessTokenValidator,
  verifiedUSerValidator,
  verifiedAdminValidator,
  wrapRequestHandler(banUserController)
)

/**
 * Description: UnBan User
 * Path: /unban/:user_id
 * Method: POST
 * **/
usersRouter.post(
  '/unban/:user_id',
  accessTokenValidator,
  verifiedUSerValidator,
  verifiedAdminValidator,
  wrapRequestHandler(unBanUserController)
)
export default usersRouter
