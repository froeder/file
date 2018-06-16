import _ from 'lodash'

export default class FileController {
    constructor(req, res, next) {
        this.req = req
        this.res = res
        this.next = next
    }

    getFilename() {
        return this.req.param.filename
    }

    getFileData() {
        return this.req.file
    }

    sendError(err) {
        this.next(err)
    }

    sendFileData(filedata) {
        this.res.json(filedata)
    }

    sendFileStream(filedata, filestream) {
        if (this._shouldDownload()) {
            this._setDownload(filedata)
        }
        this.res.setHeader('Content-type', filedata.contentType)
        this.res.setHeader('ETag', filedata.filename)
        this.res.setHeader('Cache-Control', 'max-age=86400')
        filestream.pipe(this.res)
    }

    _returnJson(filedata) {
        this.res.json(filedata)
    }

    _shouldDownload() {
        return _.endsWith(this.req.originalUrl, 'download')
    }

    _setDownload(filedata) {
        this.res.setHeader('Content-disposition', 'attachment; filename=' + filedata.metadata.originalname)
    }
}
