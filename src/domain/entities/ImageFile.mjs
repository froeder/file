import sharp from 'sharp'
import _ from 'lodash'

const EXTENSIONS = ['image/png', 'image/jpeg', 'image/gif', 'image/tiff', 'image/webp', 'image/x-icon']

export default class ImageFile {
    static isImageFile(contentType) {
        return _.indexOf(EXTENSIONS, contentType) > -1
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
