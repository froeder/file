import express from 'express'
import FileRepository from '../../adapters/repository/FileRepository.mjs'
import FileController from '../controllers/FileController.mjs'
import FilenameCreator from '../../domain/entities/FilenameCreator.mjs'
import CreateFile from '../../domain/usecases/CreateFile.mjs'
import FileUpload from './FileUpload.mjs'

const router = express.Router()
const fileRepository = new FileRepository()

function createFile(req, res, next) {
    fileRepository.createConnection()
    const fileController = new FileController(req, res, next)
    const createFile = new CreateFile(fileController, fileRepository)
    createFile.execute()
}

function getFileUploadInterceptor() {
    const connectionUrl = fileRepository.getConnectionUrl()
    const fileUpload = new FileUpload(connectionUrl, FilenameCreator)
    return fileUpload.getInterceptor()
}

router.post('/files', getFileUploadInterceptor(), (req, res, next) => createFile(req, res, next))

export default router
