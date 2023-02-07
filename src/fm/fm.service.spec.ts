import { Test, TestingModule } from '@nestjs/testing'
import { FmModule } from './fm.module'
import { FmService } from './fm.service'
import { Folder } from './folders/schema/folder.schema'
import { getModelToken } from '@nestjs/mongoose'

describe('FmService', () => {
    let service: FmService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FmModule],
        })
        .overrideProvider(getModelToken(Folder.name))
        .useValue(jest.fn())
        .compile()

        service = module.get<FmService>(FmService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
