import { Test, TestingModule } from '@nestjs/testing'
import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'
import { User } from '../users/schema/user.schema'
import { getModelToken } from '@nestjs/mongoose'

describe('AuthService', () => {
    let service: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule],
        })
        .overrideProvider(getModelToken(User.name))
        .useValue(jest.fn())
        .compile()

        service = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
