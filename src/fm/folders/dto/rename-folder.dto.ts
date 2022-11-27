import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class RenameFolderDto {
    @ApiProperty({description: 'Folder name', example: 'New Folder'})
    @IsNotEmpty()
        name: string
}