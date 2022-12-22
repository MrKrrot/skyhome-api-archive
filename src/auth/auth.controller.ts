import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    register(@Body() createUserDto: CreateUserDto) {
        if(createUserDto.password !== createUserDto.confirmPassword) throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST)
        return this.authService.register(createUserDto)
    }

}
