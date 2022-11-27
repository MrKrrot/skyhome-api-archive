import { Injectable } from '@nestjs/common'
import { CreateFolderDto } from './dto/create-folder.dto'
import { RenameFolderDto } from './dto/rename-folder.dto'

@Injectable()
export class FoldersService {

    create(createFolderDto: CreateFolderDto) {
        return 'This action adds a new folder'
    }

    createOnFolder(createFolderDto: CreateFolderDto, folderId: string) {
        return 'This action adds a new folder on a specific folder'
    }

    rename(renameFolderDto: RenameFolderDto, folderId: string) {
        return 'This action renames a folder'
    }

    delete(folderId: string) {
        return 'This action deletes a folder'
    }

}
