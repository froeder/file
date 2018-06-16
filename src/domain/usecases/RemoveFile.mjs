export default class RemoveFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute() {
        try {
            const filename = this.fileController.getFilename()
            const found = await this.fileRepository.exist(filename)
            if (found) {
                await this.fileRepository.removeFile(filename)
                this.fileController.sendFileData({filename, removed: true})
            } else {
                this.fileController.sendNotFound()
            }
        } catch (err) {
            this.fileController.sendError(err)
        }
    }
}
