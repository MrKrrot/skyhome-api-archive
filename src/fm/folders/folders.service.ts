import { Injectable } from '@nestjs/common'
import getUserPath from '../../utils/getUserPath'
import { CreateFolderDto } from './dto/create-folder.dto'
import { RenameFolderDto } from './dto/rename-folder.dto'
import fs from 'fs'
import { InjectModel } from '@nestjs/mongoose'
import { Folder, FolderDocument } from './schema/folder.schema'
import { Model } from 'mongoose'
@Injectable()
export class FoldersService {

    constructor(
        @InjectModel(Folder.name) private folderModel: Model<FolderDocument>
        ) { }

    create(createFolderDto: CreateFolderDto, user: any) {
        const { name, color } = createFolderDto
        const { _id, username } = user

        const { path } = getUserPath(username)

        const newFolder = {
            name,
            color,
            owner: _id,
            path: `/${name}`,
            parentPath: '/',
            children: []
        }

        fs.mkdirSync(`${path}/${name}`)
        return this.folderModel.create(newFolder)
    }

    async createOnFolder(createFolderDto: CreateFolderDto, folderId: string, user: any) {
        const { name, color } = createFolderDto
        const { _id, username } = user

        const folder = await this.folderModel.findById(folderId)
        
        const { path: userPath } = getUserPath(`${username}${folder.path}`)

        const newFolder = new this.folderModel({
            name,
            color,
            owner: _id,
            path: `${folder.path}/${name}`,
            parentPath: folder.path,
            children: []
        })

        await folder.updateOne({ $push: { children: newFolder._id } })
        await folder.save()

        fs.mkdirSync(`${userPath}/${name}`)
        return newFolder.save()
    }

    rename(renameFolderDto: RenameFolderDto, folderId: string) {
        return 'This action renames a folder'
    }

    delete(folderId: string) {
        return 'This action deletes a folder'
    }

}
