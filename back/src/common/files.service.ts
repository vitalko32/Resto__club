import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from "fs";
import { extname } from 'path';
import { IPathable } from 'src/model/pathable.interface';
import { IAnswer } from 'src/model/answer.interface';
import { IImgUpload } from 'src/model/dto/imgupload.interface';

@Injectable()
export class FilesService {
    public async uploadImg(file: Express.Multer.File, dto: IImgUpload): Promise<IAnswer<IPathable>> {        
        try {
            const diskFolder: string = `../static/images/${dto.folder}`;
            const diskSubfolder: string = `${new Date ().getFullYear ()}-${new Date().getMonth() + 1}`;
            const diskFullFolder: string = `${diskFolder}/${diskSubfolder}`;            
            !fs.existsSync(diskFullFolder) ? fs.mkdirSync(diskFullFolder) : null;            
            let paths: string[] = [];
            let filename: string = await this.saveFileToFolder(diskFullFolder, file);
            paths.push(`${diskSubfolder}/${filename}`);

            if (dto.resize) {
                let widths: number[] = JSON.parse(dto.resize);                
                
                for (let w of widths) {
                    filename = await this.saveResizedImg(diskFullFolder, file, w);
                    paths.push(`${diskSubfolder}/${filename}`);
                }                
            } 

            return {statusCode: 200, data: {paths}};
        } catch (err) {
            let errTxt: string = `Error in FilesService.uploadImg: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }  
    
    private saveFileToFolder(folder: string, file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileName: string = Math.round(new Date().getTime()).toString();
            const fileExtension: string = extname(file.originalname);
            const fileFullName = `${fileName}${fileExtension}`;
            const fileFullNameWithFolder = `${folder}/${fileFullName}`;
            fs.writeFile(fileFullNameWithFolder, file.buffer, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(fileFullName);
                }
            });
        });
    }

    private async saveResizedImg(folder: string, file: Express.Multer.File, width: number): Promise<string> {        
        const fileName: string = Math.round(new Date().getTime()).toString()+`_${width}`;
        const fileExtension: string = extname(file.originalname);
        const fileFullName = `${fileName}${fileExtension}`;        
        await sharp(file.buffer).resize({width, withoutEnlargement: true}).toFile(`${folder}/${fileFullName}`);
        return fileFullName;        
    }
}
