import { Injectable } from '@nestjs/common'

@Injectable()
export class FilesService {
    constructor() { }

    upload() {
        return 'This action uploads a file'
    }

    uploadOnFolder() {
        return 'This action uploads a file on a folder'
    }

    rename() {
        return 'This action renames a file'
    }

    renameOnFolder() {
        return 'This action renames a file on a folder'
    }

    delete() {
        return 'This action deletes a file'
    }

    deleteOnFolder() {
        return 'This action deletes a file on a folder'
    }
}
