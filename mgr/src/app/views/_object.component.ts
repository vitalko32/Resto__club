import { Input, Component } from '@angular/core';

import { IHTMLInputEvent } from '../model/htmlinputevent.interface';
import { AdmLang } from '../model/admlang.model';
import { AdmLangRepository } from '../services/repositories/admlang.repository';
import { UploadService } from '../services/upload.service';
import { AppService } from '../services/app.service';
import { HttpEventType } from '@angular/common/http';
import { IAnswer } from '../model/answer.interface';
import { IPathable } from '../model/pathable.interface';
import { IImagable } from '../model/imagable.interface';

@Component({template:""})
export abstract class ObjectComponent<T> {    
    @Input() x: T & IImagable;
    @Input() requiredFields: string[] = [];
    
    public progressImg: number = 0;    
    public imgFolder: string;    
    public imgResizeWidth: number[] = [100];
    public imgToView: string = null;    
    public imgViewerActive: boolean = false;

    public editorCfg = {toolbar: {items: ['heading', '|', 'bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList', '|', '|', 'insertTable', '|', 'outdent', 'indent', '|', 'undo', 'redo'], shouldNotGroupWhenFull: true}};    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected appService?: AppService,
        protected uploadService?: UploadService,
    ) {}

    get currentLang(): AdmLang {return this.admlangRepository.currentLang;}    

    public uploadImg(event: IHTMLInputEvent): void {
        this.progressImg = 0;
        let fileToUpload: File = <File>event.target.files[0];        
        
        if (fileToUpload && this.imgFolder) {
            let fd: FormData = new FormData ();
            fd.append("folder", this.imgFolder);
            fd.append("resize", JSON.stringify(this.imgResizeWidth));
            fd.append("file", fileToUpload, fileToUpload.name);            
            this.appService.monitorLog(`uploading image ${fileToUpload.name}...`);
            this.uploadService.uploadImg(fd).subscribe (event => {                
                if (event.type == HttpEventType.UploadProgress) {
                    this.progressImg = Math.round (100 * event.loaded / event.total);                    
                } else if (event.type == HttpEventType.Response) {
                    const res: IAnswer<IPathable> = event.body;
    
                    if (res.statusCode === 200) {                        
                        this.appService.monitorLog(`uploaded: ${res.data.paths[0]}, ${res.data.paths[1]}`);
                        this.x.img = res.data.paths[0];
                        this.x.img_s = res.data.paths[1]; 
                    } else {
                        this.appService.monitorLog (res.error, true);
                    }                    
                }                
            }, err => {
                this.appService.monitorLog (err.message, true);
            });            
        }  
    }    

    public deleteImg(): void {
        this.x.img = null;
        this.x.img_s = null;
        this.progressImg = 0;
    }

    public viewImg(img: string): void {
        this.imgToView = img;
        this.imgViewerActive = true;
    }

    public isRequired(field: string): boolean {
        return this.requiredFields.includes(field);
    }    
}
