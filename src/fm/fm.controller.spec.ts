import { Test, TestingModule } from '@nestjs/testing'
import { FmController } from './fm.controller'

describe('FmController', () => {
    let controller: FmController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FmController],
        }).compile()

        controller = module.get<FmController>(FmController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
