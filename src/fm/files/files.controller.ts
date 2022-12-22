import { Controller, Delete, HttpException, HttpStatus, Patch, Post } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { FilesService } from './files.service';

@ApiTags('Files')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
})
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post()
    upload() {
        return this.filesService.upload()
    }

    @Post(':folderId')
    uploadOnFolder() {
        return this.filesService.uploadOnFolder()
    }

    @Patch(':fileName')
    rename() {
        return this.filesService.rename()
    }

    @Patch(':folderId/:fileName')
    renameOnFolder() {
        return this.filesService.renameOnFolder()
    }

    @Delete(':fileName')
    delete() {
        return this.filesService.delete()
    }

    @Delete(':folderId/:fileName')
    deleteOnFolder() {
        return this.filesService.deleteOnFolder()
    }
}
