import { Module } from '@nestjs/common'
import { FmController } from './fm.controller'
import { FmService } from './fm.service'
import { FilesController } from './files/files.controller'
import { FilesModule } from './files/files.module'
import { FoldersController } from './folders/folders.controller'
import { FoldersModule } from './folders/folders.module'
import { FilesService } from './files/files.service'
import { FoldersService } from './folders/folders.service'
import { MongooseModule } from '@nestjs/mongoose'
import { FolderSchema } from './folders/schema/folder.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Folder', schema: FolderSchema }]), FilesModule, FoldersModule],
    controllers: [FmController, FilesController, FoldersController],
    providers: [FmService, FilesService, FoldersService],
})

export class FmModule {}
