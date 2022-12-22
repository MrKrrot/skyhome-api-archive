import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({message: 'Username is required'})
    @ApiProperty({description: 'Username', example: 'MrKrrot'})
        username: string
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    @ApiProperty({description: 'Email', example: 'user@example.com'})
        email: string
    @IsNotEmpty({message: 'Password is required'})
    @ApiProperty({description: 'Password', example: 'Passw@rd&0626'})
        password: string
    @IsNotEmpty({message: 'Confirm password is required'})
    @ApiProperty({description: 'Confirm password', example: 'Passw@rd&0626'})
        confirmPassword: string
    isActive?: boolean
}
