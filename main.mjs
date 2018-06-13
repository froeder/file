import {runner} from '@codate/commons'
import routers from './src/ports/routers'

const config = {
    url: process.env.URL || 'mongodb://localhost/files',
    port: process.env.PORT || 8081
}

export default runner(config, routers(config))
