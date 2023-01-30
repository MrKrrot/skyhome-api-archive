import path from 'path'
import fs from 'fs'
import { STORAGE_PATH } from 'src/config'

const getUserPath = (user: string) => {
    
    const os = process.platform
    const slash = os === 'win32' ? '\\' : '/'
    let userPath = ''
    
    userPath = path.join(STORAGE_PATH, slash, user)

    if (!fs.existsSync(STORAGE_PATH)) {
        fs.mkdirSync(STORAGE_PATH)
    }

    if (!fs.existsSync(userPath)) {
        fs.mkdirSync(userPath)
    }

    const userDir = fs.readdirSync(userPath, { withFileTypes: true, encoding: 'utf-8' })

    return {
        path: userPath, 
        dir: userDir,
        slash
    }
}

export default getUserPath