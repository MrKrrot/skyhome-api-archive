import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class DeleteFileDto {
    @ApiProperty({description: 'File name', example: 'File.txt'})
    @IsNotEmpty()
        name: string
}