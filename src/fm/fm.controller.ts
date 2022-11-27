import { Controller, Get, Param } from '@nestjs/common'
import { Req, Request, UseGuards } from '@nestjs/common/decorators'
import { ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/jwt.guard'
import { FmService } from './fm.service'

@ApiTags('Folder Management')
@UseGuards(JwtGuard)
@Controller()
export class FmController {
    constructor(private readonly fmService: FmService) {}
    @Get()
    findUserFolder(@Req() req) {
        const user = req.user

        return this.fmService.findUserFolder(user)
    }

    @Get(':id')
    findSpecificFolder(@Param('id') folderId: string, @Request() req) {
        const user = req.user

        return this.fmService.findSpecificFolder(user, folderId)
    }
}
