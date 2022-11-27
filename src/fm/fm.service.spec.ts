import { Test, TestingModule } from '@nestjs/testing'
import { FmService } from './fm.service'

describe('FmService', () => {
    let service: FmService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FmService],
        }).compile()

        service = module.get<FmService>(FmService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
