export default class FileController {
    constructor(req, res, next) {
        this.req = req
        this.res = res
        this.next = next
    }

    getData() {
        return this.req.file
    }

    sendSuccessResponse(file) {
        this.res.json(file)
    }

    sendErrorResponse(err) {
        this.next(err)
    }
}
