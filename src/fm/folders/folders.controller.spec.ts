import { Test, TestingModule } from '@nestjs/testing'
import { FoldersController } from './folders.controller'
import { FoldersModule } from './folders.module'
import { Folder } from './schema/folder.schema'
import { getModelToken } from '@nestjs/mongoose'

describe('FoldersController', () => {
    let controller: FoldersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FoldersModule],
        })
        .overrideProvider(getModelToken(Folder.name))
        .useValue(jest.fn())
        .compile()

        controller = module.get<FoldersController>(FoldersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
