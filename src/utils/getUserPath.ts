import path from 'path'
import fs from 'fs'
import { STORAGE_PATH } from 'src/config'

const getUserPath = (user: string) => {
    
    const os = process.platform
    let userPath = ''

    if (os === 'win32') {
        userPath = path.join(STORAGE_PATH, '\\', user)
    }
    
    userPath = path.join(STORAGE_PATH, '/', user)

    if (!fs.existsSync(STORAGE_PATH)) {
        fs.mkdirSync(STORAGE_PATH)
    }

    if (!fs.existsSync(userPath)) {
        fs.mkdirSync(userPath)
    }

    const userDir = fs.readdirSync(userPath, { withFileTypes: true, encoding: 'utf-8' })

    return {
        path: userPath, 
        dir: userDir
    }
}

export default getUserPath