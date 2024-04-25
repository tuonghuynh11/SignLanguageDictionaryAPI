import { checkSchema } from 'express-validator'
import { STATISTIC_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const updateStatisticInformationValidator = validate(
  checkSchema(
    {
      numberOfUser: {
        notEmpty: true,
        optional: true,
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            if (Number(value) < 0) {
              throw new Error(STATISTIC_MESSAGES.NUMBER_OF_USER_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ZERO)
            }
            return true
          }
        }
      },
      numberOfOnlineUser: {
        notEmpty: true,
        optional: true,
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            if (Number(value) < 0) {
              throw new Error(STATISTIC_MESSAGES.NUMBER_OF_ONLINE_USER_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ZERO)
            }
            return true
          }
        }
      },
      numberOfAccesses: {
        notEmpty: true,
        optional: true,
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            if (Number(value) < 0) {
              throw new Error(STATISTIC_MESSAGES.NUMBER_OF_ACCESSES_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ZERO)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const durationStatisticValidator = validate(
  checkSchema(
    {
      month: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 1 || num > 12) {
              throw new Error(STATISTIC_MESSAGES.INVALID_MONTH_VALUE)
            }
            return true
          }
        }
      },
      year: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 0) {
              throw new Error(STATISTIC_MESSAGES.INVALID_YEAR_VALUE)
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)
export const yearStatisticValidator = validate(
  checkSchema(
    {
      year: {
        isNumeric: true,
        custom: {
          options: (value, { req }) => {
            const num = Number(value)
            if (num < 0) {
              throw new Error(STATISTIC_MESSAGES.INVALID_YEAR_VALUE)
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)
