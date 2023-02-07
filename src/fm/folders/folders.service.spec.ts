import { Test, TestingModule } from '@nestjs/testing'
import { FoldersModule } from './folders.module'
import { FoldersService } from './folders.service'
import { getModelToken } from '@nestjs/mongoose'
import { Folder } from './schema/folder.schema'

describe('FoldersService', () => {
    let service: FoldersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FoldersModule],
        })
        .overrideProvider(getModelToken(Folder.name))
        .useValue(jest.fn())
        .compile()

        service = module.get<FoldersService>(FoldersService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
