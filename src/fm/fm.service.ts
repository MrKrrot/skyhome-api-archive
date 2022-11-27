import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Folder, FolderDocument } from './folders/schema/folder.schema'
import getUserPath from 'src/utils/getUserPath'

@Injectable()
export class FmService {
    constructor(@InjectModel(Folder.name) private folderModel: Model<FolderDocument>,) {}

    async findUserFolder(user) {
        const { dir } = getUserPath(user.username)

        const dirContent = {
            files: [] as Array<string>,
            directories: [] as Array<object>,
            path: '/',
        }

        const userFolders = await this.folderModel.find({ user: user.id, parentPath: '/' })

        for await (const dirent of dir) {
            if (dirent.isFile()) {
                dirContent.files.push(dirent.name)
            }
        }

        for (const userFolder of userFolders) {
            dirContent.directories.push({
                id: userFolder.id as string,
                name: userFolder.name as string,
            })
        }

        return dirContent
        
    }

    findSpecificFolder(user, folderId: string): string {

        return `specific folder ${folderId}`
    }
}
