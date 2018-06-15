import express from 'express'
import FileRepository from '../../adapters/repository/FileRepository.mjs'
import FileController from '../controllers/FileController.mjs'
import FilenameCreator from '../../domain/entities/FilenameCreator.mjs'
import CreateFile from '../../domain/usecases/CreateFile.mjs'
import GeFile from '../../domain/usecases/GetFile.mjs'
import RemoveFile from '../../domain/usecases/RemoveFile.mjs'
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

    function getFile(req, res, next) {
        const fileController = new FileController(req, res, next)
        const getFile = new GeFile(fileController, fileRepository)
        getFile.execute()
    }

    function removeFile(req, res, next) {
        const fileController = new FileController(req, res, next)
        const removeFile = new RemoveFile(fileController, fileRepository)
        removeFile.execute()
    }

    router.post('/files', fileUploadInterceptor.create(), (req, res, next) => createFile(req, res, next))
    router.get('/files/:filename', (req, res, next) => getFile(req, res, next))
    router.get('/files/:filename/download', (req, res, next) => getFile(req, res, next))
    router.delete('/files/:filename', (req, res, next) => removeFile(req, res, next))

    return router
}
