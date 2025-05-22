import { v2 as cloudinary } from 'cloudinary'
import { envConfig } from '~/constants/config'
cloudinary.config({
  cloud_name: envConfig.cloud_name,
  api_key: envConfig.api_key,
  api_secret: envConfig.api_secret
})
export const uploadVideoToCloudinary = async (video_url: string) => {
  // try {
  //   const result: any = await new Promise((resolve, reject) => {
  //     cloudinary.uploader.upload_large(
  //       video_url,
  //       {
  //         resource_type: 'video'
  //       },
  //       (error, result) => {
  //         if (error) {
  //           reject(error)
  //         }
  //         resolve(result)
  //       }
  //     )
  //   })
  //   return result.url
  //   return
  // } catch (error) {
  //   return ''
  // }
  const result = await cloudinary.uploader.upload(video_url, {
    resource_type: 'video',
    use_filename: true,
    unique_filename: true,
    folder: 'FreshFit/Videos'
  })
  return result.url
}

export const uploadImageToCloudinary = async (image_url: string) => {
  // const result: any = await new Promise((resolve, reject) => {
  //   cloudinary.uploader.upload(
  //     image_url,
  //     {
  //       resource_type: 'image',
  //       use_filename: true,
  //       unique_filename: true, // 👉 đảm bảo không trùng tên
  //       folder: 'FreshFit/Images'
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return reject(error)
  //       }
  //       resolve(result)
  //     }
  //   )
  // })
  const result = await cloudinary.uploader.upload(image_url, {
    resource_type: 'image',
    use_filename: true,
    unique_filename: true, // 👉 đảm bảo không trùng tên
    folder: 'FreshFit/Images'
  })
  return result.url
}
