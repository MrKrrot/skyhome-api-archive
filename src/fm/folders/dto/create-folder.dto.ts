import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

// Folder Dto with name, owner, path, parentPath and list of children
export class CreateFolderDto {
    @IsNotEmpty({message: 'Folder name is required'})
    @ApiProperty({description: 'Folder name', example: 'New Folder'})
        name: string
    @IsNotEmpty({message: 'Folder path is required'})
    @ApiProperty({description: 'Folder path', example: 'C:\\Users\\MrKrrot\\Desktop\\New Folder'})
        path: string
    @IsNotEmpty({message: 'Folder parent path is required'})
    @ApiProperty({description: 'Folder parent path', example: 'C:\\Users\\MrKrrot\\Desktop'})
        parentPath: string
    @IsNotEmpty({message: 'Folder owner is required'})
    @ApiProperty({description: 'Folder owner', example: 'MrKrrot'})
        owner: string
}
