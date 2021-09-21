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
            
            if (dto.resize) {
                let widths: number[] = JSON.parse(dto.resize);                
                
                for (let w of widths) {
                    let filename: string = await this.saveResizedImg(diskFullFolder, file, w);
                    paths.push(`${diskSubfolder}/${filename}`);
                }                
            } else {
                let filename: string = await this.saveFile(diskFullFolder, file);
                paths.push(`${diskSubfolder}/${filename}`);
            }            

            return {statusCode: 200, data: {paths}};
        } catch (err) {
            let errTxt: string = `Error in FilesService.uploadImg: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }  
    
    private saveFile(folder: string, file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileName: string = Math.round(new Date().getTime()).toString();
            const fileExtension: string = extname(file.originalname);
            const fileFullName = `${fileName}${fileExtension}`;
            const fileFullNameWithFolder = `${folder}/${fileFullName}`;
            fs.writeFile(fileFullNameWithFolder, file.buffer, (err) => err ? reject(err) : resolve(fileFullName));
        });
    }

    private async saveResizedImg(folder: string, file: Express.Multer.File, width: number): Promise<string> {        
        const fileName: string = Math.round(new Date().getTime()).toString()+`_${width}`;        
        const fileFullName = `${fileName}.jpg`;        
        await sharp(file.buffer)
            .rotate() // поворачиваем в соответствии с метаданными, которые по умолчанию не используются (и не надо, т.к. не все устройства их понимают!)    
            .resize({width, withoutEnlargement: true})
            .jpeg({quality: 80})
            .toFile(`${folder}/${fileFullName}`);
        return fileFullName;        
    }
}
