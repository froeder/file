import express from 'express'
import FileRepository from '../../adapters/repository/FileRepository.mjs'
import FileController from '../controllers/FileController.mjs'
import FilenameCreator from '../../domain/entities/FilenameCreator.mjs'
import CreateFile from '../../domain/usecases/CreateFile.mjs'
import FileUploadInterceptor from './FileUploadInterceptor.mjs'

export default function createRouter(config) {
    const router = express.Router()
    const fileRepository = new FileRepository()
    const fileUploadInterceptor = new FileUploadInterceptor(config, FilenameCreator)

    function createFile(req, res, next) {
        const fileController = new FileController(req, res, next)
        const createFile = new CreateFile(fileController, fileRepository)
        createFile.execute()
    }

    router.post('/files', fileUploadInterceptor.create(), (req, res, next) => createFile(req, res, next))

    return router
}
