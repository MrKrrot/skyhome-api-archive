import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FoldersService } from './folders.service'
import { FolderSchema } from './schema/folder.schema'
import { FoldersController } from './folders.controller'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Folder', schema: FolderSchema }])
    ],
    controllers: [FoldersController],
    providers: [FoldersService]
})
export class FoldersModule {}
