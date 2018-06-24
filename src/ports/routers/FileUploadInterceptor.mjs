import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'

const MAX_SIZE_IN_BYTES = 50 * 1024 * 1024 // 20mb

export default class FileUploadInterceptor {
    constructor(config, filenameCreator) {
        this.config = config
        this.filenameCreator = filenameCreator
    }

    create() {
        const storage = GridFsStorage({
            url: this.config.url,
            file: (req, file) => {
                const filename = this.filenameCreator.createFilename(file.originalname)
                return {filename: filename, metadata: {originalname: 'teste'}}
            }
        })
        return multer({storage: storage, limits: {fileSize: MAX_SIZE_IN_BYTES}}).single('file')
    }
}
//originalname:file.originalname