import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Folder, FolderDocument } from './folders/schema/folder.schema'
import getUserPath from '../utils/getUserPath'

@Injectable()
export class FmService {
    constructor(@InjectModel(Folder.name) private folderModel: Model<FolderDocument>,) {}

    async findUserFolder(user) {
        const userFolders = await this.folderModel.find({ parentPath: '/', owner: new Types.ObjectId(user.id) })
        
        const { dir } = getUserPath(user.username)

        const dirContent = {
            files: [] as Array<string>,
            directories: [] as Array<object>,
            path: '/',
        }

        for await (const dirent of dir) {
            if (dirent.isFile()) {
                dirContent.files.push(dirent.name)
            }
        }

        for (const userFolder of userFolders) {
            dirContent.directories.push({
                id: userFolder.id as string,
                name: userFolder.name as string,
                color: userFolder.color as string,
            })
        }

        return dirContent
        
    }

    async findSpecificFolder(user, folderId: string) {
        
        const parentFolder = await this.folderModel.findOne({id: folderId, owner: new Types.ObjectId(user.id)})
        const userFolders = await this.folderModel.find({parentPath: parentFolder.path, owner: new Types.ObjectId(user.id)})

        const { dir } = getUserPath(`${user.username}${parentFolder.path}`)
        
        const dirContent = {
            files: [] as Array<string>,
            directories: [] as Array<object>,
            path: parentFolder.path,
        }

        for await (const dirent of dir) {
            if (dirent.isFile()) {
                dirContent.files.push(dirent.name)
            }
        }

        for (const userFolder of userFolders) {
            dirContent.directories.push({
                id: userFolder.id as string,
                name: userFolder.name as string,
                color: userFolder.color as string,
            })
        }

        return dirContent
    }
}
