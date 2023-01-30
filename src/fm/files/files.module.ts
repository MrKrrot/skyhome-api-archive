import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FolderSchema } from '../folders/schema/folder.schema'
import { FilesService } from './files.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Folder', schema: FolderSchema }])
    ],
    providers: [FilesService]
})
export class FilesModule {}
