import sharp from 'sharp'

export default class ImageFile {
    static isImageFile(contentType) {
        return contentType === 'image/png'
    }

    static createThumbnailBuffer(buffer) {
        const width = 175
        const height = 131
        return sharp(buffer)
            .resize(width, height)
            .toBuffer()
    }

    static createThumbnailMetadata(fileData) {
        return Object.assign({}, {
            originalname: fileData.originalname,
            filename: `${fileData.filename}-thumbnail`,
            metadata: fileData.metadata,
            content_type: fileData.contentType,
            mode: 'w'
        })
    }
}
