import getSlug from 'speakingurl'

export default class FilenameCreator {
    static createFilename(originalFileName) {
        const datetimestamp = Date.now()
        return getSlug(originalFileName + '-' + datetimestamp)
    }
}
