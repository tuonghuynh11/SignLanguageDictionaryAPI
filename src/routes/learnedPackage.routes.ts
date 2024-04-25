import { Router } from 'express'
import {
  addWordLearnedPackageController,
  createLearnedPackageController,
  deleteWordLearnedPackageController,
  getAllLearnedPackageOfUserController,
  getAllWordInLearnedPackageController,
  searchLearnedPackageController,
  updateLearnedPackageController
} from '~/controllers/learnedPackages.controllers'

import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  addWordLearnedPackageValidator,
  createLearnedPackageValidator,
  deleteWordLearnedPackageValidator,
  learnedPackageIdValidator,
  learnedPackageSearchValidator,
  updateLearnedPackageValidator
} from '~/middlewares/learnedPackage.middlewares'
import { accessTokenValidator, verifiedUSerValidator } from '~/middlewares/users.middlewares'
import { paginationNavigator } from '~/middlewares/words.middlewares'
import { UpdatePackageRequestBody } from '~/models/requests/LearnedPackage.requests'
import { wrapRequestHandler } from '~/utils/handles'

const learnedPackageRouter = Router()
/**
 * Description: Get All Package of User
 * Path: /all
 * Method: GET
 * **/
learnedPackageRouter.get(
  '/all',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  wrapRequestHandler(getAllLearnedPackageOfUserController)
)

/**
 * Description: Search vocabulary by keywords
 * Path: /search?keywords = "" &page = 1 &limit = 10
 * Method: GET
 * **/
learnedPackageRouter.get(
  '/search',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  learnedPackageSearchValidator,
  wrapRequestHandler(searchLearnedPackageController)
)

/**
 * Description: Create new Package
 * Path: /
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body: WordRequestBody
 *
 * **/
learnedPackageRouter.post(
  '/',
  accessTokenValidator,
  verifiedUSerValidator,
  createLearnedPackageValidator,
  wrapRequestHandler(createLearnedPackageController)
)

/**
 * Description: Get All Words In Package
 * Path: /learned-words/:learned_package_id
 *  Header:{Authorization:Bearer <access_token>}
 * Method: GET
 * **/
learnedPackageRouter.get(
  '/learned-words/:learned_package_id',
  accessTokenValidator,
  verifiedUSerValidator,
  paginationNavigator,
  learnedPackageIdValidator,
  wrapRequestHandler(getAllWordInLearnedPackageController)
)

/**
 * Description: Add learned word to package
 * Path: /learned-words/:learned_package_id
 * Method: POST
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body:AddLearnedWordToPackageRequestBody
 *
 * **/
learnedPackageRouter.post(
  '/learned-words/:learned_package_id',
  accessTokenValidator,
  verifiedUSerValidator,
  learnedPackageIdValidator,
  addWordLearnedPackageValidator,
  wrapRequestHandler(addWordLearnedPackageController)
)

/**
 * Description: Remove learned word of package
 * Path: /learned-words/:learned_package_id
 * Method: DELETE
 * Header:{Authorization:Bearer <access_token>}
 *
 * Body:DeleteLearnedWordToPackageRequestBody
 *
 * **/
learnedPackageRouter.delete(
  '/learned-words/:learned_package_id',
  accessTokenValidator,
  verifiedUSerValidator,
  learnedPackageIdValidator,
  deleteWordLearnedPackageValidator,
  wrapRequestHandler(deleteWordLearnedPackageController)
)

/**
 * Description: Update package
 * Path: /update/:learned_package_id
 * Method: PATCH
 * Header:{Authorization:Bearer <access_token>}
 * Body:UpdatePackageRequestBody
 * **/
learnedPackageRouter.patch(
  '/update/:learned_package_id',
  accessTokenValidator,
  verifiedUSerValidator,
  learnedPackageIdValidator,
  filterMiddleware<UpdatePackageRequestBody>(['name', 'process', 'idUser', 'learnedWordIds']),
  updateLearnedPackageValidator,
  wrapRequestHandler(updateLearnedPackageController)
)

export default learnedPackageRouter
