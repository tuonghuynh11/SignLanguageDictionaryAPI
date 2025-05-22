import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handles'
const mediaRouter = Router()

mediaRouter.post('/word/upload-video', accessTokenValidator, wrapRequestHandler(uploadVideoController))
mediaRouter.post('/videos', wrapRequestHandler(uploadVideoController))
mediaRouter.post('/images', wrapRequestHandler(uploadImageController))
export default mediaRouter
