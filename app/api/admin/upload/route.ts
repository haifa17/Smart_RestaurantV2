import { NextRequest } from 'next/server'
import { uploadImage } from '@/lib/cloudinary'
import { handleApiError, createSuccessResponse, ApiError } from '@/lib/api-error'
import { imageUploadSchema } from '@/lib/dtos/image'

// POST /api/admin/upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = formData.get('folder') as string

    if (!file) {
      throw new ApiError(400, 'MISSING_FILE', 'No file provided')
    }

    // Validate folder
    const { folder: validatedFolder } = imageUploadSchema.parse({ folder })

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new ApiError(400, 'INVALID_FILE_TYPE', 'File must be an image')
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new ApiError(400, 'FILE_TOO_LARGE', 'File size must be less than 5MB')
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const url = await uploadImage(buffer, validatedFolder)

    return createSuccessResponse({ url })
  } catch (error) {
    return handleApiError(error)
  }
}
