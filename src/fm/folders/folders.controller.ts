import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { CreateFolderDto } from './dto/create-folder.dto'
import { RenameFolderDto } from './dto/rename-folder.dto'
import { FoldersService } from './folders.service'

@ApiTags('Folders')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
})
@Controller('folders')
export class FoldersController {
    constructor(private readonly foldersService: FoldersService) {}

    @Post()
    create(@Body () createFolderDto: CreateFolderDto) {
        return this.foldersService.create(createFolderDto)
    }

    @Post(':folderId')
    createOnFolder(@Body () createFolderDto: CreateFolderDto, @Param('folderId') folderId: string) {
        return this.foldersService.createOnFolder(createFolderDto, folderId)
    }

    @Patch(':folderId')
    rename(@Body () renameFolderDto: RenameFolderDto, @Param('folderId') folderId: string) {
        return this.foldersService.rename(renameFolderDto, folderId)
    }

    @Delete(':folderId')
    delete(@Param('folderId') folderId: string) {
        return this.foldersService.delete(folderId)
    }

}
