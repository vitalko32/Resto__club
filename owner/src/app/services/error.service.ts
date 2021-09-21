import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable()
export class ErrorService {
    constructor(private router: Router) {}

    public processResponse(res: any): boolean {        
        if (res.statusCode === 403) {
            //res.error ? this.appService.showError(res.error) : null;
            console.log(res.error);            
            this.router.navigateByUrl("/auth/logout");
            return false;
        } else {
            return true;
        }        
    }
}
