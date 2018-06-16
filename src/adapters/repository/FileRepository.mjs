import mongoose from 'mongoose'
import Grid from 'gridfs-stream'

let gfs = null
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo)
})

export default class FileRepository {
    async exist(filename) {
        return new Promise((resolve, reject) => {
            gfs.exist({filename: filename}, (err, found) => {
                if (err) return reject(err)
                resolve(found)
            })
        })
    }

    async getFileData(filename) {
        return new Promise((resolve, reject) => {
            gfs.files.find({filename: filename}).toArray((err, files) => {
                if (err) return reject(err)
                resolve(files[0])
            })
        })
    }

    getFileStream(filename) {
        return gfs.createReadStream({filename: filename})
    }

    async getFileBuffer(filename) {
        const stream = this.getFileStream(filename)
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
        const stream = gfs.createWriteStream(metadata)
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
            gfs.remove({filename: filename}, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
}
