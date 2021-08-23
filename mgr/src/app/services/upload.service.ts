import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";

import { IAnswer } from '../model/answer.interface';
import { DataService } from './data.service';
import { IPathable } from "../model/pathable.interface";

@Injectable()
export class UploadService {
    constructor(private dataService: DataService) {}

    public uploadImg(fd: FormData): Observable<HttpEvent<IAnswer<IPathable>>> {return this.dataService.filesUploadImg(fd);}    
}
