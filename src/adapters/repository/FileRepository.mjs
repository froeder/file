import mongoose from 'mongoose'
import Grid from 'gridfs-stream'

Grid.mongo = mongoose.mongo

export default class FileRepository {
    createConnection() {
        this.connection = Grid(mongoose.connection.db)
    }

    getConnectionUrl() {
        const conn = mongoose.connection
        return `mongodb://${conn.host}:${conn.port}/${conn.name}`
    }

    getFileBuffer(filename) {
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

    saveFile(metadata, buffer) {
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
}
