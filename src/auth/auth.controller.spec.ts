import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthModule } from './auth.module'
import { User } from '../users/schema/user.schema'
import { getModelToken } from '@nestjs/mongoose'

describe('AuthController', () => {
    let controller: AuthController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule]
        })
        .overrideProvider(getModelToken(User.name))
        .useValue(jest.fn())
        .compile()

        controller = module.get<AuthController>(AuthController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
