export default class GetFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute() {
        try {
            const filename = this.fileController.getFilename()
            const found = await this.fileRepository.exist(filename)
            if (found) {
                const filedata = await this.fileRepository.getFileData(filename)
                const filestream = this.fileRepository.getFileStream(filename)
                this.fileController.sendFileStream(filedata, filestream)
            } else {
                this.fileController.sendNotFound()
            }
        } catch (err) {
            this.fileController.sendError(err)
        }
    }
}
