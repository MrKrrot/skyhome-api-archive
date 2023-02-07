import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../users/schema/user.schema'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import { compare, hash } from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import getUserPath from '../utils/getUserPath'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private authModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {

        const user = await this.authModel.findOne({ email: loginDto.email })
        if (!user) throw new HttpException('Invalid email or password', HttpStatus.NOT_FOUND)

        const isMatch = await compare(loginDto.password, user.password)
        if (!isMatch) throw new HttpException('Invalid email or password', HttpStatus.NOT_FOUND)

        const token = this.jwtService.sign({ 
            id: user.id,
            email: user.email,
            username: user.username,
        })

        const data = {
            user,
            token
        }

        return data
    }

    async register(createUserDto: CreateUserDto) {
        const hashed = await hash(createUserDto.password, 10)

        createUserDto.password = hashed

        getUserPath(createUserDto.username)
        
        return await this.authModel.create(createUserDto)
    }
}