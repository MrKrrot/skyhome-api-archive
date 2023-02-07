import { Test, TestingModule } from '@nestjs/testing'
import { FmController } from './fm.controller'
import { Folder } from './folders/schema/folder.schema'
import { getModelToken } from '@nestjs/mongoose'
import { FmModule } from './fm.module'

describe('FmController', () => {
    let controller: FmController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FmModule],
        })
        .overrideProvider(getModelToken(Folder.name))
        .useValue(jest.fn())
        .compile()

        controller = module.get<FmController>(FmController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
