import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FoldersService } from './folders.service'
import { FolderSchema } from './schema/folder.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Folder', schema: FolderSchema }])
    ],
    providers: [FoldersService]
})
export class FoldersModule {}
