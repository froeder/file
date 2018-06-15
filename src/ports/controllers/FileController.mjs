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

    getFiledata() {
        return this.req.file
    }

    sendError(err) {
        this.next(err)
    }

    sendSuccess(filedata, filebuffer) {
        if (this._shouldReturnJson(filedata, filebuffer)) {
            return this._returnJson(filedata)
        }
        this._returnFilebuffer(filedata, filebuffer)
    }

    _shouldReturnJson(filedata, filebuffer) {
        return filedata && !(filebuffer)
    }

    _returnJson(filedata) {
        this.res.json(filedata)
    }

    _returnFilebuffer(filedata, filebuffer) {
        if (this._shouldDownload()) {
            this._setDownload(filedata)
        }
        this.res.setHeader('Content-type', filedata.contentType)
        this.res.setHeader('ETag', filedata.filename)
        this.res.setHeader('Cache-Control', 'max-age=86400')
        filedata.pipe(this.res)
    }

    _shouldDownload() {
        return _.endsWith(this.req.originalUrl, 'download')
    }

    _setDownload(filedata) {
        this.res.setHeader('Content-disposition', 'attachment; filename=' + filedata.metadata.originalname)
    }
}
