import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  fileBuffer: Buffer,
  folder: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `restaurant-menus/${folder}`,
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(error)
        } else {
          resolve(result!.secure_url)
        }
      }
    )

    uploadStream.end(fileBuffer)
  })
}

export { cloudinary }
