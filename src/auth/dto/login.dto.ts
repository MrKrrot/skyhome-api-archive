import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description: 'Email', example: 'email@example.com'})
        email: string
    @IsNotEmpty()
    @ApiProperty({description: 'Password', example: 'Passw@rd&0626'})
        password: string
}