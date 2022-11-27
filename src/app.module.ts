import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { RouterModule, Routes } from '@nestjs/core'
import { FmModule } from './fm/fm.module'
import { FoldersModule } from './fm/folders/folders.module'
import { FilesModule } from './fm/files/files.module'
import { MONGO_URI } from './config' 

const routes: Routes = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'users',
        module: UsersModule,
    },
    {
        path: 'fm',
        module: FmModule,
        children: [
            {
                path: 'folders',
                module: FoldersModule,
            },
            {
                path: 'files',
                module: FilesModule,
            }
        ],
    },
]
@Module({
    imports: [
        RouterModule.register(routes),
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(MONGO_URI), AuthModule, FmModule ,UsersModule, FmModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
