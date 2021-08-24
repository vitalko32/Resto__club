import { Controller, Post, UseGuards, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthGuard } from '../../common/auth.guard';
import { IAnswer } from "../../model/answer.interface";
import { IPathable } from 'src/model/pathable.interface';
import { IImgUpload } from 'src/model/dto/imgupload.interface';
import { FilesService } from 'src/common/files.service';

@Controller('api/admin/files')
export class FilesController {
    constructor (private filesService: FilesService) {}
    
    // upload image
    @Post("upload-img")
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    public uploadImg(@Body() dto: IImgUpload, @UploadedFile() file: Express.Multer.File): Promise<IAnswer<IPathable>> {        
        return this.filesService.uploadImg(file, dto);
    }    
}
