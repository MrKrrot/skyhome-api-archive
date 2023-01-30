import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class RenameFileDto {
    @ApiProperty({description: 'File name', example: 'File.txt'})
    @IsNotEmpty()
        name: string
    @ApiProperty({description: 'New file name', example: 'NewFile.txt' })
    @IsNotEmpty()
        newName: string
}