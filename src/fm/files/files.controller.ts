import { Controller, Delete, HttpException, HttpStatus, Patch, Post, Req, UploadedFiles, UseInterceptors, UseGuards, Param, Body } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RenameFileDto } from './dto/rename-file.dto';
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
    @UseInterceptors(FilesInterceptor('files'))
    upload(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req: Request) {
        if (!files.length) {
            throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST)
        }

        return this.filesService.upload(files, req.user)
    }

    @Post(':folderId')
    @UseInterceptors(FilesInterceptor('files'))
    uploadOnFolder(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req: Request, @Param('folderId') folderId: string) {
        if (!files.length) {
            throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST)
        }

        return this.filesService.uploadOnFolder(files, req.user, folderId)
    }

    @Patch()
    rename( @Body() renameFileDto: RenameFileDto, @Req() req: Request) {
        if (renameFileDto.name === renameFileDto.newName) {
            throw new HttpException('New file name is the same as the old one', HttpStatus.BAD_REQUEST)
        }
        
        return this.filesService.rename(renameFileDto, req.user)
    }

    @Patch(':folderId')
    renameOnFolder(@Body() renameFileDto: RenameFileDto, @Req() req: Request, @Param('folderId') folderId: string) {
        if (renameFileDto.name === renameFileDto.newName) {
            throw new HttpException('New file name is the same as the old one', HttpStatus.BAD_REQUEST)
        }

        return this.filesService.renameOnFolder(renameFileDto, req.user, folderId)
    }

    @Delete()
    delete() {
        return this.filesService.delete()
    }

    @Delete(':folderId')
    deleteOnFolder() {
        return this.filesService.deleteOnFolder()
    }
}
