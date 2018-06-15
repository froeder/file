import mongoose from 'mongoose'
import Grid from 'gridfs-stream'

Grid.mongo = mongoose.mongo

export default class FileRepository {
    constructor() {
        mongoose.connection.on('open', () => {
            this.createConnection()
        })
    }

    createConnection() {
        this.connection = Grid(mongoose.connection.db)
    }

    async getFileData(filename) {
        return new Promise((resolve, reject) => {
            this.connection.findOne({filename: filename}, (err, filedata) => {
                if (err) return reject(err)
                resolve(filedata)
            })
        })
    }

    async getFileBuffer(filename) {
        const stream = this.connection.createReadStream({filename: filename})
        return new Promise((resolve, reject) => {
            let data = []
            stream.on('data', (chunk) => {
                data.push(chunk)
            })
            stream.on('end', () => {
                data = Buffer.concat(data)
                resolve(data)
            })
            stream.on('error', (err) => {
                reject(err)
            })
        })
    }

    async saveFile(metadata, buffer) {
        const stream = this.connection.createWriteStream(metadata)
        return new Promise((resolve, reject) => {
            stream.end(buffer)
            stream.on('finish', (file) => {
                resolve(file)
            })
            stream.on('error', (err) => {
                reject(err)
            })
        })
    }

    async removeFile(filename) {
        return new Promise((resolve, reject) => {
            this.connection.remove({filename: filename}, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
}
