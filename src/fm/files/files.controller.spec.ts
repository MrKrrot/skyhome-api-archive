import { Test, TestingModule } from '@nestjs/testing'
import { FilesController } from './files.controller'
import { FilesModule } from './files.module'
import { Folder } from '../folders/schema/folder.schema'
import { getModelToken } from '@nestjs/mongoose'

describe('FilesController', () => {
    let controller: FilesController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FilesModule]
        })
        .overrideProvider(getModelToken(Folder.name))
        .useValue(jest.fn())
        .compile()

        controller = module.get<FilesController>(FilesController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
