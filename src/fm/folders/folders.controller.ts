import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'
import { Req, UseGuards } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { JwtGuard } from 'src/auth/jwt.guard'
import { CreateFolderDto } from './dto/create-folder.dto'
import { RenameFolderDto } from './dto/rename-folder.dto'
import { FoldersService } from './folders.service'

@ApiTags('Folders')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
})
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('folders')
export class FoldersController {
    constructor(private readonly foldersService: FoldersService) {}

    @Post()
    create(@Body () createFolderDto: CreateFolderDto, @Req() req: Request) {
        const { user } = req
        
        return this.foldersService.create(createFolderDto, user)
    }

    @Post(':folderId')
    createOnFolder(@Body () createFolderDto: CreateFolderDto, @Param('folderId') folderId: string, @Req() req: Request) {
        const { user } = req
        
        return this.foldersService.createOnFolder(createFolderDto, folderId, user)
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
