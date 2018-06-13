import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'

export default class FileUpload {
    constructor(connectionUrl, filenameCreator) {
        this.connectionUrl = connectionUrl
        this.filenameCreator = filenameCreator
    }

    getInterceptor() {
        const storage = GridFsStorage({
            url: this.connectionUrl,
            file: (req, file) => {
                const filename = this.filenameCreator.createFilename(file.originalname)
                return {filename: filename, metadata: {originalname: file.originalname}}
            }
        })
        return multer({storage: storage}).single('file')
    }
}
