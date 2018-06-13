import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'

export default class FileUploadInterceptor {
    constructor(config, filenameCreator) {
        this.config = config
        this.filenameCreator = filenameCreator
    }

    create() {
        console.log(process.env.URL)
        const storage = GridFsStorage({
            url: this.config.url,
            file: (req, file) => {
                const filename = this.filenameCreator.createFilename(file.originalname)
                return {filename: filename, metadata: {originalname: file.originalname}}
            }
        })
        return multer({storage: storage}).single('file')
    }
}
