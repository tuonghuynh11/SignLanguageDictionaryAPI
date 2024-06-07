import { Request } from 'express'
import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { envConfig } from '~/constants/config'
import { File } from 'formidable'
import { EncodingStatus, MediaType } from '~/constants/enums'
import { assignWith } from 'lodash'
import databaseService from './database.services'
import { deleteFolder, getNameFromFilename, handleUploadVideo } from '~/utils/file'
import { uploadVideoToCloudinary } from '~/utils/cloudinary'

class MediaService {
  async uploadVideo(req: Request) {
    const files: any = await handleUploadVideo(req)
    const { newFilename } = files[0]

    // const result = await files.map(async (file: File) => {
    //   return new Promise(async (resolve, reject) => {
    //     const video_url = await uploadVideoToCloudinary(file.filepath)
    //     console.log('file path: ' + video_url)
    //     resolve({
    //       url: video_url,
    //       type: MediaType.Video
    //     })
    //   })
    // })
    const filePath = files[0].filepath
    const result = filePath.substring(0, filePath.lastIndexOf('\\'))
    const video_url = await uploadVideoToCloudinary(files[0].filepath)
    deleteFolder(result)
    return {
      url: video_url,
      type: MediaType.Video
    }
  }
}
const mediaService = new MediaService()
export default mediaService
