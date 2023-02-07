import { Test, TestingModule } from '@nestjs/testing'
import { FilesModule } from './files.module'
import { FilesService } from './files.service'
import { getModelToken } from '@nestjs/mongoose'
import { Folder } from '../folders/schema/folder.schema'

describe('FilesService', () => {
    let service: FilesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FilesModule],
        })
        .overrideProvider(getModelToken(Folder.name))
        .useValue(jest.fn())
        .compile()

        service = module.get<FilesService>(FilesService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
