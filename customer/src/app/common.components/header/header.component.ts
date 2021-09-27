import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
    selector: "the-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"],
})
export class HeaderComponent {        
    constructor(private appService: AppService) {}
    
    get title(): string {return this.appService.title;}    
    get backLink(): string {return this.appService.backLink;}
}