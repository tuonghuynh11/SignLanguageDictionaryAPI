export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa,
}
export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}
export enum UserRole {
  User,
  Admin
}

export enum MediaType {
  Image,
  Video,
  HLS
}
export enum MediaTypeQuery {
  Image = 'image',
  Video = 'video'
}
export enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}
export enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}

export enum EncodingStatus {
  Pending, //Đang chờ ở hàng đợi
  Processing, //Đang encode
  Success, // Encode thành công
  Failed // Encode thất bại
}
export enum Gender {
  Male = '0',
  Female = '1'
}
export enum UserStatus {
  Normal = '0',
  Ban = '1'
}

export enum NewWordStatus {
  Pending = '0', //Đang chờ ở hàng đợi
  Publishing = '1', //Đang xuất bản
  Approved = '2', //Đã duyệt
  Rejected = '3' //Từ bị từ chối
}

export enum FeedbackStatus {
  Pending = '0',
  Answered = '1'
}
