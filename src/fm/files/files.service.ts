import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import getUserPath from 'src/utils/getUserPath'
import fs from 'fs'
import { Folder, FolderDocument } from '../folders/schema/folder.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { RenameFileDto } from './dto/rename-file.dto'
import { DeleteFileDto } from './dto/delete-file.dto'

@Injectable()
export class FilesService {
    constructor(@InjectModel(Folder.name) private folderModel: Model<FolderDocument>,) {}

    upload(files: Array<Express.Multer.File>, user: any) {
        const { path, slash } = getUserPath(user.username)

        for (const file of files) {
            const exists = fs.existsSync(`${path}${slash}${file.originalname}`)
            if (!exists) {
                console.log(`${path}${slash}${file.originalname}`)
                fs.writeFileSync(`${path}${slash}${file.originalname}`, file.buffer)
            }
            else {
                let i = 1
                let existNumberOfFile = false

                do {
                    const exists = fs.existsSync(`${path}${slash}${file.originalname.split('.')[0]} (${i}).${file.originalname.split('.')[1]}`)
                    if (!exists) {
                        fs.writeFileSync(`${path}${slash}${file.originalname.split('.')[0]} (${i}).${file.originalname.split('.')[1]}`, file.buffer)
                        existNumberOfFile = false
                    } else {
                        existNumberOfFile = true
                        i++
                    }
                } while (existNumberOfFile)
            }
        }

        return `File${files.length > 1 ? 's' : ''} uploaded successfully`
    }

    async uploadOnFolder(files: Array<Express.Multer.File>, user: any, folderId: string) {
        const folder = await this.folderModel.findOne({id: folderId, owner: new Types.ObjectId(user.id)})
        const { path, slash } = getUserPath(`${user.username}${folder.path}`)

        for (const file of files) {
            const exists = fs.existsSync(`${path}${slash}${file.originalname}`)
            if (!exists) {
                fs.writeFileSync(`${path}${slash}${file.originalname}`, file.buffer)
            }
            else {
                let i = 1
                let existNumberOfFile = false

                do {
                    const exists = fs.existsSync(`${path}${slash}${file.originalname.split('.')[0]} (${i}).${file.originalname.split('.')[1]}`)
                    if (!exists) {
                        fs.writeFileSync(`${path}${slash}${file.originalname.split('.')[0]} (${i}).${file.originalname.split('.')[1]}`, file.buffer)
                        existNumberOfFile = false
                    } else {
                        existNumberOfFile = true
                        i++
                    }
                } while (existNumberOfFile)
            }
        }

        return `File${files.length > 1 ? 's' : ''} uploaded successfully`
    }

    rename(renameFileDto: RenameFileDto, user: any) {
        const { path, slash } = getUserPath(user.username)
        const { name, newName } = renameFileDto

        try {
            fs.renameSync(`${path}${slash}${name}`, `${path}${slash}${newName}`)
        } catch(e) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND)
        }
        
        return 'File renamed successfully'
    }

    async renameOnFolder(renameFileDto: RenameFileDto, user: any, folderId: string) {
        const folder = await this.folderModel.findById(folderId)
        const { name, newName } = renameFileDto
        const { path, slash } = getUserPath(`${user.username}${folder.path}`)

        try {
            fs.renameSync(`${path}${slash}${name}`, `${path}${slash}${newName}`)
        } catch(e) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND)
        }

        return 'File renamed successfully'
    }

    delete(deleteFileDto: DeleteFileDto, user: any) {
        const { path, slash } = getUserPath(user.username)
        const { name } = deleteFileDto

        try {
            fs.unlinkSync(`${path}${slash}${name}`)
        } catch(e) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND)
        }

        return 'File deleted successfully'
    }

    async deleteOnFolder(deleteFileDto: DeleteFileDto, user: any, folderId: string) {
        const folder = await this.folderModel.findById(folderId)
        const { name } = deleteFileDto
        const { path, slash } = getUserPath(`${user.username}${folder.path}`)
        
        try {
            fs.unlinkSync(`${path}${slash}${name}`)
        } catch(e) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND)
        }

        return 'File deleted successfully'
    }
}
