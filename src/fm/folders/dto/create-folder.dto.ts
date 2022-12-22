import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

// Folder Dto with name, owner, path, parentPath and list of children
export class CreateFolderDto {
    @IsNotEmpty({message: 'Folder name is required'})
    @ApiProperty({description: 'Folder name', example: 'New Folder'})
        name: string
    @ApiProperty({description: 'Folder color', example: '#FFFFFF'})
        color: string
}
