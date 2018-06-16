export default class GetFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute() {
        try {
            const filename = this.fileController.getFilename()
            const filedata = await this.fileRepository.getFileData(filename)
            const filestream = this.fileRepository.getFileStream(filename)
            this.fileController.sendFileStream(filedata, filestream)
        } catch (err) {
            this.fileController.sendError(err)
        }
    }
}
