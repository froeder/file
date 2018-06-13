import ImageFile from '../entities/ImageFile.mjs'

export default class CreateFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute() {
        try {
            const originalFileData = this.fileController.getData()
            if (ImageFile.isImageFile(originalFileData.contentType)) {
                await this.createThumbnail(originalFileData)
            }
            this.fileController.sendSuccessResponse(originalFileData)
        } catch (err) {
            this.fileController.sendErrorResponse(err)
        }
    }

    async createThumbnail(originalFileData) {
        const fileBuffer = await this.fileRepository.getFileBuffer(originalFileData.filename)
        const thumbnailBuffer = await ImageFile.createThumbnailBuffer(fileBuffer)
        const thumbnailMetadata = await ImageFile.createThumbnailMetadata(originalFileData)
        await this.fileRepository.saveFile(thumbnailMetadata, thumbnailBuffer)
    }
}
