export const USERS_MESSAGES = {
  ACCOUNT_IS_ONLINE: 'Account is online. Please log out and try again.',
  VALIDATION_ERROR: 'Validation error',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name must be from 1 to 100 characters long',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_NOT_VALID: 'Email is not valid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password must be from 6 to 50 characters long',
  PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS_LONG_AND_CONTAIN_AT_LEAST_1_LOWERCASE_1_UPPERCASE_1_NUMBER_AND_1_SYMBOL:
    'Password must be at least 6 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password must be from 6 to 50 characters long',
  CONFIRM_PASSWORD_MUST_BE_EQUAL_TO_PASSWORD: 'Confirm password must be equal to password',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  REFRESH_TOKEN_SUCCESSFUL: 'Refresh token has been successfully',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout successful',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify successful',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email successful',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token successful',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  RESET_PASSWORD_SUCCESS: 'Reset password successful',
  GET_MY_PROFILE_SUCCESS: 'Get my profile successful',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_MUST_BE_A_STRING: 'BIO must be a string',
  BIO_LENGTH_MUST_BE_FROM_1_TO_200: 'BIO must be from 1 to 200 characters long',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_FROM_1_TO_200: 'Location must be from 1 to 200 characters long',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_FROM_1_TO_200: 'Website must be from 1 to 200 characters long',
  USERNAME_MUST_BE_A_STRING: 'User name must be a string',
  USERNAME_LENGTH_MUST_BE_FROM_1_TO_50: 'User name must be from 1 to 50 characters long',
  IMAGE_URL_MUST_BE_A_STRING: 'Image URL must be a string',
  IMAGE_URL_LENGTH_MUST_BE_FROM_1_TO_400: 'Image URL must be from 1 to 400 characters long',
  UPDATE_MY_PROFILE_SUCCESS: 'Update profile successful',
  GET_PROFILE_SUCCESS: 'Get profile successful',
  FOLLOW_SUCCESS: 'Follow successful',
  INVALID_USER_ID: 'Invalid user id',
  FOLLOW_USER_NOT_VERIFIED_OR_BANED: 'Unable to follow user. The user account has not been verified or has been banned',
  FOLLOWED: 'Followed user',
  ALREADY_UNFOLLOWED: 'Already unfollowed user',
  UNFOLLOW_SUCCESS: 'Unfollow Successfully',
  USERNAME_ALREADY_EXISTS: 'User name already exists',
  USERNAME_INVALID:
    'User name must be 4-15 characters long and contain only letters, numbers, underscore, not only numbers',
  OLD_PASSWORD_IS_INCORRECT: 'Old password is incorrect',
  CHANGE_PASSWORDS_SUCCESS: 'Change passwords successful',
  GMAIL_NOT_VERIFIED: 'Email not verified',
  UPLOAD_SUCCESS: 'Upload successful',
  GET_VIDEO_STATUS_SUCCESS: 'Get video status successful',
  GET_RANDOM_USERS_SUCCESS: 'Get random user successful',
  GET_FOLLOWER_SUCCESS: 'Get followers successful',
  USERNAME_IS_REQUIRED: 'Username is required',
  GENDER_MUST_BE_A_NUMBER: 'Gender must be a number',
  USER_NOT_PERMISSION_FOR_THIS_ACTION: 'User not permission for this action',
  BAN_USER_SUCCESS: 'Ban user successful',
  UNBAN_USER_SUCCESS: 'Unban user successful',
  ACCOUNT_IS_BANNED: 'Account is banned',
  USER_ID_INVALID: 'User ID is invalid',
  USER_IS_NOT_EXISTED: 'User is not exists'
} as const

export const WORD_MESSAGES = {
  SEARCH_WORD_SUCCESS: 'Search word successfully',
  KEYWORDS_NOT_BE_EMPTY: 'Keywords must be not empty',
  PAGE_SIZE_MAXIMUM_IS_100_AND_MINIMAL_IS_ONE: 'Page size maximum is 100 and minimal is 1',
  PAGE_IS_ALWAYS_GREATER_THAN_OR_EQUAL_TO_ONE: 'Page size is always greater than or equal to one',
  GET_WORD_DETAIL_SUCCESS: 'Get word detail successfully',
  WORD_LENGTH_MUST_BE_FROM_1_TO_25: 'Word length must be from 1 to 25',
  WORD_EXISTED: 'Word existed',
  DESCRIPTION_LENGTH_MUST_BE_FROM_10_TO_200: 'Description length must be from 10 to 200',
  EXAMPLES_MUST_BE_AN_ARRAY_OF_STRING: 'Examples must be an array of string',
  VIDEOS_MUST_BE_AN_ARRAY_OF_STRING: 'Videos must be an array of string',
  RELATIVES_MUST_BE_AN_ARRAY_OF_WORD_OBJECT: 'Relatives must be an array of word object',
  CONTRIBUTOR_NOT_EXISTED: 'Contributor not existed',
  TOPIC_NOT_EXISTED: 'Topic not existed',
  CREATE_WORD_SUCCESSFULLY: 'Create word successfully',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  DESCRIPTION_MUST_BE_A_STRING: 'Description must be a string',
  CONTRIBUTOR_MUST_BE_A_STRING: 'Contributor must be a string',
  TOPIC_MUST_BE_A_STRING: 'Topic must be a string',
  UPDATE_WORD_SUCCESSFULLY: 'Update word successfully',
  WORD_ID_INVALID: 'Word ID is invalid',
  WORD_IS_NOT_EXISTED: 'Word is not existed',
  DELETE_WORD_SUCCESSFULLY: 'Delete word successfully',
  DELETE_WORD_FAILED: 'Delete word failed'
} as const
export const TOPICS_MESSAGES = {
  GET_TOPICS_SUCCESS: 'Get topics successfully',
  TOPIC_ID_INVALID: 'Topic ID is invalid',
  TOPIC_IS_NOT_EXISTED: 'Topic is not existed',
  TOPIC_LENGTH_MUST_BE_FROM_1_TO_25: 'Topic length must be from 1 to 25',
  TOPIC_EXISTED: 'Topic existed',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  WORDS_MUST_BE_AN_ARRAY_OF_OBJECTID: 'Names must be an array of object id',
  CREATE_TOPIC_SUCCESSFULLY: 'Create topic successfully',
  UPDATE_TOPIC_SUCCESSFULLY: 'Update topic successfully',
  DELETE_TOPIC_SUCCESSFULLY: 'Delete topic successfully',
  DELETE_TOPIC_FAILED: 'Delete topic failed'
} as const
export const FAVORITE_WORD = {
  GET_FAVORITE_WORD_SUCCESS: 'Get favorite word successfully',
  ADD_FAVORITE_WORD_SUCCESS: 'Add favorite word successfully',
  WORD_IS_EXISTED_IN_FAVORITES: 'Word already exists in favorites',
  WORD_NOT_EXISTED_IN_FAVORITES: 'Word not found in favorites',
  DELETE_FAVORITE_WORD_SUCCESS: 'Delete favorite word successfully'
} as const
export const LEARNED_PACKAGE_MESSAGES = {
  GET_PACKAGE_OF_USER_SUCCESS: 'Get package of user successfully',
  KEYWORDS_NOT_BE_EMPTY: 'Keywords not be empty',
  SEARCH_PACKAGE_SUCCESS: 'Search package successfully',
  PACKAGE_NAME_LENGTH_MUST_BE_FROM_1_TO_25: 'Package name length must be from 1 to 25',
  PACKAGE_NAME_EXISTED: 'Package name already exists',
  PACKAGE_NAME_MUST_BE_A_STRING: 'Package name must be a string',
  LEARNED_WORDS_ID_MUST_BE_AN_ARRAY_OF_WORD_OBJECT: 'Learned words ID must be an array of word object',
  PROCESS_IS_GREATER_THAN_0: 'Process is greater than 0',
  CREATE_LEARNED_PACKAGE_SUCCESSFULLY: 'Create learned package successfully',
  LEARNED_PACKAGE_ID_INVALID: 'Learner package ID is invalid',
  LEARNED_PACKAGE_IS_NOT_EXIST: 'Learned package is not exist',
  GET_ALL_WORDS_OF_PACKAGE_SUCCESS: 'Get all words of package successfully',
  LEARNED_WORDS_MUST_BE_AN_ARRAY_OF_LEARNED_WORD_IDS: 'Learned words must be an array of learned word IDs',
  MUST_BE_AN_ARRAY_OF_WORD_IDS: 'Word Ids must be an array of word IDs',
  LEARNED_WORDS_MUST_BE_AN_ARRAY_OF_OBJECT_IDS: "'Learned Words must be an array of object IDs",
  DELETE_LEARNED_WORDS_OF_PACKAGE_SUCCESSFULLY: 'Delete learned words of package successfully',
  LEARNED_WORDS_NOT_BE_EMPTY: 'Learned words must be not empty',
  UPDATE_LEARNED_PACKAGE_SUCCESSFULLY: 'Update learned package successfully'
} as const
export const SEARCH_MESSAGES = {
  SEARCH_SUCCESSFULLY: 'Search successfully',
  CONTENT_MUST_BE_STRING: 'Content must be a string',
  MEDIA_TYPE_INVALID: 'Media type must be image or video',
  PEOPLE_FOLLOW_INVALID: 'People follow must be boolean'
} as const
export const LEARNED_WORD_MESSAGES = {
  LEARNED_WORD_ID_INVALID: 'The learned word ID is invalid',
  LEARNED_WORD_IS_NOT_EXISTED: 'The learned word is not existed',
  WORD_IS_FINISHED_LEARNING: 'This word is finished learning',
  PROCESS_IS_GREATER_THAN_100: 'The process is greater than 100',
  UPDATE_PROCESS_SUCCESSFULLY: 'Update the process successfully',
  WORD_ALREADY_EXISTED: 'This word already exists',
  SEARCH_LEARNED_WORD_SUCCESS: 'Search learned word successfully',
  GET_LEARNED_WORD_OF_USER_SUCCESS: 'Get learned word of user successfully',
  CREATE_LEARNED_WORD_SUCCESSFULLY: 'Create learned word successfully',
  DELETE_LEARNED_WORD_SUCCESSFULLY: 'Delete learned word successfully'
} as const
export const NEW_WORD_MESSAGES = {
  GET_NEW_WORD_DETAIL_SUCCESS: 'Get new word detail successfully',
  NEW_WORD_ID_INVALID: 'New word ID is invalid',
  NEW_WORD_IS_NOT_EXISTED: 'New word is not existed',
  GET_MY_NEW_WORD_SUCCESS: 'Get my new words successfully',
  USER_ID_MUST_BE_A_STRING: 'User ID must be a string',
  USER_ID_IS_INVALID: 'User ID is invalid',
  CREATE_NEW_WORD_SUCCESSFULLY: 'Create new word successfully',
  GET_ALL_NEW_WORD_SUCCESS: 'Get all new words successfully',
  UPDATE_NEW_WORD_SUCCESSFULLY: 'Update new word successfully',
  INVALID_NEW_WORD_STATUS: 'Invalid new word status',
  UPDATE_NEW_WORD_STATUS_SUCCESSFULLY: 'Update new word status successfully',
  NEW_WORD_IS_NOT_IN_REJECT_STATUS: 'New word is not in reject status',
  DELETE_NEW_WORD_SUCCESSFULLY: 'Delete new word successfully',
  DELETE_NEW_WORD_FAILED: 'Delete_new_word_failed'
} as const

export const NOTIFICATION_MESSAGES = {
  LIKE: (interacted_user_name: string, tweet_content: string) =>
    `${interacted_user_name} liked your tweet: ${tweet_content}`,
  BOOKMARK: (interacted_user_name: string, tweet_content: string) =>
    `${interacted_user_name} bookmarked your tweet: ${tweet_content}`,
  COMMENT: (interacted_user_name: string, tweet_content: string) =>
    `${interacted_user_name} commented your tweet: ${tweet_content}`,
  RETWEET: (interacted_user_name: string, tweet_content: string) =>
    `${interacted_user_name} retweeted your tweet: ${tweet_content}`,
  QUOTETWEET: (interacted_user_name: string, tweet_content: string) =>
    `${interacted_user_name} quoted your tweet: ${tweet_content}`
} as const

export const FEEDBACK_MESSAGES = {
  INVALID_FEEDBACK_STATUS: 'Invalid feedback status',
  FIRST_NAME_LENGTH_MUST_BE_FROM_10_TO_200: 'First name must be from 10 to 200 characters long',
  FIRST_NAME_MUST_BE_A_STRING: 'First name must be a string',
  LAST_NAME_LENGTH_MUST_BE_FROM_10_TO_200: 'Last name must be from 10 to 200 characters long',
  LAST_NAME_MUST_BE_A_STRING: 'Last name must be a string',
  MESSAGE_LENGTH_MUST_BE_FROM_10_TO_500: 'Message length must be from 10 to 500 characters long',
  MESSAGE_MUST_BE_A_STRING: 'Message must be a string',
  GET_FEEDBACKS_SUCCESS: 'Get feedbacks successfully',
  CREATE_FEEDBACK_SUCCESSFULLY: 'Create feedback successfully',
  FEEDBACK_ID_INVALID: 'Invalid feedback ID',
  FEEDBACK_IS_NOT_EXISTED: 'Feedback is not existed'
} as const

export const STATISTIC_MESSAGES = {
  GET_STATISTIC_IN_7_DAYS_SUCCESS: 'Get static in 7 days successfully',
  NUMBER_OF_USER_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ZERO: 'Number of user must be greater than or equal to zero',
  NUMBER_OF_ONLINE_USER_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ZERO:
    'Number of online user must be greater than or equal to zero',
  NUMBER_OF_ACCESSES_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ZERO: 'Number of accesses must be greater than or equal to zero',
  UPDATE_STATISTIC_SUCCESSFULLY: 'Update static successfully',
  INVALID_MONTH_VALUE: 'Invalid month value',
  INVALID_YEAR_VALUE: 'Invalid year value',
  GET_STATISTIC_IN_MONTH_SUCCESS: 'Get static in month successfully',
  GET_STATISTIC_IN_YEAR_SUCCESS: 'Get static in year successfully',
  GET_TOP_10_WORDS_SUCCESS: 'Get top 10 words successfully',
  GET_USER_STATISTIC_SUCCESSFULLY: 'Get user statistic successfully'
} as const
