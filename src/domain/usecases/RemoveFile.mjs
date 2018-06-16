export default class RemoveFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute() {
        try {
            const filename = this.fileController.getFilename()
            await this.fileRepository.removeFile(filename)
            this.fileController.sendFileData({filename, removed: true})
        } catch (err) {
            this.fileController.sendError(err)
        }
    }
}
