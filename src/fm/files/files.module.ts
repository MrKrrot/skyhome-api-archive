import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FolderSchema } from '../folders/schema/folder.schema'
import { FilesService } from './files.service'
import { FilesController } from './files.controller'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Folder', schema: FolderSchema }])
    ],
    controllers: [FilesController],
    providers: [FilesService]
})
export class FilesModule {}
