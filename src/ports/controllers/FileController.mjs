export default class FileController {
    constructor(req, res, next) {
        this.req = req
        this.res = res
        this.next = next
    }

    getFilename() {
        return this.req.params.filename
    }

    getFileData() {
        return this.req.file
    }

    sendNotFound() {
        this.res.sendStatus(404)
    }

    sendError(err) {
        this.next(err)
    }

    sendFileData(filedata) {
        this.res.json(filedata)
    }

    sendFileStream(filedata, filestream) {
        if (this._shouldAutoDownload()) {
            this._setAutoDownload(filedata)
        }
        this.res.setHeader('Content-type', filedata.contentType)
        this.res.setHeader('ETag', filedata.filename)
        this.res.setHeader('Cache-Control', 'max-age=86400')
        filestream.pipe(this.res)
    }

    _returnJson(filedata) {
        this.res.json(filedata)
    }

    _shouldAutoDownload() {
        return (this.req.params.download)
    }

    _setAutoDownload(filedata) {
        this.res.setHeader('Content-disposition', 'attachment; filename=' + filedata.metadata.originalname)
    }
}
