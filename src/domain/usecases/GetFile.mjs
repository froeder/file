export default class GetFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute() {
        try {
            const filename = this.fileController.getFilename()
            const filedata = await this.fileRepository.getFileData(filename)
            const filebuffer = await this.fileRepository.getFileBuffer(filename)
            this.fileController.sendSuccess(filedata, filebuffer)
        } catch (err) {
            this.fileController.sendError(err)
        }
    }
}
